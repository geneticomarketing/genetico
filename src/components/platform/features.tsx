"use client";

import { useState } from "react";

import { SectionLead } from "@/components/platform/section-lead";
import type { PlatformContent } from "@/lib/cms/platform-page-data";

/**
 * Section 01 — the four data-capture features, one at a time.
 *
 * Tabs rather than four stacked blocks: they are alternatives an institution
 * chooses between, not a sequence, and the illustration only makes sense next
 * to the one it belongs to.
 */
export function PlatformFeatures({
  content,
  num,
}: {
  content: PlatformContent["features"];
  num: string;
}) {
  const [active, setActive] = useState(0);
  const current = content.items[active];

  if (!current) return null;

  return (
    <section
      id="platform"
      data-reveal
      className="px-edge scroll-mt-32 pt-[clamp(67px,7vw,96px)] pb-[clamp(73px,7.6vw,104px)]"
    >
      <div className="max-w-site mx-auto">
        <SectionLead
          num={num}
          eyebrow={content.eyebrow}
          heading={content.heading}
          description={content.description}
        />

        <div
          role="tablist"
          aria-label={content.heading}
          className="mt-[52px] grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))]"
        >
          {content.items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              id={`platform-tab-${i}`}
              aria-selected={i === active}
              aria-controls="platform-feature"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const next =
                  (active + (e.key === "ArrowRight" ? 1 : -1) + content.items.length) %
                  content.items.length;
                setActive(next);
                document.getElementById(`platform-tab-${next}`)?.focus();
              }}
              className={`hover:bg-sheet-soft border-rule-light cursor-pointer border-t-2 px-5 pt-[18px] pb-5 text-left transition-colors not-last:border-r ${
                i === active ? "text-ink border-t-[#2FA98F]" : "text-ink-soft border-t-rule"
              }`}
            >
              <span className="font-mono-label block text-xs tracking-[0.08em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-headline mt-2 block text-[17px]">{item.title}</span>
            </button>
          ))}
        </div>

        <div
          id="platform-feature"
          role="tabpanel"
          aria-labelledby={`platform-tab-${active}`}
          className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-12"
        >
          <div className="flex flex-col gap-4">
            {current.badge ? (
              <span className="font-mono-label inline-flex items-center gap-[9px] self-start rounded-full border border-[#CFE3E0] bg-[#F3FAF8] px-4 py-2 text-[11px] tracking-[0.18em] text-[#12706A] uppercase">
                <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-[#2FA98F]" />
                {current.badge}
              </span>
            ) : null}
            <h3 className="font-headline m-0 text-[clamp(26px,3vw,34px)] leading-[1.14] tracking-[-0.018em]">
              {current.title}
            </h3>
            <p className="text-ink-body m-0 max-w-[36em] text-[14.5px] leading-[1.75]">
              {current.body}
            </p>
            <div className="mt-1.5 flex flex-col gap-[13px]">
              {current.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 block h-[5px] w-[5px] flex-none rounded-full bg-[#2FA98F]"
                  />
                  <p className="text-ink-body m-0 text-[14.5px] leading-[1.55]">{bullet}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-rule rounded-card flex aspect-[4/3] items-center justify-center border bg-[#F5F7F9] p-7">
            {current.image ? (
              /* A plain img rather than next/image: these are SVG diagrams,
                 which the image optimiser refuses to touch without
                 dangerouslyAllowSVG — and there is nothing to optimise. */
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={current.image}
                alt={current.title}
                /* The SVGs carry a viewBox but no width or height, so they
                   have no intrinsic size to lay out against — filling the box
                   and letting object-contain scale them gives them one. */
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="font-mono-label text-ink-dim text-[11px] tracking-[0.16em] uppercase">
                Illustration to come
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
