import Link from "next/link";

import { SectionLabel } from "@/components/chrome/eyebrow";
import type { HomeAudienceContent, HomeSectionMeta } from "@/lib/cms/home-content";

/**
 * Section 01 — three doors, one per audience the site serves.
 *
 * Placed immediately under the hero so a visitor who already knows who they
 * are can leave for their own page without reading the rest.
 */
export function AudienceDoors({
  section,
  num,
  content,
}: {
  section: HomeSectionMeta;
  num: string;
  content: HomeAudienceContent;
}) {
  return (
    <section
      id={section.id}
      data-reveal
      className="bg-sheet-soft border-rule-light px-edge scroll-mt-32 border-b pt-[clamp(64px,7vw,92px)] pb-[clamp(68px,7vw,96px)]"
    >
      <div className="max-w-site mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-[18px]">
          <div className="flex min-w-0 flex-col gap-3.5">
            <SectionLabel num={num}>{section.eyebrow}</SectionLabel>
            <h2 className="font-headline m-0 text-[clamp(30px,3.8vw,46px)] leading-[1.1] tracking-[-0.018em]">
              {content.heading}
            </h2>
          </div>
          <p className="text-ink-body m-0 max-w-[380px] text-[14.5px] leading-[1.65]">
            {content.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
          {content.doors.map((door) => (
            <Link
              key={door.href}
              href={door.href}
              className="border-rule rounded-card shadow-card hover:shadow-card-lift text-ink flex flex-col gap-3.5 border bg-white px-6 pt-[26px] pb-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1"
            >
              <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                {door.kicker}
              </span>
              <h3 className="font-headline m-0 text-[clamp(24px,2.8vw,30px)] leading-[1.14] tracking-[-0.015em]">
                {door.title}
              </h3>
              <p className="text-ink-body m-0 text-[14.5px] leading-[1.65]">{door.blurb}</p>

              <div className="border-rule-light mt-2 flex flex-col gap-2 border-t pt-4">
                {door.points.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="bg-teal mt-[7px] block h-[5px] w-[5px] flex-none rounded-full"
                    />
                    <span className="text-ink-body text-[13.5px] leading-[1.55]">{point}</span>
                  </div>
                ))}
              </div>

              <span className="text-primary mt-3 inline-flex items-center gap-[7px] text-[13.5px] font-bold">
                {door.ctaLabel}
                <span aria-hidden className="text-xs">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
