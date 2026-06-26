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
  negative: string;
  positive: string;
  positiveIconBg: string;
};

export type SolutionsContent = {
  hero: {
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
  };
  clinicalBurden: {
    heading: string;
    description: string;
    cards: BurdenCardContent[];
  };
  howItWorks: {
    heading: string;
    description: string;
    rows: HowItWorksRow[];
  };
  measurableOutcomes: {
    heading: string;
    description: string;
    metrics: OutcomeMetricContent[];
  };
  cta: {
    headingLine1: string;
    headingLine2: string;
    description: string;
  };
};

const HOSPITAL_BURDEN_CARDS: BurdenCardContent[] = [
  {
    id: "intake",
    number: "01",
    label: "INTAKE",
    badge: "INTAKE",
    badgeDot: "#c0392b",
    badgeBg: "#fce8ea",
    badgeText: "#b01616",
    title: "Patient arrives with unstructured notes",
    collapsedTitle: ["Patient arrives with", "unstructured notes"],
    description:
      "Clinician manually reads, interprets, and re-types data from paper records. No standard format exists across referrals.",
  },
  {
    id: "phenotyping",
    number: "02",
    label: "PHENOTYPING",
    badge: "PHENOTYPING",
    badgeDot: "#024385",
    badgeBg: "#e8f4fc",
    badgeText: "#024385",
    title: "Phenotype data captured inconsistently",
    collapsedTitle: ["Phenotype data captured", "inconsistently"],
    description:
      "Free-text notes must be translated into standardized HPO terms by hand. Terminology varies across clinicians and visits.",
  },
  {
    id: "diagnosis",
    number: "03",
    label: "DIAGNOSIS",
    badge: "DIAGNOSIS",
    badgeDot: "#5fd7cb",
    badgeBg: "#e6faf8",
    badgeText: "#0a6b62",
    title: "Differential diagnosis built from memory",
    collapsedTitle: ["Differential diagnosis built", "from memory"],
    description:
      "Clinicians cross-reference literature, databases, and prior cases manually — a slow, error-prone process with no structured support.",
  },
  {
    id: "registry",
    number: "04",
    label: "REGISTRY",
    badge: "REGISTRY",
    badgeDot: "#7a8fa8",
    badgeBg: "#eef2f7",
    badgeText: "#4a5f78",
    title: "Registry data entered twice",
    collapsedTitle: ["Registry data", "entered twice"],
    description:
      "Patient data is re-keyed into national registries and reporting systems. Duplicate effort with no single source of truth.",
  },
];

const PHARMA_BURDEN_CARDS: BurdenCardContent[] = [
  {
    id: "intake",
    number: "01",
    label: "INTAKE",
    badge: "INTAKE",
    badgeDot: "#c0392b",
    badgeBg: "#fce8ea",
    badgeText: "#b01616",
    title: "Site data arrives in inconsistent formats",
    collapsedTitle: ["Site data arrives in", "inconsistent formats"],
    description:
      "Program teams manually reconcile referrals, lab reports, and site submissions. Formats vary across centers and geographies.",
  },
  {
    id: "phenotyping",
    number: "02",
    label: "PHENOTYPING",
    badge: "PHENOTYPING",
    badgeDot: "#024385",
    badgeBg: "#e8f4fc",
    badgeText: "#024385",
    title: "Phenotype data lacks standardization",
    collapsedTitle: ["Phenotype data lacks", "standardization"],
    description:
      "Unstructured clinical notes must be mapped to HPO terms by hand before cohort analysis. Terminology drifts across sites and studies.",
  },
  {
    id: "diagnosis",
    number: "03",
    label: "COHORTS",
    badge: "COHORTS",
    badgeDot: "#5fd7cb",
    badgeBg: "#e6faf8",
    badgeText: "#0a6b62",
    title: "Cohort identification built from fragments",
    collapsedTitle: ["Cohort identification built", "from fragments"],
    description:
      "Teams cross-reference registries, EMR exports, and prior studies manually — a slow process with no unified view of eligible patients.",
  },
  {
    id: "registry",
    number: "04",
    label: "REGISTRY",
    badge: "REGISTRY",
    badgeDot: "#7a8fa8",
    badgeBg: "#eef2f7",
    badgeText: "#4a5f78",
    title: "Trial and registry data entered twice",
    collapsedTitle: ["Trial and registry data", "entered twice"],
    description:
      "Patient records are re-keyed into trial systems and national registries. Duplicate effort with no single source of truth.",
  },
];

export const SOLUTIONS_CONTENT: Record<SolutionsVariant, SolutionsContent> = {
  hospital: {
    hero: {
      titleLine1: "For Centers of",
      titleHighlight: "Excellence",
      subtitle: "Genetico helps clinicians spend less time on data and more time on patients",
    },
    clinicalBurden: {
      heading: "The Clinical Burden",
      description:
        "Clinicians at COEs spend a disproportionate amount of time on documentation, data re-entry, and manual reasoning — time that should go to patient care.",
      cards: HOSPITAL_BURDEN_CARDS,
    },
    howItWorks: {
      heading: "How Genetico Solves It",
      description:
        "Clinicians currently use disconnected paper forms, unstructured notes, and ad-hoc reporting. Every consultation starts from scratch. No consistency across the team.",
      rows: [
        {
          number: "01",
          category: "CLINICAL STANDARDIZATION",
          title: "Customizable Clinical Workflow",
          description:
            "Structured, guided data capture across the entire consultation — demographics, symptoms, family history, investigations. Consistent across all clinicians in the COE.",
          callout: "40% reduction in consultation documentation time",
        },
        {
          number: "02",
          category: "DATA CAPTURE",
          title: "OCR & Report Digitisation",
          description:
            "Extract structured clinical and genetic data from scanned lab reports, PDFs, and physical documents. Eliminates manual re-entry and dramatically cuts processing time.",
          callout: "Eliminates time taken for manual transcription",
          reverse: true,
        },
        {
          number: "03",
          category: "LONGITUDINAL CARE",
          title: "Long-term Follow-up Tracking",
          description:
            "Structured patient records persist across all visits. Alerts for overdue follow-ups. Longitudinal view of disease progression per patient, automatically updated each visit.",
          callout: "No rebuilding of patient history at each visit",
          tinted: true,
        },
      ],
    },
    measurableOutcomes: {
      heading: "Measurable Outcomes",
      description:
        "Concrete, quantifiable impact across the areas that matter most for Centers of Excellence.",
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
      headingLine1: "Different conversation,",
      headingLine2: "depending on who you are",
      description: "Take the stress out of UI design with ready-to-use content.",
    },
  },
  pharma: {
    hero: {
      titleLine1: "For Life Sciences &",
      titleHighlight: "Pharma",
      subtitle:
        "Genetico helps program teams spend less time wrangling site data and more time advancing rare disease programs",
    },
    clinicalBurden: {
      heading: "The Program Burden",
      description:
        "Pharma and medical affairs teams spend disproportionate time on data reconciliation, cohort building, and manual reporting — time that should go to program delivery.",
      cards: PHARMA_BURDEN_CARDS,
    },
    howItWorks: {
      heading: "How Genetico Solves It",
      description:
        "Program teams currently rely on disconnected site exports, unstructured notes, and ad-hoc spreadsheets. Every study starts from scratch. No consistency across sites.",
      rows: [
        {
          number: "01",
          category: "PROGRAM STANDARDIZATION",
          title: "Standardized Site Data Capture",
          description:
            "Structured, guided data capture across participating sites — demographics, phenotypes, family history, and investigations. Consistent across every center in the network.",
          callout: "Faster site onboarding with shared clinical workflows",
        },
        {
          number: "02",
          category: "DATA CAPTURE",
          title: "OCR & Report Digitisation",
          description:
            "Extract structured clinical and genetic data from lab reports, PDFs, and site documents. Eliminates manual re-entry and accelerates cohort readiness.",
          callout: "Eliminates time spent on manual transcription",
          reverse: true,
        },
        {
          number: "03",
          category: "REAL-WORLD EVIDENCE",
          title: "Longitudinal Patient Tracking",
          description:
            "Structured patient records persist across visits and studies. Alerts for follow-up gaps. Longitudinal views of disease progression, automatically updated from site data.",
          callout: "No rebuilding of patient history for each analysis",
          tinted: true,
        },
      ],
    },
    measurableOutcomes: {
      heading: "Measurable Outcomes",
      description:
        "Concrete, quantifiable impact across the areas that matter most for rare disease program teams.",
      metrics: [
        {
          id: "time",
          maxPercent: 97,
          label: "TIME SAVED",
          ringTrack: "#fce8ea",
          ringFill: "#c0392b",
          accent: "#c0392b",
          fromText: "Weeks",
          toText: "Days",
          negative: "Manual site data reconciliation",
          positive: "Automated structured extraction",
          positiveIconBg: "#c0392b",
        },
        {
          id: "diagnosis",
          maxPercent: 84,
          label: "COHORT QUALITY",
          ringTrack: "#e6faf8",
          ringFill: "#2b7623",
          accent: "#2b7623",
          fromText: "Ad hoc",
          toText: "RAPID Score",
          negative: "Fragmented, inconsistent criteria",
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
          toText: "Trial-Ready",
          negative: "Limited real-world output",
          positive: "Structured program dataset",
          positiveIconBg: "#024385",
        },
      ],
    },
    cta: {
      headingLine1: "Built for rare disease",
      headingLine2: "program teams",
      description: "Connect with us to explore how Genetico supports pharma workflows.",
    },
  },
};

export function getSolutionsContent(variant: SolutionsVariant = "hospital") {
  return SOLUTIONS_CONTENT[variant];
}
