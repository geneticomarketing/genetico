"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { EASE, Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { DEFAULT_PUBLIC_HEALTH_PAGE } from "@/lib/cms/defaults/public-health";
import type { PublicHealthPageData, PublicHealthTier } from "@/lib/cms/types";

type Tier = PublicHealthTier;

const SWITCH = { duration: 0.45, ease: EASE };

function BannerSwirl() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 w-[min(52%,280px)] overflow-hidden"
    >
      <div className="absolute -right-6 top-1/2 size-40 -translate-y-1/2 rounded-full bg-accent/25 blur-2xl" />
      <div className="absolute right-8 top-[18%] size-28 rounded-full bg-white/12 blur-xl" />
      <div className="absolute right-16 bottom-[12%] size-36 rounded-full bg-[#5fd7cb]/20 blur-2xl" />
      <svg
        className="absolute right-0 top-0 h-full w-full opacity-70"
        viewBox="0 0 280 120"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <linearGradient id="tier-swirl-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5fd7cb" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#024385" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d="M120 20 C180 40, 200 80, 280 60 L280 120 L80 120 C40 100, 60 40, 120 20 Z"
          fill="url(#tier-swirl-a)"
        />
        <path d="M140 0 C220 30, 240 90, 280 40 L280 0 Z" fill="white" fillOpacity="0.08" />
      </svg>
    </div>
  );
}

function TierPanel({ tier }: { tier: Tier }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      key={tier.id}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -16 }}
      transition={SWITCH}
      className="overflow-hidden rounded-2xl border border-[#e8ebf0] bg-white shadow-[0_8px_40px_rgba(0,36,69,0.06)]"
    >
      <div className="relative overflow-hidden bg-brand px-6 py-6 sm:px-8 sm:py-7">
        <BannerSwirl />
        <div className="relative z-10">
          {/* <p className="t-badge secondaryFont text-[0.62rem] font-semibold tracking-[0.22em] text-white/65 uppercase">
            {tier.bannerLabel}
          </p> */}
          <h3
            className="mt-2 text-[clamp(1.5rem,2.8vw,2rem)] font-medium leading-tight text-white"
            style={{ fontVariationSettings: '"SERF" 100' }}
          >
            {tier.title}
          </h3>
        </div>
      </div>

      <motion.div
        className="grid bg-[#f9fafb] lg:grid-cols-3 lg:divide-x lg:divide-[#eef1f5]"
        initial="hidden"
        animate="show"
        variants={
          reduce
            ? undefined
            : {
                hidden: {},
                show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
              }
        }
      >
        <motion.div
          className="px-6 py-7 sm:px-8 sm:py-8"
          variants={
            reduce
              ? undefined
              : {
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
                }
          }
        >
          <p className="t-badge secondaryFont text-[0.62rem] font-semibold tracking-[0.18em] text-[#a3afc4] uppercase">
            WHAT HAPPENS AT THIS TIER
          </p>
          <motion.ul
            className="secondaryFont mt-5 space-y-3.5"
            variants={
              reduce
                ? undefined
                : {
                    hidden: {},
                    show: { transition: { staggerChildren: 0.06 } },
                  }
            }
          >
            {tier.happens.map((item) => (
              <motion.li
                key={item}
                className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-[#4a5f78] sm:text-[0.9375rem]"
                variants={
                  reduce
                    ? undefined
                    : {
                        hidden: { opacity: 0, x: -12 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
                      }
                }
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="border-t border-[#eef1f5] px-6 py-7 sm:px-8 sm:py-8 lg:border-t-0"
          variants={
            reduce
              ? undefined
              : {
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
                }
          }
        >
          <p className="t-badge secondaryFont text-[0.62rem] font-semibold tracking-[0.18em] text-[#a3afc4] uppercase">
            WHAT DATA FLOWS OUT
          </p>
          <motion.ul
            className="secondaryFont mt-5 space-y-3.5"
            variants={
              reduce
                ? undefined
                : {
                    hidden: {},
                    show: { transition: { staggerChildren: 0.06 } },
                  }
            }
          >
            {tier.dataFlows.map((item) => (
              <motion.li
                key={item}
                className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-[#4a5f78] sm:text-[0.9375rem]"
                variants={
                  reduce
                    ? undefined
                    : {
                        hidden: { opacity: 0, x: -12 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
                      }
                }
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e8f4fc]"
                >
                  <ArrowRight className="size-3 text-brand" strokeWidth={2.5} />
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="border-t border-[#eef1f5] px-6 py-7 sm:px-8 sm:py-8 lg:border-t-0"
          variants={
            reduce
              ? undefined
              : {
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
                }
          }
        >
          <p className="t-badge secondaryFont text-[0.62rem] font-semibold tracking-[0.18em] text-[#a3afc4] uppercase">
            WHO USES IT AT THIS TIER
          </p>
          <motion.ul
            className="mt-5 space-y-3"
            variants={
              reduce
                ? undefined
                : {
                    hidden: {},
                    show: { transition: { staggerChildren: 0.08 } },
                  }
            }
          >
            {tier.users.map((user) => (
              <motion.li
                key={user.role}
                className="rounded-xl border border-[#eef1f5] bg-white px-4 py-3.5 sm:px-5 sm:py-4"
                variants={
                  reduce
                    ? undefined
                    : {
                        hidden: { opacity: 0, y: 14 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                      }
                }
                whileHover={reduce ? undefined : { y: -2 }}
              >
                <p className="secondaryFont text-[0.9rem] font-semibold text-[#121212] sm:text-[0.9375rem]">
                  {user.role}
                </p>
                <p className="secondaryFont mt-1 text-[0.82rem] leading-relaxed text-ink-muted sm:text-[0.875rem]">
                  {user.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function PublicHealthThreeTierModel({
  section = DEFAULT_PUBLIC_HEALTH_PAGE.threeTier,
}: {
  section?: PublicHealthPageData["threeTier"];
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const TIERS = section.tiers;
  const tier = TIERS[active];

  return (
    <section
      id="three-tier-model"
      className="bg-white px-gutter py-section text-[#121212]"
    >
      <div className="mx-auto w-full max-w-7xl">
        <StaggerGroup className="mx-auto max-w-3xl text-center" stagger={0.1}>
          <StaggerItem>
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <span aria-hidden className="throbbing-bgH h-px w-12 shrink-0 rounded-full" />
              <p className="t-eyebrow secondaryFont shrink-0 text-[0.65rem] tracking-[0.28em] text-brand">
                {section.eyebrow}
              </p>
              <span aria-hidden className="throbbing-bgH h-px w-12 shrink-0 rounded-full" />
            </div>
          </StaggerItem>

          <StaggerItem className="t-intro mx-auto mt-6">
            <h2 className="t-heading text-balance text-[#121212]">{section.heading}</h2>
            <p className="secondaryFont t-subhead mt-5 text-[15px] leading-relaxed text-ink-muted sm:mt-6 sm:text-base">
              {section.description}
            </p>
          </StaggerItem>
        </StaggerGroup>

        <Reveal className="mt-12 flex justify-center sm:mt-14" delay={0.08}>
          <div className="flex w-max max-w-full min-w-0 flex-nowrap items-center gap-1 overflow-x-auto overscroll-x-contain rounded-2xl border border-[#e8ebf0] bg-white p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {TIERS.map((t, index) => {
              const isActive = index === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                  className={`secondaryFont shrink-0 rounded-xl px-5 py-2.5 text-[0.9rem] font-medium whitespace-nowrap transition-all duration-300 sm:px-6 sm:text-[0.85rem] ${
                    isActive
                      ? "bg-brand text-white shadow-[0_8px_24px_rgba(2,67,133,0.28)]"
                      : "text-ink-muted hover:text-[#121212]"
                  }`}
                >
                  {t.tabLabel}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait">
            <TierPanel tier={tier} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
