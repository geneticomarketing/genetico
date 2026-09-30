import type { PageSection } from "@/components/chrome/page-sections";
import {
  HOME_AHEAD,
  HOME_CONTACT,
  HOME_DOES,
  HOME_HERO,
  HOME_IMPACT,
  HOME_INSIGHTS,
  HOME_INSIGHTS_PHOTO,
  HOME_PLATFORM,
  HOME_SCALE,
  HOME_SERVE,
  HOME_SERVE_DOORS,
  HOME_WHY,
} from "@/content/home";
import { firstAwardYear, getAwards, getPartnerLogos } from "@/lib/cms/about-page-data";
import { getProofFeed } from "@/lib/cms/home-proof-resources";
import { getSectionGlobal } from "@/lib/cms/queries";
import { resolveMediaUrl } from "@/lib/cms/resolve-media-url";
import { withDefaults } from "@/lib/cms/with-defaults";

/**
 * Everything the home page renders, read from the CMS (Home page · / in
 * /admin) and filled from src/content/home.ts wherever a field is empty.
 *
 * Also gathered here: the partner logos ticked "Show on the home page", the
 * award count behind "Backed by", and the Insights feed from the Resources
 * page.
 */

/** An uploaded photo's URL, or "" when none is uploaded. */
function uploaded(value: unknown): string {
  return value && typeof value === "object" ? resolveMediaUrl(value as never, null) || "" : "";
}

export async function getHomePage() {
  const [intro, why, scale, does, platform, serve, impact, insights, ahead, contact] =
    await Promise.all([
      getSectionGlobal("home-intro"),
      getSectionGlobal("home-why"),
      getSectionGlobal("home-scale"),
      getSectionGlobal("home-does"),
      getSectionGlobal("home-platform"),
      getSectionGlobal("home-serve"),
      getSectionGlobal("home-impact"),
      getSectionGlobal("home-insights"),
      getSectionGlobal("home-ahead"),
      getSectionGlobal("home-contact"),
    ]);

  const [awards, logos, feed] = await Promise.all([
    getAwards(),
    getPartnerLogos(),
    getProofFeed({ clipLimit: 4 }),
  ]);

  const copy = {
    hero: withDefaults(HOME_HERO, intro),
    why: withDefaults(HOME_WHY, why),
    scale: withDefaults(HOME_SCALE, scale),
    does: withDefaults(HOME_DOES, does),
    platform: withDefaults(HOME_PLATFORM, platform),
    serve: withDefaults(HOME_SERVE, serve),
    impact: withDefaults(HOME_IMPACT, impact),
    insights: withDefaults(HOME_INSIGHTS, insights),
    ahead: withDefaults(HOME_AHEAD, ahead),
    contact: withDefaults(HOME_CONTACT, contact),
  };

  /* Photos: an upload in the CMS replaces the built-in one. */
  const scalePhoto = { ...HOME_SCALE.photo, src: uploaded(scale?.photo) || HOME_SCALE.photo.src };
  const doors = HOME_SERVE_DOORS.map((door, i) => ({
    ...door,
    photo: { ...door.photo, src: uploaded(serve?.doors?.[i]?.photo) || door.photo.src },
  }));
  const insightsPhoto = {
    ...HOME_INSIGHTS_PHOTO,
    src: uploaded(insights?.featuredPhoto) || HOME_INSIGHTS_PHOTO.src,
  };

  /* In render order: the rail, the mobile menu and the section numbers follow it. */
  const sections: (PageSection & { eyebrow: string })[] = [
    ["why", copy.why],
    ["does", copy.does],
    ["platform", copy.platform],
    ["serve", copy.serve],
    ["impact", copy.impact],
    ["insights", copy.insights],
    ["ahead", copy.ahead],
    ["get-in-touch", copy.contact],
  ].map(([id, section]) => {
    const s = section as { eyebrow: string; menuLabel: string };
    return { id: id as string, label: s.menuLabel, eyebrow: s.eyebrow };
  });

  return {
    ...copy,
    sections,
    scalePhoto,
    doors,
    insightsPhoto,
    logos: logos.filter((logo) => logo.showOnHome),
    awardCount: awards.length,
    firstAwardYear: firstAwardYear(awards),
    feed,
  };
}

export type HomePageData = Awaited<ReturnType<typeof getHomePage>>;
