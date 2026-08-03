"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { EASE, StaggerGroup, StaggerItem, useInViewAnimation } from "@/components/motion/reveal";
import { DEFAULT_ECOSYSTEM_MODULES, DEFAULT_HOME_PAGE } from "@/lib/cms/defaults/home";
import type { EcosystemModule } from "@/lib/cms/types";

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

const panelCardVariants: Variants = {
  hidden: { opacity: 0, y: 20, transition: { duration: 0.25, ease: EASE } },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

function ModuleGlyph({ icon, tone }: { icon: string; tone: string }) {
  return (
    <motion.span
      className="block size-6 shrink-0"
      animate={{ backgroundColor: tone }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{
        maskImage: `url('/icons/${icon}-glyph.svg')`,
        WebkitMaskImage: `url('/icons/${icon}-glyph.svg')`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

export function SystemBreaks({
  heading = DEFAULT_HOME_PAGE.ecosystemChallenges.heading,
  description = DEFAULT_HOME_PAGE.ecosystemChallenges.description,
  modules = DEFAULT_ECOSYSTEM_MODULES,
}: {
  heading?: string;
  description?: string;
  modules?: EcosystemModule[];
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const { ref: listRef, visible: listVisible } = useInViewAnimation<HTMLUListElement>();
  const { ref: lineRef, visible: lineVisible } = useInViewAnimation<HTMLDivElement>();

  const layoutTransition = reduce ? { duration: 0 } : { duration: 0.45, ease: EASE };
  const switchTransition = reduce ? { duration: 0 } : { duration: 0.5, ease: EASE };

  return (
    <section id="about" className="bg-white px-6 py-24 sm:px-10 sm:pt-28">
      <StaggerGroup className="mx-auto w-full max-w-7xl">
        <StaggerItem className="t-intro mx-auto text-center">
          <h2 className="t-heading text-[#121212] capitalize">{heading}</h2>
          <p className="t-subhead mt-5 text-base text-black/55 sm:text-[1rem]">{description}</p>
        </StaggerItem>

        <div className="mt-14 grid gap-10 rounded-md border border-gray-200 p-8 max-md:px-0 lg:grid-cols-[5fr_1px_7fr] lg:items-stretch">
          {/* LEFT — module rail: active expands into a card, the rest are plain rows */}
          <motion.ul
            ref={listRef}
            className="flex flex-col gap-1.5"
            initial={reduce ? false : "hidden"}
            animate={listVisible ? "show" : "hidden"}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
          >
            {modules.map((m, i) => {
              const isActive = i === active;
              const icon = m.icon ?? "module-clinicians";
              return (
                <motion.li key={m.title} variants={reduce ? undefined : listItemVariants}>
                  <motion.button
                    type="button"
                    layout
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    transition={{ layout: layoutTransition }}
                    className={`flex w-full flex-col text-left ${
                      isActive
                        ? "gap-3 rounded-lg bg-gray-50 px-3 py-5"
                        : "rounded-xl px-6 py-4 hover:bg-black/[0.03]"
                    }`}
                  >
                    <span className="flex w-full items-center gap-3">
                      <ModuleGlyph icon={icon} tone={isActive ? "#024385" : "#024385"} />
                      <motion.span
                        animate={{ opacity: isActive ? 1 : 1 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className={
                          isActive
                            ? "text-lg font-semibold text-black"
                            : "text-base font-medium text-black"
                        }
                      >
                        {m.title}
                      </motion.span>
                    </span>

                    {/* Grid 0fr→1fr avoids height:auto jank; layout on the button handles the resize */}
                    <motion.div
                      className="grid"
                      initial={false}
                      animate={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                      transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                    >
                      <div className="overflow-hidden">
                        <motion.div
                          className="flex flex-col gap-3"
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            y: isActive ? 0 : 6,
                          }}
                          transition={{
                            duration: reduce ? 0 : 0.3,
                            ease: EASE,
                            delay: isActive && !reduce ? 0.08 : 0,
                          }}
                        >
                          <span className="text-[1em] leading-relaxed text-black/55">{m.desc}</span>
                          {m.href ? (
                            <a
                              href={m.href}
                              className="text-brand w-fit rounded-lg border border-black/15 bg-white px-4 py-2 text-xs font-medium transition-colors hover:bg-black/3"
                            >
                              Learn more
                            </a>
                          ) : (
                            <span className="text-brand w-fit rounded-lg border border-black/15 bg-white px-4 py-2 text-xs font-medium">
                              Learn more
                            </span>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.button>
                </motion.li>
              );
            })}
          </motion.ul>

          <StaggerItem className="hidden self-stretch lg:block">
            <motion.span
              ref={lineRef}
              aria-hidden
              className="block h-full w-[3px] origin-top bg-gray-200"
              initial={reduce ? false : { scaleY: 0 }}
              animate={lineVisible ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
            />
          </StaggerItem>

          {/* RIGHT — blue swirl panel with the Problem / Solution pair */}
          <StaggerItem className="relative overflow-hidden rounded-lg bg-[#021b39] bg-[url('/images/reality-panel.svg')] bg-cover bg-center p-8 sm:p-10">
            <div className="grid">
              {modules.map((m, i) => {
                const isActive = i === active;
                return (
                  <motion.div
                    key={m.title}
                    aria-hidden={!isActive}
                    className="col-start-1 row-start-1 flex flex-col gap-5 sm:flex-row"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 24,
                    }}
                    transition={switchTransition}
                    style={{
                      pointerEvents: isActive ? "auto" : "none",
                      zIndex: isActive ? 1 : 0,
                    }}
                  >
                    <motion.div
                      custom={0.06}
                      variants={reduce ? undefined : panelCardVariants}
                      initial={false}
                      animate={isActive ? "show" : "hidden"}
                      className="flex-1 rounded-2xl bg-white/[0.07] px-6 py-7 ring-1 ring-white/10"
                    >
                      <span className="t-badge text-sm font-semibold tracking-wide text-white/55 uppercase">
                        Problem
                      </span>
                      <p className="mt-4 text-base leading-relaxed text-white/85">{m.problem}</p>
                    </motion.div>

                    <motion.div
                      custom={0.14}
                      variants={reduce ? undefined : panelCardVariants}
                      initial={false}
                      animate={isActive ? "show" : "hidden"}
                      className="flex-1 rounded-2xl bg-white px-6 py-7 shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
                    >
                      <span className="t-badge text-brand text-sm font-semibold tracking-wide uppercase">
                        Solution
                      </span>
                      <p className="mt-4 text-base leading-relaxed text-black">{m.solution}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </StaggerItem>
        </div>
      </StaggerGroup>
    </section>
  );
}
