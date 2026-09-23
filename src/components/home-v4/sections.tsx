import Image from "next/image";
import Link from "next/link";

import { Eyebrow, SectionLabel } from "@/components/chrome/eyebrow";
import {
  HOME_V4_CHAIN,
  HOME_V4_PLATFORM,
  HOME_V4_PROBLEM,
  HOME_V4_RELATIONSHIP,
  HOME_V4_TRUST,
  HOME_V4_WHO,
  HOME_V4_WHY,
} from "@/content/home-v4";
import type { HomeSectionMeta } from "@/lib/cms/home-content";

type SectionProps = { section: HomeSectionMeta; num: string };

const pad = (i: number) => String(i + 1).padStart(2, "0");

/** Every section of this page shares one rhythm; only the background varies. */
const SECTION = "px-edge pt-sect-top pb-sect-bot scroll-mt-32";

/** The centred eyebrow, heading and nothing else — sections 01, 03 and 05. */
function CentredHeading({
  num,
  eyebrow,
  heading,
  width = "max-w-[760px]",
}: {
  num: string;
  eyebrow: string;
  heading: string;
  width?: string;
}) {
  return (
    <>
      <Eyebrow>
        {num} · {eyebrow}
      </Eyebrow>
      <h2
        className={`font-headline text-ink mx-auto mt-6 ${width} text-center text-[clamp(32px,4vw,50px)] leading-[1.1] tracking-[-0.018em] text-balance`}
      >
        {heading}
      </h2>
    </>
  );
}

/** Left-aligned heading with its supporting sentence to the right. */
function SplitHeading({
  num,
  eyebrow,
  heading,
  description,
  descriptionWidth,
  tone = "light",
}: {
  num: string;
  eyebrow: string;
  heading: string;
  description?: string;
  descriptionWidth?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="flex min-w-0 flex-col gap-3.5">
        <SectionLabel num={num} tone={tone}>
          {eyebrow}
        </SectionLabel>
        <h2
          className={`font-headline m-0 max-w-[640px] text-[clamp(32px,4vw,50px)] leading-[1.1] tracking-[-0.018em] text-pretty ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {heading}
        </h2>
      </div>
      {description ? (
        <p
          className={`m-0 text-[14.5px] leading-[1.7] ${dark ? "text-sky-soft" : "text-ink-body"}`}
          style={{ maxWidth: descriptionWidth }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/**
 * A row of steps hung under one hairline — sections 03 and 04.
 *
 * The rule runs across the top of the whole row rather than each cell, so the
 * steps read as one sequence; each cell then closes with its own lighter rule,
 * which is what keeps them legible once they stack into a column.
 */
function StepRow({
  steps,
  columns,
  numberTone = "teal",
  titleSize = "text-[22px]",
}: {
  steps: { title: string; body: string }[];
  /** The column track, which differs between a five-step and a four-step row. */
  columns: string;
  numberTone?: "teal" | "grey";
  titleSize?: string;
}) {
  return (
    <div className={`border-ink mt-[clamp(40px,5vw,56px)] grid gap-x-6 border-t ${columns}`}>
      {steps.map((step, i) => (
        <div key={step.title} className="border-rule flex flex-col gap-2.5 border-b pt-[22px] pb-6">
          <span
            className={`font-mono-label text-[10.5px] tracking-[0.16em] uppercase ${
              numberTone === "teal" ? "text-teal-mid" : "text-ink-soft"
            }`}
          >
            {pad(i)}
          </span>
          <h3
            className={`font-headline text-ink m-0 ${titleSize} leading-[1.2] tracking-[-0.012em]`}
          >
            {step.title}
          </h3>
          <p className="text-ink-body m-0 text-[14.5px] leading-[1.7]">{step.body}</p>
        </div>
      ))}
    </div>
  );
}

/** 01 — the three ways the record breaks today. */
export function Problem({ section, num }: SectionProps) {
  return (
    <section id={section.id} data-reveal className={`${SECTION} bg-sheet-mute`}>
      <div className="max-w-site mx-auto">
        <CentredHeading num={num} eyebrow={section.eyebrow} heading={HOME_V4_PROBLEM.heading} />
        <div className="mt-[clamp(40px,5vw,56px)] grid gap-[clamp(32px,4vw,56px)] min-[760px]:grid-cols-3">
          {HOME_V4_PROBLEM.items.map((item, i) => (
            <div key={item.title} className="flex min-w-0 flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono-label text-primary text-[11px] tracking-[0.16em]">
                  {pad(i)}
                </span>
                <span aria-hidden className="bg-primary block h-0.5 flex-1" />
              </div>
              <h3 className="font-headline text-ink m-0 text-[clamp(24px,2.4vw,28px)] leading-[1.16] tracking-[-0.015em] text-pretty">
                {item.title}
              </h3>
              <p className="text-ink-body m-0 text-[15px] leading-[1.75] text-pretty">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 02 — the scale of the problem, as four figures on the dark band. */
export function Why({ section, num }: SectionProps) {
  return (
    <section id={section.id} data-reveal className={`${SECTION} bg-dark-band text-white`}>
      <div className="max-w-site mx-auto">
        <SplitHeading
          num={num}
          eyebrow={section.eyebrow}
          heading={HOME_V4_WHY.heading}
          description={HOME_V4_WHY.description}
          descriptionWidth="380px"
          tone="dark"
        />
        <div className="mt-[clamp(40px,5vw,56px)] grid gap-x-6 border-t border-white/20 min-[560px]:grid-cols-2 mid:grid-cols-4">
          {HOME_V4_WHY.facts.map((fact) => (
            <div key={fact.figure} className="flex flex-col gap-2 pt-[26px] pb-2">
              <span className="font-headline text-[clamp(40px,4.4vw,56px)] leading-none tracking-[-0.02em] text-white">
                {fact.figure}
              </span>
              <span className="text-sky-soft text-[14.5px] leading-[1.55]">{fact.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 03 — the chain from clinic to policy, closing on the company/platform panel.
 *
 * The panel is a one-pixel grid gap over a rule-coloured background rather
 * than a border on either half, so the divider lands correctly whether the two
 * sit side by side or stack.
 */
export function Building({ section, num }: SectionProps) {
  return (
    <section id={section.id} data-reveal className={`${SECTION} bg-white`}>
      <div className="max-w-site mx-auto">
        <CentredHeading
          num={num}
          eyebrow={section.eyebrow}
          heading={HOME_V4_CHAIN.heading}
          width="max-w-[780px]"
        />
        <StepRow steps={HOME_V4_CHAIN.steps} columns="min-[900px]:grid-cols-5" />

        <div className="border-rule bg-rule rounded-card mt-[clamp(40px,5vw,56px)] grid gap-px overflow-hidden border [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
          {HOME_V4_RELATIONSHIP.map((side, i) => (
            <div
              key={side.label}
              className={`flex flex-col gap-3.5 p-[clamp(24px,3vw,34px)] ${
                i === 0 ? "bg-sheet-cool" : "bg-white"
              }`}
            >
              <div className="flex h-9 items-center">
                <Image
                  src={side.mark}
                  alt={side.markAlt}
                  width={1388}
                  height={402}
                  className={`block w-auto ${i === 0 ? "h-[30px]" : "h-8"}`}
                />
              </div>
              <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.16em] uppercase">
                {side.label}
              </span>
              <p className="text-ink m-0 text-[15.5px] leading-[1.7]">{side.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 04 — what the platform does. The detail stays on the platform page. */
export function Platform({ section, num }: SectionProps) {
  return (
    <section id={section.id} data-reveal className={`${SECTION} bg-sheet-mute`}>
      <div className="max-w-site mx-auto">
        <SplitHeading
          num={num}
          eyebrow={section.eyebrow}
          heading={HOME_V4_PLATFORM.heading}
          description={HOME_V4_PLATFORM.description}
          descriptionWidth="360px"
        />
        <StepRow
          steps={HOME_V4_PLATFORM.steps}
          columns="min-[560px]:grid-cols-2 mid:grid-cols-4"
          numberTone="grey"
          titleSize="text-[clamp(24px,2.4vw,28px)]"
        />
        <Link
          href={HOME_V4_PLATFORM.ctaHref}
          className="text-ink hover:text-primary shadow-[inset_0_-2px_0_var(--color-teal-mid)] hover:shadow-[inset_0_-2px_0_var(--color-primary)] mt-8 inline-flex pb-[5px] text-[15px] font-bold transition-[color,box-shadow]"
        >
          {HOME_V4_PLATFORM.ctaLabel}
        </Link>
      </div>
    </section>
  );
}

/** 05 — one card per audience, each a door to that audience's page. */
export function Who({ section, num }: SectionProps) {
  return (
    <section id={section.id} data-reveal className={`${SECTION} bg-white`}>
      <div className="max-w-site mx-auto">
        <CentredHeading num={num} eyebrow={section.eyebrow} heading={HOME_V4_WHO.heading} />
        <div className="mt-[clamp(40px,5vw,56px)] grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          {HOME_V4_WHO.doors.map((door) => (
            <Link
              key={door.kicker}
              href={door.href}
              className="border-rule rounded-card shadow-card hover:shadow-card-lift bg-sheet-soft text-ink flex min-w-0 flex-col gap-3.5 border p-[clamp(24px,3vw,32px)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1"
            >
              <span
                className={`font-mono-label self-start rounded-md px-2.5 py-[5px] text-[10.5px] tracking-[0.14em] uppercase ${
                  door.tone === "blue"
                    ? "text-primary bg-primary-tint"
                    : "text-teal-deep bg-teal-tint"
                }`}
              >
                {door.kicker}
              </span>
              <h3 className="font-headline m-0 text-[clamp(24px,2.4vw,28px)] leading-[1.16] tracking-[-0.015em] text-pretty">
                {door.title}
              </h3>
              <div className="border-rule-light flex flex-col gap-2 border-t pt-3.5">
                {door.points.map((point) => (
                  <div
                    key={point}
                    className="text-ink-body flex items-baseline gap-3 text-[14.5px] leading-[1.6]"
                  >
                    <span
                      aria-hidden
                      className="bg-teal-mid block h-[5px] w-[5px] flex-none -translate-y-0.5 rounded-full"
                    />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <span className="mt-1.5 self-start pb-1 text-[14.5px] font-bold shadow-[inset_0_-2px_0_var(--color-teal-mid)]">
                {door.ctaLabel}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 08 — security, as a heading beside a numbered list. */
export function Trust({ section, num }: SectionProps) {
  return (
    <section id={section.id} data-reveal className={`${SECTION} bg-white`}>
      <div className="max-w-site mx-auto grid items-start gap-[clamp(28px,4vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <div className="flex flex-col gap-3.5">
          <SectionLabel num={num}>{section.eyebrow}</SectionLabel>
          <h2 className="font-headline text-ink m-0 text-[clamp(26px,3.2vw,38px)] leading-[1.14] tracking-[-0.015em]">
            {HOME_V4_TRUST.heading}
          </h2>
          <p className="text-ink-body m-0 text-[14.5px] leading-[1.7]">
            {HOME_V4_TRUST.description}
          </p>
        </div>
        <div className="border-rule flex flex-col border-t">
          {HOME_V4_TRUST.points.map((point, i) => (
            <div
              key={point}
              className="border-rule flex items-baseline gap-[18px] border-b py-[15px]"
            >
              <span className="font-mono-label text-teal-mid flex-none text-[10.5px] tracking-[0.14em]">
                {pad(i)}
              </span>
              <span className="text-ink text-[15px] leading-[1.6]">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
