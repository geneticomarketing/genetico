// Loads .env before payload.config reads DATABASE_URI. Must stay first.
import "dotenv/config";

import { getPayload } from "payload";

import config from "../src/payload.config";

/**
 * Writes the redesign's copy onto the Hospital and Life Science pages.
 *
 *   npx tsx scripts/seed-solution-redesign.mts
 *
 * Only the fields the redesign introduced or kept are written. The retired
 * ones are left exactly as they are, because the deployed pages still read
 * them — `scripts/drop-solution-page-legacy.mjs` clears them out once the
 * rebuilt pages are live.
 *
 * Stored copy was cased for the old design (Title Case headings, capitalised
 * labels). The redesign sets headings in sentence case and uppercases the
 * small labels in CSS, so leaving the old values would have the pages
 * shouting. The substance is the handoff's.
 */

const payload = await getPayload({ config });

type Slug = "hospital" | "pharma";

/**
 * Merges new row copy onto the stored rows.
 *
 * The rows still carry retired fields that the database requires, so they
 * have to go back untouched alongside the new values — writing the array
 * fresh would blank them and break the live page before it is replaced.
 */
function mergeRows<T>(stored: T[], updates: object[]): object[] {
  return updates.map((update, i) => ({ ...(stored[i] ?? {}), ...update }));
}

async function seed(
  slug: Slug,
  content: {
    hero: object;
    clinicalBurden: object;
    howItWorks: object;
    measurableOutcomes: object;
    cta: object;
  },
  rows: { cards: object[]; rows: object[]; metrics: object[] },
) {
  const { docs } = await payload.find({
    collection: "solution-pages",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });

  const doc = docs[0];
  if (!doc) {
    console.error(`${slug}: no record — create it in the admin panel first.`);
    process.exitCode = 1;
    return;
  }

  await payload.update({
    collection: "solution-pages",
    id: doc.id,
    data: {
      ...content,
      clinicalBurden: {
        ...content.clinicalBurden,
        cards: mergeRows(doc.clinicalBurden?.cards ?? [], rows.cards),
      },
      howItWorks: {
        ...content.howItWorks,
        rows: mergeRows(doc.howItWorks?.rows ?? [], rows.rows),
      },
      measurableOutcomes: {
        ...content.measurableOutcomes,
        metrics: mergeRows(doc.measurableOutcomes?.metrics ?? [], rows.metrics),
      },
    },
  });

  console.log(`${slug}: updated`);
}

/* ---------------------------------------------------------------- hospital */

await seed(
  "hospital",
  {
    hero: {
      eyebrow: "For hospitals, clinicians & CoEs",
      titleLine1: "Purpose-built for",
      titleHighlight: "Centers of Excellence",
      subtitle:
        "Give clinical genetics teams AI-assisted workflows, decision support, longitudinal " +
        "patient management, and research-ready data — inside one platform, without changing " +
        "how your clinic runs.",
      stats: [
        { figure: "4", label: "clinical stages covered" },
        { figure: "100%", label: "HPO-coded records" },
        { figure: "2 wks", label: "to a working pilot" },
      ],
    },
    clinicalBurden: {
      label: "The challenge",
      heading: "The hardest patient journeys, run on the loosest tooling",
      description:
        "Centers of Excellence manage some of the most complex cases in medicine — yet " +
        "clinicians still work across fragmented notes, manual documentation, and disconnected " +
        "systems.",
    },
    howItWorks: {
      label: "The solution",
      heading: "How IndiGeneUs.AI supports the whole rare disease journey",
      description:
        "From intelligent capture at intake to longitudinal follow-up, each step leaves your " +
        "centre with better records than it started with.",
    },
    measurableOutcomes: {
      label: "Measurable outcomes",
      heading: "Turning clinical care into measurable impact",
      description:
        "Meaningful improvements in clinical efficiency, diagnostic confidence, and the " +
        "institutional intelligence your centre keeps.",
      footnote:
        "Figures reflect observed improvements at partner centres and depend on case mix and " +
        "existing workflows.",
    },
    cta: {
      heading: "Enable smarter rare disease care at your centre",
      description:
        "See how IndiGeneUs.AI streamlines clinical workflows, supports faster diagnosis, and " +
        "leaves your centre with research-ready data. Pilots typically start in two weeks.",
    },
  },
  {
    cards: [
      {
        title: "Unstructured clinical records",
        description:
          "Histories, letters, and lab reports live as free text and scans — searchable by " +
          "nobody, comparable across nothing.",
      },
      {
        title: "Manual phenotype capture",
        description:
          "Phenotypic detail is extracted and standardized by hand, consuming clinical time and " +
          "introducing inconsistency.",
      },
      {
        title: "Complex clinical reasoning",
        description:
          "Differentials across thousands of rare conditions rest on recall and scattered " +
          "literature rather than structured evidence.",
      },
      {
        title: "Fragmented longitudinal data",
        description:
          "Follow-ups sit in different systems, so disease progression is reconstructed from " +
          "memory at every visit.",
      },
    ],
    rows: [
      {
        stepLabel: "Workflows",
        category: "Clinical workflows",
        title: "AI-assisted clinical workflows",
        description:
          "Standardize complex pathways with configurable workflows built for genetic and rare " +
          "disease programmes — so every consultation is documented the same way.",
        callout: "Consistent documentation across every consultation",
      },
      {
        stepLabel: "Capture",
        category: "Intelligent data capture",
        title: "AI-powered data capture",
        description:
          "Digitize reports, extract HPO terms, and structure clinical information through " +
          "AI-assisted OCR and phenotype extraction — reviewed and confirmed by your team.",
        callout: "Eliminate manual data entry from clinical reports",
      },
      {
        stepLabel: "Diagnose",
        category: "Clinical decision support",
        title: "Evidence-driven differential diagnosis",
        description:
          "RAPID Score™ combines phenotypic, genomic, and clinical evidence into a ranked " +
          "differential — every candidate traceable to the evidence behind it.",
        callout: "Faster, more confident diagnostic decisions",
      },
      {
        stepLabel: "Follow up",
        category: "Longitudinal intelligence",
        title: "Longitudinal patient intelligence",
        description:
          "Track patient journeys, monitor outcomes, and enrich structured datasets for care, " +
          "analytics, and research — with recalls and reviews surfaced automatically.",
        callout: "Every follow-up strengthens clinical intelligence",
      },
    ],
    metrics: [
      {
        figure: "Minutes",
        label: "Clinical time saved",
        before: "2–3 hrs per case",
        after: "Minutes of review",
        note: "Documentation and HPO coding stop competing with patient time.",
      },
      {
        figure: "Reproducible",
        label: "Diagnostic confidence",
        before: "Recall-based differentials",
        after: "Evidence-ranked RAPID Score",
        note: "The same case yields the same reasoning, reviewable by the whole team.",
      },
      {
        figure: "Registry-ready",
        label: "Data availability",
        before: "Siloed clinical notes",
        after: "Structured cohort dataset",
        note: "Care generates the dataset your research and reporting already needed.",
      },
    ],
  },
);

/* ------------------------------------------------------------ life science */

await seed(
  "pharma",
  {
    hero: {
      eyebrow: "For life sciences & research",
      titleLine1: "Accelerate rare disease research",
      titleHighlight: "with structured clinical data",
      subtitle:
        "Turn fragmented clinical information into standardized, research-ready datasets that " +
        "support registries, natural history studies, and evidence generation.",
      stats: [],
    },
    clinicalBurden: {
      label: "The challenge",
      heading: "Clinical data exists. Research-ready data doesn't.",
      description:
        "Rare disease research depends on high-quality clinical data, yet every institution " +
        "captures information differently. Researchers spend months standardizing records " +
        "before meaningful analysis can begin.",
    },
    howItWorks: {
      label: "How Genetico solves it",
      heading: "Building research-ready data at the point of care",
      description:
        "Genetico structures clinical information during routine care, creating standardized " +
        "datasets that support research, registries, and longitudinal studies.",
    },
    measurableOutcomes: {
      label: "Measurable outcomes",
      heading: "Enabling better rare disease research",
      description:
        "Structured clinical data improves research quality, accelerates study execution, and " +
        "enables reproducible evidence across institutions.",
      footnote: "",
    },
    cta: {
      heading: "Better rare disease research starts with better data",
      description:
        "Talk to us about turning fragmented clinical information into structured, " +
        "research-ready datasets for your programme.",
    },
  },
  {
    cards: [
      {
        title: "Clinical data arrives in different formats",
        description:
          "Clinical documentation varies across institutions, making cross-site research " +
          "difficult.",
      },
      {
        title: "Phenotype data lacks standardization",
        description:
          "Free-text symptom descriptions cannot be pooled, filtered, or compared without " +
          "manual recoding.",
      },
      {
        title: "Research cohorts are built manually",
        description:
          "Identifying eligible patients means chart review across departments, one record at " +
          "a time.",
      },
      {
        title: "The same information is entered repeatedly",
        description:
          "Clinical, registry, and funding submissions each ask for the same data in a " +
          "different shape.",
      },
    ],
    rows: [
      {
        stepLabel: "Capture",
        category: "Research standardization",
        title: "Standardized clinical data capture",
        description:
          "Structured clinical workflows ensure consistent data collection across institutions " +
          "while remaining adaptable to different research programmes.",
        callout: "Consistent datasets across participating centres",
      },
      {
        stepLabel: "Structure",
        category: "AI structuring",
        title: "Automated phenotype extraction",
        description:
          "AI converts unstructured clinical notes into standardized HPO terminology, reducing " +
          "manual effort while improving data consistency.",
        callout: "Research-ready phenotype data from routine records",
      },
      {
        stepLabel: "Analyse",
        category: "Research analytics",
        title: "Cohort discovery & longitudinal insights",
        description:
          "Identify patient cohorts, monitor disease progression, and generate longitudinal " +
          "datasets for natural history studies and evidence generation.",
        callout: "From clinical care to research insights",
      },
    ],
    metrics: [
      {
        figure: "90%+",
        label: "Less manual data preparation",
        before: "Manual abstraction",
        after: "AI-assisted structuring",
        note: "Research datasets are prepared in days rather than months of chart review.",
      },
      {
        figure: "Standardized",
        label: "Higher data consistency",
        before: "Variable clinical records",
        after: "Structured phenotype datasets",
        note: "One schema across participating centres makes data comparable by default.",
      },
      {
        figure: "Research-ready",
        label: "Accelerated evidence generation",
        before: "Fragmented records",
        after: "Longitudinal, analysis-ready cohorts",
        note: "Supports registries, natural history studies, and collaborative research.",
      },
    ],
  },
);

console.log("\nDone. Both solution pages now read as the redesign specifies.");
process.exit(0);
