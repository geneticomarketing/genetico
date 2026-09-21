import { ABOUT_PATH, HOSPITAL_PATH, PHARMA_PATH, PUBLIC_HEALTH_PATH } from "@/lib/routes";
import type { HomeDoor, HomeFaqContent, HomeSectionMeta } from "@/lib/cms/home-content";

/**
 * Copy for the narrative rework of the home page, previewed at /home-v2.
 *
 * This lives in code while the rework is up for approval. Everything the live
 * home page already holds in the CMS and the rework leaves alone — the
 * credentials marquee, the four platform layers, proof, security and the
 * contact form — is read from there; only the copy the rework adds or rewrites
 * sits here. When v2 replaces the home page, this moves into the home globals.
 *
 * Source: design_handoff_genetico_site/homepage v2 changes/Home.dc.html —
 * the second advisor pass, which rewrote the first screen and section 05.
 */

/**
 * In render order; the rail, the mobile menu and the section numbers follow it.
 *
 * The rail carries the seven narrative steps only. FAQs and the contact form
 * are where you go once the argument has landed, not steps in it, and with
 * them the pills outgrew the bar and scrolled sideways — which read as a
 * broken control. Both keep their numbers and their place in the mobile menu.
 */
export const HOME_V2_SECTIONS: HomeSectionMeta[] = [
  { id: "problem", label: "The problem", eyebrow: "The problem" },
  { id: "shift", label: "What we build", eyebrow: "What we are building" },
  { id: "how", label: "How it works", eyebrow: "How it works" },
  { id: "platform", label: "IndiGeneUs.AI", eyebrow: "The platform" },
  // Shortened for the rail; the section's own eyebrow keeps the full phrase.
  { id: "who", label: "Why it matters", eyebrow: "Why it matters to you" },
  { id: "proof", label: "Proof", eyebrow: "Proof" },
  { id: "trust", label: "Security", eyebrow: "Security & Compliance" },
  { id: "faqs", label: "FAQs", eyebrow: "FAQs", rail: false },
  { id: "get-in-touch", label: "Engage", eyebrow: "Engage", rail: false },
];

export const HOME_V2_HERO = {
  /* The eyebrow carries the category, which leaves the headline free to be a
     plain sentence rather than a positioning line. */
  eyebrow: "Genetico · Health data infrastructure",
  headline:
    "Genetico connects rare and genetic disease care, diagnostics, research and public health",
  headlineAccent: "on one shared record.",
  /* The "why should I care" argument, in three beats: scale, consequence, and
     the cause that is ours to fix. Tightened from the handoff's draft at the
     client's request — all three beats survive, so it is still an argument
     rather than the slogan the handoff warned against. The closing clause can
     be short because the headline above has already said what we do. */
  blurb:
    "An estimated 70 million people in India live with a rare disease. An answer can take " +
    "years — rarely for want of science, but because the findings that explain a case never " +
    "come together. That is what we connect.",
  primaryCta: { label: "Why this matters", target: "problem" },
  /* IndiGeneUs.AI is deliberately not named in the hero; it is introduced in
     section 04, where there is room to explain it. */
  secondaryCta: { label: "What we are building", target: "how" },
  scopeLabel: "The ecosystem we connect",
  scope: ["Clinical care", "Diagnostics", "Research", "Registries", "Public health"],
  marqueeLabel: "Built with",
};

export const HOME_V2_PROBLEM = {
  heading: "A rare disease is rare. The problem is not.",
  description:
    "Most of the delay in rare disease care is not scientific. It is informational — the right " +
    "facts exist, but not in a form anyone or any system can use.",
  tiles: [
    {
      title: "The answer takes years, not weeks",
      body:
        "A family moves between specialists, each starting from a blank page. The findings that " +
        "together point to a diagnosis are never in one place at one time.",
    },
    {
      title: "The record is written to be read, not computed",
      body:
        "Phenotype, history, growth and lab results live in free text, scans and PDFs — so they " +
        "cannot be searched, compared or aggregated by anyone.",
    },
    {
      title: "Centres cannot see each other",
      body:
        "The same patient exists as several unlinked records across hospitals, labs and " +
        "programmes. Nothing accumulates; every visit is a fresh start.",
    },
    {
      title: "Research and policy inherit the gap",
      body:
        "Without structured data there are no cohorts, no natural history, no registry and no " +
        "national picture — so evidence and funding stay guesswork.",
    },
  ],
  /*
   * Open item in the handoff: the client is to confirm or replace these four
   * figures, and the footnote goes once they are sourced. Shown as designed so
   * the preview can be reviewed; do not ship them to the live page unconfirmed.
   */
  /*
   * The dot grid is the "~80% are genetic in origin" figure drawn rather than
   * stated. If that figure changes, `filled` has to change with it.
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

export const HOME_V2_SHIFT = {
  heading: "From notes that describe a patient to data that can act for them",
  description:
    "Four shifts. Each one is a prerequisite for the next — which is why they have to be built " +
    "as one system, not four products.",
  shifts: [
    { from: "Free-text notes", to: "Computable clinical records" },
    { from: "Isolated hospital episodes", to: "One longitudinal patient record" },
    { from: "Centres that cannot see each other", to: "A connected network of centres" },
    { from: "Anecdote and estimates", to: "Registry-grade national evidence" },
  ],
};

export const HOME_V2_HOW = {
  heading: "Fix the record first. Everything else follows.",
  description:
    "Genetico works at three levels — and in that order, because none of them work without the " +
    "one before.",
  pillars: [
    {
      title: "Structure at the point of care",
      body:
        "Data is captured as structured fields during the consultation — not retro-coded months " +
        "later. The clinician works faster, and the record is computable from the moment it is " +
        "written.",
    },
    {
      title: "Connect the ecosystem",
      body:
        "One patient, one longitudinal record — across visits, departments, labs, centres and " +
        "national programmes, using standard clinical vocabularies so systems can exchange it.",
    },
    {
      title: "Build intelligence on top",
      body:
        "Because the underlying data is structured, the same record can support decisions at the " +
        "bedside, cohorts for research and analytics for a national programme.",
    },
  ],
};

export const HOME_V2_PLATFORM = {
  heading: "IndiGeneUs.AI is how the backbone is built",
  body:
    "Genetico is the company and the ecosystem work: institutions, registries, policy, evidence. " +
    "IndiGeneUs.AI is the platform that makes it operational — an AI-enabled clinical genetics " +
    "system that structures the workflow at the point of care and keeps the record computable " +
    "from that moment on.",
  callout:
    "Try it yourself — a real free-text clinical note, turned into structured phenotype, growth " +
    "and ranked differentials.",
  layersHeading: "What it can do",
  layersLabel: "One workflow · four layers",
};

/** A door card's photo band. Cropped to a 150px strip, so the crop matters. */
export type HomeV2DoorPhoto = {
  src: string;
  /** What survives the crop; mirrors the handoff's `object-position`. */
  position: string;
  /** The tint behind the photo, and what shows if it is ever missing. */
  ground: string;
  alt: string;
};

export type HomeV2Door = HomeDoor & { photo: HomeV2DoorPhoto };

export const HOME_V2_WHO = {
  heading: "One record. Four very different reasons to care.",
  description:
    "What changes in your clinic, your study, your programme or your portfolio. Pick the one " +
    "that describes you.",
  /*
   * All four doors are rewritten by the rework: each opens with the audience,
   * then the payoff, then the mechanics — "why Genetico matters to me" in that
   * audience's own terms. The live home page's three doors are left in the CMS
   * untouched, so this preview cannot change what is already published.
   */
  doors: [
    {
      kicker: "Clinicians, hospitals & CoEs",
      title: "Earlier answers, less time on paperwork",
      blurb:
        "What changes in your clinic: the case is structured while you see the patient, and the " +
        "decision support works on what you just captured.",
      points: [
        "Phenotype, growth and history captured once, as data",
        "Ranked differentials with the evidence behind each one",
        "Referrals, follow-up and registry entries from the same record",
      ],
      ctaLabel: "See it in the clinic",
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
      title: "Real-world data you can actually study",
      blurb:
        "What changes for your programmes: cohorts become findable, and natural history is " +
        "collected prospectively instead of reconstructed from charts.",
      points: [
        "Cohort discovery on structured fields, not chart review",
        "Multi-site studies on one standardised intake",
        "Research-ready export with a full audit trail",
      ],
      ctaLabel: "See the research view",
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
      title: "A live view of the national programme",
      blurb:
        "What changes for a programme: registries fill themselves from routine care, so patients " +
        "and centres can be tracked continuously rather than through periodic returns.",
      points: [
        "Hub-and-spoke registry aligned to national policy",
        "Screening and patient tracking from PHC to CoE",
        "Population-level intelligence, updated as care happens",
      ],
      ctaLabel: "See the programme view",
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
      title: "Infrastructure for a market being formalised",
      blurb:
        "Why now: rare disease care in India is being organised through national policy and a " +
        "growing centre network — and none of it runs without a shared data layer.",
      points: [
        "An estimated 70M people in India; 15 rare disease centres engaged",
        "Built with AIIMS Delhi, CDFD and national programmes",
        "One data layer serving clinical, industry, government and research demand",
      ],
      ctaLabel: "Read the Genetico story",
      href: ABOUT_PATH,
      photo: {
        src: "/images/audience/institution-team.webp",
        position: "50% 45%",
        ground: "#F6F3EC",
        alt: "The Genetico team working with partner institutions",
      },
    },
  ] satisfies HomeV2Door[],
};

export const HOME_V2_FAQS: HomeFaqContent = {
  heading: "Frequently asked questions",
  description: "Genetico, IndiGeneUs.AI, and how the two fit together.",
  items: [
    {
      question: "What does Genetico do?",
      answer:
        "Genetico connects the rare and genetic disease ecosystem. We turn fragmented clinical " +
        "information into structured, interoperable data and link the people who need it — " +
        "clinicians, diagnostic labs, researchers, registries and public-health programmes — so " +
        "the same patient record can serve care, evidence and policy.",
    },
    {
      question: "How are Genetico and IndiGeneUs.AI related?",
      answer:
        "Genetico is the company and the ecosystem work: partnerships with institutions, " +
        "registries, policy alignment and evidence. IndiGeneUs.AI is the platform we build — the " +
        "AI-enabled clinical genetics system through which that work actually runs.",
    },
    {
      question: "Why start with the clinical workflow?",
      answer:
        "Because that is where the data is created. If the record is unstructured at the point of " +
        "care, everything downstream — decision support, cohorts, registries, national analytics " +
        "— has to be reconstructed by hand. Fix capture, and the rest becomes possible.",
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
        "data using standard clinical vocabularies and interfaces, so it complements rather than " +
        "replaces your infrastructure.",
    },
  ],
};

/**
 * "The digital backbone for rare disease diagnosis" was retired by the second
 * advisor pass as narrower than the story the page now tells. These two
 * strings are the remaining instances the preview can reach: the footer blurb
 * (CMS) and the investor tab of the contact form (a shared component). Both
 * are overridden on this page only — the live pages keep their wording until
 * the rework is approved.
 */
export const HOME_V2_FOOTER_TAGLINE =
  "Genetico connects the rare and genetic disease ecosystem — clinical care, diagnostics, " +
  "research, registries and public-health programmes — on one structured record, built through " +
  "IndiGeneUs.AI.";

export const HOME_V2_INVESTOR_TAB_BLURB =
  "We'll share the scale of the opportunity, what we have built, and how Genetico is " +
  "positioned across the rare and genetic disease ecosystem.";

/**
 * The rework's navigation names, keyed by destination. Applied to the CMS
 * navigation and footer on this page only; the handoff lists rolling them out
 * across the site as a separate open item.
 */
export const HOME_V2_NAV_LABELS: Record<string, string> = {
  "/about-us": "Our Story",
  "/platform": "What We Build",
  "/resources": "Insights",
};
export const HOME_V2_SOLUTIONS_LABEL = "Who We Serve";
