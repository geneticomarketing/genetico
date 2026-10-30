"use client";

import { Meter, Panel, PanelLabel, useCycle } from "@/components/solutions/parts";
import { CASE_HPO, CASE_NOTE, LAB_EXTRACT } from "@/content/sample-case";

/**
 * The two extraction mock-ups on the solution pages, both drawn from the
 * shared sample case.
 *
 * Each runs on a loop: rows arrive one at a time and the panel holds on the
 * finished read before starting over. Held at the finished state when motion
 * is reduced — a half-read document is a worse picture of the product than a
 * finished one.
 */

/**
 * Smart Investigation Extract (Hospital): an uploaded lab report read into
 * the test, its date, and each value with its unit and reference range,
 * waiting for the clinician to review it before it is saved.
 */
export function ExtractPanel({ caption }: { caption: string }) {
  const [step, ref] = useCycle(LAB_EXTRACT.rows.length, 900);
  const done = step >= LAB_EXTRACT.rows.length;

  return (
    <Panel title="Smart Investigation Extract" caption={caption}>
      <div ref={ref} className="flex flex-col gap-4 p-5">
        <div className="border-rule flex items-center gap-3.5 rounded-[10px] border p-3.5">
          <span className="border-rule text-ink-soft flex h-[38px] w-[38px] flex-none items-center justify-center rounded-lg border bg-[#F4F6F8] text-[15px]">
            ⎙
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <span className="text-ink truncate text-sm font-medium">{LAB_EXTRACT.file}</span>
            <span className="text-ink-soft truncate text-[12.5px]">
              {LAB_EXTRACT.test} · {LAB_EXTRACT.date}
            </span>
          </span>
          <span className="bg-teal-tint text-teal-deep flex-none rounded-full px-[11px] py-1.5 text-[12.5px] font-medium">
            {done ? "Read" : "Reading…"}
          </span>
        </div>

        <div className="border-rule overflow-hidden rounded-[10px] border">
          <div className="border-rule text-ink-soft font-mono-label grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 border-b bg-[#F4F6F8] px-3.5 py-[10px] text-[10px] tracking-[0.14em] uppercase">
            <span>Test</span>
            <span className="text-right">Value</span>
            <span className="text-right">Range</span>
          </div>
          {LAB_EXTRACT.rows.map((row, i) => (
            <div
              key={row.field}
              className={`grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 px-3.5 py-[10px] text-[13px] transition-[opacity,transform] duration-[400ms] ${
                i === LAB_EXTRACT.rows.length - 1 ? "" : "border-b border-[#EDF0F2]"
              } ${i >= step ? "translate-y-1 opacity-[0.18]" : "translate-y-0 opacity-100"}`}
            >
              <span className="text-ink-body truncate">{row.field}</span>
              <span
                className={`font-mono-label text-right text-[12.5px] ${
                  row.high ? "font-medium text-[#B4432F]" : "text-ink"
                }`}
              >
                {row.value} {row.unit}
              </span>
              <span className="font-mono-label text-ink-soft text-right text-[12px]">
                {row.range}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-ink-soft text-[12.5px]">
            Reviewed by the clinician before saving
          </span>
          <span
            className={`rounded-full px-4 py-2 text-[12.5px] font-bold transition-colors duration-[400ms] ${
              done ? "bg-primary-deep text-white" : "text-ink-dim bg-[#F4F6F8]"
            }`}
          >
            Save to case
          </span>
        </div>
      </div>
    </Panel>
  );
}

/**
 * Extract HPO terms (Life Science): a free-text examination note read into
 * HPO-coded terms, which the clinician then selects.
 */
export function NoteExtractPanel({ caption }: { caption: string }) {
  const [step, ref] = useCycle(CASE_HPO.length, 900);
  const percent = Math.round((step / CASE_HPO.length) * 100);

  return (
    <Panel title="Extract HPO terms" caption={caption}>
      <div ref={ref} className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          <PanelLabel>Examination note</PanelLabel>
          <p className="border-rule text-ink-body m-0 rounded-[10px] border p-3.5 text-[13px] leading-[1.65]">
            {CASE_NOTE}
          </p>
        </div>

        <div className="flex flex-col gap-[9px]">
          <div className="flex items-center justify-between">
            <span className="text-ink-soft text-[13px]">HPO terms found</span>
            <span className="font-mono-label text-primary text-[13px] font-medium">
              {step} of {CASE_HPO.length}
            </span>
          </div>
          <Meter percent={percent} />
        </div>

        <div className="border-rule overflow-hidden rounded-[10px] border">
          {CASE_HPO.map((term, i) => (
            <div
              key={term.code}
              className={`flex items-center justify-between gap-4 px-3.5 py-[10px] transition-[opacity,transform] duration-[400ms] ${
                i === CASE_HPO.length - 1 ? "" : "border-b border-[#EDF0F2]"
              } ${i >= step ? "translate-y-1 opacity-[0.18]" : "translate-y-0 opacity-100"}`}
            >
              <span className="text-ink text-[13px]">{term.name}</span>
              <span className="font-mono-label text-primary text-[12px]">{term.code}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
