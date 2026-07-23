import type { Metadata } from "next";
import { Albert_Sans, JetBrains_Mono } from "next/font/google";
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
      className={`${albertSans.variable} ${jetbrainsMono.variable} h-full`}
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
