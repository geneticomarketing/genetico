"use client";

import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { useRef } from "react";

import { EASE, Reveal, useInViewAnimation } from "@/components/motion/reveal";
import { DEFAULT_HOME_PAGE, DEFAULT_PARTNERS } from "@/lib/cms/defaults/home";
import type { Partner } from "@/lib/cms/types";
import { useScrollMappedValue } from "@/lib/motion/scroll-value";
import { useProjectScroll } from "@/lib/motion/use-project-scroll";

const featureItemVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

function PartnerCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex w-40 shrink-0 scale-80 flex-col items-center justify-center gap-3">
      <div className="grid place-items-center">
        <img src={logo} alt={name} className="max-h-full max-w-full object-contain" />
      </div>
    </div>
  );
}

function MarqueeRow({ partners, reverse }: { partners: Partner[]; reverse?: boolean }) {
  // Two identical groups sit side-by-side; the track translates by exactly one
  // group's width (the keyframe's -50%) for a seamless, gap-free loop.
  const group = [...partners, ...partners];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className="animate-marquee flex w-max py-2"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {[0, 1].map((g) => (
          <div key={g} aria-hidden={g === 1} className="flex shrink-0 gap-12 pr-12">
            {group.map((p, i) => (
              <PartnerCard key={`${p.name}-${i}`} {...p} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureItem({
  feature,
  index,
  count,
  progress,
  reduce,
}: {
  feature: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const activateAt = count <= 1 ? 0 : index / (count - 1);
  const badgeOpacity = useScrollMappedValue(
    progress,
    [Math.max(0, activateAt - 0.14), activateAt + 0.02],
    reduce ? [1, 1] : [0.45, 1],
    !reduce,
  );
  const textOpacity = useScrollMappedValue(
    progress,
    [Math.max(0, activateAt - 0.1), activateAt + 0.08],
    reduce ? [0.8, 0.8] : [0.55, 1],
    !reduce,
  );

  return (
    <motion.li
      variants={reduce ? undefined : featureItemVariants}
      // whileHover={reduce ? undefined : { x: 8 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group relative z-10 flex cursor-default items-center gap-4"
    >
      <motion.span
        style={reduce ? undefined : { opacity: badgeOpacity }}
        className="bg-brand grid size-7 shrink-0 place-items-center rounded-full border border-white/25 text-[11px] font-medium text-white/60 transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-white/50 group-hover:text-white/90"
      >
        {index + 1}
      </motion.span>
      <motion.span
        style={reduce ? undefined : { opacity: textOpacity }}
        className="text-[15px] text-white/80 duration-300 ease-out group-hover:text-white sm:text-base group-hover:scale-101 group-hover:translate-x-5"
      >
        {feature}
      </motion.span>
    </motion.li>
  );
}

function SecurityFeatures({ securityFeatures }: { securityFeatures: string[] }) {
  const reduce = useReducedMotion();
  const { ref, visible } = useInViewAnimation<HTMLOListElement>();
  const { scrollYProgress } = useProjectScroll({
    target: ref,
    offset: ["start 0.88", "end 0.75"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.ol
      ref={ref}
      className="relative flex flex-col gap-5 lg:ml-auto lg:w-fit"
      initial={reduce ? false : "hidden"}
      animate={visible ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
      }}
    >
      <div
        className="pointer-events-none absolute top-3.5 bottom-3.5 left-[13px] w-px -translate-x-1/2"
        aria-hidden
      >
        <div className="absolute inset-0 bg-white/15" />
        {reduce ? (
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/55 to-white/80" />
        ) : (
          <motion.div
            className="absolute top-0 left-0 h-full w-full origin-top bg-gradient-to-b from-white/25 via-white/60 to-white"
            style={{ scaleY: lineScale }}
          />
        )}
      </div>

      {securityFeatures.map((feature, i) => (
        <FeatureItem
          key={feature}
          feature={feature}
          index={i}
          count={securityFeatures.length}
          progress={scrollYProgress}
          reduce={reduce}
        />
      ))}
    </motion.ol>
  );
}

export function PartnersSecurity({
  partnersSection = DEFAULT_HOME_PAGE.partnersSection,
  securitySection = DEFAULT_HOME_PAGE.securitySection,
  partners = DEFAULT_PARTNERS,
  securityFeatures = DEFAULT_HOME_PAGE.securitySection.features,
  about,
}: {
  partnersSection?: { heading: string; description: string };
  securitySection?: { heading: string; description: string };
  partners?: Partner[];
  securityFeatures?: string[];
  about?: boolean;
}) {
  return (
    <>
      {/* ───────── Customers & Advisors — light band ───────── */}
      <section className="bg-white   px-6 pb-24 sm:px-10 sm:pb-28">
        <Reveal className="mx-auto w-full max-w-7xl">
          {about && (
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="t-heading text-[#010207]">{partnersSection.heading}</h2>
              <p className="max-w-xl text-base text-[#010207]/55 sm:text-lg sm:leading-normal">
                {partnersSection.description}
              </p>
            </div>
          )}

          <div className=" flex flex-col gap-6">
            <MarqueeRow partners={partners} />
            {/* <MarqueeRow partners={partners} reverse /> */}
          </div>
        </Reveal>
      </section>

      {/* ───────── Data Security & Compliance — blue band ───────── */}
      <section className="bg-brand-band relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32">
        <Reveal className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="flex flex-col gap-5 text-left lg:max-w-md">
              <h2
                className="t-heading max-w-none text-balance text-white"
                style={{ fontVariationSettings: '"SERF" 100' }}
              >
                {securitySection.heading}
              </h2>
              <p className="text-[1em] leading-relaxed text-white/70 sm:text-[1em]">
                {securitySection.description}
              </p>
            </div>

            <SecurityFeatures securityFeatures={securityFeatures} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
