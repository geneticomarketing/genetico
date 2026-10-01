import type { Metadata } from "next";

import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { ResourceLibrary } from "@/components/resources/library";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { getResourcesPageContent } from "@/lib/cms/resources-page-data";
import { staticPageMetadata } from "@/lib/seo-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, resourcesNodes } from "@/lib/structured-data";

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return staticPageMetadata("resources");
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

      <main id="main-content" className="flex flex-1 flex-col">
        <JsonLd data={graph(...resourcesNodes(content))} />

        <ResourceLibrary content={content} />
      </main>

      <SiteFooter footer={footer} />
    </div>
  );
}
