import { ADMIN_GROUPS } from "../admin-groups";

/** Sidebar group order: website pages first, then site-wide utilities. */
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

/** Item order inside each group (`globals` or `collections` + slug). */
export const ADMIN_NAV_ENTITY_ORDER: Record<string, string[]> = {
  [ADMIN_GROUPS.home]: [
    "globals:home-page",
    "collections:news-articles",
    "collections:partners",
    "collections:ecosystem-modules",
    "collections:ecosystem-gaps",
  ],
  [ADMIN_GROUPS.about]: [
    "globals:about-page",
    "collections:team-members",
    "collections:grants-awards",
  ],
  [ADMIN_GROUPS.platform]: ["globals:platform-page"],
  [ADMIN_GROUPS.solutions]: ["collections:solution-pages"],
  [ADMIN_GROUPS.publicHealth]: ["globals:public-health-page"],
  [ADMIN_GROUPS.resources]: [
    "globals:resources-page",
    "collections:blog-posts",
    "collections:featured-videos",
    "collections:short-videos",
    "collections:external-articles",
  ],
  [ADMIN_GROUPS.legal]: ["globals:utility-pages", "collections:legal-pages"],
  [ADMIN_GROUPS.site]: ["globals:site-settings", "globals:navigation", "globals:footer"],
  [ADMIN_GROUPS.media]: ["collections:media"],
  [ADMIN_GROUPS.system]: ["collections:users"],
};
