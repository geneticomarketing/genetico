"use client";

import { PublicHealthHero } from "@/components/landing/public-health-hero";
import { PublicHealthDataSecurity } from "@/components/landing/public-health-data-security";
import { PublicHealthThreeTierModel } from "@/components/landing/public-health-three-tier-model";
import { PublicHealthTierArchitecture } from "@/components/landing/public-health-tier-architecture";
import { GetInTouch } from "@/components/landing/get-in-touch";
import { motion, useTransform } from "motion/react";
import { useRef } from "react";
import { useProjectScroll } from "@/lib/motion/use-project-scroll";
import { Reveal } from "@/components/motion/reveal";
import Link from "next/link";
import { NEWSLETTER_URL } from "@/lib/contact";

export default function PublicHealthPage() {
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
        <PublicHealthHero />
      </motion.div>
      <div className="min-h-screen" />
      <div className="relative z-999999999">
        <PublicHealthDataSecurity />
        <PublicHealthThreeTierModel />
        <PublicHealthTierArchitecture />
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
            <h2 className="t-heading mx-auto text-balance text-[#121212]">
              Are you interested in bringing IndiGeneUs.AI to your institution?
            </h2>
            <p className="secondaryFont mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#8f8f8f] sm:mt-6">
              Talk to our team for a pilot deployment
            </p>
            <div className="mt-8 mb-10 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
              <Link
                href="#lead-form"
                className="bg-brand inline-flex rounded-lg px-7 py-3 text-sm font-medium text-white shadow-[0_4px_14px_rgba(2,67,133,0.35)] transition-colors hover:bg-[#01356b]"
              >
                Request pilot
              </Link>
              <a
                href={NEWSLETTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg border border-black/15 bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-black/[0.03]"
              >
                Subscribe for Updates
              </a>
            </div>
          </Reveal>

          <GetInTouch embedded />
        </section>
      </div>
    </main>
  );
}
