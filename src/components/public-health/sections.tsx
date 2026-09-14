"use client";

import { useState } from "react";

import { Eyebrow } from "@/components/chrome/eyebrow";
import { scrollToSection } from "@/components/chrome/page-sections";
import { HubDiagram } from "@/components/public-health/hub-diagram";
import { DIAGRAM_LEGEND, FLOW_NOTES, IMPACT_ICONS } from "@/content/public-health-diagram";
import type { ArchKey } from "@/content/public-health-diagram";
import type { PublicHealthContent } from "@/lib/cms/public-health-page-data";

/** The label-and-rule that opens the impact section. */
function RuleLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="font-mono-label text-ink-soft flex-none text-[11px] tracking-[0.2em] uppercase">
        {children}
      </span>
      <span aria-hidden className="bg-rule block h-px flex-1" />
    </div>
  );
}

/**
 * The hero: the claim, and the model it rests on.
 *
 * The diagram is the page's argument in one picture, so it sits beside the
 * headline rather than below the fold.
 */
export function PublicHealthHero({ content }: { content: PublicHealthContent["hero"] }) {
  return (
    <section
      id="top"
      className="px-edge scroll-mt-32 bg-[linear-gradient(180deg,#FAFBFC_0%,#F4F8FA_46%,#ffffff_100%)] pt-[clamp(50px,5.3vw,72px)] pb-[clamp(62px,6.4vw,88px)]"
    >
      <div className="max-w-site mid:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] mx-auto grid grid-cols-[minmax(0,1fr)] items-center gap-x-16 gap-y-13">
        <div className="flex min-w-0 flex-col gap-[22px]">
          <div className="flex items-center gap-3">
            <span className="font-mono-label text-primary text-[11px] tracking-[0.2em] uppercase">
              {content.eyebrow}
            </span>
            <span aria-hidden className="block h-px w-11 bg-[#C3D2DC]" />
            <span className="font-mono-label text-ink-soft text-[11px] tracking-[0.2em] uppercase">
              {content.context}
            </span>
          </div>

          <h1 className="font-headline text-ink m-0 text-[clamp(38px,5.2vw,62px)] leading-[1.05] tracking-[-0.02em] text-pretty">
            {content.headline} <span className="text-primary">{content.headlineHighlight}</span>
          </h1>

          {content.blurb ? (
            <p className="text-ink-body m-0 max-w-[560px] text-base leading-[1.75] text-pretty">
              {content.blurb}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="#get-in-touch"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("get-in-touch");
              }}
              className="bg-primary-deep hover:bg-primary rounded-full px-7 py-3.5 text-sm font-bold text-white transition-colors"
            >
              Request a pilot
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("how-it-works");
              }}
              className="font-mono-label text-primary inline-flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase"
            >
              See the three-tier model →
            </a>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3.5">
          <HubDiagram />
          <div className="font-mono-label text-ink-soft flex flex-wrap gap-x-[22px] gap-y-2.5 text-[10.5px] tracking-[0.16em] uppercase">
            {DIAGRAM_LEGEND.map((entry) => (
              <span key={entry.label} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={`block h-[9px] w-[9px] rounded-full ${
                    entry.kind === "hub"
                      ? "bg-primary"
                      : entry.kind === "coe"
                        ? "border-primary border-[1.5px]"
                        : "border-[1.5px] border-[#C3D2DC] bg-[#F6F9FA]"
                  }`}
                />
                {entry.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Section 01 — what the platform changes, as numbered rows. */
export function Impact({ content, num }: { content: PublicHealthContent["impact"]; num: string }) {
  return (
    <section
      id="impact"
      data-reveal
      className="bg-sheet-soft border-rule px-edge scroll-mt-32 border-t border-b py-[clamp(67px,7vw,96px)]"
    >
      <div className="max-w-site mx-auto">
        <RuleLabel>{`${num} · ${content.eyebrow}`}</RuleLabel>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 className="font-headline m-0 text-[clamp(30px,3.6vw,44px)] leading-[1.08] tracking-[-0.02em]">
            {content.heading}
          </h2>
          {content.description ? (
            <p className="text-ink-body m-0 max-w-[420px] text-[14.5px] leading-[1.7]">
              {content.description}
            </p>
          ) : null}
        </div>

        <div className="border-rule mt-11 border-t">
          {content.rows.map((row, i) => (
            <div
              key={row.title}
              className="border-rule mid:grid-cols-[40px_46px_minmax(0,1fr)_minmax(0,1.15fr)] grid grid-cols-[40px_46px_minmax(0,1fr)] items-center gap-x-7 gap-y-3 border-b py-[26px]"
            >
              <span className="font-mono-label text-ink-dim text-[13px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="bg-primary-tint text-primary flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border border-[#DCE6EF]">
                <svg
                  viewBox="0 0 24 24"
                  width="21"
                  height="21"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d={IMPACT_ICONS[i % IMPACT_ICONS.length]} />
                </svg>
              </span>
              <h3 className="font-headline mid:col-auto col-span-full m-0 text-[clamp(21px,2.3vw,26px)] leading-[1.24] tracking-[-0.01em] text-pretty">
                {row.title}
              </h3>
              <p className="text-ink-body mid:col-auto col-span-full m-0 text-[14.5px] leading-[1.65] text-pretty">
                {row.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Section 02 — the same platform seen from each level of the health system.
 *
 * Tabs rather than three stacked blocks: a reader belongs to one tier and
 * wants theirs, not all three.
 */
export function ThreeTier({
  content,
  num,
}: {
  content: PublicHealthContent["tiers"];
  num: string;
}) {
  const [active, setActive] = useState(0);
  const tier = content.items[active];

  if (!tier) return null;

  return (
    <section
      id="how-it-works"
      data-reveal
      className="px-edge scroll-mt-32 py-[clamp(73px,7.6vw,104px)]"
    >
      <div className="max-w-site mx-auto">
        <Eyebrow>
          {num} · {content.eyebrow}
        </Eyebrow>
        <h2 className="font-headline mx-auto mt-6 mb-3.5 max-w-[760px] text-center text-[clamp(32px,4vw,50px)] leading-[1.08] tracking-[-0.02em]">
          {content.heading}
        </h2>
        {content.description ? (
          <p className="text-ink-body mx-auto m-0 max-w-[520px] text-center text-base leading-[1.7] text-pretty">
            {content.description}
          </p>
        ) : null}

        <div className="mt-11 flex max-w-full justify-center">
          <div
            role="tablist"
            aria-label={content.heading}
            className="border-rule nav:rounded-full flex max-w-full gap-1 overflow-x-auto rounded-[14px] border bg-[#F4F6F8] p-1.5"
          >
            {content.items.map((item, i) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                id={`tier-tab-${i}`}
                aria-selected={i === active}
                aria-controls="tier-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  e.preventDefault();
                  const next =
                    (active + (e.key === "ArrowRight" ? 1 : -1) + content.items.length) %
                    content.items.length;
                  setActive(next);
                  document.getElementById(`tier-tab-${next}`)?.focus();
                }}
                className={`font-mono-label cursor-pointer rounded-full px-[18px] py-2.5 text-[11px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors ${
                  i === active
                    ? "bg-primary-deep font-medium text-white"
                    : "text-ink-soft bg-transparent font-normal"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div
          id="tier-panel"
          role="tabpanel"
          aria-labelledby={`tier-tab-${active}`}
          className="border-rule rounded-card mt-9 overflow-hidden border bg-white"
        >
          <div className="bg-dark-band flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 px-[clamp(24px,3vw,38px)] py-[clamp(24px,3vw,34px)]">
            <h3 className="font-headline m-0 text-[clamp(24px,3vw,34px)] leading-[1.1] tracking-[-0.01em] text-white">
              {tier.name}
            </h3>
            {tier.level ? (
              <span className="font-mono-label text-[11px] tracking-[0.2em] text-[#BDDCF5] uppercase">
                {tier.level}
              </span>
            ) : null}
          </div>

          <div className="mid:grid-cols-3 grid grid-cols-[minmax(0,1fr)]">
            <div className="border-rule mid:border-r min-w-0 border-b p-[clamp(24px,3vw,34px)]">
              <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.16em] uppercase">
                What happens at this tier
              </span>
              <div className="mt-[18px] flex flex-col gap-[13px]">
                {tier.happens.map((line) => (
                  <div key={line} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="bg-primary mt-2 block h-1.5 w-1.5 flex-none rounded-full"
                    />
                    <span className="text-ink text-[14.5px] leading-[1.6]">{line}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-rule mid:border-r min-w-0 border-b p-[clamp(24px,3vw,34px)]">
              <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.16em] uppercase">
                What data flows out
              </span>
              <div className="mt-[18px] flex flex-col gap-[13px]">
                {tier.flows.map((line) => (
                  <div key={line} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="bg-primary-tint text-primary mt-px flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px]"
                    >
                      →
                    </span>
                    <span className="text-ink text-[14.5px] leading-[1.6]">{line}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-rule bg-sheet-soft min-w-0 border-b p-[clamp(24px,3vw,34px)]">
              <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.16em] uppercase">
                Who uses it at this tier
              </span>
              <div className="mt-[18px] flex flex-col gap-3">
                {tier.who.map((person) => (
                  <div
                    key={person.role}
                    className="border-rule rounded-card flex flex-col gap-1.5 border bg-white px-4 py-3.5"
                  >
                    <span className="text-ink text-[14.5px] font-bold">{person.role}</span>
                    <span className="text-ink-body text-[13px] leading-[1.55]">{person.tools}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Section 03 — how the tiers connect, list and diagram together.
 *
 * Pointing at a classification foregrounds its part of the diagram. Hovering
 * previews; clicking pins, so the link survives the pointer leaving — which
 * is also what makes it usable from the keyboard.
 */
export function Architecture({
  content,
  num,
}: {
  content: PublicHealthContent["architecture"];
  num: string;
}) {
  const [hovered, setHovered] = useState<ArchKey | null>(null);
  const [pinned, setPinned] = useState<ArchKey | null>(null);
  const lit = hovered ?? pinned;

  return (
    <section
      id="architecture"
      data-reveal
      className="bg-sheet-soft border-rule px-edge scroll-mt-32 border-t border-b py-[clamp(73px,7.6vw,104px)]"
    >
      <div className="max-w-site mx-auto">
        <Eyebrow>
          {num} · {content.eyebrow}
        </Eyebrow>
        <h2 className="font-headline mx-auto mt-6 mb-3.5 max-w-[820px] text-center text-[clamp(32px,4vw,50px)] leading-[1.08] tracking-[-0.02em]">
          {content.heading}
        </h2>
        {content.description ? (
          <p className="text-ink-body mx-auto m-0 max-w-[600px] text-center text-base leading-[1.7] text-pretty">
            {content.description}
          </p>
        ) : null}

        <div className="mid:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] mt-14 grid grid-cols-[minmax(0,1fr)] items-start gap-x-16 gap-y-12">
          <div className="min-w-0">
            <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.16em] uppercase">
              {content.classificationLabel}
            </span>
            <div className="mt-[18px] flex flex-col">
              {content.items.map((row) => (
                <button
                  key={row.key}
                  type="button"
                  aria-pressed={pinned === row.key}
                  onMouseEnter={() => setHovered(row.key)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(row.key)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setPinned((p) => (p === row.key ? null : row.key))}
                  className={`border-rule flex cursor-pointer flex-col gap-[11px] border-b py-6 text-left transition-opacity duration-200 ${
                    lit && lit !== row.key ? "opacity-68" : "opacity-100"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span aria-hidden className="bg-primary block h-[7px] w-[7px] rounded-full" />
                    <span className="font-mono-label text-primary text-[11px] tracking-[0.2em] uppercase">
                      {row.tag}
                    </span>
                    {row.badge ? (
                      <span className="font-mono-label bg-primary-tint text-primary rounded-md px-[9px] py-1 text-[10.5px]">
                        {row.badge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-ink m-0 text-[17px] font-bold tracking-[-0.005em]">
                    {row.name}
                  </h3>
                  <p className="text-ink-body m-0 max-w-[560px] text-[14.5px] leading-[1.7] text-pretty">
                    {row.body}
                  </p>
                  {row.caps.length ? (
                    <div className="mt-0.5 flex flex-wrap gap-2">
                      {row.caps.map((cap) => (
                        <span
                          key={cap}
                          className="font-mono-label bg-primary-tint text-primary rounded-md px-3 py-1.5 text-[10.5px] tracking-[0.08em]"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-[18px]">
            <HubDiagram lit={lit} interactive />
            <div className="border-rule flex flex-col gap-2.5 border-t pt-1.5">
              {FLOW_NOTES.map((note) => (
                <span
                  key={note.text}
                  className="text-ink-body flex items-center gap-2.5 text-[13px]"
                >
                  <span aria-hidden className="font-mono-label text-primary text-[11px]">
                    {note.arrow}
                  </span>
                  {note.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
