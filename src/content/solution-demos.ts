/**
 * The product mock-ups on /hospital and /life-science.
 *
 * Clinical artefacts, not marketing copy. The clinical values — the case, its
 * HPO terms, the RAPID ranking, the analytics, the lab extract, the LIMS order
 * and the follow-ups — come from src/content/sample-case.ts, shared with every
 * page and taken from the platform itself. What is here is how these two pages
 * arrange them, plus the research views that are built but not yet live.
 *
 * They live in the repo and go through review like the rest of `src/content`
 * — the same call made for the Platform page. The panels these feed are each
 * pinned to one walkthrough step, which is why the CMS warns that adding or
 * removing a step changes which picture it gets.
 */

/* ------------------------------------------------------------- life science */

/**
 * Centres shown as chips in the third hero card. Only centres the site names
 * elsewhere as partners; the research views are "Coming soon", so the card is
 * tagged and claims no site count.
 */
export const RESEARCH_SITES = ["AIIMS Delhi", "CDFD", "SGRH", "Manovikas"] as const;

/**
 * The hero's cohort card. Cohort views are built but not yet live, so the card
 * carries the "Coming soon" tag and the figures hold still — an illustration
 * of the view, not a count of anything.
 */
export const COHORT_SUMMARY = {
  patients: "247",
  centres: "4",
  hpoCoded: "98%",
} as const;

export const NATURAL_HISTORY_ROWS = [
  { label: "Baseline capture", value: "Complete", good: false },
  { label: "Follow-up visits", value: "On the record", good: false },
  { label: "Registry export", value: "Coming soon", good: true },
] as const;

/**
 * Step 1 — the case form, as the platform lays it out: the same sections at
 * every centre. The Examination section is open, with the terms Extract HPO
 * terms returned and the growth measurements against WHO standards.
 */
export const INTAKE_TABS = [
  "Patient",
  "Complaints",
  "Family & pedigree",
  "Development",
  "Examination",
] as const;
export const INTAKE_ACTIVE_TAB = "Examination";
export const INTAKE_CONSANGUINITY = [
  { label: "Yes", selected: false },
  { label: "No", selected: true },
] as const;

/** Step 3 — cohort discovery, "Coming soon". Each filter swaps the three counts. */
export const COHORT_FILTERS = [
  { label: "Age 2–18", eligible: "214", enrolled: "138", sites: "4" },
  { label: "HPO: Seizure", eligible: "84", enrolled: "61", sites: "4" },
  { label: "Confirmed diagnosis", eligible: "126", enrolled: "94", sites: "3" },
  { label: "Follow-up ≥ 2 yrs", eligible: "68", enrolled: "52", sites: "3" },
] as const;

/** Which filter the card opens on, matching the handoff. */
export const COHORT_DEFAULT_FILTER = 1;

export const COHORT_COVERAGE = [
  { label: "Baseline visits", value: "100%", good: false },
  { label: "12-month follow-up", value: "78%", good: false },
  { label: "Registry export", value: "Coming soon", good: true },
] as const;

/* ----------------------------------------------------------------- hospital */

/** How many of the ranked list the hero card shows. */
export const HERO_RANKED_COUNT = 3;

/**
 * Step 1 — the case, start to finish, as the platform runs it. Part walked
 * and part still ahead: the test has been ordered and the lab is working on
 * it.
 */
export const CARE_PATHWAY = [
  { label: "Register patient", meta: "Demographics, centre and clinic number", state: "Done" },
  { label: "Capture phenotype", meta: "Notes or dictation, HPO terms, growth", state: "Done" },
  { label: "Suggest differentials", meta: "RAPID Score across OMIM and Orphanet", state: "Done" },
  { label: "Order test", meta: "Test request form filled from the case", state: "Done" },
  { label: "Track sample", meta: "In the laboratory's LIMS", state: "Active" },
  { label: "Case report", meta: "Configurable report from the record", state: "Next" },
] as const;

export type PathwayState = (typeof CARE_PATHWAY)[number]["state"];

/** Step 3 — how many of the ranked list the panel shows. */
export const RANKED_COUNT = 4;

/** Step 3 — the two views of Phenotype Analytics the panel switches between. */
export const ANALYTICS_VIEWS = [
  { key: "observed", label: "Observed symptoms" },
  { key: "unobserved", label: "Check for next" },
] as const;

/** Where the sample in the LIMS order has got to, as an index into its statuses. */
export const ORDER_STATUS_INDEX = 3;

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
