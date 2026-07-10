import type { Metadata } from "next";

import { EcosystemProblems } from "@/components/landing/ecosystem-problems";
import { FoundationalPlatform } from "@/components/landing/foundational-platform";
import { Hero } from "@/components/landing/hero";
import { HomeCta } from "@/components/landing/home-cta";
import { NewsUpdates } from "@/components/landing/news-updates";
import { PartnersSecurity } from "@/components/landing/partners-security";
import { SystemBreaks } from "@/components/landing/system-breaks";
import { ScrollParallaxPage } from "@/components/motion/scroll-parallax-page";
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

  return (
    <ScrollParallaxPage hero={<Hero slides={data.heroSlides} />}>
      <FoundationalPlatform
        eyebrow={data.whoWeAre.eyebrow}
        paragraphs={data.whoWeAre.paragraphs}
      />
      <SystemBreaks
        heading={data.ecosystemChallenges.heading}
        description={data.ecosystemChallenges.description}
        modules={data.modules}
      />
      <EcosystemProblems
        heading={data.ecosystemGapsSection.heading}
        description={data.ecosystemGapsSection.description}
        gaps={data.gaps}
      />
      <PartnersSecurity
        partnersSection={data.partnersSection}
        securitySection={data.securitySection}
        partners={data.partners}
        securityFeatures={data.securitySection.features}
      />
      <NewsUpdates
        newsSection={data.newsSection}
        featured={data.newsFeatured}
        articles={data.newsArticles}
      />
      <HomeCta cta={data.cta} />
    </ScrollParallaxPage>
  );
}
