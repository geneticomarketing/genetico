"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa6";

import { Eyebrow } from "@/components/chrome/eyebrow";
import type { AboutContent, AboutPerson } from "@/lib/cms/about-page-data";

/** How much of a bio fits on a card before it is cut. */
const CARD_BIO_CHARS = 96;

function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/[\s,.;]+$/, "")}…`;
}

function Portrait({ person, className }: { person: AboutPerson; className: string }) {
  return (
    <div
      className={`bg-[#E6EBEF] relative flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* The initials sit underneath, so a person with no photo still reads as
          a portrait rather than an empty box. */}
      <span aria-hidden className="font-headline text-ink-dim text-[44px]">
        {person.initials}
      </span>
      {person.photo ? (
        <Image
          src={person.photo}
          alt=""
          fill
          sizes="(max-width: 880px) 50vw, 250px"
          className="absolute inset-0 object-cover"
        />
      ) : null}
    </div>
  );
}

function PersonCard({ person, onOpen }: { person: AboutPerson; onOpen: () => void }) {
  return (
    <div className="border-rule rounded-card flex flex-col overflow-hidden border bg-white transition-shadow duration-200 hover:shadow-[0_16px_38px_rgba(18,22,26,0.09)]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Read ${person.name}'s profile`}
        className="flex flex-1 cursor-pointer flex-col text-left"
      >
        <Portrait person={person} className="aspect-square w-full" />
        <div className="flex flex-1 flex-col gap-[9px] px-[18px] pt-[18px] pb-4">
          <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
            {person.role}
          </span>
          <h3 className="text-ink m-0 text-[16.5px] font-medium tracking-[-0.005em]">
            {person.name}
          </h3>
          <p className="text-ink-body m-0 text-[13px] leading-[1.55]">
            {clip(person.bio, CARD_BIO_CHARS)}
          </p>
          <span className="text-primary mt-auto inline-flex items-center gap-[5px] pt-3 text-[13px] font-medium">
            View profile
            <span aria-hidden className="text-[11px]">
              ↗
            </span>
          </span>
        </div>
      </button>
      {person.linkedin ? (
        <a
          href={person.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${person.name} on LinkedIn`}
          className="border-rule text-primary hover:border-primary mx-[18px] mb-4 flex h-[26px] w-[26px] items-center justify-center self-end rounded-full border transition-colors hover:bg-[#F2F7FB]"
        >
          <FaLinkedinIn size={11} aria-hidden />
        </a>
      ) : null}
    </div>
  );
}

/** The label-and-rule that opens each row of the grid. */
function RowLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono-label text-ink-soft flex-none text-[11px] tracking-[0.2em] uppercase">
        {children}
      </span>
      <span aria-hidden className="bg-rule block h-px flex-1" />
    </div>
  );
}

/**
 * Section 02 — the leadership grid and the profile dialog behind it.
 *
 * The card shows a clipped bio; the full one lives in the dialog, which traps
 * focus, closes on Escape or a click outside, and hands focus back to the card
 * that opened it.
 */
export function Leadership({
  content,
  num,
  eyebrowLabel,
}: {
  content: AboutContent["leadership"];
  num: string;
  eyebrowLabel: string;
}) {
  const [open, setOpen] = useState<AboutPerson | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(null), []);

  const openPerson = useCallback((person: AboutPerson) => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpen(person);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;

      // Keep tabbing inside the dialog while it is open.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener.current?.focus();
    };
  }, [open, close]);

  const rows: [string, AboutPerson[]][] = [
    ["Team", content.team],
    ["Advisors & Mentors", content.advisors],
  ];

  return (
    <section
      id="team"
      data-reveal
      className="px-edge scroll-mt-32 bg-[linear-gradient(180deg,#F4F6F8_0%,#FAFBFC_100%)] pt-[clamp(67px,7vw,96px)] pb-[clamp(73px,7.6vw,104px)]"
    >
      <div className="max-w-site mx-auto">
        <Eyebrow>
          {num} · {eyebrowLabel}
        </Eyebrow>
        <h2 className="font-headline mt-[22px] mb-3.5 text-center text-[clamp(38px,5vw,58px)] leading-[1.06] tracking-[-0.02em]">
          {content.heading}
        </h2>
        <p className="text-ink-body mx-auto m-0 max-w-[390px] text-center text-[14.5px] leading-[1.65]">
          {content.subtitle}
        </p>

        {rows.map(([label, people], i) =>
          people.length ? (
            <div key={label} className={i === 0 ? "mt-[52px]" : "mt-11"}>
              <RowLabel>{label}</RowLabel>
              <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                {people.map((person) => (
                  <PersonCard key={person.id} person={person} onOpen={() => openPerson(person)} />
                ))}
              </div>
            </div>
          ) : null,
        )}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(7,18,28,0.55)] p-5"
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-person-name"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="rounded-card max-h-[85vh] w-full max-w-[560px] overflow-y-auto bg-white p-[clamp(24px,3vw,34px)] shadow-[0_30px_80px_rgba(7,18,28,0.35)] outline-none"
          >
            <div className="flex items-start gap-5">
              <Portrait person={open} className="h-[84px] w-[84px] flex-none rounded-full" />
              <div className="flex min-w-0 flex-col gap-1.5">
                <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                  {open.role}
                </span>
                <h3
                  id="about-person-name"
                  className="font-headline text-ink m-0 text-[26px] leading-[1.2] tracking-[-0.015em]"
                >
                  {open.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close profile"
                className="border-rule text-ink-soft hover:border-primary hover:text-primary ml-auto flex h-8 w-8 flex-none cursor-pointer items-center justify-center rounded-full border text-lg leading-none transition-colors"
              >
                ×
              </button>
            </div>

            <p className="text-ink-body mt-5 mb-0 text-[14.5px] leading-[1.7]">{open.bio}</p>

            {open.linkedin ? (
              <a
                href={open.linkedin}
                target="_blank"
                rel="noreferrer"
                className="border-rule text-primary hover:border-primary hover:bg-primary-tint mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition-colors"
              >
                <FaLinkedinIn size={12} aria-hidden />
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
