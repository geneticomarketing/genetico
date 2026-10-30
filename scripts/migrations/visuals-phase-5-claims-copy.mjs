/**
 * Content update: visuals rework phase 5 — CMS copy that claimed features
 * IndiGeneUs.AI does not have (checked hands-on 2026-10-29), brought in line
 * with the redrawn mock-ups.
 *
 *   node --env-file=.env scripts/migrations/visuals-phase-5-claims-copy.mjs --check   (read-only)
 *   node --env-file=.env scripts/migrations/visuals-phase-5-claims-copy.mjs
 *
 * Run `npm run cms:backup` first. Content goes live the moment it commits.
 *
 * What changes, by page:
 * - Platform: RAPID, Phenotype Analytics and Disease Compare copy no longer
 *   claims genomic evidence or published literature; badges name the real
 *   screens; "RAPID Score™" loses the ™ until legal confirms it; visit
 *   summaries and real-time dashboards go; integrations list only the LIMS
 *   and the knowledge bases; the report-reading tab describes Smart
 *   Investigation Extract; two feature tabs added — Ambient Dictation and
 *   Growth Charts (their drawings already exist, picked by title).
 * - Hospital: RAPID step loses "genomic evidence", follow-up step loses
 *   automatic recalls. Life Science: cohort step says it is launching soon.
 * - Public Health: stroke-network wording (PCI, EGC, thrombolysis,
 *   ambulances, 30-minute badges) replaced with rare-disease tiers; genotype
 *   capture, follow-up scheduling, automated ministry reports and real-time
 *   dashboards corrected.
 * - Home and About: dictation and lab reports named in Capture; Analyse says
 *   launching soon; the longitudinal output matches the sample case.
 *
 * Every update names the row by id and the value it expects to find. A row
 * already holding the new value is skipped, so the script is safe to re-run;
 * a row holding anything else aborts the whole run. One transaction.
 */

import { randomBytes } from "node:crypto";

import pg from "pg";

/** [table, id, column, expected current value, new value] */
const UPDATES = [
  // ── Platform · Clinical Intelligence
  [
    "platform_clinical_intelligence",
    1,
    "description",
    "AI-assisted clinical decision support that combines phenotypic, genomic, and clinical evidence to help clinicians evaluate complex rare disease cases with greater confidence.",
    "AI-assisted clinical decision support that ranks rare diseases against a patient's phenotype and shows the evidence behind every rank, helping clinicians evaluate complex cases with greater confidence.",
  ],
  [
    "platform_clinical_intelligence_capabilities",
    "6aa298f95f9c0b14a4ff5af6",
    "title",
    "RAPID Score™",
    "RAPID Score",
  ],
  [
    "platform_clinical_intelligence_capabilities",
    "6aa298f95f9c0b14a4ff5af6",
    "description",
    "Prioritizes likely differential diagnoses by continuously analyzing structured phenotypic, genomic, and clinical data as new information becomes available.",
    "Ranks 100 OMIM and Orphanet diseases against the HPO terms the clinician selects. Rarer symptoms weigh more, and the list re-ranks as terms are added or removed.",
  ],
  [
    "platform_clinical_intelligence_capabilities",
    "6aa298f95f9c0b14a4ff5af6",
    "badge",
    "AI-Assisted Differential Diagnosis",
    "Suggest differentials · RAPID Score",
  ],
  [
    "platform_clinical_intelligence_capabilities",
    "6aa298f95f9c0b14a4ff5af7",
    "description",
    "Every recommendation is fully traceable to structured phenotypic data, genomic findings, clinical guidelines, and published literature, ensuring AI remains transparent, explainable, and clinician-controlled.",
    "Phenotype Analytics shows how much each observed symptom contributed to a disease's rank, and which unobserved phenotypes are most worth checking for next — so the AI stays transparent, explainable and clinician-controlled.",
  ],
  [
    "platform_clinical_intelligence_capabilities",
    "6aa298f95f9c0b14a4ff5af7",
    "badge",
    "Transparent & Explainable AI",
    "Phenotype analytics",
  ],
  [
    "platform_clinical_intelligence_capabilities",
    "6aa298f95f9c0b14a4ff5af8",
    "description",
    "Compare clinically similar rare diseases side by side using phenotypic overlap, genomic findings, inheritance patterns, and supporting evidence to improve diagnostic confidence.",
    "Compare clinically similar rare diseases side by side, body system by body system, with each phenotype's weight and the inheritance pattern. Mark what the patient has or lacks, and it writes back to the case.",
  ],
  [
    "platform_clinical_intelligence_capabilities",
    "6aa298f95f9c0b14a4ff5af8",
    "badge",
    "AI-Assisted Disease Comparison",
    "Disease compare",
  ],

  // ── Platform · feature tabs
  [
    "platform_features_features",
    "6aa298f75f9c0b14a4ff5af1",
    "description",
    "Digitize laboratory reports, genetic test results, and clinical documents using AI-powered OCR and intelligent data extraction to create structured, searchable clinical records.",
    "Upload a lab report as an image or PDF and Smart Investigation Extract reads the test, its date, and every value with its unit and reference range — reviewed by the clinician before it is saved.",
  ],

  // ── Platform · Longitudinal Care
  [
    "platform_longitudinal_care",
    1,
    "description",
    "Build lifelong patient records that evolve with every consultation, enabling continuous care, AI-assisted insights, outcome tracking, and research-ready longitudinal data.",
    "Build lifelong patient records that grow with every consultation, enabling continuous care, outcome tracking and research-ready longitudinal data.",
  ],
  [
    "platform_longitudinal_care_columns",
    "6aa298fa5f9c0b14a4ff5b00",
    "description",
    "Transform structured clinical data into real-time dashboards that reveal patient trends, cohort insights, disease progression, and operational performance across institutions.",
    "Registry and cohort views, built on the same structured records, will show patient trends, cohort insights and disease progression across institutions.",
  ],
  [
    "platform_longitudinal_care_columns_bullets",
    "6aa298fa5f9c0b14a4ff5afa",
    "item",
    "AI-assisted visit summaries and clinical documentation",
    "Follow-up visits and imported lab results on one record",
  ],

  // ── Platform · Infrastructure
  [
    "platform_infrastructure",
    1,
    "integrations_description",
    "IndiGeneUs.AI is designed to work alongside your existing digital ecosystem. Connect with hospital information systems, laboratory platforms, genetic testing workflows, and external knowledge resources to create a unified clinical experience.",
    "IndiGeneUs.AI works alongside the systems your institution already runs. Test orders go straight to the laboratory's LIMS, and differentials draw on OMIM, Orphanet and HPO. Connections to other hospital systems are scoped with each institution.",
  ],
  [
    "platform_infrastructure_integration_bullets",
    "6aa298fc5f9c0b14a4ff5b01",
    "item",
    "HL7 / FHIR-native exchange with hospital systems",
    "Orders and sample tracking through the laboratory's LIMS",
  ],
  [
    "platform_infrastructure_integration_bullets",
    "6aa298fc5f9c0b14a4ff5b02",
    "item",
    "Direct connections to LIMS, lab and genetic testing platforms",
    "Released reports return to the patient record",
  ],
  [
    "platform_infrastructure_integration_bullets",
    "6aa298fc5f9c0b14a4ff5b03",
    "item",
    "Live lookups against OMIM, ORPHANET and HPO",
    "Differentials drawn from OMIM, Orphanet and HPO",
  ],

  // ── Hospital (solution page "hospital")
  [
    "solution_pages_how_it_works_rows",
    "6a8c31490a0077421c0c0ec9",
    "description",
    "RAPID Score™ combines phenotypic, genomic, and clinical evidence into a ranked differential — every candidate traceable to the evidence behind it.",
    "RAPID Score ranks 100 OMIM and Orphanet diseases against the HPO terms the clinician selects, and Phenotype Analytics shows what each symptom contributed — every candidate traceable to the evidence behind it.",
  ],
  [
    "solution_pages_how_it_works_rows",
    "6a8c31490a0077421c0c0eca",
    "description",
    "Track patient journeys, monitor outcomes, and enrich structured datasets for care, analytics, and research — with recalls and reviews surfaced automatically.",
    "Track patient journeys across follow-up visits, imported lab results and test orders, and enrich structured datasets for care, analytics and research.",
  ],

  // ── Life Science (solution page "pharma")
  [
    "solution_pages_how_it_works_rows",
    "6a8c314b0a0077421c0c0ede",
    "description",
    "Identify patient cohorts, monitor disease progression, and generate longitudinal datasets for natural history studies and evidence generation.",
    "Identify patient cohorts, monitor disease progression, and generate longitudinal datasets for natural history studies and evidence generation. Cohort views are launching soon.",
  ],

  // ── Public Health
  [
    "public_health_impact_features",
    "6aa79f4ca2566d24b825896a",
    "title",
    "Real-time national dashboards",
    "National programme dashboards",
  ],
  [
    "public_health_impact_features",
    "6aa79f4ca2566d24b825896a",
    "description",
    "Programme officers see case volumes, referral turnaround, and district coverage as they happen — no monthly collation cycle.",
    "Case volumes, referral turnaround and district coverage drawn from the shared record, without a monthly collation cycle. Launching soon.",
  ],
  [
    "public_health_three_tier_tiers_happens",
    "6aa79f4da2566d24b825896d",
    "item",
    "Structured phenotyping and genotype capture",
    "Structured phenotyping and test ordering",
  ],
  [
    "public_health_three_tier_tiers_happens",
    "6aa79f4da2566d24b8258970",
    "item",
    "Automated reporting to ministries",
    "Registry reporting to the national programme",
  ],
  [
    "public_health_three_tier_tiers_users",
    "6aa79f4da2566d24b8258976",
    "description",
    "Pedigree editor, patient history, follow-up scheduling",
    "Pedigree editor, patient history, follow-up visits",
  ],
  [
    "public_health_three_tier_tiers_users",
    "6aa79f4da2566d24b8258977",
    "description",
    "NPRD automated reports, ministry submissions, audit logs",
    "NPRD reports, ministry submissions, audit logs",
  ],
  [
    "public_health_three_tier_tiers_users",
    "6aa79f4da2566d24b8258983",
    "description",
    "Follow-up scheduling, patient contact log, transport requests",
    "Follow-up visits, patient contact log, referral tracking",
  ],
  [
    "public_health_three_tier_tiers_data_flows",
    "6aa79f4da2566d24b8258973",
    "item",
    "Ministry reports → automated, scheduled",
    "Ministry reports → from the same records",
  ],
  [
    "public_health_architecture_classifications_tags",
    "6aa79f4fa2566d24b8258993",
    "tag",
    "Automated NPRD reports",
    "NPRD reports",
  ],
  [
    "public_health_architecture_classifications",
    "6aa79f4fa2566d24b8258994",
    "description",
    "PCI-capable national coordination. Aggregates reporting from all Spoke C hospitals, publishes policy guidance, and maintains the national rare disease registry.",
    "National coordination. Aggregates reporting from the Centres of Excellence, publishes policy guidance and maintains the national rare disease registry.",
  ],
  [
    "public_health_architecture_classifications",
    "6aa79f4fa2566d24b8258998",
    "level",
    "Spoke C | Secondary level",
    "Spoke C | Tertiary level",
  ],
  [
    "public_health_architecture_classifications",
    "6aa79f4fa2566d24b8258998",
    "time_badge",
    "<30 min",
    null,
  ],
  [
    "public_health_architecture_classifications",
    "6aa79f4fa2566d24b8258998",
    "description",
    "EGC-capable hospitals within 30 minutes of the hub. Manage confirmed rare disease cases, run specialist workflows, and refer complex cases upward.",
    "Centres of Excellence for rare diseases. Manage confirmed cases, run specialist workflows, and refer complex cases upward.",
  ],
  [
    "public_health_architecture_classifications",
    "6aa79f4fa2566d24b825899c",
    "level",
    "Spoke D | Primary level",
    "Spoke D | District level",
  ],
  [
    "public_health_architecture_classifications",
    "6aa79f4fa2566d24b825899c",
    "time_badge",
    ">30 min",
    null,
  ],
  [
    "public_health_architecture_classifications",
    "6aa79f4fa2566d24b825899c",
    "description",
    "EGC and thrombolysis capable, more than 30 minutes from the hub. First point of contact — screen for suspected cases and dispatch ambulance referrals to Spoke C.",
    "First point of contact. Screen for suspected cases and refer them to a Centre of Excellence.",
  ],

  // ── Home
  [
    "home_does_areas",
    "6abcc71049ed0f4efc540102",
    "output",
    "5 events linked · 4 sources",
    "3 visits · lab results imported",
  ],
  [
    "home_platform_layers",
    "6abcc71149ed0f4efc540106",
    "body",
    "Structured intake at the point of care — phenotype, history and documents converted into computable fields instead of free text.",
    "Structured intake at the point of care — phenotype, dictated history and lab reports converted into computable fields instead of free text.",
  ],
  [
    "home_platform_layers",
    "6abcc71149ed0f4efc540109",
    "body",
    "Cohorts, registries and programme dashboards built from the same structured data the clinic already produced.",
    "Cohorts, registries and programme dashboards built from the same structured data the clinic already produced — launching soon.",
  ],

  // ── About
  [
    "about_platform_steps",
    "6abcc76090e98507ac7700e0",
    "body",
    "Cohorts, registries and dashboards from the data the clinic already produced.",
    "Cohorts, registries and dashboards from the data the clinic already produced — launching soon.",
  ],
];

/** Integrations: only what is confirmed — the LIMS and the knowledge bases. */
const INTEGRATION_TAGS = ["Laboratory LIMS", "OMIM", "Orphanet", "DECIPHER", "HPO"];
const OLD_INTEGRATION_TAGS = [
  "HL7 / FHIR",
  "EHR Systems",
  "Lab APIs",
  "OMIM",
  "ORPHANET",
  "HAPI-FHIR",
  "Custom Webhooks",
  "DICOM",
];

/** Two Platform feature tabs; their drawings are picked by "Dictation" and "Growth" in the title. */
const NEW_FEATURES = [
  {
    title: "Ambient Dictation",
    category: "Dictation",
    subheading: "The consultation, written up as it happens",
    description:
      "Record the doctor–patient conversation and IndiGeneUs.AI transcribes it, proposing values for the case fields — chief complaints, history, examination. Nothing is filled in until the clinician approves it.",
    bullets: [
      "Speech-to-text of the consultation",
      "Proposed values for each case section",
      "Fills the case only after clinician approval",
    ],
  },
  {
    title: "Growth Charts",
    category: "Growth",
    subheading: "Measurements against WHO and IAP standards",
    description:
      "Weight, height and head circumference are plotted against WHO and IAP standards with Z-scores and percentiles at every visit, and abnormal growth adds its HPO terms to the case.",
    bullets: [
      "WHO (0–5 y) and IAP (5–18 y) standards",
      "Z-scores and percentiles at every visit",
      "Growth findings feed HPO extraction",
    ],
  },
];

const id = () => randomBytes(12).toString("hex");

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Set DATABASE_URI in .env before running this update.");
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

/** `--check`: compare every row with what the script expects, and write nothing. */
async function check() {
  let problems = 0;
  for (const [table, rowId, column, from, to] of UPDATES) {
    const { rows } = await client.query(`SELECT "${column}" AS v FROM "${table}" WHERE id = $1`, [
      rowId,
    ]);
    const current = rows[0]?.v;
    if (rows.length !== 1 || (current !== from && current !== to)) {
      problems++;
      console.log(`  ${table} #${rowId}.${column} is "${current}"`);
    }
  }
  console.log(
    problems ? `\n${problems} row(s) differ.` : `All ${UPDATES.length} rows as expected.`,
  );
  process.exitCode = problems ? 1 : 0;
}

async function main() {
  await client.connect();
  if (process.argv.includes("--check")) return check();
  await client.query("BEGIN");

  let changed = 0;
  let skipped = 0;
  for (const [table, rowId, column, from, to] of UPDATES) {
    const { rows } = await client.query(`SELECT "${column}" AS v FROM "${table}" WHERE id = $1`, [
      rowId,
    ]);
    if (rows.length !== 1)
      throw new Error(`${table} #${rowId} not found. Nothing has been changed.`);
    const current = rows[0].v;
    if (current === to) {
      skipped++;
      continue;
    }
    if (current !== from) {
      throw new Error(
        `${table} #${rowId}.${column} is "${current}", expected "${from}". Nothing has been changed.`,
      );
    }
    await client.query(`UPDATE "${table}" SET "${column}" = $1 WHERE id = $2`, [to, rowId]);
    console.log(`  ${table}.${column}\n    → ${to ?? "(empty)"}`);
    changed++;
  }

  // Integration tags: replace the list only if it is still the original one.
  const { rows: tags } = await client.query(
    `SELECT tag FROM platform_infrastructure_integration_tags WHERE _parent_id = 1 ORDER BY _order`,
  );
  const current = tags.map((t) => t.tag);
  if (current.join("|") === OLD_INTEGRATION_TAGS.join("|")) {
    await client.query(`DELETE FROM platform_infrastructure_integration_tags WHERE _parent_id = 1`);
    for (const [i, tag] of INTEGRATION_TAGS.entries()) {
      await client.query(
        `INSERT INTO platform_infrastructure_integration_tags (_order, _parent_id, id, tag) VALUES ($1, 1, $2, $3)`,
        [i + 1, id(), tag],
      );
    }
    console.log(`  platform_infrastructure_integration_tags\n    → ${INTEGRATION_TAGS.join(", ")}`);
    changed++;
  } else if (current.join("|") === INTEGRATION_TAGS.join("|")) {
    skipped++;
  } else {
    throw new Error(
      `Integration tags were edited (${current.join(", ")}). Nothing has been changed.`,
    );
  }

  // Feature tabs: append each one not already present, after the last tab.
  for (const feature of NEW_FEATURES) {
    const { rows: existing } = await client.query(
      `SELECT id FROM platform_features_features WHERE _parent_id = 1 AND title = $1`,
      [feature.title],
    );
    if (existing.length) {
      skipped++;
      continue;
    }
    const {
      rows: [{ max }],
    } = await client.query(
      `SELECT COALESCE(MAX(_order), 0) AS max FROM platform_features_features WHERE _parent_id = 1`,
    );
    const featureId = id();
    await client.query(
      `INSERT INTO platform_features_features
         (_order, _parent_id, id, title, category, subheading, description)
       VALUES ($1, 1, $2, $3, $4, $5, $6)`,
      [
        max + 1,
        featureId,
        feature.title,
        feature.category,
        feature.subheading,
        feature.description,
      ],
    );
    for (const [i, item] of feature.bullets.entries()) {
      await client.query(
        `INSERT INTO platform_features_features_bullets (_order, _parent_id, id, item) VALUES ($1, $2, $3, $4)`,
        [i + 1, featureId, id(), item],
      );
    }
    console.log(`  platform_features_features\n    + ${feature.title}`);
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
