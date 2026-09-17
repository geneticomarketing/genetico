import Image from "next/image";
import Link from "next/link";

import { SectionLabel } from "@/components/chrome/eyebrow";
import { HeroDemoPanel } from "@/components/home/hero-demo-panel";
import { HOME_V2_PLATFORM } from "@/content/home-v2";
import type { HomePlatformContent, HomeSectionMeta } from "@/lib/cms/home-content";

/**
 * 04 — IndiGeneUs.AI, introduced only after the problem and the approach, with
 * its relationship to Genetico said in plain words.
 *
 * The extraction demo lives here rather than in the hero, and runs itself
 * once as the section comes into view. Below it, the platform's four layers —
 * read from the live home page's CMS entries.
 */
export function Platform({
  section,
  num,
  platform,
}: {
  section: HomeSectionMeta;
  num: string;
  platform: HomePlatformContent;
}) {
  const content = HOME_V2_PLATFORM;

  return (
    <section
      id={section.id}
      data-reveal
      className="bg-sheet-soft border-rule-light px-edge pt-sect-top pb-sect-bot scroll-mt-32 border-y"
    >
      <div className="max-w-site mx-auto">
        <div className="mid:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] mid:gap-[clamp(34px,5vw,64px)] grid grid-cols-[minmax(0,1fr)] items-center gap-[34px]">
          <div className="flex min-w-0 flex-col items-start gap-[18px]">
            <SectionLabel num={num}>{section.eyebrow}</SectionLabel>
            <div className="flex h-12 items-center">
              <Image
                src="/brand/indigeneus-mark-black.png"
                alt="IndiGeneUs.AI"
                width={1065}
                height={1061}
                className="block h-11 w-auto will-change-transform motion-safe:animate-[spin-mark_14s_linear_infinite]"
              />
            </div>
            <h2 className="font-headline m-0 text-[clamp(30px,3.8vw,46px)] leading-[1.08] tracking-[-0.018em] text-pretty">
              {content.heading}
            </h2>
            <p className="text-ink-body m-0 max-w-[520px] text-base leading-[1.75] text-pretty">
              {content.body}
            </p>
            <div className="border-teal bg-teal-tint max-w-[520px] rounded-r-[10px] border-l-2 px-[18px] py-4">
              <p className="text-ink m-0 text-[14.5px] leading-[1.7]">{content.callout}</p>
            </div>
            <Link
              href={platform.cta.href}
              className="border-rule text-ink hover:border-primary hover:text-primary inline-flex items-center gap-[9px] rounded-full border bg-white px-[clamp(18px,2vw,26px)] py-[13px] text-sm font-medium transition-colors"
            >
              {platform.cta.label}
              <span aria-hidden className="text-xs">
                →
              </span>
            </Link>
          </div>

          {/* Centred in the full column once the text stacks above it, not held
              to the left in a 600px box. */}
          <HeroDemoPanel
            autoRunSection={section.id}
            fitToViewport={false}
            narrowLayout="swipe"
            className="nav:max-w-none"
          />
        </div>

        <div className="mt-[clamp(48px,6vw,72px)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-headline m-0 text-[clamp(24px,2.8vw,32px)] leading-[1.14] tracking-[-0.015em]">
              {content.layersHeading}
            </h3>
            <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.14em] uppercase">
              {content.layersLabel}
            </span>
          </div>

          <div
            className="layer-grid swipe-row mt-[26px]"
            style={{ "--swipe-col": "80%" } as React.CSSProperties}
          >
            {platform.layers.map((layer, i) => (
              <div
                key={layer.title}
                className="flex min-w-0 flex-col gap-3 px-6 pt-[26px] pb-[22px] transition-colors duration-200 hover:bg-[#F4F8FB]!"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono-label text-primary text-[11px] tracking-[0.2em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="bg-rule-light block h-px flex-1" />
                </div>
                <h4 className="font-headline m-0 text-[23px] leading-[1.14] tracking-[-0.015em]">
                  {layer.title}
                </h4>
                <p className="text-ink-body m-0 text-sm leading-[1.65]">{layer.body}</p>
                <span className="font-mono-label text-ink-soft mt-auto pt-3.5 text-[10.5px] tracking-[0.14em] uppercase">
                  {layer.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
