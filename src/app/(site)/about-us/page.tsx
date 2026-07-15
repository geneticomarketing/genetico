import type { Metadata } from "next";

import { AboutFoundations } from "@/components/landing/about-foundations";
import { AboutHero } from "@/components/landing/about-hero";
import { PageCtaSection } from "@/components/landing/page-cta-section";
import { GrantsTimeline } from "@/components/ScrollSection";
import { LeadershipCarousel } from "@/components/Testimonials";
import { ScrollParallaxPage } from "@/components/motion/scroll-parallax-page";
import { getAboutPageData } from "@/lib/cms/page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

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

  return (
    <ScrollParallaxPage
      className="min-h-screen bg-[#050b14] text-white"
      hero={<AboutHero hero={data.hero} />}
    >
      <AboutFoundations vision={data.vision} foundations={data.foundations} />
      <section>
        <LeadershipCarousel team={data.team} leadership={data.leadership} />
      </section>
      <section>
        <GrantsTimeline section={data.grants} items={data.grantItems} />
      </section>
      <PageCtaSection
        heading={data.cta.heading}
        description={data.cta.description}
        buttons={data.cta.buttons}
      />
    </ScrollParallaxPage>
  );
}
