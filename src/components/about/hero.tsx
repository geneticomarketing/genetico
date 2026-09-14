"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { scrollToSection } from "@/components/chrome/page-sections";
import type { AboutContent, AboutPerson } from "@/lib/cms/about-page-data";

/** How long each word holds before the headline swaps it. */
const WORD_HOLD_MS = 2800;

/**
 * The About hero: credentials, a headline whose last words cycle, and a card
 * of the team's faces that leads down to the leadership grid.
 *
 * The faces overlap, so they read as one group rather than a queue. They are
 * decorative here — every person is named properly further down the page.
 */
export function AboutHero({
  content,
  faces,
}: {
  content: AboutContent["hero"];
  faces: AboutPerson[];
}) {
  const words = content.rotatingWords.length ? content.rotatingWords : [""];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), WORD_HOLD_MS);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <section
      id="top"
      className="px-edge scroll-mt-32 bg-[linear-gradient(180deg,#FAFBFC_0%,#ffffff_45%)] pt-[clamp(53px,5.5vw,76px)] pb-[clamp(67px,7vw,96px)]"
    >
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-[26px] text-center">
        {content.credentials.length ? (
          <div className="font-mono-label text-ink-body flex flex-wrap items-center justify-center gap-2.5 text-[10.5px] tracking-[0.16em] uppercase">
            {content.credentials.map((credential, i) => (
              <span key={credential} className="flex items-center gap-2.5">
                {i > 0 ? (
                  <span aria-hidden className="block h-[3px] w-[3px] rounded-full bg-[#C6CCD2]" />
                ) : null}
                {credential}
              </span>
            ))}
          </div>
        ) : null}

        <h1 className="font-headline text-ink m-0 text-[clamp(40px,5.6vw,66px)] leading-[1.06] tracking-[-0.015em]">
          {content.headline}{" "}
          <span
            key={index}
            className={`text-primary inline-block ${
              index % 2 === 0
                ? "motion-safe:animate-[word-in-a_.62s_cubic-bezier(.22,.61,.36,1)_both]"
                : "motion-safe:animate-[word-in-b_.62s_cubic-bezier(.22,.61,.36,1)_both]"
            }`}
          >
            {words[index]}
          </span>
        </h1>

        {content.blurb ? (
          <p className="text-ink-body m-0 max-w-[620px] text-base leading-[1.68]">
            {content.blurb}
          </p>
        ) : null}

        <Link
          href={content.ctaHref}
          onClick={(e) => {
            if (!content.ctaHref.startsWith("#")) return;
            e.preventDefault();
            scrollToSection(content.ctaHref.slice(1));
          }}
          className="bg-primary-deep hover:bg-primary inline-flex items-center gap-[9px] rounded-full px-[clamp(18px,2vw,28px)] py-[13px] text-sm font-bold text-white transition-colors"
        >
          {content.ctaLabel}
          <span aria-hidden className="text-[13px]">
            →
          </span>
        </Link>
      </div>

      {faces.length ? (
        <div className="border-rule rounded-card mx-auto mt-16 flex max-w-[1040px] flex-col items-center gap-[26px] border bg-[linear-gradient(180deg,#F3F7FA_0%,#FAFCFD_100%)] px-[clamp(20px,4vw,32px)] pt-[clamp(32px,3.4vw,46px)] pb-[clamp(28px,2.9vw,40px)]">
          <div aria-hidden className="flex flex-wrap justify-center pl-4">
            {faces.map((person) => (
              <div
                key={person.id}
                title={person.name}
                className="relative -ml-4 flex h-[62px] w-[62px] items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-[#E6EBEF] shadow-[0_4px_14px_rgba(18,22,26,0.10)]"
              >
                <span className="font-headline text-ink-dim text-[22px]">{person.initials}</span>
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt=""
                    fill
                    sizes="62px"
                    className="absolute inset-0 object-cover"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <p className="font-headline text-ink m-0 max-w-[520px] text-[22px] leading-[1.4]">
              {content.teamCardText}
            </p>
            <a
              href="#team"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("team");
              }}
              className="font-mono-label text-primary inline-flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase"
            >
              {content.teamCardLinkLabel}
              <span aria-hidden className="text-xs">
                ↓
              </span>
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
