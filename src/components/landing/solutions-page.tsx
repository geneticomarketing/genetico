"use client";

import { SolutionsClinicalBurden } from "@/components/landing/solutions-clinical-burden";
import { SolutionsHero } from "@/components/landing/solutions-hero";
import { SolutionsHowItWorks } from "@/components/landing/solutions-how-it-works";
import { SolutionsMeasurableOutcomes } from "@/components/landing/solutions-measurable-outcomes";
import { Reveal } from "@/components/motion/reveal";
import { CALENDLY_URL } from "@/lib/contact";
import { getSolutionsContent, type SolutionsVariant } from "@/lib/solutions-content";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

export function SolutionsPage({ variant }: { variant: SolutionsVariant }) {
  const content = getSolutionsContent(variant);
  const pageRef = useRef(null);
  const [scrollFx, setScrollFx] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setScrollFx(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress: pageScroll } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(pageScroll, [0, 0.4], [1, 0.55]);
  const heroY = useTransform(pageScroll, [0, 0.4], ["0%", "20%"]);
  const useFixedHero = scrollFx === true;

  return (
    <main ref={pageRef} className="flex flex-1 flex-col bg-white max-md:overflow-x-hidden">
      <motion.div
        className={useFixedHero ? "fixed w-full" : "relative w-full"}
        style={useFixedHero ? { scale: heroScale, y: heroY } : undefined}
      >
        <SolutionsHero variant={variant} />
      </motion.div>
      {useFixedHero ? <div className="min-h-screen" aria-hidden /> : null}
      <div className="relative z-999999999 bg-white">
        <SolutionsClinicalBurden variant={variant} />
        <SolutionsHowItWorks variant={variant} />
        <SolutionsMeasurableOutcomes variant={variant} />
        <section
          id="get-in-touch"
          className="relative overflow-hidden bg-[#F4F6F9] px-5 py-20 sm:px-10 sm:py-24 lg:py-32"
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
              {content.cta.headingLine1}
              <br />
              {content.cta.headingLine2}
            </h2>
            <p className="secondaryFont mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#8f8f8f] sm:mt-6">
              {content.cta.description}
            </p>
            <Link
              href={CALENDLY_URL}
              className="bg-brand mt-8 inline-flex rounded-lg px-7 py-3 text-sm font-medium text-white shadow-[0_4px_14px_rgba(2,67,133,0.35)] transition-colors hover:bg-[#01356b] sm:mt-10"
            >
              Book a Demo
            </Link>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
