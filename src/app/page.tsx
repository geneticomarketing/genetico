import type { Metadata } from "next";

import { HomeClient } from "@/app/home-client";
import { getHomePageData } from "@/lib/cms/page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = STATIC_PAGE_SEO.home;
  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: seo.path,
  });
}

export default async function Home() {
  const data = await getHomePageData();

  return <HomeClient data={data} />;
}
