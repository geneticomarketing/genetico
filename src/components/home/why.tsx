"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { HomeWhyContent } from "@/content/home";
import type { SectionMeta } from "@/lib/cms/sections";

import { useCanvasLoop, useMedia, WIDE_QUERY } from "./hooks";
import { H2, LEAD, Label } from "./label";

const pad = (i: number) => String(i + 1).padStart(2, "0");

/** Where each fragment sits on the sticky stage, in the parties' order. */
const FRAGMENT_POSITION = [
  "top-[6%] left-[3%] w-[58%]",
  "top-[16%] right-[3%] w-1/2",
  "top-[43%] left-[6%] w-[44%]",
  "top-[51%] right-[4%] w-[48%]",
  "bottom-[5%] left-[18%] w-[56%]",
];

const FRAGMENT_HEAD =
  "font-mono-label text-ink-soft flex justify-between gap-2 border-b border-[#EDF0F2] px-3.5 py-2.5 text-[10.5px]";

/** The five documents one patient's information is scattered across. */
function Fragment({ i }: { i: number }) {
  switch (i) {
    case 0:
      return (
        <>
          <div className={FRAGMENT_HEAD}>
            <span>OPD_note_14-03.txt</span>
            <span>Clinician</span>
          </div>
          <div className="flex flex-col gap-2 p-3.5">
            <span className="font-headline text-ink-body text-[15px] leading-normal italic">
              “Seizures since 8 mo. Coarse facies, ?HSM. Advised review…”
            </span>
            <span className="block h-1.5 w-[92%] rounded-[3px] bg-[#EDF0F2]" />
            <span className="block h-1.5 w-[70%] rounded-[3px] bg-[#EDF0F2]" />
          </div>
        </>
      );
    case 1:
      return (
        <>
          <div className={FRAGMENT_HEAD}>
            <span>HIS · departmental</span>
            <span>Hospital</span>
          </div>
          <div className="flex flex-col px-3.5 pt-2 pb-3">
            {[
              ["Radiology · MRI brain", "RIS"],
              ["Pathology · CBC", "LIS"],
              ["Admission · Ward 4", "ADT"],
            ].map(([what, system], j) => (
              <div
                key={what}
                className={`flex justify-between py-[7px] text-[12.5px] ${j < 2 ? "border-b border-[#F1F3F5]" : ""}`}
              >
                <span>{what}</span>
                <span className="text-ink-dim">{system}</span>
              </div>
            ))}
          </div>
        </>
      );
    case 2:
      return (
        <div className="flex items-center gap-3 p-3.5">
          <span className="font-mono-label flex h-12 w-10 flex-none items-end justify-center rounded-md bg-[#FBEDEA] pb-1.5 text-[10px] font-medium text-[#B4432F]">
            PDF
          </span>
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="truncate text-[13px] font-medium">Enzyme_assay_report.pdf</span>
            <span className="text-ink-soft text-xs">Laboratory · 3 pages</span>
          </div>
        </div>
      );
    case 3:
      return (
        <>
          <div className={FRAGMENT_HEAD}>
            <span>Study_B_CRF.xlsx</span>
            <span>Research</span>
          </div>
          <div className="grid grid-cols-4 gap-1 px-3.5 pt-2.5 pb-3.5">
            {Array.from({ length: 12 }, (_, j) => (
              <span
                key={j}
                className={`block h-4 rounded-[3px] ${j < 4 ? "bg-primary-tint" : "bg-[#F4F6F8]"}`}
              />
            ))}
          </div>
        </>
      );
    default:
      return (
        <>
          <div className={FRAGMENT_HEAD}>
            <span>Quarterly return · Form 3</span>
            <span>Programme</span>
          </div>
          <div className="flex flex-col gap-2 px-3.5 pt-2.5 pb-3.5 text-[12.5px]">
            {["New cases registered ____", "Patients on therapy ____"].map((line) => (
              <span key={line} className="flex items-center gap-2">
                <span className="block h-3 w-3 rounded-[3px] border border-[#C3D2DC]" />
                {line}
              </span>
            ))}
          </div>
        </>
      );
  }
}

/**
 * 01 — why Genetico exists.
 *
 * At 1040px and up, a sticky stage holds the five fragments while the five
 * parties scroll past beside it; each party lights its own fragment as it
 * crosses the middle of the screen. Narrower, the stage goes and the parties
 * become a grid of cards. Then the hub: five parties, each on a spoke, with
 * information flowing in and out of IndiGeneUs.AI at the centre.
 */
export function Why({
  section,
  num,
  content,
}: {
  section: SectionMeta;
  num: string;
  content: HomeWhyContent;
}) {
  const wide = useMedia(WIDE_QUERY);
  const [step, setStep] = useState(0);
  const steps = useRef<HTMLDivElement | null>(null);

  // The active party is the last one whose top is above 52% of the viewport.
  useEffect(() => {
    if (!wide) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.52;
      let s = 0;
      steps.current?.querySelectorAll("[data-why-step]").forEach((el, i) => {
        if (el.getBoundingClientRect().top < line) s = i;
      });
      setStep(s);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [wide]);

  return (
    <section
      id={section.id}
      className="px-edge scroll-mt-32 pt-[clamp(88px,10vw,136px)] pb-[clamp(80px,9vw,120px)]"
    >
      <div className="max-w-site mx-auto">
        <div
          data-reveal
          className="mx-auto flex max-w-[920px] flex-col items-center gap-[26px] text-center"
        >
          <Label num={num}>{section.eyebrow}</Label>
          <h2 className={H2}>{content.heading}</h2>
          <p className={`${LEAD} text-ink-body`}>{content.description}</p>
        </div>

        <div className="mid:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] mt-[clamp(48px,6vw,80px)] grid grid-cols-[minmax(0,1fr)] gap-16">
          <div
            aria-hidden
            className="mid:block sticky top-[max(130px,calc(50vh-250px))] hidden h-[500px]"
          >
            <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(90%_80%_at_40%_40%,#EDF3F9_0%,#F6F9FA_60%,#fff_100%)]" />
            {FRAGMENT_POSITION.map((position, i) => (
              <div
                key={position}
                className={`absolute overflow-hidden rounded-xl border bg-white transition-[opacity,transform,box-shadow,border-color] duration-[450ms] ${position} ${
                  i === step
                    ? "border-primary z-[5] scale-[1.04] opacity-100 shadow-[0_30px_70px_rgba(7,59,104,0.22)]"
                    : "border-rule z-[1] scale-[0.97] opacity-[0.42] shadow-[0_10px_26px_rgba(7,59,104,0.06)]"
                }`}
              >
                <Fragment i={i} />
              </div>
            ))}
          </div>

          <div
            ref={steps}
            className="mid:flex mid:flex-col grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4 mid:gap-0"
          >
            {content.parties.map((party, i) => (
              <div
                key={party.name}
                data-why-step
                className={`max-mid:border-rule max-mid:rounded-card flex flex-col gap-3 transition-[opacity,border-color] duration-[400ms] max-mid:border max-mid:bg-[#FAFBFC] max-mid:px-6 max-mid:py-[26px] mid:min-h-[46vh] mid:justify-center mid:gap-[18px] mid:border-l-2 mid:pl-8 ${
                  i === step ? "mid:border-primary" : "mid:border-rule mid:opacity-[0.32]"
                }`}
              >
                <span className="font-mono-label text-primary text-xs tracking-[0.2em]">
                  {pad(i)} / {pad(content.parties.length - 1)}
                </span>
                <h3 className="font-headline m-0 text-[clamp(28px,3.4vw,44px)] leading-[1.08] font-normal tracking-[-0.018em]">
                  {party.name}
                </h3>
                <p className="text-ink-body m-0 max-w-[440px] text-lg leading-[1.7]">
                  {party.body}
                </p>
                <span className="font-mono-label text-ink-soft self-start rounded-full border border-dashed border-[#C3D2DC] px-3 py-1.5 text-[10.5px] tracking-[0.14em] uppercase">
                  {party.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          data-reveal
          className="mid:grid-cols-2 mt-[clamp(64px,8vw,104px)] grid grid-cols-[minmax(0,1fr)] items-center gap-x-[72px] gap-y-12"
        >
          <Hub labels={content.network.map((n) => n.label)} />
          <p className="font-headline text-ink m-0 text-[clamp(26px,3vw,38px)] leading-[1.3] font-normal tracking-[-0.012em] text-pretty">
            {content.closing} <span className="text-primary">{content.closingAccent}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

const TAU = Math.PI * 2;

/** The five parties on spokes round IndiGeneUs.AI: teal flows in, blue flows out. */
function Hub({ labels }: { labels: string[] }) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const n = labels.length;

  const draw = useCallback(
    (x: CanvasRenderingContext2D, S: number, t: number) => {
      const m = S / 2;
      [0.14, 0.25, 0.36, 0.47].forEach((r, i) => {
        x.beginPath();
        x.arc(m, m, S * r, 0, TAU);
        x.strokeStyle = i === 3 ? "rgba(11,76,134,0.07)" : "rgba(11,76,134,0.13)";
        x.lineWidth = 1;
        x.stroke();
      });
      for (let k = 0; k < 72; k++) {
        const a = (k / 72) * TAU + t / 60000;
        x.beginPath();
        x.arc(
          m + Math.cos(a) * S * 0.47,
          m + Math.sin(a) * S * 0.47,
          k % 6 === 0 ? 1.8 : 1,
          0,
          TAU,
        );
        x.fillStyle = k % 6 === 0 ? "rgba(46,155,130,0.55)" : "rgba(11,76,134,0.22)";
        x.fill();
      }
      for (let k = 0; k < 40; k++) {
        const a = (k / 40) * TAU - t / 45000;
        x.beginPath();
        x.arc(m + Math.cos(a) * S * 0.25, m + Math.sin(a) * S * 0.25, 1, 0, TAU);
        x.fillStyle = "rgba(11,76,134,0.25)";
        x.fill();
      }
      for (let i = 0; i < n; i++) {
        const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
        const ca = Math.cos(a);
        const sa = Math.sin(a);
        const nx = m + ca * S * 0.36;
        const ny = m + sa * S * 0.36;
        const ix = m + ca * S * 0.14;
        const iy = m + sa * S * 0.14;
        x.setLineDash([3, 5]);
        x.beginPath();
        x.moveTo(ix, iy);
        x.lineTo(nx, ny);
        x.strokeStyle = "rgba(11,76,134,0.30)";
        x.stroke();
        x.setLineDash([]);
        for (let j = 0; j < 3; j++) {
          const p = (t / 2600 + j / 3 + i * 0.13) % 1;
          x.beginPath();
          x.arc(nx + (ix - nx) * p, ny + (iy - ny) * p, 2.6, 0, TAU);
          x.fillStyle = `rgba(46,155,130,${(0.25 + Math.sin(p * Math.PI) * 0.75).toFixed(2)})`;
          x.fill();
          const q = (t / 3400 + j / 3 + i * 0.21) % 1;
          x.beginPath();
          x.arc(ix + (nx - ix) * q, iy + (ny - iy) * q, 2, 0, TAU);
          x.fillStyle = `rgba(11,76,134,${(0.2 + Math.sin(q * Math.PI) * 0.7).toFixed(2)})`;
          x.fill();
        }
        const pr = (t / 2200 + i * 0.2) % 1;
        x.beginPath();
        x.arc(nx, ny, S * 0.03 + pr * S * 0.035, 0, TAU);
        x.strokeStyle = `rgba(11,76,134,${(0.35 * (1 - pr)).toFixed(3)})`;
        x.stroke();
        x.beginPath();
        x.arc(nx, ny, S * 0.03, 0, TAU);
        x.fillStyle = "#fff";
        x.fill();
        x.strokeStyle = "#0B4C86";
        x.lineWidth = 1.5;
        x.stroke();
        x.lineWidth = 1;
        x.beginPath();
        x.arc(nx, ny, S * 0.01, 0, TAU);
        x.fillStyle = "#0B4C86";
        x.fill();
      }
    },
    [n],
  );

  useCanvasLoop(canvas, draw);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] justify-self-center">
      <div
        aria-hidden
        className="absolute inset-[4%] rounded-full bg-[radial-gradient(closest-side,#EDF3F9,rgba(237,243,249,0))]"
      />
      <canvas ref={canvas} aria-hidden className="absolute inset-0 block h-full w-full" />
      <div className="absolute top-1/2 left-1/2 flex aspect-square w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_20px_60px_rgba(7,59,104,0.18)]">
        <Image
          src="/brand/indigeneus-mark-black.png"
          alt="IndiGeneUs.AI"
          width={1065}
          height={1061}
          className="block h-[72%] w-[72%] motion-safe:animate-[spin-mark_30s_linear_infinite]"
        />
      </div>
      {labels.map((label, i) => {
        const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
        return (
          <span
            key={label}
            className="border-rule font-mono-label text-ink absolute -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white px-[11px] py-[5px] text-[10.5px] tracking-[0.12em] whitespace-nowrap uppercase shadow-[0_6px_16px_rgba(7,59,104,0.06)]"
            style={{
              left: `${(50 + Math.cos(a) * 36).toFixed(2)}%`,
              top: `${(50 + Math.sin(a) * 36 + (i === 0 ? -7 : 7)).toFixed(2)}%`,
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
