"use client";

import { scrollToSection } from "@/components/chrome/page-sections";
import { HeroGrid } from "@/components/home/hero-grid";
import { HOME_AR_HERO } from "@/content/home-ar";

/** Shared entrance for every part of the hero; each part sets its own delay. */
const FADE_UP = "motion-safe:animate-[fade-up_.8s_cubic-bezier(.22,.61,.36,1)_both]";

/**
 * The company first: what Genetico is, over the interactive dot grid, with the
 * institutions behind the work running along the foot. IndiGeneUs.AI is only
 * named in the second button — section 03 introduces it.
 *
 * Sticky, so the fold below lifts over it; its parts fade up in sequence on
 * load, and the whole block eases back as the page scrolls away from it.
 */
export function HomeArHero() {
  const hero = HOME_AR_HERO;

  const jump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <section
      id="top"
      className="px-edge sticky top-0 z-0 flex min-h-[calc(100svh-64px)] scroll-mt-32 items-center pt-[clamp(30px,5vh,64px)] pb-[clamp(34px,6vh,72px)]"
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

      <div
        data-hero-recede
        className="max-w-site relative z-[1] mx-auto flex w-full flex-col items-center gap-[clamp(18px,2.6vh,30px)]"
      >
        <div className={`flex items-center gap-3 ${FADE_UP}`} style={{ animationDelay: "60ms" }}>
          <span aria-hidden className="block h-px w-[42px] bg-[image:var(--gradient-hairline)]" />
          <span className="font-mono-label text-primary text-[11px] leading-[1.3] tracking-[0.2em] uppercase">
            {hero.eyebrow}
          </span>
          <span
            aria-hidden
            className="block h-px w-[42px] bg-[image:var(--gradient-hairline-flip)]"
          />
        </div>

        <h1
          className="font-headline text-ink m-0 max-w-[980px] text-center text-[clamp(36px,min(5.4vw,7.6vh),66px)] leading-[1.05] tracking-[-0.02em] text-balance motion-safe:animate-[fade-up_.85s_cubic-bezier(.22,.61,.36,1)_both]"
          style={{ animationDelay: "150ms" }}
        >
          {hero.headline} <span className="text-primary">{hero.headlineAccent}</span>
        </h1>

        <p
          className={`text-ink-body m-0 max-w-[680px] text-center text-[clamp(15.5px,1.4vw,17.5px)] leading-[1.7] text-pretty ${FADE_UP}`}
          style={{ animationDelay: "280ms" }}
        >
          {hero.blurb}
        </p>

        <div
          className={`flex flex-wrap justify-center gap-2.5 ${FADE_UP}`}
          style={{ animationDelay: "380ms" }}
        >
          <a
            href={`#${hero.primaryCta.target}`}
            onClick={(e) => jump(e, hero.primaryCta.target)}
            className="bg-primary-deep hover:bg-primary inline-flex items-center gap-[9px] rounded-full px-[clamp(20px,2vw,28px)] py-[13px] text-sm font-bold text-white transition-colors hover:text-white"
          >
            {hero.primaryCta.label}
            <span aria-hidden className="text-[13px]">
              ↓
            </span>
          </a>
          <a
            href={`#${hero.secondaryCta.target}`}
            onClick={(e) => jump(e, hero.secondaryCta.target)}
            className="border-rule text-ink hover:border-primary hover:text-primary inline-flex items-center gap-[9px] rounded-full border bg-white px-[clamp(20px,2vw,28px)] py-[13px] text-sm font-medium transition-colors"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        <div
          className={`flex w-full max-w-[1000px] flex-col items-center gap-3 border-t border-[#E7ECF0] pt-[clamp(14px,2.4vh,22px)] ${FADE_UP}`}
          style={{ animationDelay: "760ms" }}
        >
          <span className="font-mono-label text-ink-soft text-[10px] tracking-[0.18em] uppercase">
            {hero.marqueeLabel}
          </span>
          <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_88%,transparent)]">
            <div className="flex w-max items-center motion-safe:animate-[marquee_34s_linear_infinite]">
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex items-center">
                  {hero.marquee.map((name) => (
                    <div key={name} className="flex flex-none items-center gap-5 pr-5">
                      <span className="font-mono-label text-ink-body text-[11px] tracking-[0.16em] whitespace-nowrap uppercase">
                        {name}
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
    </section>
  );
}
