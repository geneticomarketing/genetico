export const COMING_SOON_PATH = "/coming-soon";
export const PRIVACY_POLICY_PATH = "/privacy-policy";
export const HOSPITAL_PATH = "/hospital";
export const PHARMA_PATH = "/life-science";
export const PUBLIC_HEALTH_PATH = "/public-health";
export const PLATFORM_PATH = "/platform";
export const BLOG_PATH = "/blog";
export const RESOURCES_PATH = "/resources";
export const ABOUT_PATH = "/about-us";
/** The home page rework, previewed alongside the live home page until it is approved. */
export const HOME_V2_PATH = "/home-v2";
/** The third pass at that rework, previewed alongside v2 while both are up for review. */
export const HOME_V3_PATH = "/home-v3";
/** The fourth pass, which leads with the company rather than the platform. */
export const HOME_V4_PATH = "/home-v4";

export const LEAD_FORM_HASH = "#lead-form";

const PAGES_WITH_LEAD_FORM = [
  "/",
  HOME_V2_PATH,
  HOME_V3_PATH,
  HOME_V4_PATH,
  ABOUT_PATH,
  PLATFORM_PATH,
  HOSPITAL_PATH,
  PHARMA_PATH,
  PUBLIC_HEALTH_PATH,
] as const;

/**
 * Link to the lead form: an in-page anchor when the current page renders one,
 * otherwise the form on the home page.
 */
export function leadFormHref(pathname: string): string {
  if (PAGES_WITH_LEAD_FORM.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return LEAD_FORM_HASH;
  }
  return `/${LEAD_FORM_HASH}`;
}
