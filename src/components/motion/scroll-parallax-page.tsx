"use client";

import { motion, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { useProjectScroll } from "@/lib/motion/use-project-scroll";

type ScrollParallaxPageProps = {
  hero: ReactNode;
  children: ReactNode;
  className?: string;
  /** End value for the hero Y transform (default `"50%"`). */
  heroYEnd?: string;
  /**
   * When true, the fixed parallax hero only applies from the `md` breakpoint up
   * (used by Solutions pages). SSR defaults to a relative hero.
   */
  fixedHeroFromMd?: boolean;
};

/**
 * Client island for page-level scroll parallax. Pass server-rendered `hero` and
 * `children` so CMS content stays in the RSC tree while motion stays local.
 */
export function ScrollParallaxPage({
  hero,
  children,
  className = "flex flex-1 flex-col",
  heroYEnd = "50%",
  fixedHeroFromMd = false,
}: ScrollParallaxPageProps) {
  const pageRef = useRef(null);
  const [scrollFx, setScrollFx] = useState<boolean | null>(fixedHeroFromMd ? null : true);

  useLayoutEffect(() => {
    if (!fixedHeroFromMd) {
      setScrollFx(true);
      return;
    }

    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setScrollFx(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [fixedHeroFromMd]);

  const { scrollYProgress: pageScroll } = useProjectScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(pageScroll, [0, 0.4], [1, 0.55]);
  const heroY = useTransform(pageScroll, [0, 0.4], ["0%", heroYEnd]);
  const useFixedHero = scrollFx === true;

  return (
    <main ref={pageRef} className={className}>
      <motion.div
        className={useFixedHero ? "fixed w-full overflow-hidden" : "relative w-full"}
        style={useFixedHero ? { scale: heroScale, y: heroY } : undefined}
      >
        {hero}
      </motion.div>
      {useFixedHero ? <div className="min-h-screen" aria-hidden /> : null}
      <div className="relative z-999999999">{children}</div>
    </main>
  );
}
