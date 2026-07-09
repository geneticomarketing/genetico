import type { Metadata } from "next";

import { PublicHealthClient } from "@/app/public-health/public-health-client";
import { CMS_PAGE_REVALIDATE_SECONDS } from "@/lib/cms/cache";
import { getPublicHealthPageData } from "@/lib/cms/page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = CMS_PAGE_REVALIDATE_SECONDS;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPublicHealthPageData();
  const seo = STATIC_PAGE_SEO.publicHealth;
  const title = `${data.hero.titleLine1} ${data.hero.titleLine2}`.trim();

  return createPageMetadata({
    title: title || seo.title,
    description: data.hero.subtitle || seo.description,
    path: seo.path,
    ogImage: data.hero.image || undefined,
  });
}

export default async function PublicHealthPage() {
  const data = await getPublicHealthPageData();
  return <PublicHealthClient data={data} />;
}
