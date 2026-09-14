import { getSectionGlobal } from "@/lib/cms/queries";

/**
 * The Public Health page, shaped the way its sections consume it.
 *
 * The four globals already match the design's sections one for one, so this
 * is a straight read — the shaping is in flattening the nested arrays and
 * dropping rows an editor left half-filled.
 */

export type PublicHealthImpactRow = { title: string; body: string };

export type PublicHealthTier = {
  /** Short form for the tab; the banner uses it too. */
  name: string;
  /** e.g. "Tertiary level · Class C". */
  level: string;
  happens: string[];
  flows: string[];
  who: { role: string; tools: string }[];
};

export type PublicHealthClass = {
  /** Ties this row to the diagram: hub, Spoke C, or Spoke D. */
  key: "hub" | "c" | "d";
  tag: string;
  badge: string;
  name: string;
  body: string;
  caps: string[];
};

export type PublicHealthContent = {
  hero: {
    eyebrow: string;
    context: string;
    headline: string;
    /** Set in brand blue at the end of the headline. */
    headlineHighlight: string;
    blurb: string;
  };
  impact: { eyebrow: string; heading: string; description: string; rows: PublicHealthImpactRow[] };
  tiers: { eyebrow: string; heading: string; description: string; items: PublicHealthTier[] };
  architecture: {
    eyebrow: string;
    heading: string;
    description: string;
    classificationLabel: string;
    items: PublicHealthClass[];
  };
  cta: { heading: string; description: string };
};

function text(value: string | null | undefined, fallback = ""): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function items(list: { item?: string | null }[] | null | undefined): string[] {
  return (list ?? [])
    .map((entry) => entry.item?.trim())
    .filter((item): item is string => Boolean(item));
}

/**
 * Reads a classification's diagram key from its position.
 *
 * The list is hub, then Spoke C, then Spoke D — the order the design fixes
 * and the order the diagram is drawn in. Position is the honest source here:
 * the alternative is asking an editor to type "hub", "c" or "d", which is a
 * code detail leaking into the admin panel.
 */
const ARCH_KEYS = ["hub", "c", "d"] as const;

export async function getPublicHealthContent(): Promise<PublicHealthContent> {
  const [hero, impact, tiers, architecture, cta] = await Promise.all([
    getSectionGlobal("public-health-hero"),
    getSectionGlobal("public-health-impact"),
    getSectionGlobal("public-health-three-tier"),
    getSectionGlobal("public-health-architecture"),
    getSectionGlobal("public-health-cta"),
  ]);

  // The headline is stored in three fields; the third is set in brand blue.
  const headline = [hero?.titleLine1, hero?.titleLine2]
    .map((line) => line?.trim())
    .filter(Boolean)
    .join(" ");

  return {
    hero: {
      eyebrow: "Public Health",
      context: "NPRD implementation",
      headline: text(headline, "Digital backbone for India's"),
      headlineHighlight: text(hero?.titleHighlight, "rare disease ecosystem"),
      blurb: text(hero?.subtitle),
    },
    impact: {
      eyebrow: text(impact?.eyebrow, "Impact"),
      heading: text(impact?.heading, "Impact at a glance"),
      description: text(impact?.description),
      rows: (impact?.features ?? [])
        .map((row) => ({ title: row.title, body: text(row.description) }))
        .filter((row) => row.title),
    },
    tiers: {
      eyebrow: text(tiers?.eyebrow, "Three-tier model"),
      heading: text(tiers?.heading, "How it works"),
      description: text(tiers?.description),
      items: (tiers?.tiers ?? [])
        .map((tier) => ({
          name: tier.bannerLabel,
          level: text(tier.levelLabel),
          happens: items(tier.happens),
          flows: items(tier.dataFlows),
          who: (tier.users ?? [])
            .map((user) => ({ role: user.role, tools: text(user.description) }))
            .filter((user) => user.role),
        }))
        .filter((tier) => tier.name),
    },
    architecture: {
      eyebrow: text(architecture?.eyebrow, "Architecture"),
      heading: text(architecture?.heading, "How the tiers are connected"),
      description: text(architecture?.description),
      classificationLabel: text(architecture?.classificationLabel, "Hospital classification"),
      items: (architecture?.classifications ?? [])
        .map((row, i) => ({
          key: ARCH_KEYS[i] ?? "d",
          tag: text(row.level),
          badge: text(row.timeBadge),
          name: row.title,
          body: text(row.description),
          caps: (row.tags ?? [])
            .map((tag) => tag.tag?.trim())
            .filter((tag): tag is string => Boolean(tag)),
        }))
        .filter((row) => row.name),
    },
    cta: {
      heading: text(cta?.heading),
      description: text(cta?.description),
    },
  };
}
