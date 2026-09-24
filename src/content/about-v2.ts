import type { PageSection } from "@/components/chrome/page-sections";
import { PLATFORM_PATH } from "@/lib/routes";

/**
 * Copy for the second pass at the About page, previewed at /about-v2.
 *
 * Like the home previews, the new narrative lives in code rather than the CMS:
 * an unapproved experiment should cause no schema push to the live database.
 * Everything the live About page already stores — the team, the awards, the
 * partner logos, the security points and the closing heading — is read from
 * the CMS through `getAboutContent()` and is not duplicated here.
 *
 * Source: design_handoff_genetico_site/design_handoff_about_v2/. The page is
 * restructured around the story a first-time visitor needs: who we are → why
 * Genetico exists → what we are building → how IndiGeneUs.AI fits → where we
 * are today → where we are going → who is behind it.
 */

/** In render order; the rail, the mobile menu and the section numbers follow it. */
export const ABOUT_V2_SECTIONS: (PageSection & { eyebrow: string })[] = [
  { id: "why", label: "Why we exist", eyebrow: "Why Genetico exists" },
  { id: "building", label: "What we build", eyebrow: "What we are building" },
  { id: "platform", label: "IndiGeneUs.AI", eyebrow: "How IndiGeneUs.AI fits" },
  { id: "today", label: "Today", eyebrow: "Where we are today" },
  { id: "ahead", label: "Where we're going", eyebrow: "Where we are going" },
  { id: "team", label: "Team", eyebrow: "Who is behind it" },
  { id: "recognition", label: "Recognition", eyebrow: "Recognition" },
  { id: "partners", label: "Partners", eyebrow: "Partners" },
  { id: "trust", label: "Security", eyebrow: "Security & Compliance" },
  { id: "get-in-touch", label: "Engage", eyebrow: "Engage" },
];

export const ABOUT_V2_HERO = {
  eyebrow: "About Genetico",
  headline: {
    before: "We build the data infrastructure for",
    highlight: "rare disease care",
    after: "in India",
  },
  blurb:
    "Genetico is a health technology company. We make IndiGeneUs.AI, software that helps " +
    "clinicians record, diagnose and follow patients with rare and genetic disorders — and " +
    "turns that routine care into data for research and public health.",
  primaryCta: { label: "Read our story", target: "why" },
  secondaryCta: { label: "Meet the team", target: "team" },
  glance: [
    {
      label: "Who we are",
      title: "Clinicians, engineers and data scientists",
      body: "A health technology company working on rare and genetic disorders.",
    },
    {
      label: "What we make",
      title: "IndiGeneUs.AI",
      body: "A platform for structured capture, decision support and longitudinal records.",
    },
    {
      label: "Where we work",
      title: "AIIMS New Delhi, CDFD Hyderabad and 15 centres",
      body: "Rare disease centres engaged under the PraGed Mission.",
    },
  ],
};

/** 01 — the problem, as three cards and a closing line. */
export const ABOUT_V2_WHY = {
  heading: "Rare disease care runs on fragmented records",
  lead:
    "Rare disease care is limited by fragmented clinical data, disconnected workflows and a lack " +
    "of the structured information needed for diagnosis, research and public health.",
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
    "Genetico was started to fix the record first — so that diagnosis, research and planning " +
    "can build on the same data.",
};

/** 02 — the five-step chain from the clinic to policy. */
export const ABOUT_V2_BUILDING = {
  heading: "One patient record that serves care, research and policy",
  mission:
    "Our mission: equip clinicians, institutions and researchers with AI-enabled workflows and " +
    "structured data that improve care and accelerate discovery.",
  chain: [
    { title: "Care", body: "Cases recorded as structured data during the consultation." },
    {
      title: "Longitudinal record",
      body: "One record per patient across visits, labs and centres.",
    },
    { title: "Research", body: "Cohorts and natural history drawn from routine care." },
    { title: "Registries", body: "Registry entries produced by the clinical workflow." },
    { title: "Policy", body: "Programme planning informed by real case data." },
  ],
  footnote: "Each step uses data the previous one already produced — nothing is entered twice.",
};

/** 03 — which of the two names is which, then the platform in four steps. */
export const ABOUT_V2_PLATFORM = {
  heading: "Genetico is the company. IndiGeneUs.AI is what we make.",
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

/**
 * 04 — three figures and a case-study card.
 *
 * The third figure is counted from the CMS awards rather than written here, so
 * it stays true as awards are added. The case-study card takes its wording
 * from the featured resource on the Resources page; the handoff's "3 weeks →
 * 4 days" line was dropped from the home page for being unverified, so it is
 * only the fallback's shape that is kept, not the claim.
 */
export const ABOUT_V2_TODAY = {
  heading: "In clinical use today",
  description: "Each deployment is run with the institution or programme that owns the data.",
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
  awards: {
    label: "Backed by",
    /** Completed with the count and the earliest year held in the CMS. */
    body: "including BIRAC, MeitY and the HDFC Bank Parivartan programme.",
  },
  caseStudyFallback: {
    kicker: "Case study · AIIMS New Delhi",
    title: "Structured intake at a Centre of Excellence",
    ctaLabel: "Watch the case study",
  },
};

/** 05 — the vision, then three horizons. */
export const ABOUT_V2_AHEAD = {
  vision:
    "To build the digital backbone for the rare disease ecosystem — connecting patient care, " +
    "research and public health at scale.",
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

/** 06 — the heading over the CMS team grid, and the principles that close it. */
export const ABOUT_V2_TEAM = {
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
