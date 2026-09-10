import type { Metadata } from "next";
import { Albert_Sans, DM_Sans, IBM_Plex_Mono, JetBrains_Mono, Newsreader } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GTM_ID = "GTM-MHNFM4ZM";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  /* Distinct from the Tailwind theme token so `--font-jetbrains-mono` can
     safely compose: var(--font-jetbrains) + fallbacks (no circular ref). */
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

/* ── Redesign faces ────────────────────────────────────────────────────────
   The three families of the 2026 design system: Newsreader for headlines,
   DM Sans for UI and body, IBM Plex Mono for eyebrows, labels and figures.
   Self-hosted by next/font so they cost no extra round trip and no layout
   shift. Composed into --font-headline / --font-body / --font-mono-label in
   globals.css; the Albert Sans + JetBrains pair above still serves the pages
   that have not been redesigned yet. */

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500"],
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

export const revalidate = 60;

export const metadata: Metadata = {
  applicationName: "Genetico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${albertSans.variable} ${jetbrainsMono.variable} ${newsreader.variable} ${dmSans.variable} ${plexMono.variable} h-full`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="h-full">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
