import Image from "next/image";
import Link from "next/link";

import { Eyebrow, SectionLabel } from "@/components/chrome/eyebrow";
import {
  ABOUT_V2_AHEAD,
  ABOUT_V2_BUILDING,
  ABOUT_V2_PLATFORM,
  ABOUT_V2_TEAM,
  ABOUT_V2_TODAY,
  ABOUT_V2_WHY,
} from "@/content/about-v2";

type SectionProps = { id: string; eyebrow: string; num: string };

const pad = (i: number) => String(i + 1).padStart(2, "0");

/** Every section of this page shares one rhythm; only the background varies. */
const SECTION = "px-edge pt-sect-top pb-sect-bot scroll-mt-32";

const H2 =
  "font-headline text-ink text-[clamp(32px,4vw,50px)] leading-[1.1] tracking-[-0.018em] text-pretty";

const CARD = "border-rule rounded-card shadow-card border bg-white";

const LIFT =
  "transition-[transform,box-shadow] duration-[220ms] ease-out hover:-translate-y-1 hover:shadow-card-lift";

/** A centred eyebrow over a centred heading — sections 01 and 03. */
function CentredHeading({
  num,
  eyebrow,
  heading,
}: {
  num: string;
  eyebrow: string;
  heading: string;
}) {
  return (
    <>
      <Eyebrow>
        {num} · {eyebrow}
      </Eyebrow>
      <h2 className={`${H2} mx-auto mt-7 mb-0 max-w-[720px] text-center`}>{heading}</h2>
    </>
  );
}

/** Left-aligned numbered heading with a supporting sentence to its right — 02 and 04. */
function SplitHeading({
  num,
  eyebrow,
  heading,
  aside,
}: {
  num: string;
  eyebrow: string;
  heading: string;
  aside: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="flex max-w-[680px] min-w-0 flex-col gap-3.5">
        <SectionLabel num={num}>{eyebrow}</SectionLabel>
        <h2 className={`${H2} m-0`}>{heading}</h2>
      </div>
      <p className="text-ink-body m-0 max-w-[380px] text-[14.5px] leading-[1.7]">{aside}</p>
    </div>
  );
}

/** 01 — the three ways the record breaks, and why Genetico started. */
export function WhyWeExist({ id, eyebrow, num }: SectionProps) {
  return (
    <section id={id} data-reveal className={SECTION}>
      <div className="max-w-site mx-auto">
        <CentredHeading num={num} eyebrow={eyebrow} heading={ABOUT_V2_WHY.heading} />
        <p className="text-ink-body mx-auto mt-5 mb-0 max-w-[620px] text-center text-base leading-[1.75] text-pretty">
          {ABOUT_V2_WHY.lead}
        </p>
        <div className="mt-[clamp(40px,5vw,56px)] grid gap-[18px] mid:grid-cols-3">
          {ABOUT_V2_WHY.items.map((item, i) => (
            <div
              key={item.title}
              className={`${CARD} flex flex-col gap-3 px-[26px] pt-7 pb-[26px]`}
            >
              <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                {pad(i)}
              </span>
              <h3 className="font-headline m-0 text-2xl leading-[1.16] tracking-[-0.015em]">
                {item.title}
              </h3>
              <p className="text-ink-body m-0 text-[14.5px] leading-[1.7]">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="font-headline text-ink mx-auto mt-[clamp(40px,5vw,56px)] mb-0 max-w-[760px] text-center text-[clamp(21px,2.4vw,29px)] leading-[1.42] tracking-[-0.01em] text-pretty">
          {ABOUT_V2_WHY.closing}
        </p>
      </div>
    </section>
  );
}

/** 02 — the chain from the clinic to policy, under one dark rule. */
export function Building({ id, eyebrow, num }: SectionProps) {
  return (
    <section
      id={id}
      data-reveal
      className={`${SECTION} bg-sheet-soft border-rule-light border-t border-b`}
    >
      <div className="max-w-site mx-auto">
        <SplitHeading
          num={num}
          eyebrow={eyebrow}
          heading={ABOUT_V2_BUILDING.heading}
          aside={ABOUT_V2_BUILDING.mission}
        />
        <div className="border-ink mt-[clamp(40px,5vw,56px)] grid gap-x-6 border-t nav:grid-cols-5">
          {ABOUT_V2_BUILDING.chain.map((step, i) => (
            <div key={step.title} className="flex flex-col gap-2.5 pt-[22px] pb-2">
              <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                {pad(i)} →
              </span>
              <h3 className="font-headline m-0 text-2xl leading-[1.16] tracking-[-0.015em]">
                {step.title}
              </h3>
              <p className="text-ink-body m-0 text-[14.5px] leading-[1.65]">{step.body}</p>
            </div>
          ))}
        </div>
        <p className="text-ink-soft mt-9 mb-0 text-[13px] leading-[1.6]">
          {ABOUT_V2_BUILDING.footnote}
        </p>
      </div>
    </section>
  );
}

/**
 * 03 — which of the two names is which, then what the platform does.
 *
 * The IndiGeneUs mark turns once every 14 seconds; reduced motion holds it
 * still, since `motion-safe` never attaches the animation.
 */
export function PlatformFit({ id, eyebrow, num }: SectionProps) {
  const { company, platform, steps } = ABOUT_V2_PLATFORM;

  return (
    <section id={id} data-reveal className={SECTION}>
      <div className="max-w-site mx-auto">
        <CentredHeading num={num} eyebrow={eyebrow} heading={ABOUT_V2_PLATFORM.heading} />

        <div className="mt-[clamp(40px,5vw,56px)] grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
          <div className="border-rule rounded-card bg-sheet-cool flex flex-col gap-3.5 border p-[clamp(28px,3.4vw,40px)]">
            <Image
              src="/brand/genetico-logo.png"
              alt="Genetico"
              width={1388}
              height={402}
              className="block h-[30px] w-auto self-start"
            />
            <span className="font-mono-label text-ink-soft mt-2 text-[10.5px] tracking-[0.16em] uppercase">
              {company.label}
            </span>
            <p className="font-headline text-ink m-0 text-[22px] leading-[1.38] tracking-[-0.01em]">
              {company.statement}
            </p>
            <p className="text-ink-body m-0 text-[14.5px] leading-[1.7]">{company.body}</p>
          </div>

          <div className="rounded-card bg-dark-band flex flex-col gap-3.5 p-[clamp(28px,3.4vw,40px)] text-white">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/indigeneus-mark-white.png"
                alt=""
                width={1065}
                height={1061}
                className="block h-[30px] w-auto will-change-transform motion-safe:animate-[spin-mark_14s_linear_infinite]"
              />
              <span className="text-[17px] font-medium">{platform.name}</span>
            </div>
            <span className="font-mono-label text-sky-bright mt-2 text-[10.5px] tracking-[0.16em] uppercase">
              {platform.label}
            </span>
            <p className="font-headline m-0 text-[22px] leading-[1.38] tracking-[-0.01em] text-white">
              {platform.statement}
            </p>
            <Link
              href={platform.ctaHref}
              className="hover:text-sky mt-auto inline-flex items-center gap-[7px] self-start pb-[3px] text-sm font-bold text-white shadow-[inset_0_-1px_0_rgba(255,255,255,0.5)] transition-colors"
            >
              {platform.ctaLabel}
              <span aria-hidden className="text-xs">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-[18px] grid gap-[18px] nav:grid-cols-2 mid:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`border-rule rounded-card flex flex-col gap-2 border bg-white px-[22px] pt-[22px] pb-5 ${LIFT}`}
            >
              <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                {pad(i)} · {step.title}
              </span>
              <p className="text-ink-body m-0 text-[14.5px] leading-[1.65]">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 04 — three figures, then the featured case study from the Resources page. */
export function Today({
  id,
  eyebrow,
  num,
  awardCount,
  firstAwardYear,
  caseStudy,
}: SectionProps & {
  awardCount: number;
  firstAwardYear: string;
  caseStudy: { kicker: string; title: string; href: string; ctaLabel: string };
}) {
  const figures = [...ABOUT_V2_TODAY.figures];
  if (awardCount) {
    figures.push({
      label: ABOUT_V2_TODAY.awards.label,
      figure: `${awardCount} grants & awards`,
      body: `${firstAwardYear ? `Since ${firstAwardYear}, ` : ""}${ABOUT_V2_TODAY.awards.body}`,
    });
  }

  return (
    <section
      id={id}
      data-reveal
      className={`${SECTION} bg-sheet-cool border-rule border-t border-b`}
    >
      <div className="max-w-site mx-auto">
        <SplitHeading
          num={num}
          eyebrow={eyebrow}
          heading={ABOUT_V2_TODAY.heading}
          aside={ABOUT_V2_TODAY.description}
        />
        <div className="mt-[clamp(40px,5vw,56px)] grid gap-[18px] nav:grid-cols-3">
          {figures.map((item) => (
            <div
              key={item.label}
              className={`${CARD} flex flex-col gap-2.5 px-[26px] pt-7 pb-[26px]`}
            >
              <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.16em] uppercase">
                {item.label}
              </span>
              <span className="font-headline text-primary text-[clamp(30px,3.4vw,42px)] leading-[1.05] tracking-[-0.02em]">
                {item.figure}
              </span>
              <p className="text-ink-body m-0 text-[14.5px] leading-[1.65]">{item.body}</p>
            </div>
          ))}
        </div>
        <Link
          href={caseStudy.href}
          className={`border-rule rounded-card text-ink hover:text-ink mt-[18px] flex flex-wrap items-center justify-between gap-x-8 gap-y-[18px] border bg-white px-[clamp(20px,2.6vw,30px)] py-6 ${LIFT}`}
        >
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-2">
            <span className="font-mono-label text-teal-mid text-[10.5px] tracking-[0.16em] uppercase">
              {caseStudy.kicker}
            </span>
            <span className="font-headline text-[clamp(20px,2.1vw,26px)] leading-[1.3] tracking-[-0.01em]">
              {caseStudy.title}
            </span>
          </div>
          <span className="text-primary inline-flex flex-none items-center gap-[7px] text-sm font-bold">
            {caseStudy.ctaLabel}
            <span aria-hidden className="text-xs">
              →
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}

/**
 * 05 — the vision, then three horizons.
 *
 * Each horizon hangs from a hairline with a dot on it: filled teal for what is
 * happening now, hollow blue for what comes after.
 */
export function Ahead({ id, eyebrow, num }: SectionProps) {
  return (
    <section id={id} data-reveal className={SECTION}>
      <div className="max-w-site mx-auto">
        <Eyebrow>
          {num} · {eyebrow}
        </Eyebrow>
        <p className="font-headline text-ink mx-auto mt-7 mb-0 max-w-[820px] text-center text-[clamp(28px,3.4vw,42px)] leading-[1.2] tracking-[-0.018em] text-balance">
          {ABOUT_V2_AHEAD.vision}
        </p>
        <div className="mt-[clamp(40px,5vw,56px)] grid gap-[clamp(24px,3vw,40px)] mid:grid-cols-3">
          {ABOUT_V2_AHEAD.horizons.map((horizon, i) => {
            const now = i === 0;
            return (
              <div
                key={horizon.when}
                className="border-rule relative flex flex-col gap-2.5 border-t pt-6"
              >
                <span
                  aria-hidden
                  className={`absolute -top-[5px] left-0 block h-[9px] w-[9px] rounded-full ${
                    now ? "bg-teal" : "border-primary border-[1.5px] bg-white"
                  }`}
                />
                <span
                  className={`font-mono-label text-[10.5px] tracking-[0.16em] uppercase ${
                    now ? "text-teal-mid" : "text-primary"
                  }`}
                >
                  {horizon.when}
                </span>
                <h3 className="font-headline m-0 text-2xl leading-[1.16] tracking-[-0.015em]">
                  {horizon.title}
                </h3>
                <p className="text-ink-body m-0 text-[14.5px] leading-[1.7]">{horizon.body}</p>
              </div>
            );
          })}
        </div>
        <p className="text-ink-soft mt-8 mb-0 text-[13px] leading-[1.6]">
          {ABOUT_V2_AHEAD.footnote}
        </p>
      </div>
    </section>
  );
}

/**
 * "How we work" — closes the team section. Below `nav` the three cards become
 * a snapping sideways row with a hint, rather than a tall stack.
 */
export function Beliefs() {
  return (
    <>
      <div className="mt-14 flex items-center gap-4">
        <span className="font-mono-label text-ink-soft flex-none text-[11px] tracking-[0.2em] uppercase">
          How we work
        </span>
        <span aria-hidden className="bg-rule block h-px flex-1" />
      </div>
      <span className="font-mono-label text-ink-soft mt-[18px] block text-[10.5px] tracking-[0.16em] uppercase nav:hidden">
        Swipe for all three →
      </span>
      <div className="swipe-row mt-10 nav:grid nav:grid-cols-3 nav:gap-[18px]">
        {ABOUT_V2_TEAM.beliefs.map((belief, i) => (
          <div
            key={belief.title}
            className={`${CARD} flex min-w-0 flex-col gap-3 px-[26px] pt-7 pb-[26px] ${LIFT}`}
          >
            <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
              {pad(i)}
            </span>
            <h3 className="font-headline m-0 text-2xl leading-[1.16] tracking-[-0.015em] text-pretty">
              {belief.title}
            </h3>
            <p className="text-ink-body m-0 text-[14.5px] leading-[1.7]">{belief.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
