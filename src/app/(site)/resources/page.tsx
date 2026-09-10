import type { Metadata } from "next";

import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { ResourceLibrary } from "@/components/resources/library";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { getResourcesPageContent } from "@/lib/cms/resources-page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getResourcesPageContent();
  const seo = STATIC_PAGE_SEO.resources;

  return createPageMetadata({
    title: seo.title,
    description: content.hero.description || seo.description,
    path: seo.path,
  });
}

export default async function ResourcesPage() {
  const [content, navigation, footer] = await Promise.all([
    getResourcesPageContent(),
    getNavigation(),
    getFooterContent(),
  ]);

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      {/* No section rail here: the sticky filter row inside the library sits
          in the same place and does the same job for this page. */}
      <SiteHeader navigation={navigation} sections={[]} />
      <ResourceLibrary content={content} />
      <SiteFooter footer={footer} />
    </div>
  );
}
