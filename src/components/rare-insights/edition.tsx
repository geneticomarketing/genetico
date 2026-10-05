import Link from "next/link";
import { Fragment } from "react";

import { CopyLink, DeepLinkFlash } from "@/components/rare-insights/edition-client";
import type { RareInsightsCopy } from "@/lib/cms/rare-insights-data";
import {
  editionHref,
  itemLabel,
  longDate,
  plural,
  RARE_INSIGHTS_PATH,
  readMinutes,
  topicsOf,
  type RareInsightsEdition,
  type RareInsightsItem,
} from "@/lib/rare-insights";

const FADE_UP = "motion-safe:animate-[fade-up_.8s_ease_both]";
const MONO_LABEL = "font-mono-label text-[10.5px] tracking-[0.16em] uppercase";
/** Items land 128px from the top when linked to: under the header and the rail. */
const ANCHOR = "scroll-mt-32";

/** The edition's masthead: date as the title, the standfirst, and its size. */
export function EditionHeader({
  edition,
  standfirst,
}: {
  edition: RareInsightsEdition;
  standfirst: string;
}) {
  return (
    <section
      id="e-top"
      className="px-edge bg-[linear-gradient(180deg,#F6F9FA_0%,#ffffff_100%)] pt-[clamp(40px,5vw,64px)]"
    >
      <div className="max-w-site mx-auto">
        <Link
          href={`${RARE_INSIGHTS_PATH}#archive`}
          className="text-ink-body hover:text-primary inline-flex items-center gap-2 text-sm font-medium"
        >
          ← All editions
        </Link>
        <div className="mt-[clamp(32px,4vw,52px)] flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="flex max-w-[760px] flex-col gap-4">
            <span
              className={`font-mono-label text-teal-deep text-[11px] tracking-[0.2em] uppercase ${FADE_UP}`}
            >
              Rare Insights · {edition.label}
              {edition.issueLabel ? ` · ${edition.issueLabel}` : ""}
            </span>
            <h1
              className={`font-headline m-0 text-[clamp(44px,6vw,80px)] leading-none font-normal tracking-[-0.025em] [animation-delay:100ms] ${FADE_UP}`}
            >
              <time dateTime={edition.date}>{longDate(edition.date)}</time>
            </h1>
            <p
              className={`text-ink-body m-0 text-lg leading-[1.75] [animation-delay:200ms] ${FADE_UP}`}
            >
              {standfirst}
            </p>
            {edition.note ? (
              <p className="text-teal-deep m-0 text-[15px] leading-[1.7]">{edition.note}</p>
            ) : null}
          </div>
          <div className={`text-ink-soft flex flex-wrap gap-x-[22px] gap-y-2 pb-2 ${MONO_LABEL}`}>
            <span>{plural(edition.items.length, "item")}</span>
            <span>About {readMinutes(edition)} min read</span>
          </div>
        </div>
        <div className="bg-primary mt-7 h-[3px] rounded-[2px]" />
      </div>
    </section>
  );
}

/**
 * The edition itself: a sticky side column (topics, copy link, subscribe),
 * the lead in a tinted panel, every other item in order with section
 * dividers where the email had them, then links to the editions either side.
 */
export function EditionBody({
  edition,
  older,
  newer,
  copy,
  subscribeUrl,
}: {
  edition: RareInsightsEdition;
  older: RareInsightsEdition | null;
  newer: RareInsightsEdition | null;
  copy: RareInsightsCopy["edition"];
  subscribeUrl: string;
}) {
  const [lead, ...rest] = edition.items;
  const topics = topicsOf(edition.items);

  return (
    <section className="px-edge pt-[clamp(40px,5vw,64px)] pb-[clamp(72px,9vw,120px)]">
      <DeepLinkFlash />
      <div className="max-w-site mid:grid-cols-[240px_minmax(0,720px)] mid:gap-16 mx-auto grid grid-cols-[minmax(0,1fr)] items-start justify-center gap-8">
        <aside className="mid:sticky mid:top-[140px] flex flex-col gap-[22px]">
          {topics.length ? (
            <div className="flex flex-col gap-1.5">
              <span className={`text-ink-soft ${MONO_LABEL}`}>In this edition</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="bg-sheet-mute text-ink-body rounded-full px-2.5 py-[5px] text-[12.5px]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2.5">
            <CopyLink
              as="button"
              label="Copy link to edition"
              className="border-rule text-primary-deep hover:border-primary h-11 rounded-[10px] border bg-white px-4 font-[inherit] text-[13.5px] font-bold transition-colors"
            />
            <a
              href={subscribeUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-primary-deep hover:bg-primary inline-flex h-11 items-center rounded-[10px] px-4 text-[13.5px] font-bold text-white transition-colors hover:text-white"
            >
              Subscribe ↗
            </a>
          </div>
          <p className="text-ink-soft m-0 text-[13px] leading-[1.6]">{copy.smallPrint}</p>
        </aside>

        <div className="min-w-0 max-w-[720px]">
          <LeadItem item={lead} />

          <div className="mt-3">
            {rest.map((item) => (
              <Fragment key={item.num}>
                {item.section ? (
                  <div className="mt-10 flex items-center gap-3.5">
                    <span className="font-mono-label text-primary text-[11px] tracking-[0.2em] whitespace-nowrap uppercase">
                      {item.section}
                    </span>
                    <span
                      aria-hidden
                      className="h-px flex-1 bg-[image:var(--gradient-hairline-flip)]"
                    />
                  </div>
                ) : null}
                <Item item={item} />
              </Fragment>
            ))}
          </div>

          <nav
            aria-label="Edition navigation"
            className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3.5"
          >
            {older ? (
              <Link
                href={editionHref(older.slug)}
                className="border-rule text-ink hover:border-primary hover:text-ink flex flex-col gap-2 rounded-[12px] border px-6 py-[22px] transition-colors"
              >
                <span className={`text-ink-soft ${MONO_LABEL}`}>← Previous · {older.label}</span>
                <span className="font-headline text-[21px] leading-[1.2]">
                  {older.items[0].title}
                </span>
              </Link>
            ) : (
              <div className="border-rule flex flex-col gap-2 rounded-[12px] border border-dashed px-6 py-[22px]">
                <span className={`text-ink-dim ${MONO_LABEL}`}>← Previous</span>
                <span className="text-ink-soft text-[14.5px]">
                  This is the earliest edition in the archive.
                </span>
              </div>
            )}
            {newer ? (
              <Link
                href={editionHref(newer.slug)}
                className="border-rule text-ink hover:border-primary hover:text-ink flex flex-col items-end gap-2 rounded-[12px] border px-6 py-[22px] text-right transition-colors"
              >
                <span className={`text-ink-soft ${MONO_LABEL}`}>Next · {newer.label} →</span>
                <span className="font-headline text-[21px] leading-[1.2]">
                  {newer.items[0].title}
                </span>
              </Link>
            ) : (
              <div className="border-rule flex flex-col items-end gap-2 rounded-[12px] border border-dashed px-6 py-[22px] text-right">
                <span className={`text-ink-dim ${MONO_LABEL}`}>Next →</span>
                <span className="text-ink-soft text-[14.5px]">
                  You&apos;re on the latest edition.
                </span>
              </div>
            )}
          </nav>
        </div>
      </div>
    </section>
  );
}

function LeadItem({ item }: { item: RareInsightsItem }) {
  return (
    <article
      id={item.num}
      data-item
      className={`bg-primary-tint rounded-[12px] p-[clamp(26px,3.4vw,44px)] transition-shadow duration-400 data-[flash]:shadow-[0_0_0_2px_var(--color-teal)] ${ANCHOR}`}
    >
      <div className={`flex justify-between gap-3 ${MONO_LABEL}`}>
        <span className="text-teal-deep">{itemLabel(item)}</span>
        <CopyLink
          hash={item.num}
          label="Link"
          copiedLabel="Copied"
          className="text-ink-soft hover:text-primary"
        />
      </div>
      <h2 className="font-headline m-0 mt-4 text-[clamp(30px,3.6vw,44px)] leading-[1.1] font-normal tracking-[-0.02em] text-balance">
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="text-ink hover:text-primary"
        >
          {item.title}
        </a>
      </h2>
      <div className="text-ink-soft mt-3 text-[13px]">
        <ItemMeta item={item} />
      </div>
      {item.body.length ? (
        <div className="mt-[22px] flex flex-col gap-[18px]">
          {item.body.map((paragraph) => (
            <p key={paragraph} className="text-ink m-0 text-lg leading-[1.75] text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="bg-primary-deep hover:bg-primary mt-7 inline-flex items-center gap-2.5 rounded-[10px] px-6 py-3.5 text-[14.5px] font-bold text-white transition-colors hover:text-white"
      >
        {item.cta} <span aria-hidden>↗</span>
      </a>
    </article>
  );
}

function Item({ item }: { item: RareInsightsItem }) {
  return (
    <article
      id={item.num}
      data-item
      className={`border-rule data-[flash]:bg-teal-tint mx-[calc(-1*clamp(0px,1.4vw,18px))] rounded-[10px] border-b px-[clamp(0px,1.4vw,18px)] py-[clamp(28px,3vw,40px)] transition-colors duration-[600ms] ${ANCHOR}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono-label text-teal-mid text-sm tracking-[0.06em]">{item.num}</span>
        {item.tag ? <span className={`text-ink-soft ${MONO_LABEL}`}>{item.tag}</span> : null}
      </div>
      <h3 className="font-headline m-0 mt-3 text-[clamp(23px,2.4vw,28px)] leading-[1.2] font-normal tracking-[-0.012em] text-pretty">
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="text-ink hover:text-primary"
        >
          {item.title}
        </a>
      </h3>
      <div className="text-ink-soft mt-2.5 text-[13px]">
        <ItemMeta item={item} />
      </div>
      {item.body.map((paragraph) => (
        <p
          key={paragraph}
          className="text-ink-body m-0 mt-4 text-[17px] leading-[1.75] text-pretty"
        >
          {paragraph}
        </p>
      ))}
      <div className="mt-4 flex flex-wrap items-center gap-5">
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:text-primary-deep text-sm font-bold"
        >
          {item.cta} →
        </a>
        <CopyLink
          hash={item.num}
          label="Copy link"
          className={`text-ink-dim hover:text-primary ${MONO_LABEL}`}
        />
      </div>
    </article>
  );
}

/** "Journal · 26 September 2026", with the date machine-readable. */
function ItemMeta({ item }: { item: RareInsightsItem }) {
  return (
    <>
      {item.source}
      {item.date ? (
        <>
          {" · "}
          <time dateTime={item.date}>{longDate(item.date)}</time>
        </>
      ) : null}
    </>
  );
}
