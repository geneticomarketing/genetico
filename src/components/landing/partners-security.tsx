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

import { EASE, Reveal } from "@/components/motion/reveal";

const PARTNERS = [
  { name: "AIIMS Delhi", logo: "/logos/customers/AIIMS Delhi.png" },
  { name: "CDFD", logo: "/logos/customers/CDFC.png" },
  { name: "Gangaram Hospital", logo: "/logos/customers/Gangaram Hospital.png" },
  { name: "Purple Gene Clinic", logo: "/logos/customers/Purple Gene Clinic.png" },
  { name: "Birac", logo: "/logos/customers/Birac.png" },
  { name: "BGCI", logo: "/logos/customers/BGCI.png" },
  { name: "JKEDI", logo: "/logos/customers/JKEDI.png" },
];

const FEATURES = [
  "Your institution retains full ownership and control of its data.",
  "Access is restricted based on user roles and responsibilities.",
  "Every action is securely logged for complete traceability.",
  "Data is protected through encryption in transit and at rest.",
  "Hosted on enterprise-grade infrastructure with continuous monitoring.",
  "Security and privacy are built into every workflow.",
  "Institutions define how and when data can be shared.",
  "Purpose-built to securely manage sensitive clinical and genetic information.",
];

const featureItemVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

function PartnerCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex w-40 shrink-0 flex-col items-center gap-3">
      <img src={logo} alt={name} className="h-20 w-full object-contain object-center" />
      <span className="text-center text-xs leading-tight font-light text-black/60">{name}</span>
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
  const badgeOpacity = useTransform(
    progress,
    [Math.max(0, activateAt - 0.14), activateAt + 0.02],
    reduce ? [1, 1] : [0.45, 1],
  );
  const textOpacity = useTransform(
    progress,
    [Math.max(0, activateAt - 0.1), activateAt + 0.08],
    reduce ? [0.8, 0.8] : [0.55, 1],
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
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.88", "end 0.42"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.ol
      ref={listRef}
      className="relative flex flex-col gap-5 lg:ml-auto lg:w-fit"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
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
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            {/* Heading */}
            <div className="flex flex-col gap-3">
              <h2 className="t-heading text-white">Data Security</h2>
              <p className="text-base text-white/70 sm:text-lg">
                Built for clinical-grade security and privacy
              </p>
            </div>

            {/* Numbered assurances */}
            <SecurityFeatures />
          </div>
        </Reveal>
      </section>
    </>
  );
}
