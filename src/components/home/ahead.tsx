"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import type { HomeAheadContent } from "@/content/home";
import type { SectionMeta } from "@/lib/cms/sections";

import { useCanvasLoop, useClock, useOnScreen, useReducedMotion } from "./hooks";
import { H2, LEAD, Label, SECTION } from "./label";

const STAGE_MS = 6000;
const TAU = Math.PI * 2;

/**
 * 07 — where Genetico is going: three stages, drawn as one network that
 * grows. Stage one is six separate nodes; two joins them to the hub with
 * information flowing both ways; three rings them together.
 *
 * The stages advance by themselves every six seconds while the section is on
 * screen, with a teal bar showing the time left. Choosing one stops that.
 */
export function Ahead({
  section,
  num,
  content,
}: {
  section: SectionMeta;
  num: string;
  content: HomeAheadContent;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();
  const onScreen = useOnScreen(ref);
  const [chosen, setChosen] = useState<number | null>(null);
  const auto = chosen === null && !reduced;
  const clock = useClock(onScreen && auto);

  const count = content.stages.length;
  const stage = chosen ?? (reduced ? count - 1 : Math.floor(clock / STAGE_MS) % count);
  const progress = (clock % STAGE_MS) / STAGE_MS;

  const draw = useCallback(
    (x: CanvasRenderingContext2D, S: number, t: number) => {
      const m = S / 2;
      const N = 6;
      const nodes: [number, number, number][] = [];
      for (let i = 0; i < N; i++) {
        const a = ((-90 + i * 60) * Math.PI) / 180;
        nodes.push([m + Math.cos(a) * S * 0.34, m + Math.sin(a) * S * 0.34, a]);
      }

      x.beginPath();
      x.arc(m, m, S * 0.34, 0, TAU);
      x.strokeStyle = `rgba(143,198,239,${stage === 2 ? 0.35 : 0.08})`;
      x.setLineDash(stage === 2 ? [] : [2, 6]);
      x.stroke();
      x.setLineDash([]);

      if (stage === 2) {
        for (let i = 0; i < N; i++) {
          const a = nodes[i];
          const b = nodes[(i + 1) % N];
          for (let j = 0; j < 2; j++) {
            const p = (t / 3000 + j / 2 + i * 0.1) % 1;
            x.beginPath();
            x.arc(a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p, 1.8, 0, TAU);
            x.fillStyle = "rgba(143,198,239,0.8)";
            x.fill();
          }
        }
      }

      nodes.forEach(([nx, ny, a], i) => {
        const ix = m + Math.cos(a) * S * 0.12;
        const iy = m + Math.sin(a) * S * 0.12;
        if (stage >= 1) {
          x.beginPath();
          x.moveTo(ix, iy);
          x.lineTo(nx, ny);
          x.strokeStyle = "rgba(143,198,239,0.35)";
          x.stroke();
          for (let j = 0; j < 3; j++) {
            const p = (t / 2400 + j / 3 + i * 0.13) % 1;
            x.beginPath();
            x.arc(nx + (ix - nx) * p, ny + (iy - ny) * p, 2.4, 0, TAU);
            x.fillStyle = `rgba(79,179,160,${(0.3 + Math.sin(p * Math.PI) * 0.7).toFixed(2)})`;
            x.fill();
            const q = (t / 3200 + j / 3 + i * 0.2) % 1;
            x.beginPath();
            x.arc(ix + (nx - ix) * q, iy + (ny - iy) * q, 1.8, 0, TAU);
            x.fillStyle = `rgba(143,198,239,${(0.25 + Math.sin(q * Math.PI) * 0.7).toFixed(2)})`;
            x.fill();
          }
        }
        for (let k = 0; k < 3; k++) {
          const sa = a + (k - 1) * 0.32;
          const sx = m + Math.cos(sa) * S * 0.46;
          const sy = m + Math.sin(sa) * S * 0.46;
          x.beginPath();
          x.moveTo(nx, ny);
          x.lineTo(sx, sy);
          x.strokeStyle = "rgba(143,198,239,0.16)";
          x.stroke();
          x.beginPath();
          x.arc(sx, sy, 2.6, 0, TAU);
          x.fillStyle = "rgba(143,198,239,0.55)";
          x.fill();
        }
        const pr = (t / 2200 + i * 0.17) % 1;
        if (stage >= 1) {
          x.beginPath();
          x.arc(nx, ny, S * 0.028 + pr * S * 0.03, 0, TAU);
          x.strokeStyle = `rgba(79,179,160,${(0.4 * (1 - pr)).toFixed(3)})`;
          x.stroke();
        }
        x.beginPath();
        x.arc(nx, ny, S * 0.028, 0, TAU);
        x.fillStyle = "#0A2A48";
        x.fill();
        x.strokeStyle = stage >= 1 ? "#4FB3A0" : "rgba(143,198,239,0.6)";
        x.lineWidth = 1.5;
        x.stroke();
        x.lineWidth = 1;
        x.beginPath();
        x.arc(nx, ny, S * 0.009, 0, TAU);
        x.fillStyle = stage >= 1 ? "#4FB3A0" : "#8FC6EF";
        x.fill();
      });
    },
    [stage],
  );

  useCanvasLoop(canvas, draw);

  const hubOn = stage > 0;

  return (
    <section
      id={section.id}
      ref={ref}
      className={`${SECTION} relative overflow-hidden bg-[radial-gradient(120%_90%_at_0%_0%,#0B3E6C_0%,#062039_50%,#040E1A_100%)] text-white`}
    >
      <div className="max-w-site relative mx-auto">
        <div className="mid:grid-cols-2 grid grid-cols-[minmax(0,1fr)] items-center gap-x-[72px] gap-y-14">
          <div className="flex min-w-0 flex-col gap-6">
            <div data-reveal className="flex flex-col gap-6">
              <Label num={num} tone="dark">
                {section.eyebrow}
              </Label>
              <h2 className={`${H2} text-white`}>{content.heading}</h2>
              <p className={`${LEAD} text-sky max-w-[540px]`}>{content.description}</p>
            </div>
            <div className="mt-5 flex flex-col">
              {content.stages.map((s, i) => {
                const on = i === stage;
                return (
                  <button
                    key={s.title}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setChosen(i)}
                    className={`relative w-full cursor-pointer border-0 border-b border-white/14 px-[22px] py-5 text-left transition-colors duration-300 ${
                      on ? "rounded-xl bg-white/7" : "bg-transparent"
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono-label text-mint text-[11px] tracking-[0.16em] whitespace-nowrap uppercase">
                        {s.tag}
                      </span>
                      <span
                        className={`font-headline text-[clamp(22px,2.2vw,28px)] leading-[1.12] tracking-[-0.015em] transition-colors duration-300 ${
                          on ? "text-white" : "text-sky-soft"
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                    <div
                      className={`grid transition-[grid-template-rows] duration-[400ms] ${
                        on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="text-sky m-0 pt-2.5 text-base leading-[1.7]">{s.body}</p>
                      </div>
                    </div>
                    <div aria-hidden className="absolute right-0 -bottom-px left-0 h-0.5">
                      <div
                        className="bg-teal h-0.5 rounded-sm"
                        style={{ width: `${on && auto ? (progress * 100).toFixed(1) : 0}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-sky-soft mt-3 mb-0 text-[13px] leading-[1.6]">{content.footnote}</p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[560px] justify-self-center">
            <div
              aria-hidden
              className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(79,179,160,0.16),rgba(79,179,160,0))]"
            />
            <canvas ref={canvas} aria-hidden className="absolute inset-0 block h-full w-full" />
            <div
              className={`absolute top-1/2 left-1/2 flex aspect-square w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-[600ms] ${
                hubOn
                  ? "scale-100 border-[rgba(143,198,239,0.5)] bg-[radial-gradient(circle,#0F5FA3,#073B68)] opacity-100 shadow-[0_0_0_10px_rgba(79,179,160,0.10),0_30px_80px_rgba(0,0,0,0.4)]"
                  : "scale-[0.7] border-white/18 bg-white/4 opacity-50"
              }`}
            >
              <Image
                src="/brand/indigeneus-mark-white.png"
                alt="IndiGeneUs.AI"
                width={1065}
                height={1061}
                className="block h-[70%] w-[70%] motion-safe:animate-[spin-mark_30s_linear_infinite]"
              />
            </div>
            <span className="font-mono-label text-sky absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full border border-white/18 px-3.5 py-1.5 text-[10.5px] tracking-[0.14em] whitespace-nowrap uppercase">
              {content.stages[stage].caption}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
