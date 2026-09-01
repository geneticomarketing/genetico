import { ADMIN_GROUPS } from "../admin-groups";

/** Sidebar group order: website pages in the order they appear in the main menu. */
export const ADMIN_NAV_GROUP_ORDER = [
  ADMIN_GROUPS.home,
  ADMIN_GROUPS.about,
  ADMIN_GROUPS.platform,
  ADMIN_GROUPS.solutions,
  ADMIN_GROUPS.publicHealth,
  ADMIN_GROUPS.resources,
  ADMIN_GROUPS.legal,
  ADMIN_GROUPS.site,
  ADMIN_GROUPS.media,
  ADMIN_GROUPS.system,
] as const;

/**
 * Item order inside each group.
 *
 * These lists mirror the order the sections appear on the live page, top to
 * bottom, so an editor can scroll the website and the sidebar side by side.
 * A collection is listed directly under the section whose content it fills.
 * If you reorder sections in the page components, reorder them here too.
 */
export const ADMIN_NAV_ENTITY_ORDER: Record<string, string[]> = {
  // src/app/(site)/page.tsx
  [ADMIN_GROUPS.home]: [
    "globals:home-hero",
    "globals:home-who-we-are",
    "globals:home-partners",
    "collections:partners",
    "globals:home-security",
    "globals:home-ecosystem-challenges",
    "collections:ecosystem-modules",
    "globals:home-ecosystem-gaps",
    "collections:ecosystem-gaps",
    "globals:home-news",
    "globals:home-faqs",
    "globals:home-cta",
  ],
  // src/app/(site)/about-us/page.tsx
  // Section 6 (partners + security) is shared with the home page and lives there.
  [ADMIN_GROUPS.about]: [
    "globals:about-hero",
    "globals:about-vision",
    "globals:about-foundations",
    "globals:about-leadership",
    "collections:team-members",
    "globals:about-grants",
    "collections:grants-awards",
    "globals:about-cta",
  ],
  // src/app/(site)/platform/page.tsx
  [ADMIN_GROUPS.platform]: [
    "globals:platform-hero",
    "globals:platform-features",
    "globals:platform-clinical-intelligence",
    "globals:platform-longitudinal-care",
    "globals:platform-infrastructure",
    "globals:platform-security",
    "globals:platform-cta",
  ],
  // src/app/(site)/hospital/page.tsx and life-science/page.tsx
  [ADMIN_GROUPS.solutions]: ["collections:solution-pages"],
  // src/app/(site)/public-health/page.tsx
  [ADMIN_GROUPS.publicHealth]: [
    "globals:public-health-hero",
    "globals:public-health-impact",
    "globals:public-health-three-tier",
    "globals:public-health-architecture",
    "globals:public-health-cta",
  ],
  // src/app/(site)/resources/page.tsx → ResourcesContent renders in this order
  [ADMIN_GROUPS.resources]: [
    "globals:resources-hero",
    "globals:resources-filter-tabs",
    "collections:featured-videos",
    "globals:resources-videos-section",
    "collections:short-videos",
    "globals:resources-deep-dives-section",
    "collections:deep-dives",
    "globals:resources-articles-section",
    "collections:external-articles",
    "globals:resources-blogs-section",
    "collections:blog-posts",
    "globals:resources-newsletter",
  ],
  [ADMIN_GROUPS.legal]: [
    "globals:resources-blog-listing",
    "collections:legal-pages",
    "globals:utility-pages",
  ],
  [ADMIN_GROUPS.site]: ["globals:site-settings", "globals:navigation", "globals:footer"],
  [ADMIN_GROUPS.media]: ["collections:media"],
  [ADMIN_GROUPS.system]: ["collections:users"],
};
