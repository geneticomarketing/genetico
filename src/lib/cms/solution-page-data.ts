import { getPayloadClient, isCmsConfigured } from "@/lib/cms/get-payload";

/**
 * The Hospital and Life Science pages, shaped the way their sections consume
 * them.
 *
 * Both pages are one record in `solution-pages`, picked by slug. It reads
 * only the fields the redesign kept or introduced; the retired ones are still
 * in the database because the currently deployed build reads them, and
 * `scripts/drop-solution-page-legacy.mjs` clears them once this ships.
 */

export type SolutionSlug = "hospital" | "pharma";

export type SolutionStat = { figure: string; label: string };
export type SolutionChallenge = { title: string; body: string };
export type SolutionStep = {
  /** One or two words for the pills above the walkthrough. */
  short: string;
  kicker: string;
  title: string;
  body: string;
  callout: string;
};
export type SolutionOutcome = {
  figure: string;
  label: string;
  before: string;
  after: string;
  note: string;
};

export type SolutionContent = {
  hero: {
    eyebrow: string;
    headline: string;
    /** Set in brand blue at the end of the headline. */
    headlineHighlight: string;
    blurb: string;
    stats: SolutionStat[];
  };
  challenge: { eyebrow: string; heading: string; description: string; items: SolutionChallenge[] };
  solution: { eyebrow: string; heading: string; description: string; steps: SolutionStep[] };
  outcomes: {
    eyebrow: string;
    heading: string;
    description: string;
    items: SolutionOutcome[];
    footnote: string;
  };
  cta: { heading: string; description: string };
};

function text(value: string | null | undefined, fallback = ""): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

const EMPTY: SolutionContent = {
  hero: { eyebrow: "", headline: "", headlineHighlight: "", blurb: "", stats: [] },
  challenge: { eyebrow: "", heading: "", description: "", items: [] },
  solution: { eyebrow: "", heading: "", description: "", steps: [] },
  outcomes: { eyebrow: "", heading: "", description: "", items: [], footnote: "" },
  cta: { heading: "", description: "" },
};

/**
 * A step's short name, for the pills.
 *
 * Falls back to the first word of the title so the pills still read sensibly
 * on a step an editor added without filling the field in.
 */
function shortName(stepLabel: string | null | undefined, title: string): string {
  return text(stepLabel, title.split(/[\s—–:]/)[0] ?? "");
}

export async function getSolutionContent(slug: SolutionSlug): Promise<SolutionContent> {
  if (!isCmsConfigured()) return EMPTY;

  const payload = await getPayloadClient();
  if (!payload) return EMPTY;

  let doc;
  try {
    const { docs } = await payload.find({
      collection: "solution-pages",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    doc = docs[0];
  } catch {
    return EMPTY;
  }

  if (!doc) return EMPTY;

  const { hero, clinicalBurden, howItWorks, measurableOutcomes, cta } = doc;

  return {
    hero: {
      eyebrow: text(hero?.eyebrow),
      headline: text(hero?.titleLine1),
      headlineHighlight: text(hero?.titleHighlight),
      blurb: text(hero?.subtitle),
      stats: (hero?.stats ?? [])
        .map((stat) => ({ figure: text(stat.figure), label: text(stat.label) }))
        .filter((stat) => stat.figure),
    },
    challenge: {
      eyebrow: text(clinicalBurden?.label),
      heading: text(clinicalBurden?.heading),
      description: text(clinicalBurden?.description),
      items: (clinicalBurden?.cards ?? [])
        .map((card) => ({ title: text(card.title), body: text(card.description) }))
        .filter((card) => card.title),
    },
    solution: {
      eyebrow: text(howItWorks?.label),
      heading: text(howItWorks?.heading),
      description: text(howItWorks?.description),
      steps: (howItWorks?.rows ?? [])
        .map((row) => ({
          short: shortName(row.stepLabel, text(row.title)),
          kicker: text(row.category),
          title: text(row.title),
          body: text(row.description),
          callout: text(row.callout),
        }))
        .filter((step) => step.title),
    },
    outcomes: {
      eyebrow: text(measurableOutcomes?.label),
      heading: text(measurableOutcomes?.heading),
      description: text(measurableOutcomes?.description),
      footnote: text(measurableOutcomes?.footnote),
      items: (measurableOutcomes?.metrics ?? [])
        .map((metric) => ({
          figure: text(metric.figure),
          label: text(metric.label),
          before: text(metric.before),
          after: text(metric.after),
          note: text(metric.note),
        }))
        .filter((metric) => metric.figure),
    },
    cta: { heading: text(cta?.heading), description: text(cta?.description) },
  };
}
