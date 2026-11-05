/**
 * Content update: the product lead's review of the Platform page (2026-11-03).
 *
 * Runs AFTER visuals-phase-5-claims-copy.mjs — it expects the copy that script
 * writes, and refuses to run until it has been applied.
 *
 *   node --env-file=.env scripts/migrations/platform-review-copy.mjs --check   (read-only)
 *   node --env-file=.env scripts/migrations/platform-review-copy.mjs
 *
 * Run `npm run cms:backup` first. Content goes live the moment it commits.
 *
 * What changes:
 * - Feature tabs reordered so a case builds up in sequence and phenotyping
 *   hands on to Clinical Intelligence: Pedigree, Structured Clinical
 *   Workflows, Ambient Dictation, OCR & Report Digitization, Growth Charts,
 *   AI-powered Phenotyping.
 * - Clinical Intelligence: the description no longer says "clinical
 *   evidence" (which is phenotype data again) and names the integrated
 *   databases instead.
 * - Longitudinal Care: "disease trend visualization" and "population-level
 *   evidence" go from the analytics bullets.
 * - Infrastructure: "without disrupting existing workflows" becomes a
 *   positive phrase; integrations name a direct connection to the LIMS and
 *   genetic testing platforms, and add GeneReviews to the lookups and tags.
 *
 * Every update names the row by id and the value it expects to find. A row
 * already holding the new value is skipped, so the script is safe to re-run;
 * a row holding anything else aborts the whole run. One transaction.
 */

import { randomBytes } from "node:crypto";

import pg from "pg";

/** [table, id, column, expected current value, new value] */
const UPDATES = [
  // ── Clinical Intelligence
  [
    "platform_clinical_intelligence",
    1,
    "description",
    "AI-assisted clinical decision support that ranks rare diseases against a patient's phenotype and shows the evidence behind every rank, helping clinicians evaluate complex cases with greater confidence.",
    "AI-assisted clinical decision support that ranks rare diseases against a patient's phenotypes, through integration with disease databases (OMIM and Orphanet), and shows what drives every rank, helping clinicians evaluate complex cases with greater confidence.",
  ],

  // ── Longitudinal Care · Advanced Clinical Analytics
  [
    "platform_longitudinal_care_columns_bullets",
    "6aa298fa5f9c0b14a4ff5afd",
    "item",
    "Interactive cohort analysis and disease trend visualization",
    "Interactive cohort analysis across patient records",
  ],
  [
    "platform_longitudinal_care_columns_bullets",
    "6aa298fa5f9c0b14a4ff5aff",
    "item",
    "Export research-ready reports and population-level evidence",
    "Export research-ready reports and datasets",
  ],

  // ── Infrastructure
  [
    "platform_infrastructure",
    1,
    "description",
    "Designed to integrate with existing healthcare ecosystems while providing the flexibility to deploy across hospitals, research institutions, and public health programs without disrupting existing workflows.",
    "Designed to integrate with existing healthcare ecosystems, with the flexibility to deploy across hospitals, research institutions and public health programmes, fitting into the workflows teams already use.",
  ],
  [
    "platform_infrastructure",
    1,
    "integrations_description",
    "IndiGeneUs.AI works alongside the systems your institution already runs. Test orders go straight to the laboratory's LIMS, and differentials draw on OMIM, Orphanet and HPO. Connections to other hospital systems are scoped with each institution.",
    "IndiGeneUs.AI works alongside the systems your institution already runs. Test orders go straight to the LIMS, and differentials draw on OMIM, Orphanet and HPO, with GeneReviews to hand. Connections to other hospital systems are scoped with each institution.",
  ],
  [
    "platform_infrastructure_integration_bullets",
    "6aa298fc5f9c0b14a4ff5b01",
    "item",
    "Orders and sample tracking through the laboratory's LIMS",
    "Direct connection to LIMS and genetic testing platforms",
  ],
  [
    "platform_infrastructure_integration_bullets",
    "6aa298fc5f9c0b14a4ff5b03",
    "item",
    "Differentials drawn from OMIM, Orphanet and HPO",
    "Live lookups against OMIM, Orphanet, HPO and GeneReviews",
  ],
];

/** What phase 5 leaves in the tag list, and what replaces it. */
const PHASE_5_TAGS = ["Laboratory LIMS", "OMIM", "Orphanet", "DECIPHER", "HPO"];
const INTEGRATION_TAGS = [
  "LIMS",
  "Genetic testing platforms",
  "OMIM",
  "Orphanet",
  "HPO",
  "GeneReviews",
  "DECIPHER",
];

/** Feature tabs by title, in their new order. Phase 5 adds the dictation and growth tabs. */
const FEATURE_ORDER = [
  "Pedigree Intelligence",
  "Structured Clinical Workflows",
  "Ambient Dictation",
  "OCR & Report Digitization",
  "Growth Charts",
  "AI-powered Phenotyping",
];

const id = () => randomBytes(12).toString("hex");

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function featureRows() {
  const { rows } = await client.query(
    `SELECT id, title, _order FROM platform_features_features WHERE _parent_id = 1 ORDER BY _order`,
  );
  return rows;
}

async function tagList() {
  const { rows } = await client.query(
    `SELECT tag FROM platform_infrastructure_integration_tags WHERE _parent_id = 1 ORDER BY _order`,
  );
  return rows.map((r) => r.tag);
}

/** Returns a list of problems; empty means the database is ready (or already done). */
async function inspect() {
  const problems = [];
  for (const [table, rowId, column, from, to] of UPDATES) {
    const { rows } = await client.query(`SELECT "${column}" AS v FROM "${table}" WHERE id = $1`, [
      rowId,
    ]);
    const current = rows[0]?.v;
    if (rows.length !== 1 || (current !== from && current !== to)) {
      problems.push(`${table} #${rowId}.${column} is "${current}"`);
    }
  }
  const tags = (await tagList()).join("|");
  if (tags !== PHASE_5_TAGS.join("|") && tags !== INTEGRATION_TAGS.join("|")) {
    problems.push(`integration tags are "${tags.replaceAll("|", ", ")}"`);
  }
  const titles = (await featureRows()).map((r) => r.title);
  const missing = FEATURE_ORDER.filter((t) => !titles.includes(t));
  const extra = titles.filter((t) => !FEATURE_ORDER.includes(t));
  if (missing.length) problems.push(`feature tabs missing: ${missing.join(", ")}`);
  if (extra.length) problems.push(`unexpected feature tabs: ${extra.join(", ")}`);
  return problems;
}

async function main() {
  await client.connect();

  const problems = await inspect();
  if (process.argv.includes("--check")) {
    for (const p of problems) console.log(`  ${p}`);
    console.log(
      problems.length
        ? `\n${problems.length} problem(s). Has visuals-phase-5-claims-copy.mjs been run?`
        : "Everything as expected; ready to run.",
    );
    process.exitCode = problems.length ? 1 : 0;
    return;
  }
  if (problems.length) {
    for (const p of problems) console.error(`  ${p}`);
    throw new Error(
      "Not in the expected state (run visuals-phase-5-claims-copy.mjs first). Nothing has been changed.",
    );
  }

  await client.query("BEGIN");
  let changed = 0;
  let skipped = 0;

  for (const [table, rowId, column, , to] of UPDATES) {
    const { rows } = await client.query(`SELECT "${column}" AS v FROM "${table}" WHERE id = $1`, [
      rowId,
    ]);
    if (rows[0].v === to) {
      skipped++;
      continue;
    }
    await client.query(`UPDATE "${table}" SET "${column}" = $1 WHERE id = $2`, [to, rowId]);
    console.log(`  ${table}.${column}\n    → ${to}`);
    changed++;
  }

  if ((await tagList()).join("|") === PHASE_5_TAGS.join("|")) {
    await client.query(`DELETE FROM platform_infrastructure_integration_tags WHERE _parent_id = 1`);
    for (const [i, tag] of INTEGRATION_TAGS.entries()) {
      await client.query(
        `INSERT INTO platform_infrastructure_integration_tags (_order, _parent_id, id, tag) VALUES ($1, 1, $2, $3)`,
        [i + 1, id(), tag],
      );
    }
    console.log(`  platform_infrastructure_integration_tags\n    → ${INTEGRATION_TAGS.join(", ")}`);
    changed++;
  } else {
    skipped++;
  }

  const features = await featureRows();
  if (features.map((r) => r.title).join("|") === FEATURE_ORDER.join("|")) {
    skipped++;
  } else {
    for (const [i, title] of FEATURE_ORDER.entries()) {
      await client.query(
        `UPDATE platform_features_features SET _order = $1 WHERE _parent_id = 1 AND title = $2`,
        [i + 1, title],
      );
    }
    console.log(`  platform_features_features order\n    → ${FEATURE_ORDER.join(", ")}`);
    changed++;
  }

  await client.query("COMMIT");
  console.log(`\nCommitted: ${changed} changed, ${skipped} already up to date.`);
}

main()
  .catch(async (error) => {
    await client.query("ROLLBACK").catch(() => {});
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => client.end());
