import type { Metadata } from "next";

import { PageCtaSection } from "@/components/landing/page-cta-section";
import { PlatformClinicalIntelligence } from "@/components/landing/platform-clinical-intelligence";
import { PlatformFeatures } from "@/components/landing/platform-features";
import { PlatformHero } from "@/components/landing/platform-hero";
import { PlatformInfrastructure } from "@/components/landing/platform-infrastructure";
import { PlatformLongitudinalCare } from "@/components/landing/platform-longitudinal-care";
import { PlatformSecurity } from "@/components/landing/platform-security";
import { ScrollParallaxPage } from "@/components/motion/scroll-parallax-page";
import { getPlatformPageData } from "@/lib/cms/page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

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

  return (
    <ScrollParallaxPage hero={<PlatformHero hero={data.hero} />}>
      <PlatformFeatures section={data.featuresSection} />
      <PlatformClinicalIntelligence section={data.clinicalIntelligence} />
      <PlatformLongitudinalCare section={data.longitudinalCare} />
      <PlatformInfrastructure section={data.infrastructure} />
      <PlatformSecurity section={data.security} />
      <PageCtaSection
        heading={data.cta.heading}
        description={data.cta.description}
        buttons={data.cta.buttons}
        descriptionClassName="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/55 sm:mt-6 sm:text-lg"
      />
    </ScrollParallaxPage>
  );
}
