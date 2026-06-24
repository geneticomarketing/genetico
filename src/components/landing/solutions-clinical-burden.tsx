"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { EASE, Reveal } from "@/components/motion/reveal";

type BurdenCard = {
  id: string;
  number: string;
  label: string;
  badge: string;
  badgeDot: string;
  badgeBg: string;
  badgeText: string;
  title: string;
  description: string;
};

const CARDS: BurdenCard[] = [
  {
    id: "intake",
    number: "01",
    label: "INTAKE",
    badge: "INTAKE",
    badgeDot: "#c0392b",
    badgeBg: "#fce8ea",
    badgeText: "#b01616",
    title: "Patient arrives with unstructured notes",
    description:
      "Clinician manually reads, interprets, and re-types data from paper records. No standard format exists across referrals.",
  },
  {
    id: "phenotyping",
    number: "02",
    label: "PHENOTYPING",
    badge: "PHENOTYPING",
    badgeDot: "#024385",
    badgeBg: "#e8f4fc",
    badgeText: "#024385",
    title: "Phenotype data captured inconsistently",
    description:
      "Free-text notes must be translated into standardized HPO terms by hand. Terminology varies across clinicians and visits.",
  },
  {
    id: "diagnosis",
    number: "03",
    label: "DIAGNOSIS",
    badge: "DIAGNOSIS",
    badgeDot: "#5fd7cb",
    badgeBg: "#e6faf8",
    badgeText: "#0a6b62",
    title: "Differential diagnosis built from memory",
    description:
      "Clinicians cross-reference literature, databases, and prior cases manually — a slow, error-prone process with no structured support.",
  },
  {
    id: "registry",
    number: "04",
    label: "REGISTRY",
    badge: "REGISTRY",
    badgeDot: "#7a8fa8",
    badgeBg: "#eef2f7",
    badgeText: "#4a5f78",
    title: "Registry data entered twice",
    description:
      "Patient data is re-keyed into national registries and reporting systems. Duplicate effort with no single source of truth.",
  },
];

const AUTOPLAY_MS = 300000;
const COLLAPSED_W = 240;
const CARD_GAP = 12;
const MIN_EXPANDED_W = 320;
const WIDTH_MS = 520;

function ActiveCardContent({ card }: { card: BurdenCard }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(110% 85% at 78% 18%, rgba(95,215,203,0.16) 0%, transparent 52%), radial-gradient(85% 75% at 18% 82%, rgba(2,67,133,0.4) 0%, transparent 58%), linear-gradient(145deg, #024385 0%, #00101f 58%, #000810 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
        <h3 className="mt-auto max-w-md text-left text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-white">
          {card.title}
        </h3>

        <p className="secondaryFont mt-4 max-w-md text-left text-sm leading-relaxed text-white/55 sm:text-[0.9375rem]">
          {card.description}
        </p>
      </div>
    </>
  );
}

function CollapsedCardContent({ card }: { card: BurdenCard }) {
  return (
    <div className="flex h-full flex-col items-center justify-between py-6">
      <span
        className="inline-flex size-7 items-center justify-center rounded-full"
        style={{ backgroundColor: card.badgeBg }}
        aria-label={card.badge}
      >
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: card.badgeDot }}
        />
      </span>
      <span
        className="secondaryFont text-[0.68rem] font-medium tracking-[0.22em] text-[#c5cdd8] uppercase"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        {card.label}
      </span>
      <span
        aria-hidden
        className="size-1.5 rounded-full"
        style={{ backgroundColor: card.badgeDot }}
      />
    </div>
  );
}

function BurdenCardItem({
  card,
  index,
  active,
  expandedWidth,
  transitioning,
  reduce,
  onSelect,
}: {
  card: BurdenCard;
  index: number;
  active: number;
  expandedWidth: number;
  transitioning: boolean;
  reduce: boolean | null;
  onSelect: (index: number) => void;
}) {
  const isActive = index === active;
  const width = isActive ? expandedWidth : COLLAPSED_W;
  const animateWidth = transitioning && !reduce;

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-pressed={isActive}
      aria-label={`${card.label}: ${card.title}`}
      style={{ width }}
      className={`relative h-full shrink-0 cursor-pointer overflow-hidden rounded-2xl text-left transition-all duration-500 ${
        animateWidth ? "" : ""
      } ${!isActive ? "bg-[#f4f6f9] hover:bg-[#eef1f5]" : ""}`}
    >
      <div
        className="absolute inset-y-0 left-0"
        style={{ width: expandedWidth }}
        aria-hidden={!isActive}
      >
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(110% 85% at 78% 18%, rgba(95,215,203,0.16) 0%, transparent 52%), radial-gradient(85% 75% at 18% 82%, rgba(2,67,133,0.4) 0%, transparent 58%), linear-gradient(145deg, #024385 0%, #00101f 58%, #000810 100%)",
              // opacity: isActive ? 1 : 0.5,
            }}
          />

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="relative z-10 flex h-full flex-col p-6 sm:p-8"
              >
                <h3 className="mt-auto max-w-md text-left text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-white">
                  {card.title}
                </h3>

                <p className="secondaryFont mt-4 max-w-md text-left text-sm leading-relaxed text-white/55 sm:text-[0.9375rem]">
                  {card.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!isActive && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="relative z-10 flex h-full flex-col justify-center"
              >
                <h3 className="text-center text-sm text-white">{card.title}</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </>

        {/* <ActiveCardContent card={card} /> */}
      </div>

      {/* <div
        className={`absolute inset-0 bg-[#f4f6f9] ${
          animateWidth ? "transition-opacity duration-200 ease-out" : ""
        } ${isActive ? "pointer-events-none opacity-0" : "opacity-100"}`}
        aria-hidden={isActive}
      >
        <CollapsedCardContent card={card} />
      </div> */}
    </button>
  );
}

export function SolutionsClinicalBurden() {
  const [active, setActive] = useState(0);
  const [rowWidth, setRowWidth] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const goTo = useCallback(
    (index: number) => {
      if (index === active) return;
      setTransitioning(true);
      setActive(index);
    },
    [active],
  );

  useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      setRowWidth(el.offsetWidth);
      setTransitioning(false);
    };

    update();

    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(update, 100);
    });
    ro.observe(el);

    return () => {
      clearTimeout(resizeTimer);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!transitioning) return;
    const timer = setTimeout(() => setTransitioning(false), WIDTH_MS);
    return () => clearTimeout(timer);
  }, [active, transitioning]);

  const advance = useCallback(() => {
    setTransitioning(true);
    setActive((i) => (i + 1) % CARDS.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [advance]);

  const gapTotal = (CARDS.length - 1) * CARD_GAP;
  const expandedWidth =
    rowWidth > 0
      ? Math.max(MIN_EXPANDED_W, rowWidth - gapTotal - (CARDS.length - 1) * COLLAPSED_W)
      : MIN_EXPANDED_W;

  return (
    <section
      id="clinical-burden"
      className="bg-white px-6 py-20 text-[#121212] sm:px-10 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span aria-hidden className="h-px w-10 shrink-0 bg-[#b8cce0] sm:w-16" />
            <p className="t-eyebrow secondaryFont text-brand shrink-0 text-[0.7rem] tracking-[0.36em]">
              The Problem
            </p>
            <span aria-hidden className="h-px w-10 shrink-0 bg-[#b8cce0] sm:w-16" />
          </div>

          <h2 className="t-heading mx-auto mt-8 text-balance text-[#121212]">
            The Clinical Burden
          </h2>

          <p className="secondaryFont mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#8f8f8f] sm:mt-6 sm:text-base">
            Clinicians at COEs spend a disproportionate amount of time on documentation, data
            re-entry, and manual reasoning — time that should go to patient care.
          </p>
        </Reveal>

        <Reveal className="mt-14 sm:mt-16" delay={0.08}>
          <div ref={rowRef} className="flex h-[min(420px,58vw)] min-h-[320px] gap-2.5 sm:gap-3">
            {CARDS.map((card, index) => (
              <BurdenCardItem
                key={card.id}
                card={card}
                index={index}
                active={active}
                expandedWidth={expandedWidth}
                transitioning={transitioning}
                reduce={reduce}
                onSelect={goTo}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2.5">
            {CARDS.map((card, index) => {
              const isDotActive = index === active;
              return (
                <motion.button
                  key={card.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to ${card.label}`}
                  aria-current={isDotActive}
                  className="h-1.5 rounded-full"
                  initial={false}
                  animate={{
                    width: isDotActive ? 32 : 6,
                    backgroundColor: isDotActive ? "#121212" : "#d4dce6",
                  }}
                  whileHover={reduce || isDotActive ? undefined : { backgroundColor: "#b8c4d4" }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          width: { duration: 0.4, ease: EASE },
                          backgroundColor: { duration: 0.3, ease: EASE },
                        }
                  }
                />
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
