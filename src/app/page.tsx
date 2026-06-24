"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { Hero } from "@/components/landing/hero";
import { SystemBreaks } from "@/components/landing/system-breaks";
import { FoundationalPlatform } from "@/components/landing/foundational-platform";
import { EcosystemProblems } from "@/components/landing/ecosystem-problems";
import { PartnersSecurity } from "@/components/landing/partners-security";
import { HomeCta } from "@/components/landing/home-cta";
import { useRef } from "react";
export default function Home() {
  const pageRef = useRef(null);

  const { scrollYProgress: pageScroll } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(pageScroll, [0, 0.4], [1, 0.55]);
  const heroY = useTransform(pageScroll, [0, 0.4], ["0%", "50%"]);

  return (
    <>
      <main ref={pageRef} className="flex flex-1 flex-col">
        <motion.div
          className="fixed w-full"
          style={{
            scale: heroScale,
            y: heroY,
          }}
        >
          <Hero />
        </motion.div>
        <div className="min-h-screen"></div>
        <div className="relative z-999999999">
          <FoundationalPlatform />
          <SystemBreaks />
          <EcosystemProblems />
          <PartnersSecurity />
          <HomeCta />
        </div>
      </main>
    </>
  );
}
