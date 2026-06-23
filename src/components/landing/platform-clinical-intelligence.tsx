"use client";

import { Reveal } from "@/components/motion/reveal";

type Capability = {
  number: string;
  title: string;
  description: string;
  badge: string;
};

const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "RAPID Score",
    description:
      "Differential diagnosis ranked by probability, updated in real time as new clinical data is entered.",
    badge: "Differential Diagnosis",
  },
  {
    number: "02",
    title: "Data-Driven Reasoning",
    description:
      "Every recommendation is traceable to specific evidence paths — phenotypic, genomic, and literature-based.",
    badge: "Evidence-Backed",
  },
  {
    number: "03",
    title: "Compare Overlapping Diseases",
    description:
      "Side-by-side comparison of phenotypically similar conditions to support clinical disambiguation.",
    badge: "Disease Disambiguation",
  },
];

const RAPID_SCORES = [
  { name: "Dravet Syndrome", code: "G40.82", value: 74, active: true },
  { name: "GEFS+", code: "G40.30", value: 48, active: false },
  { name: "Lennox-Gastaut", code: "G40.812", value: 23, active: false },
  { name: "Angelman Syndrome", code: "Q93.51", value: 15, active: false },
];

const EVIDENCE_ROWS = [
  { label: "Phenotypic Features", value: "12 matched" },
  { label: "Genomic Variants", value: "SCN1A detected" },
  { label: "Literature Evidence", value: "47 publications" },
  { label: "OMIM Classification", value: "Confirmed pathogenic" },
];

function CapabilityBadge({ label }: { label: string }) {
  return (
    <span className="border-accent/45 text-accent inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase">
      <span aria-hidden className="bg-accent size-1.5 rounded-full" />
      {label}
    </span>
  );
}

function RapidScoreWidget() {
  return (
    <div className="w-full max-w-md justify-self-end lg:max-w-lg">
      <ul className="space-y-5">
        {RAPID_SCORES.map((item) => (
          <li key={item.name}>
            <div className="flex items-baseline justify-between gap-4">
              <div className="min-w-0">
                <p
                  className={`truncate text-[15px] ${item.active ? "text-white" : "text-white/55"}`}
                >
                  {item.name}
                </p>
                <p className="mt-0.5 text-[12px] text-white/30">{item.code}</p>
              </div>
              <span
                className={`shrink-0 text-[15px] font-medium tabular-nums ${
                  item.active ? "text-accent" : "text-white/35"
                }`}
              >
                {item.value}%
              </span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-all ${
                  item.active ? "bg-accent shadow-[0_0_16px_rgba(95,215,203,0.55)]" : "bg-accent/25"
                }`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EvidenceWidget() {
  return (
    <div className="w-full max-w-md divide-y divide-white/10 justify-self-end rounded-xl border border-white/10 bg-white/3 lg:max-w-lg">
      {EVIDENCE_ROWS.map((row) => (
        <div key={row.label} className="flex items-center gap-3 px-5 py-4">
          <span aria-hidden className="bg-accent size-1.5 shrink-0 rounded-full" />
          <span className="flex-1 text-[14px] text-white/45">{row.label}</span>
          <span className="text-right font-mono text-[13px] text-white/80">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function ComparisonWidget() {
  return (
    <div className="w-full max-w-md justify-self-end overflow-hidden rounded-xl border border-white/10 bg-white/3 lg:max-w-lg">
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <div className="px-4 py-5 sm:px-5">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-white/30 uppercase">
            Disease A
          </p>
          <p className="mt-2 text-[14px] font-medium text-white">Dravet Syndrome</p>
          <ul className="mt-4 space-y-2.5 text-[12px] leading-relaxed text-white/40">
            <li>Febrile seizures</li>
            <li>SCN1A variant</li>
            <li>Hypotonia</li>
            <li>Photosensitivity</li>
          </ul>
        </div>

        <div className="bg-[#0a2744]/80 px-4 py-5 sm:px-5">
          <p className="text-accent text-[10px] font-semibold tracking-[0.16em] uppercase">
            Shared
          </p>
          <ul className="text-accent mt-4 space-y-2.5 text-[12px] leading-relaxed">
            <li>Epilepsy</li>
            <li>Dev. delay</li>
            <li>EEG changes</li>
          </ul>
        </div>

        <div className="px-4 py-5 sm:px-5">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-white/30 uppercase">
            Disease B
          </p>
          <p className="mt-2 text-[14px] font-medium text-white">Lennox-Gastaut</p>
          <ul className="mt-4 space-y-2.5 text-[12px] leading-relaxed text-white/40">
            <li>Multiple sz. types</li>
            <li>Slow spike-wave</li>
            <li>Atonic seizures</li>
            <li>Cognitive impairment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const WIDGETS = [RapidScoreWidget, EvidenceWidget, ComparisonWidget];

export function PlatformClinicalIntelligence() {
  return (
    <section
      id="clinical-intelligence"
      className="relative overflow-hidden px-6 py-20 text-white sm:px-10 sm:py-24 lg:py-28"
      style={{
        background: "linear-gradient(280deg, #12325a 0%, #024385 46%, #00101f 78%, #00101f 100%)",
      }}
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <p className="t-eyebrow text-accent text-[0.7rem] tracking-[0.32em]">
                  Clinical Intelligence
                </p>
                <span aria-hidden className="bg-accent h-0.5 w-10 sm:w-14" />
              </div>
              <h2
                className="t-heading mt-5 max-w-none text-white"
                style={{ fontVariationSettings: '"SERF" 100' }}
              >
                Clinical Decision Support System
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-white/45 sm:text-base lg:justify-self-end lg:pb-1">
              Not another feature list — a fundamentally different approach to how AI supports rare
              disease diagnosis.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 border-t border-white/10 sm:mt-20">
          {CAPABILITIES.map((capability, index) => {
            const Widget = WIDGETS[index];
            return (
              <Reveal key={capability.number} delay={index * 0.06}>
                <div
                  className={`grid gap-10 py-12 sm:py-14 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                    index < CAPABILITIES.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 sm:gap-x-8">
                    <span className="text-[13px] font-semibold tracking-wide text-white/30">
                      {capability.number}
                    </span>
                    <div>
                      <h3
                        className="t-card-title max-w-none text-white"
                        style={{ fontVariationSettings: '"SERF" 100' }}
                      >
                        {capability.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/45 sm:text-base">
                        {capability.description}
                      </p>
                      <div className="mt-6">
                        <CapabilityBadge label={capability.badge} />
                      </div>
                    </div>
                  </div>

                  <Widget />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
