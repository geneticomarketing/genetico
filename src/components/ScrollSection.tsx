"use client";

import { memo, useRef } from "react";
import { motion, useTransform, useInView } from "motion/react";
import { useProjectScroll } from "@/lib/motion/use-project-scroll";
import { Reveal, VIEWPORT } from "./motion/reveal";

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  icon: string;
  category: "left" | "right";
}

const timelineData: TimelineItem[] = [
  {
    year: "2019",
    title: "Biotech Ignition Grant — BIRAC",
    subtitle: "Department of Biotechnology, Govt. of India",
    icon: "/logos/grants/1.png",
    category: "left",
  },
  {
    year: "2020",
    title: "Seed Investment — IIT Mandi",
    subtitle: "NIDHI SSS",
    icon: "/logos/grants/2.png",
    category: "right",
  },
  {
    year: "2022",
    title: "India-Sweden Healthcare Innovation Challenge",
    subtitle: "Winner",
    icon: "/logos/grants/3.png",
    category: "left",
  },
  {
    year: "2024",
    title: "Startup Maharathi Award",
    subtitle: "Startup Mahakumbh — Hon'ble Minister Piyush Goyal",
    icon: "/logos/grants/4.png",
    category: "right",
  },
  {
    year: "2024",
    title: "HDFC Bank Parivartan CSR Grant",
    subtitle: "Corporate Social Responsibility",
    icon: "/logos/grants/5.png",
    category: "left",
  },
  {
    year: "2025",
    title: "Scale-up Grant — MeitY",
    subtitle: "Ministry of Electronics & Information Technology",
    icon: "/logos/grants/6.png",
    category: "right",
  },
];

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
          <p className="mt-0.5 text-[8px] tracking-widest text-teal-400 uppercase sm:text-[9px]">
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
  const isInView = useInView(ref, VIEWPORT);
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
        <div className="mb-2 text-[11px] font-semibold tracking-[0.22em] text-blue-300/70 uppercase">
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
      className="absolute top-0 bottom-0 left-4 w-[2px] -translate-x-1/2 sm:left-1/2 sm:-translate-x-1/2"
      style={{ background: "rgba(30,64,175,0.3)" }}
    >
      <motion.div
        style={{ scaleY, originY: 0, height: "100%" }}
        className="w-full bg-gradient-to-b from-blue-500 to-blue-400/40"
      />
    </div>
  );
}

function GrantsTimelineComponent() {
  return (
    <section
      className="min-h-screen px-4 py-16 sm:px-4 sm:py-20"
      style={{
        background: "linear-gradient(160deg , #010E20 , #024385 , #012A54)",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 text-center sm:mb-20"
      >
        <Reveal>
          <p className="mb-3 text-[10px] tracking-[0.25em] text-blue-400 uppercase">
            Recognition
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <h1
            className="mb-4 text-3xl leading-tight font-light tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Rewards &amp; Recognition
          </h1>
        </Reveal>
        <Reveal delay={0.6}>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-blue-300/60">
            Recognized and supported by leading government bodies, incubators, and innovation
            programs across India.
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
