/**
 * Partner logo strip — make the ordering usable from the admin panel.
 *
 * Two problems this fixes:
 *
 *  1. The ten logos were numbered 0,1,2 … 9, which contradicts the field's own guidance ("Use 10,
 *     20, 30 so you can slot items in later") and leaves no room to insert a logo between two
 *     existing ones without renumbering every row. They become 10, 20, 30 … 100, order unchanged.
 *
 *  2. The column default was 0, so a logo added through the admin panel jumped to the *front* of
 *     the strip. It becomes 1000, so a new logo lands at the end where an editor expects it.
 *
 * The default is changed here, in the database, BEFORE the matching `defaultValue` edit in
 * src/payload/collections/Partners.ts — Payload pushes schema on dev boot, and it must find a
 * schema that already matches so it has nothing to prompt about.
 *
 *   node --env-file=.env scripts/fix-partner-logo-ordering.mjs
 *
 * Idempotent — ordering is recomputed from the current running order, so re-running is a no-op.
 * Runs in a single transaction.
 */

import pg from "pg";

const STEP = 10;
const NEW_ROW_DEFAULT = 1000;

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  await client.query("BEGIN");

  const before = await client.query(
    `SELECT id, name, sort_order FROM partners ORDER BY sort_order NULLS LAST, id`,
  );

  if (!before.rowCount) {
    throw new Error("No partner rows found — nothing to renumber.");
  }

  // Renumber in the order the strip currently renders, so the visible order does not move.
  for (const [index, row] of before.rows.entries()) {
    await client.query(`UPDATE partners SET sort_order = $1 WHERE id = $2`, [
      (index + 1) * STEP,
      row.id,
    ]);
  }

  await client.query(`ALTER TABLE partners ALTER COLUMN sort_order SET DEFAULT ${NEW_ROW_DEFAULT}`);

  const after = await client.query(
    `SELECT id, name, sort_order FROM partners ORDER BY sort_order NULLS LAST, id`,
  );

  const orderBefore = before.rows.map((r) => r.name).join(" | ");
  const orderAfter = after.rows.map((r) => r.name).join(" | ");

  if (orderBefore !== orderAfter) {
    throw new Error(
      `Renumbering changed the running order.\n  was: ${orderBefore}\n  now: ${orderAfter}`,
    );
  }

  await client.query("COMMIT");

  console.log(`Renumbered ${after.rowCount} logos in steps of ${STEP}; running order unchanged.\n`);
  console.table(after.rows.map((r) => ({ name: r.name, sortOrder: r.sort_order })));
  console.log(
    `\nNew logos added in the admin panel now default to ${NEW_ROW_DEFAULT} (end of strip).`,
  );
}

main()
  .catch(async (error) => {
    await client.query("ROLLBACK").catch(() => {});
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => client.end());
