import { ComingSoonTag } from "@/components/coming-soon";
import { SectionLead } from "@/components/platform/section-lead";
import { COHORT_MONTHS, ORDER_TO_REPORT } from "@/content/platform-demo";
import {
  CASE,
  DISEASE_COMPARE,
  FOLLOW_UPS,
  LAB_EXTRACT,
  LIMS_ORDER,
  PHENOTYPE_ANALYTICS,
  RAPID_RANKED,
  RAPID_TOTAL,
} from "@/content/sample-case";
import type { PlatformContent } from "@/lib/cms/platform-page-data";

/**
 * The page's repeating unit: a numbered point on the left, and the panel that
 * shows it on the right.
 *
 * Every section from Clinical Intelligence down is built from this, which is
 * what gives the page its rhythm — the reader learns the shape once and then
 * only has to read the content.
 */
function NumberedRow({
  num,
  title,
  body,
  bullets = [],
  tone = "light",
  first = false,
  children,
}: {
  num: string;
  title: string;
  body: string;
  bullets?: string[];
  tone?: "light" | "dark";
  /** The first row in a section sits closer to the heading above it. */
  first?: boolean;
  children: React.ReactNode;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`nav:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] grid grid-cols-[minmax(0,1fr)] items-start gap-x-14 gap-y-10 border-t pt-9 ${
        first ? "mt-16" : "mt-14"
      } ${dark ? "border-white/18" : "border-rule"}`}
    >
      <div className="flex gap-5">
        <span
          className={`font-mono-label pt-1.5 text-[13px] ${dark ? "text-[#8FD8FF]" : "text-primary"}`}
        >
          {num}
        </span>
        <div className="flex flex-col gap-3.5">
          <h3
            className={`font-headline m-0 text-[clamp(24px,2.8vw,32px)] leading-[1.16] tracking-[-0.018em] ${
              dark ? "text-white" : ""
            }`}
          >
            {title}
          </h3>
          {body ? (
            <p
              className={`m-0 text-[14.5px] leading-[1.72] ${dark ? "text-[#B7CCDD]" : "text-ink-body"}`}
            >
              {body}
            </p>
          ) : null}
          {bullets.length ? (
            <div className="mt-1 flex flex-col gap-[13px]">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 block h-[5px] w-[5px] flex-none rounded-full bg-[#2FA98F]"
                  />
                  <p
                    className={`m-0 text-[14.5px] leading-[1.55] ${
                      dark ? "text-[#B7CCDD]" : "text-ink-body"
                    }`}
                  >
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
}

/** A panel on the dark band. */
function DarkPanel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-white/20 bg-[rgba(3,25,45,0.45)] p-[22px] backdrop-blur-[6px]">
      <span className="font-mono-label text-[10.5px] tracking-[0.16em] text-[#7FCBEB] uppercase">
        {label}
      </span>
      <div className="mt-[18px]">{children}</div>
    </div>
  );
}

/** A panel on a light section. */
function LightPanel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-rule rounded-card border bg-[#F5F7F9] p-6">
      <span className="font-mono-label inline-flex items-center gap-[9px] rounded-full bg-[#E4F3EF] px-3.5 py-[7px] text-[10.5px] tracking-[0.16em] text-[#12706A] uppercase">
        <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-[#2FA98F]" />
        {label}
      </span>
      <div className="mt-5">{children}</div>
    </div>
  );
}

/**
 * Section 02 — clinical decision support, on the page's one dark band.
 *
 * Three capabilities, each paired with the panel that shows what it produces:
 * the RAPID ranking, the analytics that explain it, and Disease Compare. The
 * panels are static content drawn from the shared sample case — the figures
 * are what the platform returned for it, and have to agree with each other.
 */
export function ClinicalIntelligence({
  content,
  num,
}: {
  content: PlatformContent["cdss"];
  num: string;
}) {
  const [rapid, evidence, comparison] = content.items;

  return (
    <section
      id="cdss"
      data-reveal
      className="px-edge scroll-mt-32 bg-[radial-gradient(120%_100%_at_15%_0%,#04253F_0%,#0A4577_55%,#0C5493_100%)] pt-[clamp(67px,7vw,96px)] pb-[clamp(73px,7.6vw,104px)] text-white"
    >
      <div className="max-w-site mx-auto">
        <SectionLead
          num={num}
          eyebrow={content.eyebrow}
          heading={content.heading}
          description={content.description}
          tone="dark"
        />

        {rapid ? (
          <NumberedRow num="01" title={rapid.title} body={rapid.description} tone="dark" first>
            <DarkPanel label={rapid.badge || "Suggest differentials · RAPID Score"}>
              <div className="flex flex-col">
                {RAPID_RANKED.slice(0, 6).map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-[22px_minmax(0,1fr)_auto] items-baseline gap-3 border-b border-white/12 py-2.5 last:border-b-0"
                  >
                    <span className="font-mono-label text-[11px] text-[#8FB6D4]">{row.rank}</span>
                    <span className="min-w-0 text-sm">
                      <span className="block truncate font-medium">{row.name}</span>
                      <span className="font-mono-label text-[11px] text-[#8FB6D4]">{row.id}</span>
                    </span>
                    <span className="font-mono-label text-[13px] text-[#6FD8C2]">
                      {row.score.toFixed(3)}
                    </span>
                  </div>
                ))}
              </div>
              <span className="mt-3 block text-[12px] text-[#8FB2CE]">
                Top 6 of {RAPID_TOTAL} ranked · OMIM and Orphanet
              </span>
            </DarkPanel>
          </NumberedRow>
        ) : null}

        {evidence ? (
          <NumberedRow num="02" title={evidence.title} body={evidence.description} tone="dark">
            <DarkPanel label={evidence.badge || "Phenotype analytics"}>
              <span className="text-sm font-bold">{PHENOTYPE_ANALYTICS.disease}</span>
              <div className="mt-3 flex flex-col gap-2.5">
                {PHENOTYPE_ANALYTICS.observed.map((p) => (
                  <div
                    key={p.term}
                    className="grid grid-cols-[minmax(0,1fr)_minmax(60px,120px)_36px] items-center gap-3"
                  >
                    <span className="truncate text-[13px]">{p.term}</span>
                    <span className="block h-1 rounded-sm bg-white/14">
                      <span
                        className="block h-1 rounded-sm bg-[#6FD8C2]"
                        style={{
                          width: `${(p.score / PHENOTYPE_ANALYTICS.observed[0].score) * 100}%`,
                        }}
                      />
                    </span>
                    <span className="font-mono-label text-right text-[11px] text-[#8FD8FF]">
                      {p.score.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <span className="font-mono-label mt-5 block text-[10.5px] tracking-[0.16em] text-[#7FCBEB] uppercase">
                Not yet observed · check next
              </span>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {PHENOTYPE_ANALYTICS.unobserved.map((p) => (
                  <span
                    key={p.term}
                    className="rounded-md border border-white/16 px-2.5 py-1 text-[12.5px] text-[#C8DCEC]"
                  >
                    {p.term}{" "}
                    <span className="font-mono-label text-[10.5px] text-[#8FB6D4]">
                      {p.score.toFixed(2)}
                    </span>
                  </span>
                ))}
              </div>
            </DarkPanel>
          </NumberedRow>
        ) : null}

        {comparison ? (
          <NumberedRow num="03" title={comparison.title} body={comparison.description} tone="dark">
            <DarkPanel label={comparison.badge || "Disease compare"}>
              <DiseaseCompareGrid />
            </DarkPanel>
          </NumberedRow>
        ) : null}
      </div>
    </section>
  );
}

/** Section 03 — the record as it grows, and what can be read off it. */
export function Longitudinal({
  content,
  num,
}: {
  content: PlatformContent["longitudinal"];
  num: string;
}) {
  const [journey, analytics] = content.items;

  return (
    <section
      id="longitudinal"
      data-reveal
      className="px-edge scroll-mt-32 bg-[#F5F7F9] pt-[clamp(67px,7vw,96px)] pb-[clamp(73px,7.6vw,104px)]"
    >
      <div className="max-w-site mx-auto">
        <SectionLead
          num={num}
          eyebrow={content.eyebrow}
          heading={content.heading}
          description={content.description}
        />

        {journey ? (
          <NumberedRow
            num="01"
            title={journey.title}
            body={journey.description}
            bullets={journey.bullets}
            first
          >
            <div className="border-rule rounded-card border bg-[#EDF2F5] p-6">
              <span className="font-mono-label text-ink-body text-[10.5px] tracking-[0.16em] uppercase">
                {CASE.id} · Follow-up visits
              </span>
              <ol className="relative mt-[18px] list-none p-0 pl-[26px]">
                <span
                  aria-hidden
                  className="absolute top-2 bottom-2 left-[6px] block w-px bg-[#BFD4DE]"
                />
                {FOLLOW_UPS.map((visit, i) => (
                  <li key={visit.date} className="relative pb-[18px] last:pb-0">
                    <span
                      aria-hidden
                      className={`absolute top-[3px] -left-[26px] block h-[13px] w-[13px] rounded-full border-2 ${
                        i === 0 ? "border-[#A9E4D7] bg-[#2FA98F]" : "border-[#7FBBD6] bg-white"
                      }`}
                    />
                    <span className="text-ink-body block text-[13px]">{visit.date}</span>
                    <span className="mt-0.5 block text-[14.5px] font-medium">{visit.note}</span>
                  </li>
                ))}
              </ol>
              <div className="border-rule mt-5 rounded-[9px] border bg-white p-4">
                <div className="flex flex-wrap justify-between gap-2">
                  <span className="text-[13.5px] font-bold">{LAB_EXTRACT.test}</span>
                  <span className="font-mono-label text-ink-soft text-[11px]">
                    {LAB_EXTRACT.date}
                  </span>
                </div>
                {LAB_EXTRACT.rows.slice(1, 4).map((r) => (
                  <div
                    key={r.field}
                    className="mt-2 flex justify-between gap-3 border-t border-[#EDF0F2] pt-2 text-[13px]"
                  >
                    <span className="text-ink-soft">{r.field}</span>
                    <span className={r.high ? "font-medium text-[#B4432F]" : "font-medium"}>
                      {r.value} {r.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </NumberedRow>
        ) : null}

        {analytics ? (
          <NumberedRow
            num="02"
            title={analytics.title}
            body={analytics.description}
            bullets={analytics.bullets}
          >
            <div className="rounded-card bg-[radial-gradient(120%_120%_at_10%_0%,#04253F,#0A4577_70%,#0C5493)] p-6 text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono-label text-[10.5px] tracking-[0.16em] text-[#7FCBEB] uppercase">
                  Cohort view · patients by month
                </span>
                <ComingSoonTag tone="dark" />
              </div>
              <div className="mt-6 flex h-[160px] items-end gap-2.5 border-b border-white/18 pb-1">
                {COHORT_MONTHS.map((bar, i) => (
                  <div
                    key={bar.month}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div
                      className={`w-full max-w-12 rounded-[5px_5px_2px_2px] ${
                        i === COHORT_MONTHS.length - 1 ? "bg-[#6FD8C2]" : "bg-white/22"
                      }`}
                      style={{ height: `${bar.value}%` }}
                    />
                    <span className="text-[12px] text-[#C6D6E4]">{bar.month}</span>
                  </div>
                ))}
              </div>
              <p className="m-0 mt-4 text-[13px] leading-[1.6] text-[#C6D6E4]">
                Registry and cohort views are built on the same structured records and are launching
                soon.
              </p>
            </div>
          </NumberedRow>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Disease Compare: the three candidates side by side, by body system. Each
 * phenotype carries its weight; the ones present in this patient are ticked,
 * which is how the clinician marks them in the platform. Scrolls sideways
 * inside its panel on a phone rather than squeezing three columns.
 */
function DiseaseCompareGrid() {
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[520px] border-collapse text-left text-[12.5px]">
        <thead>
          <tr>
            <th className="w-[72px] pb-3" />
            {DISEASE_COMPARE.diseases.map((d) => (
              <th key={d.id} className="pb-3 align-bottom font-normal">
                <span className="block text-[12px] leading-[1.35] font-bold">{d.name}</span>
                <span className="font-mono-label text-[10.5px] text-[#8FB6D4]">{d.id}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DISEASE_COMPARE.systems.map((row) => (
            <tr key={row.system} className="border-t border-white/12 align-top">
              <th className="font-mono-label py-2.5 pr-2 text-[10px] font-normal tracking-[0.12em] text-[#7FCBEB] uppercase">
                {row.system}
              </th>
              {row.cells.map((cell, i) => (
                <td key={i} className="py-2.5 pr-3">
                  {cell.map((t) => (
                    <span key={t.term} className="flex items-baseline gap-1.5 py-0.5">
                      <span
                        aria-hidden
                        className={`inline-flex h-3 w-3 flex-none items-center justify-center rounded-[3px] text-[9px] ${
                          "observed" in t && t.observed
                            ? "bg-[#6FD8C2] text-[#04253F]"
                            : "border border-white/30"
                        }`}
                      >
                        {"observed" in t && t.observed ? "✓" : ""}
                      </span>
                      <span className="text-[#E4EDF5]">{t.term}</span>
                      <span className="font-mono-label text-[10.5px] text-[#8FB6D4]">
                        {t.weight.toFixed(3)}
                      </span>
                    </span>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Where the sample order is in its LIMS status chain: the step being worked on now. */
const ORDER_AT = 4;

/**
 * Order to report — a test ordered from the case, sent to the laboratory's
 * LIMS and tracked there until the report is released. The copy is
 * code-held (ORDER_TO_REPORT) until the CMS has a section for it.
 */
export function OrderToReport({ num }: { num: string }) {
  const copy = ORDER_TO_REPORT;
  return (
    <section
      id="orders"
      data-reveal
      className="px-edge scroll-mt-32 pt-[clamp(67px,7vw,96px)] pb-[clamp(73px,7.6vw,104px)]"
    >
      <div className="max-w-site mx-auto">
        <SectionLead
          num={num}
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          description={copy.description}
        />

        <div className="border-rule nav:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] mt-16 grid grid-cols-[minmax(0,1fr)] items-start gap-x-14 gap-y-10 border-t pt-9">
          <ol className="m-0 flex list-none flex-col gap-7 p-0">
            {copy.steps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="font-mono-label text-primary pt-1.5 text-[13px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-headline m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.16] tracking-[-0.018em]">
                    {step.title}
                  </h3>
                  <p className="text-ink-body m-0 text-[14.5px] leading-[1.72]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <LightPanel label="Test order · laboratory LIMS">
            <div className="border-rule rounded-[9px] border bg-white p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-headline text-[22px]">{LIMS_ORDER.orderId}</span>
                <span className="font-mono-label text-ink-soft text-[11px]">{CASE.id}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[
                  LIMS_ORDER.department,
                  LIMS_ORDER.test,
                  LIMS_ORDER.sample,
                  LIMS_ORDER.category,
                  LIMS_ORDER.priority,
                ].map((v) => (
                  <span
                    key={v}
                    className="bg-primary-tint text-primary-deep rounded-md px-2.5 py-1 text-[12.5px]"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
            <ol className="relative m-0 mt-5 list-none p-0 pl-[26px]">
              <span
                aria-hidden
                className="absolute top-2 bottom-2 left-[6px] block w-px bg-[#BFD4DE]"
              />
              {LIMS_ORDER.statuses.map((label, i) => (
                <li key={label} className="relative pb-3.5 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute top-[3px] -left-[26px] block h-[13px] w-[13px] rounded-full border-2 ${
                      i < ORDER_AT
                        ? "border-[#A9E4D7] bg-[#2FA98F]"
                        : i === ORDER_AT
                          ? "border-primary bg-white"
                          : "border-[#C9D5DF] bg-white"
                    }`}
                  />
                  <span
                    className={`text-[14px] ${
                      i === ORDER_AT
                        ? "text-primary font-bold"
                        : i > ORDER_AT
                          ? "text-ink-dim"
                          : "text-ink"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ol>
            <p className="text-ink-soft m-0 mt-5 text-[13px] leading-[1.6]">
              A sample the lab cannot use is marked <strong>{LIMS_ORDER.rejected}</strong>, with the
              reason, against the same order.
            </p>
          </LightPanel>
        </div>
      </div>
    </section>
  );
}

/** Section 04 — what it connects to, and where it can run. */
export function Infrastructure({
  content,
  num,
}: {
  content: PlatformContent["infrastructure"];
  num: string;
}) {
  return (
    <section
      id="infrastructure"
      data-reveal
      className="px-edge scroll-mt-32 pt-[clamp(67px,7vw,96px)] pb-[clamp(73px,7.6vw,104px)]"
    >
      <div className="max-w-site mx-auto">
        <SectionLead
          num={num}
          eyebrow={content.eyebrow}
          heading={content.heading}
          description={content.description}
        />

        <NumberedRow
          num="01"
          title={content.integrations.title}
          body={content.integrations.description}
          bullets={content.integrations.bullets}
          first
        >
          <LightPanel label="Integrations">
            <div className="flex flex-wrap gap-2">
              {content.integrations.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-rule rounded-lg border bg-white px-[15px] py-2.5 text-[13px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </LightPanel>
        </NumberedRow>

        <NumberedRow
          num="02"
          title={content.deployment.title}
          body={content.deployment.description}
          bullets={content.deployment.bullets}
        >
          <LightPanel label="Deployment">
            <div className="flex flex-col gap-2.5">
              {content.deployment.options.map((option) => (
                <div
                  key={option.title}
                  className="border-rule rounded-[9px] border bg-white px-[17px] py-[15px]"
                >
                  <div className="flex items-center gap-[9px]">
                    <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-[#2FA98F]" />
                    <span className="text-[14.5px] font-medium">{option.title}</span>
                  </div>
                  {option.description ? (
                    <p className="text-ink-body m-0 mt-[7px] text-[13px] leading-[1.55]">
                      {option.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </LightPanel>
        </NumberedRow>
      </div>
    </section>
  );
}

/** Section 05 — three cards, the plainest section on the page. */
export function PlatformSecurity({
  content,
  num,
}: {
  content: PlatformContent["security"];
  num: string;
}) {
  return (
    <section
      id="security"
      data-reveal
      className="border-rule px-edge scroll-mt-32 border-t bg-[#F5F7F9] pt-[clamp(67px,7vw,96px)] pb-[clamp(73px,7.6vw,104px)]"
    >
      <div className="max-w-site mx-auto">
        <SectionLead
          num={num}
          eyebrow={content.eyebrow}
          heading={content.heading}
          description={content.description}
        />

        <div className="border-rule mt-14 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 border-t pt-9">
          {content.items.map((card) => (
            <div key={card.title} className="border-rule rounded-[10px] border bg-white p-6">
              <h3 className="font-headline m-0 mb-2.5 text-[22px] leading-[1.2] tracking-[-0.012em]">
                {card.title}
              </h3>
              {card.description ? (
                <p className="text-ink-body m-0 text-[14.5px] leading-[1.65]">{card.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The strip of institutions under the hero. */
export function DeployedWith({ logos }: { logos: { name: string; logo: string }[] }) {
  if (!logos.length) return null;

  return (
    <div className="border-rule border-b bg-[#F5F7F9] pt-7 pb-8">
      <div className="max-w-site px-edge mx-auto flex items-center gap-4">
        <span className="font-mono-label text-ink-soft flex-none text-[10.5px] tracking-[0.2em] uppercase">
          Deployed with leading institutions
        </span>
        <span aria-hidden className="bg-rule block h-px flex-1" />
      </div>
      <div className="mt-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="flex w-max items-center motion-safe:animate-[marquee_46s_linear_infinite]">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center">
              {logos.map((logo) => (
                <div
                  key={logo.name}
                  role="img"
                  aria-label={logo.name}
                  className="h-[76px] w-[176px] flex-none bg-contain bg-origin-content bg-center bg-no-repeat px-[22px] py-3"
                  style={{ backgroundImage: `url('${logo.logo}')` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
