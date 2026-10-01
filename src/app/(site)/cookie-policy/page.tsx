import { LegalPage, legalPageMetadata } from "@/components/legal/legal-page";
import { COOKIE_POLICY } from "@/content/cookie-policy";

export const revalidate = 60;

export function generateMetadata() {
  return legalPageMetadata("cookie-policy", "cookiePolicy");
}

export default function CookiePolicyPage() {
  return <LegalPage slug="cookie-policy" fallback={COOKIE_POLICY} />;
}
