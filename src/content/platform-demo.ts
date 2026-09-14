/**
 * The illustrative panels on the Platform page.
 *
 * Deliberately not CMS content, for the same reason as the home hero's demo:
 * these are clinical artefacts rather than copy. The scores, ICD codes, HPO
 * counts and variant calls have to agree with each other and with the case
 * they describe, and several of them drive bar widths. A plausible-looking
 * edit in the admin panel would read as a real clinical claim while being
 * wrong.
 *
 * Every panel is labelled on the page with what it is.
 */

export type DemoCase = {
  label: string;
  /** One line of context: age, presentation, key finding. */
  meta: string;
  /** Candidate diagnoses with their RAPID score out of 100. */
  rows: { name: string; score: number }[];
  stats: { value: string; label: string }[];
};

/** How long each case holds in the hero before the next one, in ms. */
export const CASE_ROTATE_MS = 6500;

export const HERO_CASES: DemoCase[] = [
  {
    label: "Epilepsy",
    meta: "4-year-old · febrile seizures, developmental delay · SCN1A variant detected",
    rows: [
      { name: "Dravet Syndrome", score: 74 },
      { name: "GEFS+", score: 48 },
      { name: "Lennox-Gastaut", score: 23 },
    ],
    stats: [
      { value: "12", label: "HPO matched" },
      { value: "47", label: "Publications" },
      { value: "OMIM", label: "Confirmed path." },
    ],
  },
  {
    label: "Metabolic",
    meta: "8-month-old · hypoglycaemia, hepatomegaly · elevated lactate on newborn panel",
    rows: [
      { name: "Glycogen Storage Ia", score: 68 },
      { name: "Fructose-1,6-BPase Def.", score: 41 },
      { name: "Mitochondrial Dis.", score: 19 },
    ],
    stats: [
      { value: "9", label: "HPO matched" },
      { value: "31", label: "Publications" },
      { value: "ORPHA", label: "Likely path." },
    ],
  },
  {
    label: "Neuromuscular",
    meta: "6-year-old · proximal weakness, raised CK · calf hypertrophy on examination",
    rows: [
      { name: "Duchenne MD", score: 81 },
      { name: "Becker MD", score: 37 },
      { name: "Limb-Girdle MD", score: 16 },
    ],
    stats: [
      { value: "14", label: "HPO matched" },
      { value: "62", label: "Publications" },
      { value: "DMD", label: "Del. exon 45–50" },
    ],
  },
];

/** Ranked differentials with their ICD-10 codes, for the RAPID Score panel. */
export const RANKED_DIAGNOSES = [
  { name: "Dravet Syndrome", code: "G40.82", score: 74 },
  { name: "GEFS+", code: "G40.30", score: 48 },
  { name: "Lennox-Gastaut", code: "G40.812", score: 23 },
  { name: "Angelman Syndrome", code: "Q93.51", score: 15 },
];

/** What that ranking was reasoned from. */
export const EVIDENCE_LINES = [
  { label: "Phenotypic Features", detail: "12 matched" },
  { label: "Genomic Variants", detail: "SCN1A detected" },
  { label: "Literature Evidence", detail: "47 publications" },
  { label: "OMIM Classification", detail: "Confirmed pathogenic" },
];

/**
 * Two candidates side by side. The middle column is what they have in common;
 * the outer two are what tells them apart.
 */
export const DISEASE_COMPARISON = {
  a: {
    label: "Disease A",
    name: "Dravet Syndrome",
    features: ["Febrile seizures", "SCN1A variant", "Hypotonia", "Photosensitivity"],
  },
  shared: ["Epilepsy", "Dev. delay", "EEG changes"],
  b: {
    label: "Disease B",
    name: "Lennox-Gastaut",
    features: ["Multiple sz. types", "Slow spike-wave", "Atonic seizures", "Cognitive impairment"],
  },
};

/** A patient's record over time, for the longitudinal panel. */
export const PATIENT_TIMELINE = [
  { date: "Jan 2024", event: "Initial Referral", active: false },
  { date: "Mar 2024", event: "Genomic Workup Ordered", active: false },
  { date: "Jun 2024", event: "Diagnosis Confirmed", active: true },
  { date: "Sep 2024", event: "Follow-up Review", active: false },
  { date: "Jan 2025", event: "Treatment Update", active: false },
];

/** The analytics panel: programme-level figures and the month in focus. */
export const COHORT_TREND = {
  stats: [
    { value: "1,247", label: "Active Patients" },
    { value: "94%", label: "Data Completeness" },
    { value: "312", label: "Diagnoses / Month" },
  ],
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  selected: "Mar",
};

/** Systems the platform exchanges data with. */
export const INTEGRATION_TAGS = [
  "HL7 / FHIR",
  "EHR Systems",
  "Lab APIs",
  "OMIM",
  "ORPHANET",
  "HAPI-FHIR",
  "Custom Webhooks",
  "DICOM",
];
