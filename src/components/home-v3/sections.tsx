import Image from "next/image";
import Link from "next/link";

import { Eyebrow, SectionLabel } from "@/components/chrome/eyebrow";
import {
  HOME_V3_HOW,
  HOME_V3_OPENING_BAND,
  HOME_V3_PROBLEM,
  HOME_V3_SHIFT,
  HOME_V3_WHO,
} from "@/content/home-v3";
import type { HomeSectionMeta } from "@/lib/cms/home-content";

type SectionProps = { section: HomeSectionMeta; num: string };

const pad = (i: number) => String(i + 1).padStart(2, "0");

/** The white card that lifts on hover — pillars and doors share it. */
const LIFT_CARD =
  "border-rule rounded-card shadow-card hover:shadow-card-lift text-ink flex min-w-0 flex-col border " +
  "bg-white transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1";

/** Left-aligned heading with its supporting sentence to the right. */
function SplitHeading({
  num,
  eyebrow,
  heading,
  description,
  descriptionWidth,
  tone = "light",
}: {
  num: string;
  eyebrow: string;
  heading: string;
  description: string;
  descriptionWidth: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="flex min-w-0 flex-col gap-3.5">
        <SectionLabel num={num} tone={tone}>
          {eyebrow}
        </SectionLabel>
        <h2
          className={`font-headline m-0 max-w-[760px] text-[clamp(30px,4vw,48px)] leading-[1.08] tracking-[-0.018em] text-pretty ${
            dark ? "text-white" : ""
          }`}
        >
          {heading}
        </h2>
      </div>
      <p
        className={`m-0 text-[14.5px] leading-[1.7] ${dark ? "text-sky" : "text-ink-body"}`}
        style={{ maxWidth: descriptionWidth }}
      >
        {description}
      </p>
    </div>
  );
}

/**
 * Hairlines between the four figures: one column below `nav`, a 2x2 divided by
 * rules above it — so what a cell carries depends on where it lands in both.
 */
function factCell(i: number) {
  const stacked = i > 0 ? "border-t border-t-rule-light" : "";
  const column =
    i % 2 === 1
      ? "nav:border-l nav:border-l-rule-light nav:pl-[clamp(18px,2.4vw,32px)]"
      : "nav:pr-[clamp(18px,2.4vw,32px)]";
  // Only the bottom row keeps a top rule once the cells are side by side.
  const topRule = i > 1 ? "" : "nav:border-t-0";
  return `py-4 nav:py-[18px] ${stacked} ${column} ${topRule}`;
}

/** Only below `nav`, where the row has become a swipe strip. */
function SwipeHint({ count }: { count: string }) {
  return (
    <span className="font-mono-label text-ink-soft nav:hidden mt-[26px] block text-[10.5px] tracking-[0.16em] uppercase">
      Swipe for all {count} →
    </span>
  );
}

/**
 * The wide photograph between the hero and section 01.
 *
 * It sits at the top of the lifting fold, so it is the first thing the white
 * sheet brings up over the hero. A scrim carries the caption pill; without one
 * the mono label is unreadable against the lower half of the picture.
 */
export function OpeningBand() {
  const band = HOME_V3_OPENING_BAND;

  return (
    <div className="relative h-[clamp(230px,31vw,420px)] w-full overflow-hidden bg-[#EEF2F5]">
      <Image
        src={band.src}
        alt={band.alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: band.position }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,28,0)_52%,rgba(7,18,28,0.42)_100%)]"
      />
      <span className="font-mono-label left-edge pointer-events-none absolute bottom-4 z-[2] rounded-full bg-[rgba(7,18,28,0.62)] px-3 py-1.5 text-[10px] tracking-[0.16em] text-white uppercase">
        {band.caption}
      </span>
    </div>
  );
}

/** 01 — why a diagnosis takes years, as four dark tiles and the scale behind it. */
export function Problem({ section, num }: SectionProps) {
  const content = HOME_V3_PROBLEM;

  return (
    <section
      id={section.id}
      data-reveal
      className="border-rule-light px-edge pt-sect-top pb-sect-bot scroll-mt-32 border-t"
    >
      <div className="max-w-site mx-auto">
        <SplitHeading
          num={num}
          eyebrow={section.eyebrow}
          heading={content.heading}
          description={content.description}
          descriptionWidth="400px"
        />
        <SwipeHint count="four" />

        <div
          className="swipe-row nav:grid nav:grid-cols-2 mid:grid-cols-4 mt-11 gap-[18px]"
          style={{ "--swipe-col": "84%" } as React.CSSProperties}
        >
          {content.tiles.map((tile, i) => (
            <div
              key={tile.title}
              className="bg-dark-tile rounded-card flex min-w-0 flex-col gap-3 px-6 pt-[26px] pb-6 shadow-[0_18px_44px_rgba(7,59,104,0.10)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_28px_62px_rgba(7,22,31,0.26)]"
            >
              <span className="font-mono-label text-sky-bright text-[10.5px] tracking-[0.16em] uppercase">
                {pad(i)}
              </span>
              <h3 className="font-headline m-0 text-2xl leading-[1.16] tracking-[-0.015em] text-pretty text-white">
                {tile.title}
              </h3>
              <p className="text-sky m-0 text-sm leading-[1.7]">{tile.body}</p>
            </div>
          ))}
        </div>

        <div className="border-rule rounded-card bg-sheet-soft mt-[22px] border px-[clamp(18px,2.4vw,28px)] py-6">
          <div className="nav:grid-cols-[auto_minmax(0,1fr)] nav:gap-[clamp(28px,4vw,56px)] grid items-center gap-7">
            <div className="flex min-w-0 flex-col gap-3">
              {/* The "~80% are genetic in origin" figure, drawn. */}
              <div aria-hidden className="grid w-full max-w-[190px] grid-cols-10 gap-1">
                {Array.from({ length: 100 }, (_, i) => (
                  <span
                    key={i}
                    className={`block w-full rounded-full pb-[100%] ${
                      i < content.dotGrid.filled ? "bg-primary" : "bg-[#DCE4EA]"
                    }`}
                  />
                ))}
              </div>
              <p className="text-ink-soft m-0 max-w-[210px] text-[12.5px] leading-[1.55]">
                {content.dotGrid.caption}
              </p>
            </div>

            <dl className="nav:grid-cols-2 m-0 grid grid-cols-1 gap-0">
              {content.facts.map((fact, i) => (
                <div key={fact.label} className={`flex min-w-0 flex-col gap-[9px] ${factCell(i)}`}>
                  <dt className="font-mono-label text-primary text-[clamp(26px,2.8vw,34px)] leading-none">
                    {fact.figure}
                  </dt>
                  <dd className="text-ink-body m-0 text-[13.5px] leading-[1.55]">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="border-rule-light text-ink-soft m-0 mt-5 border-t pt-4 text-xs leading-[1.6]">
            {content.factsNote}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Left rules between the shift columns: every column but the first while they
 * are one row (swiping, or four across), and only the right-hand column in the
 * two-across band.
 */
function shiftRule(i: number) {
  if (i === 0) return "";
  return i % 2 === 0
    ? "border-l border-l-white/18 nav:border-l-0 mid:border-l"
    : "border-l border-l-white/18";
}

/** 02 — the four changes, as before → after columns on the dark band. */
export function Shift({ section, num }: SectionProps) {
  const content = HOME_V3_SHIFT;

  return (
    <section
      id={section.id}
      data-reveal
      className="bg-dark-band px-edge scroll-mt-32 pt-[clamp(62px,6.5vw,90px)] pb-[clamp(66px,7vw,96px)] text-white"
    >
      <div className="max-w-site mx-auto">
        <SplitHeading
          num={num}
          eyebrow={section.eyebrow}
          heading={content.heading}
          description={content.description}
          descriptionWidth="360px"
          tone="dark"
        />

        <ol
          className="swipe-row nav:grid nav:grid-cols-2 mid:grid-cols-4 m-0 mt-11 list-none border-t border-white/28 p-0"
          style={{ "--swipe-col": "76%" } as React.CSSProperties}
        >
          {content.shifts.map((shift, i) => (
            <li
              key={shift.to}
              className={`flex min-w-0 flex-col items-stretch gap-3 border-b border-b-white/28 px-6 pt-[26px] pb-7 transition-colors duration-200 hover:bg-white/6 ${shiftRule(i)}`}
            >
              <span className="font-mono-label text-mint text-[10.5px] tracking-[0.14em]">
                {pad(i)}
              </span>
              {/* Labelled rather than struck through, so the change reads as a
                  transformation instead of a correction. */}
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono-label text-sky-soft w-9 flex-none text-[10.5px] tracking-[0.16em] uppercase">
                  From
                </span>
                <span className="text-sky-bright text-sm leading-normal">{shift.from}</span>
              </div>
              <span aria-hidden className="block h-px bg-white/14" />
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono-label text-mint w-9 flex-none text-[10.5px] tracking-[0.16em] uppercase">
                  To
                </span>
                <span className="font-headline text-[21px] leading-[1.24] tracking-[-0.012em] text-pretty text-white">
                  {shift.to}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 03 — deployment, standards, and who the work is operated with. */
export function How({ section, num }: SectionProps) {
  const content = HOME_V3_HOW;

  return (
    <section id={section.id} data-reveal className="px-edge pt-sect-top pb-sect-bot scroll-mt-32">
      <div className="max-w-site mx-auto">
        <Eyebrow>
          {num} · {section.eyebrow}
        </Eyebrow>
        <h2 className="font-headline mx-auto mt-[26px] mb-3.5 max-w-[760px] text-center text-[clamp(32px,4vw,50px)] leading-[1.1] tracking-[-0.018em] text-pretty">
          {content.heading}
        </h2>
        <p className="text-ink-body mx-auto m-0 max-w-[600px] text-center text-[15.5px] leading-[1.72]">
          {content.description}
        </p>

        <ol
          className="swipe-row nav:grid nav:grid-cols-3 m-0 mt-12 list-none gap-[18px] p-0"
          style={{ "--swipe-col": "84%" } as React.CSSProperties}
        >
          {content.pillars.map((pillar, i) => (
            <li key={pillar.title} className={`${LIFT_CARD} gap-3.5 px-[26px] pt-7 pb-[26px]`}>
              <div className="flex items-center gap-3">
                <span className="font-mono-label text-primary text-[11px] tracking-[0.2em]">
                  {pad(i)}
                </span>
                <span aria-hidden className="bg-rule-light block h-px flex-1" />
              </div>
              <h3 className="font-headline m-0 text-[clamp(23px,2.6vw,27px)] leading-[1.14] tracking-[-0.015em] text-pretty">
                {pillar.title}
              </h3>
              <p className="text-ink-body m-0 text-[14.5px] leading-[1.7]">{pillar.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * 05 — four audiences, one per card, each over a photograph of the setting it
 * describes. The titles state what the platform does for that audience rather
 * than addressing the reader, which is what this round set out to remove.
 */
export function Who({ section, num }: SectionProps) {
  const content = HOME_V3_WHO;

  return (
    <section id={section.id} data-reveal className="px-edge pt-sect-top pb-sect-bot scroll-mt-32">
      <div className="max-w-site mx-auto">
        <SplitHeading
          num={num}
          eyebrow={section.eyebrow}
          heading={content.heading}
          description={content.description}
          descriptionWidth="380px"
        />
        <SwipeHint count="four" />

        <div
          className="swipe-row nav:grid nav:grid-cols-2 mid:grid-cols-4 mt-10 gap-[18px]"
          style={{ "--swipe-col": "86%" } as React.CSSProperties}
        >
          {content.doors.map((door) => (
            <Link key={door.href} href={door.href} className={`${LIFT_CARD} overflow-hidden`}>
              {/* The tint stands in if the photograph is ever missing. */}
              <div
                className="border-rule relative h-[150px] w-full flex-none overflow-hidden border-b"
                style={{ backgroundColor: door.photo.ground }}
              >
                <Image
                  src={door.photo.src}
                  alt={door.photo.alt}
                  fill
                  sizes="(max-width: 880px) 86vw, (max-width: 1040px) 50vw, 25vw"
                  className="object-cover"
                  style={{ objectPosition: door.photo.position }}
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-[13px] px-6 pt-[22px] pb-6">
                <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                  {door.kicker}
                </span>
                <h3 className="font-headline m-0 text-[clamp(23px,2.6vw,28px)] leading-[1.14] tracking-[-0.015em] text-pretty">
                  {door.title}
                </h3>
                <p className="text-ink-body m-0 text-sm leading-[1.65]">{door.blurb}</p>

                <div className="border-rule-light mt-1.5 flex flex-col gap-2 border-t pt-[15px]">
                  {door.points.map((point) => (
                    <div key={point} className="flex items-start gap-2.5">
                      <span
                        aria-hidden
                        className="bg-teal mt-[7px] block h-[5px] w-[5px] flex-none rounded-full"
                      />
                      <span className="text-ink-body text-[13.5px] leading-[1.55]">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Pushed to the bottom so the four CTAs line up despite the
                    cards carrying different amounts of copy. */}
                <span className="text-primary mt-auto inline-flex items-center gap-[7px] pt-3.5 text-[13.5px] font-bold">
                  {door.ctaLabel}
                  <span aria-hidden className="text-xs">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
