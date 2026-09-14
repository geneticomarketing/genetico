"use client";

import { useState } from "react";

import { scrollToSection } from "@/components/chrome/page-sections";
import {
  LivePill,
  Meter,
  Panel,
  PanelLabel,
  PanelRow,
  PanelTable,
  useCycle,
} from "@/components/solutions/parts";
import {
  CARE_PATHWAY,
  HERO_HPO_TERMS,
  HERO_RANKED,
  PATIENT,
  PATIENT_TIMELINE,
  RANKED_CANDIDATES,
  type PathwayState,
} from "@/content/solution-demos";
import type { SolutionContent } from "@/lib/cms/solution-page-data";

/**
 * The Hospital page's own pieces: a two-column hero with a live consultation
 * beside it, and the four walkthrough mock-ups.
 */

export function HospitalHero({ content }: { content: SolutionContent["hero"] }) {
  // Terms land one at a time, then the ranking fills in behind them.
  const revealed = useCycle(HERO_HPO_TERMS.length, 1100);
  const ranked = revealed >= HERO_HPO_TERMS.length;

  return (
    <section
      id="top"
      className="px-edge scroll-mt-32 bg-[linear-gradient(180deg,#FAFBFC_0%,#F5F8FA_42%,#ffffff_100%)] pt-[clamp(53px,5.5vw,76px)] pb-[clamp(67px,7vw,96px)]"
    >
      <div className="max-w-site mid:grid-cols-[minmax(0,1fr)_minmax(0,0.94fr)] mx-auto grid grid-cols-[minmax(0,1fr)] items-center gap-x-15 gap-y-12">
        <div className="flex min-w-0 flex-col gap-[22px]">
          {content.eyebrow ? (
            <div className="flex items-center gap-[18px]">
              <span
                aria-hidden
                className="block h-px w-13 shrink-0 bg-[image:var(--gradient-hairline-flip)]"
              />
              <span className="font-mono-label text-primary text-[11px] tracking-[0.2em] uppercase">
                {content.eyebrow}
              </span>
            </div>
          ) : null}

          <h1 className="font-headline text-ink m-0 text-[clamp(36px,4.9vw,60px)] leading-[1.05] tracking-[-0.02em] text-pretty">
            {content.headline} <span className="text-primary">{content.headlineHighlight}</span>
          </h1>

          {content.blurb ? (
            <p className="text-ink-body m-0 max-w-[520px] text-base leading-[1.75] text-pretty">
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
              Book a demo
            </a>
            <a
              href="#solution"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("solution");
              }}
              className="font-mono-label text-primary inline-flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase"
            >
              See the clinical flow →
            </a>
          </div>

          {content.stats.length ? (
            <div className="border-rule mt-2.5 flex flex-wrap gap-x-10 gap-y-6.5 border-t pt-6">
              {content.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1.5">
                  <span className="font-headline text-primary text-[30px] leading-none">
                    {stat.figure}
                  </span>
                  <span className="text-ink-soft text-[13px]">{stat.label}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div
            aria-hidden
            className="border-rule rounded-card overflow-hidden border bg-white shadow-[0_22px_54px_rgba(7,59,104,0.10)]"
          >
            <div className="bg-sheet-soft flex items-center justify-between gap-3 border-b border-[#EDF0F2] px-[18px] py-3.5">
              <PanelLabel>Consultation · GEN-2024-041</PanelLabel>
              <LivePill />
            </div>

            <div className="flex flex-col gap-[18px] p-5">
              <div className="flex flex-col gap-2.5">
                <PanelLabel>HPO extracted from notes</PanelLabel>
                <div className="flex flex-wrap gap-2">
                  {HERO_HPO_TERMS.map((term, i) => (
                    <span
                      key={term}
                      className={`bg-primary-tint text-primary-deep font-mono-label rounded-md px-[11px] py-[7px] text-[11.5px] transition-opacity duration-[400ms] ${
                        i < revealed ? "opacity-100" : "opacity-[0.22]"
                      }`}
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#EDF0F2] pt-4">
                <div className="flex items-center justify-between gap-3">
                  <PanelLabel>RAPID Score™ · ranked</PanelLabel>
                  <span className="text-ink-soft text-[12.5px]">Evidence-backed</span>
                </div>
                {HERO_RANKED.map((row) => (
                  <div key={row.name} className="flex flex-col gap-[7px]">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-ink text-sm font-medium">{row.name}</span>
                      <span className="font-mono-label text-primary text-[13px] font-medium">
                        {row.value}%
                      </span>
                    </div>
                    <Meter percent={ranked ? row.value : 0} height={5} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-ink-soft m-0 text-[13px] leading-[1.6]">
            Illustrative interface. Clinical decisions always remain with the treating clinician.
          </p>
        </div>
      </div>
    </section>
  );
}

const PATHWAY_TAG: Record<PathwayState, string> = {
  Done: "text-teal-deep",
  Active: "text-primary",
  Next: "text-ink-dim",
  Queued: "text-ink-dim",
};

const PATHWAY_DOT: Record<PathwayState, string> = {
  Done: "bg-teal-tint text-teal-deep",
  Active: "bg-primary text-white",
  Next: "text-ink-dim bg-[#F4F6F8]",
  Queued: "text-ink-dim bg-[#F4F6F8]",
};

/** Step 01 — the care pathway, part walked and part still ahead. */
export function PathwayPanel() {
  const done = CARE_PATHWAY.filter((row) => row.state === "Done").length;
  // Half a step past the last completed one: the active step is underway.
  const percent = Math.round(((done + 0.5) / CARE_PATHWAY.length) * 100);

  return (
    <Panel
      title="Care pathway — genetic clinic"
      caption="Configurable per clinic — the record stays comparable across all of them."
    >
      <div className="flex flex-col gap-3.5 p-5">
        {CARE_PATHWAY.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center gap-3.5 rounded-[10px] border px-3.5 py-3.5 transition-colors duration-[400ms] ${
              row.state === "Active" ? "border-[#C3D2DC] bg-[#F6FAFD]" : "border-rule"
            }`}
          >
            <span
              className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-bold ${
                PATHWAY_DOT[row.state]
              }`}
            >
              {row.state === "Done" ? "✓" : row.state === "Active" ? "→" : String(i + 1)}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <span className="text-ink text-sm font-medium">{row.label}</span>
              <span className="text-ink-soft text-[12.5px]">{row.meta}</span>
            </span>
            <span
              className={`font-mono-label flex-none text-[10.5px] tracking-[0.12em] uppercase ${
                PATHWAY_TAG[row.state]
              }`}
            >
              {row.state}
            </span>
          </div>
        ))}

        <div className="flex flex-col gap-[9px] border-t border-[#EDF0F2] pt-3.5">
          <div className="flex items-center justify-between">
            <span className="text-ink-soft text-[13px]">Pathway completion</span>
            <span className="font-mono-label text-primary text-[13px] font-medium">{percent}%</span>
          </div>
          <Meter percent={percent} />
        </div>
      </div>
    </Panel>
  );
}

/**
 * Step 03 — RAPID Score™.
 *
 * Picking a candidate swaps the evidence below it, which is the step's whole
 * argument: every rank is traceable. Those are real buttons, so the panel is
 * left visible to assistive tech.
 */
export function RapidPanel() {
  const [picked, setPicked] = useState(0);
  const candidate = RANKED_CANDIDATES[picked] ?? RANKED_CANDIDATES[0];

  return (
    <Panel
      title="RAPID Score™ — differential diagnosis"
      caption="Tap a candidate to see the phenotype and variant evidence behind its rank."
      interactive
    >
      <div className="flex flex-col gap-[18px] p-5">
        <PanelLabel>Ranked candidates</PanelLabel>

        <div className="flex flex-col gap-4">
          {RANKED_CANDIDATES.map((row, i) => (
            <button
              key={row.name}
              type="button"
              aria-pressed={i === picked}
              onClick={() => setPicked(i)}
              className={`flex cursor-pointer flex-col gap-[7px] border-0 bg-transparent p-0 text-left transition-opacity duration-300 ${
                i === picked ? "opacity-100" : "opacity-62"
              }`}
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="flex flex-col gap-0.5">
                  <span className="text-ink text-[14.5px] font-medium">{row.name}</span>
                  <span className="font-mono-label text-ink-dim text-[11px]">{row.code}</span>
                </span>
                <span className="font-mono-label text-primary text-[13.5px] font-medium">
                  {row.value}%
                </span>
              </span>
              <span className="block w-full">
                <Meter percent={row.value} />
              </span>
            </button>
          ))}
        </div>

        <PanelTable label="Evidence summary">
          {candidate.evidence.map((row, i) => (
            <PanelRow
              key={row.label}
              label={row.label}
              value={row.value}
              last={i === candidate.evidence.length - 1}
            />
          ))}
        </PanelTable>
      </div>
    </Panel>
  );
}

/** Step 04 — the patient timeline, with the next review already surfaced. */
export function TimelinePanel() {
  return (
    <Panel
      title="Patient timeline"
      caption="Nothing gets lost between visits — recalls surface on their own."
    >
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-3.5">
          <span className="bg-teal-mid flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full text-sm font-bold text-white">
            {PATIENT.initials}
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <span className="text-ink text-[15px] font-bold">{PATIENT.name}</span>
            <span className="text-ink-soft text-[12.5px]">{PATIENT.meta}</span>
          </span>
          <span className="bg-primary-tint text-primary flex-none rounded-full px-[11px] py-1.5 text-[12.5px] font-medium">
            {PATIENT.status}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative h-[3px] rounded-sm bg-[#EDF0F2]">
            <div
              className="bg-meter absolute top-0 left-0 h-[3px] rounded-sm"
              style={{ width: `${PATIENT.progress}%` }}
            />
          </div>
          <div className="flex gap-2.5">
            {PATIENT_TIMELINE.map((entry) => (
              <span key={entry.date} className="flex min-w-0 flex-1 flex-col gap-[5px]">
                <span
                  className={`block h-[11px] w-[11px] rounded-full ${
                    entry.done ? "bg-primary" : "border-2 border-[#C3D2DC] bg-white"
                  }`}
                />
                <span className="font-mono-label text-ink-dim text-[10.5px]">{entry.date}</span>
                <span className="text-ink text-[12.5px] font-medium text-pretty">
                  {entry.label}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[7px] rounded-[10px] bg-[#F4F6F8] p-3.5">
          <PanelLabel>{PATIENT.lastNoteLabel}</PanelLabel>
          <span className="text-ink-body text-[13.5px] leading-[1.65]">{PATIENT.lastNote}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-lg bg-[#FDF4E7] px-3 py-[7px] text-[12.5px] font-medium text-[#8A5A12]">
            ⚠ {PATIENT.dueNotice}
          </span>
          <span className="bg-primary-deep rounded-full px-5 py-[11px] text-[13.5px] font-bold text-white">
            Schedule
          </span>
        </div>
      </div>
    </Panel>
  );
}
