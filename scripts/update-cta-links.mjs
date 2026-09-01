/**
 * Content update:
 *  1. Point every newsletter link at the new Mailchimp signup page.
 *  2. Make the home page "Schedule a Demo" button scroll to the lead form
 *     directly below it, instead of opening Calendly.
 *
 *   node --env-file=.env scripts/update-cta-links.mjs
 *
 * Idempotent — safe to re-run. Runs in a single transaction.
 */

import pg from "pg";

const OLD_NEWSLETTER = "https://mailchi.mp/genetico/genetico-clinical-digest-signup-form";
const NEW_NEWSLETTER = "https://mailchi.mp/genetico/rare-insights";
const LEAD_FORM_HASH = "#lead-form";

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  await client.query("BEGIN");

  try {
    // Every CTA button table that Payload generates for a `buttons` array.
    const buttonTables = await client.query(
      `SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name LIKE '%_buttons'
        ORDER BY table_name`,
    );

    console.log(`Newsletter link → ${NEW_NEWSLETTER}`);
    let newsletterRows = 0;

    for (const { table_name: table } of buttonTables.rows) {
      const result = await client.query(`UPDATE ${table} SET href = $1 WHERE href = $2`, [
        NEW_NEWSLETTER,
        OLD_NEWSLETTER,
      ]);
      if (result.rowCount > 0) {
        console.log(`  ${table}: ${result.rowCount} button(s)`);
        newsletterRows += result.rowCount;
      }
    }

    const settings = await client.query(
      `UPDATE site_settings SET newsletter_url = $1 WHERE newsletter_url = $2`,
      [NEW_NEWSLETTER, OLD_NEWSLETTER],
    );
    console.log(`  site_settings.newsletter_url: ${settings.rowCount} row(s)`);

    const newsletterCta = await client.query(
      `UPDATE resources_newsletter SET button_href = $1 WHERE button_href = $2`,
      [NEW_NEWSLETTER, OLD_NEWSLETTER],
    );
    console.log(`  resources_newsletter.button_href: ${newsletterCta.rowCount} row(s)`);
    newsletterRows += settings.rowCount + newsletterCta.rowCount;

    console.log(`\n"Schedule a Demo" → ${LEAD_FORM_HASH}`);
    const demo = await client.query(
      `UPDATE home_cta_buttons SET href = $1
        WHERE label = 'Schedule a Demo' AND href LIKE 'https://calendly.com/%'`,
      [LEAD_FORM_HASH],
    );
    console.log(`  home_cta_buttons: ${demo.rowCount} button(s)`);

    await client.query("COMMIT");
    console.log(`\nCommitted. ${newsletterRows} newsletter link(s), ${demo.rowCount} demo button.`);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("\nRolled back — nothing was changed.");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
