import type { Metadata } from "next";

import { AboutFoundations } from "@/components/landing/about-foundations";
import { AboutHero } from "@/components/landing/about-hero";
import { PageCtaSection } from "@/components/landing/page-cta-section";
import { GrantsTimeline } from "@/components/ScrollSection";
import { LeadershipCarousel } from "@/components/Testimonials";
import { ScrollParallaxPage } from "@/components/motion/scroll-parallax-page";
import { getAboutPageData, getHomePageData } from "@/lib/cms/page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";
import { PartnersSecurity } from "@/components/landing/partners-security";

export const revalidate = 60;

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
  const data2 = await getHomePageData();

  return (
    <ScrollParallaxPage
      className="min-h-screen bg-[#050b14] text-white"
      hero={<AboutHero hero={data.hero} />}
      fixedHeroFromMd
    >
      <AboutFoundations vision={data.vision} foundations={data.foundations} />
      <LeadershipCarousel team={data.team} leadership={data.leadership} />
      <section className="overflow-y-hidden">
        <GrantsTimeline section={data.grants} items={data.grantItems} />
      </section>

      <section className="bg-white">
        <PartnersSecurity
          about={true}
          partnersSection={data2.partnersSection}
          securitySection={data2.securitySection}
          partners={data2.partners}
          securityFeatures={data2.securitySection.features}
        />
      </section>

      <PageCtaSection
        heading={data.cta.heading}
        description={data.cta.description}
        buttons={data.cta.buttons}
      />
    </ScrollParallaxPage>
  );
}
