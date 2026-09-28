import { HOSPITAL_PATH, PHARMA_PATH, PLATFORM_PATH, PUBLIC_HEALTH_PATH } from "@/lib/routes";
import type { HomeSectionMeta } from "@/lib/cms/home-content";

/**
 * Copy for the home page after the senior advisor's review, now the live home page.
 *
 * Like the earlier home previews this lives in code, so the page needed no
 * schema push to the live database. What the CMS already holds and
 * this round leaves alone is read from there instead: the platform's four
 * layers, the award count, the partner logos and the case study's link.
 *
 * Source: design_handoff_genetico_site/design_handoff_ar_pages/Home ar.dc.html.
 * The review's one rule is that Genetico is the company and IndiGeneUs.AI is
 * the platform; the copy is advisor-approved and is carried over verbatim,
 * except where noted below.
 */

/** In render order; the rail, the mobile menu and the section numbers follow it. */
export const HOME_AR_SECTIONS: HomeSectionMeta[] = [
  { id: "why", label: "Why Genetico", eyebrow: "Why Genetico exists" },
  { id: "does", label: "What we do", eyebrow: "What Genetico does" },
  { id: "platform", label: "IndiGeneUs.AI", eyebrow: "IndiGeneUs.AI" },
  { id: "serve", label: "Who we serve", eyebrow: "Who we serve" },
  { id: "impact", label: "Impact", eyebrow: "Impact" },
  { id: "ahead", label: "Where we're going", eyebrow: "Where we are going" },
  { id: "get-in-touch", label: "Next step", eyebrow: "Next step" },
];

export const HOME_AR_HERO = {
  eyebrow: "Genetico",
  headline: "Building the digital infrastructure for",
  headlineAccent: "rare and genetic disease care.",
  blurb:
    "Genetico is a health technology company developing digital solutions for the rare and " +
    "genetic disease ecosystem. The information behind a single diagnosis sits with clinicians, " +
    "hospitals, laboratories and programmes that rarely connect. We build what connects them.",
  primaryCta: { label: "Why Genetico exists", target: "why" },
  secondaryCta: { label: "Meet IndiGeneUs.AI", target: "platform" },
  marqueeLabel: "Built with",
  /* The institutions and programmes behind the work, as the review names them.
     Approved for these pages on 2026-09-28. */
  marquee: [
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

/** 01 — the five places one patient's information is held, then the scale behind it. */
export const HOME_AR_WHY = {
  heading: "Rare diseases are complex. The systems supporting them shouldn’t be.",
  description:
    "The information about one patient is held by many parties, in different formats, and is " +
    "rarely brought together.",
  holders: [
    {
      title: "Clinicians",
      body: "Examination findings and history, mostly written as free text.",
      format: "Clinical notes",
    },
    {
      title: "Hospitals",
      body: "Admissions, imaging and reports held in separate departmental systems.",
      format: "Departmental systems",
    },
    {
      title: "Laboratories",
      body: "Genetic and biochemical results issued as documents, not data.",
      format: "PDF reports",
    },
    {
      title: "Research programmes",
      body: "Study data collected again, separately, for each project.",
      format: "Study databases",
    },
    {
      title: "Public-health systems",
      body: "Programme returns compiled by hand from centre records.",
      format: "Manual returns",
    },
  ],
  closing:
    "None of these connect by default. Diagnosis takes longer, follow-up starts again at each " +
    "centre, and research and planning work without reliable data. Genetico exists to change that.",
  /*
   * The handoff itself marks these figures "to be confirmed with final sources
   * before publication". Shown with that note on this preview, as agreed on
   * 2026-09-28; they must not reach the live page unconfirmed.
   *
   * The dot grid draws the "~80% are genetic in origin" figure. If that figure
   * changes, `filled` has to change with it.
   */
  dotGrid: {
    filled: 80,
    caption: "Each dot is one in a hundred rare diseases. Filled dots are genetic in origin.",
  },
  facts: [
    { figure: "7,000+", label: "rare diseases described worldwide" },
    { figure: "~80%", label: "are genetic in origin" },
    { figure: "~50%", label: "first present in childhood" },
    { figure: "~70M", label: "people in India estimated to live with a rare disease" },
  ],
  factsNote:
    "Figures drawn from India's National Policy for Rare Diseases (2021) and published " +
    "literature. To be confirmed with final sources before publication.",
};

/** 02 — the dark band: five areas drawing on one structured record. */
export const HOME_AR_DOES = {
  heading: "Connecting information. Enabling better decisions.",
  description:
    "Genetico works across five connected areas. Each draws on the same structured information, " +
    "so what is recorded once can serve care, research and planning.",
  areas: [
    {
      title: "Clinical care",
      body: "Structured consultations and decision support in genetics and rare disease clinics.",
    },
    {
      title: "Longitudinal care",
      body:
        "One record per patient across visits, laboratories and centres, so follow-up builds on " +
        "history.",
    },
    {
      title: "Research and life sciences",
      body: "Research-ready data and cohort discovery drawn from routine clinical care.",
    },
    {
      title: "Registries and programmes",
      body: "Registry entries and programme reporting produced by the clinical workflow itself.",
    },
    {
      title: "Public health",
      body: "Population-level insight for planning national and state rare disease programmes.",
    },
  ],
};

/** 03 — the company/platform line, the sample case, and the four layers (from the CMS). */
export const HOME_AR_PLATFORM = {
  heading: "Genetico is the company. IndiGeneUs.AI is the platform.",
  body:
    "IndiGeneUs.AI is Genetico's AI-enabled platform for connecting clinical data, decision " +
    "support, longitudinal information and analytics. It structures the workflow at the point " +
    "of care and keeps the record computable from that moment on.",
  demoNote:
    "Alongside: a free-text clinical note, turned into structured phenotype, growth and ranked " +
    "differentials.",
  demoTag: "Sample case",
  ctaLabel: "See how the platform works",
  ctaHref: PLATFORM_PATH,
  layersHeading: "What it can do",
  layersLabel: "One workflow · four layers",
};

/** 04 — one photo card per audience, each leading to its solution page. */
export const HOME_AR_SERVE = {
  heading: "Clinicians, researchers and public-health programmes",
  description:
    "Each works with the same structured information, for a different purpose. Choose yours to " +
    "see what changes.",
  doors: [
    {
      kicker: "Clinicians & Hospitals",
      title: "Clinical workflows and longitudinal care",
      body:
        "Structured consultations, decision support and one patient record that carries across " +
        "visits, departments and centres.",
      ctaLabel: "For clinicians & hospitals",
      href: HOSPITAL_PATH,
      photo: {
        src: "/images/audience/clinic-consultation.webp",
        position: "60% 40%",
        alt: "Clinician reviewing a genomic case with a patient",
      },
    },
    {
      kicker: "Life Sciences & Research",
      title: "Structured data for research and evidence",
      body:
        "Cohort discovery and natural history drawn from routine care, on standardised data from " +
        "multiple sites.",
      ctaLabel: "For life sciences & research",
      href: PHARMA_PATH,
      photo: {
        src: "/images/audience/research-team.webp",
        position: "55% 45%",
        alt: "Research team reviewing a multi-site cohort",
      },
    },
    {
      kicker: "Government & Public Health",
      title: "Registries, programmes and population insight",
      body:
        "Registries that fill from routine care, and programme tracking from primary care to " +
        "Centres of Excellence.",
      ctaLabel: "For government & public health",
      href: PUBLIC_HEALTH_PATH,
      photo: {
        src: "/images/audience/programme-briefing.webp",
        position: "60% 40%",
        alt: "Programme team reviewing a registry dashboard",
      },
    },
  ],
};

/**
 * 05 — three figures, the AIIMS case study, and the institutions strip.
 *
 * The third figure is counted from the CMS awards, so it stays true as awards
 * are added. The case study links to the featured resource but keeps its own
 * wording: the handoff puts "3 weeks → 4 days" on this card, and the featured
 * video's CMS title carries the same claim, which was dropped on 2026-09-23
 * and kept dropped for this round on 2026-09-28. The blurb's "Results depend
 * on case mix" qualified that figure and goes with it.
 */
export const HOME_AR_IMPACT = {
  heading: "Already in clinical use",
  description: "Where Genetico is deployed today, who it works with, and what has changed.",
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
  caseStudy: {
    kicker: "Case study · AIIMS New Delhi",
    title: "Structured genomic workflows at a Centre of Excellence",
    blurb:
      "Structured genomic workflows and cross-department collaboration at one of India's " +
      "largest referral hospitals.",
    ctaLabel: "Watch the case study",
    photo: {
      src: "/images/home/doc-corridor.webp",
      alt: "Clinician in a hospital corridor",
    },
  },
  logosLabel: "Institutions and programmes we work with",
  logos: [
    "AIIMS Delhi",
    "CDFD",
    "SGRH",
    "BIRAC",
    "TPG",
    "BGCI",
    "Manovikas",
    "GHRC",
    "MeitY Startup Hub",
    "Catalyst",
  ],
  resourcesLabel: "Case studies, films and media coverage",
};

/** 06 — the dark band: three stages from solutions to infrastructure. */
export const HOME_AR_AHEAD = {
  heading: "From digital solutions to connected infrastructure",
  description:
    "Every solution Genetico deploys — in a clinic, a study or a programme — runs on the same " +
    "structured record. Together, they add up to shared infrastructure.",
  stages: [
    {
      when: "In use",
      title: "Digital solutions",
      body:
        "Structured consultations, research intake and registry tools — each deployed with a " +
        "specific clinic, study or programme.",
    },
    {
      when: "Connecting",
      title: "One platform underneath",
      body:
        "IndiGeneUs.AI gives every deployment the same record and standards, so information " +
        "moves between them without re-entry.",
    },
    {
      when: "Direction",
      title: "Connected infrastructure",
      body:
        "A shared digital layer for the rare and genetic disease ecosystem, serving care, " +
        "research and public health across India.",
    },
  ],
  footnote: "A direction of travel, not dated commitments.",
};

/**
 * 07 — two groups of routes into the form. Choosing one selects its tab and
 * brings the form into view.
 *
 * The handoff closes the second group with "Or book a 30-minute call directly",
 * a Calendly link. Calendly was taken off the site, so that line is left out
 * rather than pointed somewhere its wording does not describe.
 */
export const HOME_AR_NEXT = {
  heading: "Where would you like to start?",
  description:
    "Choose the route that fits you. We will pass your request to the team that handles it.",
  groups: [
    {
      label: "Work with the platform",
      routes: [
        {
          label: "For clinicians & hospitals",
          title: "See the clinical workflow",
          body: "A walkthrough of consultations, decision support and follow-up with our medical team.",
          role: "Clinician or Hospital",
        },
        {
          label: "For life sciences & research",
          title: "Discuss a research collaboration",
          body: "Cohorts, natural history and research-ready data from routine care.",
          role: "Life Science or Research",
        },
        {
          label: "For government & public health",
          title: "Discuss a programme",
          body: "Registries, screening and programme tracking aligned to national policy.",
          role: "Government or Public Health",
        },
      ],
    },
    {
      label: "Build with Genetico",
      routes: [
        {
          label: "Partner with Genetico",
          title: "Explore a strategic partnership",
          body: "For institutions, technology and industry partners working in rare disease.",
          role: "Strategic partner",
        },
        {
          label: "For investors",
          title: "Request investor information",
          body: "What we have built, where it is deployed and where it is going.",
          role: "Investor",
        },
      ],
    },
  ],
};
