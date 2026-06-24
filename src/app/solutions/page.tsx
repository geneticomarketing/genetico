"use client";

import { SolutionsClinicalBurden } from "@/components/landing/solutions-clinical-burden";
import { SolutionsHero } from "@/components/landing/solutions-hero";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Solutions() {
  const pageRef = useRef(null);

  const { scrollYProgress: pageScroll } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(pageScroll, [0, 0.4], [1, 0.55]);
  const heroY = useTransform(pageScroll, [0, 0.4], ["0%", "50%"]);

  return (
    <main ref={pageRef} className="flex flex-1 flex-col bg-white">
      <motion.div
        className="fixed w-full"
        style={{
          scale: heroScale,
          y: heroY,
        }}
      >
        <SolutionsHero />
      </motion.div>
      <div className="min-h-screen" />
      <div className="relative z-999999999 bg-white">
        <SolutionsClinicalBurden />
      </div>
    </main>
  );
}
