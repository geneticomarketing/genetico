"use client";

import { memo, useRef } from "react";
import { motion, useTransform, useInView } from "motion/react";
import { useProjectScroll } from "@/lib/motion/use-project-scroll";
import { Reveal, VIEWPORT } from "./motion/reveal";
import type { GrantAward } from "@/lib/cms/types";
import { DEFAULT_ABOUT_PAGE, DEFAULT_GRANTS } from "@/lib/cms/defaults/about";

interface TimelineItem extends GrantAward {
  category: "left" | "right";
}

function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <div className="blurig rounded-2xl">
      <div className="flex w-full items-center gap-2.5 rounded-2xl p-3 px-4 sm:px-5">
        <img
          src={item.icon}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-gray-900 sm:h-9 sm:w-9"
        >
          {/* {item.icon} */}
        </img>
        <div className="min-w-0">
          <p className="text-sm leading-tight font-semibold text-blue-50 sm:text-[0.9375rem]">
            {item.title}
          </p>
          <p className="t-badge mt-0.5 text-[8px] tracking-widest text-teal-400 uppercase sm:text-[9px]">
            {item.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function TimelineDot({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={
          isActive
            ? {
                // borderColor: "#60a5fa",
                boxShadow: "0 0 0 8px rgba(96,165,250,0.15)",
              }
            : {
                // borderColor: "#1e40af",
                boxShadow: "0 0 0 0px rgba(96,165,250,0)",
              }
        }
        transition={{ duration: 0.4 }}
        className="throbbing-bg2 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-[#60a5fa]"
      >
        {/* <motion.div
          animate={
            isActive
              ? { scale: 1.4, backgroundColor: "#60a5fa" }
              : { scale: 1, backgroundColor: "#1e40af" }
          }
          transition={{ duration: 0.4 }}
          className="h-1.5 w-1.5 rounded-full"
        /> */}
      </motion.div>
    </div>
  );
}

const CARD_VARIANTS = {
  hidden: (isLeft: boolean) => ({
    opacity: 0,
    x: isLeft ? -40 : 40,
  }),
  visible: (isLeft: boolean) => ({
    opacity: 1,
    x: !isLeft ? 50 : -50,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const MOBILE_CARD_VARIANTS = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const YEAR_VARIANTS = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
};

function TimelineRow({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // No `once` — stays hidden until scroll reaches it, re-hides if scrolled back
  // margin: top offset pushes trigger point to ~40% down the viewport
  const isInView = useInView(ref, {
    once: false,
    amount: 1,
    margin: "0px 0px -30% 0px",
  });
  const isLeft = item.category === "left";

  return (
    <div
      ref={ref}
      className="relative mb-8 flex items-start gap-4 sm:mb-12 sm:items-center sm:gap-0"
      style={{ minHeight: 100 }}
    >
      {/* Left side */}
      <div className="hidden flex-1 justify-end pr-7 sm:flex">
        {isLeft ? (
          <motion.div
            custom={true}
            // @ts-expect-error later ig
            variants={CARD_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <TimelineCard item={item} />
          </motion.div>
        ) : (
          <motion.span
            variants={YEAR_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="self-center text-[13px] font-semibold text-blue-400/60"
          >
            {item.year}
          </motion.span>
        )}
      </div>

      {/* Center dot */}
      <div className="pt-5 sm:pt-0">
        <TimelineDot isActive={isInView} />
      </div>

      {/* Right side */}
      <div className="hidden flex-1 justify-start pl-7 sm:flex">
        {!isLeft ? (
          <motion.div
            custom={false}
            // @ts-expect-error later ig
            variants={CARD_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <TimelineCard item={item} />
          </motion.div>
        ) : (
          <motion.span
            variants={YEAR_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="self-center text-[13px] font-semibold text-blue-400/60"
          >
            {item.year}
          </motion.span>
        )}
      </div>

      {/* Mobile stack */}
      <div className="flex min-w-0 flex-1 flex-col sm:hidden">
        <div className="t-badge mb-2 text-[11px] font-semibold tracking-[0.22em] text-blue-300/70 uppercase">
          {item.year}
        </div>
        <motion.div
          variants={MOBILE_CARD_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <TimelineCard item={item} />
        </motion.div>
      </div>
    </div>
  );
}

function ProgressLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useProjectScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="absolute top-0 bottom-0 left-2 h-[160vh] w-[2px] -translate-x-1/2 sm:left-1/2 sm:-translate-x-1/2"
      style={{ background: "rgba(30,64,175,0.3)" }}
    >
      <motion.div
        style={{ scaleY, originY: 0, height: "100%" }}
        className="w-full bg-gradient-to-b from-blue-500 to-blue-400/40"
      />
    </div>
  );
}

function GrantsTimelineComponent({
  section = DEFAULT_ABOUT_PAGE.grants,
  items = DEFAULT_GRANTS,
}: {
  section?: { eyebrow: string; heading: string; description: string };
  items?: GrantAward[];
}) {
  const timelineData: TimelineItem[] = items.map((item, index) => ({
    ...item,
    category: item.category ?? (index % 2 === 0 ? "left" : "right"),
  }));

  return (
    <section className="bg-brand-band min-h-screen px-4 py-16 sm:px-4 sm:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 text-center sm:mb-20"
      >
        <Reveal className="mx-auto w-full max-w-4xl text-center relative flex items-center justify-center gap-4 sm:gap-6 mb-5">
          <span
            aria-hidden
            className="throbbing-bgH h-px w-12 shrink-0 rounded-full sm:w-20 md:w-28"
          />
          <p className="font-jetbrains-mono text-sm font-medium tracking-[0.08em] text-white">
            {section.eyebrow}
          </p>
          <span
            aria-hidden
            className="throbbing-bgH h-px w-12 shrink-0 rounded-full sm:w-20 md:w-28"
          />
        </Reveal>
        <Reveal delay={0.4} className="t-intro mx-auto">
          <h1
            className="mb-4 text-3xl leading-tight font-light tracking-tight text-white sm:text-[3.25rem]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {section.heading}
          </h1>
          <p className="t-subhead sm:text-[1rem] leading-relaxed text-blue-300/60">
            {section.description}
          </p>
        </Reveal>
      </motion.div>

      {/* Timeline */}
      <div className="relative mx-auto max-w-4xl max-lg:max-w-2xl">
        <ProgressLine />
        {timelineData.map((item, i) => (
          <TimelineRow key={item.year + i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
export const GrantsTimeline = memo(GrantsTimelineComponent);
