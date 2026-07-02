"use client";

import { PlatformSecurity } from "@/components/landing/platform-security";
import { PlatformInfrastructure } from "@/components/landing/platform-infrastructure";
import { PlatformClinicalIntelligence } from "@/components/landing/platform-clinical-intelligence";
import { PlatformFeatures } from "@/components/landing/platform-features";
import { PlatformLongitudinalCare } from "@/components/landing/platform-longitudinal-care";
import { PlatformHero } from "@/components/landing/platform-hero";
import { GetInTouch } from "@/components/landing/get-in-touch";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import Link from "next/link";
import { CALENDLY_URL, NEWSLETTER_URL } from "@/lib/contact";

export default function PlatformPage() {
  const pageRef = useRef(null);

  const { scrollYProgress: pageScroll } = useScroll({
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
        <PlatformHero />
      </motion.div>
      <div className="min-h-screen" />
      <div className="relative z-999999999">
        <PlatformFeatures />
        <PlatformClinicalIntelligence />
        <PlatformLongitudinalCare />
        <PlatformInfrastructure />
        <PlatformSecurity />
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
              Build the Future of Rare Disease Care with IndiGeneUs.AI
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/55 sm:mt-6 sm:text-lg">
              Discover how AI-assisted clinical workflows, structured data intelligence, clinical
              decision support, and advanced analytics can help transform rare disease care across
              your institution.
            </p>
            <div className="mt-8 mb-10 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
              <Link
                href={CALENDLY_URL}
                className="bg-brand inline-flex rounded-lg px-7 py-3 text-sm font-medium text-white shadow-[0_4px_14px_rgba(2,67,133,0.35)] transition-colors hover:bg-[#01356b]"
              >
                Book a Demo
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
