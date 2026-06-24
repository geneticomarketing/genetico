"use client";

import { Check, FileText, AlertTriangle } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { EASE, Reveal } from "@/components/motion/reveal";

const FLOAT = { duration: 5, repeat: Infinity, ease: "easeInOut" as const };
const SHIMMER = { duration: 2.2, repeat: Infinity, ease: "linear" as const };
const PULSE = { duration: 1.8, repeat: Infinity, ease: EASE };
const CYCLE_MS = 2200;

function CheckCallout({ children }: { children: string }) {
  return (
    <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#eef4f9] px-4 py-3.5 sm:px-5 sm:py-4">
      <span
        aria-hidden
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand"
      >
        <Check className="size-4 text-white" strokeWidth={2.5} />
      </span>
      <p className="secondaryFont text-sm font-semibold leading-snug text-brand sm:text-[0.9375rem]">
        {children}
      </p>
    </div>
  );
}

function FeatureText({
  number,
  category,
  title,
  description,
  callout,
}: {
  number: string;
  category: string;
  title: string;
  description: string;
  callout: string;
}) {
  return (
    <div className="max-w-lg">
      <span className="secondaryFont text-[0.85rem] font-medium text-[#c5cdd8]">{number}</span>
      <div
        aria-hidden
        className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-[#0d9488] to-accent"
      />
      <p className="t-eyebrow secondaryFont mt-5 text-[0.65rem] tracking-[0.28em] text-brand">
        {category}
      </p>
      <h3 className="t-card-title mt-4 max-w-none text-brand">{title}</h3>
      <p className="secondaryFont mt-4 text-[15px] leading-relaxed text-[#8f8f8f] sm:text-base">
        {description}
      </p>
      <CheckCallout>{callout}</CheckCallout>
    </div>
  );
}

function MacWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -10, 0] }}
      transition={FLOAT}
      className={`overflow-hidden rounded-2xl border border-[#e8ebf0] bg-white shadow-[0_24px_64px_rgba(0,36,69,0.1)] ${className ?? ""}`}
    >
      <div className="relative flex items-center justify-center border-b border-[#eef1f5] px-4 py-3">
        <div aria-hidden className="absolute left-4 flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="secondaryFont text-[0.72rem] text-[#a3afc4]">{title}</span>
      </div>
      {children}
    </motion.div>
  );
}

function ShimmerBar({
  value,
  height = "h-2",
  animateWidth,
}: {
  value: number;
  height?: string;
  animateWidth?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`${height} overflow-hidden rounded-full bg-[#e8ebf0]`}>
      <motion.div
        className="relative h-full rounded-full bg-gradient-to-r from-[#0d9488] to-[#22d3ee]"
        initial={false}
        animate={
          reduce
            ? { width: `${value}%` }
            : animateWidth
              ? { width: [`${value - 3}%`, `${value + 2}%`, `${value - 3}%`] }
              : { width: `${value}%` }
        }
        transition={
          animateWidth && !reduce
            ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
      >
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={SHIMMER}
          />
        )}
      </motion.div>
    </div>
  );
}

function DashboardBackdrop({ number, align = "right" }: { number: string; align?: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute top-1/2 z-0 -translate-y-1/2 select-none text-[clamp(10rem,22vw,16rem)] font-medium leading-none text-[#eef1f5] ${
        align === "left"
          ? "left-0 -translate-x-[18%]"
          : "right-0 translate-x-[18%]"
      }`}
      style={{ fontVariationSettings: '"SERF" 0' }}
    >
      {number}
    </span>
  );
}

function PatientIntakeDashboard() {
  const reduce = useReducedMotion();
  const tabs = ["Demographics", "Symptoms", "HPO Terms", "History", "Summary"];
  const [activeTab, setActiveTab] = useState(2);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActiveTab((i) => (i + 1) % tabs.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, tabs.length]);

  return (
    <MacWindow title="Patient Intake — Step 3 of 5">
      <div className="secondaryFont p-4 sm:p-5">
        <div className="flex gap-1 border-b border-[#eef1f5] pb-0 text-[0.62rem] sm:gap-2 sm:text-[0.68rem]">
          {tabs.map((tab, index) => {
            const isActive = index === activeTab;
            return (
              <button
                key={tab}
                type="button"
                aria-hidden
                className={`relative shrink-0 px-2 pb-2.5 transition-colors sm:px-2.5 ${
                  isActive ? "font-semibold text-brand" : "text-[#a3afc4]"
                }`}
              >
                {tab}
                {isActive && (
                  <motion.span
                    layoutId="intake-tab"
                    className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-brand"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-[#a3afc4] uppercase">
              HPO TERMS
            </p>
            <div className="mt-2 flex flex-wrap gap-2 rounded-lg border border-[#eef1f5] p-3">
              {[
                "Seizures HP:0001250",
                "Hypotonia HP:0001290",
                "Ataxia HP:0001251",
              ].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md bg-[#eef4f9] px-2 py-1 text-[0.68rem] font-medium text-brand"
                  animate={
                    reduce
                      ? undefined
                      : {
                          scale: activeTab === 2 ? [1, 1.04, 1] : 1,
                        }
                  }
                  transition={{ ...PULSE, delay: index * 0.15 }}
                >
                  {tag}
                  <span className="text-[#a3afc4]">×</span>
                </motion.span>
              ))}
              <span className="inline-flex items-center rounded-md bg-[#e6faf8] px-2.5 py-1 text-[0.68rem] font-medium text-brand">
                + Add term
              </span>
            </div>
          </div>

          <div>
            <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-[#a3afc4] uppercase">
              SYMPTOM ONSET
            </p>
            <div className="mt-2 rounded-lg border border-[#eef1f5] px-3 py-2.5 text-[0.75rem] text-[#6e6e73]">
              Infancy (0–2 years)
            </div>
          </div>

          <div>
            <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-[#a3afc4] uppercase">
              FAMILY HISTORY
            </p>
            <div className="mt-2 flex flex-wrap gap-4 text-[0.75rem] text-[#6e6e73]">
              {["None", "Affected sibling", "Unknown"].map((option, index) => (
                <span key={option} className="inline-flex items-center gap-1.5">
                  <motion.span
                    className={`size-3.5 rounded-full border ${
                      index === 1 ? "border-brand bg-brand" : "border-[#d4dce6] bg-white"
                    }`}
                    animate={
                      reduce || index !== 1
                        ? undefined
                        : { boxShadow: ["0 0 0 0 rgba(2,67,133,0)", "0 0 0 4px rgba(2,67,133,0.15)", "0 0 0 0 rgba(2,67,133,0)"] }
                    }
                    transition={PULSE}
                  />
                  {option}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-[#eef1f5] pt-4">
          <div className="flex items-center justify-between text-[0.72rem]">
            <span className="text-[#a3afc4]">Form completion</span>
            <motion.span
              className="font-semibold text-brand tabular-nums"
              animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
              transition={PULSE}
            >
              60%
            </motion.span>
          </div>
          <div className="mt-2">
            <ShimmerBar value={60} animateWidth />
          </div>
        </div>
      </div>
    </MacWindow>
  );
}

const IDENTIFIED_ROWS = [
  { label: "Gene Variant", value: "BRCA2 pathogenic c.5946delT" },
  { label: "Phenotype", value: "HP:0001250 Seizures" },
  { label: "Phenotype", value: "HP:0000924 Skeletal anomalies" },
  { label: "Lab Value", value: "CK: 1,240 U/L ↑ elevated" },
];

function DocumentImportDashboard() {
  const reduce = useReducedMotion();
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActiveRow((i) => (i + 1) % IDENTIFIED_ROWS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <MacWindow title="Document Import">
      <div className="secondaryFont p-4 sm:p-5">
        <div className="flex items-center gap-3 rounded-xl border border-[#eef1f5] p-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f4f6f9]">
            <FileText className="size-5 text-[#a3afc4]" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.8rem] font-semibold text-[#121212]">
              lab_report_aiims_2024.pdf
            </p>
            <p className="text-[0.68rem] text-[#a3afc4]">2.4 MB · Uploaded just now</p>
          </div>
          <motion.span
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#e8f5e9] px-2.5 py-1 text-[0.62rem] font-semibold text-success"
            animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
            transition={PULSE}
          >
            <Check className="size-3" strokeWidth={2.5} />
            Done
          </motion.span>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[0.72rem]">
            <span className="text-[#8f8f8f]">Extracting structured data</span>
            <span className="font-semibold text-brand">100%</span>
          </div>
          <div className="mt-2">
            <ShimmerBar value={100} height="h-2.5" />
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-[#eef1f5]">
          <p className="bg-[#eef4f9] px-3 py-2 text-[0.62rem] font-semibold tracking-[0.14em] text-brand uppercase">
            IDENTIFIED DATA
          </p>
          <ul>
            {IDENTIFIED_ROWS.map((row, index) => {
              const isActive = index === activeRow;
              return (
                <motion.li
                  key={row.value}
                  className="flex items-center justify-between gap-3 border-t border-[#eef1f5] px-3 py-2.5 text-[0.72rem] first:border-t-0"
                  animate={{
                    backgroundColor: isActive ? "rgba(238,244,249,0.9)" : "rgba(255,255,255,1)",
                  }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <span className="text-[#a3afc4]">{row.label}</span>
                  <span className="text-right font-medium text-[#121212]">{row.value}</span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["Structured", "HPO Tagged", "Registry-Ready"].map((tag, index) => (
            <motion.span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-[#eef4f9] px-2.5 py-1 text-[0.62rem] font-medium text-brand"
              animate={reduce ? undefined : { opacity: [0.65, 1, 0.65] }}
              transition={{ ...PULSE, delay: index * 0.25 }}
            >
              <Check className="size-3" strokeWidth={2.5} />
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </MacWindow>
  );
}

const TIMELINE_EVENTS = [
  { date: "Jan 2023", label: "Initial Visit", done: true },
  { date: "Jun 2023", label: "Follow-up Consult", done: true },
  { date: "Dec 2023", label: "Diagnosis Confirmed", done: true },
  { date: "Aug 2024", label: "Follow-up Due", pending: true },
];

function PatientTimelineDashboard() {
  const reduce = useReducedMotion();

  return (
    <MacWindow title="Patient Timeline">
      <div className="secondaryFont p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0d9488] to-accent text-sm font-semibold text-white">
            AS
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[0.85rem] font-semibold text-[#121212]">Ananya Sharma</p>
            <p className="text-[0.68rem] text-[#a3afc4]">
              ID: GEN-2024-041 · Rare skeletal dysplasia
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-[#eef4f9] px-2.5 py-1 text-[0.62rem] font-semibold text-brand">
            Active
          </span>
        </div>

        <div className="relative mt-6 px-1">
          <div className="relative flex items-start justify-between">
            <div
              aria-hidden
              className="absolute top-3 left-[6%] right-[6%] h-0.5 bg-gradient-to-r from-[#0d9488] via-accent to-[#d4dce6]"
            />
            {TIMELINE_EVENTS.map((event, index) => (
              <div key={event.label} className="relative z-10 flex flex-col items-center text-center">
                {event.pending ? (
                  <motion.span
                    className="size-3 rounded-full border-2 border-dashed border-[#d4dce6] bg-white"
                    animate={reduce ? undefined : { opacity: [0.45, 1, 0.45] }}
                    transition={PULSE}
                  />
                ) : (
                  <motion.span
                    className="size-3 rounded-full bg-brand"
                    animate={
                      reduce
                        ? undefined
                        : index === 2
                          ? { scale: [1, 1.2, 1] }
                          : undefined
                    }
                    transition={{ ...PULSE, delay: index * 0.1 }}
                  />
                )}
                <p className="mt-2 text-[0.58rem] text-[#a3afc4] sm:text-[0.62rem]">{event.date}</p>
                <p className="mt-0.5 text-[0.62rem] font-semibold text-[#121212] sm:text-[0.68rem]">
                  {event.label}
                </p>
                {event.pending && (
                  <motion.p
                    className="mt-0.5 text-[0.58rem] font-bold tracking-wide text-[#e67e22] sm:text-[0.62rem]"
                    animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
                    transition={PULSE}
                  >
                    PENDING
                  </motion.p>
                )}
              </div>
            ))}
          </div>

          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-4 top-[2.75rem] h-8 w-12 rounded-full bg-accent/20 blur-md"
              animate={{ x: ["0%", "280%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        <div className="mt-6 rounded-lg bg-[#f4f6f9] px-3 py-3">
          <p className="text-[0.62rem] font-semibold tracking-[0.12em] text-[#a3afc4] uppercase">
            LAST NOTE — DEC 2023
          </p>
          <p className="mt-1.5 text-[0.72rem] leading-relaxed text-[#6e6e73]">
            Skeletal dysplasia confirmed. NPRD report filed. Next review in 8 months.
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <motion.div
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#fef3e8] px-2.5 py-2 text-[0.68rem] font-medium text-[#e67e22]"
            animate={reduce ? undefined : { opacity: [0.75, 1, 0.75] }}
            transition={PULSE}
          >
            <AlertTriangle className="size-3.5 shrink-0" strokeWidth={2} />
            Follow-up due Aug 2024
          </motion.div>
          <span className="rounded-lg bg-brand px-4 py-2 text-[0.72rem] font-semibold text-white">
            Schedule
          </span>
        </div>
      </div>
    </MacWindow>
  );
}

function SolutionRow({
  number,
  category,
  title,
  description,
  callout,
  dashboard,
  reverse,
  tinted,
}: {
  number: string;
  category: string;
  title: string;
  description: string;
  callout: string;
  dashboard: ReactNode;
  reverse?: boolean;
  tinted?: boolean;
}) {
  return (
    <div
      className={`relative py-16 sm:py-20 lg:py-24 ${tinted ? "rounded-3xl bg-[#f6f8fb] px-6 sm:px-10 lg:px-12" : ""}`}
    >
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20 ${
          reverse ? "" : ""
        }`}
      >
        <Reveal
          className={`${reverse ? "lg:order-2" : ""}`}
          delay={reverse ? 0.06 : 0}
        >
          <FeatureText
            number={number}
            category={category}
            title={title}
            description={description}
            callout={callout}
          />
        </Reveal>

        <Reveal
          className={`relative ${reverse ? "lg:order-1" : ""}`}
          delay={reverse ? 0 : 0.06}
        >
          <DashboardBackdrop number={number} align={reverse ? "left" : "right"} />
          <div className="relative z-10">{dashboard}</div>
        </Reveal>
      </div>
    </div>
  );
}

export function SolutionsHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white px-6 py-20 text-[#121212] sm:px-10 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span aria-hidden className="h-px w-10 shrink-0 bg-[#b8cce0] sm:w-16" />
            <p className="t-eyebrow secondaryFont text-brand shrink-0 text-[0.7rem] tracking-[0.36em]">
              How It Works
            </p>
            <span aria-hidden className="h-px w-10 shrink-0 bg-[#b8cce0] sm:w-16" />
          </div>

          <h2 className="t-heading mx-auto mt-8 text-balance text-[#121212]">
            How Genetico Solves It
          </h2>

          <p className="secondaryFont mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#8f8f8f] sm:mt-6 sm:text-base">
            Clinicians currently use disconnected paper forms, unstructured notes, and ad-hoc
            reporting. Every consultation starts from scratch. No consistency across the team.
          </p>
        </Reveal>

        <div className="mt-14 sm:mt-20">
          <SolutionRow
            number="01"
            category="CLINICAL STANDARDIZATION"
            title="Customizable Clinical Workflow"
            description="Structured, guided data capture across the entire consultation — demographics, symptoms, family history, investigations. Consistent across all clinicians in the COE."
            callout="40% reduction in consultation documentation time"
            dashboard={<PatientIntakeDashboard />}
          />

          <SolutionRow
            number="02"
            category="DATA CAPTURE"
            title="OCR & Report Digitisation"
            description="Extract structured clinical and genetic data from scanned lab reports, PDFs, and physical documents. Eliminates manual re-entry and dramatically cuts processing time."
            callout="Eliminates time taken for manual transcription"
            dashboard={<DocumentImportDashboard />}
            reverse
          />

          <SolutionRow
            number="03"
            category="LONGITUDINAL CARE"
            title="Long-term Follow-up Tracking"
            description="Structured patient records persist across all visits. Alerts for overdue follow-ups. Longitudinal view of disease progression per patient, automatically updated each visit."
            callout="No rebuilding of patient history at each visit"
            dashboard={<PatientTimelineDashboard />}
            tinted
          />
        </div>
      </div>
    </section>
  );
}
