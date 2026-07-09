import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/json-ld";
import { getFooterContent, getNavigation, getSiteSettings } from "@/lib/cms/queries";
import { SiteDataProvider } from "@/lib/cms/site-data-context";
import { AppChrome } from "@/components/app-chrome";
import { createRootMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createRootMetadata(settings.siteDescription);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navigation, footer, settings] = await Promise.all([
    getNavigation(),
    getFooterContent(),
    getSiteSettings(),
  ]);

  return (
    <html lang="en" className={`${albertSans.variable} h-full`}>
      <body className="h-full">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SiteDataProvider value={{ navigation, footer, settings }}>
          <AppChrome>{children}</AppChrome>
        </SiteDataProvider>
      </body>
    </html>
  );
}
