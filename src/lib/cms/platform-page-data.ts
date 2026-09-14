import { getCollection, getSectionGlobal } from "@/lib/cms/queries";
import { resolveMediaUrl } from "@/lib/cms/resolve-media-url";
import { INTEGRATION_TAGS } from "@/content/platform-demo";
import type { Partner as CmsPartner } from "@/payload-types";

/**
 * The Platform page, shaped the way its sections consume it.
 *
 * The seven globals already match the design's sections one for one, so this
 * is mostly a straight read — the shaping is in flattening the bullet arrays
 * and dropping rows an editor left half-filled.
 */

export type PlatformFeature = {
  title: string;
  /** Small pill above the heading, e.g. "Genetic Data Capture". */
  badge: string;
  kicker: string;
  body: string;
  bullets: string[];
  image: string;
};

export type PlatformCapability = { title: string; badge: string; description: string };

export type PlatformColumn = { title: string; description: string; bullets: string[] };

export type PlatformCard = { title: string; description: string };

export type PlatformContent = {
  hero: {
    eyebrow: string;
    title: string;
    /** Set in italics at the end of the headline. */
    titleEmphasis: string;
    blurb: string;
    ctaLabel: string;
    ctaHref: string;
  };
  trustLogos: { name: string; logo: string }[];
  features: { eyebrow: string; heading: string; description: string; items: PlatformFeature[] };
  cdss: { eyebrow: string; heading: string; description: string; items: PlatformCapability[] };
  longitudinal: { eyebrow: string; heading: string; description: string; items: PlatformColumn[] };
  infrastructure: {
    eyebrow: string;
    heading: string;
    description: string;
    integrations: { title: string; description: string; bullets: string[]; tags: string[] };
    deployment: { title: string; description: string; bullets: string[]; options: PlatformCard[] };
  };
  security: { eyebrow: string; heading: string; description: string; items: PlatformCard[] };
  cta: { heading: string; description: string };
};

function text(value: string | null | undefined, fallback = ""): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function bullets(list: { item?: string | null }[] | null | undefined): string[] {
  return (list ?? [])
    .map((entry) => entry.item?.trim())
    .filter((item): item is string => Boolean(item));
}

export async function getPlatformContent(): Promise<PlatformContent> {
  const [hero, features, cdss, longitudinal, infrastructure, security, cta, partners] =
    await Promise.all([
      getSectionGlobal("platform-hero"),
      getSectionGlobal("platform-features"),
      getSectionGlobal("platform-clinical-intelligence"),
      getSectionGlobal("platform-longitudinal-care"),
      getSectionGlobal("platform-infrastructure"),
      getSectionGlobal("platform-security"),
      getSectionGlobal("platform-cta"),
      getCollection<CmsPartner>("partners", []),
    ]);

  // The strip under the hero names institutions the platform is deployed
  // with, so it shows the institutional partners rather than every logo. It
  // falls back to the full list while nothing is classified yet.
  const logos = partners
    .map((partner) => ({
      name: partner.name,
      logo: resolveMediaUrl(partner.logo, partner.logoUrl),
      group: partner.group ?? "supporter",
    }))
    .filter((partner) => partner.logo);
  const institutions = logos.filter((logo) => logo.group === "institution");

  return {
    hero: {
      eyebrow: text(hero?.eyebrow, "A Genetico Platform"),
      title: text(hero?.title, "The clinical infrastructure for"),
      titleEmphasis: text(hero?.titleEmphasis),
      blurb: text(hero?.subtitle),
      ctaLabel: text(hero?.ctaLabel, "Schedule a walkthrough"),
      ctaHref: text(hero?.ctaHref, "#get-in-touch"),
    },
    trustLogos: (institutions.length ? institutions : logos).map(({ name, logo }) => ({
      name,
      logo,
    })),
    features: {
      eyebrow: text(features?.eyebrow, "The Platform"),
      heading: text(features?.heading),
      description: text(features?.description),
      items: (features?.features ?? [])
        .map((item) => ({
          title: item.title,
          badge: text(item.category),
          kicker: text(item.subheading),
          body: text(item.description),
          bullets: bullets(item.bullets),
          image: resolveMediaUrl(item.illustrationImage, item.illustration) || "",
        }))
        .filter((item) => item.title),
    },
    cdss: {
      eyebrow: text(cdss?.eyebrow, "Clinical Intelligence"),
      heading: text(cdss?.heading),
      description: text(cdss?.description),
      items: (cdss?.capabilities ?? [])
        .map((item) => ({
          title: item.title,
          badge: text(item.badge),
          description: text(item.description),
        }))
        .filter((item) => item.title),
    },
    longitudinal: {
      eyebrow: text(longitudinal?.eyebrow, "Longitudinal Care"),
      heading: text(longitudinal?.heading),
      description: text(longitudinal?.description),
      items: (longitudinal?.columns ?? [])
        .map((column) => ({
          title: column.title,
          description: text(column.description),
          bullets: bullets(column.bullets),
        }))
        .filter((column) => column.title),
    },
    infrastructure: {
      eyebrow: text(infrastructure?.eyebrow, "Infrastructure"),
      heading: text(infrastructure?.heading),
      description: text(infrastructure?.description),
      integrations: {
        title: text(infrastructure?.integrationsTitle, "Integrations"),
        description: text(infrastructure?.integrationsDescription),
        bullets: bullets(infrastructure?.integrationBullets),
        tags: (() => {
          const stored = (infrastructure?.integrationTags ?? [])
            .map((entry) => entry.tag?.trim())
            .filter((tag): tag is string => Boolean(tag));
          return stored.length ? stored : [...INTEGRATION_TAGS];
        })(),
      },
      deployment: {
        title: text(infrastructure?.deploymentTitle, "Deployment Flexibility"),
        description: text(infrastructure?.deploymentDescription),
        bullets: bullets(infrastructure?.deploymentBullets),
        options: (infrastructure?.deploymentOptions ?? [])
          .map((option) => ({ title: option.title, description: text(option.description) }))
          .filter((option) => option.title),
      },
    },
    security: {
      eyebrow: text(security?.eyebrow, "Security & Compliance"),
      heading: text(security?.heading),
      description: text(security?.description),
      items: (security?.cards ?? [])
        .map((card) => ({ title: card.title, description: text(card.description) }))
        .filter((card) => card.title),
    },
    cta: {
      heading: text(cta?.heading),
      description: text(cta?.description),
    },
  };
}
