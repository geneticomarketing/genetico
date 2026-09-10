import {
  HOSPITAL_PATH,
  PHARMA_PATH,
  PLATFORM_PATH,
  PUBLIC_HEALTH_PATH,
  RESOURCES_PATH,
} from "@/lib/routes";

/**
 * The home page's editable content, and the copy it falls back to.
 *
 * Shaped the way the page consumes it rather than the way Payload stores it,
 * so the section components stay unaware of the CMS. `getHomePageData` maps the
 * globals onto this and fills any gap from the defaults below — the same
 * pattern the rest of `lib/cms/defaults` already follows.
 */

export type HomeCta = {
  label: string;
  href: string;
};

export type HomeHeroContent = {
  eyebrow: string;
  /** The fixed opening of the headline; the rotating word completes it. */
  headline: string;
  /** Cycled one at a time at the end of the headline. */
  rotatingWords: string[];
  blurb: string;
  /** Shorter blurb for narrow screens, where the long one crowds the hero. */
  blurbShort: string;
  primaryCta: HomeCta;
  secondaryCta: HomeCta;
  trustedByLabel: string;
  /** Institution names in the hero's marquee. */
  credentials: string[];
};

export type HomeSectionMeta = {
  /** Matches the `id` on the rendered `<section>`. */
  id: string;
  /** Short form, used by the rail and the mobile menu. */
  label: string;
  /** Longer form, printed after the number in the section's own eyebrow. */
  eyebrow: string;
};

/**
 * Every section of the home page, in render order.
 *
 * Numbers are derived from position at render time, so hiding the FAQs closes
 * the gap rather than leaving a hole at 05.
 */
export const HOME_SECTIONS: HomeSectionMeta[] = [
  { id: "who", label: "Who it's for", eyebrow: "Start here" },
  { id: "platform", label: "Platform", eyebrow: "The Platform" },
  { id: "proof", label: "Proof", eyebrow: "Proof" },
  { id: "trust", label: "Security", eyebrow: "Security & Compliance" },
  { id: "faqs", label: "FAQs", eyebrow: "FAQs" },
  { id: "get-in-touch", label: "Get in Touch", eyebrow: "Get in Touch" },
];

export const DEFAULT_HOME_HERO: HomeHeroContent = {
  eyebrow: "Genetico · IndiGeneUs.AI",
  headline: "The digital backbone for rare disease",
  rotatingWords: ["diagnosis", "research", "programs"],
  blurb:
    "IndiGeneUs.AI turns fragmented clinical records into structured, connected data — so " +
    "clinicians decide faster, researchers find cohorts, and public health programmes see " +
    "their population.",
  blurbShort:
    "IndiGeneUs.AI turns fragmented clinical records into structured, connected data — for " +
    "faster decisions and findable cohorts.",
  primaryCta: { label: "Book a demo", href: "#get-in-touch" },
  secondaryCta: { label: "Explore the platform", href: PLATFORM_PATH },
  trustedByLabel: "Trusted by",
  credentials: [
    "AIIMS New Delhi",
    "CDFD Hyderabad",
    "15 Rare Disease Centres",
    "PraGed Mission",
    "Sir Ganga Ram Hospital",
    "Manovikas",
    "Board of Genetic Counselling India",
    "GHRC",
  ],
};

export type HomeDoor = {
  /** Small label above the title: who this door is for. */
  kicker: string;
  title: string;
  blurb: string;
  points: string[];
  ctaLabel: string;
  href: string;
};

export type HomeAudienceContent = {
  heading: string;
  description: string;
  doors: HomeDoor[];
};

export const DEFAULT_HOME_AUDIENCE: HomeAudienceContent = {
  heading: "Find your path in one click",
  description:
    "Three purpose-built solutions. Pick the one that describes you — the rest of this page " +
    "is optional.",
  doors: [
    {
      kicker: "For clinical teams",
      title: "Hospital, Clinician & CoE",
      blurb:
        "Complex genetic cases, fragmented records, and hours of documentation before a " +
        "decision can be made.",
      points: [
        "AI-assisted intake and phenotype capture",
        "RAPID Score candidate ranking with evidence",
        "Registry-ready records from day one",
      ],
      ctaLabel: "Explore clinical solutions",
      href: HOSPITAL_PATH,
    },
    {
      kicker: "For research",
      title: "Life Science & Biotech",
      blurb:
        "Natural history studies and cohort discovery held back by unstructured, " +
        "site-by-site data.",
      points: [
        "Standardized intake across sites",
        "Cohort discovery on structured fields",
        "Research-ready export and audit trail",
      ],
      ctaLabel: "Explore research solutions",
      href: PHARMA_PATH,
    },
    {
      kicker: "For programmes",
      title: "Government & Public Health",
      blurb:
        "National programmes need a live view of patients, centres, and outcomes — not " +
        "periodic spreadsheets.",
      points: [
        "Hub-and-spoke registry architecture",
        "Screening and patient tracking",
        "Programme analytics in real time",
      ],
      ctaLabel: "Explore public health solutions",
      href: PUBLIC_HEALTH_PATH,
    },
  ],
};

export type HomeLayer = {
  title: string;
  body: string;
  /** Mono label at the foot of the cell, naming the product surface. */
  tag: string;
};

export type HomePlatformContent = {
  heading: string;
  description: string;
  layers: HomeLayer[];
  cta: HomeCta;
};

export const DEFAULT_HOME_PLATFORM: HomePlatformContent = {
  heading: "IndiGeneUs.AI in one glance",
  description: "One workflow, four layers — from the clinic visit to the national registry.",
  layers: [
    {
      title: "Capture",
      body:
        "Structured intake at the point of care — phenotype, history, and documents converted " +
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
        "One longitudinal record per patient across visits, departments, labs, and centres — " +
        "no re-entry, no duplication.",
      tag: "Longitudinal record",
    },
    {
      title: "Analyse",
      body:
        "Cohorts, registries, and programme dashboards built from the same structured data the " +
        "clinic already produced.",
      tag: "Registry & analytics",
    },
  ],
  cta: { label: "See how the platform works", href: PLATFORM_PATH },
};

export type HomeProofFeatured = {
  /** Ribbon over the still, e.g. "Now showing". */
  badge: string;
  duration: string;
  kicker: string;
  heading: string;
  blurb: string;
  /** The claim as a before and an after, e.g. "3 weeks" → "4 days". */
  before: string;
  after: string;
  ctaLabel: string;
  href: string;
};

export type HomeProofClip = {
  /** Kind and length, e.g. "Deep dive · 45:22". */
  meta: string;
  title: string;
  href: string;
};

export type HomeProofContent = {
  heading: string;
  featured: HomeProofFeatured;
  clips: HomeProofClip[];
  allResourcesLabel: string;
  allResourcesHref: string;
};

/**
 * Placeholder grounds for the thumbnails the client has yet to supply.
 *
 * Kept in code and picked by position: the CMS convention is that no
 * editor-facing field holds a colour. Once real stills arrive they replace
 * these outright.
 */
export const PROOF_FEATURED_PLACEHOLDER =
  "radial-gradient(120% 130% at 22% 18%,#1B4A72 0%,#0C2436 62%,#07121C 100%)";

export const PROOF_CLIP_PLACEHOLDERS = [
  "radial-gradient(120% 130% at 30% 24%,#2A4560 0%,#13202C 62%,#0A121A 100%)",
  "radial-gradient(120% 130% at 30% 26%,#1E4A40 0%,#0F2A25 60%,#081815 100%)",
  "radial-gradient(120% 130% at 30% 24%,#6B4A22 0%,#39240F 60%,#1C1108 100%)",
];

export const DEFAULT_HOME_PROOF: HomeProofContent = {
  heading: "In use across the ecosystem",
  featured: {
    badge: "Now showing",
    duration: "28:34",
    kicker: "Case study · AIIMS Delhi · Documentary",
    heading: "Rare disease diagnosis time reduced from 3 weeks to 4 days",
    blurb:
      "Structured genomic workflows and cross-department collaboration at one of India's " +
      "largest referral hospitals. Results depend on case mix.",
    before: "3 weeks",
    after: "4 days",
    ctaLabel: "Watch the documentary",
    href: RESOURCES_PATH,
  },
  clips: [
    {
      meta: "Video · 8:05",
      title: "Genetico platform overview for diagnostic labs",
      href: RESOURCES_PATH,
    },
    {
      meta: "Deep dive · 45:22",
      title: "Rare disease care in India: conversation with leading geneticists",
      href: RESOURCES_PATH,
    },
    {
      meta: "Deep dive · 1:12:08",
      title: "Building national genomics infrastructure — summit panel",
      href: RESOURCES_PATH,
    },
  ],
  allResourcesLabel: "All resources",
  allResourcesHref: RESOURCES_PATH,
};

export type HomeTrustContent = {
  heading: string;
  description: string;
  points: string[];
};

export const DEFAULT_HOME_TRUST: HomeTrustContent = {
  heading: "Built for trust. Designed for healthcare.",
  description: "Enterprise-grade security, privacy, and compliance in every layer of the platform.",
  points: [
    "Your institution retains full ownership and control of its data.",
    "Access is restricted based on user roles and responsibilities.",
    "Every action is securely logged for complete traceability.",
    "Data is protected through encryption in transit and at rest.",
    "Hosted on enterprise-grade infrastructure with continuous monitoring.",
  ],
};
