import { LegalPage, legalPageMetadata, type LegalFallback } from "@/components/legal/legal-page";

export const revalidate = 60;

/** Used only if the "privacy-policy" record is missing from the CMS. */
const FALLBACK: LegalFallback = {
  title: "Privacy Policy",
  lastUpdated: "2026-07-03",
  sections: [
    {
      title: "1. Introduction",
      body: [
        'Genetico ("we," "us," or "our") operates IndiGeneUs.AI, a platform that structures clinical workflows, captures standardized patient data, and supports AI-assisted clinical decision-making for rare and genetic disorders.',
        "This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, use our platform, or otherwise interact with us. By using our services, you agree to the practices described here.",
      ],
    },
    {
      title: "13. Contact Us",
      body: [
        "If you have questions about this Privacy Policy or our data practices, please contact us using the email address below.",
      ],
      contact: true,
    },
  ],
};

export function generateMetadata() {
  return legalPageMetadata("privacy-policy", "privacyPolicy");
}

export default function PrivacyPolicyPage() {
  return <LegalPage slug="privacy-policy" fallback={FALLBACK} />;
}
