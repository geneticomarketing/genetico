import type { Metadata } from "next";

import { SolutionsPage } from "@/components/landing/solutions-page";
import { getSolutionsContent } from "@/lib/cms/queries";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSolutionsContent("hospital");
  const seo = STATIC_PAGE_SEO.hospital;
  const title = `${content.hero.titleLine1} ${content.hero.titleHighlight}`.trim();

  return createPageMetadata({
    title: title || seo.title,
    description: content.hero.subtitle || seo.description,
    path: seo.path,
  });
}

export default async function HospitalPage() {
  const content = await getSolutionsContent("hospital");
  return <SolutionsPage variant="hospital" content={content} />;
}
