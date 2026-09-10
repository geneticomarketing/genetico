import {
  DEFAULT_HOME_AUDIENCE,
  DEFAULT_HOME_CONTACT,
  DEFAULT_HOME_FAQS,
  DEFAULT_HOME_HERO,
  DEFAULT_HOME_PLATFORM,
  DEFAULT_HOME_PROOF,
  DEFAULT_HOME_TRUST,
  type HomeAudienceContent,
  type HomeContactContent,
  type HomeCta,
  type HomeFaqContent,
  type HomeHeroContent,
  type HomePlatformContent,
  type HomeProofContent,
  type HomeTrustContent,
} from "@/lib/cms/home-content";
import { getProofFeed } from "@/lib/cms/home-proof-resources";
import { getPartners, getSectionGlobal } from "@/lib/cms/queries";
import { resolveMediaUrl } from "@/lib/cms/resolve-media-url";
import type { Partner } from "@/lib/cms/types";

/**
 * Reads the home page's globals and shapes them the way the sections consume
 * them.
 *
 * Every field falls back to the default copy rather than rendering blank: an
 * editor who clears a heading should see the section keep working, not a hole
 * in the page. Empty arrays fall back the same way, since a section with no
 * items is almost always an accident rather than an intention — the one thing
 * that is meant to be switchable, the FAQ section, has an explicit checkbox.
 */

/** Non-empty string, or the fallback. Treats whitespace as empty. */
function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

type CmsButton = { label?: string | null; href?: string | null };

/** The nth button of a CTA array, or the default for that slot. */
function button(buttons: CmsButton[] | null | undefined, index: number, fallback: HomeCta) {
  const stored = buttons?.[index];
  return {
    label: text(stored?.label, fallback.label),
    href: text(stored?.href, fallback.href),
  };
}

export type HomePageContent = {
  hero: HomeHeroContent;
  audience: HomeAudienceContent;
  platform: HomePlatformContent;
  proof: HomeProofContent;
  trust: HomeTrustContent;
  faqs: HomeFaqContent;
  showFaqs: boolean;
  contact: HomeContactContent;
  partners: Partner[];
};

export async function getHomePageContent(): Promise<HomePageContent> {
  const [hero, audience, platform, proof, security, faqs, cta, cmsPartners, proofFeed] =
    await Promise.all([
      getSectionGlobal("home-hero"),
      getSectionGlobal("home-audience"),
      getSectionGlobal("home-platform-glance"),
      getSectionGlobal("home-proof"),
      getSectionGlobal("home-security"),
      getSectionGlobal("home-faqs"),
      getSectionGlobal("home-cta"),
      getPartners(),
      getProofFeed(),
    ]);

  const words = (hero?.rotatingWords ?? [])
    .map((entry) => entry.word?.trim())
    .filter((word): word is string => Boolean(word));

  const credentials = (hero?.credentials ?? [])
    .map((entry) => entry.name?.trim())
    .filter((name): name is string => Boolean(name));

  const blurb = text(hero?.blurb, DEFAULT_HOME_HERO.blurb);

  const doors = (audience?.doors ?? [])
    .map((door) => ({
      kicker: door.kicker ?? "",
      title: door.title ?? "",
      blurb: door.blurb ?? "",
      points: (door.points ?? [])
        .map((point) => point.text?.trim())
        .filter((point): point is string => Boolean(point)),
      ctaLabel: door.ctaLabel ?? "",
      href: door.href ?? "",
    }))
    .filter((door) => door.title && door.href);

  const layers = (platform?.layers ?? [])
    .map((layer) => ({
      title: layer.title ?? "",
      body: layer.body ?? "",
      tag: layer.tag ?? "",
    }))
    .filter((layer) => layer.title);

  // The strip is built from whichever resources are ticked for the home page;
  // the stored clips are the retired hand-typed version.
  const clips = proofFeed.clips.map((clip) => ({
    meta: clip.meta,
    title: clip.title,
    href: clip.href,
  }));

  const featuredDefaults = DEFAULT_HOME_PROOF.featured;
  const featured = proof?.featured;

  const trustPoints = (security?.features ?? [])
    .map((feature) => feature.text?.trim())
    .filter((point): point is string => Boolean(point));

  const faqItems = (faqs?.items ?? [])
    .map((item) => ({ question: item.question ?? "", answer: item.answer ?? "" }))
    .filter((item) => item.question && item.answer);

  // The marquee shows the partners collection in the editor's order. A row
  // whose logo has not been uploaded would render as a gap, so it is dropped.
  const partners = cmsPartners
    .map((partner) => ({
      name: partner.name,
      logo: resolveMediaUrl(partner.logo, partner.logoUrl),
    }))
    .filter((partner) => partner.logo);

  return {
    hero: {
      eyebrow: text(hero?.eyebrow, DEFAULT_HOME_HERO.eyebrow),
      headline: text(hero?.headline, DEFAULT_HOME_HERO.headline),
      rotatingWords: words.length ? words : DEFAULT_HOME_HERO.rotatingWords,
      blurb,
      // Falls back to the long blurb rather than the default short one, so an
      // editor who rewrote one and left the other empty still reads coherently.
      blurbShort: text(hero?.blurbShort, blurb),
      primaryCta: button(hero?.buttons, 0, DEFAULT_HOME_HERO.primaryCta),
      secondaryCta: button(hero?.buttons, 1, DEFAULT_HOME_HERO.secondaryCta),
      trustedByLabel: text(hero?.trustedByLabel, DEFAULT_HOME_HERO.trustedByLabel),
      credentials: credentials.length ? credentials : DEFAULT_HOME_HERO.credentials,
    },
    audience: {
      heading: text(audience?.heading, DEFAULT_HOME_AUDIENCE.heading),
      description: text(audience?.description, DEFAULT_HOME_AUDIENCE.description),
      doors: doors.length ? doors : DEFAULT_HOME_AUDIENCE.doors,
    },
    platform: {
      heading: text(platform?.heading, DEFAULT_HOME_PLATFORM.heading),
      description: text(platform?.description, DEFAULT_HOME_PLATFORM.description),
      layers: layers.length ? layers : DEFAULT_HOME_PLATFORM.layers,
      cta: {
        label: text(platform?.ctaLabel, DEFAULT_HOME_PLATFORM.cta?.label),
        href: text(platform?.ctaHref, DEFAULT_HOME_PLATFORM.cta?.href),
      },
    },
    proof: {
      heading: text(proof?.heading, DEFAULT_HOME_PROOF.heading),
      featured: {
        // Wording from the CMS, the item itself from the Resources page.
        badge: text(featured?.badge, featuredDefaults.badge),
        kicker: text(featured?.kicker, featuredDefaults.kicker),
        before: featured?.before?.trim() ?? "",
        after: featured?.after?.trim() ?? "",
        ctaLabel: text(featured?.ctaLabel, featuredDefaults.ctaLabel),
        duration: text(proofFeed.featured?.duration, featuredDefaults.duration),
        heading: text(proofFeed.featured?.title, featuredDefaults.heading),
        blurb: text(proofFeed.featured?.blurb, featuredDefaults.blurb),
        href: text(proofFeed.featured?.href, featuredDefaults.href),
      },
      clips: clips.length ? clips : DEFAULT_HOME_PROOF.clips,
      allResourcesLabel: text(proof?.allResourcesLabel, DEFAULT_HOME_PROOF.allResourcesLabel),
      allResourcesHref: text(proof?.allResourcesHref, DEFAULT_HOME_PROOF.allResourcesHref),
    },
    trust: {
      heading: text(security?.heading, DEFAULT_HOME_TRUST.heading),
      description: text(security?.description, DEFAULT_HOME_TRUST.description),
      points: trustPoints.length ? trustPoints : DEFAULT_HOME_TRUST.points,
    },
    faqs: {
      heading: text(faqs?.heading, DEFAULT_HOME_FAQS.heading),
      description: text(faqs?.description, DEFAULT_HOME_FAQS.description),
      items: faqItems.length ? faqItems : DEFAULT_HOME_FAQS.items,
    },
    showFaqs: faqs?.showSection !== false,
    contact: {
      heading: text(cta?.heading, DEFAULT_HOME_CONTACT.heading),
      description: text(cta?.description, DEFAULT_HOME_CONTACT.description),
      primaryCta: button(cta?.buttons, 0, DEFAULT_HOME_CONTACT.primaryCta),
      secondaryCta: button(cta?.buttons, 1, DEFAULT_HOME_CONTACT.secondaryCta),
    },
    partners,
  };
}
