"use client";

import { Database, LayoutDashboard, Network, Shield, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { EASE, Reveal, StaggerGroup, StaggerItem, useInViewAnimation } from "@/components/motion/reveal";
import { DEFAULT_PUBLIC_HEALTH_PAGE } from "@/lib/cms/defaults/public-health";
import type { PublicHealthImpactFeature, PublicHealthPageData } from "@/lib/cms/types";

const FEATURE_ICONS = [Network, LayoutDashboard, Database, Shield] as const;

type SecurityFeature = PublicHealthImpactFeature & { icon: LucideIcon };

function AnimatedDivider() {
  const reduce = useReducedMotion();
  const { ref, visible } = useInViewAnimation();

  return (
    <div className="relative mt-10 h-px w-full sm:mt-12" aria-hidden>
      <div className="absolute inset-0 bg-[#e8ebf0]" />
      {reduce ? (
        <div className="from-accent via-brand/40 absolute inset-y-0 left-0 w-full bg-gradient-to-r to-transparent" />
      ) : (
        <motion.div
          ref={ref}
          className="from-accent via-brand/35 absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r to-transparent"
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      )}
    </div>
  );
}

function SecurityRow({ feature }: { feature: SecurityFeature }) {
  const Icon = feature.icon;
  const reduce = useReducedMotion();

  return (
    <motion.li
      className="border-b border-[#eef1f5] py-6 sm:py-7"
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, y: 32 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: EASE },
              },
            }
      }
    >
      <div className="grid grid-cols-[2rem_2.75rem_1fr] items-center gap-x-4 gap-y-3 sm:grid-cols-[2.5rem_3rem_minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-x-6">
        <span className="secondaryFont text-[0.8rem] font-medium text-[#c5cdd8] sm:text-[0.85rem]">
          {feature.number}
        </span>

        <motion.div
          className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#d4e8f7] bg-[#f0f7fc] sm:size-12"
          variants={
            reduce
              ? undefined
              : {
                  hidden: { opacity: 0, scale: 0.88 },
                  show: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.55, ease: EASE, delay: 0.06 },
                  },
                }
          }
        >
          <Icon className="text-brand size-5" strokeWidth={1.6} aria-hidden />
        </motion.div>

        <p className="t-badge secondaryFont text-[0.62rem] font-semibold tracking-[0.22em] text-[#a3afc4] uppercase sm:col-auto">
          {feature.category}
        </p>

        <p
          className="col-span-2 text-[clamp(1.05rem,1.8vw,1.35rem)] leading-snug font-medium text-[#4a5f78] max-md:col-span-4 sm:col-span-1"
          style={{ fontVariationSettings: '"SERF" 100' }}
        >
          {feature.title}
        </p>
      </div>
    </motion.li>
  );
}

export function PublicHealthDataSecurity({
  section = DEFAULT_PUBLIC_HEALTH_PAGE.impact,
}: {
  section?: PublicHealthPageData["impact"];
}) {
  const reduce = useReducedMotion();
  const { ref: featuresRef, visible: featuresVisible } = useInViewAnimation<HTMLUListElement>();
  const FEATURES: SecurityFeature[] = section.features.map((feature, index) => ({
    ...feature,
    icon: FEATURE_ICONS[index] ?? Network,
  }));

  return (
    <section
      id="impact"
      className="relative overflow-hidden px-6 py-20 text-[#121212] sm:px-10 sm:py-24 lg:py-28"
      style={{
        background: "linear-gradient(155deg, #f2f7fc 0%, #f8fafc 38%, #ffffff 62%, #ffffff 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 size-[min(52vw,520px)] bg-[radial-gradient(circle_at_top_right,rgba(95,215,203,0.14)_0%,transparent_68%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <StaggerGroup
          className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start lg:gap-14"
          stagger={0.1}
        >
          <div>
            <StaggerItem>
              <div className="flex items-center gap-4 sm:gap-5">
                <span
                  aria-hidden
                  className="throbbing-bgH h-1 w-12 shrink-0 rounded-full"
                />
                <p className="t-eyebrow secondaryFont text-brand shrink-0 text-[0.65rem] tracking-[0.28em]">
                  {section.eyebrow}
                </p>
                <span
                  aria-hidden
                  className="throbbing-bgH h-1 w-12 shrink-0 rounded-full"
                />
              </div>
            </StaggerItem>

            <StaggerItem>
              <h2 className="t-heading mt-5 max-w-none text-balance text-[#121212]">
                {section.heading}
              </h2>
            </StaggerItem>
          </div>

          <StaggerItem className="lg:pt-8">
            <p className="secondaryFont max-w-md text-[15px] leading-relaxed text-[#8f8f8f] sm:text-base lg:ml-auto lg:text-right">
              {section.description}
            </p>
          </StaggerItem>
        </StaggerGroup>

        <Reveal delay={0.05}>
          <AnimatedDivider />
        </Reveal>

        <motion.ul
          ref={featuresRef}
          className="mt-2"
          initial={reduce ? false : "hidden"}
          animate={featuresVisible ? "show" : "hidden"}
          variants={
            reduce
              ? undefined
              : {
                  hidden: {},
                  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
                }
          }
        >
          {FEATURES.map((feature) => (
            <SecurityRow key={feature.number} feature={feature} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
