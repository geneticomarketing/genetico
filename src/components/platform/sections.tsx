import { SectionLead } from "@/components/platform/section-lead";
import {
  DISEASE_COMPARISON,
  EVIDENCE_LINES,
  PATIENT_TIMELINE,
  RANKED_DIAGNOSES,
} from "@/content/platform-demo";
import type { PlatformContent } from "@/lib/cms/platform-page-data";

const BULLET = (
  <span aria-hidden className="mt-2 block h-[5px] w-[5px] flex-none rounded-full bg-[#2FA98F]" />
);

/** Marks a panel as a worked example rather than real patient output. */
function IllustrativeTag({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      className={`font-mono-label rounded-full border px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase ${
        tone === "dark" ? "border-white/22 text-[#9FBDD6]" : "border-rule text-ink-soft"
      }`}
    >
      Illustrative
    </span>
  );
}

/**
 * Section 02 — clinical decision support, on the page's one dark band.
 *
 * Each capability from the CMS is paired with a worked panel: the ranking
 * itself, what it was reasoned from, and how two candidates are told apart.
 * The panels are static content — the figures have to agree with each other,
 * and they are labelled as illustrative on the page.
 */
export function ClinicalIntelligence({
  content,
  num,
}: {
  content: PlatformContent["cdss"];
  num: string;
}) {
  const [ranking, evidence, comparison] = content.items;

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

        <div className="mid:grid-cols-3 mt-14 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {ranking ? (
            <Panel capability={ranking}>
              <div className="flex flex-col gap-3">
                {RANKED_DIAGNOSES.map((row, i) => (
                  <div key={row.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[13.5px] text-white">
                        {row.name}{" "}
                        <span className="font-mono-label text-[11px] text-[#8FB2CE]">
                          {row.code}
                        </span>
                      </span>
                      <span
                        className={`font-mono-label text-[12px] ${
                          i === 0 ? "text-[#6FD8C2]" : "text-[#8FB2CE]"
                        }`}
                      >
                        {row.score}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-sm bg-white/12">
                      <div
                        className={`h-full rounded-sm ${i === 0 ? "bg-[#6FD8C2]" : "bg-[#4E7FA8]"}`}
                        style={{ width: `${row.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          ) : null}

          {evidence ? (
            <Panel capability={evidence}>
              <div className="flex flex-col">
                {EVIDENCE_LINES.map((line) => (
                  <div
                    key={line.label}
                    className="flex items-baseline justify-between gap-3 border-b border-white/12 py-2.5 last:border-b-0"
                  >
                    <span className="text-[13.5px] text-[#C6D6E4]">{line.label}</span>
                    <span className="font-mono-label text-[11px] text-[#6FD8C2]">
                      {line.detail}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
          ) : null}

          {comparison ? (
            <Panel capability={comparison}>
              <div className="flex flex-col gap-3">
                {[DISEASE_COMPARISON.a, DISEASE_COMPARISON.b].map((side) => (
                  <div key={side.label}>
                    <span className="font-mono-label text-[10px] tracking-[0.16em] text-[#8FB2CE] uppercase">
                      {side.label}
                    </span>
                    <p className="m-0 mt-1 text-[13.5px] font-medium text-white">{side.name}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {side.only.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full bg-white/10 px-2.5 py-1 text-[11.5px] text-[#C6D6E4]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="border-t border-white/12 pt-3">
                  <span className="font-mono-label text-[10px] tracking-[0.16em] text-[#6FD8C2] uppercase">
                    Shared
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {DISEASE_COMPARISON.shared.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-[#6FD8C2]/40 px-2.5 py-1 text-[11.5px] text-[#C6D6E4]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Panel({
  capability,
  children,
}: {
  capability: { title: string; badge: string; description: string };
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/18 bg-[rgba(4,22,40,0.42)] p-6 backdrop-blur-[10px]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {capability.badge ? (
          <span className="font-mono-label text-[10.5px] tracking-[0.16em] text-[#7FCBEB] uppercase">
            {capability.badge}
          </span>
        ) : null}
        <IllustrativeTag tone="dark" />
      </div>
      <h3 className="font-headline m-0 text-[22px] leading-[1.2] tracking-[-0.015em] text-white">
        {capability.title}
      </h3>
      {capability.description ? (
        <p className="m-0 text-[13.5px] leading-[1.65] text-[#C6D6E4]">{capability.description}</p>
      ) : null}
      <div className="mt-1">{children}</div>
    </div>
  );
}

/** Section 03 — the record as it grows, with a worked patient timeline. */
export function Longitudinal({
  content,
  num,
}: {
  content: PlatformContent["longitudinal"];
  num: string;
}) {
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

        <div className="border-rule mid:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] mt-14 grid grid-cols-[minmax(0,1fr)] items-start gap-x-14 gap-y-10 border-t pt-9">
          <div className="flex flex-col gap-10">
            {content.items.map((column, i) => (
              <div key={column.title} className="flex gap-5">
                <span className="font-mono-label text-primary pt-1.5 text-[13px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3.5">
                  <h3 className="font-headline m-0 text-[clamp(24px,2.8vw,32px)] leading-[1.16] tracking-[-0.018em]">
                    {column.title}
                  </h3>
                  <p className="text-ink-body m-0 text-[14.5px] leading-[1.72]">
                    {column.description}
                  </p>
                  <div className="mt-1 flex flex-col gap-[13px]">
                    {column.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3">
                        {BULLET}
                        <p className="text-ink-body m-0 text-[14.5px] leading-[1.55]">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-rule rounded-card border bg-[#EDF2F5] p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono-label text-ink-body text-[10.5px] tracking-[0.16em] uppercase">
                Patient timeline
              </span>
              <IllustrativeTag />
            </div>
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
                      <span className="mt-0.5 block text-[14.5px] font-medium">{entry.event}</span>
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

        <div className="mid:grid-cols-2 mt-14 grid grid-cols-[minmax(0,1fr)] gap-x-14 gap-y-12">
          <div className="flex flex-col gap-4">
            <h3 className="font-headline m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.2] tracking-[-0.015em]">
              {content.integrations.title}
            </h3>
            {content.integrations.description ? (
              <p className="text-ink-body m-0 text-[14.5px] leading-[1.72]">
                {content.integrations.description}
              </p>
            ) : null}
            <div className="mt-1.5 flex flex-wrap gap-2">
              {content.integrations.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-rule text-ink-body rounded-full border bg-white px-3.5 py-2 text-[12.5px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-headline m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.2] tracking-[-0.015em]">
              {content.deployment.title}
            </h3>
            {content.deployment.description ? (
              <p className="text-ink-body m-0 text-[14.5px] leading-[1.72]">
                {content.deployment.description}
              </p>
            ) : null}
            <div className="mt-1.5 flex flex-col gap-2.5">
              {content.deployment.options.map((option) => (
                <div
                  key={option.title}
                  className="border-rule rounded-card border bg-white px-[18px] py-3.5"
                >
                  <span className="text-ink block text-[14.5px] font-medium">{option.title}</span>
                  {option.description ? (
                    <p className="text-ink-body m-0 mt-1 text-[13px] leading-[1.6]">
                      {option.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Section 05 — the security strip, in the page's own idiom. */
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

        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {content.items.map((card) => (
            <div key={card.title} className="border-rule rounded-card border bg-white p-6">
              <h3 className="font-headline m-0 text-[20px] leading-[1.24] tracking-[-0.012em]">
                {card.title}
              </h3>
              {card.description ? (
                <p className="text-ink-body m-0 mt-2.5 text-[14px] leading-[1.65]">
                  {card.description}
                </p>
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
        <div className="flex w-max items-center motion-safe:animate-[marquee_38s_linear_infinite]">
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
