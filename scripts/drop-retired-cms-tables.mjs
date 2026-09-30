/**
 * Drops the CMS tables for the sections the final site no longer has.
 *
 *   npm run cms:backup                                         # first, always
 *   node --env-file=.env scripts/drop-retired-cms-tables.mjs --dry   # review
 *   node --env-file=.env scripts/drop-retired-cms-tables.mjs
 *
 * What goes:
 *  - The earlier home page's sections (hero slides, audience doors, platform
 *    glance, proof, FAQs, call to action) and the ones already retired before
 *    that (who we are, ecosystem challenges and gaps, news). The final home
 *    page reads home-intro … home-contact instead.
 *  - The earlier About page's hero, vision and foundations (now about-intro …
 *    about-mission).
 *  - Resources "filter tabs", retired when the tabs became automatic.
 *  - The ecosystem-modules and ecosystem-gaps collections, which no page has
 *    read since the redesign, and their columns in Payload's lock table.
 *
 * Run it BEFORE starting `npm run dev` with the config that no longer defines
 * these sections: otherwise Payload's schema push sees tables it does not know
 * and stops on an interactive "delete this table?" prompt.
 *
 * Any deployment still running the previous code keeps working: its loaders
 * fall back to built-in copy when a section's table is missing.
 *
 * Transactional (all or nothing) and idempotent (safe to re-run).
 */
import pg from "pg";

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this.");
  process.exit(1);
}

const dry = process.argv.includes("--dry");

const TABLES = [
  // Home page, earlier design
  "home_hero_buttons",
  "home_hero_credentials",
  "home_hero_hero_slides",
  "home_hero_rotating_words",
  "home_hero",
  "home_audience_doors_points",
  "home_audience_doors",
  "home_audience",
  "home_platform_glance_layers",
  "home_platform_glance",
  "home_proof_clips",
  "home_proof",
  "home_faqs_items",
  "home_faqs",
  "home_cta_buttons",
  "home_cta",
  // Home page, retired before that
  "home_who_we_are_paragraphs_highlights",
  "home_who_we_are_paragraphs",
  "home_who_we_are",
  "home_ecosystem_challenges",
  "home_ecosystem_gaps",
  "home_news",
  // About page, earlier design
  "about_hero_labels",
  "about_hero_rotating_words",
  "about_hero",
  "about_vision",
  "about_foundations_items",
  "about_foundations",
  // Resources
  "resources_filter_tabs_filter_tabs",
  "resources_filter_tabs",
  // Unused collections
  "ecosystem_modules",
  "ecosystem_gaps",
];

const statements = [
  `ALTER TABLE payload_locked_documents_rels
     DROP COLUMN IF EXISTS ecosystem_modules_id,
     DROP COLUMN IF EXISTS ecosystem_gaps_id`,
  ...TABLES.map((table) => `DROP TABLE IF EXISTS "${table}" CASCADE`),
];

if (dry) {
  console.log(statements.join(";\n") + ";");
  process.exit(0);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });
await client.connect();
try {
  await client.query("BEGIN");
  for (const sql of statements) {
    await client.query(sql);
    console.log(sql.split("\n")[0].trim());
  }
  await client.query("COMMIT");
  console.log(`\nDone: ${TABLES.length} tables dropped (or already gone).`);
} catch (error) {
  await client.query("ROLLBACK");
  console.error("Rolled back:", error);
  process.exitCode = 1;
} finally {
  await client.end();
}
