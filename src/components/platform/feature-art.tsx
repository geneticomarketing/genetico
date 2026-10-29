import {
  CASE,
  CASE_GROWTH,
  CASE_HPO,
  CASE_NOTE,
  DICTATION,
  LAB_EXTRACT,
} from "@/content/sample-case";

/**
 * The illustration beside each Platform feature tab, drawn in code on the
 * shared sample case so it shows the real screen rather than a diagram of it.
 *
 * The tabs themselves are CMS entries with no stable key, so the drawing is
 * picked by a word in the tab's title — "pedigree", "phenotyp", "dictat",
 * "growth", report-reading words, "workflow". A tab whose title matches none
 * falls back to its uploaded image. Renaming a tab in the admin panel keeps
 * its drawing as long as the word stays; the matcher below is the list.
 */
const MATCHERS = [
  { test: /pedigree|family/i, kind: "pedigree" },
  { test: /phenotyp|hpo/i, kind: "phenotype" },
  { test: /dictat|speech|voice/i, kind: "dictation" },
  { test: /growth/i, kind: "growth" },
  { test: /ocr|digiti|report|extract|investigation/i, kind: "extract" },
  { test: /workflow|case editor|configur/i, kind: "workflow" },
] as const;

export type FeatureArtKind = (typeof MATCHERS)[number]["kind"];

/** Which drawing a tab title gets, or null to use its uploaded image. */
export function featureArtKind(title: string): FeatureArtKind | null {
  return MATCHERS.find((m) => m.test.test(title))?.kind ?? null;
}

export function FeatureArt({ kind }: { kind: FeatureArtKind }) {
  switch (kind) {
    case "pedigree":
      return <PedigreeArt />;
    case "phenotype":
      return <PhenotypeArt />;
    case "dictation":
      return <DictationArt />;
    case "growth":
      return <GrowthArt />;
    case "extract":
      return <ExtractArt />;
    case "workflow":
      return <WorkflowArt />;
  }
}

const LABEL = "font-mono-label text-[10px] tracking-[0.16em] uppercase";

/** A white card with the screen's name across the top, sized to the feature box. */
function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      aria-hidden
      className="border-rule flex h-full w-full flex-col overflow-hidden rounded-[10px] border bg-white shadow-[0_18px_44px_rgba(7,59,104,0.08)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#EDF0F2] bg-[#FAFBFC] px-4 py-2.5">
        <span className={`${LABEL} text-ink-soft`}>{title}</span>
        <span className={`${LABEL} text-ink-dim`}>{CASE.id}</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">{children}</div>
    </div>
  );
}

function PedigreeArt() {
  return (
    <Frame title="Pedigree editor">
      <div className="text-ink-soft flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
        {["Save", "Print", "PNG", "Export", "Diseases"].map((t) => (
          <span key={t} className="rounded border border-[#EDF0F2] px-2 py-0.5">
            {t}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 320 190" className="min-h-0 w-full flex-1" role="presentation">
        <g stroke="#0B4C86" strokeWidth="2" fill="#fff">
          {/* Parents, first cousins: the double line marks consanguinity. */}
          <rect x="88" y="20" width="26" height="26" />
          <circle cx="219" cy="33" r="13" />
          <line x1="114" y1="30" x2="206" y2="30" />
          <line x1="114" y1="36" x2="206" y2="36" />
          <line x1="160" y1="36" x2="160" y2="80" />
          <line x1="80" y1="80" x2="240" y2="80" />
          <line x1="80" y1="80" x2="80" y2="104" />
          <line x1="160" y1="80" x2="160" y2="104" />
          <line x1="240" y1="80" x2="240" y2="104" />
          <circle cx="80" cy="117" r="13" />
          <rect x="147" y="104" width="26" height="26" fill="#0B4C86" />
          <rect x="227" y="104" width="26" height="26" />
        </g>
        <path d="M128 150 l16 -16" stroke="#2E9B82" strokeWidth="2.5" />
        <path d="M144 134 l-8 1 l7 7 z" fill="#2E9B82" />
        <text x="160" y="158" textAnchor="middle" fontSize="11" fill="#12161A">
          Proband · {CASE.id}
        </text>
        <text x="160" y="16" textAnchor="middle" fontSize="10" fill="#6E767D">
          Consanguineous
        </text>
      </svg>
      <div className="flex flex-wrap gap-1.5">
        <span className="bg-primary-tint text-primary-deep rounded-md px-2 py-1 text-[11.5px]">
          Consanguinity: first cousins
        </span>
        <span className="bg-teal-tint text-teal-deep rounded-md px-2 py-1 text-[11.5px]">
          Affected: proband only
        </span>
      </div>
    </Frame>
  );
}

function PhenotypeArt() {
  return (
    <Frame title="Clinical symptoms · Extract HPO terms">
      <p className="text-ink-body m-0 rounded-md border border-[#EDF0F2] p-2.5 text-[12px] leading-[1.55]">
        {CASE_NOTE}
      </p>
      <span className={`${LABEL} text-primary`}>Extracted HPO terms</span>
      <div className="flex flex-col">
        {CASE_HPO.map((h) => (
          <div
            key={h.code}
            className="flex justify-between gap-3 border-t border-[#F1F3F5] py-1.5 text-[12.5px]"
          >
            <span>{h.name}</span>
            <span className="font-mono-label text-primary text-[11px]">{h.code}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function ExtractArt() {
  return (
    <Frame title="Smart investigation extract">
      <div className="flex items-center justify-between gap-2 rounded-md border border-dashed border-[#C9D5DF] px-3 py-2 text-[12px]">
        <span className="font-mono-label text-ink-soft truncate text-[11px]">
          {LAB_EXTRACT.file}
        </span>
        <span className="bg-teal-tint text-teal-deep flex-none rounded px-2 py-0.5 text-[11px]">
          ✓ Extracted
        </span>
      </div>
      <div className="flex justify-between gap-2 text-[12.5px]">
        <span className="font-bold">{LAB_EXTRACT.test}</span>
        <span className="font-mono-label text-ink-soft text-[11px]">{LAB_EXTRACT.date}</span>
      </div>
      <div className="flex flex-col">
        {LAB_EXTRACT.rows.map((r) => (
          <div
            key={r.field}
            className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.9fr)] gap-2 border-t border-[#F1F3F5] py-1.5 text-[12px]"
          >
            <span className="text-ink-soft truncate">{r.field}</span>
            <span className={r.high ? "font-medium text-[#B4432F]" : "font-medium"}>
              {r.value} {r.unit}
            </span>
            <span className="font-mono-label text-ink-soft text-right text-[10.5px]">
              {r.range}
            </span>
          </div>
        ))}
      </div>
      <span className="text-ink-soft mt-auto text-[11.5px]">
        Review before saving to the record
      </span>
    </Frame>
  );
}

/** The case form's sections, as Case Editor Configuration lists them. */
const CASE_SECTIONS = [
  "Patient information",
  "Chief complaints",
  "Case history",
  "Family history & pedigree",
  "Birth history",
  "Developmental history",
  "Measurements",
  "Clinical symptoms",
  "Investigations",
  "Clinical photographs",
  "Diagnosis",
  "Advice",
  "Plan",
  "Baseline summary",
];

function WorkflowArt() {
  return (
    <Frame title="Case editor configuration">
      <span className={`${LABEL} text-ink-soft`}>Sections in this clinic&apos;s case form</span>
      <div className="flex flex-wrap gap-1.5">
        {CASE_SECTIONS.map((s) => (
          <span key={s} className="bg-primary-deep rounded-md px-2 py-1 text-[11.5px] text-white">
            {s}
          </span>
        ))}
        <span className="text-ink-soft rounded-md border border-dashed border-[#C9D5DF] px-2 py-1 text-[11.5px]">
          + Developmental quotient
        </span>
      </div>
      <span className="text-ink-soft mt-auto text-[11.5px]">
        The same sections feed the report, with the clinic&apos;s own logo, header and footer.
      </span>
    </Frame>
  );
}

function DictationArt() {
  return (
    <Frame title="Dictate · ambient">
      <div className="flex flex-col gap-1.5">
        {DICTATION.transcript.map((t) => (
          <p key={t.line} className="m-0 text-[12px] leading-[1.45]">
            <span className="font-mono-label text-ink-soft mr-1.5 text-[10px] uppercase">
              {t.who}
            </span>
            {t.line}
          </p>
        ))}
      </div>
      <span className={`${LABEL} text-primary pt-1`}>Proposed for the case</span>
      {DICTATION.proposed.map((f) => (
        <div
          key={f.section}
          className="flex items-center justify-between gap-2 border-t border-[#F1F3F5] pt-1.5 text-[12px]"
        >
          <span className="min-w-0">
            <span className="text-ink-soft block text-[10.5px]">{f.section}</span>
            {f.value}
          </span>
          <span className="bg-teal-tint text-teal-deep flex-none rounded px-2 py-0.5 text-[10.5px]">
            Approve
          </span>
        </div>
      ))}
    </Frame>
  );
}

/** WHO weight-for-age, boys 0–5 y, kg at each year: 3rd, 50th and 97th centiles. */
const CENTILES = [
  { label: "97th", kg: [4.3, 11.8, 15.1, 17.8, 20.4, 23.0] },
  { label: "50th", kg: [3.3, 9.6, 12.2, 14.3, 16.3, 18.3] },
  { label: "3rd", kg: [2.5, 7.8, 9.9, 11.6, 13.1, 14.6] },
];

const X = (years: number) => 30 + years * 56;
const Y = (kg: number) => 170 - kg * 6.4;

function GrowthArt() {
  return (
    <Frame title="Measurements · WHO standard (0–5 y)">
      <svg viewBox="0 0 320 190" className="min-h-0 w-full flex-1" role="presentation">
        <line x1="30" y1="170" x2="310" y2="170" stroke="#C9D5DF" />
        <line x1="30" y1="10" x2="30" y2="170" stroke="#C9D5DF" />
        {CENTILES.map((c) => (
          <g key={c.label}>
            <polyline
              fill="none"
              stroke={c.label === "50th" ? "#2E9B82" : "#E0A33A"}
              strokeWidth="1.6"
              points={c.kg.map((kg, i) => `${X(i)},${Y(kg)}`).join(" ")}
            />
            <text x={X(5) + 2} y={Y(c.kg[5]) + 3} fontSize="9" fill="#6E767D">
              {c.label}
            </text>
          </g>
        ))}
        {/* 9.8 kg at 2 y 4 m. */}
        <circle cx={X(2.33)} cy={Y(9.8)} r="4.5" fill="#0B4C86" />
        {[0, 1, 2, 3, 4, 5].map((y) => (
          <text key={y} x={X(y)} y="184" fontSize="9" textAnchor="middle" fill="#6E767D">
            {y}
          </text>
        ))}
      </svg>
      <div className="flex flex-wrap gap-1.5">
        {CASE_GROWTH.map((g) => (
          <span
            key={g.label}
            className="bg-primary-tint text-primary-deep rounded-md px-2 py-1 text-[11.5px]"
          >
            {g.label} {g.value} · z {g.z}
          </span>
        ))}
      </div>
    </Frame>
  );
}
