/**
 * The Platform page's own pieces of the product mock-ups.
 *
 * The clinical values — the case, its HPO terms, the RAPID ranking, the
 * analytics, the comparison, the lab extract and the LIMS order — come from
 * src/content/sample-case.ts, shared with every page and taken from the
 * platform itself. What is here is how this page arranges them, plus the copy
 * for the one section the CMS does not hold yet (Order to report).
 *
 * Deliberately not CMS content: these are clinical artefacts rather than
 * copy, and a plausible-looking edit in the admin panel would read as a real
 * clinical claim while being wrong.
 */

/** The hero card's three views of one ranking, in the order they rotate. */
export const RAPID_VIEWS = ["Ranked list", "Phenotype analytics", "Ranking analytics"] as const;

/** How long each view holds in the hero before the next one, in ms. */
export const VIEW_ROTATE_MS = 6500;

/**
 * The Order to report section: a test ordered from the case goes to the
 * laboratory's LIMS, is tracked there, and its result comes back to the
 * record. Code-held until the CMS has a section for it (visuals plan, phase 5).
 */
export const ORDER_TO_REPORT = {
  eyebrow: "Order to Report",
  heading: "From differential to lab report, without re-entry",
  description:
    "Tests are ordered from the case, sent straight to the laboratory's LIMS, and tracked " +
    "there until the report is released — so the clinic and the lab work from one order.",
  steps: [
    {
      title: "Order from the case",
      body:
        "Choose a biochemical, cytogenetic or molecular test, the sample and its priority. The " +
        "test request form fills itself from the patient record.",
    },
    {
      title: "Tracked in the lab's LIMS",
      body:
        "The order arrives in the laboratory's LIMS. Every stage — collected, received, tested, " +
        "validated — shows against the case, and a rejected sample comes back with its reason.",
    },
    {
      title: "Results back on the record",
      body:
        "Released reports return to the patient record. Reports from outside laboratories are " +
        "read in by Smart Investigation Extract and reviewed before they are saved.",
    },
  ],
};

/**
 * Cohort sizes by month for the analytics panel. Cohort views are built but
 * not yet live, so the panel carries the "Coming soon" tag; the bars are a
 * shape, not a statistic, and carry no figures.
 */
export const COHORT_MONTHS = [
  { month: "May", value: 42 },
  { month: "Jun", value: 50 },
  { month: "Jul", value: 57 },
  { month: "Aug", value: 63 },
  { month: "Sep", value: 74 },
  { month: "Oct", value: 86 },
];

/**
 * Systems the platform exchanges data with — only the confirmed ones: the
 * laboratory LIMS for orders, and the knowledge bases differentials are
 * drawn from. The CMS list overrides this once an editor fills it in.
 */
export const INTEGRATION_TAGS = ["Laboratory LIMS", "OMIM", "Orphanet", "DECIPHER", "HPO"];
