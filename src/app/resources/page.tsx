import type { Metadata } from "next";

import { ResourcesClient } from "@/app/resources/resources-client";
import { CMS_PAGE_REVALIDATE_SECONDS } from "@/lib/cms/cache";
import { getResourcesPageData } from "@/lib/cms/page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = CMS_PAGE_REVALIDATE_SECONDS;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getResourcesPageData();
  const seo = STATIC_PAGE_SEO.resources;

  return createPageMetadata({
    title: seo.title,
    description: data.hero.subtitle || data.hero.description || seo.description,
    path: seo.path,
    ogImage: data.hero.image || undefined,
  });
}

export default async function ResourcesPage() {
  const data = await getResourcesPageData();
  return <ResourcesClient data={data} />;
}
