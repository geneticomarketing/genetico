import type { HomeV3Mockup } from "@/content/home-v3";

/**
 * The four product mock-ups in section 04.
 *
 * They are real DOM rather than screenshots, which is the handoff's decision
 * and its reasoning: image models render interface text as gibberish, and a
 * fabricated screenshot in a credibility section is worse than none. Built
 * this way they also stay legible at any zoom and use the site's own type and
 * palette.
 *
 * **Every figure in here is invented.** The panels carry a "Sample case" /
 * "Illustrative output" / "Illustrative data" tag and the section carries
 * "Illustrative interfaces · sample data"; keep all of it until real product
 * captures replace them.
 *
 * Sizing is container-query based: each frame declares `container-type:
 * inline-size` and everything inside is in `cqw`, so a panel scales with its
 * card rather than with the viewport. `clamp()` floors and caps hold type
 * between roughly 9px and 21px, and heights are content-driven so a panel
 * never shows dead space.
 *
 * Each frame is one `role="img"` to assistive tech: read aloud, the fields
 * would otherwise be an undifferentiated wall of invented clinical data.
 */

/** The small uppercase mono label used for every field name and unit. */
const MICRO = "font-mono-label text-[clamp(8.5px,1.7cqw,10px)] tracking-[0.1em] uppercase";

function Frame({
  title,
  tag,
  label,
  gap,
  children,
}: {
  /** Left of the frame's title bar — what this screen would be called. */
  title: string;
  /** Right of it — the standing reminder that the data is not real. */
  tag: string;
  /** What assistive tech hears in place of the whole panel. */
  label: string;
  /** Body row gap, in `cqw`; the four panels each want their own. */
  gap: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="@container border-rule relative flex w-full flex-col overflow-hidden rounded-[10px] border bg-white"
    >
      {/* Below ~420px of panel the two labels no longer fit one line, and side
          by side they clip each other rather than wrapping. */}
      <div className="border-b-rule-light bg-sheet-soft @max-[420px]:flex-col @max-[420px]:items-start @max-[420px]:gap-[1cqw] flex flex-none items-center justify-between gap-[2cqw] border-b px-[2.8cqw] py-[2.3cqw]">
        <span className="font-mono-label text-primary text-[clamp(9px,1.85cqw,11px)] tracking-[0.12em] whitespace-nowrap uppercase">
          {title}
        </span>
        <span className={`${MICRO} whitespace-nowrap text-[#9AA6B1]`}>{tag}</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-[2.8cqw]" style={{ gap }}>
        {children}
      </div>
    </div>
  );
}

/** A figure over its caption; the intake and registry panels both end in a row of these. */
function Stat({ figure, label, size }: { figure: string; label: string; size: string }) {
  return (
    <div className="flex flex-col gap-[0.7cqw]">
      <span className="font-mono-label text-primary leading-none" style={{ fontSize: size }}>
        {figure}
      </span>
      <span className={`${MICRO} text-ink-soft`}>{label}</span>
    </div>
  );
}

/* ── 01 Capture — structured intake ──────────────────────────────────────── */

const INTAKE_FIELDS = [
  { label: "Age", value: "2 y 4 m" },
  { label: "Sex", value: "Male" },
  { label: "Consanguinity", value: "Yes" },
  { label: "Referred by", value: "Paed neuro" },
];

const INTAKE_TERMS = [
  "Global developmental delay",
  "Seizure",
  "Coarse facial features",
  "Hepatosplenomegaly",
  "Corneal opacity",
];

const INTAKE_DOCUMENTS = ["MRI brain report.pdf", "Enzyme assay.pdf", "Growth chart.jpg"];

function IntakeMockup() {
  return (
    <Frame
      title="New case · intake"
      tag="Sample case"
      label="Illustrative intake screen: a sample case recorded as structured fields — age, sex, consanguinity and referrer, five HPO phenotype terms and three attached documents."
      gap="2.2cqw"
    >
      {/* Two up rather than four once "Consanguinity" no longer fits its cell. */}
      <div className="@max-[420px]:grid-cols-2 grid grid-cols-4 gap-[2cqw]">
        {INTAKE_FIELDS.map((field) => (
          <div key={field.label} className="flex min-w-0 flex-col gap-[1cqw]">
            <span className={`${MICRO} text-ink-soft`}>{field.label}</span>
            <span className="border-rule text-ink flex h-[5.4cqw] min-h-5 items-center overflow-hidden rounded-[1.3cqw] border bg-white px-[1.7cqw] text-[clamp(9.5px,2.1cqw,12px)] whitespace-nowrap">
              {field.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[1.4cqw]">
        <span className={`${MICRO} text-ink-soft`}>Phenotype · HPO</span>
        <div className="flex flex-wrap gap-[1.1cqw]">
          {INTAKE_TERMS.map((term) => (
            <span
              key={term}
              className="font-mono-label bg-teal-tint text-ink rounded-full border border-[#D2E6E0] px-[1.7cqw] py-[0.9cqw] text-[clamp(8.5px,1.75cqw,10.5px)] leading-[1.3] whitespace-nowrap"
            >
              {term}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[1.4cqw]">
        <span className={`${MICRO} text-ink-soft`}>Documents read</span>
        <div className="flex gap-[1.4cqw]">
          {INTAKE_DOCUMENTS.map((doc) => (
            <span
              key={doc}
              className="border-rule bg-sheet-soft font-mono-label text-ink-body flex min-w-0 flex-1 items-center gap-[1.2cqw] overflow-hidden rounded-[1.2cqw] border px-[1.6cqw] py-[1.3cqw] text-[clamp(8.5px,1.7cqw,10px)]"
            >
              <span className="bg-teal block h-[1.6cqw] min-h-[5px] w-[1.6cqw] min-w-[5px] flex-none rounded-full" />
              {/* The ellipsis needs its own block box — `text-overflow` does
                  nothing on the flex container above. */}
              <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{doc}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-[2cqw] pt-[0.6cqw]">
        <span className="bg-primary rounded-full px-[2.8cqw] py-[1.5cqw] text-[clamp(9px,2cqw,11.5px)] font-bold whitespace-nowrap text-white">
          Save to record
        </span>
        <span className={`${MICRO} whitespace-nowrap text-[#9AA6B1]`}>5 terms · 3 documents</span>
      </div>
    </Frame>
  );
}

/* ── 02 Decide — RAPID ranked differentials ──────────────────────────────── */

const RAPID_ROWS = [
  {
    name: "Mucopolysaccharidosis I",
    score: "0.92",
    percent: 92,
    evidence: "5 of 5 features · IDUA",
  },
  {
    name: "Mucopolysaccharidosis II",
    score: "0.78",
    percent: 78,
    evidence: "4 of 5 features · IDS",
  },
  { name: "GM1 gangliosidosis", score: "0.64", percent: 64, evidence: "3 of 5 features · GLB1" },
  { name: "Alpha-mannosidosis", score: "0.41", percent: 41, evidence: "2 of 5 features · MAN2B1" },
];

function RapidMockup() {
  return (
    <Frame
      title="CDSS · RAPID score"
      tag="Illustrative output"
      label="Illustrative decision-support output: four candidate diagnoses ranked by score, each with the number of matching features and the gene behind it. Mucopolysaccharidosis I leads at 0.92."
      gap="1.6cqw"
    >
      {RAPID_ROWS.map((row, i) => {
        const top = i === 0;
        return (
          <div
            key={row.name}
            className={`flex min-w-0 flex-col gap-[1.2cqw] rounded-[1.5cqw] border px-[2.1cqw] py-[1.7cqw] ${
              top ? "border-[#BFE0D8] bg-[#F4FAF8]" : "border-rule-light bg-sheet-soft"
            }`}
          >
            <div className="flex items-baseline justify-between gap-[1.6cqw]">
              <span className="text-ink overflow-hidden text-[clamp(10px,2.15cqw,12.5px)] font-bold text-ellipsis whitespace-nowrap">
                {row.name}
              </span>
              <span className="font-mono-label text-primary flex-none text-[clamp(9px,2cqw,11.5px)]">
                {row.score}
              </span>
            </div>
            <span className="block h-[0.8cqw] min-h-[3px] overflow-hidden rounded-full bg-[#EDF0F2]">
              <span
                className={`block h-full rounded-full ${top ? "bg-teal-mid" : "bg-[#9FBDD6]"}`}
                style={{ width: `${row.percent}%` }}
              />
            </span>
            <span className={`${MICRO} text-ink-soft whitespace-nowrap`}>{row.evidence}</span>
          </div>
        );
      })}
    </Frame>
  );
}

/* ── 03 Connect — the longitudinal record ────────────────────────────────── */

const TIMELINE_NODES = [
  { label: "First visit", year: "2022" },
  { label: "Karyotype", year: "2022" },
  { label: "Exome sent", year: "2023" },
  { label: "Variant reported", year: "2023" },
  { label: "Therapy started", year: "2024" },
  { label: "Follow-up", year: "2026" },
];

const TIMELINE_EVENTS = [
  { date: "12 Mar 2024", text: "Enzyme replacement therapy initiated", site: "AIIMS" },
  { date: "28 Nov 2023", text: "Pathogenic variant confirmed · IDUA", site: "CDFD" },
  { date: "04 Aug 2023", text: "Clinical exome sequencing requested", site: "AIIMS" },
];

function TimelineMockup() {
  return (
    <Frame
      title="Patient record · longitudinal"
      tag="2022 — 2026"
      label="Illustrative longitudinal patient record: six milestones from a first visit in 2022 to follow-up in 2026, the three most recent entries with their date and centre, and totals of 14 visits, 3 sites and 26 documents."
      gap="1.8cqw"
    >
      <div className="relative pt-[1.2cqw]">
        <span
          aria-hidden
          className="absolute top-[2.4cqw] right-[8%] left-[8%] block h-px bg-[#DCE4EA]"
        />
        {/* `items-stretch` plus a pushed-down year keeps the six years on one
            line when a label wraps in a narrow panel. */}
        <div className="relative flex items-stretch gap-[1cqw]">
          {TIMELINE_NODES.map((node) => (
            <div
              key={node.label}
              className="flex min-w-0 flex-1 flex-col items-center gap-[1.1cqw]"
            >
              <span className="bg-primary block h-[2.4cqw] min-h-[7px] w-[2.4cqw] min-w-[7px] rounded-full shadow-[0_0_0_0.9cqw_#fff]" />
              <span className="text-ink-body text-center text-[clamp(8.5px,1.7cqw,10px)] leading-[1.3]">
                {node.label}
              </span>
              <span className="font-mono-label mt-auto text-[clamp(8px,1.55cqw,9.5px)] text-[#9AA6B1]">
                {node.year}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {TIMELINE_EVENTS.map((event) => (
          <div
            key={event.date}
            className="border-t-rule-light flex min-w-0 items-center gap-[2cqw] border-t py-[1.35cqw]"
          >
            <span className="font-mono-label w-[14cqw] min-w-[58px] flex-none text-[clamp(8.5px,1.65cqw,10px)] whitespace-nowrap text-[#9AA6B1]">
              {event.date}
            </span>
            <span className="text-ink min-w-0 flex-1 overflow-hidden text-[clamp(9.5px,2.1cqw,12px)] text-ellipsis whitespace-nowrap">
              {event.text}
            </span>
            <span className="font-mono-label text-ink-soft flex-none text-[clamp(8.5px,1.65cqw,10px)]">
              {event.site}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t-rule-light grid grid-cols-3 gap-[2cqw] border-t pt-[1.6cqw]">
        <Stat figure="14" label="Visits" size="clamp(14px,3.4cqw,20px)" />
        <Stat figure="3" label="Sites" size="clamp(14px,3.4cqw,20px)" />
        <Stat figure="26" label="Documents" size="clamp(14px,3.4cqw,20px)" />
      </div>
    </Frame>
  );
}

/* ── 04 Analyse — the registry dashboard ─────────────────────────────────── */

const REGISTRY_STATS = [
  { figure: "15", label: "Centres" },
  { figure: "61%", label: "Confirmed" },
  { figure: "24", label: "Diseases" },
  { figure: "9", label: "States" },
];

/** Twelve months of registrations; the last quarter is picked out in brand blue. */
const REGISTRY_BARS = [38, 52, 44, 61, 70, 58, 74, 83, 76, 91, 86, 97];
const REGISTRY_HIGHLIGHT_FROM = 9;

const REGISTRY_CENTRES = [
  { name: "AIIMS New Delhi", patients: "1,240", confirmed: "68%" },
  { name: "CDFD Hyderabad", patients: "880", confirmed: "57%" },
  { name: "Sir Ganga Ram Hospital", patients: "615", confirmed: "62%" },
];

/* `min-w` is what stops "Confirmed" clipping into "Patients" in a narrow panel. */
const CELL_NUM = "font-mono-label w-[12cqw] min-w-[50px] flex-none text-right";

function RegistryMockup() {
  return (
    <Frame
      title="Registry · programme view"
      tag="Illustrative data"
      label="Illustrative registry dashboard: 15 centres across 9 states, 24 diseases and 61% of cases confirmed, a twelve-month registration chart rising through the year, and a table of the three largest centres."
      gap="2cqw"
    >
      <div className="grid grid-cols-4 gap-[2cqw]">
        {REGISTRY_STATS.map((stat) => (
          <Stat
            key={stat.label}
            figure={stat.figure}
            label={stat.label}
            size="clamp(14px,3.6cqw,21px)"
          />
        ))}
      </div>

      <div className="flex flex-col gap-[1.2cqw]">
        <span className={`${MICRO} text-ink-soft`}>Patients registered · by month</span>
        <div className="flex h-[16cqw] items-end gap-[1.2cqw] border-b border-b-[#DCE4EA] pb-[0.4cqw]">
          {REGISTRY_BARS.map((height, i) => (
            <span
              key={i}
              className={`block flex-1 rounded-t-[0.6cqw] ${
                i >= REGISTRY_HIGHLIGHT_FROM ? "bg-primary" : "bg-[#9FBDD6]"
              }`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex min-w-0 items-center gap-[2cqw] pb-[0.8cqw]">
          <span className={`${MICRO} text-ink-soft flex-1`}>Centre</span>
          <span className={`${MICRO} text-ink-soft ${CELL_NUM}`}>Patients</span>
          <span className={`${MICRO} text-ink-soft ${CELL_NUM}`}>Confirmed</span>
        </div>
        {REGISTRY_CENTRES.map((centre) => (
          <div
            key={centre.name}
            className="border-t-rule-light flex min-w-0 items-center gap-[2cqw] border-t py-[1.3cqw]"
          >
            <span className="text-ink min-w-0 flex-1 overflow-hidden text-[clamp(9.5px,2.1cqw,12px)] text-ellipsis whitespace-nowrap">
              {centre.name}
            </span>
            <span className={`${CELL_NUM} text-ink-body text-[clamp(9px,1.8cqw,10.5px)]`}>
              {centre.patients}
            </span>
            <span className={`${CELL_NUM} text-primary text-[clamp(9px,1.8cqw,10.5px)]`}>
              {centre.confirmed}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const MOCKUPS: Record<HomeV3Mockup, () => React.JSX.Element> = {
  intake: IntakeMockup,
  rapid: RapidMockup,
  timeline: TimelineMockup,
  registry: RegistryMockup,
};

export function Mockup({ kind }: { kind: HomeV3Mockup }) {
  const Panel = MOCKUPS[kind];
  return <Panel />;
}
