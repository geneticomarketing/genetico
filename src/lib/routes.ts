/**
 * The site's public paths. Import these rather than writing a path out, so a
 * page can move without hunting for every link to it.
 *
 * The earlier design previews (/home-v2, /home-v3, /home-v4, /about-v2) are
 * archived and no longer routed; their paths live in src/archive/paths.ts.
 */
export const ABOUT_PATH = "/about-us";
export const PLATFORM_PATH = "/platform";
export const HOSPITAL_PATH = "/hospital";
export const PHARMA_PATH = "/life-science";
export const PUBLIC_HEALTH_PATH = "/public-health";
export const RESOURCES_PATH = "/resources";
export const RARE_INSIGHTS_PATH = "/rare-insights";
export const BLOG_PATH = "/blog";
export const PRIVACY_POLICY_PATH = "/privacy-policy";
export const COOKIE_POLICY_PATH = "/cookie-policy";
export const COMING_SOON_PATH = "/coming-soon";

/**
 * The enquiry form's anchor. Every page that carries the form gives it this
 * id, and links stored in the CMS point at it too — keep it stable.
 */
export const LEAD_FORM_HASH = "#lead-form";
