import {
  ABOUT_PATH,
  HOSPITAL_PATH,
  PHARMA_PATH,
  PLATFORM_PATH,
  PUBLIC_HEALTH_PATH,
  RESOURCES_PATH,
} from "@/lib/routes";
import type { HomeSectionMeta, HomeTrustContent } from "@/lib/cms/home-content";

/**
 * Copy for the fourth pass at the home page, previewed at /home-v4.
 *
 * Like `home-v2.ts` and `home-v3.ts` this lives in code rather than the CMS:
 * an unapproved experiment should cause no schema push to the live database,
 * and nothing here should be reachable by an editor until it is the home page.
 * The two sections that are CMS-backed — Proof and Latest — read the Resources
 * collections through `getProofFeed()`, so they are not duplicated here.
 *
 * Source: design_handoff_genetico_site/design_handoff_home-v4/. This round
 * answers advisor feedback that the page led with the product rather than the
 * company. The running order becomes What is Genetico → Problem → Why it
 * matters → What we are building → IndiGeneUs.AI → Who it is for → Proof →
 * Latest → Security → Engage, the company/platform relationship is stated
 * outright rather than implied, and investors join clinicians, life sciences
 * and government as a first-class audience.
 */

/**
 * In render order; the rail, the mobile menu and the section numbers follow it.
 *
 * `rail: false` keeps the contact form out of the rail's pills while it keeps
 * its number and its place in the mobile menu — it is where you go once the
 * argument has landed, not a step in it. Unlike v3 there are no FAQs on this
 * page; the footer link leaves for the live home page's set.
 */
export const HOME_V4_SECTIONS: HomeSectionMeta[] = [
  { id: "problem", label: "Problem", eyebrow: "The problem" },
  { id: "why", label: "Why it matters", eyebrow: "Why it matters" },
  { id: "building", label: "What we build", eyebrow: "What we are building" },
  { id: "platform", label: "IndiGeneUs.AI", eyebrow: "IndiGeneUs.AI · How it works" },
  { id: "who", label: "Who it's for", eyebrow: "Who it is for" },
  { id: "proof", label: "Proof", eyebrow: "Proof" },
  { id: "latest", label: "Latest", eyebrow: "Latest" },
  { id: "trust", label: "Security", eyebrow: "Security" },
  { id: "get-in-touch", label: "Engage", eyebrow: "Engage", rail: false },
];

export const HOME_V4_HERO = {
  eyebrow: "Genetico",
  headline: "Building the infrastructure for rare disease care in India",
  blurb:
    "Genetico connects clinical care, longitudinal patient data, research and public health " +
    "through one shared record — built with hospitals, laboratories and national programmes.",
  primaryCta: { label: "About Genetico", href: ABOUT_PATH },
  secondaryCta: { label: "Our platform, IndiGeneUs.AI →", href: PLATFORM_PATH },
};

/**
 * The hub-and-spoke diagram beside the hero headline.
 *
 * Coordinates are the handoff's, in its 400×440 viewBox: the hub sits left of
 * centre so the five spokes fan out to the right without colliding with the
 * headline column when the two sit side by side.
 */
export const HOME_V4_HUB = {
  label: "Genetico",
  title: "Shared record",
  sub: "IndiGeneUs.AI",
  x: 130,
  y: 220,
  alt:
    "Hub and spoke: one shared record at the centre, connected to care, laboratories, " +
    "research, registries and policy",
  spokes: [
    { key: "CARE", caption: "Hospitals", x: 241, y: 42 },
    { key: "LABS", caption: "Diagnostics", x: 314, y: 118 },
    { key: "RESEARCH", caption: "Cohorts", x: 340, y: 220 },
    { key: "REGISTRY", caption: "NPRD", x: 314, y: 322 },
    { key: "POLICY", caption: "Programmes", x: 241, y: 398 },
  ],
  legend: [
    { filled: true, label: "One shared record" },
    { filled: false, label: "Where it is used" },
  ],
};

/** The four audience doors along the foot of the hero. */
export const HOME_V4_HERO_DOORS = [
  { label: "For clinicians", line: "Decision support in the consultation", href: HOSPITAL_PATH },
  { label: "For life sciences", line: "Cohorts from routine care", href: PHARMA_PATH },
  { label: "For government", line: "Registries that fill themselves", href: PUBLIC_HEALTH_PATH },
  { label: "For investors", line: "The data layer for the sector", href: PLATFORM_PATH },
];

/** The marquee under the hero. */
export const HOME_V4_PARTNERS = {
  label: "Working with",
  names: [
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

/** 01 — three columns. */
export const HOME_V4_PROBLEM = {
  heading: "Rare disease care in India runs on records that do not connect",
  items: [
    {
      title: "Every referral starts from a blank page",
      body:
        "Families move between specialists and re-describe the same history. Earlier findings " +
        "are repeated or lost.",
    },
    {
      title: "Clinical notes cannot be queried",
      body:
        "Phenotype, history and results sit in prose and scanned reports, so nothing can be " +
        "compared across patients.",
    },
    {
      title: "Institutions hold separate fragments",
      body:
        "Hospitals, laboratories and programmes each keep part of the picture, under different " +
        "identifiers.",
    },
  ],
};

/** 02 — the dark band of figures. */
export const HOME_V4_WHY = {
  heading: "A large population, with little shared evidence",
  description:
    "Without connected data there are no cohorts to recruit from, no natural history to model " +
    "and no registry to plan against.",
  facts: [
    { figure: "7,000+", label: "rare diseases described worldwide" },
    { figure: "~80%", label: "are genetic in origin" },
    { figure: "~50%", label: "first present in childhood" },
    { figure: "~70M", label: "people in India estimated to live with a rare disease" },
  ],
};

/** 03 — the five-step chain, clinic to policy. */
export const HOME_V4_CHAIN = {
  heading: "One connected record, from the clinic to national policy",
  steps: [
    { title: "Care", body: "Cases recorded as structured data during the consultation." },
    {
      title: "Longitudinal record",
      body: "One record per patient across visits, labs and centres.",
    },
    { title: "Research", body: "Cohorts and natural history drawn from routine care." },
    { title: "Registries", body: "Registry entries produced by the clinical workflow." },
    { title: "Public health", body: "Programme-level evidence for planning and policy." },
  ],
};

/**
 * The company/platform panel closing section 03.
 *
 * The advisor note this round answers was that the two names were used
 * interchangeably, so this states which is which rather than leaving it to
 * be inferred from context.
 */
export const HOME_V4_RELATIONSHIP = [
  {
    mark: "/brand/genetico-logo.png",
    markAlt: "Genetico",
    label: "The company",
    body:
      "Genetico works with hospitals, laboratories, research groups and government programmes " +
      "to build and operate rare disease data infrastructure in India.",
  },
  {
    mark: "/brand/indigeneus-mark-black.png",
    markAlt: "IndiGeneUs.AI",
    label: "The platform",
    body:
      "IndiGeneUs.AI is the clinical software Genetico builds. It is used at the point of care " +
      "to create the record that everything else draws on.",
  },
];

/** 04 — what the platform does, in four steps. Detail stays on the platform page. */
export const HOME_V4_PLATFORM = {
  heading: "Four steps, one record",
  description:
    "Used during the consultation, alongside existing hospital systems. Standards, integration " +
    "and security are covered on the platform page.",
  ctaLabel: "Explore IndiGeneUs.AI",
  ctaHref: PLATFORM_PATH,
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
 * 05 — the four audience cards.
 *
 * `tone` picks the chip's colour pair. Investors have no page of their own, so
 * that card points at the platform page.
 */
export const HOME_V4_WHO = {
  heading: "What Genetico means for you",
  doors: [
    {
      kicker: "Clinicians and hospitals",
      title: "Structured cases and decision support during the consultation",
      points: [
        "Phenotype and history captured once, as data",
        "Referrals, follow-up and registry entries from the same record",
      ],
      ctaLabel: "For clinicians and hospitals",
      href: HOSPITAL_PATH,
      tone: "blue" as const,
    },
    {
      kicker: "Life sciences and industry",
      title: "Cohorts and natural history collected as care happens",
      points: [
        "Cohort discovery on structured fields, not chart review",
        "Multi-site studies on one standardised intake",
      ],
      ctaLabel: "For life sciences",
      href: PHARMA_PATH,
      tone: "teal" as const,
    },
    {
      kicker: "Government and public health",
      title: "Registries that fill from routine care",
      points: [
        "Hub-and-spoke registry aligned to national policy",
        "Patient tracking from primary care to Centre of Excellence",
      ],
      ctaLabel: "For public health",
      href: PUBLIC_HEALTH_PATH,
      tone: "blue" as const,
    },
    {
      kicker: "Investors and partners",
      title: "The data layer for a sector being formalised",
      points: [
        "National policy and a growing network of Centres of Excellence",
        "One platform serving clinical, industry, government and research demand",
      ],
      ctaLabel: "Explore the platform",
      href: PLATFORM_PATH,
      tone: "teal" as const,
    },
  ],
};

/**
 * 06 — Proof.
 *
 * The large filled card is the featured resource ticked "Show on the home
 * page", so its wording comes from the Resources page rather than from here;
 * only the fallbacks below stand in when nothing is ticked. The handoff put a
 * "3 weeks → 4 days" figure on that card, which is dropped: the same
 * before-and-after pair was already retired from the live card, and the study
 * behind it is unverified.
 */
export const HOME_V4_PROOF = {
  heading: "Where Genetico is in use",
  description: "Each deployment is run with the institution or programme that owns the data.",
  featuredFallback: {
    kicker: "Case study · AIIMS New Delhi",
    title: "Structured intake at a Centre of Excellence",
    blurb:
      "How structured phenotyping and decision support were introduced into an existing " +
      "genetics clinic.",
    ctaLabel: "Read the case study",
    href: RESOURCES_PATH,
  },
  network: {
    label: "Network",
    figure: "15",
    body: "Rare disease centres engaged, alongside AIIMS New Delhi and CDFD Hyderabad.",
  },
  cards: [
    {
      title: "Centres of Excellence",
      body: "Structured phenotyping and decision support in genetics clinics.",
      href: HOSPITAL_PATH,
      src: "/images/home/clinic-wide.webp",
      alt: "Genetics consultation at a Centre of Excellence",
      position: "52% 58%",
      tone: "primary" as const,
    },
    {
      title: "Natural history and cohorts",
      body: "Multi-site studies on one standardised intake.",
      href: PHARMA_PATH,
      src: "/images/home/research-team.webp",
      alt: "Research team reviewing a multi-site cohort",
      position: "55% 45%",
      tone: "teal" as const,
    },
    {
      title: "National rare disease registry",
      body: "A hub-and-spoke registry that fills from routine care.",
      href: PUBLIC_HEALTH_PATH,
      src: "/images/home/programme-briefing.webp",
      alt: "Programme team reviewing a registry dashboard",
      position: "60% 40%",
      tone: "deep" as const,
    },
  ],
};

/** 07 — Latest. The cards themselves come from the Resources collections. */
export const HOME_V4_LATEST = {
  heading: "Talks and coverage",
  ctaLabel: "All resources",
  ctaHref: RESOURCES_PATH,
};

/** 08 — Security. No named-framework claim, matching v3. */
export const HOME_V4_TRUST: HomeTrustContent = {
  heading: "Security and data governance",
  description:
    "Deployed within institutional infrastructure and governed by an agreement with each " +
    "hospital, laboratory or programme.",
  points: [
    "Your institution retains ownership and control of its data.",
    "Access is restricted based on user roles and responsibilities.",
    "Every action is securely logged for complete traceability.",
    "Data is protected through encryption in transit and at rest.",
    "Hosted on managed infrastructure with continuous monitoring.",
  ],
};

/** 09 — the enquiry form's heading and its four audience tabs. */
export const HOME_V4_CONTACT = {
  heading: "Work with Genetico",
  description:
    "Tell us who you are and we will route you to the clinical, programme, research or " +
    "partnerships team.",
};

export const HOME_V4_ROLE_ORDER = [
  "Clinician or Hospital",
  "Life Science or Industry",
  "Government or Public Health",
  "Investor",
];

export const HOME_V4_ROLE_DESCRIPTIONS: Record<string, string> = {
  "Clinician or Hospital":
    "Our medical team will walk through clinical workflows, integration with your systems and " +
    "a two-week pilot at your centre.",
  "Life Science or Industry":
    "We will show how structured intake, cohort discovery and research-ready export fit your " +
    "evidence pipeline.",
  "Government or Public Health":
    "We will take you through registry design, screening programmes, patient tracking and " +
    "programme-level analytics.",
  Investor:
    "We will share what has been built so far, the institutions we work with, and how Genetico " +
    "is positioned in the rare disease market.",
};

/**
 * The navigation this round proposes, applied over the CMS on this page only.
 *
 * Keyed by the href the CMS already stores, so a label the CMS renames still
 * lands on the right item. The other six pages keep About / Platform /
 * Solutions / Resources until this is approved.
 */
export const HOME_V4_NAV_LABELS: Record<string, string> = {
  [ABOUT_PATH]: "About Genetico",
  [PLATFORM_PATH]: "IndiGeneUs.AI",
  [RESOURCES_PATH]: "Resources",
};

export const HOME_V4_SOLUTIONS_LABEL = "Who we serve";

/**
 * The order the four items run in, which differs from the CMS's.
 *
 * "Who we serve" moves ahead of the platform link: this round leads with the
 * company and its audiences, so the product name should not be the second
 * thing in the bar. `dropdown` stands for whichever item is the dropdown,
 * since that one has no href of its own. Anything unlisted keeps its stored
 * order behind these.
 */
export const HOME_V4_NAV_ORDER = [ABOUT_PATH, "dropdown", PLATFORM_PATH, RESOURCES_PATH];

/** The dropdown under "Who we serve", and the footer column that mirrors it. */
export const HOME_V4_SOLUTIONS_NAV = [
  { label: "Clinicians, hospitals and CoEs", href: HOSPITAL_PATH },
  { label: "Life sciences and industry", href: PHARMA_PATH },
  { label: "Government and public health", href: PUBLIC_HEALTH_PATH },
  { label: "Investors and partners", href: PLATFORM_PATH },
];

export const HOME_V4_FOOTER_TAGLINE =
  "Genetico builds infrastructure for rare disease care in India, connecting clinical care, " +
  "research and public health. Its platform, IndiGeneUs.AI, is used by hospitals, laboratories, " +
  "research groups and national programmes.";
