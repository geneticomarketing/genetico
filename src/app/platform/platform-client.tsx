"use client";

import { PlatformClinicalIntelligence } from "@/components/landing/platform-clinical-intelligence";
import { PlatformFeatures } from "@/components/landing/platform-features";
import { PlatformHero } from "@/components/landing/platform-hero";
import { PlatformInfrastructure } from "@/components/landing/platform-infrastructure";
import { PlatformLongitudinalCare } from "@/components/landing/platform-longitudinal-care";
import { PlatformSecurity } from "@/components/landing/platform-security";
import { CtaButtons } from "@/components/landing/cta-buttons";
import { GetInTouch } from "@/components/landing/get-in-touch";
import { Reveal } from "@/components/motion/reveal";
import type { PlatformPageData } from "@/lib/cms/types";
import { useProjectScroll } from "@/lib/motion/use-project-scroll";
import { motion, useTransform } from "motion/react";
import { useRef } from "react";

export function PlatformClient({ data }: { data: PlatformPageData }) {
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
        <PlatformHero hero={data.hero} />
      </motion.div>
      <div className="min-h-screen" />
      <div className="relative z-999999999">
        <PlatformFeatures section={data.featuresSection} />
        <PlatformClinicalIntelligence section={data.clinicalIntelligence} />
        <PlatformLongitudinalCare section={data.longitudinalCare} />
        <PlatformInfrastructure section={data.infrastructure} />
        <PlatformSecurity section={data.security} />
        <section
          id="get-in-touch"
          className="relative overflow-hidden bg-[#F4F6F9] px-5 pt-20 sm:px-10 sm:pt-24 lg:pt-32"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img
              src="/dna.svg"
              alt=""
              className="absolute top-1/2 right-[-18%] h-[140%] w-auto max-w-none -translate-y-1/2 scale-x-[-1] opacity-90"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,#F4F6F9_35%,transparent_100%)]" />
          </div>

          <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="t-heading mx-auto text-balance text-[#121212]">{data.cta.heading}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/55 sm:mt-6 sm:text-lg">
              {data.cta.description}
            </p>
            <CtaButtons buttons={data.cta.buttons} className="mt-8 mb-10 sm:mt-10" />
          </Reveal>

          <GetInTouch embedded />
        </section>
      </div>
    </main>
  );
}
