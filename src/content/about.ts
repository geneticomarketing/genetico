import { PLATFORM_PATH } from "@/lib/routes";

/**
 * The About page's built-in copy.
 *
 * Every section below is edited in the CMS (About page · /about-us in
 * /admin); these values seeded those entries and are what the page falls back
 * to for any field left empty. Field names match the CMS fields one for one —
 * see src/payload/globals/sections/about.ts.
 *
 * The team, the awards, the partner logos and the security points are
 * collections and lists in the CMS; only their section headings are here.
 *
 * Source: design_handoff_genetico_site/design_handoff_ar_pages/ (advisor-approved copy).
 */

export const ABOUT_INTRO = {
  eyebrow: "What is Genetico?",
  headline: {
    before: "Genetico is a health technology company developing digital solutions for the",
    highlight: "rare and genetic disease ecosystem",
    after: "",
  },
  blurb:
    "We work with clinicians, hospitals, laboratories, researchers and public-health programmes " +
    "to connect the information that rare disease care depends on. Our platform, IndiGeneUs.AI, " +
    "is how that work is delivered.",
  primaryCta: { label: "Read our story", target: "why" },
  secondaryCta: { label: "Meet the team", target: "team" },
  glance: [
    {
      label: "Who we are",
      title: "Clinicians, engineers and data scientists",
      body: "A health technology company working on rare and genetic disorders.",
    },
    {
      label: "Our platform",
      title: "IndiGeneUs.AI",
      body:
        "AI-enabled platform for clinical data, decision support, longitudinal records and " +
        "analytics.",
    },
    {
      label: "Where we work",
      title: "AIIMS New Delhi, CDFD Hyderabad and 15 centres",
      body: "Rare disease centres engaged under the PraGed Mission.",
    },
  ],
};

/** 01 — the problem. */
export const ABOUT_PROBLEM = {
  eyebrow: "The problem we set out to solve",
  menuLabel: "The problem",
  heading: "Rare diseases are complex. The systems supporting them shouldn’t be.",
  lead:
    "Information about a single patient is spread across clinicians, hospitals, laboratories, " +
    "research programmes and public-health systems — in different formats, and rarely " +
    "connected. That fragmentation slows diagnosis, weakens follow-up and leaves research and " +
    "planning without reliable data.",
  items: [
    {
      title: "Diagnosis is slow",
      body:
        "Patients see several specialists before a genetic diagnosis, and each visit starts " +
        "from a new file.",
    },
    {
      title: "Records don't travel",
      body:
        "Notes, lab reports and images sit on paper and in separate systems, so history is " +
        "rebuilt at every centre.",
    },
    {
      title: "Nothing adds up",
      body: "Without structured data there are no cohorts for research and no registry for planning.",
    },
  ],
  closing:
    "Genetico was created to connect that information — so that diagnosis, follow-up, research " +
    "and planning can build on the same record.",
};

/** 02 — the five connected areas. */
export const ABOUT_BUILDING = {
  eyebrow: "What Genetico does",
  menuLabel: "What we do",
  heading: "Connecting information. Enabling better decisions.",
  aside:
    "Genetico works across five connected areas of the rare disease ecosystem. Each draws on " +
    "the same structured information.",
  chain: [
    {
      title: "Clinical care",
      body: "Structured consultations and decision support in genetics and rare disease clinics.",
    },
    {
      title: "Longitudinal care",
      body: "One record per patient across visits, laboratories and centres.",
    },
    {
      title: "Research and life sciences",
      body: "Research-ready data and cohorts drawn from routine care.",
    },
    {
      title: "Registries and programmes",
      body: "Registry entries and programme reporting from the clinical workflow.",
    },
    { title: "Public health", body: "Population-level insight for programme planning." },
  ],
  footnote:
    "Information recorded once in clinical care serves every area that follows — nothing is " +
    "entered twice.",
};

/** 03 — which name is which, then the platform in four steps. */
export const ABOUT_PLATFORM = {
  eyebrow: "What we are building",
  menuLabel: "What we build",
  heading: "Genetico is the company. IndiGeneUs.AI is the platform.",
  lead:
    "IndiGeneUs.AI is Genetico's AI-enabled platform for connecting clinical data, decision " +
    "support, longitudinal information and analytics.",
  company: {
    label: "The company",
    statement:
      "Works with hospitals, laboratories, researchers and government programmes to connect the " +
      "rare disease ecosystem.",
    body: "Partnerships, clinical deployment, research collaborations and programme design.",
  },
  platform: {
    name: "IndiGeneUs.AI",
    label: "The platform",
    statement:
      "The software that makes this operational — used during the consultation, alongside " +
      "existing hospital systems.",
    ctaLabel: "See the platform",
    ctaHref: PLATFORM_PATH,
  },
  steps: [
    {
      title: "Capture",
      body: "Phenotype, history and documents recorded as structured fields at the point of care.",
    },
    {
      title: "Decide",
      body: "Ranked differentials with the evidence behind each one, reviewed by the treating team.",
    },
    {
      title: "Connect",
      body: "One longitudinal record per patient across visits, departments and centres.",
    },
    {
      title: "Analyse",
      body: "Cohorts, registries and dashboards from the data the clinic already produced.",
    },
  ],
};

/** 04 — four changes that make connected infrastructure practical now. */
export const ABOUT_NOW = {
  eyebrow: "Why now",
  menuLabel: "Why now",
  heading: "Why the opportunity exists now",
  aside:
    "Several changes have arrived together. Between them, connected rare disease infrastructure " +
    "has become practical in India.",
  drivers: [
    {
      label: "Policy",
      title: "A national framework for rare diseases",
      body:
        "The National Policy for Rare Diseases (2021) designated Centres of Excellence and " +
        "called for a national registry — both depend on consistent clinical data.",
    },
    {
      label: "Diagnostics",
      title: "Genetic testing is reaching more clinics",
      body:
        "As sequencing becomes more accessible, the bottleneck moves from generating results to " +
        "interpreting and connecting them.",
    },
    {
      label: "Standards",
      title: "Shared digital health standards",
      body:
        "India's national digital health mission and clinical vocabularies such as HPO and ORPHA " +
        "give records a common structure to connect to.",
    },
    {
      label: "Technology",
      title: "AI can structure clinical information",
      body:
        "Notes and reports can now be turned into structured data at the point of care — when " +
        "the workflow is designed for it.",
    },
  ],
};

/** 05 — mission and vision, then where Genetico is going. */
export const ABOUT_MISSION = {
  eyebrow: "Mission and vision",
  menuLabel: "Mission & vision",
  heading: "What we are working towards",
  mission:
    "To equip clinicians, institutions and researchers with AI-enabled workflows and structured " +
    "data that improve care and accelerate discovery.",
  vision:
    "To build the digital backbone for the rare disease ecosystem — connecting patient care, " +
    "research and public health at scale.",
  horizonsLabel: "Where we are going",
  horizonsHeading: "From digital solutions to connected infrastructure",
  horizons: [
    {
      when: "Now",
      title: "Centres of Excellence",
      body: "Structured consultations and decision support in genetics clinics across the network.",
    },
    {
      when: "Next",
      title: "Connected research",
      body: "Multi-site cohorts and natural history studies drawn from the same routine-care record.",
    },
    {
      when: "Longer term",
      title: "National infrastructure",
      body: "A registry that fills from routine care and informs rare disease programme planning.",
    },
  ],
  footnote: "A direction of travel, not dated commitments.",
};

/** 06 — the heading over the team (people are the Team members collection), then principles. */
export const ABOUT_LEADERSHIP = {
  eyebrow: "Leadership",
  menuLabel: "Leadership",
  heading: "The people behind Genetico",
  subtitle:
    "Clinicians, engineers, data scientists and advisors with experience across genetics, " +
    "health systems and technology.",
  beliefs: [
    {
      title: "Clinician-led, not clinician-facing",
      body:
        "Every workflow is designed with the doctors who will use it. If it adds a minute to a " +
        "consultation, it does not ship.",
    },
    {
      title: "Structure before intelligence",
      body:
        "AI is only as good as the record beneath it. We fix capture first — decision support, " +
        "cohorts and registries follow from the same data.",
    },
    {
      title: "Built with institutions, not around them",
      body:
        "We work inside existing hospital systems, national programmes and standards rather " +
        "than asking anyone to replace what already works.",
    },
  ],
};

/** 07 — the heading over the Grants & awards timeline. */
export const ABOUT_RECOGNITION = {
  eyebrow: "Recognition",
  menuLabel: "Recognition",
  heading: "Rewards & Recognition",
  description: "",
};

/** 08 — the heading over the two rows of Partner logos. */
export const ABOUT_PARTNERS = {
  eyebrow: "Partners",
  menuLabel: "Partners",
  heading: "Trusted Across the Rare Disease Ecosystem",
  description: "",
};

/** 09 — the heading over the security points. */
export const ABOUT_SECURITY = {
  eyebrow: "Security & Compliance",
  menuLabel: "Security",
  heading: "Built for trust. Designed for healthcare.",
  description: "",
  features: [] as { text: string }[],
};

/** 10 — the heading and two buttons over the enquiry form. */
export const ABOUT_ENGAGE = {
  eyebrow: "Engage",
  menuLabel: "Engage",
  heading: "Advancing the Rare Disease Ecosystem Starts with Collaboration",
  description:
    "We work alongside clinicians, institutions, researchers, and public health programs to " +
    "build intelligent infrastructure that transforms fragmented data into better decisions and " +
    "better outcomes.",
  buttons: [
    { label: "Book a Demo", href: "#lead-form", variant: "primary" },
    {
      label: "Subscribe to Updates",
      href: "https://mailchi.mp/genetico/rare-insights",
      variant: "secondary",
    },
  ],
};

export type AboutIntroContent = typeof ABOUT_INTRO;
export type AboutProblemContent = typeof ABOUT_PROBLEM;
export type AboutBuildingContent = typeof ABOUT_BUILDING;
export type AboutPlatformContent = typeof ABOUT_PLATFORM;
export type AboutNowContent = typeof ABOUT_NOW;
export type AboutMissionContent = typeof ABOUT_MISSION;
