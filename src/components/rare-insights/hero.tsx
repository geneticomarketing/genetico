import Link from "next/link";

import type { RareInsightsCopy } from "@/lib/cms/rare-insights-data";
import {
  editionHref,
  itemLabel,
  itemMeta,
  plural,
  shortDate,
  topicsOf,
  type RareInsightsEdition,
} from "@/lib/rare-insights";

const FADE_UP = "motion-safe:animate-[fade-up_.8s_ease_both]";
const MONO_LABEL = "font-mono-label text-[10.5px] tracking-[0.16em] uppercase";

/** How many items after the lead the latest-edition card lists. */
const CARD_ITEMS = 5;

/**
 * The top of /rare-insights: title, intro, the two calls to action and the
 * archive's running totals on the left; the newest edition as a card on the
 * right. The two columns stack on their own below ~1000px.
 */
export function RareInsightsHero({
  copy,
  editions,
  subscribeUrl,
}: {
  copy: RareInsightsCopy["hero"];
  editions: RareInsightsEdition[];
  subscribeUrl: string;
}) {
  const latest = editions[0];
  const items = editions.flatMap((edition) => edition.items);
  const topics = topicsOf(items).length;

  return (
    <section
      id="top"
      className="px-edge relative overflow-hidden bg-[linear-gradient(180deg,#F6F9FA_0%,#ffffff_100%)] pt-[clamp(64px,8vw,112px)] pb-[clamp(72px,9vw,128px)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_70%_at_20%_30%,#000_0%,transparent_100%)] bg-[linear-gradient(rgba(11,76,134,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,76,134,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"
      />
      <div className="max-w-site relative mx-auto grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(48px,6vw,88px)]">
        <div className="flex flex-col gap-[26px]">
          <span
            className={`font-mono-label text-primary flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase ${FADE_UP}`}
          >
            <span aria-hidden className="h-px w-9 bg-[image:var(--gradient-hairline)]" />
            {copy.eyebrow}
          </span>
          <h1
            className={`font-headline text-ink m-0 text-[clamp(56px,8vw,112px)] leading-[0.96] font-normal tracking-[-0.03em] [animation-delay:100ms] ${FADE_UP}`}
          >
            {copy.heading}
          </h1>
          <p
            className={`text-ink-body m-0 max-w-[540px] text-lg leading-[1.75] text-pretty [animation-delay:200ms] ${FADE_UP}`}
          >
            {copy.description}
          </p>
          <div className={`flex flex-wrap gap-3 [animation-delay:300ms] ${FADE_UP}`}>
            <Link
              href={latest ? editionHref(latest.slug) : "#archive"}
              className="bg-primary-deep hover:bg-primary inline-flex items-center gap-2.5 rounded-[10px] px-[26px] py-[15px] text-[15px] font-bold text-white transition-colors"
            >
              {copy.primaryLabel} <span aria-hidden>→</span>
            </Link>
            <a
              href={subscribeUrl}
              target="_blank"
              rel="noreferrer"
              className="border-rule-strong text-primary-deep hover:border-primary inline-flex items-center gap-2.5 rounded-[10px] border bg-white px-[26px] py-[15px] text-[15px] font-medium transition-colors"
            >
              {copy.subscribeLabel} <span aria-hidden>↗</span>
            </a>
          </div>
          <div
            className={`text-ink-soft flex flex-wrap gap-x-[22px] gap-y-2 pt-1.5 ${MONO_LABEL} [animation-delay:380ms] ${FADE_UP}`}
          >
            <span>{plural(editions.length, "edition")}</span>
            <span>{items.length} items indexed</span>
            <span>{plural(topics, "topic")}</span>
          </div>
        </div>

        {latest ? <LatestCard edition={latest} /> : null}
      </div>
    </section>
  );
}

function LatestCard({ edition }: { edition: RareInsightsEdition }) {
  const [lead, ...rest] = edition.items;
  const more = rest.length - CARD_ITEMS;

  return (
    <Link
      href={editionHref(edition.slug)}
      className={`border-rule text-ink hover:text-ink relative block rounded-[12px] border bg-white p-[clamp(24px,3vw,36px)] shadow-[0_26px_70px_rgba(7,59,104,0.12)] transition-[transform,box-shadow] duration-[250ms] [animation-delay:240ms] hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(7,59,104,0.18)] ${FADE_UP}`}
    >
      <span
        aria-hidden
        className="bg-primary absolute top-0 right-[clamp(24px,3vw,36px)] left-[clamp(24px,3vw,36px)] h-[3px] rounded-b-[2px]"
      />
      <span className={`flex items-center justify-between gap-3 ${MONO_LABEL}`}>
        <span className="text-teal-deep">Latest · {edition.label}</span>
        <span className="text-ink-soft">{shortDate(edition.date)}</span>
      </span>
      <span className="bg-primary-tint mt-[22px] block rounded-[10px] px-[22px] pt-[22px] pb-6">
        <span className={`text-primary block ${MONO_LABEL}`}>{itemLabel(lead)}</span>
        <span className="font-headline mt-2.5 block text-[clamp(24px,2.4vw,30px)] leading-[1.14] tracking-[-0.015em] text-balance">
          {lead.title}
        </span>
        <span className="text-ink-soft mt-2.5 block text-[13px]">{itemMeta(lead, shortDate)}</span>
      </span>
      <span className="mt-2 flex flex-col">
        {rest.slice(0, CARD_ITEMS).map((item) => (
          <span
            key={item.num}
            className="border-rule-light grid grid-cols-[30px_minmax(0,1fr)] gap-3 border-b py-[13px]"
          >
            <span className="font-mono-label text-teal-mid pt-0.5 text-[11px]">{item.num}</span>
            <span className="text-ink-body line-clamp-2 text-[14.5px] leading-[1.5]">
              {item.title}
            </span>
          </span>
        ))}
      </span>
      <span className="mt-[18px] flex items-center justify-between gap-3">
        <span className="text-ink-soft text-[13px]">
          {more > 0 ? `+ ${more} more in this edition` : ""}
        </span>
        <span className="text-primary text-sm font-bold">Read edition →</span>
      </span>
    </Link>
  );
}
