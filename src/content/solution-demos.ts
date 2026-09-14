/**
 * The product mock-ups on /hospital and /life-science.
 *
 * Clinical artefacts, not marketing copy: HPO codes, RAPID Score™ rankings,
 * extraction rows and care pathways. They are wrong in ways an editor cannot
 * be expected to catch, so they live in the repo and go through review like
 * the rest of `src/content` — the same call made for the Platform page.
 *
 * The panels these feed are each pinned to one walkthrough step, which is why
 * the CMS warns that adding or removing a step changes which picture it gets.
 */

/* ------------------------------------------------------------------ shared */

/** The document-import panel, identical on both pages bar the filename. */
export const EXTRACT_ROWS = [
  { label: "Gene variant", value: "BRCA2 pathogenic c.5946delT" },
  { label: "Phenotype", value: "HP:0001250 Seizures" },
  { label: "Phenotype", value: "HP:0000924 Skeletal anomalies" },
  { label: "Lab value", value: "CK: 1,240 U/L ↑ elevated" },
] as const;

export const EXTRACT_TAGS = ["Structured", "HPO tagged", "Registry-ready"] as const;

/* ------------------------------------------------------------- life science */

/** Sites on the shared schema, shown as chips in the third hero card. */
export const RESEARCH_SITES = [
  "AIIMS Delhi",
  "SGPGI Lucknow",
  "CDFD",
  "SGRH",
  "Manovikas",
  "+7 more",
] as const;

/** The hero's cohort card. `patients` ticks; the rest hold still. */
export const COHORT_SUMMARY = {
  /** Counts up to `patientsTo` and starts over, so the card reads as live. */
  patientsFrom: 247,
  patientsTo: 262,
  centres: "12",
  hpoCoded: "98%",
} as const;

export const NATURAL_HISTORY_ROWS = [
  { label: "Baseline capture", value: "Complete", good: false },
  { label: "Follow-up visits", value: "186 tracked", good: false },
  { label: "Registry export", value: "Ready", good: true },
] as const;

/** Step 1 — the structured intake form. */
export const INTAKE_TABS = ["Demographics", "Symptoms", "HPO Terms", "History", "Summary"] as const;
export const INTAKE_ACTIVE_TAB = "HPO Terms";
export const INTAKE_HPO_TERMS = [
  "Seizures HP:0001250",
  "Hypotonia HP:0001290",
  "Ataxia HP:0001251",
] as const;
export const INTAKE_FAMILY_HISTORY = [
  { label: "None", selected: false },
  { label: "Affected sibling", selected: true },
  { label: "Unknown", selected: false },
] as const;
export const INTAKE_COMPLETION = 60;

/** Step 3 — cohort discovery. Each filter swaps the three counts. */
export const COHORT_FILTERS = [
  { label: "Age 2–18", eligible: "214", enrolled: "138", sites: "12" },
  { label: "HPO: Seizures", eligible: "84", enrolled: "61", sites: "9" },
  { label: "Confirmed diagnosis", eligible: "126", enrolled: "94", sites: "11" },
  { label: "Follow-up ≥ 2 yrs", eligible: "68", enrolled: "52", sites: "8" },
] as const;

/** Which filter the card opens on, matching the handoff. */
export const COHORT_DEFAULT_FILTER = 1;

export const COHORT_COVERAGE = [
  { label: "Baseline visits", value: "100%", good: false },
  { label: "12-month follow-up", value: "78%", good: false },
  { label: "Registry export", value: "Ready", good: true },
] as const;

/* ----------------------------------------------------------------- hospital */

/** The hero consultation card: terms arrive, then the ranking fills in. */
export const HERO_HPO_TERMS = [
  "HP:0001250 Seizures",
  "HP:0000924 Skeletal anomaly",
  "HP:0004322 Short stature",
] as const;

export const HERO_RANKED = [
  { name: "Marfan syndrome", value: 94 },
  { name: "Ehlers-Danlos syndrome", value: 67 },
  { name: "Loeys-Dietz syndrome", value: 38 },
] as const;

/** Step 1 — the care pathway, part done and part still to come. */
export const CARE_PATHWAY = [
  { label: "Referral triage", meta: "Auto-flagged as suspected rare disease", state: "Done" },
  { label: "Structured intake", meta: "Demographics, HPO terms, family history", state: "Done" },
  { label: "Phenotype review", meta: "Clinician confirms extracted terms", state: "Active" },
  { label: "Genomic order", meta: "Panel vs. exome recommendation", state: "Next" },
  { label: "MDT sign-off", meta: "Board review and care plan", state: "Queued" },
] as const;

export type PathwayState = (typeof CARE_PATHWAY)[number]["state"];

/** Step 3 — RAPID Score™. Picking a candidate swaps the evidence beneath. */
export const RANKED_CANDIDATES = [
  {
    name: "Dravet syndrome",
    code: "G40.82",
    value: 74,
    evidence: [
      { label: "Phenotype match", value: "7 of 9 HPO terms" },
      { label: "Variant evidence", value: "SCN1A · likely pathogenic" },
      { label: "Onset pattern", value: "Consistent (infancy)" },
    ],
  },
  {
    name: "GEFS+",
    code: "G40.30",
    value: 48,
    evidence: [
      { label: "Phenotype match", value: "5 of 9 HPO terms" },
      { label: "Variant evidence", value: "SCN1A · uncertain" },
      { label: "Onset pattern", value: "Partially consistent" },
    ],
  },
  {
    name: "Lennox-Gastaut",
    code: "G40.812",
    value: 23,
    evidence: [
      { label: "Phenotype match", value: "3 of 9 HPO terms" },
      { label: "Variant evidence", value: "None reported" },
      { label: "Onset pattern", value: "Later than expected" },
    ],
  },
  {
    name: "Angelman syndrome",
    code: "Q93.51",
    value: 15,
    evidence: [
      { label: "Phenotype match", value: "2 of 9 HPO terms" },
      { label: "Variant evidence", value: "UBE3A · not detected" },
      { label: "Onset pattern", value: "Inconsistent" },
    ],
  },
] as const;

/** Step 4 — the patient timeline. */
export const PATIENT = {
  initials: "AS",
  name: "Ananya Sharma",
  meta: "GEN-2024-041 · rare skeletal dysplasia",
  status: "Active",
  /** How far along the rule is drawn, as a percentage. */
  progress: 74,
  lastNoteLabel: "Last note — Dec 2023",
  lastNote: "Skeletal dysplasia confirmed. NPRD report filed. Next review in 8 months.",
  dueNotice: "Follow-up due Aug 2024",
} as const;

export const PATIENT_TIMELINE = [
  { date: "Jan 2023", label: "Initial visit", done: true },
  { date: "Jun 2023", label: "Follow-up consult", done: true },
  { date: "Dec 2023", label: "Diagnosis confirmed", done: true },
  { date: "Aug 2024", label: "Follow-up due", done: false },
] as const;

/* ------------------------------------------------------------- presentation */

/**
 * Backgrounds for the challenge carousel, lightest first.
 *
 * Positional rather than stored with the card: an editor reordering the
 * challenges should keep the gradient running dark-to-light across the row,
 * not carry one card's colour with it.
 */
export const CHALLENGE_GROUNDS = [
  "radial-gradient(120% 130% at 20% 15%,#123A5C 0%,#0A1F2E 60%,#060F17 100%)",
  "radial-gradient(120% 130% at 25% 20%,#0F3F6B 0%,#0A2438 65%,#07121C 100%)",
  "radial-gradient(120% 130% at 25% 20%,#0D4574 0%,#0A2A42 65%,#07141F 100%)",
  "radial-gradient(120% 130% at 25% 20%,#0B4C86 0%,#0A3050 65%,#07161F 100%)",
] as const;
