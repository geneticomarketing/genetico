/**
 * Drop home_news.resource_picks.
 *
 * The home page "Insights" section used to be hand-curated through a custom picker: an editor chose
 * one featured item and up to four sidebar items, stored as JSON in this column. The section now
 * derives itself from the Resources page — featured post by the "Show as the featured post on the
 * home page" checkbox, side list by publish date — so the picker is dead weight, and leaving it in
 * the admin panel would show an editor a control that changes nothing.
 *
 * Run this BEFORE removing the field from src/payload/globals/sections/home.ts. Payload pushes
 * schema on dev boot, and removing a field from the config while the column still exists stops the
 * dev server on an interactive Drizzle prompt that never gets answered.
 *
 *   node --env-file=.env scripts/drop-home-news-resource-picks.mjs
 *
 * Idempotent — DROP COLUMN IF EXISTS. Prints the discarded picks first so they are recoverable
 * from the log if anyone wants them back.
 */

import pg from "pg";

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();

  const exists = await client.query(
    `SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'home_news' AND column_name = 'resource_picks'`,
  );

  if (!exists.rowCount) {
    console.log("home_news.resource_picks is already gone — nothing to do.");
    return;
  }

  const current = await client.query(`SELECT resource_picks FROM home_news`);
  console.log("Discarding these picks (kept here in case they are ever wanted back):");
  console.log(JSON.stringify(current.rows[0]?.resource_picks ?? null, null, 2));

  await client.query("BEGIN");
  await client.query(`ALTER TABLE home_news DROP COLUMN IF EXISTS resource_picks`);
  await client.query("COMMIT");

  console.log("\nDropped home_news.resource_picks.");
}

main()
  .catch(async (error) => {
    await client.query("ROLLBACK").catch(() => {});
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => client.end());
