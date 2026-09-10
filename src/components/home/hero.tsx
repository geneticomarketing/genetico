"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { HeroDemoPanel } from "@/components/home/hero-demo-panel";
import { HeroGrid } from "@/components/home/hero-grid";
import { scrollToSection } from "@/components/chrome/page-sections";
import type { HomeHeroContent } from "@/lib/cms/home-content";

/** How long each word holds before the headline swaps it. */
const WORD_HOLD_MS = 2600;

/**
 * The home hero.
 *
 * Sticky at the top of the page: the white content sheet below scrolls up over
 * it, which is the page's signature move. The headline ends in a word that
 * cycles through the three audiences the site serves — held still under reduced
 * motion, where the audience doors immediately below carry the same meaning.
 */
export function Hero({ content }: { content: HomeHeroContent }) {
  const words = content.rotatingWords.length ? content.rotatingWords : [""];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, WORD_HOLD_MS);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <section
      id="top"
      className="sticky top-0 z-0 flex min-h-[calc(100svh-64px)] scroll-mt-32 items-center px-[clamp(20px,4vw,32px)] pt-[clamp(18px,3vh,40px)] pb-[clamp(22px,4vh,52px)]"
    >
      <div className="bg-hero-ground absolute -top-16 right-0 bottom-0 left-0 z-0 overflow-hidden">
        <HeroGrid />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[200px] -left-[240px] h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(18,22,26,0.055)_0%,rgba(18,22,26,0)_68%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[220px] -bottom-[300px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(18,22,26,0.05)_0%,rgba(18,22,26,0)_66%)]"
        />
      </div>

      {/* One column until `nav` (880px), then the panel comes alongside; the
          columns rebalance and the gap opens up again at `mid` (1040px). */}
      <div className="max-w-site nav:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] nav:items-center mid:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] mid:gap-[clamp(34px,5vw,64px)] relative z-[1] mx-auto grid w-full grid-cols-[minmax(0,1fr)] items-start gap-[30px]">
        <div className="flex min-w-0 flex-col items-start gap-[clamp(14px,2.4vh,24px)]">
          <div className="flex items-center gap-3">
            <span aria-hidden className="block h-px w-[42px] bg-[image:var(--gradient-hairline)]" />
            <span className="font-mono-label text-primary text-[11px] tracking-[0.2em] uppercase">
              {content.eyebrow}
            </span>
          </div>

          <h1 className="font-headline text-ink m-0 text-[clamp(34px,min(5vw,7vh),62px)] leading-[1.06] tracking-[-0.02em] text-pretty">
            {content.headline}
            <br />
            <span
              key={wordIndex}
              className={`text-primary inline-block [backface-visibility:hidden] [transform-origin:50%_0] ${
                wordIndex % 2 === 0
                  ? "motion-safe:animate-[word-in-a_.62s_cubic-bezier(.22,.61,.36,1)_both]"
                  : "motion-safe:animate-[word-in-b_.62s_cubic-bezier(.22,.61,.36,1)_both]"
              }`}
            >
              {words[wordIndex]}
            </span>
            <span className="text-ink">.</span>
          </h1>

          <p className="text-ink-body m-0 max-w-[540px] text-base leading-[1.75] text-pretty">
            <span className="nav:hidden">{content.blurbShort}</span>
            <span className="nav:inline hidden">{content.blurb}</span>
          </p>

          <div className="flex max-w-full gap-2.5">
            <Link
              href={content.primaryCta.href}
              onClick={(e) => {
                if (!content.primaryCta.href.startsWith("#")) return;
                e.preventDefault();
                scrollToSection(content.primaryCta.href.slice(1));
              }}
              className="bg-primary-deep hover:bg-primary inline-flex flex-auto items-center justify-center gap-[9px] rounded-full px-[clamp(18px,2vw,28px)] py-[13px] text-sm font-bold text-white transition-colors"
            >
              {content.primaryCta.label}
              <span aria-hidden className="text-[13px]">
                →
              </span>
            </Link>
            <Link
              href={content.secondaryCta.href}
              className="border-rule text-ink hover:border-primary hover:text-primary inline-flex flex-auto items-center justify-center gap-[9px] rounded-full border bg-white px-[clamp(18px,2vw,28px)] py-[13px] text-sm font-medium transition-colors"
            >
              {content.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-0.5 flex w-full flex-col gap-3 border-t border-[#E7ECF0] pt-4">
            <span className="font-mono-label text-ink-soft text-[10px] tracking-[0.18em] uppercase">
              {content.trustedByLabel}
            </span>
            <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_88%,transparent)]">
              <div className="flex w-max items-center motion-safe:animate-[marquee_34s_linear_infinite]">
                {[0, 1].map((copy) => (
                  <div key={copy} aria-hidden={copy === 1} className="flex items-center">
                    {content.credentials.map((credential) => (
                      <div key={credential} className="flex flex-none items-center gap-5 pr-5">
                        <span className="font-mono-label text-ink-body text-[11px] tracking-[0.16em] whitespace-nowrap uppercase">
                          {credential}
                        </span>
                        <span
                          aria-hidden
                          className="block h-[3px] w-[3px] flex-none rounded-full bg-[#C6CCD2]"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <HeroDemoPanel />
      </div>
    </section>
  );
}
