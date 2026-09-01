/**
 * Removes Calendly from the site.
 *
 *  - "Book a Demo" on About and Platform now scrolls to the lead form below it,
 *    matching the home page and the two solution pages.
 *  - The footer "Contact Us" link points at the home page lead form.
 *  - The "Booking link (Calendly)" field is gone from Site Settings, so its
 *    column is dropped.
 *
 *   node --env-file=.env scripts/remove-calendly.mjs
 *
 * Idempotent — safe to re-run. Runs in a single transaction.
 */

import pg from "pg";

const LEAD_FORM_HASH = "#lead-form";
const HOME_LEAD_FORM = "/#lead-form";

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
    const buttonTables = await client.query(
      `SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name LIKE '%_buttons'
        ORDER BY table_name`,
    );

    console.log(`CTA buttons → ${LEAD_FORM_HASH}`);
    let buttons = 0;
    for (const { table_name: table } of buttonTables.rows) {
      const result = await client.query(
        `UPDATE ${table} SET href = $1 WHERE href LIKE 'https://calendly.com/%'`,
        [LEAD_FORM_HASH],
      );
      if (result.rowCount > 0) {
        console.log(`  ${table}: ${result.rowCount} button(s)`);
        buttons += result.rowCount;
      }
    }
    if (buttons === 0) console.log("  none left to change");

    // The footer shows on pages without a lead form, so it targets the home one.
    const footer = await client.query(
      `UPDATE footer SET contact_href = $1 WHERE contact_href LIKE 'https://calendly.com/%'`,
      [HOME_LEAD_FORM],
    );
    console.log(`\nFooter "Contact Us" → ${HOME_LEAD_FORM}: ${footer.rowCount} row(s)`);

    const dropped = await client.query(
      `SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'site_settings'
          AND column_name = 'calendly_url'`,
    );
    if (dropped.rowCount > 0) {
      await client.query(`ALTER TABLE site_settings DROP COLUMN calendly_url`);
      console.log("site_settings.calendly_url: column dropped");
    } else {
      console.log("site_settings.calendly_url: already gone");
    }

    const remaining = await client.query(
      `SELECT count(*)::int AS n FROM (
         SELECT href FROM home_cta_buttons
         UNION ALL SELECT href FROM about_cta_buttons
         UNION ALL SELECT href FROM platform_cta_buttons
         UNION ALL SELECT href FROM public_health_cta_buttons
         UNION ALL SELECT href FROM solution_pages_cta_buttons
         UNION ALL SELECT contact_href FROM footer
       ) AS links WHERE href LIKE '%calendly.com%'`,
    );

    await client.query("COMMIT");
    console.log(`\nCommitted. Calendly links still in content: ${remaining.rows[0].n}`);
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
