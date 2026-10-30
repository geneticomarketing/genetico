"use client";

import { useState } from "react";

import { scrollToSection } from "@/components/chrome/page-sections";
import { ComingSoonTag } from "@/components/coming-soon";
import { Panel, PanelLabel, PanelRow, PanelTable } from "@/components/solutions/parts";
import { CASE, CASE_GROWTH, CASE_HPO } from "@/content/sample-case";
import {
  COHORT_COVERAGE,
  COHORT_DEFAULT_FILTER,
  COHORT_FILTERS,
  COHORT_SUMMARY,
  INTAKE_ACTIVE_TAB,
  INTAKE_CONSANGUINITY,
  INTAKE_TABS,
  NATURAL_HISTORY_ROWS,
  RESEARCH_SITES,
} from "@/content/solution-demos";
import type { SolutionContent } from "@/lib/cms/solution-page-data";

/**
 * The Life Science page's own pieces: a centred hero over three summary
 * cards, and the three walkthrough mock-ups.
 *
 * Registry and cohort views are built but not yet live (confirmed
 * 2026-10-29), so every card and panel that shows one carries the "Coming
 * soon" tag and holds still. The case form and HPO extraction are live.
 */

/** One of the hero's three cards. */
function HeroCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-rule rounded-card flex min-w-0 flex-col gap-5 border bg-white p-6 shadow-[0_18px_44px_rgba(7,59,104,0.06)]">
      {children}
    </div>
  );
}

export function LifeScienceHero({ content }: { content: SolutionContent["hero"] }) {
  return (
    <section
      id="top"
      className="px-edge scroll-mt-32 bg-[linear-gradient(180deg,#FAFBFC_0%,#F5F8FA_40%,#ffffff_100%)] pt-[clamp(53px,5.5vw,76px)] pb-[clamp(67px,7vw,96px)]"
    >
      <div className="max-w-site mx-auto">
        <div className="flex flex-col items-center gap-[22px] text-center">
          {content.eyebrow ? (
            <div className="flex items-center justify-center gap-[22px]">
              <span
                aria-hidden
                className="block h-px w-16 shrink-0 bg-[image:var(--gradient-hairline)]"
              />
              <span className="font-mono-label text-primary text-[11px] tracking-[0.2em] uppercase">
                {content.eyebrow}
              </span>
              <span
                aria-hidden
                className="block h-px w-16 shrink-0 bg-[image:var(--gradient-hairline-flip)]"
              />
            </div>
          ) : null}

          <h1 className="font-headline text-ink m-0 max-w-[920px] text-[clamp(36px,5.2vw,62px)] leading-[1.05] tracking-[-0.02em] text-pretty">
            {content.headline} <span className="text-primary">{content.headlineHighlight}</span>
          </h1>

          {content.blurb ? (
            <p className="text-ink-body m-0 max-w-[640px] text-base leading-[1.75] text-pretty">
              {content.blurb}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center justify-center gap-3.5">
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
              See how it works →
            </a>
          </div>
        </div>

        <div className="mid:grid-cols-3 mt-14 grid grid-cols-[minmax(0,1fr)] gap-5.5">
          <HeroCard>
            <div className="flex items-center justify-between gap-3">
              <PanelLabel>Research cohort</PanelLabel>
              <ComingSoonTag />
            </div>
            <div className="grid grid-cols-3 gap-3.5">
              {[
                { figure: COHORT_SUMMARY.patients, label: "Patients" },
                { figure: COHORT_SUMMARY.centres, label: "Centres" },
                { figure: COHORT_SUMMARY.hpoCoded, label: "HPO coded" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-[5px]">
                  <span className="font-headline text-primary text-[34px] leading-none">
                    {stat.figure}
                  </span>
                  <span className="text-ink-soft text-[13px]">{stat.label}</span>
                </div>
              ))}
            </div>
          </HeroCard>

          <HeroCard>
            <div className="flex items-center justify-between gap-3">
              <PanelLabel>Natural history study</PanelLabel>
              <ComingSoonTag />
            </div>
            <div className="flex flex-col">
              {NATURAL_HISTORY_ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between gap-3 py-[11px] ${
                    i === NATURAL_HISTORY_ROWS.length - 1 ? "" : "border-b border-[#EDF0F2]"
                  }`}
                >
                  <span className="text-ink-body text-[14.5px]">{row.label}</span>
                  <span
                    className={`text-[14.5px] font-bold ${row.good ? "text-teal-deep" : "text-ink"}`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </HeroCard>

          <HeroCard>
            <div className="flex items-center justify-between gap-3">
              <PanelLabel>Sites on one schema</PanelLabel>
              <ComingSoonTag />
            </div>
            <span className="text-ink-body text-[14.5px] leading-[1.6]">
              Every centre records cases in the same structured form, so their data can be pooled.
            </span>
            <div className="flex flex-wrap gap-2">
              {RESEARCH_SITES.map((site) => (
                <span
                  key={site}
                  className="border-rule font-mono-label text-ink-body rounded-md border bg-[#F4F6F8] px-[11px] py-1.5 text-[10.5px] tracking-[0.06em]"
                >
                  {site}
                </span>
              ))}
            </div>
          </HeroCard>
        </div>
      </div>
    </section>
  );
}

/**
 * Step 01 — the case form as the platform lays it out, with Examination open:
 * the HPO terms extracted from the note, the growth measurements against WHO
 * standards, and a family-history field.
 */
export function IntakePanel() {
  return (
    <Panel
      title={`Case ${CASE.id} — case form`}
      caption="Every centre fills the same form, so no data needs mapping afterwards."
    >
      <div className="flex gap-1 overflow-x-auto border-b border-[#EDF0F2] px-4 pt-1.5">
        {INTAKE_TABS.map((tab) => (
          <span
            key={tab}
            className={`border-b-2 px-3 py-2.5 text-[13px] whitespace-nowrap ${
              tab === INTAKE_ACTIVE_TAB
                ? "border-primary text-primary font-bold"
                : "text-ink-soft border-transparent"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-5 px-5 py-5.5">
        <div className="flex flex-col gap-2.5">
          <PanelLabel>HPO terms · from the examination note</PanelLabel>
          <div className="border-rule flex flex-wrap gap-2 rounded-[10px] border p-3">
            {CASE_HPO.map((term) => (
              <span
                key={term.code}
                className="bg-primary-tint text-primary-deep flex items-center gap-2 rounded-md px-[11px] py-[7px] text-[13px]"
              >
                {term.name}
                <span className="text-[#8FA9BF]">×</span>
              </span>
            ))}
            <span className="text-primary rounded-md border border-dashed border-[#C3D2DC] px-[11px] py-[7px] text-[13px]">
              + Add term
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <PanelLabel>Measurements · WHO standard</PanelLabel>
          <div className="grid grid-cols-3 gap-2.5">
            {CASE_GROWTH.map((m) => (
              <div
                key={m.label}
                className="border-rule flex min-w-0 flex-col gap-1 rounded-[10px] border px-3 py-2.5"
              >
                <span className="text-ink-soft text-[12px]">{m.label}</span>
                <span className="text-ink text-sm font-medium">{m.value}</span>
                <span className="font-mono-label text-primary text-[11px]">Z {m.z}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <PanelLabel>Consanguineous marriage</PanelLabel>
          <div className="flex flex-wrap gap-x-[18px] gap-y-2.5">
            {INTAKE_CONSANGUINITY.map((option) => (
              <span
                key={option.label}
                className={`flex items-center gap-[9px] text-sm ${
                  option.selected ? "text-ink font-medium" : "text-ink-body"
                }`}
              >
                <span
                  className={`block h-[15px] w-[15px] rounded-full ${
                    option.selected
                      ? "border-primary border-[4.5px]"
                      : "border-[1.5px] border-[#C3D2DC]"
                  }`}
                />
                {option.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/**
 * Step 03 — cohort discovery.
 *
 * The filters are the one part of the mock-ups that is genuinely clickable:
 * picking one swaps the three counts, which is the whole claim of the step.
 * That makes them buttons, and the panel around them is left interactive
 * rather than hidden from assistive tech — unlike the static mock-ups.
 */
export function CohortPanel() {
  const [filter, setFilter] = useState(COHORT_DEFAULT_FILTER);
  const cohort = COHORT_FILTERS[filter] ?? COHORT_FILTERS[0];

  return (
    <Panel
      title="Cohort discovery"
      caption="Cohort views run on the same structured records, and are launching soon."
      interactive
    >
      <div className="flex flex-col gap-[18px] p-5">
        <div className="flex items-center justify-between gap-3">
          <PanelLabel>Filter the cohort</PanelLabel>
          <ComingSoonTag />
        </div>
        <div className="flex flex-wrap gap-2">
          {COHORT_FILTERS.map((option, i) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={i === filter}
              onClick={() => setFilter(i)}
              className={`cursor-pointer rounded-full border-0 px-3 py-[7px] text-[12.5px] transition-colors duration-[250ms] ${
                i === filter
                  ? "bg-primary-deep font-medium text-white"
                  : "text-ink-body bg-[#F4F6F8]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="border-rule grid grid-cols-3 gap-3 rounded-[10px] border p-[18px]">
          {[
            { figure: cohort.eligible, label: "Eligible" },
            { figure: cohort.enrolled, label: "Enrolled" },
            { figure: cohort.sites, label: "Sites" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-headline text-ink text-[30px] leading-none">{stat.figure}</span>
              <span className="text-ink-soft text-[12.5px]">{stat.label}</span>
            </div>
          ))}
        </div>

        <PanelTable label="Longitudinal coverage">
          {COHORT_COVERAGE.map((row, i) => (
            <PanelRow
              key={row.label}
              label={row.label}
              value={row.value}
              mono={false}
              good={row.good}
              last={i === COHORT_COVERAGE.length - 1}
            />
          ))}
        </PanelTable>
      </div>
    </Panel>
  );
}
