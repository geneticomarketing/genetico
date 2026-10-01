import { HOSPITAL_PATH, PHARMA_PATH, PLATFORM_PATH, PUBLIC_HEALTH_PATH } from "@/lib/routes";

/**
 * The home page's built-in copy.
 *
 * Every section below is edited in the CMS (Home page · / in /admin); these
 * values seeded those entries and are what the page falls back to for any
 * field left empty. The field names match the CMS fields one for one — see
 * src/payload/globals/sections/home.ts — so keep the two in step.
 *
 * The *_DEMO constants are not copy: they are the illustrative sample case
 * (GX-2041) drawn in the product mock-ups, part of the design rather than
 * content an editor maintains.
 *
 * Source: design_handoff_genetico_site/design_handoff_home_final/.
 */

/** Rail and menu entry fields shared by every numbered section. */
type Numbered = { eyebrow: string; menuLabel: string };

export const HOME_HERO = {
  headline: "Building the digital infrastructure for",
  headlineAccent: "rare and genetic disease care.",
  blurb:
    "Genetico is a health technology company developing digital solutions for the rare and " +
    "genetic disease ecosystem. The information behind a single diagnosis sits with clinicians, " +
    "hospitals, laboratories and programmes that rarely connect. We build what connects them.",
  primaryCta: { label: "Why Genetico exists" },
  secondaryCta: { label: "Meet IndiGeneUs.AI" },
  shotLabel: "Illustrative interface · sample case",
  marqueeLabel: "Built with",
  marquee: [
    { name: "AIIMS New Delhi" },
    { name: "CDFD Hyderabad" },
    { name: "15 Rare Disease Centres" },
    { name: "PraGed Mission" },
    { name: "Sir Ganga Ram Hospital" },
    { name: "Manovikas" },
    { name: "Board of Genetic Counselling India" },
    { name: "GHRC" },
  ],
};

/** The hero mock-up's sample case: a note that types itself, then structures. */
export const HERO_DEMO = {
  url: "app.indigeneus.ai / cases / GX-2041",
  caseId: "GX-2041",
  patient: "Male · 2 y 4 m · Genetics OPD",
  note:
    "2 y 4 m male. Global developmental delay, seizures since 8 months. Coarse facial features, " +
    "hepatosplenomegaly, corneal clouding. Wt 9.8 kg, Ht 78 cm, OFC 46 cm.",
  cases: [
    { id: "GX-2041", label: "Structuring", dot: "#2E9B82" },
    { id: "GX-2038", label: "Awaiting report", dot: "#D39B2A" },
    { id: "GX-2033", label: "In review", dot: "#0B4C86" },
    { id: "GX-2029", label: "Follow-up due", dot: "#9AA6B1" },
    { id: "GX-2017", label: "Registry submitted", dot: "#9AA6B1" },
  ],
};

export const SAMPLE_HPO = [
  { name: "Global developmental delay", code: "HP:0001263" },
  { name: "Seizure", code: "HP:0001250" },
  { name: "Coarse facial features", code: "HP:0000280" },
  { name: "Hepatosplenomegaly", code: "HP:0001433" },
  { name: "Corneal opacity", code: "HP:0007957" },
];

export const SAMPLE_DIFFERENTIALS = [
  { name: "Mucopolysaccharidosis I", gene: "IDUA", score: 0.92, match: "5 of 5 features" },
  { name: "Mucopolysaccharidosis II", gene: "IDS", score: 0.78, match: "4 of 5 features" },
  { name: "GM1 gangliosidosis", gene: "GLB1", score: 0.64, match: "3 of 5 features" },
];

/** 01 — the five parties that each hold part of one patient's information. */
export const HOME_WHY = {
  eyebrow: "Why Genetico exists",
  menuLabel: "Why Genetico",
  heading: "Rare diseases are complex. The systems supporting them shouldn’t be.",
  description:
    "The information about one patient is held by many parties, in different formats, and is " +
    "rarely brought together.",
  /** Exactly five: each lights one of the five document cards drawn beside it. */
  parties: [
    {
      name: "Clinicians",
      body: "Examination findings and history, mostly written as free text.",
      tag: "Clinical notes",
    },
    {
      name: "Hospitals",
      body: "Admissions, imaging and reports held in separate departmental systems.",
      tag: "Departmental systems",
    },
    {
      name: "Laboratories",
      body: "Genetic and biochemical results issued as documents, not data.",
      tag: "PDF reports",
    },
    {
      name: "Research programmes",
      body: "Study data collected again, separately, for each project.",
      tag: "Study databases",
    },
    {
      name: "Public-health systems",
      body: "Programme returns compiled by hand from centre records.",
      tag: "Manual returns",
    },
  ],
  /** Pill labels round the hub, clockwise from the top. */
  network: [
    { label: "Clinicians" },
    { label: "Hospitals" },
    { label: "Laboratories" },
    { label: "Research" },
    { label: "Public health" },
  ],
  closing:
    "None of these connect by default. Diagnosis takes longer, follow-up starts again at each " +
    "centre, and research and planning work without reliable data.",
  closingAccent: "Genetico exists to change that.",
} satisfies Numbered & Record<string, unknown>;

/** The photo band between 01 and 02. The figures are marked "to be confirmed". */
export const HOME_SCALE = {
  label: "The scale of the problem",
  photo: { src: "/images/home/doc-corridor.webp", alt: "Clinician walking a hospital corridor" },
  facts: [
    { figure: "7,000+", label: "rare diseases described worldwide" },
    { figure: "~80%", label: "are genetic in origin" },
    { figure: "~50%", label: "first present in childhood" },
    { figure: "~70M", label: "people in India estimated to live with a rare disease" },
  ],
  note:
    "Figures drawn from India's National Policy for Rare Diseases (2021) and published " +
    "literature. To be confirmed with final sources before publication.",
};

/** 02 — five areas, each paired with what the one record produces for it. */
export const HOME_DOES = {
  eyebrow: "What Genetico does",
  menuLabel: "What we do",
  heading: "Connecting information. Enabling better decisions.",
  description:
    "Genetico works across five connected areas. Each draws on the same structured information, " +
    "so what is recorded once can serve care, research and planning.",
  areas: [
    {
      title: "Clinical care",
      body: "Structured consultations and decision support in genetics and rare disease clinics.",
      output: "Ranked differentials ready",
      status: "Decision support",
    },
    {
      title: "Longitudinal care",
      body:
        "One record per patient across visits, laboratories and centres, so follow-up builds on " +
        "history.",
      output: "5 events linked · 4 sources",
      status: "Updated",
    },
    {
      title: "Research and life sciences",
      body: "Research-ready data and cohort discovery drawn from routine clinical care.",
      output: "Eligible · natural history cohort",
      status: "Matched",
    },
    {
      title: "Registries and programmes",
      body: "Registry entries and programme reporting produced by the clinical workflow itself.",
      output: "Registry entry pre-filled",
      status: "Ready to submit",
    },
    {
      title: "Public health",
      body: "Population-level insight for planning national and state rare disease programmes.",
      output: "Counted in state programme view",
      status: "Aggregated",
    },
  ],
} satisfies Numbered & Record<string, unknown>;

/** The record panel beside section 02. */
export const HOME_DOES_DEMO = {
  panelUrl: "app.indigeneus.ai / records / GX-2041 / uses",
  recordLabel: "One structured record",
  recordChips: [
    { label: "HP:0001263" },
    { label: "HP:0001250" },
    { label: "HP:0001433" },
    { label: "IDUA", teal: true },
  ],
};

/** 03 — the company/platform line, then one workflow in four layers. */
export const HOME_PLATFORM = {
  eyebrow: "IndiGeneUs.AI",
  menuLabel: "IndiGeneUs.AI",
  heading: "Genetico is the company. IndiGeneUs.AI is the platform.",
  body:
    "IndiGeneUs.AI is Genetico's AI-enabled platform for connecting clinical data, decision " +
    "support, longitudinal information and analytics. It structures the workflow at the point " +
    "of care and keeps the record computable from that moment on.",
  ctaLabel: "See how the platform works",
  layersLabel: "One workflow, four layers",
  /** Exactly four: each is paired with the screen drawn for it, in this order. */
  layers: [
    {
      title: "Capture",
      body:
        "Structured intake at the point of care — phenotype, history and documents converted " +
        "into computable fields instead of free text.",
      tag: "Intelligent data capture",
    },
    {
      title: "Decide",
      body:
        "Clinical decision support surfaces ranked differentials with the evidence behind each " +
        "one, inside the existing workflow.",
      tag: "CDSS",
    },
    {
      title: "Connect",
      body:
        "One longitudinal record per patient across visits, departments, labs and centres — no " +
        "re-entry, no duplication.",
      tag: "Longitudinal record",
    },
    {
      title: "Analyse",
      body:
        "Cohorts, registries and programme dashboards built from the same structured data the " +
        "clinic already produced.",
      tag: "Registry & analytics",
    },
  ],
} satisfies Numbered & Record<string, unknown>;

/** Where section 03's button goes. */
export const HOME_PLATFORM_HREF = PLATFORM_PATH;

/** The four screens beside section 03, one per layer. */
export const HOME_PLATFORM_DEMO = {
  urls: [
    "app.indigeneus.ai / cases / GX-2041 / intake",
    "app.indigeneus.ai / cases / GX-2041 / differentials",
    "app.indigeneus.ai / cases / GX-2041 / timeline",
    "app.indigeneus.ai / programme / cohorts",
  ],
  fields: [
    { k: "Age at visit", v: "2 y 4 m" },
    { k: "Sex", v: "Male" },
    { k: "Age at onset", v: "8 months" },
    { k: "Consanguinity", v: "Yes" },
    { k: "Referred by", v: "Paediatric neurology" },
  ],
  growth: [
    { label: "Weight", value: "9.8 kg", z: "−2.1", width: 32 },
    { label: "Height", value: "78 cm", z: "−2.4", width: 26 },
    { label: "OFC", value: "46 cm", z: "−1.2", width: 54 },
  ],
  timeline: [
    { m: "M0", title: "First consultation", src: "Genetics OPD" },
    { m: "M1", title: "Enzyme assay imported", src: "Laboratory" },
    { m: "M3", title: "Exome result linked", src: "Sequencing" },
    { m: "M6", title: "Growth and seizures reviewed", src: "Follow-up" },
    { m: "M9", title: "Registry entry submitted", src: "Registry" },
  ],
  cohort: [
    { label: "0–2", value: 38 },
    { label: "2–5", value: 76 },
    { label: "5–10", value: 58 },
    { label: "10–18", value: 32 },
    { label: "18+", value: 16 },
  ],
  centres: [
    { name: "Centre A", value: 86 },
    { name: "Centre B", value: 68 },
    { name: "Centre C", value: 51 },
    { name: "Centre D", value: 34 },
  ],
};

/** 04 — one photo card per audience. */
export const HOME_SERVE = {
  eyebrow: "Who we serve",
  menuLabel: "Who we serve",
  heading: "Clinicians, researchers and public-health programmes",
  description:
    "Each works with the same structured information, for a different purpose. Choose yours to " +
    "see what changes.",
  caption: "Interface snippets are illustrative",
  /** Exactly three, in this order: each links to its solution page and carries its own snippet. */
  doors: [
    {
      kicker: "Clinicians & Hospitals",
      title: "Clinical workflows and longitudinal care",
      body:
        "Structured consultations, decision support and one patient record that carries across " +
        "visits, departments and centres.",
      ctaLabel: "For clinicians & hospitals",
    },
    {
      kicker: "Life Sciences & Research",
      title: "Structured data for research and evidence",
      body:
        "Cohort discovery and natural history drawn from routine care, on standardised data from " +
        "multiple sites.",
      ctaLabel: "For life sciences & research",
    },
    {
      kicker: "Government & Public Health",
      title: "Registries, programmes and population insight",
      body:
        "Registries that fill from routine care, and programme tracking from primary care to " +
        "Centres of Excellence.",
      ctaLabel: "For government & public health",
    },
  ],
} satisfies Numbered & Record<string, unknown>;

/** What stays fixed per audience card, by position: destination, photo and snippet. */
export const HOME_SERVE_DOORS = [
  {
    href: HOSPITAL_PATH,
    snippet: "score",
    photo: {
      src: "/images/audience/clinic-consultation.webp",
      position: "60% 40%",
      alt: "Clinician reviewing a genomic case with a patient",
    },
  },
  {
    href: PHARMA_PATH,
    snippet: "cohort",
    photo: {
      src: "/images/audience/research-team.webp",
      position: "55% 45%",
      alt: "Research team reviewing a multi-site cohort",
    },
  },
  {
    href: PUBLIC_HEALTH_PATH,
    snippet: "registry",
    photo: {
      src: "/images/audience/programme-briefing.webp",
      position: "60% 40%",
      alt: "Programme team reviewing a registry dashboard",
    },
  },
] as const;

/** 05 — figures, then the partner-logo strip (logos from Partner logos in the CMS). */
export const HOME_IMPACT = {
  eyebrow: "Impact",
  menuLabel: "Impact",
  heading: "Already in clinical use",
  description:
    "Where Genetico is deployed today, and the institutions and programmes it works with.",
  figures: [
    {
      label: "In clinical use",
      figure: "AIIMS · CDFD",
      body:
        "Genetics departments at AIIMS New Delhi and CDFD Hyderabad use IndiGeneUs.AI in " +
        "consultations.",
    },
    {
      label: "Network",
      figure: "15 centres",
      body: "Rare disease centres engaged under the PraGed Mission.",
    },
  ],
  /** A third figure, counted from Grants & awards so it stays true as awards are added. */
  awardsLabel: "Backed by",
  awardsBody: "including BIRAC, MeitY and the HDFC Bank Parivartan programme.",
  logosLabel: "Institutions and programmes we work with",
} satisfies Numbered & Record<string, unknown>;

/**
 * 06 — Insights. The featured film and the list are the Resources page's
 * entries ticked "Show on the home page".
 *
 * The featured card has its own title because the design's "3 weeks → 4 days"
 * claim — also in the featured film's CMS title — was dropped (2026-09-23,
 * kept dropped 2026-09-28).
 */
export const HOME_INSIGHTS = {
  eyebrow: "Insights",
  menuLabel: "Insights",
  heading: "Evidence from the field",
  description: "Case studies, films, coverage and writing from the Genetico Insights library.",
  ctaLabel: "View all insights",
  latestLabel: "Latest",
  featuredTitle: "How AI is helping identify rare diseases",
} satisfies Numbered & Record<string, unknown>;

export const HOME_INSIGHTS_PHOTO = {
  src: "/images/home/clinic-wide.webp",
  alt: "Genetics clinic at a referral hospital",
};

/** 07 — three stages from solutions to infrastructure. */
export const HOME_AHEAD = {
  eyebrow: "Where we are going",
  menuLabel: "Where we're going",
  heading: "From digital solutions to connected infrastructure",
  description:
    "Every solution Genetico deploys — in a clinic, a study or a programme — runs on the same " +
    "structured record. Together, they add up to shared infrastructure.",
  /** Exactly three: the network diagram draws one stage for each. */
  stages: [
    {
      tag: "01 · In use",
      title: "Digital solutions",
      body:
        "Structured consultations, research intake and registry tools — each deployed with a " +
        "specific clinic, study or programme.",
      caption: "Separate deployments",
    },
    {
      tag: "02 · Connecting",
      title: "One platform underneath",
      body:
        "IndiGeneUs.AI gives every deployment the same record and standards, so information " +
        "moves between them without re-entry.",
      caption: "One record, shared standards",
    },
    {
      tag: "03 · Direction",
      title: "Connected infrastructure",
      body:
        "A shared digital layer for the rare and genetic disease ecosystem, serving care, " +
        "research and public health across India.",
      caption: "Shared digital layer",
    },
  ],
  footnote: "A direction of travel, not dated commitments.",
} satisfies Numbered & Record<string, unknown>;

/** 08 — the enquiry form. Its audience tabs and wording are under Site-wide → Contact. */
export const HOME_CONTACT = {
  eyebrow: "Next step",
  menuLabel: "Next step",
  heading: "Talk to our team",
  description: "Tell us who you are and what you're working on. We'll route it to the right team.",
} satisfies Numbered & Record<string, unknown>;

export type HomeHeroContent = typeof HOME_HERO;
export type HomeWhyContent = typeof HOME_WHY;
export type HomeScaleContent = typeof HOME_SCALE;
export type HomeDoesContent = typeof HOME_DOES;
export type HomePlatformContent = typeof HOME_PLATFORM;
export type HomeServeContent = typeof HOME_SERVE;
export type HomeImpactContent = typeof HOME_IMPACT;
export type HomeInsightsContent = typeof HOME_INSIGHTS;
export type HomeAheadContent = typeof HOME_AHEAD;
export type ContactSectionContent = typeof HOME_CONTACT;
