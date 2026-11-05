/**
 * Content update: clear the hero "Background image" paths that no page shows
 * (codebase clean-up, 2026-11-05).
 *
 *   node --env-file=.env scripts/migrations/clear-unused-hero-images.mjs --check   (read-only)
 *   node --env-file=.env scripts/migrations/clear-unused-hero-images.mjs
 *
 * The Platform, Public Health and Resources heroes are drawn without a
 * background photo, so their image fields are now hidden in the admin and the
 * three PNGs they pointed at (5 MB) are deleted from public/. This clears the
 * stored paths so nothing references a missing file. Columns stay; no schema
 * change.
 *
 * Each row is named by table and the value it expects; a row already cleared
 * is skipped, a row holding anything else aborts the run. One transaction.
 */

import pg from "pg";

/** [table, expected image_url] — each a single-row global, id 1. */
const ROWS = [
  ["platform_hero", "/platformhero.png"],
  ["public_health_hero", "/phero.png"],
  ["resources_hero", "/rhero.png"],
];

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function read(table) {
  const { rows } = await client.query(`SELECT image_url, image_id FROM "${table}" WHERE id = 1`);
  return rows[0];
}

async function main() {
  await client.connect();

  const problems = [];
  for (const [table, expected] of ROWS) {
    const row = await read(table);
    if (!row) problems.push(`${table} has no row`);
    else if (row.image_id !== null)
      problems.push(`${table} has an uploaded image (#${row.image_id})`);
    else if (row.image_url !== expected && row.image_url !== null)
      problems.push(`${table}.image_url is "${row.image_url}"`);
  }

  if (process.argv.includes("--check")) {
    for (const p of problems) console.log(`  ${p}`);
    console.log(
      problems.length
        ? `\n${problems.length} problem(s).`
        : "All 3 rows as expected; ready to run.",
    );
    process.exitCode = problems.length ? 1 : 0;
    return;
  }
  if (problems.length) {
    for (const p of problems) console.error(`  ${p}`);
    throw new Error("Rows not in the expected state. Nothing has been changed.");
  }

  await client.query("BEGIN");
  let changed = 0;
  for (const [table] of ROWS) {
    if ((await read(table)).image_url === null) continue;
    await client.query(`UPDATE "${table}" SET image_url = NULL WHERE id = 1`);
    console.log(`  ${table}.image_url → (empty)`);
    changed++;
  }
  await client.query("COMMIT");
  console.log(`\nCommitted: ${changed} changed, ${ROWS.length - changed} already clear.`);
}

main()
  .catch(async (error) => {
    await client.query("ROLLBACK").catch(() => {});
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => client.end());
