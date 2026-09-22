import {
  ABOUT_PATH,
  HOSPITAL_PATH,
  PHARMA_PATH,
  PLATFORM_PATH,
  PUBLIC_HEALTH_PATH,
} from "@/lib/routes";
import type {
  HomeContactContent,
  HomeCta,
  HomeDoor,
  HomeFaqContent,
  HomeSectionMeta,
  HomeTrustContent,
} from "@/lib/cms/home-content";

/**
 * Copy for the third pass at the home page, previewed at /home-v3.
 *
 * Like `home-v2.ts` this lives in code rather than the CMS: an unapproved
 * experiment should cause no schema push to the live database, and nothing
 * here should be reachable by an editor until it is the home page.
 *
 * Source: design_handoff_genetico_site/handoff_home_v3/Home.dc.html. That
 * round was driven by a review that the page read as AI-written, so almost
 * all of it is copy: the rhetorical couplets that opened every section are
 * gone, the hero answers "what is Genetico?" in its first sentence and names
 * IndiGeneUs.AI up front, the second-person coaching is out, and the
 * pitch-deck section labels ("The problem", "Proof", "Engage") are replaced
 * by plain descriptive ones.
 */

/**
 * In render order; the rail, the mobile menu and the section numbers follow it.
 *
 * `rail: false` keeps FAQs and the contact form out of the rail's pills while
 * they keep their numbers and their place in the mobile menu — they are where
 * you go once the argument has landed, not steps in it, and including them
 * pushes the pills into a sideways scroll that reads as a broken control.
 *
 * Section 01's rail label is shortened from its eyebrow for the same reason:
 * "Rare disease in India" is the longest label on the page and the seven pills
 * do not fit a 900px viewport with it spelled out.
 */
export const HOME_V3_SECTIONS: HomeSectionMeta[] = [
  { id: "problem", label: "Rare disease", eyebrow: "Rare disease in India" },
  { id: "shift", label: "Our approach", eyebrow: "Our approach" },
  { id: "how", label: "In practice", eyebrow: "In practice" },
  { id: "platform", label: "Platform", eyebrow: "The platform" },
  { id: "who", label: "Who we work with", eyebrow: "Who we work with" },
  { id: "proof", label: "Evidence", eyebrow: "Evidence" },
  { id: "trust", label: "Security", eyebrow: "Security and governance" },
  { id: "faqs", label: "FAQs", eyebrow: "FAQs", rail: false },
  { id: "get-in-touch", label: "Contact", eyebrow: "Contact", rail: false },
];

export const HOME_V3_HERO = {
  eyebrow: "Genetico · clinical genomics infrastructure",
  /* A plain declarative definition rather than a positioning line — and it
     says India, which is the part a first-time visitor needs soonest. */
  headline: "Clinical data infrastructure for rare and genetic disease",
  headlineAccent: "in India.",
  /* Names IndiGeneUs.AI here rather than withholding it until section 04,
     which v2 did and the review found evasive. */
  blurb:
    "Genetico builds the systems hospitals, diagnostic labs, research groups and national " +
    "programmes use to record, exchange and act on genetic disease data. Our platform, " +
    "IndiGeneUs.AI, is in use at Centres of Excellence in India.",
  primaryCta: { label: "The problem we work on", target: "problem" },
  secondaryCta: { label: "How the platform works", target: "how" },
  scopeLabel: "Connected across",
  scope: ["Clinical care", "Diagnostics", "Research", "Registries", "Public health"],
  marqueeLabel: "Working with",
};

/**
 * The wide photograph between the hero and section 01.
 *
 * New in this round: the review's second complaint was that the page was
 * wall-to-wall text, and this is the break before the argument starts.
 */
export const HOME_V3_OPENING_BAND = {
  src: "/images/home/clinic-wide.webp",
  alt: "A genetics consultation at a Centre of Excellence",
  /** What survives the crop; mirrors the handoff's `object-position`. */
  position: "52% 58%",
  caption: "Centre of Excellence · genetics clinic",
};

export const HOME_V3_PROBLEM = {
  heading: "Why a diagnosis still takes years",
  description:
    "An estimated 70 million Indians live with a rare disease. Around 80% are genetic in " +
    "origin and about half present in childhood. The limiting factor is rarely the science: " +
    "the clinical information needed to reach a diagnosis is never assembled in a usable form.",
  /* Titles now state a fact rather than a benefit, and each body carries one
     mechanism instead of restating the heading. */
  tiles: [
    {
      title: "Every referral starts from a blank page",
      body:
        "A family moves between specialists, and each one re-describes the same history. " +
        "Earlier phenotyping, imaging and lab work is repeated or lost, so the sequence of " +
        "findings that would point to a diagnosis is never assembled.",
    },
    {
      title: "Notes are written to be read, not queried",
      body:
        "Phenotype, family history, growth and lab results sit in prose, scanned reports and " +
        "PDFs. In that form nothing can be searched, compared across patients or checked " +
        "against a gene panel.",
    },
    {
      title: "One patient, several unlinked records",
      body:
        "Hospitals, diagnostic labs and programmes each hold a fragment under a different " +
        "identifier. Nothing accumulates across visits, so continuity depends on what the " +
        "family carries with them.",
    },
    {
      title: "Research and policy inherit the gap",
      body:
        "Without structured clinical data there are no cohorts to recruit from, no natural " +
        "history to model and no registry to plan against. National figures remain estimates.",
    },
  ],
  /*
   * The dot grid is the "~80% are genetic in origin" figure drawn rather than
   * stated. If that figure changes, `filled` has to change with it.
   *
   * Open item, carried over from v2: the client is to confirm or replace all
   * four figures, and the footnote goes once they are sourced. Shown as
   * designed so the preview can be reviewed; do not ship them unconfirmed.
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

export const HOME_V3_SHIFT = {
  heading: "Four changes that only work together",
  description:
    "Each depends on the one before it. That is why they are built as a single system rather " +
    "than four products sold separately.",
  shifts: [
    { from: "Free-text notes", to: "Computable clinical records" },
    { from: "Isolated hospital episodes", to: "One longitudinal patient record" },
    { from: "Centres that cannot see each other", to: "A connected network of centres" },
    { from: "Anecdote and estimates", to: "Registry-grade national evidence" },
  ],
};

/**
 * 03 carries new information in this round. In v2 it restated the same
 * structure-the-record thesis as 01 and 02 — three consecutive sections
 * saying one thing. It now covers deployment, standards and who the work is
 * operated with.
 *
 * Open item from the handoff: **the standards list needs confirming against
 * what is actually implemented.**
 */
export const HOME_V3_HOW = {
  heading: "How this is built in practice",
  description: "Genetico works inside existing institutions rather than around them.",
  pillars: [
    {
      title: "Deployed inside the existing clinic",
      body:
        "The platform sits alongside hospital systems and is used during the consultation " +
        "itself. Clinicians enter what they already record; the difference is that it is " +
        "captured as structured fields rather than prose.",
    },
    {
      title: "Standards, not a closed database",
      body:
        "Phenotype in HPO, diagnoses in ORPHA and OMIM, variants in HGVS, exchange over FHIR. " +
        "Institutions keep ownership of their records and can take them elsewhere.",
    },
    {
      title: "Operated with institutions and programmes",
      body:
        "We work with Centres of Excellence, diagnostic laboratories and national rare disease " +
        "programmes, so the registry that results reflects how care is actually delivered and " +
        "funded.",
    },
  ],
};

/** Which mock-up a layer card frames; see `components/home-v3/mockups.tsx`. */
export type HomeV3Mockup = "intake" | "rapid" | "timeline" | "registry";

export const HOME_V3_PLATFORM = {
  heading: "IndiGeneUs.AI, the clinical genetics platform",
  body:
    "Genetico is the company: the institutional partnerships, registry work and evidence base. " +
    "IndiGeneUs.AI is the software through which that work runs — an AI-assisted clinical " +
    "genetics system that structures the case during the consultation and keeps the record " +
    "computable from that point on.",
  callout:
    "Below is a free-text note of the kind a genetics clinic produces. Run the extraction to " +
    "see what the platform records.",
  cta: { label: "Read about the platform", href: PLATFORM_PATH } satisfies HomeCta,
  layersHeading: "What the platform does",
  /*
   * The four panels are hand-built DOM, not product captures, and every figure
   * in them is invented. Keep this label and the per-panel tags until real
   * screenshots replace them — the handoff is explicit that a fabricated
   * screenshot in a credibility section is worse than none.
   */
  layersLabel: "Illustrative interfaces · sample data",
  layers: [
    {
      mockup: "intake" as HomeV3Mockup,
      title: "Capture",
      body:
        "Structured intake at the point of care — phenotype, history and documents converted " +
        "into computable fields instead of free text.",
      tag: "Intelligent data capture",
    },
    {
      mockup: "rapid" as HomeV3Mockup,
      title: "Decide",
      body:
        "Clinical decision support surfaces ranked differentials with the evidence behind each " +
        "one, inside the existing workflow.",
      tag: "CDSS",
    },
    {
      mockup: "timeline" as HomeV3Mockup,
      title: "Connect",
      body:
        "One longitudinal record per patient across visits, departments, labs and centres — no " +
        "re-entry, no duplication.",
      tag: "Longitudinal record",
    },
    {
      mockup: "registry" as HomeV3Mockup,
      title: "Analyse",
      body:
        "Cohorts, registries and programme dashboards built from the same structured data the " +
        "clinic already produced.",
      tag: "Registry & analytics",
    },
  ],
};

/** A door card's photo band. Cropped to a 150px strip, so the crop matters. */
export type HomeV3DoorPhoto = {
  src: string;
  /** What survives the crop; mirrors the handoff's `object-position`. */
  position: string;
  /** The tint behind the photo, and what shows if it is ever missing. */
  ground: string;
  alt: string;
};

export type HomeV3Door = HomeDoor & { photo: HomeV3DoorPhoto };

export const HOME_V3_WHO = {
  heading: "Four users, one underlying record",
  description: "Clinical, industry, government and investor views of the same infrastructure.",
  /*
   * Rewritten again this round: v2's cards opened on the reader ("What
   * changes in your clinic:"), which the review read as coaching. Each title
   * now states what the platform does for that audience, and the blurb gives
   * the mechanism.
   */
  doors: [
    {
      kicker: "Hospitals, clinicians & CoEs",
      title: "Cases structured during the consultation",
      blurb:
        "The case is phenotyped and scored while the patient is in the room, so decision " +
        "support works on what was just recorded rather than on a chart review weeks later.",
      points: [
        "Phenotype, growth and history captured once, as data",
        "Ranked differentials with the evidence behind each one",
        "Referrals, follow-up and registry entries from the same record",
      ],
      ctaLabel: "For hospitals and clinicians",
      href: HOSPITAL_PATH,
      photo: {
        src: "/images/audience/clinic-consultation.webp",
        position: "60% 40%",
        ground: "#EDF3F9",
        alt: "A clinician reviewing a genomic case with a patient",
      },
    },
    {
      kicker: "Industry & life sciences",
      title: "Cohorts and natural history collected prospectively",
      blurb:
        "Cohorts become findable on structured fields, and natural history accrues as care " +
        "happens instead of being reconstructed from charts at the end of a study.",
      points: [
        "Cohort discovery on structured fields, not chart review",
        "Multi-site studies on one standardised intake",
        "Research-ready export with a full audit trail",
      ],
      ctaLabel: "For life sciences",
      href: PHARMA_PATH,
      photo: {
        src: "/images/audience/research-team.webp",
        position: "55% 45%",
        ground: "#EDF6F3",
        alt: "A research team reviewing a multi-site cohort",
      },
    },
    {
      kicker: "Government & public health",
      title: "Registries that fill from routine care",
      blurb:
        "Registry entry and patient tracking come out of the clinical workflow, so a programme " +
        "can be monitored continuously rather than through periodic returns from centres.",
      points: [
        "Hub-and-spoke registry aligned to national policy",
        "Screening and patient tracking from PHC to CoE",
        "Population-level intelligence, updated as care happens",
      ],
      ctaLabel: "For public health",
      href: PUBLIC_HEALTH_PATH,
      photo: {
        src: "/images/audience/programme-briefing.webp",
        position: "60% 40%",
        ground: "#F1F4F7",
        alt: "A programme team reviewing a national registry dashboard",
      },
    },
    {
      kicker: "Investors & partners",
      title: "The data layer under a market being formalised",
      blurb:
        "Rare disease care in India is being organised through national policy and a growing " +
        "network of Centres of Excellence. None of it operates without a shared clinical data " +
        "layer.",
      points: [
        "An estimated 70M people in India; 15 rare disease centres engaged",
        "Built with AIIMS Delhi, CDFD and national programmes",
        "One data layer serving clinical, industry, government and research demand",
      ],
      ctaLabel: "About Genetico",
      href: ABOUT_PATH,
      photo: {
        src: "/images/audience/institution-team.webp",
        position: "50% 45%",
        ground: "#F6F3EC",
        alt: "The Genetico team working with partner institutions",
      },
    },
  ] satisfies HomeV3Door[],
};

/** 06 keeps the CMS's case study and clips; only the section heading changes. */
export const HOME_V3_PROOF_HEADING = "In use with institutions and programmes";

/**
 * 07 is rewritten to make no named-framework claim — no ISO, no DPDP.
 * Deliberate, pending confirmation of what actually holds; "full ownership"
 * and "enterprise-grade infrastructure" go for the same reason.
 */
export const HOME_V3_TRUST: HomeTrustContent = {
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

export const HOME_V3_FAQS: HomeFaqContent = {
  heading: "Frequently asked questions",
  description: "What Genetico is, what IndiGeneUs.AI does, and how the two relate.",
  items: [
    {
      question: "What does Genetico do?",
      answer:
        "Genetico builds the clinical data infrastructure for rare and genetic disease in " +
        "India. We structure clinical information at the point of care and connect the " +
        "institutions that depend on it — hospitals, diagnostic laboratories, research groups, " +
        "registries and public health programmes — so that one patient record can serve care, " +
        "evidence and policy.",
    },
    {
      question: "How are Genetico and IndiGeneUs.AI related?",
      answer:
        "Genetico is the company: institutional partnerships, registry work, policy alignment " +
        "and evidence. IndiGeneUs.AI is the platform we build, and the system through which " +
        "that work is delivered in a hospital.",
    },
    {
      question: "Why start with the clinical workflow?",
      answer:
        "Because that is where the data is created. If the record is unstructured when it is " +
        "written, everything downstream — decision support, cohorts, registries, national " +
        "analytics — has to be reconstructed by hand, usually years later and at far greater " +
        "cost.",
    },
    {
      question: "Who is Genetico built for?",
      answer:
        "Hospitals, clinicians and Centres of Excellence; life science and biotech research " +
        "teams; government and public health programmes running national rare disease " +
        "initiatives; and investors and partners backing the infrastructure layer.",
    },
    {
      question: "Can it work alongside our existing systems?",
      answer:
        "Yes. IndiGeneUs.AI is designed to sit alongside existing hospital systems and exchange " +
        "data using standard clinical vocabularies and interfaces, so it complements rather " +
        "than replaces your infrastructure.",
    },
  ],
};

/** 09 — "Building the future of rare disease intelligence together" is retired. */
export const HOME_V3_CONTACT: Pick<HomeContactContent, "heading" | "description"> = {
  heading: "Get in touch",
  description:
    "Tell us who you are and we will route you to the clinical, programme, research or " +
    "partnerships team.",
};

/**
 * All four enquiry tabs are reworded this round, so they are passed as
 * `roleDescriptions` rather than edited in the CMS — that form is shared with
 * every other page on the site.
 */
export const HOME_V3_ROLE_DESCRIPTIONS: Record<string, string> = {
  "Clinician or Hospital":
    "Our medical team will walk through clinical workflows, integration with your systems and " +
    "a two-week pilot at your centre.",
  "Government or Public Health":
    "We will take you through registry design, screening programmes, patient tracking and " +
    "programme-level analytics.",
  "Life Science or Industry":
    "We will show how structured intake, cohort discovery and research-ready export fit your " +
    "evidence pipeline.",
  Investor:
    "We will share what has been built so far, the institutions we work with, and how Genetico " +
    "is positioned in the rare disease market.",
};

/**
 * The footer blurb, applied on this page only. Unlike v2, this round leaves
 * the navigation names alone: the handoff restores About / Platform /
 * Solutions / Resources, which is what the CMS already holds.
 */
export const HOME_V3_FOOTER_TAGLINE =
  "Genetico builds clinical data infrastructure for rare and genetic disease in India. Our " +
  "platform, IndiGeneUs.AI, is used by hospitals, diagnostic labs, research groups and " +
  "national rare disease programmes.";
