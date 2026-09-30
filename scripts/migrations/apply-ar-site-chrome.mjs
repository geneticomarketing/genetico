/**
 * Brings the site-wide chrome in line with the advisor-reviewed ("ar") Home
 * and About pages, which became the live / and /about-us.
 *
 *  - Navigation: Our Story · What We Build · Who We Serve ▾ · Insights, and the
 *    dropdown's labels as the handoff writes them.
 *  - Footer: the company/platform tagline, "Who We Serve" as the second
 *    heading, and Insights in the menu. "For Business" (→ /hospital) is
 *    replaced by Insights, and "FAQs" (→ /#faqs) is removed — the new home page
 *    has no FAQ section, so the link would land nowhere.
 *  - Contact form: the handoff's five audiences, in its order. "Life Science
 *    or Industry" is renamed "Life Science or Research" and "Strategic
 *    partner" is added.
 *
 *   node --env-file=.env scripts/migrations/apply-ar-site-chrome.mjs --dry   # show, change nothing
 *   node --env-file=.env scripts/migrations/apply-ar-site-chrome.mjs
 *
 * Idempotent — safe to re-run. Runs in a single transaction. Copy only: every
 * link keeps its destination apart from the two footer items above, so it is
 * safe to run ahead of the deploy that carries the new pages.
 */

import pg from "pg";

const DRY = process.argv.includes("--dry");

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const MAIN_NAV = {
  "/about-us": "Our Story",
  "/platform": "What We Build",
  "/resources": "Insights",
};
const DROPDOWN_LABEL = "Who We Serve";

const SOLUTIONS_NAV = {
  "/hospital": "Hospital / Clinician / CoE",
  "/life-science": "Life Science / Biotech",
  "/public-health": "Public Health",
};

const FOOTER_TAGLINE =
  "Genetico is a health technology company developing digital solutions for the rare and " +
  "genetic disease ecosystem. IndiGeneUs.AI is its platform.";

const FOOTER_MENU = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about-us" },
  { label: "What We Build", href: "/platform" },
  { label: "Insights", href: "/resources" },
];

const CONTACT_ROLES = [
  {
    id: "clinician",
    label: "Clinician or Hospital",
    description:
      "We'll connect you to our medical team to walk through workflows, integration and a " +
      "2-week pilot at your center.",
  },
  {
    id: "industry",
    label: "Life Science or Research",
    description:
      "We'll show how structured, research-ready data and cohort identification support your " +
      "evidence pipeline.",
  },
  {
    id: "public-health",
    label: "Government or Public Health",
    description:
      "We'll walk you through registries, screening programmes, patient tracking and " +
      "programme analytics.",
  },
  {
    id: "partner",
    label: "Strategic partner",
    description:
      "We'll discuss how your organisation and Genetico could work together across the rare " +
      "disease ecosystem.",
  },
  {
    id: "investor",
    label: "Investor",
    description:
      "We'll share what we have built, where it is deployed, and how Genetico is positioned in " +
      "the rare and genetic disease ecosystem.",
  },
];

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  await client.query("BEGIN");
  try {
    for (const [href, label] of Object.entries(MAIN_NAV)) {
      await client.query(`UPDATE navigation_main_nav SET label = $1 WHERE href = $2`, [
        label,
        href,
      ]);
    }
    await client.query(`UPDATE navigation_main_nav SET label = $1 WHERE type = 'dropdown'`, [
      DROPDOWN_LABEL,
    ]);

    for (const [href, label] of Object.entries(SOLUTIONS_NAV)) {
      await client.query(`UPDATE navigation_solutions_nav SET label = $1 WHERE href = $2`, [
        label,
        href,
      ]);
    }

    await client.query(
      `UPDATE footer SET tagline = $1, section_labels_solutions_heading = $2 WHERE id = 1`,
      [FOOTER_TAGLINE, DROPDOWN_LABEL],
    );

    // The menu is rewritten whole: rows are matched by position, extras removed.
    const menu = await client.query(
      `SELECT id FROM footer_menu_links WHERE _parent_id = 1 ORDER BY _order`,
    );
    for (const [i, link] of FOOTER_MENU.entries()) {
      const row = menu.rows[i];
      if (row) {
        await client.query(
          `UPDATE footer_menu_links SET label = $1, href = $2, _order = $3 WHERE id = $4`,
          [link.label, link.href, i + 1, row.id],
        );
      } else {
        await client.query(
          `INSERT INTO footer_menu_links (_order, _parent_id, id, label, href)
           VALUES ($1, 1, md5(random()::text), $2, $3)`,
          [i + 1, link.label, link.href],
        );
      }
    }
    const extra = menu.rows.slice(FOOTER_MENU.length).map((r) => r.id);
    if (extra.length) {
      await client.query(`DELETE FROM footer_menu_links WHERE id = ANY($1)`, [extra]);
    }

    for (const [i, role] of CONTACT_ROLES.entries()) {
      await client.query(
        `INSERT INTO site_settings_contact_roles (_order, _parent_id, id, label, description)
         VALUES ($1, 1, $2, $3, $4)
         ON CONFLICT (id) DO UPDATE
           SET _order = EXCLUDED._order, label = EXCLUDED.label, description = EXCLUDED.description`,
        [i + 1, role.id, role.label, role.description],
      );
    }

    const show = async (sql) => (await client.query(sql)).rows;
    console.log("nav:", await show(`SELECT label, href FROM navigation_main_nav ORDER BY _order`));
    console.log(
      "dropdown:",
      await show(`SELECT label, href FROM navigation_solutions_nav ORDER BY _order`),
    );
    console.log(
      "footer:",
      await show(`SELECT tagline, section_labels_solutions_heading FROM footer`),
    );
    console.log(
      "footer menu:",
      await show(`SELECT label, href FROM footer_menu_links ORDER BY _order`),
    );
    console.log(
      "roles:",
      await show(`SELECT id, label FROM site_settings_contact_roles ORDER BY _order`),
    );

    await client.query(DRY ? "ROLLBACK" : "COMMIT");
    console.log(DRY ? "Dry run — rolled back, nothing changed." : "Committed.");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
