import Image from "next/image";
import Link from "next/link";

import { SectionLabel } from "@/components/chrome/eyebrow";
import { FactsPanel } from "@/components/home/facts-panel";
import { HeroDemoPanel } from "@/components/home/hero-demo-panel";
import {
  HOME_AR_AHEAD,
  HOME_AR_DOES,
  HOME_AR_IMPACT,
  HOME_AR_PLATFORM,
  HOME_AR_SERVE,
  HOME_AR_WHY,
} from "@/content/home-ar";
import type { HomePlatformContent, HomeSectionMeta } from "@/lib/cms/home-content";
import type { Partner } from "@/lib/cms/types";
import { RESOURCES_PATH } from "@/lib/routes";

type SectionProps = { section: HomeSectionMeta; num: string };

const pad = (i: number) => String(i + 1).padStart(2, "0");

const SECTION = "px-edge pt-sect-top pb-sect-bot scroll-mt-32";

const CARD = "border-rule rounded-card shadow-card border bg-white";

const LIFT =
  "transition-[transform,box-shadow] duration-[220ms] ease-out hover:-translate-y-1 hover:shadow-card-lift";

/** Left-aligned numbered heading with its supporting sentence to the right. */
function SplitHeading({
  num,
  eyebrow,
  heading,
  description,
  tone = "light",
}: {
  num: string;
  eyebrow: string;
  heading: string;
  description: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="flex max-w-[760px] min-w-0 flex-col gap-3.5">
        <SectionLabel num={num} tone={tone}>
          {eyebrow}
        </SectionLabel>
        <h2
          className={`font-headline m-0 text-[clamp(30px,4vw,48px)] leading-[1.08] tracking-[-0.018em] text-pretty ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {heading}
        </h2>
      </div>
      <p
        className={`m-0 max-w-[380px] text-[14.5px] leading-[1.7] ${dark ? "text-sky" : "text-ink-body"}`}
      >
        {description}
      </p>
    </div>
  );
}

/** A mono label ruled off to the right edge. */
function RuledLabel({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-mono-label text-ink-soft flex-none text-[11px] tracking-[0.2em] uppercase">
        {children}
      </span>
      <span aria-hidden className="bg-rule block h-px flex-1" />
    </div>
  );
}

/**
 * 01 — why Genetico exists: the five parties that each hold part of one
 * patient's information, each tagged with the form it is held in, then the
 * scale of the problem.
 */
export function Why({ section, num }: SectionProps) {
  const content = HOME_AR_WHY;

  return (
    <section id={section.id} data-reveal className={`${SECTION} border-rule-light border-t`}>
      <div className="max-w-site mx-auto">
        <SplitHeading
          num={num}
          eyebrow={section.eyebrow}
          heading={content.heading}
          description={content.description}
        />

        <div className="mt-11 grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
          {content.holders.map((holder, i) => (
            <div
              key={holder.title}
              className="bg-dark-tile rounded-card flex min-w-0 flex-col gap-3 px-[22px] pt-6 pb-5 shadow-[0_18px_44px_rgba(7,59,104,0.10)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_28px_62px_rgba(7,22,31,0.26)]"
            >
              <span className="font-mono-label text-sky-bright text-[10.5px] tracking-[0.16em]">
                {pad(i)}
              </span>
              <h3 className="font-headline m-0 text-[23px] leading-[1.16] tracking-[-0.015em] text-white">
                {holder.title}
              </h3>
              <p className="text-sky m-0 text-sm leading-[1.65]">{holder.body}</p>
              <span className="font-mono-label text-sky-soft mt-auto self-start rounded-full border border-dashed border-[rgba(143,198,239,0.5)] px-2.5 py-[5px] text-[10px] tracking-[0.12em] uppercase">
                {holder.format}
              </span>
            </div>
          ))}
        </div>

        <p className="font-headline text-ink mx-auto mt-[clamp(36px,4.5vw,52px)] mb-0 max-w-[780px] text-center text-[clamp(21px,2.4vw,29px)] leading-[1.42] tracking-[-0.01em] text-pretty">
          {content.closing}
        </p>

        <FactsPanel
          className="mt-[clamp(36px,4.5vw,52px)]"
          dotGrid={content.dotGrid}
          facts={content.facts}
          note={content.factsNote}
        />
      </div>
    </section>
  );
}

/** 02 — the dark band: five areas, each a node on one hairline. */
export function Does({ section, num }: SectionProps) {
  const content = HOME_AR_DOES;

  return (
    <section id={section.id} data-reveal className={`${SECTION} bg-dark-band text-white`}>
      <div className="max-w-site mx-auto">
        <SplitHeading
          num={num}
          eyebrow={section.eyebrow}
          heading={content.heading}
          description={content.description}
          tone="dark"
        />

        <ol className="m-0 mt-[52px] grid list-none [grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-x-[26px] gap-y-[34px] p-0">
          {content.areas.map((area, i) => (
            <li
              key={area.title}
              className="relative flex min-w-0 flex-col gap-2.5 border-t border-white/28 pt-[26px]"
            >
              <span
                aria-hidden
                className="bg-teal absolute -top-[5px] left-0 block h-[9px] w-[9px] rounded-full"
              />
              <span className="font-mono-label text-mint text-[10.5px] tracking-[0.14em]">
                {pad(i)}
              </span>
              <h3 className="font-headline m-0 text-[23px] leading-[1.18] tracking-[-0.012em] text-pretty text-white">
                {area.title}
              </h3>
              <p className="text-sky m-0 text-sm leading-[1.65]">{area.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * 03 — IndiGeneUs.AI: which name is which, the extraction demo on a sample
 * case (it runs itself once as the section comes into view), and the four
 * layers, read from the live home page's CMS entries.
 */
export function Platform({
  section,
  num,
  layers,
}: SectionProps & { layers: HomePlatformContent["layers"] }) {
  const content = HOME_AR_PLATFORM;

  return (
    <section
      id={section.id}
      data-reveal
      className={`${SECTION} bg-sheet-soft border-rule-light border-y`}
    >
      <div className="max-w-site mx-auto">
        <div className="mid:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] mid:gap-[clamp(34px,5vw,64px)] grid grid-cols-[minmax(0,1fr)] items-center gap-[34px]">
          <div className="flex min-w-0 flex-col items-start gap-[18px]">
            <SectionLabel num={num}>{section.eyebrow}</SectionLabel>
            <div className="flex h-12 items-center">
              <Image
                src="/brand/indigeneus-mark-black.png"
                alt="IndiGeneUs.AI"
                width={1065}
                height={1061}
                className="block h-11 w-auto will-change-transform motion-safe:animate-[spin-mark_14s_linear_infinite]"
              />
            </div>
            <h2 className="font-headline m-0 text-[clamp(30px,3.8vw,46px)] leading-[1.08] tracking-[-0.018em] text-pretty">
              {content.heading}
            </h2>
            <p className="text-ink-body m-0 max-w-[520px] text-base leading-[1.75] text-pretty">
              {content.body}
            </p>
            <p className="text-ink-body m-0 max-w-[520px] text-[14.5px] leading-[1.7]">
              {content.demoNote}{" "}
              <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.12em] uppercase">
                {content.demoTag}
              </span>
            </p>
            <Link
              href={content.ctaHref}
              className="border-rule text-ink hover:border-primary hover:text-primary inline-flex items-center gap-[9px] rounded-full border bg-white px-[clamp(18px,2vw,26px)] py-[13px] text-sm font-medium transition-colors"
            >
              {content.ctaLabel}
              <span aria-hidden className="text-xs">
                →
              </span>
            </Link>
          </div>

          <HeroDemoPanel
            autoRunSection={section.id}
            fitToViewport={false}
            narrowLayout="swipe"
            className="nav:max-w-none"
          />
        </div>

        <div className="mt-[clamp(48px,6vw,72px)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-headline m-0 text-[clamp(24px,2.8vw,32px)] leading-[1.14] tracking-[-0.015em]">
              {content.layersHeading}
            </h3>
            <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.14em] uppercase">
              {content.layersLabel}
            </span>
          </div>

          <div
            className="layer-grid swipe-row mt-[26px]"
            style={{ "--swipe-col": "80%" } as React.CSSProperties}
          >
            {layers.map((layer, i) => (
              <div
                key={layer.title}
                className="flex min-w-0 flex-col gap-3 px-6 pt-[26px] pb-[22px] transition-colors duration-200 hover:bg-[#F4F8FB]!"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono-label text-primary text-[11px] tracking-[0.2em]">
                    {pad(i)}
                  </span>
                  <span aria-hidden className="bg-rule-light block h-px flex-1" />
                </div>
                <h4 className="font-headline m-0 text-[23px] leading-[1.14] tracking-[-0.015em]">
                  {layer.title}
                </h4>
                <p className="text-ink-body m-0 text-sm leading-[1.65]">{layer.body}</p>
                <span className="font-mono-label text-ink-soft mt-auto pt-3.5 text-[10.5px] tracking-[0.14em] uppercase">
                  {layer.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 04 — who we serve: a photo card per audience, each opening its solution page. */
export function Serve({ section, num }: SectionProps) {
  const content = HOME_AR_SERVE;

  return (
    <section id={section.id} data-reveal className={SECTION}>
      <div className="max-w-site mx-auto">
        <SplitHeading
          num={num}
          eyebrow={section.eyebrow}
          heading={content.heading}
          description={content.description}
        />

        <div className="mt-11 grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px]">
          {content.doors.map((door) => (
            <Link
              key={door.href}
              href={door.href}
              className={`${CARD} ${LIFT} text-ink hover:text-ink flex min-w-0 flex-col overflow-hidden`}
            >
              <div className="bg-primary-tint border-rule relative h-[clamp(150px,15vw,190px)] w-full flex-none overflow-hidden border-b">
                <Image
                  src={door.photo.src}
                  alt={door.photo.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                  className="object-cover"
                  style={{ objectPosition: door.photo.position }}
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-3 px-[26px] pt-6 pb-[26px]">
                <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                  {door.kicker}
                </span>
                <h3 className="font-headline m-0 text-[clamp(23px,2.5vw,28px)] leading-[1.14] tracking-[-0.015em] text-pretty">
                  {door.title}
                </h3>
                <p className="text-ink-body m-0 text-[14.5px] leading-[1.68]">{door.body}</p>
                <span className="text-primary mt-auto inline-flex items-center gap-[7px] pt-3 text-[13.5px] font-bold">
                  {door.ctaLabel}
                  <span aria-hidden className="text-xs">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 05 — impact: where Genetico is deployed, the AIIMS case study, and the
 * institutions and programmes it works with.
 */
export function Impact({
  section,
  num,
  awardCount,
  firstAwardYear,
  caseStudyHref,
  logos,
}: SectionProps & {
  awardCount: number;
  firstAwardYear: string;
  caseStudyHref: string;
  logos: Partner[];
}) {
  const content = HOME_AR_IMPACT;
  const { caseStudy } = content;

  const figures = [...content.figures];
  if (awardCount) {
    figures.push({
      label: content.awards.label,
      figure: `${awardCount} grants & awards`,
      body: `${firstAwardYear ? `Since ${firstAwardYear}, ` : ""}${content.awards.body}`,
    });
  }

  return (
    <section
      id={section.id}
      data-reveal
      className={`${SECTION} bg-sheet-cool border-rule border-y`}
    >
      <div className="max-w-site mx-auto">
        <SplitHeading
          num={num}
          eyebrow={section.eyebrow}
          heading={content.heading}
          description={content.description}
        />

        <div className="mt-11 grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[18px]">
          {figures.map((item) => (
            <div
              key={item.label}
              className={`${CARD} flex min-w-0 flex-col gap-2.5 px-[26px] pt-[26px] pb-6`}
            >
              <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.16em] uppercase">
                {item.label}
              </span>
              <span className="font-headline text-primary text-[clamp(30px,3.4vw,42px)] leading-[1.05] tracking-[-0.02em]">
                {item.figure}
              </span>
              <p className="text-ink-body m-0 text-[14.5px] leading-[1.65]">{item.body}</p>
            </div>
          ))}
        </div>

        <Link
          href={caseStudyHref}
          className={`${CARD} ${LIFT} text-ink hover:text-ink mt-[18px] grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))] overflow-hidden`}
        >
          <div className="relative min-h-[clamp(220px,24vw,300px)] bg-[#0C2436]">
            <Image
              src={caseStudy.photo.src}
              alt={caseStudy.photo.alt}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="text-primary absolute bottom-4 left-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/94 text-base"
            >
              ▶
            </span>
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-3.5 p-[clamp(24px,3vw,36px)]">
            <span className="font-mono-label text-teal-mid text-[10.5px] tracking-[0.16em] uppercase">
              {caseStudy.kicker}
            </span>
            <h3 className="font-headline m-0 text-[clamp(24px,2.8vw,34px)] leading-[1.14] tracking-[-0.015em] text-pretty">
              {caseStudy.title}
            </h3>
            <p className="text-ink-body m-0 max-w-[480px] text-[14.5px] leading-[1.7]">
              {caseStudy.blurb}
            </p>
            <span className="text-primary inline-flex items-center gap-[7px] text-[13.5px] font-bold">
              {caseStudy.ctaLabel}
              <span aria-hidden className="text-xs">
                →
              </span>
            </span>
          </div>
        </Link>

        {logos.length ? (
          <>
            <RuledLabel className="mt-12">{content.logosLabel}</RuledLabel>
            <div className="mt-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
              <div className="flex w-max items-center motion-safe:animate-[marquee_42s_linear_infinite]">
                {[0, 1].map((copy) => (
                  <div key={copy} aria-hidden={copy === 1} className="flex items-center">
                    {logos.map((logo) => (
                      <div
                        key={logo.name}
                        role="img"
                        aria-label={logo.name}
                        className="h-[104px] w-[170px] flex-none bg-contain bg-origin-content bg-center bg-no-repeat px-5 py-[22px]"
                        style={{ backgroundImage: `url('${logo.logo}')` }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}

        <Link
          href={RESOURCES_PATH}
          className="rounded-card text-primary hover:border-primary hover:bg-primary-tint mt-3.5 flex items-center justify-between gap-2.5 border border-dashed border-[#D6DEE4] px-[22px] py-3.5 text-[13.5px] font-medium transition-colors"
        >
          {content.resourcesLabel}
          <span aria-hidden className="text-xs">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

/**
 * 06 — the dark band: three stages, each hanging from one hairline. The stage
 * in use now has a filled teal dot; those still ahead are hollow.
 */
export function Ahead({ section, num }: SectionProps) {
  const content = HOME_AR_AHEAD;

  return (
    <section id={section.id} data-reveal className={`${SECTION} bg-dark-band text-white`}>
      <div className="max-w-site mx-auto">
        <SplitHeading
          num={num}
          eyebrow={section.eyebrow}
          heading={content.heading}
          description={content.description}
          tone="dark"
        />

        <ol className="m-0 mt-14 grid list-none [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-[clamp(24px,3vw,40px)] gap-y-9 p-0">
          {content.stages.map((stage, i) => (
            <li
              key={stage.title}
              className="relative flex min-w-0 flex-col gap-2.5 border-t border-white/28 pt-[26px]"
            >
              <span
                aria-hidden
                className={`absolute -top-[5px] left-0 block h-[9px] w-[9px] rounded-full ${
                  i === 0 ? "bg-teal" : "border-sky-bright border-[1.5px]"
                }`}
              />
              <span className="font-mono-label text-mint text-[10.5px] tracking-[0.16em] uppercase">
                {pad(i)} · {stage.when}
              </span>
              <h3 className="font-headline m-0 text-[clamp(24px,2.6vw,28px)] leading-[1.16] tracking-[-0.015em] text-white">
                {stage.title}
              </h3>
              <p className="text-sky m-0 text-[14.5px] leading-[1.7]">{stage.body}</p>
            </li>
          ))}
        </ol>
        <p className="text-sky-soft mt-9 mb-0 text-[13px] leading-[1.6]">{content.footnote}</p>
      </div>
    </section>
  );
}
