import type { CtaButton } from "@/lib/cms/types";
import { NEWSLETTER_URL } from "@/lib/contact";

export type SolutionsVariant = "hospital" | "pharma";

type BurdenCardContent = {
  id: string;
  number: string;
  label: string;
  badge: string;
  badgeDot: string;
  badgeBg: string;
  badgeText: string;
  title: string;
  collapsedTitle: readonly [string, string];
  description: string;
};

type HowItWorksRow = {
  number: string;
  category: string;
  title: string;
  description: string;
  callout: string;
  reverse?: boolean;
  tinted?: boolean;
};

type OutcomeMetricContent = {
  id: string;
  maxPercent: number;
  label: string;
  ringTrack: string;
  ringFill: string;
  accent: string;
  fromText: string;
  toText: string;
  negative?: string;
  positive: string;
  positiveIconBg: string;
  centerValue?: string;
  hideCenterSubLabel?: boolean;
};

export type SolutionsContent = {
  hero: {
    eyebrow?: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
  };
  clinicalBurden: {
    label: string;
    heading: string;
    description: string;
    cards: BurdenCardContent[];
  };
  howItWorks: {
    label: string;
    heading: string;
    description: string;
    rows: HowItWorksRow[];
  };
  measurableOutcomes: {
    label: string;
    heading: string;
    description: string;
    metrics: OutcomeMetricContent[];
  };
  cta: {
    heading: string;
    description: string;
    buttons?: CtaButton[];
  };
};

const HOSPITAL_BURDEN_CARDS: BurdenCardContent[] = [
  {
    id: "records",
    number: "01",
    label: "RECORDS",
    badge: "RECORDS",
    badgeDot: "#c0392b",
    badgeBg: "#fce8ea",
    badgeText: "#b01616",
    title: "Unstructured Clinical Records",
    collapsedTitle: ["Unstructured Clinical", "Records"],
    description:
      "Clinical histories, laboratory reports, and genetic findings arrive in multiple formats, making structured analysis difficult.",
  },
  {
    id: "phenotyping",
    number: "02",
    label: "PHENOTYPES",
    badge: "PHENOTYPES",
    badgeDot: "#024385",
    badgeBg: "#e8f4fc",
    badgeText: "#024385",
    title: "Manual Phenotype Capture",
    collapsedTitle: ["Manual Phenotype", "Capture"],
    description:
      "Important phenotypic information is manually extracted and standardized, consuming valuable clinical time and introducing inconsistencies.",
  },
  {
    id: "reasoning",
    number: "03",
    label: "REASONING",
    badge: "REASONING",
    badgeDot: "#5fd7cb",
    badgeBg: "#e6faf8",
    badgeText: "#0a6b62",
    title: "Complex Clinical Reasoning",
    collapsedTitle: ["Complex Clinical", "Reasoning"],
    description:
      "Differential diagnosis requires clinicians to manually correlate phenotypes, genomics, inheritance patterns, and published evidence across multiple resources.",
  },
  {
    id: "longitudinal",
    number: "04",
    label: "LONGITUDINAL",
    badge: "LONGITUDINAL",
    badgeDot: "#7a8fa8",
    badgeBg: "#eef2f7",
    badgeText: "#4a5f78",
    title: "Fragmented Longitudinal Data",
    collapsedTitle: ["Fragmented Longitudinal", "Data"],
    description:
      "Patient follow-ups, outcomes, and registry information are often maintained across disconnected systems, limiting continuity of care and research readiness.",
  },
];

const PHARMA_BURDEN_CARDS: BurdenCardContent[] = [
  {
    id: "formats",
    number: "01",
    label: "FORMATS",
    badge: "FORMATS",
    badgeDot: "#c0392b",
    badgeBg: "#fce8ea",
    badgeText: "#b01616",
    title: "Clinical data arrives in different formats",
    collapsedTitle: ["Clinical data arrives", "in different formats"],
    description:
      "Clinical documentation varies across institutions, making cross-site research difficult.",
  },
  {
    id: "phenotyping",
    number: "02",
    label: "PHENOTYPES",
    badge: "PHENOTYPES",
    badgeDot: "#024385",
    badgeBg: "#e8f4fc",
    badgeText: "#024385",
    title: "Phenotype data lacks standardization",
    collapsedTitle: ["Phenotype data lacks", "standardization"],
    description:
      "Clinical observations must be manually translated into standardized terminology before they can support cohort analysis or research.",
  },
  {
    id: "cohorts",
    number: "03",
    label: "COHORTS",
    badge: "COHORTS",
    badgeDot: "#5fd7cb",
    badgeBg: "#e6faf8",
    badgeText: "#0a6b62",
    title: "Research cohorts are built manually",
    collapsedTitle: ["Research cohorts are", "built manually"],
    description:
      "Finding eligible patients often requires reviewing fragmented records across multiple systems and institutions.",
  },
  {
    id: "registry",
    number: "04",
    label: "DUPLICATION",
    badge: "DUPLICATION",
    badgeDot: "#7a8fa8",
    badgeBg: "#eef2f7",
    badgeText: "#4a5f78",
    title: "The same information is entered repeatedly",
    collapsedTitle: ["The same information is", "entered repeatedly"],
    description:
      "Clinical and research teams duplicate data across registries, databases, and study platforms.",
  },
];

export const SOLUTIONS_CONTENT: Record<SolutionsVariant, SolutionsContent> = {
  hospital: {
    hero: {
      titleLine1: "Purpose-Built for",
      titleHighlight: "Centers of Excellence",
      subtitle:
        "Empower clinical genetics teams with AI-assisted workflows, clinical decision support, longitudinal patient management, and research-ready data, all within a single intelligent platform.",
    },
    clinicalBurden: {
      label: "THE CHALLENGE",
      heading: "The Challenges Facing Rare Disease Centers",
      description:
        "Centers of Excellence manage some of the most complex patient journeys in healthcare, yet clinicians still rely on fragmented workflows, manual documentation, and disconnected systems.",
      cards: HOSPITAL_BURDEN_CARDS,
    },
    howItWorks: {
      label: "THE SOLUTION",
      heading: "How IndiGeneUs.AI Transforms Rare Disease Care",
      description:
        "From intelligent data capture to AI-assisted clinical reasoning, IndiGeneUs.AI supports clinicians throughout the entire rare disease journey.",
      rows: [
        {
          number: "01",
          category: "CLINICAL WORKFLOWS",
          title: "AI-Assisted Clinical Workflows",
          description:
            "Standardize complex clinical pathways with configurable workflows purpose-built for genetic and rare disease programs.",
          callout: "Consistent documentation across every consultation",
        },
        {
          number: "02",
          category: "INTELLIGENT DATA CAPTURE",
          title: "AI-Powered Data Capture",
          description:
            "Automatically digitize reports, extract HPO terms, and structure clinical information through AI-assisted OCR and phenotype extraction.",
          callout: "Eliminate manual data entry from clinical reports",
          reverse: true,
        },
        {
          number: "03",
          category: "CLINICAL DECISION SUPPORT",
          title: "Evidence-Driven Diagnosis",
          description:
            "Generate evidence-backed differential diagnoses by combining phenotypic, genomic, and clinical evidence through RAPID Score™.",
          callout: "Faster, more confident diagnostic decisions",
          tinted: true,
        },
        {
          number: "04",
          category: "LONGITUDINAL INTELLIGENCE",
          title: "Longitudinal Patient Intelligence",
          description:
            "Track patient journeys, monitor outcomes, and continuously enrich structured datasets for care, analytics, and research.",
          callout: "Every follow-up strengthens clinical intelligence",
          reverse: true,
        },
      ],
    },
    measurableOutcomes: {
      label: "MEASURABLE OUTCOMES",
      heading: "Transforming Clinical Care into Measurable Impact",
      description:
        "Deliver meaningful improvements in clinical efficiency, diagnostic confidence, and institutional intelligence.",
      metrics: [
        {
          id: "time",
          maxPercent: 97,
          label: "TIME SAVED",
          ringTrack: "#fce8ea",
          ringFill: "#c0392b",
          accent: "#c0392b",
          fromText: "2-3 hrs",
          toText: "Minutes",
          negative: "Manual re-entry & HPO searches",
          positive: "AI-driven automated extraction",
          positiveIconBg: "#c0392b",
        },
        {
          id: "diagnosis",
          maxPercent: 84,
          label: "DIAGNOSIS QUALITY",
          ringTrack: "#e6faf8",
          ringFill: "#2b7623",
          accent: "#2b7623",
          fromText: "Memory",
          toText: "RAPID Score",
          negative: "Inconsistent, recall-based",
          positive: "Evidence-ranked, reproducible",
          positiveIconBg: "#2b7623",
        },
        {
          id: "data",
          maxPercent: 100,
          label: "DATA AVAILABILITY",
          ringTrack: "#eef4f9",
          ringFill: "#024385",
          accent: "#024385",
          fromText: "Siloed",
          toText: "Registry-Ready",
          negative: "Zero research output",
          positive: "Structured cohort dataset",
          positiveIconBg: "#024385",
        },
      ],
    },
    cta: {
      heading: "Enable Smarter Rare Disease Care at Your Center",
      description:
        "See how IndiGeneUs.AI helps Centers of Excellence streamline clinical workflows, support faster diagnosis, improve longitudinal care, and generate research-ready data through AI-assisted clinical intelligence.",
      buttons: [
        { label: "Book a Demo", href: "#lead-form", variant: "primary" },
        { label: "Subscribe for Updates", href: NEWSLETTER_URL, variant: "secondary" },
      ],
    },
  },
  pharma: {
    hero: {
      eyebrow: "FOR LIFE SCIENCES & RESEARCH",
      titleLine1: "Accelerate Rare Disease Research",
      titleHighlight: "with Structured Clinical Data",
      subtitle:
        "Transform fragmented clinical information into standardized, research-ready datasets that support registries, natural history studies, and evidence generation.",
    },
    clinicalBurden: {
      label: "THE CHALLENGE",
      heading: "Clinical Data Exists. Research-Ready Data Doesn't.",
      description:
        "Rare disease research depends on high-quality clinical data, yet every institution captures information differently. Researchers spend months standardizing records before meaningful analysis can begin.",
      cards: PHARMA_BURDEN_CARDS,
    },
    howItWorks: {
      label: "HOW GENETICO SOLVES IT",
      heading: "Building Research-Ready Data at the Point of Care",
      description:
        "Genetico structures clinical information during routine care, creating standardized datasets that can seamlessly support research, registries, and longitudinal studies.",
      rows: [
        {
          number: "01",
          category: "RESEARCH STANDARDIZATION",
          title: "Standardized Clinical Data Capture",
          description:
            "Structured clinical workflows ensure consistent data collection across institutions while remaining adaptable to different research programs.",
          callout: "Consistent datasets across participating centers",
        },
        {
          number: "02",
          category: "AI STRUCTURING",
          title: "Automated Phenotype Extraction",
          description:
            "AI converts unstructured clinical notes into standardized HPO terminology, reducing manual effort while improving data consistency.",
          callout: "Research-ready phenotype data from routine clinical records",
          reverse: true,
        },
        {
          number: "03",
          category: "RESEARCH ANALYTICS",
          title: "Cohort Discovery & Longitudinal Insights",
          description:
            "Identify patient cohorts, monitor disease progression, and generate longitudinal datasets for natural history studies and evidence generation.",
          callout: "From clinical care to research insights",
          tinted: true,
        },
      ],
    },
    measurableOutcomes: {
      label: "MEASURABLE OUTCOMES",
      heading: "Enabling Better Rare Disease Research",
      description:
        "Structured clinical data improves research quality, accelerates study execution, and enables reproducible evidence across institutions.",
      metrics: [
        {
          id: "preparation",
          maxPercent: 90,
          centerValue: "90%+",
          hideCenterSubLabel: true,
          label: "Less Manual Data Preparation",
          ringTrack: "#fce8ea",
          ringFill: "#c0392b",
          accent: "#c0392b",
          fromText: "Manual abstraction",
          toText: "AI-assisted structuring",
          positive: "Faster preparation of research datasets",
          positiveIconBg: "#c0392b",
        },
        {
          id: "consistency",
          maxPercent: 100,
          centerValue: "Standardized",
          hideCenterSubLabel: true,
          label: "Higher Data Consistency",
          ringTrack: "#e6faf8",
          ringFill: "#2b7623",
          accent: "#2b7623",
          fromText: "Variable clinical records",
          toText: "Structured phenotype datasets",
          positive: "Comparable data across institutions",
          positiveIconBg: "#2b7623",
        },
        {
          id: "evidence",
          maxPercent: 100,
          centerValue: "Research-Ready",
          hideCenterSubLabel: true,
          label: "Accelerated Evidence Generation",
          ringTrack: "#eef4f9",
          ringFill: "#024385",
          accent: "#024385",
          fromText: "Fragmented records",
          toText: "Longitudinal, analysis-ready cohorts",
          positive: "Support registries, natural history studies, and collaborative research",
          positiveIconBg: "#024385",
        },
      ],
    },
    cta: {
      heading: "Building the Future of Rare Disease Research Starts with Better Data",
      description:
        "Discover how Genetico helps research organizations transform fragmented clinical information into structured, research-ready datasets for registries, longitudinal studies, and evidence generation.",
      buttons: [
        { label: "Book a Demo", href: "#lead-form", variant: "primary" },
        { label: "Subscribe for Updates", href: NEWSLETTER_URL, variant: "secondary" },
      ],
    },
  },
};

export function getSolutionsContent(variant: SolutionsVariant = "hospital") {
  return SOLUTIONS_CONTENT[variant];
}
