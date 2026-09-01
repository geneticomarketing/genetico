import type { Metadata } from "next";

import { AppChrome } from "@/components/app-chrome";
import { JsonLd } from "@/components/seo/json-ld";
import { getFooterContent, getNavigation, getSiteSettings } from "@/lib/cms/queries";
import { SiteDataProvider } from "@/lib/cms/site-data-context";
import { createRootMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createRootMetadata(settings.siteDescription);
}

export default async function SiteLayout({
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
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <SiteDataProvider value={{ navigation, footer, settings }}>
        <AppChrome navigation={navigation} footer={footer}>
          {children}
        </AppChrome>
      </SiteDataProvider>
    </>
  );
}
