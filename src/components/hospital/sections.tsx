"use client";

import { useState } from "react";

import { scrollToSection } from "@/components/chrome/page-sections";
import {
  Meter,
  Panel,
  PanelLabel,
  PanelRow,
  PanelTable,
  useCycle,
} from "@/components/solutions/parts";
import {
  CASE,
  CASE_HPO,
  CASE_NOTE,
  FOLLOW_UPS,
  LAB_EXTRACT,
  LIMS_ORDER,
  PHENOTYPE_ANALYTICS,
  RAPID_RANKED,
  RAPID_TOTAL,
} from "@/content/sample-case";
import {
  ANALYTICS_VIEWS,
  CARE_PATHWAY,
  HERO_RANKED_COUNT,
  ORDER_STATUS_INDEX,
  RANKED_COUNT,
  type PathwayState,
} from "@/content/solution-demos";
import type { SolutionContent } from "@/lib/cms/solution-page-data";

/**
 * The Hospital page's own pieces: a two-column hero with the sample case
 * beside it, and the four walkthrough mock-ups — the case pathway, Smart
 * Investigation Extract, RAPID Score with Phenotype Analytics, and follow-up
 * visits. Every value comes from the shared sample case.
 */

const HERO_RANKED = RAPID_RANKED.slice(0, HERO_RANKED_COUNT);
const RANKED = RAPID_RANKED.slice(0, RANKED_COUNT);

/** Bars are scaled to the leader, as the platform draws them — the score itself stays a decimal. */
function barPercent(score: number) {
  return Math.round((score / RAPID_RANKED[0].score) * 100);
}

export function HospitalHero({ content }: { content: SolutionContent["hero"] }) {
  // Terms land one at a time, then the ranking fills in behind them.
  const revealed = useCycle(CASE_HPO.length, 1100);
  const ranked = revealed >= CASE_HPO.length;

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
            <div className="bg-sheet-soft flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-[#EDF0F2] px-[18px] py-3.5">
              <PanelLabel>Case {CASE.id}</PanelLabel>
              <span className="text-ink-soft text-[12.5px]">{CASE.patient}</span>
            </div>

            <div className="flex flex-col gap-[18px] p-5">
              <div className="flex flex-col gap-2">
                <PanelLabel>Examination note</PanelLabel>
                <p className="text-ink-body m-0 line-clamp-2 text-[13px] leading-[1.6]">
                  {CASE_NOTE}
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <PanelLabel>HPO terms extracted</PanelLabel>
                <div className="flex flex-wrap gap-2">
                  {CASE_HPO.map((term, i) => (
                    <span
                      key={term.code}
                      className={`bg-primary-tint text-primary-deep rounded-md px-[11px] py-[7px] text-[12.5px] transition-opacity duration-[400ms] ${
                        i < revealed ? "opacity-100" : "opacity-[0.22]"
                      }`}
                    >
                      {term.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#EDF0F2] pt-4">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <PanelLabel>Suggest differentials · RAPID Score</PanelLabel>
                  <span className="text-ink-soft text-[12.5px]">
                    Top {HERO_RANKED_COUNT} of {RAPID_TOTAL}
                  </span>
                </div>
                {HERO_RANKED.map((row) => (
                  <div key={row.id} className="flex flex-col gap-[7px]">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-ink min-w-0 truncate text-sm font-medium">
                        {row.name}
                        <span className="font-mono-label text-ink-dim ml-1.5 text-[11px]">
                          {row.id}
                        </span>
                      </span>
                      <span className="font-mono-label text-primary flex-none text-[13px] font-medium">
                        {row.score.toFixed(3)}
                      </span>
                    </div>
                    <Meter percent={ranked ? barPercent(row.score) : 0} height={5} />
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
};

const PATHWAY_DOT: Record<PathwayState, string> = {
  Done: "bg-teal-tint text-teal-deep",
  Active: "bg-primary text-white",
  Next: "text-ink-dim bg-[#F4F6F8]",
};

/** Step 01 — the case from registration to report, part walked and part still ahead. */
export function PathwayPanel() {
  const done = CARE_PATHWAY.filter((row) => row.state === "Done").length;

  return (
    <Panel
      title={`Case ${CASE.id} — genetics clinic`}
      caption="Every case runs the same steps, so every record reads the same way."
    >
      <div className="flex flex-col gap-2.5 p-5">
        {CARE_PATHWAY.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center gap-3.5 rounded-[10px] border px-3.5 py-[11px] transition-colors duration-[400ms] ${
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
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-ink text-sm font-medium">{row.label}</span>
              <span className="text-ink-soft text-[12.5px]">
                {row.state === "Active"
                  ? `${row.meta} · ${LIMS_ORDER.statuses[ORDER_STATUS_INDEX]}`
                  : row.meta}
              </span>
            </span>
            <span
              className={`font-mono-label flex-none text-[10.5px] tracking-[0.12em] uppercase ${
                PATHWAY_TAG[row.state]
              }`}
            >
              {row.state === "Active" ? "In lab" : row.state}
            </span>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-[#EDF0F2] pt-3">
          <span className="text-ink-soft text-[13px]">Steps complete</span>
          <span className="font-mono-label text-primary text-[13px] font-medium">
            {done} of {CARE_PATHWAY.length}
          </span>
        </div>
      </div>
    </Panel>
  );
}

/**
 * Step 03 — RAPID Score with Phenotype Analytics.
 *
 * The ranked list is the platform's top four of a hundred; beneath it, the
 * leader's analytics switch between what each observed symptom contributed
 * and the unobserved phenotypes worth checking for next. Those switches are
 * real buttons, so the panel is left visible to assistive tech.
 */
export function RapidPanel() {
  const [view, setView] = useState<(typeof ANALYTICS_VIEWS)[number]["key"]>("observed");
  const rows = PHENOTYPE_ANALYTICS[view];
  const best = Math.max(...rows.map((r) => r.score));

  return (
    <Panel
      title="Suggest differentials — RAPID Score"
      caption="Every rank traces back to the symptoms the clinician selected."
      interactive
    >
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <PanelLabel>Ranked list</PanelLabel>
          <span className="text-ink-soft text-[12.5px]">
            {RANKED_COUNT} of {RAPID_TOTAL} · OMIM, Orphanet
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {RANKED.map((row, i) => (
            <div key={row.id} className="flex flex-col gap-1.5">
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-ink min-w-0 truncate text-[14px] font-medium">
                  <span className="text-ink-dim mr-1.5">{row.rank}</span>
                  {row.name}
                  <span className="font-mono-label text-ink-dim ml-1.5 text-[11px]">{row.id}</span>
                </span>
                <span className="font-mono-label text-primary flex-none text-[13px] font-medium">
                  {row.score.toFixed(3)}
                </span>
              </span>
              <Meter percent={barPercent(row.score)} height={i === 0 ? 6 : 4} />
            </div>
          ))}
        </div>

        <div className="border-rule overflow-hidden rounded-[10px] border">
          <div className="border-rule flex flex-wrap items-center justify-between gap-2 border-b bg-[#F4F6F8] px-3.5 py-2">
            <PanelLabel>Phenotype analytics · {PHENOTYPE_ANALYTICS.disease}</PanelLabel>
            <div className="flex gap-1.5">
              {ANALYTICS_VIEWS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={option.key === view}
                  onClick={() => setView(option.key)}
                  className={`cursor-pointer rounded-full border-0 px-2.5 py-1 text-[12px] transition-colors duration-[250ms] ${
                    option.key === view
                      ? "bg-primary-deep font-medium text-white"
                      : "text-ink-body bg-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 px-3.5 py-3">
            {rows.map((row) => (
              <div
                key={row.term}
                className="grid grid-cols-[minmax(0,1fr)_48px_34px] items-center gap-2.5 sm:grid-cols-[minmax(0,1fr)_110px_34px]"
              >
                <span className="text-ink-body truncate text-[13px]">{row.term}</span>
                <Meter percent={(row.score / best) * 100} height={4} />
                <span className="font-mono-label text-primary text-right text-[11.5px]">
                  {row.score.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/**
 * Step 04 — follow-up visits on the same record: the visits so far, the lab
 * results read in between them, and the ordered test as the LIMS tracks it.
 */
export function FollowUpPanel() {
  return (
    <Panel
      title={`Case ${CASE.id} — follow-up`}
      caption="Each visit, report and test result lands on the one record."
    >
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-2.5">
          <PanelLabel>Visits</PanelLabel>
          <ol className="relative m-0 list-none p-0 pl-[24px]">
            <span
              aria-hidden
              className="absolute top-2 bottom-2 left-[5px] block w-px bg-[#C3D2DC]"
            />
            {FOLLOW_UPS.map((visit, i) => (
              <li key={visit.date} className="relative pb-3 last:pb-0">
                <span
                  className={`absolute top-[4px] -left-[24px] block h-[11px] w-[11px] rounded-full ${
                    i === 0 ? "bg-primary" : "border-2 border-[#C3D2DC] bg-white"
                  }`}
                />
                <span className="font-mono-label text-ink-dim block text-[10.5px]">
                  {visit.date}
                </span>
                <span className="text-ink block text-[13.5px] font-medium">{visit.note}</span>
              </li>
            ))}
          </ol>
        </div>

        <PanelTable label={`${LAB_EXTRACT.test} · ${LAB_EXTRACT.date}`}>
          {LAB_EXTRACT.rows.slice(1, 4).map((row, i) => (
            <PanelRow
              key={row.field}
              label={row.field}
              value={`${row.value} ${row.unit}${row.high ? " ↑" : ""}`}
              last={i === 2}
            />
          ))}
        </PanelTable>

        <div className="flex flex-col gap-2 rounded-[10px] bg-[#F4F6F8] p-3.5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-ink text-[13.5px] font-medium">
              {LIMS_ORDER.test} · {LIMS_ORDER.sample}
            </span>
            <span className="font-mono-label text-ink-dim text-[10.5px]">{LIMS_ORDER.orderId}</span>
          </div>
          <div className="flex gap-1">
            {LIMS_ORDER.statuses.map((status, i) => (
              <span
                key={status}
                className={`block h-1 flex-1 rounded-sm ${
                  i <= ORDER_STATUS_INDEX ? "bg-meter" : "bg-[#DCE3E8]"
                }`}
              />
            ))}
          </div>
          <span className="text-ink-soft text-[12.5px]">
            Laboratory LIMS: {LIMS_ORDER.statuses[ORDER_STATUS_INDEX]}
          </span>
        </div>
      </div>
    </Panel>
  );
}
