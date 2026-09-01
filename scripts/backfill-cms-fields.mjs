/**
 * Fills the newly-exposed CMS fields with the values the website was already
 * hardcoding, so the admin panel shows the live wording instead of a blank box.
 *
 * Run once, after scripts/migrate-cms-realignment.mjs:
 *   node --env-file=.env scripts/backfill-cms-fields.mjs
 *
 * Only writes where the field is currently empty, so it is safe to re-run and
 * will never overwrite something an editor has since changed.
 */

import pg from "pg";

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this backfill.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

/** Single-row globals: fill a column only when it is empty. */
const GLOBAL_FIELDS = [
  ["public_health_three_tier", "eyebrow", "THREE-TIER MODEL"],
  ["public_health_architecture", "eyebrow", "Architecture"],
  ["public_health_architecture", "classification_label", "HOSPITAL CLASSIFICATION"],
  ["resources_blog_listing", "eyebrow", "Genetico Blogs"],
  [
    "resources_hero",
    "description",
    "A curated collection of videos, articles, and clinical updates from Genetico's work in rare and genetic diseases. Built for clinicians, researchers, and healthcare teams.",
  ],
];

/** Globals that did not exist before and have no row yet. */
const NEW_GLOBALS = [
  ["resources_videos_section", "heading", "Videos"],
  ["resources_articles_section", "heading", "Articles"],
];

async function main() {
  await client.connect();
  await client.query("BEGIN");

  try {
    for (const [table, column, value] of GLOBAL_FIELDS) {
      const result = await client.query(
        `UPDATE ${table} SET ${column} = $1 WHERE ${column} IS NULL OR ${column} = ''`,
        [value],
      );
      console.log(`${table}.${column}: ${result.rowCount} row(s) filled`);
    }

    for (const [table, column, value] of NEW_GLOBALS) {
      const existing = await client.query(`SELECT id FROM ${table} LIMIT 1`);
      if (existing.rowCount === 0) {
        await client.query(
          `INSERT INTO ${table} (${column}, updated_at, created_at) VALUES ($1, now(), now())`,
          [value],
        );
        console.log(`${table}: created with ${column} = "${value}"`);
      } else {
        const result = await client.query(
          `UPDATE ${table} SET ${column} = $1 WHERE ${column} IS NULL OR ${column} = ''`,
          [value],
        );
        console.log(`${table}.${column}: ${result.rowCount} row(s) filled`);
      }
    }

    await client.query("COMMIT");
    console.log("\nBackfill committed.");
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
