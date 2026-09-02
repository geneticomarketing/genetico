/**
 * Content update: rewrite the heading and sub-heading of three home page sections.
 *
 * The folds as counted on the rendered page, and the CMS section each one is:
 *
 *   Fold 4  →  "5. Ecosystem Challenges — heading"  (the stakeholder cards)
 *   Fold 5  →  "6. Ecosystem Gaps — heading"        (the patient-journey tabs)
 *   Fold 6  →  "7. News & Articles"                 (the news band)
 *
 * The CMS numbers run one ahead from fold 4 onwards because the panel counts the Partners heading
 * and Security & Trust as separate sections, while on the page they read as part of folds 2 and 3.
 *
 *   node --env-file=.env scripts/update-home-section-headings.mjs
 *
 * Idempotent — sets absolute values on single-row globals. Runs in a single transaction.
 */

import pg from "pg";

const SECTIONS = [
  {
    fold: 4,
    table: "home_ecosystem_challenges",
    section: "5. Ecosystem Challenges — heading",
    heading: "Solutions for Every Stakeholder in the Rare Disease Ecosystem",
    description: "Purpose-built solutions for every organisation involved in rare disease care.",
  },
  {
    fold: 5,
    table: "home_ecosystem_gaps",
    section: "6. Ecosystem Gaps — heading",
    heading: "Supporting the Entire Rare Disease Journey",
    description:
      "From first symptoms to long-term care, Genetico helps connect every stage of the " +
      "patient journey.",
  },
  {
    fold: 6,
    table: "home_news",
    section: "7. News & Articles",
    heading: "Insights from the Rare Disease Ecosystem",
    description:
      "Explore the latest updates, perspectives, and developments shaping rare disease care, " +
      "research, and technology.",
  },
];

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  await client.query("BEGIN");

  for (const section of SECTIONS) {
    const result = await client.query(
      `UPDATE "${section.table}" SET heading = $1, description = $2`,
      [section.heading, section.description],
    );

    if (result.rowCount !== 1) {
      throw new Error(
        `Expected exactly 1 row in ${section.table}, updated ${result.rowCount}. ` +
          `Nothing has been changed.`,
      );
    }

    console.log(`  Fold ${section.fold} — ${section.section}`);
    console.log(`    ${section.heading}`);
    console.log(`    ${section.description}\n`);
  }

  await client.query("COMMIT");
  console.log("Committed.");
}

main()
  .catch(async (error) => {
    await client.query("ROLLBACK").catch(() => {});
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => client.end());
