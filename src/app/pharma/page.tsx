"use client";

import { Reveal } from "@/components/motion/reveal";
import { CALENDLY_URL } from "@/lib/contact";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

function PharmaHero() {
  return (
    <section id="hero" className="relative bg-white md:h-dvh md:overflow-hidden">
      <div className="relative mx-auto w-full max-w-3xl px-5 pt-24 pb-12 text-center md:px-8 md:pt-28 md:pb-6">
        <h1 className="t-display mx-auto text-balance text-[#121212]">
          For <span className="text-brand">Pharma</span>
        </h1>
        <p className="secondaryFont mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#8f8f8f] md:mt-7 md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder content for the
          pharma solutions page.
        </p>
      </div>
    </section>
  );
}

function DummySection({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) {
  return (
    <section id={id} className="bg-white px-5 py-16 sm:px-10 sm:py-20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="t-heading text-balance text-[#121212]">{title}</h2>
        <p className="secondaryFont mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#8f8f8f]">
          {body}
        </p>
      </Reveal>
    </section>
  );
}

export default function PharmaPage() {
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
        <PharmaHero />
      </motion.div>
      {useFixedHero ? <div className="min-h-screen" aria-hidden /> : null}
      <div className="relative z-999999999 bg-white">
        <DummySection
          id="clinical-trials"
          title="Clinical trial acceleration"
          body="Dummy section describing how Genetico supports pharma teams with structured rare disease data and cohort identification."
        />
        <DummySection
          id="real-world-evidence"
          title="Real-world evidence"
          body="Placeholder copy for RWE workflows, registry integration, and longitudinal patient insights."
        />
        <DummySection
          id="partnerships"
          title="Partnership workflows"
          body="Temporary content for collaboration between pharma, centers of excellence, and research networks."
        />
        <section
          id="get-in-touch"
          className="relative overflow-hidden bg-[#F4F6F9] px-5 py-20 sm:px-10 sm:py-24 lg:py-32"
        >
          <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="t-heading mx-auto text-balance text-[#121212]">
              Ready to explore pharma solutions?
            </h2>
            <p className="secondaryFont mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#8f8f8f] sm:mt-6">
              Book a demo to learn more. This page uses placeholder content for now.
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
