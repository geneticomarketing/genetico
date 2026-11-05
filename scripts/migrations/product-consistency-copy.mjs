/**
 * Content update: every page describes IndiGeneUs.AI the way the Platform
 * page does (after the product lead's review, 2026-11-03).
 *
 *   node --env-file=.env scripts/migrations/product-consistency-copy.mjs --check   (read-only)
 *   node --env-file=.env scripts/migrations/product-consistency-copy.mjs
 *
 * Run `npm run cms:backup` first. Content goes live the moment it commits.
 *
 * What changes:
 * - Home and About "four layers": Capture names pedigree; Decide becomes
 *   Clinical intelligence (RAPID Score and what drives each rank); Connect
 *   adds orders tracked in the LIMS, as Platform's Order to Report does.
 * - Hospital: the hero's "100% HPO-coded" and "2 wks to a working pilot"
 *   become figures the platform shows; "2–3 hrs per case" goes.
 * - Life Science: "90%+" becomes a statement without a number.
 * - Public Health: mechanics the platform does not have yet (offline sync,
 *   mobile forms, red-flag checklists, alerts, reminders, consent capture,
 *   ICMR/crowdfunding portals, DPDP) are taken out; the model and roles stay.
 *
 * Every update names the row by id and the value it expects to find. A row
 * already holding the new value is skipped, so the script is safe to re-run;
 * a row holding anything else aborts the whole run. One transaction.
 */

import pg from "pg";

/** [table, id, column, expected current value, new value] */
const UPDATES = [
  // ── Home · IndiGeneUs.AI, four layers
  [
    "home_platform_layers",
    "6abcc71149ed0f4efc540106",
    "body",
    "Structured intake at the point of care — phenotype, dictated history and lab reports converted into computable fields instead of free text.",
    "Structured intake at the point of care — pedigree, phenotype, dictated history and lab reports converted into computable fields instead of free text.",
  ],
  [
    "home_platform_layers",
    "6abcc71149ed0f4efc540107",
    "body",
    "Clinical decision support surfaces ranked differentials with the evidence behind each one, inside the existing workflow.",
    "RAPID Score ranks rare diseases against the patient's phenotypes, and Phenotype Analytics shows what drives each rank, inside the existing workflow.",
  ],
  ["home_platform_layers", "6abcc71149ed0f4efc540107", "tag", "CDSS", "Clinical intelligence"],
  [
    "home_platform_layers",
    "6abcc71149ed0f4efc540108",
    "body",
    "One longitudinal record per patient across visits, departments, labs and centres — no re-entry, no duplication.",
    "Tests ordered from the case and tracked in the LIMS, on one longitudinal record per patient across visits, labs and centres — no re-entry, no duplication.",
  ],
  [
    "home_platform_layers",
    "6abcc71149ed0f4efc540108",
    "tag",
    "Longitudinal record",
    "Orders & longitudinal care",
  ],

  // ── About · what we are building, four steps
  [
    "about_platform_steps",
    "6abcc76090e98507ac7700dd",
    "body",
    "Phenotype, history and documents recorded as structured fields at the point of care.",
    "Pedigree, phenotype, dictated history and lab reports recorded as structured fields at the point of care.",
  ],
  [
    "about_platform_steps",
    "6abcc76090e98507ac7700de",
    "body",
    "Ranked differentials with the evidence behind each one, reviewed by the treating team.",
    "RAPID Score ranks rare diseases against the patient's phenotypes, with the analytics behind each rank, reviewed by the treating team.",
  ],
  [
    "about_platform_steps",
    "6abcc76090e98507ac7700df",
    "body",
    "One longitudinal record per patient across visits, departments and centres.",
    "Tests ordered and tracked through the LIMS, on one longitudinal record per patient across visits, departments and centres.",
  ],

  // ── Hospital · hero figures and outcomes
  ["solution_pages_hero_stats", "6aa7a39f869c2b5b806a463a", "figure", "100%", "100"],
  [
    "solution_pages_hero_stats",
    "6aa7a39f869c2b5b806a463a",
    "label",
    "HPO-coded records",
    "diseases ranked per case",
  ],
  ["solution_pages_hero_stats", "6aa7a39f869c2b5b806a463b", "figure", "2 wks", "1"],
  [
    "solution_pages_hero_stats",
    "6aa7a39f869c2b5b806a463b",
    "label",
    "to a working pilot",
    "record per patient, every visit",
  ],
  [
    "solution_pages_measurable_outcomes_metrics",
    "6a8c31490a0077421c0c0ecb",
    "before",
    "2–3 hrs per case",
    "Hours of manual documentation",
  ],

  // ── Life Science · outcomes
  [
    "solution_pages_measurable_outcomes_metrics",
    "6a8c314b0a0077421c0c0edf",
    "figure",
    "90%+",
    "Days, not months",
  ],

  // ── Public Health · impact
  [
    "public_health_impact_features",
    "6aa79f4ca2566d24b8258969",
    "description",
    "Primary health centres, district hospitals, and Centres of Excellence work from one shared case record instead of parallel registers.",
    "Primary health centres, district hospitals and Centres of Excellence are built to work from one shared case record instead of parallel registers.",
  ],
  [
    "public_health_impact_features",
    "6aa79f4ca2566d24b825896b",
    "title",
    "No duplicate entry across ICMR and crowdfunding portals",
    "Captured once, reused for reporting",
  ],
  [
    "public_health_impact_features",
    "6aa79f4ca2566d24b825896b",
    "description",
    "Case data captured once is reused for registry submissions, funding applications, and ministry reporting.",
    "Case data captured once in care is reused for registry submissions and programme reporting as those views launch.",
  ],
  [
    "public_health_impact_features",
    "6aa79f4ca2566d24b825896c",
    "title",
    "Built for India's DPDP Act",
    "Access control and audit trails built in",
  ],
  [
    "public_health_impact_features",
    "6aa79f4ca2566d24b825896c",
    "description",
    "Role-based access, consent capture, and a complete audit trail are part of the workflow, not a bolt-on.",
    "Role-based access and a complete audit trail are part of the workflow, not a bolt-on.",
  ],

  // ── Public Health · three-tier model
  [
    "public_health_three_tier",
    1,
    "description",
    "Genetico operates across all three levels of India's healthcare system — connecting frontline workers to national policy data through a single platform.",
    "IndiGeneUs.AI is designed to work across all three levels of India's healthcare system — connecting frontline workers to national programme data through a single platform.",
  ],
  [
    "public_health_three_tier_tiers_happens",
    "6aa79f4da2566d24b825897b",
    "item",
    "Follow-up visit tracking and treatment adherence",
    "Follow-up visit tracking",
  ],
  [
    "public_health_three_tier_tiers_happens",
    "6aa79f4da2566d24b8258985",
    "item",
    "Frontline screening and red-flag checks",
    "Frontline screening of suspected cases",
  ],
  [
    "public_health_three_tier_tiers_happens",
    "6aa79f4da2566d24b8258986",
    "item",
    "Family history and consent capture",
    "Family history capture",
  ],
  [
    "public_health_three_tier_tiers_happens",
    "6aa79f4da2566d24b8258988",
    "item",
    "Patient counselling and follow-up reminders",
    "Patient counselling and follow-up visits",
  ],
  [
    "public_health_three_tier_tiers_data_flows",
    "6aa79f4da2566d24b825898a",
    "item",
    "Suspected-case alerts → referral queue",
    "Suspected cases → referral to the district",
  ],
  [
    "public_health_three_tier_tiers_data_flows",
    "6aa79f4da2566d24b825898c",
    "item",
    "Consent records → audit log",
    "Every action → audit log",
  ],
  [
    "public_health_three_tier_tiers_users",
    "6aa79f4da2566d24b8258981",
    "description",
    "Suspected-case intake, red-flag checklists, referral notes",
    "Suspected-case intake, referral notes",
  ],
  [
    "public_health_three_tier_tiers_users",
    "6aa79f4da2566d24b825898d",
    "description",
    "Mobile screening forms, family history capture, visit log",
    "Screening forms, family history capture, visit log",
  ],
  [
    "public_health_three_tier_tiers_users",
    "6aa79f4da2566d24b825898f",
    "description",
    "Offline-capable capture, validation prompts, sync status",
    "Structured data capture and validation",
  ],
];

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function current(table, rowId, column) {
  const { rows } = await client.query(`SELECT "${column}" AS v FROM "${table}" WHERE id = $1`, [
    rowId,
  ]);
  return rows.length === 1 ? { found: true, value: rows[0].v } : { found: false };
}

async function main() {
  await client.connect();

  const problems = [];
  for (const [table, rowId, column, from, to] of UPDATES) {
    const row = await current(table, rowId, column);
    if (!row.found || (row.value !== from && row.value !== to)) {
      problems.push(`${table} #${rowId}.${column} is "${row.value}"`);
    }
  }

  if (process.argv.includes("--check")) {
    for (const p of problems) console.log(`  ${p}`);
    console.log(
      problems.length
        ? `\n${problems.length} row(s) differ.`
        : `All ${UPDATES.length} rows as expected; ready to run.`,
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
  let skipped = 0;
  for (const [table, rowId, column, , to] of UPDATES) {
    if ((await current(table, rowId, column)).value === to) {
      skipped++;
      continue;
    }
    await client.query(`UPDATE "${table}" SET "${column}" = $1 WHERE id = $2`, [to, rowId]);
    console.log(`  ${table}.${column}\n    → ${to}`);
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
