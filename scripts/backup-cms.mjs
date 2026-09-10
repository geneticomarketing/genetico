/**
 * Dumps every row of every table to a timestamped JSON file in .cms-backup/.
 *
 * `.env` points DATABASE_URI at the production Supabase project and there is
 * no staging database, so take one of these before any schema work — the
 * repo has no Payload migrations, which means a bad push has nothing to
 * replay from. Read-only: it never writes to the database.
 *
 *   node --env-file=.env scripts/backup-cms.mjs
 *
 * Output shape matches the 2026-08-31 backup taken by hand — an object keyed
 * by table name, each holding that table's rows — so the two are comparable.
 */

import { mkdirSync, writeFileSync } from "node:fs";

import pg from "pg";

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before taking a backup.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });
await client.connect();

const { rows: tables } = await client.query(
  `SELECT table_name
     FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name`,
);

const dump = {};
let total = 0;

for (const { table_name: table } of tables) {
  // Table names come from information_schema, not from user input, but they
  // still cannot be parameterised — quote them so an odd name cannot break
  // out of the identifier.
  const { rows } = await client.query(`SELECT * FROM "${table}"`);
  dump[table] = rows;
  total += rows.length;
}

await client.end();

mkdirSync(".cms-backup", { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const file = `.cms-backup/cms-${stamp}.json`;
writeFileSync(file, JSON.stringify(dump, null, 2));

console.log(`Backed up ${tables.length} tables, ${total} rows -> ${file}`);
