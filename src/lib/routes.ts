export const COMING_SOON_PATH = "/coming-soon";
export const PRIVACY_POLICY_PATH = "/privacy-policy";
export const HOSPITAL_PATH = "/hospital";
export const PHARMA_PATH = "/life-science";
export const PUBLIC_HEALTH_PATH = "/public-health";
export const PLATFORM_PATH = "/platform";
export const BLOG_PATH = "/blog";

export const LEAD_FORM_HASH = "#lead-form";

const PAGES_WITH_LEAD_FORM = [
  "/",
  "/about-us",
  PLATFORM_PATH,
  HOSPITAL_PATH,
  PHARMA_PATH,
  PUBLIC_HEALTH_PATH,
] as const;

export function leadFormHref(pathname: string): string {
  if (PAGES_WITH_LEAD_FORM.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return LEAD_FORM_HASH;
  }
  return `/${LEAD_FORM_HASH.slice(1)}`;
}
