"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { RareInsightsCopy } from "@/lib/cms/rare-insights-data";
import {
  editionHref,
  externalLabel,
  itemHref,
  itemMeta,
  longDate,
  monthKey,
  monthLabel,
  plural,
  shortDate,
  topicsOf,
  type RareInsightsEdition,
  type RareInsightsItem,
} from "@/lib/rare-insights";

type Mode = "editions" | "papers";
type Filters = { q: string; topic: string; month: string };

const MONO_LABEL = "font-mono-label text-[10.5px] tracking-[0.16em] uppercase";
const FIELD =
  "border-rule text-ink focus:border-primary h-[46px] rounded-[10px] border bg-white font-[inherit] text-[14.5px] outline-none focus:shadow-[0_0_0_3px_var(--color-primary-tint)]";
const NO_FILTERS: Filters = { q: "", topic: "", month: "" };

/**
 * Search is every word, in any order, anywhere in the headline, journal,
 * topic or note. Topic is an exact match. Month is the edition's send month,
 * not the paper's publication date.
 */
function matches(item: RareInsightsItem, edition: RareInsightsEdition, f: Filters): boolean {
  if (f.month && monthKey(edition.date) !== f.month) return false;
  if (f.topic && item.tag !== f.topic) return false;
  if (f.q) {
    const hay = `${item.title} ${item.source} ${item.tag} ${item.body.join(" ")}`.toLowerCase();
    const words = f.q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.every((word) => hay.includes(word))) return false;
  }
  return true;
}

/** Filters live in the query string (?q=…&topic=…&month=…&view=papers) so a filtered view can be shared. */
function readQuery(): { filters: Filters; mode: Mode } {
  const params = new URLSearchParams(window.location.search);
  return {
    filters: {
      q: params.get("q") ?? "",
      topic: params.get("topic") ?? "",
      month: params.get("month") ?? "",
    },
    mode: params.get("view") === "papers" ? "papers" : "editions",
  };
}

function writeQuery(filters: Filters, mode: Mode) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.topic) params.set("topic", filters.topic);
  if (filters.month) params.set("month", filters.month);
  if (mode === "papers") params.set("view", "papers");
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
  if (url !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    window.history.replaceState(window.history.state, "", url);
  }
}

export function RareInsightsArchive({
  copy,
  editions,
}: {
  copy: RareInsightsCopy["archive"];
  editions: RareInsightsEdition[];
}) {
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const [mode, setMode] = useState<Mode>("editions");
  const [hydrated, setHydrated] = useState(false);

  // The server renders the unfiltered archive; a shared link's filters apply on arrival.
  useEffect(() => {
    const initial = readQuery();
    /* eslint-disable react-hooks/set-state-in-effect -- one-off sync from the URL after hydration */
    setFilters(initial.filters);
    setMode(initial.mode);
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (hydrated) writeQuery(filters, mode);
  }, [filters, mode, hydrated]);

  const all = useMemo(
    () => editions.flatMap((edition) => edition.items.map((item) => ({ item, edition }))),
    [editions],
  );
  const topicOptions = useMemo(() => {
    const count: Record<string, number> = {};
    for (const { item } of all) if (item.tag) count[item.tag] = (count[item.tag] ?? 0) + 1;
    return Object.keys(count)
      .sort((a, b) => a.localeCompare(b))
      .map((tag) => ({ value: tag, label: `${tag} (${count[tag]})` }));
  }, [all]);
  const monthOptions = useMemo(
    () => Array.from(new Set(editions.map((edition) => monthKey(edition.date)))),
    [editions],
  );

  const filtering = Boolean(filters.q || filters.topic || filters.month);
  const papers = all.filter(({ item, edition }) => matches(item, edition, filters));
  const editionRows = editions
    .map((edition) => ({
      edition,
      hits: edition.items.filter((item) => matches(item, edition, filters)).length,
    }))
    .filter((row) => row.hits > 0);

  const groups: { key: string; rows: typeof editionRows }[] = [];
  for (const row of editionRows) {
    const key = monthKey(row.edition.date);
    const group = groups.find((g) => g.key === key);
    if (group) group.rows.push(row);
    else groups.push({ key, rows: [row] });
  }

  const shown = mode === "editions" ? editionRows.length : papers.length;
  const set = (patch: Partial<Filters>) => setFilters((current) => ({ ...current, ...patch }));
  const clear = () => setFilters(NO_FILTERS);

  const tab = (value: Mode, label: string, count: number) => (
    <button
      type="button"
      role="tab"
      aria-selected={mode === value}
      onClick={() => setMode(value)}
      className={`flex h-[38px] items-center gap-2 rounded-[9px] border-0 px-4 font-[inherit] text-sm transition-colors ${
        mode === value
          ? "text-primary-deep bg-white font-bold shadow-[0_2px_8px_rgba(7,59,104,0.10)]"
          : "text-ink-body bg-transparent font-medium"
      }`}
    >
      {label} <span className="font-mono-label text-[11px] opacity-60">{count}</span>
    </button>
  );

  return (
    <section
      id="archive"
      className="border-rule-light px-edge scroll-mt-16 border-t py-[clamp(72px,9vw,128px)]"
    >
      <div className="max-w-site mx-auto">
        <div data-reveal className="flex flex-col items-center gap-[18px] text-center">
          <div className="flex items-center gap-3.5">
            <span aria-hidden className="h-px w-14 bg-[image:var(--gradient-hairline)]" />
            <span className="font-mono-label text-primary text-[11px] tracking-[0.2em] uppercase">
              {copy.eyebrow}
            </span>
            <span aria-hidden className="h-px w-14 bg-[image:var(--gradient-hairline-flip)]" />
          </div>
          <h2 className="font-headline m-0 text-[clamp(38px,5.2vw,68px)] leading-[1.06] font-normal tracking-[-0.02em] text-balance">
            {copy.heading}
          </h2>
          <p className="text-ink-body m-0 max-w-[600px] text-lg leading-[1.75] text-pretty">
            {copy.description}
          </p>
        </div>

        <div className="mt-[clamp(40px,5vw,64px)] flex flex-wrap items-center gap-3">
          <div
            role="tablist"
            aria-label="Browse by"
            className="bg-sheet-mute border-rule flex flex-none rounded-[12px] border p-1"
          >
            {tab("editions", "Editions", editionRows.length)}
            {tab("papers", "All papers", papers.length)}
          </div>
          <label className="relative block flex-[1_1_280px]">
            <span
              aria-hidden
              className="text-ink-dim pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[15px]"
            >
              ⌕
            </span>
            <input
              type="search"
              value={filters.q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="Search titles, journals and notes"
              aria-label="Search the archive"
              className={`${FIELD} placeholder:text-ink-dim w-full pr-3.5 pl-9`}
            />
          </label>
          <select
            value={filters.topic}
            onChange={(e) => set({ topic: e.target.value })}
            aria-label="Topic"
            className={`${FIELD} flex-[0_1_220px] cursor-pointer px-3.5`}
          >
            <option value="">All topics</option>
            {topicOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={filters.month}
            onChange={(e) => set({ month: e.target.value })}
            aria-label="Month"
            className={`${FIELD} flex-[0_1_190px] cursor-pointer px-3.5`}
          >
            <option value="">All months</option>
            {monthOptions.map((key) => (
              <option key={key} value={key}>
                {monthLabel(key)}
              </option>
            ))}
          </select>
        </div>

        <div
          aria-live="polite"
          className="text-ink-soft mt-4 flex min-h-6 items-center gap-3.5 text-[13px]"
        >
          <span>
            {mode === "editions" ? plural(shown, "edition") : plural(shown, "paper")}
            {filtering ? (shown === 1 ? " matches" : " match") : ""}
          </span>
          {filtering ? (
            <button
              type="button"
              onClick={clear}
              className="text-primary border-0 bg-transparent p-0 font-[inherit] font-bold"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {shown === 0 ? (
          <div className="border-rule-strong mt-6 flex flex-col items-center gap-3 rounded-[12px] border border-dashed px-6 py-14 text-center">
            <span className="font-headline text-[26px] tracking-[-0.01em]">
              Nothing matches those filters
            </span>
            <span className="text-ink-soft text-[14.5px]">
              Try a broader search, or clear the topic and month.
            </span>
            <button
              type="button"
              onClick={clear}
              className="border-rule-strong text-primary-deep mt-1.5 rounded-[10px] border bg-white px-[22px] py-3 font-[inherit] text-sm font-bold"
            >
              Clear filters
            </button>
          </div>
        ) : mode === "editions" ? (
          <div className="mt-6 flex flex-col gap-10">
            {groups.map((group) => (
              <div key={group.key} className="flex flex-col gap-3.5">
                <span className={`text-ink-soft ${MONO_LABEL}`}>{monthLabel(group.key)}</span>
                {group.rows.map(({ edition, hits }) => (
                  <EditionCard
                    key={edition.slug}
                    edition={edition}
                    match={filtering ? plural(hits, "match", "matches") : ""}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="border-rule mt-6 border-t">
            {papers.map(({ item, edition }) => (
              <PaperRow key={`${edition.slug}-${item.num}`} item={item} edition={edition} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EditionCard({ edition, match }: { edition: RareInsightsEdition; match: string }) {
  const [lead, ...rest] = edition.items;
  const topics = topicsOf(rest).slice(0, 6);

  return (
    <Link
      href={editionHref(edition.slug)}
      className="border-rule text-ink hover:border-rule-strong hover:text-ink flex flex-wrap items-center gap-x-[clamp(24px,4vw,56px)] gap-y-5 rounded-[12px] border bg-white p-[clamp(22px,2.6vw,32px)] shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-[220ms] hover:-translate-y-1 hover:shadow-[var(--shadow-card-lift)]"
    >
      <div className="flex w-[120px] flex-none flex-col gap-1.5">
        <span className={`text-teal-deep ${MONO_LABEL}`}>Edition</span>
        <span className="font-headline text-primary text-[56px] leading-[0.9] tracking-[-0.02em]">
          {edition.label.replace("Edition ", "")}
        </span>
        <time dateTime={edition.date} className="text-ink-soft text-[13px]">
          {longDate(edition.date)}
        </time>
      </div>
      <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-2.5">
        <span className={`text-primary ${MONO_LABEL}`}>Lead{lead.tag ? ` · ${lead.tag}` : ""}</span>
        <span className="font-headline text-[clamp(24px,2.6vw,32px)] leading-[1.14] tracking-[-0.015em] text-balance">
          {lead.title}
        </span>
        {topics.length ? (
          <span className="mt-1 flex flex-wrap gap-1.5">
            {topics.map((topic) => (
              <span
                key={topic}
                className="bg-sheet-mute text-ink-body rounded-full px-2.5 py-[5px] text-[12.5px]"
              >
                {topic}
              </span>
            ))}
          </span>
        ) : null}
      </div>
      <div className="ml-auto flex flex-none flex-col items-end gap-2">
        <span className={`text-ink-soft ${MONO_LABEL}`}>
          {plural(edition.items.length, "item")}
        </span>
        {match ? <span className="text-teal-deep text-[13px] font-bold">{match}</span> : null}
        <span className="text-primary text-sm font-bold">Read →</span>
      </div>
    </Link>
  );
}

function PaperRow({ item, edition }: { item: RareInsightsItem; edition: RareInsightsEdition }) {
  const deep = itemHref(edition.slug, item.num);

  return (
    <div className="border-rule flex flex-wrap gap-x-[clamp(20px,3vw,40px)] gap-y-3 border-b py-[26px]">
      <Link
        href={deep}
        className="font-mono-label text-ink-soft hover:text-primary flex w-[110px] flex-none flex-col gap-1 text-[11px] tracking-[0.08em]"
      >
        <span className="text-teal-mid text-[13px]">{item.num}</span>
        <span>
          Ed. {edition.label.replace("Edition ", "")} · {shortDate(edition.date)}
        </span>
      </Link>
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-2">
        {item.tag ? <span className={`text-primary ${MONO_LABEL}`}>{item.tag}</span> : null}
        <Link
          href={deep}
          className="font-headline text-ink hover:text-primary text-[clamp(20px,2vw,24px)] leading-[1.22] tracking-[-0.01em] text-pretty"
        >
          {item.title}
        </Link>
        <span className="text-ink-soft text-[13px]">{itemMeta(item, shortDate)}</span>
        {item.body[0] ? (
          <p className="text-ink-body m-0 mt-0.5 line-clamp-2 max-w-[680px] text-[14.5px] leading-[1.7]">
            {item.body[0]}
          </p>
        ) : null}
      </div>
      <div className="flex flex-none flex-col items-start gap-2.5 pt-[22px]">
        <Link href={deep} className="text-primary hover:text-primary-deep text-[13.5px] font-bold">
          Our note →
        </Link>
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="text-ink-body hover:text-primary text-[13.5px] font-medium"
        >
          {externalLabel(item)}
        </a>
      </div>
    </div>
  );
}
