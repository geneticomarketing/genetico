import type { Metadata } from "next";

import { AboutClient } from "@/app/about-us/about-client";
import { CMS_PAGE_REVALIDATE_SECONDS } from "@/lib/cms/cache";
import { getAboutPageData } from "@/lib/cms/page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = CMS_PAGE_REVALIDATE_SECONDS;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPageData();
  const seo = STATIC_PAGE_SEO.about;

  return createPageMetadata({
    title: seo.title,
    description: data.hero.subtitle || seo.description,
    path: seo.path,
  });
}

export default async function AboutUsPage() {
  const data = await getAboutPageData();
  return <AboutClient data={data} />;
}
