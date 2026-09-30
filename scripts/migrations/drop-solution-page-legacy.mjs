/**
 * Removes the Solution page columns the redesign left behind.
 *
 *   node --env-file=.env scripts/backup-cms.mjs      # first, always
 *   node --env-file=.env scripts/drop-solution-page-legacy.mjs
 *
 * DO NOT RUN THIS UNTIL THE REBUILT /hospital AND /life-science ARE LIVE.
 * The deployed pages still read these columns, and `.env` points at the
 * production database — dropping them early blanks the live pages.
 *
 * The order is: seed the new fields, deploy the new code, run this, then
 * delete the `deprecated()` block in `src/payload/collections/SolutionPages.ts`
 * along with every field it wraps. Removing those fields from the schema
 * while the columns still exist is what makes the next `npm run dev` stop on
 * an interactive Drizzle prompt, so the two have to happen in this order.
 *
 * Pass --dry to print the statements without running them.
 */

import pg from "pg";

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this.");
  process.exit(1);
}

const dry = process.argv.includes("--dry");

const statements = [
  // The challenge cards: only the title and body survive.
  `ALTER TABLE solution_pages_clinical_burden_cards
     DROP COLUMN IF EXISTS label,
     DROP COLUMN IF EXISTS badge,
     DROP COLUMN IF EXISTS badge_theme,
     DROP COLUMN IF EXISTS number,
     DROP COLUMN IF EXISTS card_id`,
  `DROP TABLE IF EXISTS solution_pages_clinical_burden_cards_collapsed_title`,

  // Walkthrough steps: the redesign numbers and alternates them by position.
  `ALTER TABLE solution_pages_how_it_works_rows
     DROP COLUMN IF EXISTS number,
     DROP COLUMN IF EXISTS reverse,
     DROP COLUMN IF EXISTS tinted`,

  // Outcomes: the rings are gone, replaced by figure / before / after / note.
  `ALTER TABLE solution_pages_measurable_outcomes_metrics
     DROP COLUMN IF EXISTS metric_id,
     DROP COLUMN IF EXISTS max_percent,
     DROP COLUMN IF EXISTS metric_theme,
     DROP COLUMN IF EXISTS center_value,
     DROP COLUMN IF EXISTS hide_center_sub_label,
     DROP COLUMN IF EXISTS from_text,
     DROP COLUMN IF EXISTS to_text,
     DROP COLUMN IF EXISTS negative,
     DROP COLUMN IF EXISTS positive`,

  // The closing band's buttons: the enquiry form replaced them.
  `DROP TABLE IF EXISTS solution_pages_cta_buttons`,

  // Enums left with no column pointing at them.
  `DROP TYPE IF EXISTS enum_solution_burden_badge_theme`,
  `DROP TYPE IF EXISTS solution_burden_badge_theme`,
  `DROP TYPE IF EXISTS enum_solution_metric_theme`,
  `DROP TYPE IF EXISTS solution_metric_theme`,
];

if (dry) {
  console.log(statements.join(";\n\n") + ";");
  process.exit(0);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });
await client.connect();

try {
  await client.query("BEGIN");
  for (const sql of statements) {
    await client.query(sql);
    console.log(sql.split("\n")[0].trim() + " …");
  }
  await client.query("COMMIT");
  console.log("\nDone. Now delete the deprecated fields from SolutionPages.ts.");
} catch (error) {
  await client.query("ROLLBACK");
  console.error("Rolled back:", error);
  process.exitCode = 1;
} finally {
  await client.end();
}
