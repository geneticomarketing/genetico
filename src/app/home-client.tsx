"use client";

import { motion, useTransform } from "motion/react";
import { useRef } from "react";

import { EcosystemProblems } from "@/components/landing/ecosystem-problems";
import { FoundationalPlatform } from "@/components/landing/foundational-platform";
import { Hero } from "@/components/landing/hero";
import { HomeCta } from "@/components/landing/home-cta";
import { NewsUpdates } from "@/components/landing/news-updates";
import { PartnersSecurity } from "@/components/landing/partners-security";
import { SystemBreaks } from "@/components/landing/system-breaks";
import type { HomePageData } from "@/lib/cms/types";
import { useProjectScroll } from "@/lib/motion/use-project-scroll";

export function HomeClient({ data }: { data: HomePageData }) {
  const pageRef = useRef(null);

  const { scrollYProgress: pageScroll } = useProjectScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(pageScroll, [0, 0.4], [1, 0.55]);
  const heroY = useTransform(pageScroll, [0, 0.4], ["0%", "50%"]);

  return (
    <main ref={pageRef} className="flex flex-1 flex-col">
      <motion.div
        className="fixed w-full"
        style={{
          scale: heroScale,
          y: heroY,
        }}
      >
        <Hero slides={data.heroSlides} />
      </motion.div>
      <div className="min-h-screen"></div>
      <div className="relative z-999999999">
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
      </div>
    </main>
  );
}
