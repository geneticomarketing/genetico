"use client";

import { scrollToSection } from "@/components/chrome/page-sections";
import { HeroGrid } from "@/components/home/hero-grid";
import { HOME_V2_HERO } from "@/content/home-v2";

/** Shared entrance for every part of the hero; each part sets its own delay. */
const FADE_UP = "motion-safe:animate-[fade-up_.8s_cubic-bezier(.22,.61,.36,1)_both]";

/**
 * The rework's hero: one centred editorial statement of what Genetico is and
 * why it matters, with no product demo — that moves down to the platform
 * section, and IndiGeneUs.AI is not named here at all.
 *
 * Sticky, so the fold below lifts over it. Its parts fade up in sequence on
 * load, and the whole block eases back as the page scrolls away from it.
 */
export function HomeV2Hero({ credentials }: { credentials: string[] }) {
  const hero = HOME_V2_HERO;

  const jump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <section
      id="top"
      data-hero-fold
      className="px-edge max-[480px]:pt-4 max-[480px]:pb-[18px] sticky top-0 z-0 flex min-h-[calc(100svh-65px)] scroll-mt-32 items-center pt-[clamp(30px,5vh,64px)] pb-[clamp(34px,6vh,72px)]"
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
        className="max-w-site max-[480px]:gap-[9px] relative z-[1] mx-auto flex w-full flex-col items-center gap-[clamp(18px,2.6vh,30px)]"
      >
        <div
          data-hero-eyebrow
          className={`flex items-center gap-3 ${FADE_UP}`}
          style={{ animationDelay: "60ms" }}
        >
          <span
            aria-hidden
            className="max-[480px]:hidden block h-px w-[42px] bg-[image:var(--gradient-hairline)]"
          />
          <span className="font-mono-label text-primary max-[480px]:text-[9px] max-[480px]:tracking-[0.12em] text-[11px] tracking-[0.2em] uppercase">
            {hero.eyebrow}
          </span>
          <span
            aria-hidden
            className="max-[480px]:hidden block h-px w-[42px] bg-[image:var(--gradient-hairline-flip)]"
          />
        </div>

        <h1
          className="font-headline text-ink m-0 max-w-[1000px] text-center text-[clamp(34px,min(5.2vw,7.2vh),62px)] max-[480px]:text-[30px] leading-[1.06] tracking-[-0.02em] text-balance motion-safe:animate-[fade-up_.85s_cubic-bezier(.22,.61,.36,1)_both]"
          style={{ animationDelay: "150ms" }}
        >
          {hero.headline} <span className="text-primary">{hero.headlineAccent}</span>
        </h1>

        <p
          className={`text-ink-body m-0 max-w-[720px] text-center text-[clamp(15.5px,1.4vw,17.5px)] leading-[1.7] text-pretty ${FADE_UP}`}
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
            className="bg-primary-deep hover:bg-primary inline-flex items-center gap-[9px] rounded-full px-[clamp(20px,2vw,28px)] py-[13px] text-sm font-bold text-white transition-colors"
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

        {/*
          The ecosystem as a connected spine rather than five detached pills:
          the five domains sit as nodes on one hairline. Below `nav` the line
          goes and the nodes wrap, since a single row no longer fits.
        */}
        <div
          data-hero-spine
          className="max-[480px]:gap-[9px] flex flex-col items-center gap-[clamp(10px,1.6vh,16px)]"
        >
          <span
            className={`font-mono-label text-ink-soft text-[10px] tracking-[0.18em] uppercase ${FADE_UP}`}
            style={{ animationDelay: "440ms" }}
          >
            {hero.scopeLabel}
          </span>

          <ul className="nav:gap-x-[clamp(14px,3vw,52px)] nav:items-start nav:gap-y-3.5 relative m-0 flex max-w-[980px] list-none flex-wrap items-center justify-center gap-x-4 gap-y-2.5 p-0 pt-1">
            <span
              aria-hidden
              className="nav:block absolute top-[9px] right-[8%] left-[8%] hidden h-px bg-[linear-gradient(90deg,rgba(11,76,134,0),#BBD1E3_12%,#BBD1E3_88%,rgba(11,76,134,0))]"
            />
            {hero.scope.map((label, i) => (
              <li
                key={label}
                className={`nav:flex-col nav:items-center nav:gap-[7px] relative flex flex-row items-center gap-2 ${FADE_UP}`}
                style={{ animationDelay: `${470 + i * 80}ms` }}
              >
                <span
                  aria-hidden
                  className="nav:h-[19px] nav:w-[19px] nav:shadow-[0_0_0_5px_rgba(255,255,255,0.9)] relative z-[1] flex h-[15px] w-[15px] items-center justify-center rounded-full border border-[#BBD1E3] bg-white"
                >
                  <span className="bg-primary nav:h-[7px] nav:w-[7px] block h-[5px] w-[5px] rounded-full" />
                </span>
                {/* Off the spine the index is just clutter — the labels read
                    as a set on their own, and the row is half the height. */}
                <span className="font-mono-label text-primary nav:block hidden text-[10px] tracking-[0.14em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink text-[13.5px] leading-[1.3] font-medium whitespace-nowrap">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* On the smallest phones the strip is what finally pushes the fold
            over; the same credentials are carried in full in section 06. */}
        <div
          data-hero-marquee
          className={`max-[380px]:hidden max-[480px]:gap-2 max-[480px]:pt-3 flex w-full max-w-[1000px] flex-col items-center gap-3 border-t border-[#E7ECF0] pt-[clamp(14px,2.4vh,22px)] ${FADE_UP}`}
          style={{ animationDelay: "760ms" }}
        >
          <span
            data-hero-marquee-label
            className="font-mono-label text-ink-soft max-[480px]:hidden text-[10px] tracking-[0.18em] uppercase"
          >
            {hero.marqueeLabel}
          </span>
          <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_88%,transparent)]">
            <div className="flex w-max items-center motion-safe:animate-[marquee_34s_linear_infinite]">
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex items-center">
                  {credentials.map((credential) => (
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
    </section>
  );
}
