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
  collapsedTitle: readonly [string, string];
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
    collapsedTitle: ["Patient arrives with", "unstructured notes"],
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
    collapsedTitle: ["Phenotype data captured", "inconsistently"],
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
    collapsedTitle: ["Differential diagnosis built", "from memory"],
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
    collapsedTitle: ["Registry data", "entered twice"],
    description:
      "Patient data is re-keyed into national registries and reporting systems. Duplicate effort with no single source of truth.",
  },
];

const AUTOPLAY_MS = 4000;
const COLLAPSED_W = 240;
const COLLAPSED_W_COMPACT = 100;
const CARD_GAP = 12;
const MIN_EXPANDED_W = 320;
const WIDTH_MS = 520;

const CARD_GRADIENT =
  "radial-gradient(110% 85% at 78% 18%, rgba(95,215,203,0.16) 0%, transparent 52%), radial-gradient(85% 75% at 18% 82%, rgba(2,67,133,0.4) 0%, transparent 58%), linear-gradient(145deg, #024385 0%, #00101f 58%, #000810 100%)";

function BurdenActiveCardPanel({
  card,
  showLabel = false,
  className = "",
}: {
  card: BurdenCard;
  showLabel?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: CARD_GRADIENT }}
      />
      <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
        {showLabel && (
          <span className="secondaryFont text-[0.68rem] font-medium tracking-[0.22em] text-white/45 uppercase">
            {card.label}
          </span>
        )}
        <h3
          className={`max-w-md text-left text-[clamp(1.25rem,4vw,1.85rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-white ${showLabel ? "mt-4" : "mt-auto"}`}
        >
          {card.title}
        </h3>
        <p className="secondaryFont mt-4 max-w-md text-left text-sm leading-relaxed text-white/55 sm:text-[0.9375rem]">
          {card.description}
        </p>
      </div>
    </div>
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

function BurdenCardDots({
  active,
  reduce,
  onSelect,
}: {
  active: number;
  reduce: boolean | null;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2.5 sm:mt-8">
      {CARDS.map((card, index) => {
        const isDotActive = index === active;
        return (
          <motion.button
            key={card.id}
            type="button"
            onClick={() => onSelect(index)}
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
  );
}

function BurdenMobileCarousel({
  active,
  reduce,
  onSelect,
}: {
  active: number;
  reduce: boolean | null;
  onSelect: (index: number) => void;
}) {
  const card = CARDS[active];

  return (
    <div className="lg:hidden">
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CARDS.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-pressed={isActive}
              className={`secondaryFont shrink-0 rounded-full border px-3.5 py-1.5 text-[0.65rem] font-medium tracking-[0.16em] uppercase transition-colors sm:px-4 sm:text-[0.68rem] ${
                isActive
                  ? "border-brand bg-brand text-white"
                  : "border-[#d4dce6] bg-white text-[#6e6e73] hover:border-[#b8c4d4]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={card.id}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <BurdenActiveCardPanel
            card={card}
            showLabel
            className="min-h-[280px] sm:min-h-[320px]"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function BurdenCardItem({
  card,
  index,
  active,
  expandedWidth,
  collapsedWidth,
  onSelect,
}: {
  card: BurdenCard;
  index: number;
  active: number;
  expandedWidth: number;
  collapsedWidth: number;
  onSelect: (index: number) => void;
}) {
  const isActive = index === active;
  const width = isActive ? expandedWidth : collapsedWidth;
  const useCompactCollapsed = collapsedWidth < 160;

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-pressed={isActive}
      aria-label={`${card.label}: ${card.title}`}
      style={{ width }}
      className={`relative h-full shrink-0 cursor-pointer overflow-hidden rounded-2xl text-left transition-[width] duration-500 ease-out ${
        !isActive ? "bg-[#f4f6f9] hover:bg-[#eef1f5]" : ""
      }`}
    >
      <div
        className="absolute inset-y-0 left-0"
        style={{ width: expandedWidth }}
        aria-hidden={!isActive}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: CARD_GRADIENT }}
        />

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
      </div>

      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 z-10 ${useCompactCollapsed ? "" : "flex items-center justify-center px-4"}`}
          >
            {useCompactCollapsed ? (
              <CollapsedCardContent card={card} />
            ) : (
              <h3 className="max-w-full text-center text-sm leading-snug text-white">
                <span className="block">{card.collapsedTitle[0]}</span>
                <span className="block">{card.collapsedTitle[1]}</span>
              </h3>
            )}
          </motion.div>
        )}
      </AnimatePresence>
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
  const collapsedWidth = rowWidth >= 1280 ? COLLAPSED_W : COLLAPSED_W_COMPACT;
  const expandedWidth =
    rowWidth > 0
      ? Math.max(
          MIN_EXPANDED_W,
          rowWidth - gapTotal - (CARDS.length - 1) * collapsedWidth,
        )
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
          <BurdenMobileCarousel active={active} reduce={reduce} onSelect={goTo} />

          <div
            ref={rowRef}
            className="hidden h-[min(420px,58vw)] min-h-[320px] gap-2.5 lg:flex sm:gap-3"
          >
            {CARDS.map((card, index) => (
              <BurdenCardItem
                key={card.id}
                card={card}
                index={index}
                active={active}
                expandedWidth={expandedWidth}
                collapsedWidth={collapsedWidth}
                onSelect={goTo}
              />
            ))}
          </div>

          <BurdenCardDots active={active} reduce={reduce} onSelect={goTo} />
        </Reveal>
      </div>
    </section>
  );
}
