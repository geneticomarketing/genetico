import type { Metadata } from "next";

import { SolutionsPage } from "@/components/landing/solutions-page";
import { CMS_PAGE_REVALIDATE_SECONDS } from "@/lib/cms/cache";
import { getSolutionsContent } from "@/lib/cms/queries";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = CMS_PAGE_REVALIDATE_SECONDS;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSolutionsContent("pharma");
  const seo = STATIC_PAGE_SEO.lifeScience;
  const title = `${content.hero.titleLine1} ${content.hero.titleHighlight}`.trim();

  return createPageMetadata({
    title: title || seo.title,
    description: content.hero.subtitle || seo.description,
    path: seo.path,
  });
}

export default async function PharmaPage() {
  const content = await getSolutionsContent("pharma");
  return <SolutionsPage variant="pharma" content={content} />;
}
