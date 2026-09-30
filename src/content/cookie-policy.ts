import type { LegalFallback } from "@/components/legal/legal-page";

/**
 * The cookie policy (/cookie-policy). Editors change it in the CMS
 * (Other pages → Legal pages → cookie-policy); this copy seeded that record
 * and is shown only if the record is missing.
 *
 * It describes what the site actually does — keep it in step with
 * src/lib/analytics.ts and the tags configured in the GTM container.
 */
export const COOKIE_POLICY: LegalFallback & { metaDescription: string } = {
  title: "Cookie Policy",
  lastUpdated: "2026-09-30",
  metaDescription: "Which cookies genetico.in sets, why, and how to change your choice.",
  sections: [
    {
      title: "1. About this policy",
      body: [
        "This policy explains how Genetico uses cookies and similar technologies on genetico.in. It should be read alongside our Privacy Policy, which explains how we handle personal information more generally.",
      ],
    },
    {
      title: "2. What cookies are",
      body: [
        "Cookies are small text files a website stores in your browser. Similar technologies, such as your browser's local storage, work in much the same way. We refer to all of them as cookies here.",
      ],
    },
    {
      title: "3. Cookies we always use",
      body: [
        "These are needed for the site to work and do not track you. We store your cookie choice in your browser so we do not ask again on every page. If you sign in to our content management system, a session cookie keeps you signed in; this applies only to our own editors.",
      ],
    },
    {
      title: "4. Analytics cookies — only if you accept",
      body: [
        "With your consent, we use Google Analytics, loaded through Google Tag Manager, to understand how visitors use the site — for example, which pages are visited and how people arrive. This helps us improve the site. It sets cookies such as _ga and _ga_<id>, which typically last up to two years.",
        "Until you accept, Google tags run in a restricted mode that does not set or read analytics cookies. We do not use advertising cookies, and we do not sell information collected through cookies.",
      ],
    },
    {
      title: "5. Your choices",
      body: [
        "When you first visit, a banner asks whether you accept analytics cookies. You can change your choice at any time with the “Cookie settings” link in the footer of every page. You can also block or delete cookies in your browser settings; the site will still work.",
      ],
    },
    {
      title: "6. Third-party content",
      body: [
        "Videos and articles in our Insights library open on the sites that host them, such as YouTube, which apply their own cookie policies.",
      ],
    },
    {
      title: "7. Changes to this policy",
      body: [
        "We will update this policy if the cookies we use change. The date at the top shows when it was last revised.",
      ],
    },
    {
      title: "8. Contact us",
      body: ["If you have questions about how we use cookies, write to us at the address below."],
      contact: true,
    },
  ],
};
