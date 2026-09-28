import type { PageSection } from "@/components/chrome/page-sections";
import { ABOUT_V2_HERO, ABOUT_V2_PLATFORM, ABOUT_V2_WHY } from "@/content/about-v2";

/**
 * Copy for the About page (/about-us) as revised after the senior advisor's
 * review.
 *
 * Structured like /about-v2 and built from its components; this file holds
 * only what the review rewrote or added. The team, awards, partner logos,
 * security points and the closing heading still come from the CMS through
 * `getAboutContent()`, and the institution logos from `ar-partners.ts`.
 *
 * Source: design_handoff_genetico_site/design_handoff_ar_pages/About Genetico ar.dc.html.
 * Copy is advisor-approved and carried over verbatim.
 */

/** In render order; the rail, the mobile menu and the section numbers follow it. */
export const ABOUT_AR_SECTIONS: (PageSection & { eyebrow: string })[] = [
  { id: "why", label: "The problem", eyebrow: "The problem we set out to solve" },
  { id: "building", label: "What we do", eyebrow: "What Genetico does" },
  { id: "platform", label: "What we build", eyebrow: "What we are building" },
  { id: "now", label: "Why now", eyebrow: "Why now" },
  { id: "mission", label: "Mission & vision", eyebrow: "Mission and vision" },
  { id: "team", label: "Leadership", eyebrow: "Leadership" },
  { id: "recognition", label: "Recognition", eyebrow: "Recognition" },
  { id: "partners", label: "Partners", eyebrow: "Partners" },
  { id: "trust", label: "Security", eyebrow: "Security & Compliance" },
  { id: "get-in-touch", label: "Engage", eyebrow: "Engage" },
];

export const ABOUT_AR_HERO: typeof ABOUT_V2_HERO = {
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

/** 01 — the problem. The three cards are unchanged from v2. */
export const ABOUT_AR_WHY: typeof ABOUT_V2_WHY = {
  heading: "Rare diseases are complex. The systems supporting them shouldn’t be.",
  lead:
    "Information about a single patient is spread across clinicians, hospitals, laboratories, " +
    "research programmes and public-health systems — in different formats, and rarely " +
    "connected. That fragmentation slows diagnosis, weakens follow-up and leaves research and " +
    "planning without reliable data.",
  items: ABOUT_V2_WHY.items,
  closing:
    "Genetico was created to connect that information — so that diagnosis, follow-up, research " +
    "and planning can build on the same record.",
};

/** 02 — the five connected areas. */
export const ABOUT_AR_BUILDING = {
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

/** 03 — which name is which. The two cards and the four steps are unchanged from v2. */
export const ABOUT_AR_PLATFORM: typeof ABOUT_V2_PLATFORM & { lead: string } = {
  ...ABOUT_V2_PLATFORM,
  heading: "Genetico is the company. IndiGeneUs.AI is the platform.",
  lead:
    "IndiGeneUs.AI is Genetico's AI-enabled platform for connecting clinical data, decision " +
    "support, longitudinal information and analytics.",
};

/** 04 — four changes that make connected infrastructure practical now. */
export const ABOUT_AR_NOW = {
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

/** 05 — mission and vision, then where we are going. The horizons are v2's. */
export const ABOUT_AR_MISSION = {
  heading: "What we are working towards",
  mission:
    "To equip clinicians, institutions and researchers with AI-enabled workflows and structured " +
    "data that improve care and accelerate discovery.",
  vision:
    "To build the digital backbone for the rare disease ecosystem — connecting patient care, " +
    "research and public health at scale.",
  horizonsHeading: "From digital solutions to connected infrastructure",
  horizonsLabel: "Where we are going",
};

/** 08 — the handoff's two logo rows, by name. */
export const ABOUT_AR_PARTNERS = {
  institutions: [
    "AIIMS Delhi",
    "CDFD",
    "SGRH",
    "Manovikas",
    "BGCI",
    "GHRC",
    "Amity University",
    "UPES",
  ],
  /** Everything else the handoff lists, in its order. */
  supporters: [
    "10,000 Startups",
    "BIRAC",
    "TPG",
    "Catalyst",
    "HDFC Startup Buildup Parivartan",
    "Indo-Sweden Innovation Centre",
    "JKEDI",
    "MeitY Startup Hub",
    "Runway",
  ],
};

/** 10 — the two buttons over the form. */
export const ABOUT_AR_ENGAGE = {
  heading: "Advancing the Rare Disease Ecosystem Starts with Collaboration",
  description:
    "We work alongside clinicians, institutions, researchers, and public health programs to " +
    "build intelligent infrastructure that transforms fragmented data into better decisions and " +
    "better outcomes.",
  primaryLabel: "Book a Demo",
  secondaryLabel: "Subscribe to Updates",
};
