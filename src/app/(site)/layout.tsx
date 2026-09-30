import type { Metadata } from "next";
import { Albert_Sans, DM_Sans, IBM_Plex_Mono, JetBrains_Mono, Newsreader } from "next/font/google";

import "../globals.css";

import { AppChrome } from "@/components/app-chrome";
import { CookieConsent } from "@/components/chrome/cookie-consent";
import { JsonLd } from "@/components/seo/json-ld";
import { consentDefaultsScript, GTM_ID, gtmScript } from "@/lib/analytics";
import { getFooterContent, getNavigation, getSiteSettings } from "@/lib/cms/queries";
import { SiteDataProvider } from "@/lib/cms/site-data-context";
import { createRootMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

/*
 * The public website's root layout. The admin panel (app/(payload)) has its
 * own, from Payload, so nothing here — fonts, analytics, the cookie banner —
 * reaches /admin.
 */

/* Newsreader (headlines), DM Sans (body) and IBM Plex Mono (labels) are the
   design system's faces. Albert Sans and JetBrains Mono still serve the blog,
   privacy and coming-soon pages, which keep the earlier design. */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  style: ["normal"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});
const albertSans = Albert_Sans({ variable: "--font-albert-sans", subsets: ["latin"] });
/* Distinct from the theme token so `--font-jetbrains-mono` can compose it with fallbacks. */
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createRootMetadata(settings.siteDescription);
}

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [navigation, footer, settings] = await Promise.all([
    getNavigation(),
    getFooterContent(),
    getSiteSettings(),
  ]);

  return (
    <html
      lang="en"
      className={`${albertSans.variable} ${jetbrainsMono.variable} ${newsreader.variable} ${dmSans.variable} ${plexMono.variable} h-full`}
    >
      <head>
        {/* Consent defaults must be in place before GTM loads, so both are
            plain inline scripts in this order, as high in <head> as possible. */}
        {GTM_ID ? (
          <>
            <script dangerouslySetInnerHTML={{ __html: consentDefaultsScript }} />
            <script dangerouslySetInnerHTML={{ __html: gtmScript(GTM_ID) }} />
          </>
        ) : null}
      </head>
      <body className="h-full">
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SiteDataProvider value={{ navigation, footer, settings }}>
          <AppChrome navigation={navigation} footer={footer}>
            {children}
          </AppChrome>
        </SiteDataProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
