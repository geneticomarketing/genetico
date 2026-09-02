/**
 * Content update: rewrite the home page "Who We Are" section (fold 2).
 *
 * Replaces the three short paragraphs with two longer ones. The bold phrases in the supplied copy
 * become the section's blue/underlined highlights.
 *
 *   node --env-file=.env scripts/update-home-who-we-are.mjs
 *
 * Idempotent — deletes the existing paragraphs (highlights cascade) and reinserts a fixed set with
 * fixed ids, so re-running produces exactly the same rows. Runs in a single transaction.
 *
 * Every highlight is checked to be a verbatim substring of its paragraph before anything is
 * written: a phrase that does not match letter for letter silently renders as plain text.
 */

import pg from "pg";

const EYEBROW = "Who We Are";

const PARAGRAPHS = [
  {
    id: "6b1a2c3d4e5f000000000001",
    text:
      "Trusted by leading institutions including AIIMS New Delhi and adopted by CDFD Hyderabad " +
      "for the PraGed Mission across the 15 Rare Disease Centres under it, Genetico is building " +
      "the digital backbone for the rare and genetic disease ecosystem. Through IndiGeneUs.AI, " +
      "our AI-enabled clinical genetics platform, we connect patient records, clinical workflows, " +
      "phenotype data, registries, decision support, analytics, and research into one secure " +
      "ecosystem.",
    highlights: [
      { id: "6b1a2c3d4e5f0000000000a1", phrase: "AIIMS New Delhi" },
      {
        id: "6b1a2c3d4e5f0000000000a2",
        phrase:
          "adopted by CDFD Hyderabad for the PraGed Mission across the 15 Rare Disease " +
          "Centres under it",
      },
      { id: "6b1a2c3d4e5f0000000000a3", phrase: "IndiGeneUs.AI" },
    ],
  },
  {
    id: "6b1a2c3d4e5f000000000002",
    text:
      "Today, rare disease data is scattered across hospitals, laboratories, registries, research " +
      "programs, and public health systems. By transforming fragmented information into " +
      "structured, connected, and computable data, Genetico enables better clinical decisions, " +
      "accelerates research, strengthens public health programs, and supports collaboration " +
      "across the entire rare disease ecosystem.",
    highlights: [],
  },
];

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

/** A highlight that is not a verbatim substring renders as plain text, with no error anywhere. */
function assertHighlightsMatch() {
  for (const paragraph of PARAGRAPHS) {
    for (const { phrase } of paragraph.highlights) {
      if (!paragraph.text.includes(phrase)) {
        throw new Error(`Highlight "${phrase}" does not appear verbatim in its paragraph.`);
      }
    }
  }
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  assertHighlightsMatch();

  await client.connect();
  await client.query("BEGIN");

  const parent = await client.query(`SELECT id FROM home_who_we_are ORDER BY id LIMIT 1`);
  if (parent.rowCount !== 1) {
    throw new Error(`Expected 1 home_who_we_are row, found ${parent.rowCount}.`);
  }
  const parentId = parent.rows[0].id;

  await client.query(`UPDATE home_who_we_are SET eyebrow = $1 WHERE id = $2`, [EYEBROW, parentId]);

  // Highlights cascade on paragraph delete.
  await client.query(`DELETE FROM home_who_we_are_paragraphs WHERE _parent_id = $1`, [parentId]);

  for (const [index, paragraph] of PARAGRAPHS.entries()) {
    await client.query(
      `INSERT INTO home_who_we_are_paragraphs (_order, _parent_id, id, text)
       VALUES ($1, $2, $3, $4)`,
      [index + 1, parentId, paragraph.id, paragraph.text],
    );

    for (const [hIndex, highlight] of paragraph.highlights.entries()) {
      await client.query(
        `INSERT INTO home_who_we_are_paragraphs_highlights (_order, _parent_id, id, phrase)
         VALUES ($1, $2, $3, $4)`,
        [hIndex + 1, paragraph.id, highlight.id, highlight.phrase],
      );
    }

    console.log(
      `  Paragraph ${index + 1}: ${paragraph.highlights.length} highlight(s), ` +
        `${paragraph.text.length} characters`,
    );
  }

  await client.query("COMMIT");

  const { rows } = await client.query(
    `SELECT p._order, p.text, coalesce(count(h.id), 0)::int AS highlights
       FROM home_who_we_are_paragraphs p
       LEFT JOIN home_who_we_are_paragraphs_highlights h ON h._parent_id = p.id
      WHERE p._parent_id = $1
      GROUP BY p._order, p.text
      ORDER BY p._order`,
    [parentId],
  );

  console.log("\nWho We Are now reads:");
  for (const row of rows) {
    console.log(`\n  ${row._order}. (${row.highlights} highlighted) ${row.text}`);
  }
}

main()
  .catch(async (error) => {
    await client.query("ROLLBACK").catch(() => {});
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => client.end());
