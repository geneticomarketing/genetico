/**
 * Content update: home page section 05 (Impact), the "In clinical use" figure.
 *
 * The figure and its description named only AIIMS New Delhi and CDFD Hyderabad. The figure now
 * adds SGRH, and the description names Sir Ganga Ram Hospital in full, plus "other centres" for
 * the smaller sites.
 *
 *   node --env-file=.env scripts/migrations/update-home-impact-clinical-use.mjs
 *
 * Idempotent — sets an absolute value on the one figure labelled "In clinical use". Runs in a
 * single transaction.
 */

import pg from "pg";

const LABEL = "In clinical use";
const FIGURE = "AIIMS · CDFD · SGRH";
const BODY =
  "Genetics departments at AIIMS New Delhi, CDFD Hyderabad, Sir Ganga Ram Hospital and other " +
  "centres use IndiGeneUs.AI in consultations.";

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  await client.query("BEGIN");

  const result = await client.query(
    `UPDATE "home_impact_figures" SET figure = $1, body = $2 WHERE label = $3`,
    [FIGURE, BODY, LABEL],
  );

  if (result.rowCount !== 1) {
    throw new Error(
      `Expected exactly 1 figure labelled "${LABEL}", updated ${result.rowCount}. ` +
        `Nothing has been changed.`,
    );
  }

  console.log(`  7. Impact — ${LABEL}`);
  console.log(`    ${FIGURE}`);
  console.log(`    ${BODY}\n`);

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
