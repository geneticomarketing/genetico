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
 * The Order to report section: a test ordered from the case, tracked in the
 * LIMS, and its report saved back to the record. Code-held until the CMS has
 * a section for it.
 *
 * Kept generic on purpose (product review, 2026-11-03): no test categories or
 * named assays, since institutions order different things, and "LIMS" rather
 * than naming it the laboratory's, since the LIMS is not always theirs.
 */
export const ORDER_TO_REPORT = {
  eyebrow: "Order to Report",
  heading: "From differential to report, without re-entry",
  description: "Order tests from the case and follow them through to the report, in one record.",
  steps: [
    {
      title: "Order from the case",
      body:
        "Order the tests a case needs from the record itself. The request form fills itself " +
        "from the patient's details.",
    },
    {
      title: "Track it in the LIMS",
      body: "Each order's status shows against the case until the report is released.",
    },
    {
      title: "Every report in one place",
      body:
        "Whether a test is run in your lab or an outside one, its report is saved to the same " +
        "case record.",
    },
  ],
  /** The order card's status chain: the platform's own stages, shortened. */
  statuses: ["Sample due", "Sample received", "Testing complete", "Report released"],
  /** The stage the sample order is at, the one being worked on now. */
  at: 2,
};

/**
 * The record over three visits, newest first, for the Longitudinal panel.
 * Each visit lists what was added to the record that day, so the timeline
 * shows the record growing rather than a single test.
 */
export const LONGITUDINAL_VISITS = [
  {
    date: "24/10/2026",
    title: "Follow-up visit",
    items: ["Reports reviewed", "Growth re-plotted", "Differentials re-ranked"],
  },
  {
    date: "20/10/2026",
    title: "Reports added",
    items: ["Lab report released via LIMS", "Outside report read in by Smart Extract"],
  },
  {
    date: "14/10/2026",
    title: "First consultation",
    items: ["Pedigree drawn", "HPO terms extracted", "Differentials suggested", "Tests ordered"],
  },
];

/**
 * Short "how to read this" notes beside the Clinical Intelligence panels, so
 * a reader new to the platform knows what the numbers mean. Each is something
 * the platform was seen doing (2026-10-29).
 */
export const CDSS_READING = {
  rapid: [
    "Scores run from 0 to 1: the closer to 1, the better the disease matches the selected phenotypes",
    "Top candidates can be added to the case's differential or downloaded as a list",
    "Every run carries a reminder that the ranking supports, and does not replace, clinical judgement",
  ],
  analytics: [
    "Observed: how much each recorded symptom adds to the disease's score",
    "Not yet observed: the disease's other phenotypes, ranked by how much they would add",
    "Ranking Analytics shows the same breakdown as a stacked bar for every disease in the list",
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
 * Systems the platform exchanges data with: the LIMS and genetic testing
 * platforms for orders, and the knowledge bases it looks up. The CMS list
 * overrides this once an editor fills it in.
 */
export const INTEGRATION_TAGS = [
  "LIMS",
  "Genetic testing platforms",
  "OMIM",
  "Orphanet",
  "HPO",
  "GeneReviews",
  "DECIPHER",
];
