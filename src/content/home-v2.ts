import { ABOUT_PATH } from "@/lib/routes";
import type { HomeDoor, HomeFaqContent, HomeSectionMeta } from "@/lib/cms/home-content";

/**
 * Copy for the narrative rework of the home page, previewed at /home-v2.
 *
 * This lives in code while the rework is up for approval. Everything the live
 * home page already holds in the CMS — the credentials marquee, the first three
 * audience doors, the four platform layers, proof, security and the contact
 * form — is read from there; only the copy the rework adds or rewrites sits
 * here. When v2 replaces the home page, this moves into the home globals.
 *
 * Source: design_handoff_genetico_site/home page version 2/Home.dc.html.
 */

/** In render order; the rail, the mobile menu and the section numbers follow it. */
export const HOME_V2_SECTIONS: HomeSectionMeta[] = [
  { id: "problem", label: "The problem", eyebrow: "The problem" },
  { id: "shift", label: "The shift", eyebrow: "What we are changing" },
  { id: "how", label: "How", eyebrow: "How" },
  { id: "platform", label: "IndiGeneUs.AI", eyebrow: "The platform" },
  { id: "who", label: "Who it's for", eyebrow: "Who it matters to" },
  { id: "proof", label: "Proof", eyebrow: "Proof" },
  { id: "trust", label: "Security", eyebrow: "Security & Compliance" },
  { id: "faqs", label: "FAQs", eyebrow: "FAQs" },
  { id: "get-in-touch", label: "Engage", eyebrow: "Engage" },
];

export const HOME_V2_HERO = {
  eyebrow: "Genetico",
  headline: "Rare and genetic disease care is held back by data that does not connect.",
  headlineAccent: "We are building the layer that connects it.",
  blurb:
    "Genetico builds the digital backbone for the rare and genetic disease ecosystem — linking " +
    "clinical care, diagnostics, research, registries and public-health programmes on one " +
    "structured, interoperable record.",
  primaryCta: { label: "Start with the problem", target: "problem" },
  secondaryCta: { label: "Meet IndiGeneUs.AI", target: "platform" },
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

export const HOME_V2_WHO = {
  heading: "What this means for you",
  description:
    "The same structured record answers four different questions. Pick the one that describes " +
    "you.",
  /** The door the rework adds. The other three are the live home page's, from the CMS. */
  investorDoor: {
    kicker: "For investors & partners",
    title: "Why this, why now",
    blurb:
      "Rare disease care in India is being formalised through national policy — and it needs a " +
      "data layer to run on.",
    points: [
      "Built with national institutions and CoEs",
      "Aligned to India's rare disease policy",
      "One platform, four revenue-bearing audiences",
    ],
    ctaLabel: "Read the Genetico story",
    href: ABOUT_PATH,
  } satisfies HomeDoor,
};

export const HOME_V2_FAQS: HomeFaqContent = {
  heading: "Frequently asked questions",
  description: "Genetico, IndiGeneUs.AI, and how the two fit together.",
  items: [
    {
      question: "What does Genetico do?",
      answer:
        "Genetico builds the digital backbone for the rare and genetic disease ecosystem. We turn " +
        "fragmented clinical information into structured, interoperable data, and connect the " +
        "people who need it — clinicians, diagnostic labs, researchers and public-health " +
        "programmes.",
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
