import type { Metadata } from "next";

import { PageCtaSection } from "@/components/landing/page-cta-section";
import { PublicHealthDataSecurity } from "@/components/landing/public-health-data-security";
import { PublicHealthHero } from "@/components/landing/public-health-hero";
import { PublicHealthThreeTierModel } from "@/components/landing/public-health-three-tier-model";
import { PublicHealthTierArchitecture } from "@/components/landing/public-health-tier-architecture";
import { ScrollParallaxPage } from "@/components/motion/scroll-parallax-page";
import { getPublicHealthPageData } from "@/lib/cms/page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

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

  return (
    <ScrollParallaxPage hero={<PublicHealthHero hero={data.hero} />}>
      <PublicHealthDataSecurity section={data.impact} />
      <PublicHealthThreeTierModel section={data.threeTier} />
      <PublicHealthTierArchitecture section={data.architecture} />
      <PageCtaSection
        heading={data.cta.heading}
        description={data.cta.description}
        buttons={data.cta.buttons}
      />
    </ScrollParallaxPage>
  );
}
