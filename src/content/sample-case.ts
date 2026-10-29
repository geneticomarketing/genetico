/**
 * The one sample case every product mock-up on the site draws from.
 *
 * Management asked (2026-10-29) that the site's illustrations show what
 * IndiGeneUs.AI actually does, so these values are taken from the platform
 * itself rather than invented: the five HPO terms below were run through
 * Suggest Differentials on the demo account, and the ranking, scores,
 * analytics and comparison weights are what it returned. Keep them together —
 * the terms, the ranking and the charts have to agree with each other, and a
 * page that borrows only half of them will contradict the rest.
 *
 * Like the other *-demo files this is not CMS content: an editor changing one
 * score would leave a clinical picture that no longer adds up.
 *
 * Product rules the mock-ups must keep (see the claims check,
 * scripts/check-claims.mjs):
 * - RAPID Score is a decimal between 0 and 1, never a percentage.
 * - Differentials come from OMIM and Orphanet; no ICD-10 codes, variant calls
 *   or publication counts — the platform does not produce them.
 * - Registry, cohort and public-health views are real but not yet live; draw
 *   them with the "Coming soon" tag (src/components/coming-soon.tsx).
 */

/** Who the case is, as the case header shows it. */
export const CASE = {
  id: "GX-2041",
  patient: "Male · 2 y 4 m · Genetics OPD",
  urlBase: "app.indigeneus.ai / cases / GX-2041",
};

/** The examination note the clinician types (or dictates). */
export const CASE_NOTE =
  "2 y 4 m male. Global developmental delay, seizures since 8 months. Coarse facial features, " +
  "hepatosplenomegaly, corneal clouding. Wt 9.8 kg, Ht 82 cm, OFC 48 cm.";

/** What Extract HPO terms returns for that note, and the clinician then selects. */
export const CASE_HPO = [
  { name: "Global developmental delay", code: "HP:0001263" },
  { name: "Seizure", code: "HP:0001250" },
  { name: "Coarse facial features", code: "HP:0000280" },
  { name: "Hepatosplenomegaly", code: "HP:0001433" },
  { name: "Corneal opacity", code: "HP:0007957" },
];

/** Measurements against WHO standards, as the growth charts plot them. */
export const CASE_GROWTH = [
  { label: "Weight", value: "9.8 kg", z: "−2.1" },
  { label: "Height", value: "82 cm", z: "−2.3" },
  { label: "OFC", value: "48 cm", z: "−0.7" },
];

/**
 * The top of the ranked list Suggest Differentials returned for CASE_HPO.
 * The platform ranks 100 candidates; `RAPID_TOTAL` says so wherever a mock-up
 * shows only the first few.
 */
export const RAPID_RANKED = [
  { rank: 1, score: 0.382, id: "OMIM:256150", name: "Sialidosis type 2" },
  {
    rank: 2,
    score: 0.36,
    id: "OMIM:300868",
    name: "Multiple congenital anomalies-hypotonia-seizures syndrome",
  },
  {
    rank: 3,
    score: 0.353,
    id: "OMIM:301066",
    name: "Intellectual developmental disorder, X-linked",
  },
  { rank: 4, score: 0.351, id: "ORPHA:812", name: "Sialidosis type 1" },
  { rank: 5, score: 0.351, id: "ORPHA:354", name: "GM1 gangliosidosis" },
  { rank: 6, score: 0.348, id: "ORPHA:93399", name: "Juvenile sialidosis type 2" },
  { rank: 7, score: 0.341, id: "OMIM:280000", name: "CHIME syndrome" },
  { rank: 8, score: 0.337, id: "OMIM:253200", name: "Mucopolysaccharidosis, type VI" },
];

export const RAPID_TOTAL = 100;

/** How the platform explains the score, in its own words, shortened. */
export const RAPID_EXPLAINER =
  "Each symptom scores higher the fewer diseases it appears in; a disease's RAPID Score is the " +
  "sum over the symptoms the clinician selected.";

/**
 * Phenotype Analytics for the top candidate: how much each observed term
 * contributes, and the unobserved phenotypes most worth checking for next.
 */
export const PHENOTYPE_ANALYTICS = {
  disease: "Sialidosis type 2",
  observed: [
    { term: "Corneal opacity", score: 0.39 },
    { term: "Coarse facial features", score: 0.39 },
    { term: "Splenomegaly", score: 0.31 },
    { term: "Global developmental delay", score: 0.16 },
    { term: "Seizure", score: 0.15 },
  ],
  unobserved: [
    { term: "Dysostosis multiplex", score: 0.67 },
    { term: "Short thorax", score: 0.63 },
    { term: "Nephropathy", score: 0.61 },
    { term: "Pedal edema", score: 0.6 },
    { term: "Hydrops fetalis", score: 0.55 },
  ],
};

/**
 * Disease Compare: three candidates side by side, grouped by body system,
 * each phenotype with its weight. `observed` marks the ones the clinician has
 * ticked as present in this patient.
 */
export const DISEASE_COMPARE = {
  diseases: [
    { name: "Sialidosis type 2", id: "OMIM:256150", inheritance: "" },
    { name: "GM1 gangliosidosis", id: "ORPHA:354", inheritance: "" },
    {
      name: "Mucopolysaccharidosis, type II",
      id: "OMIM:309900",
      inheritance: "X-linked recessive",
    },
  ],
  systems: [
    {
      system: "Growth",
      cells: [
        [{ term: "Short stature", weight: 0.321 }],
        [
          { term: "Short stature", weight: 0.261 },
          { term: "Failure to thrive", weight: 0.308 },
        ],
        [
          { term: "Short stature", weight: 0.229 },
          { term: "Growth delay", weight: 0.231 },
        ],
      ],
    },
    {
      system: "Face",
      cells: [
        [{ term: "Coarse facial features", weight: 0.481, observed: true }],
        [
          { term: "Coarse facial features", weight: 0.481, observed: true },
          { term: "Frontal bossing", weight: 0.294 },
        ],
        [
          { term: "Coarse facial features", weight: 0.504, observed: true },
          { term: "Full cheeks", weight: 0.462 },
        ],
      ],
    },
    {
      system: "Eyes",
      cells: [
        [
          { term: "Corneal opacity", weight: 0.483, observed: true },
          { term: "Abnormal macular morphology", weight: 0.479 },
        ],
        [
          { term: "Cherry red spot of the macula", weight: 0.575 },
          { term: "Corneal opacity", weight: 0.347, observed: true },
        ],
        [
          { term: "Corneal opacity", weight: 0.347, observed: true },
          { term: "Retinopathy", weight: 0.529 },
        ],
      ],
    },
    {
      system: "Abdomen",
      cells: [
        [{ term: "Splenomegaly", weight: 0.421, observed: true }],
        [{ term: "Hepatosplenomegaly", weight: 0.461, observed: true }],
        [{ term: "Hepatosplenomegaly", weight: 0.525, observed: true }],
      ],
    },
  ],
};

/**
 * Smart Investigation Extract: an uploaded lab report read into a structured
 * table — test, date, and each value with its unit and reference range.
 */
export const LAB_EXTRACT = {
  file: "lft_report_city_lab.pdf",
  test: "Liver Function Test",
  date: "20/10/2026",
  rows: [
    { field: "SGPT (ALT)", value: "48", unit: "U/L", range: "7–56" },
    { field: "SGOT (AST)", value: "52", unit: "U/L", range: "10–40", high: true },
    { field: "Total bilirubin", value: "1.4", unit: "mg/dL", range: "0.1–1.2", high: true },
    { field: "Alkaline phosphatase", value: "310", unit: "U/L", range: "44–147", high: true },
    { field: "Albumin", value: "3.9", unit: "g/dL", range: "3.5–5.0" },
  ],
};

/**
 * Ambient dictation: the consultation is transcribed, and the platform
 * proposes values for the case fields, which fill only once the clinician
 * approves them.
 */
export const DICTATION = {
  transcript: [
    { who: "Doctor", line: "When did the fits start?" },
    { who: "Parent", line: "Around eight months. He still isn't walking on his own." },
    { who: "Doctor", line: "Any problems with his eyes?" },
    { who: "Parent", line: "The eye doctor said his corneas look cloudy." },
  ],
  proposed: [
    { section: "Chief complaints", value: "Seizures since 8 months" },
    { section: "Developmental history", value: "Not walking independently" },
    { section: "Examination", value: "Corneal clouding, per ophthalmology" },
  ],
};

/**
 * A test ordered from the case, sent to the laboratory's LIMS, and tracked
 * there. The statuses are the platform's own, in order; a sample can also be
 * rejected, with a reason, at the collection or receipt stage.
 */
export const LIMS_ORDER = {
  orderId: "TRF-BC-000214",
  department: "Biochemical",
  test: "Chitotriosidase",
  sample: "Plasma",
  category: "Postnatal",
  priority: "Routine",
  statuses: [
    "Sample due",
    "Sample collected",
    "Sample received",
    "Testing complete",
    "Awaiting validation",
    "Released",
  ],
  rejected: "Sample rejected",
};

/** Follow-up visits on the same record, newest first. */
export const FOLLOW_UPS = [
  { date: "24/10/2026", note: "Follow-up visit; liver function reviewed" },
  { date: "20/10/2026", note: "Liver function test imported" },
  { date: "14/10/2026", note: "First consultation; differentials and test order" },
];
