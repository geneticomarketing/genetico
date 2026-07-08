import type { Metadata } from "next";

import { PlatformClient } from "@/app/platform/platform-client";
import { getPlatformPageData } from "@/lib/cms/page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPlatformPageData();
  const seo = STATIC_PAGE_SEO.platform;

  return createPageMetadata({
    title: seo.title,
    description: data.hero.subtitle || seo.description,
    path: seo.path,
    ogImage: data.hero.image || undefined,
  });
}

export default async function PlatformPage() {
  const data = await getPlatformPageData();
  return <PlatformClient data={data} />;
}
