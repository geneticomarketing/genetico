"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { useRef } from "react";

import { EASE, Reveal, useInViewAnimation } from "@/components/motion/reveal";
import { useScrollMappedValue } from "@/lib/motion/scroll-value";

const PARTNERS = [
  { name: "10,000 Startups", logo: "/new/10000startups.png" },
  { name: "Amity University", logo: "/new/amity-logo.png" },
  { name: "BIRAC", logo: "/new/BIRAC Logo.jpg" },
  { name: "Catalyst", logo: "/new/Catalyst logo Black final.png" },
  {
    name: "HDFC Startup Buildup Parivartan",
    logo: "/new/HDFC-Startup-Buildup-Parivartan-Logo-Approved.jpg",
  },
  { name: "Indo-Sweden Innovation Centre", logo: "/new/indo-sweden.png" },
  { name: "JKEDI", logo: "/new/JKEDI.png" },
  { name: "MeitY Startup Hub", logo: "/new/meity.jpg" },
  { name: "Runway", logo: "/new/runway.jpg" },
  { name: "UPES", logo: "/new/upes.jpg" },
];

const FEATURES = [
  "Your institution retains full ownership and control of its data.",
  "Access is restricted based on user roles and responsibilities.",
  "Every action is securely logged for complete traceability.",
  "Data is protected through encryption in transit and at rest.",
  "Hosted on enterprise-grade infrastructure with continuous monitoring.",
];

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
      {/* <span className="text-center leading-tight font-light text-black/60">{name}</span> */}
    </div>
  );
}

function MarqueeRow({ reverse }: { reverse?: boolean }) {
  // Two identical groups sit side-by-side; the track translates by exactly one
  // group's width (the keyframe's -50%) for a seamless, gap-free loop.
  const group = [...PARTNERS, ...PARTNERS];
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
      whileHover={reduce ? undefined : { x: 8 }}
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
        className="text-[15px] text-white/80 transition-colors duration-300 ease-out group-hover:text-white sm:text-base"
      >
        {feature}
      </motion.span>
    </motion.li>
  );
}

function SecurityFeatures() {
  const reduce = useReducedMotion();
  const { ref, visible } = useInViewAnimation<HTMLOListElement>();
  const { scrollYProgress } = useScroll({
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

      {FEATURES.map((feature, i) => (
        <FeatureItem
          key={feature}
          feature={feature}
          index={i}
          count={FEATURES.length}
          progress={scrollYProgress}
          reduce={reduce}
        />
      ))}
    </motion.ol>
  );
}

export function PartnersSecurity() {
  return (
    <>
      {/* ───────── Customers & Advisors — light band ───────── */}
      <section className="bg-white px-6 py-24 sm:px-10 sm:py-28">
        <Reveal className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="t-heading text-black">Trusted Across the Rare Disease Ecosystem</h2>
            <p className="max-w-xl text-base text-black/55 sm:text-lg sm:leading-normal">
              Working alongside leading institutions, Centres of Excellence, government initiatives,
              research programs, and ecosystem partners.
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-6">
            <MarqueeRow />
            <MarqueeRow reverse />
          </div>
        </Reveal>
      </section>

      {/* ───────── Data Security & Compliance — blue band ───────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,#00060C_0%,#024385_50%,#0A4989_78%,#DDEEFF_145%)] px-6 py-24 sm:px-10 sm:py-32">
        <Reveal className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="flex flex-col gap-5 text-left lg:max-w-md">
              <h2
                className="t-heading max-w-none text-balance text-white"
                style={{ fontVariationSettings: '"SERF" 100' }}
              >
                Built for Trust. Designed for Healthcare.
              </h2>
              <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                Ensure data protection, privacy, and compliance with healthcare standards at every
                layer.
              </p>
            </div>

            <SecurityFeatures />
          </div>
        </Reveal>
      </section>
    </>
  );
}
