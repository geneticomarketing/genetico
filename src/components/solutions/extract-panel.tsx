"use client";

import { Meter, Panel, PanelRow, PanelTable, useCycle } from "@/components/solutions/parts";
import { EXTRACT_ROWS, EXTRACT_TAGS } from "@/content/solution-demos";

/**
 * The document-import mock-up, drawn on both solution pages.
 *
 * It runs on a loop: the bar fills a quarter at a time, each identified field
 * arriving with it, and the tags turn green once the read is done. Held at
 * the finished state when motion is reduced — a half-read document is a worse
 * picture of the product than a finished one.
 *
 * Only the filename and the caption differ between the two pages.
 */
export function ExtractPanel({ filename, caption }: { filename: string; caption: string }) {
  const step = useCycle(EXTRACT_ROWS.length, 900);
  const percent = Math.round((step / EXTRACT_ROWS.length) * 100);
  const done = percent >= 100;

  return (
    <Panel title="Document import" caption={caption}>
      <div className="flex flex-col gap-[18px] p-5">
        <div className="border-rule flex items-center gap-3.5 rounded-[10px] border p-3.5">
          <span className="border-rule text-ink-soft flex h-[38px] w-[38px] flex-none items-center justify-center rounded-lg border bg-[#F4F6F8] text-[15px]">
            ⎙
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <span className="text-ink truncate text-sm font-medium">{filename}</span>
            <span className="text-ink-soft text-[12.5px]">2.4 MB · uploaded just now</span>
          </span>
          <span className="bg-teal-tint text-teal-deep flex-none rounded-full px-[11px] py-1.5 text-[12.5px] font-medium">
            {done ? "✓ Done" : "Reading…"}
          </span>
        </div>

        <div className="flex flex-col gap-[9px]">
          <div className="flex items-center justify-between">
            <span className="text-ink-soft text-[13px]">Extracting structured data</span>
            <span className="font-mono-label text-primary text-[13px] font-medium">{percent}%</span>
          </div>
          <Meter percent={percent} />
        </div>

        <PanelTable label="Identified data">
          {EXTRACT_ROWS.map((row, i) => (
            <PanelRow
              key={`${row.label}-${row.value}`}
              label={row.label}
              value={row.value}
              dimmed={i >= step}
              last={i === EXTRACT_ROWS.length - 1}
            />
          ))}
        </PanelTable>

        <div className="flex flex-wrap gap-2">
          {EXTRACT_TAGS.map((tag) => (
            <span
              key={tag}
              className={`font-mono-label rounded-md px-[11px] py-1.5 text-[10.5px] tracking-[0.06em] transition-colors duration-[400ms] ${
                done ? "bg-teal-tint text-teal-deep" : "text-ink-dim bg-[#F4F6F8]"
              }`}
            >
              ✓ {tag}
            </span>
          ))}
        </div>
      </div>
    </Panel>
  );
}
