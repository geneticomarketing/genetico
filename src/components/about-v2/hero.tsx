"use client";

import { scrollToSection } from "@/components/chrome/page-sections";
import { ABOUT_V2_HERO } from "@/content/about-v2";

/** Each part of the hero fades up on load, a beat after the one above it. */
const FADE_UP = "motion-safe:animate-[fade-up_.8s_cubic-bezier(.22,.61,.36,1)_both]";

/**
 * Who we are: the statement, two ways into the page, and an "at a glance"
 * panel of three facts.
 *
 * The panel's columns divide with a left rule side by side and a top rule once
 * they stack, so the dividers always fall between cells.
 */
export function AboutV2Hero() {
  const { headline, primaryCta, secondaryCta } = ABOUT_V2_HERO;

  const jump = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(target);
  };

  return (
    <section
      id="top"
      className="px-edge scroll-mt-32 bg-[linear-gradient(180deg,#FAFBFC_0%,#ffffff_45%)] pt-[clamp(53px,5.5vw,76px)] pb-[clamp(67px,7vw,96px)]"
    >
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-[26px] text-center">
        <span className="font-mono-label text-ink-body text-[10.5px] tracking-[0.16em] uppercase motion-safe:animate-[fade-up_.7s_cubic-bezier(.22,.61,.36,1)_both] [animation-delay:60ms]">
          {ABOUT_V2_HERO.eyebrow}
        </span>
        <h1 className="font-headline text-ink m-0 max-w-[900px] text-[clamp(36px,5vw,62px)] leading-[1.06] tracking-[-0.02em] text-balance motion-safe:animate-[fade-up_.85s_cubic-bezier(.22,.61,.36,1)_both] [animation-delay:150ms]">
          {headline.before} <span className="text-primary">{headline.highlight}</span>{" "}
          {headline.after}
        </h1>
        <p
          className={`text-ink-body m-0 max-w-[640px] text-[17px] leading-[1.72] text-pretty ${FADE_UP} [animation-delay:280ms]`}
        >
          {ABOUT_V2_HERO.blurb}
        </p>
        <div className={`flex flex-wrap justify-center gap-2.5 ${FADE_UP} [animation-delay:380ms]`}>
          <a
            href={`#${primaryCta.target}`}
            onClick={jump(primaryCta.target)}
            className="bg-primary-deep hover:bg-primary inline-flex items-center gap-[9px] rounded-full px-[clamp(18px,2vw,28px)] py-[13px] text-sm font-bold text-white transition-colors"
          >
            {primaryCta.label}
            <span aria-hidden className="text-[13px]">
              ↓
            </span>
          </a>
          <a
            href={`#${secondaryCta.target}`}
            onClick={jump(secondaryCta.target)}
            className="border-rule text-ink hover:border-primary hover:text-primary inline-flex items-center gap-[9px] rounded-full border bg-white px-[clamp(18px,2vw,28px)] py-[13px] text-sm font-medium transition-colors"
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>

      <div
        className={`border-rule rounded-card mx-auto mt-16 grid max-w-[1040px] border bg-[linear-gradient(180deg,#F3F7FA_0%,#FAFCFD_100%)] nav:grid-cols-3 ${FADE_UP} [animation-delay:520ms]`}
      >
        {ABOUT_V2_HERO.glance.map((item, i) => (
          <div
            key={item.label}
            className={`flex min-w-0 flex-col gap-2.5 p-[clamp(24px,2.8vw,34px)] text-left ${
              i > 0 ? "border-rule border-t nav:border-t-0 nav:border-l" : ""
            }`}
          >
            <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
              {item.label}
            </span>
            <p className="font-headline text-ink m-0 text-[21px] leading-[1.36] tracking-[-0.01em] text-pretty">
              {item.title}
            </p>
            <p className="text-ink-body m-0 text-[14.5px] leading-[1.65]">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
