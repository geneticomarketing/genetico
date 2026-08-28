"use client";

import { Clock, Database, FlaskConical, Minus, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";

import { Reveal } from "@/components/motion/reveal";
import { useScrollMappedValue } from "@/lib/motion/scroll-value";
import { useProjectScroll } from "@/lib/motion/use-project-scroll";
import { getSolutionsContent, type SolutionsVariant } from "@/lib/solutions-content";

const RING_RADIUS = 54;
const RING_STROKE = 7;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

type OutcomeMetric = {
  id: string;
  maxPercent: number;
  icon: LucideIcon;
  label: string;
  ringTrack: string;
  ringFill: string;
  accent: string;
  fromText: string;
  toText: string;
  negative?: string;
  positive: string;
  positiveIconBg: string;
  centerValue?: string;
  hideCenterSubLabel?: boolean;
};

const METRIC_ICONS: Record<string, LucideIcon> = {
  time: Clock,
  diagnosis: FlaskConical,
  data: Database,
  preparation: Clock,
  consistency: FlaskConical,
  evidence: Database,
};

function ProgressRing({
  metric,
  progress,
  reduce,
}: {
  metric: OutcomeMetric;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const fillRatio = useTransform(progress, [0, 1], [0, metric.maxPercent / 100]);
  const dashOffset = useTransform(fillRatio, (ratio) => CIRCUMFERENCE * (1 - ratio));
  const displayValue = useTransform(fillRatio, (ratio) => Math.round(ratio * metric.maxPercent));
  const percentLabel = useMotionTemplate`${displayValue}%`;

  const Icon = metric.icon;

  return (
    <div className="relative mx-auto size-[9.5rem] sm:size-[10.5rem]">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          stroke={metric.ringTrack}
          strokeWidth={RING_STROKE}
        />
        {reduce ? (
          <circle
            cx="60"
            cy="60"
            r={RING_RADIUS}
            fill="none"
            stroke={metric.ringFill}
            strokeWidth={RING_STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - metric.maxPercent / 100)}
          />
        ) : (
          <motion.circle
            cx="60"
            cy="60"
            r={RING_RADIUS}
            fill="none"
            stroke={metric.ringFill}
            strokeWidth={RING_STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            style={{ strokeDashoffset: dashOffset }}
          />
        )}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <Icon
          className="size-4 mb-1"
          style={{ color: metric.accent }}
          strokeWidth={1.75}
          aria-hidden
        />
        {metric.centerValue ? (
          <span
            className="mainFont px-2 text-center text-[clamp(1rem,2.2vw,1.35rem)] leading-tight font-medium text-[#121212]"
            style={{ fontVariationSettings: '"SERF" 100' }}
          >
            {metric.centerValue}
          </span>
        ) : reduce ? (
          <span
            className="mainFont text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-none text-[#121212]"
            style={{ fontVariationSettings: '"SERF" 100' }}
          >
            {metric.maxPercent}%
          </span>
        ) : (
          <motion.span
            className="mainFont text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-none text-[#121212] tabular-nums"
            style={{ fontVariationSettings: '"SERF" 100' }}
          >
            {percentLabel}
          </motion.span>
        )}
        {!metric.hideCenterSubLabel && (
          <span className="t-badge secondaryFont mt-1 text-[0.62rem] font-semibold tracking-[0.22em] text-[#a3afc4] uppercase">
            BETTER
          </span>
        )}
      </div>
    </div>
  );
}

function OutcomeColumn({
  metric,
  index,
  progress,
  reduce,
}: {
  metric: OutcomeMetric;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const stagger = index * 0.06;
  const toOpacity = useScrollMappedValue(
    progress,
    [stagger + 0.08, stagger + 0.32],
    reduce ? [1, 1] : [0.2, 1],
    !reduce,
  );
  const fromOpacity = useScrollMappedValue(
    progress,
    [stagger, stagger + 0.2],
    reduce ? [0.55, 0.55] : [0.15, 0.55],
    !reduce,
  );
  const dividerScale = useTransform(
    progress,
    [stagger + 0.28, stagger + 0.48],
    reduce ? [1, 1] : [0, 1],
  );
  const negativeOpacity = useScrollMappedValue(
    progress,
    [stagger + 0.38, stagger + 0.58],
    reduce ? [1, 1] : [0.2, 1],
    !reduce,
  );
  const positiveOpacity = useScrollMappedValue(
    progress,
    [stagger + 0.52, stagger + 0.78],
    reduce ? [1, 1] : [0.2, 1],
    !reduce,
  );
  const positiveWeight = useTransform(
    progress,
    [stagger + 0.52, stagger + 0.78],
    reduce ? [600, 600] : [400, 600],
  );

  return (
    <div className="flex flex-col items-center text-center">
      <ProgressRing metric={metric} progress={progress} reduce={reduce} />

      <p
        className="t-badge secondaryFont mt-6 text-[0.65rem] font-semibold tracking-[0.12em]"
        style={{ color: metric.accent }}
      >
        {metric.label}
      </p>

      <p className="secondaryFont mt-3 text-[0.95rem] sm:text-base">
        <motion.span
          style={reduce ? undefined : { opacity: fromOpacity }}
          className="text-[#a3afc4] line-through decoration-[#c5cdd8]"
        >
          {metric.fromText}
        </motion.span>
        <motion.span
          style={reduce ? undefined : { opacity: toOpacity, color: metric.accent }}
          className="mx-1.5"
        >
          →
        </motion.span>
        <motion.span
          style={reduce ? undefined : { opacity: toOpacity }}
          className="font-semibold text-[#121212]"
        >
          {metric.toText}
        </motion.span>
      </p>

      <div className="mt-5 w-full max-w-xs">
        <motion.div
          aria-hidden
          className="mx-auto h-px w-full max-w-[200px] origin-center bg-[#e8ebf0]"
          style={reduce ? undefined : { scaleX: dividerScale }}
        />

        <ul className="secondaryFont mt-5 space-y-3 text-left text-[0.85rem] sm:text-[0.9rem]">
          {metric.negative ? (
            <motion.li
              style={reduce ? undefined : { opacity: negativeOpacity }}
              className="flex items-start gap-2.5 text-[#a3afc4]"
            >
              <span
                aria-hidden
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#fce8ea]"
              >
                <Minus className="size-3 text-[#c0392b]" strokeWidth={2.5} />
              </span>
              {metric.negative}
            </motion.li>
          ) : null}

          <motion.li
            style={reduce ? undefined : { opacity: positiveOpacity, fontWeight: positiveWeight }}
            className="flex items-start gap-2.5 text-[#121212]"
          >
            <span
              aria-hidden
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: metric.positiveIconBg }}
            >
              <Check className="size-3 text-white" strokeWidth={2.5} />
            </span>
            {metric.positive}
          </motion.li>
        </ul>
      </div>
    </div>
  );
}

export function SolutionsMeasurableOutcomes({
  content,
}: {
  content: import("@/lib/solutions-content").SolutionsContent["measurableOutcomes"];
}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const metrics: OutcomeMetric[] = content.metrics.map((metric) => ({
    ...metric,
    icon: METRIC_ICONS[metric.id] ?? Database,
  }));

  const { scrollYProgress } = useProjectScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  return (
    <section
      id="measurable-outcomes"
      className="bg-white px-gutter py-section text-[#121212]"
    >
      <div ref={sectionRef} className="mx-auto w-full max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span aria-hidden className="throbbing-bgH h-px w-6 shrink-0 rounded-full sm:w-10" />
            <p className="t-eyebrow secondaryFont text-brand shrink-0 text-[0.7rem] tracking-[0.36em]">
              {content.label}
            </p>
            <span aria-hidden className="throbbing-bgH h-px w-6 shrink-0 rounded-full sm:w-10" />
          </div>

          <div className="t-intro mx-auto mt-8">
            <h2 className="t-heading text-balance text-[#121212]">{content.heading}</h2>
            <p className="secondaryFont t-subhead mt-5 text-[15px] leading-relaxed text-ink-muted sm:mt-6 sm:text-base">
              {content.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 sm:mt-20 sm:gap-14 md:grid-cols-3 md:gap-8 lg:gap-10">
          {metrics.map((metric, index) => (
            <OutcomeColumn
              key={metric.id}
              metric={metric}
              index={index}
              progress={scrollYProgress}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
