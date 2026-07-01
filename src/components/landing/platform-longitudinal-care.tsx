"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { EASE, Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

type CareColumn = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
};

const COLUMNS: CareColumn[] = [
  {
    id: "journey",
    title: "Longitudinal Patient Journey",
    description:
      "Capture every milestone in a patient's rare disease journey, from referral and diagnosis to treatment and follow-up, through structured longitudinal records that support continuity of care and informed clinical decisions.",
    bullets: [
      "Unified patient timeline across every clinical encounter",
      "AI-assisted visit summaries and clinical documentation",
      "Track disease progression, treatment response, and outcomes over time",
    ],
  },
  {
    id: "analytics",
    title: "Advanced Clinical Analytics",
    description:
      "Transform structured clinical data into real-time dashboards that reveal patient trends, cohort insights, disease progression, and operational performance across institutions.",
    bullets: [
      "Interactive cohort analysis and disease trend visualization",
      "AI-assisted analytics for clinical and research insights",
      "Export research-ready reports and population-level evidence",
    ],
  },
];

const TIMELINE_EVENTS = [
  { date: "Jan 2024", label: "Initial Referral", y: 88 },
  { date: "Mar 2024", label: "Genomic Workup Ordered", y: 138 },
  { date: "Jun 2024", label: "Diagnosis Confirmed", y: 188 },
  { date: "Sep 2024", label: "Follow-up Review", y: 238 },
  { date: "Jan 2025", label: "Treatment Update", y: 276 },
];

const CHART_BARS = [
  { month: "Jan", x: 48, height: 48 },
  { month: "Feb", x: 104, height: 76 },
  { month: "Mar", x: 160, height: 96 },
  { month: "Apr", x: 216, height: 116 },
  { month: "May", x: 272, height: 148 },
  { month: "Jun", x: 328, height: 104 },
  { month: "Jul", x: 384, height: 88 },
];

const CHART_BASE = 296;
const CYCLE_MS = 1800;

const FONT_SANS = 'var(--font-sans), ui-sans-serif, system-ui, sans-serif';
const FONT_DISPLAY = 'var(--font-display), ui-serif, Georgia, serif';
const SANS_VAR = { fontVariationSettings: '"SERF" 0' } as const;
const DISPLAY_VAR = { fontVariationSettings: '"SERF" 100' } as const;

const CROSSFADE = { duration: 0.38, ease: EASE };
const STEP = { duration: 0.42, ease: EASE };
const PULSE = { duration: 0.9, repeat: Infinity, ease: EASE };
const STAT_PULSE = { duration: 1.5, repeat: Infinity, ease: EASE };

function PatientTimelineCard() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(2);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % TIMELINE_EVENTS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const activeY = TIMELINE_EVENTS[active].y;

  return (
    <div className="overflow-hidden rounded-2xl bg-[#eef3f8]">
      <svg viewBox="0 0 480 320" className="h-auto w-full" aria-hidden>
        <rect width="480" height="320" rx="16" fill="#EEF3F8" />
        <text
          x="32"
          y="44"
          fill="#7EB8E8"
          fontFamily={FONT_SANS}
          style={SANS_VAR}
          fontSize="11"
          fontWeight="600"
          letterSpacing="0.18em"
        >
          PATIENT TIMELINE
        </text>

        <line x1="56" y1="72" x2="56" y2="276" stroke="#D4DCE6" strokeWidth="1.5" />

        <motion.line
          x1="56"
          x2="56"
          stroke="#5FD7CB"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ y1: 72, y2: activeY }}
          transition={{ duration: reduce ? 0 : STEP.duration, ease: EASE }}
        />

        {TIMELINE_EVENTS.map((event, index) => {
          const isActive = index === active;
          return (
            <g key={event.date}>
              <motion.circle
                cx="56"
                cy={event.y}
                fill={isActive ? "#5FD7CB" : "#fff"}
                stroke={isActive ? "#5FD7CB" : "#C5D0DC"}
                initial={false}
                animate={{
                  r: isActive && !reduce ? [8, 9.25, 8] : isActive ? 8 : 6,
                  strokeWidth: isActive ? 2 : 1.5,
                }}
                transition={
                  isActive && !reduce
                    ? PULSE
                    : { duration: STEP.duration, ease: EASE }
                }
              />
              {isActive && (
                <motion.circle
                  cx="56"
                  cy={event.y}
                  r="4"
                  fill="#fff"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={CROSSFADE}
                />
              )}

              <motion.text
                x="80"
                y={event.y - 4}
                fill={isActive ? "#024385" : "#8B8F97"}
                fontFamily={FONT_SANS}
                style={SANS_VAR}
                fontSize="11"
                fontWeight={isActive ? 600 : 500}
                animate={{ opacity: isActive ? 1 : 0.6 }}
                transition={CROSSFADE}
              >
                {event.date}
              </motion.text>
              <motion.text
                x="80"
                y={event.y + 14}
                fill={isActive ? "#111111" : "#6E6E73"}
                fontFamily={isActive ? FONT_DISPLAY : FONT_SANS}
                style={isActive ? DISPLAY_VAR : SANS_VAR}
                fontSize={isActive ? 14 : 13}
                fontWeight={isActive ? 600 : 400}
                animate={{ opacity: isActive ? 1 : 0.5 }}
                transition={CROSSFADE}
              >
                {event.label}
              </motion.text>

              {isActive && (
                <motion.g
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={CROSSFADE}
                >
                  <rect
                    x="360"
                    y={event.y - 16}
                    width="72"
                    height="22"
                    rx="11"
                    fill="#E8F6FF"
                    stroke="#B8D9F0"
                    strokeWidth="1"
                  />
                  <motion.text
                    x="396"
                    y={event.y - 1}
                    textAnchor="middle"
                    fill="#5FD7CB"
                    fontFamily={FONT_SANS}
                    style={SANS_VAR}
                    fontSize="10"
                    fontWeight="600"
                    letterSpacing="0.12em"
                    animate={reduce ? undefined : { opacity: [1, 0.6, 1] }}
                    transition={PULSE}
                  >
                    ACTIVE
                  </motion.text>
                </motion.g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function CohortDashboardCard() {
  const reduce = useReducedMotion();
  const [activeBar, setActiveBar] = useState(4);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActiveBar((i) => (i + 1) % CHART_BARS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="overflow-hidden rounded-2xl bg-[#021b39]">
      <svg viewBox="0 0 480 320" className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="cohortCardBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#021b39" />
            <stop offset="100%" stopColor="#032a52" />
          </linearGradient>
          <linearGradient id="cohortBarHighlight" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#024385" />
            <stop offset="100%" stopColor="#5FD7CB" />
          </linearGradient>
        </defs>

        <rect width="480" height="320" rx="16" fill="url(#cohortCardBg)" />

        <text
          x="32"
          y="44"
          fill="#5FD7CB"
          fontFamily={FONT_SANS}
          style={SANS_VAR}
          fontSize="11"
          fontWeight="600"
          letterSpacing="0.18em"
        >
          PATIENT COHORT TREND
        </text>

        {[
          { x: 32, value: "1,247", label: "Active Patients" },
          { x: 176, value: "94%", label: "Data Completeness" },
          { x: 320, value: "312", label: "Diagnoses / Month" },
        ].map((stat, index) => (
          <motion.g
            key={stat.label}
            animate={reduce ? undefined : { opacity: [0.75, 1, 0.75] }}
            transition={{
              ...STAT_PULSE,
              delay: index * 0.22,
            }}
          >
            <rect
              x={stat.x}
              y="64"
              width="128"
              height="56"
              rx="8"
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            <text
              x={stat.x + 16}
              y="92"
              fill="#fff"
              fontFamily={FONT_DISPLAY}
              style={DISPLAY_VAR}
              fontSize="18"
              fontWeight="600"
            >
              {stat.value}
            </text>
            <text
              x={stat.x + 16}
              y="108"
              fill="rgba(255,255,255,0.45)"
              fontFamily={FONT_SANS}
              style={SANS_VAR}
              fontSize="10"
            >
              {stat.label}
            </text>
          </motion.g>
        ))}

        {CHART_BARS.map((bar, index) => {
          const isActive = index === activeBar;
          const y = CHART_BASE - bar.height;
          return (
            <g key={bar.month}>
              <motion.rect
                x={bar.x}
                width="36"
                rx="4"
                fill={isActive ? "url(#cohortBarHighlight)" : "rgba(255,255,255,0.12)"}
                initial={reduce ? false : { y: CHART_BASE, height: 0, opacity: 0.4 }}
                animate={{
                  y: isActive && !reduce ? [y - 4, y, y - 4] : y,
                  height:
                    isActive && !reduce ? [bar.height + 4, bar.height, bar.height + 4] : bar.height,
                  opacity: isActive ? 1 : 0.5,
                }}
                transition={
                  isActive && !reduce
                    ? {
                        y: PULSE,
                        height: PULSE,
                        opacity: CROSSFADE,
                      }
                    : STEP
                }
              />
              <motion.text
                x={bar.x + 18}
                y="276"
                textAnchor="middle"
                fill={isActive ? "#5FD7CB" : "rgba(255,255,255,0.35)"}
                fontFamily={FONT_SANS}
                style={SANS_VAR}
                fontSize="10"
                fontWeight={isActive ? 600 : 400}
                animate={{ opacity: isActive ? 1 : 0.5 }}
                transition={CROSSFADE}
              >
                {bar.month}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const DASHBOARDS = [PatientTimelineCard, CohortDashboardCard];

export function PlatformLongitudinalCare() {
  return (
    <section
      id="longitudinal-care"
      className="bg-[#f6f8fb] px-6 py-20 text-black sm:px-10 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <p className="t-eyebrow text-[0.7rem] tracking-[0.32em] text-[#7a8fa8]">
                  Longitudinal Care
                </p>
                <span aria-hidden className="bg-accent h-0.5 w-10 sm:w-14" />
              </div>
              <h2
                className="t-heading mt-5 max-w-none text-black"
                style={{ fontVariationSettings: '"SERF" 100' }}
              >
                From Patient Journeys to Longitudinal Intelligence
              </h2>
            </div>
            <p className="text-ink-muted max-w-md text-[15px] leading-relaxed sm:text-base lg:justify-self-end lg:pb-1">
              Build lifelong patient records that evolve with every consultation, enabling continuous
              care, AI-assisted insights, outcome tracking, and research-ready longitudinal data.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          {COLUMNS.map((column, index) => {
            const Dashboard = DASHBOARDS[index];
            return (
              <StaggerItem key={column.id} className="flex flex-col">
                <Dashboard />

                <h3
                  className="t-card-title mt-8 max-w-none text-black"
                  style={{ fontVariationSettings: '"SERF" 100' }}
                >
                  {column.title}
                </h3>

                <p className="text-ink-muted mt-4 text-[15px] leading-relaxed sm:text-base">
                  {column.description}
                </p>

                <ul className="mt-6 space-y-3.5">
                  {column.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-ink-muted flex items-start gap-3 text-[15px] leading-relaxed"
                    >
                      <span aria-hidden className="bg-accent mt-2 size-1.5 shrink-0 rounded-full" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
