import { SectionLead } from "@/components/platform/section-lead";
import {
  COHORT_TREND,
  DISEASE_COMPARISON,
  EVIDENCE_LINES,
  PATIENT_TIMELINE,
  RANKED_DIAGNOSES,
} from "@/content/platform-demo";
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
 * the ranking itself, the evidence behind it, and how two close candidates
 * are told apart. The panels are static content — the figures have to agree
 * with each other, and they describe one worked case throughout.
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
            <DarkPanel label={rapid.badge || "AI-Assisted Differential Diagnosis"}>
              <div className="flex flex-col gap-3.5">
                {RANKED_DIAGNOSES.map((row) => (
                  <div key={row.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium">
                        {row.name}
                        <span className="font-mono-label ml-1.5 text-[11px] text-[#8FB6D4]">
                          {row.code}
                        </span>
                      </span>
                      <span className="font-mono-label text-[13px] text-[#6FD8C2]">
                        {row.score}%
                      </span>
                    </div>
                    <div className="mt-[7px] h-1 rounded-sm bg-white/14">
                      <div
                        className="h-1 rounded-sm bg-[#6FD8C2]"
                        style={{ width: `${row.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </DarkPanel>
          </NumberedRow>
        ) : null}

        {evidence ? (
          <NumberedRow num="02" title={evidence.title} body={evidence.description} tone="dark">
            <DarkPanel label={evidence.badge || "Transparent & Explainable AI"}>
              <div className="flex flex-col">
                {EVIDENCE_LINES.map((line) => (
                  <div
                    key={line.label}
                    className="flex justify-between gap-4 border-b border-white/12 py-[13px] last:border-b-0"
                  >
                    <span className="text-sm">{line.label}</span>
                    <span className="font-mono-label text-xs text-[#6FD8C2]">{line.detail}</span>
                  </div>
                ))}
              </div>
            </DarkPanel>
          </NumberedRow>
        ) : null}

        {comparison ? (
          <NumberedRow num="03" title={comparison.title} body={comparison.description} tone="dark">
            <div className="rounded-card grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] overflow-hidden border border-white/20">
              <div className="bg-[rgba(3,25,45,0.45)] p-[18px]">
                <span className="font-mono-label text-[10.5px] tracking-[0.16em] text-[#7FCBEB] uppercase">
                  {DISEASE_COMPARISON.a.label}
                </span>
                <h4 className="mt-[9px] mb-3.5 text-sm font-bold">{DISEASE_COMPARISON.a.name}</h4>
                <div className="flex flex-col gap-[9px] text-[13px] text-[#C8DCEC]">
                  {DISEASE_COMPARISON.a.features.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
              </div>

              <div className="border-x border-white/14 bg-[rgba(6,45,78,0.75)] p-[18px]">
                <span className="font-mono-label text-[10.5px] tracking-[0.16em] text-[#6FD8C2] uppercase">
                  Shared
                </span>
                {/* Aligns with the disease names either side of it. */}
                <div className="mt-[31px] flex flex-col gap-[9px] text-[13px] text-[#9FE7D6]">
                  {DISEASE_COMPARISON.shared.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
              </div>

              <div className="bg-[rgba(3,25,45,0.45)] p-[18px]">
                <span className="font-mono-label text-[10.5px] tracking-[0.16em] text-[#7FCBEB] uppercase">
                  {DISEASE_COMPARISON.b.label}
                </span>
                <h4 className="mt-[9px] mb-3.5 text-sm font-bold">{DISEASE_COMPARISON.b.name}</h4>
                <div className="flex flex-col gap-[9px] text-[13px] text-[#C8DCEC]">
                  {DISEASE_COMPARISON.b.features.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
              </div>
            </div>
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
                Patient Timeline
              </span>
              <ol className="relative mt-[18px] list-none p-0 pl-[26px]">
                <span
                  aria-hidden
                  className="absolute top-2 bottom-2 left-[6px] block w-px bg-[#BFD4DE]"
                />
                {PATIENT_TIMELINE.map((entry) => (
                  <li key={entry.event} className="relative pb-[18px] last:pb-0">
                    <span
                      aria-hidden
                      className={`absolute top-[3px] -left-[26px] block h-[13px] w-[13px] rounded-full border-2 ${
                        entry.active ? "border-[#A9E4D7] bg-[#2FA98F]" : "border-[#7FBBD6] bg-white"
                      }`}
                    />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-ink-body block text-[13px]">{entry.date}</span>
                        <span className="mt-0.5 block text-[14.5px] font-medium">
                          {entry.event}
                        </span>
                      </div>
                      {entry.active ? (
                        <span className="font-mono-label flex-none rounded-full bg-[#DCF1EC] px-[11px] py-[5px] text-[10px] tracking-[0.14em] text-[#12706A] uppercase">
                          Active
                        </span>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
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
              <span className="font-mono-label text-[10.5px] tracking-[0.16em] text-[#7FCBEB] uppercase">
                Patient Cohort Trend
              </span>
              <div className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5">
                {COHORT_TREND.stats.map((stat) => (
                  <div key={stat.label} className="rounded-[9px] border border-white/18 p-3.5">
                    <span className="font-headline block text-[26px]">{stat.value}</span>
                    <span className="mt-[3px] block text-[13px] text-[#C6D6E4]">{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(46px,1fr))] gap-1.5">
                {COHORT_TREND.months.map((month) => (
                  <span
                    key={month}
                    className={`rounded-[7px] py-[9px] text-center text-[13px] ${
                      month === COHORT_TREND.selected
                        ? "bg-[#1573C4] font-bold text-white"
                        : "bg-white/7 text-[#C6D6E4]"
                    }`}
                  >
                    {month}
                  </span>
                ))}
              </div>
            </div>
          </NumberedRow>
        ) : null}
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
