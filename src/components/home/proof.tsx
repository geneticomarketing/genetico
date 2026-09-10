import Link from "next/link";

import { Eyebrow } from "@/components/chrome/eyebrow";
import {
  PROOF_CLIP_PLACEHOLDERS,
  PROOF_FEATURED_PLACEHOLDER,
  type HomeProofContent,
  type HomeSectionMeta,
} from "@/lib/cms/home-content";
import type { Partner } from "@/lib/cms/types";

const CARD =
  "border-rule rounded-card shadow-card hover:shadow-card-lift text-ink border bg-white " +
  "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1";

/** The play glyph over a still. Decorative — the link text already says so. */
function PlayBadge({ size }: { size: number }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 z-[2] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/94"
      style={{ width: size, height: size, fontSize: size * 0.29 }}
    >
      <span className="text-primary">▶</span>
    </span>
  );
}

/**
 * Section 03 — who is already using this: a partner marquee, the AIIMS case
 * study, and three clips from the resource library.
 *
 * The thumbnails are gradient placeholders. The design ships seventeen empty
 * image slots because the client has not supplied stills yet, so rather than
 * inventing artwork these render as coloured grounds that a real image
 * replaces without any layout change.
 */
export function Proof({
  section,
  num,
  content,
  partners,
}: {
  section: HomeSectionMeta;
  num: string;
  content: HomeProofContent;
  partners: Partner[];
}) {
  return (
    <section
      id={section.id}
      data-reveal
      className="bg-sheet-soft border-rule-light px-edge scroll-mt-32 border-t pt-[clamp(62px,6.5vw,88px)] pb-[clamp(68px,7vw,96px)]"
    >
      <div className="max-w-site mx-auto">
        <Eyebrow>
          {num} · {section.eyebrow}
        </Eyebrow>

        <h2 className="font-headline mx-auto mt-[26px] max-w-[680px] text-center text-[clamp(32px,4vw,50px)] leading-[1.1] tracking-[-0.018em]">
          {content.heading}
        </h2>

        {partners.length ? (
          <div className="border-rule mt-11 overflow-hidden border-t border-b [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
            <div className="flex w-max items-center motion-safe:animate-[marquee_42s_linear_infinite]">
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex items-center">
                  {partners.map((partner) => (
                    <div
                      key={partner.name}
                      role="img"
                      aria-label={partner.name}
                      className="h-[104px] w-[170px] flex-none bg-contain bg-origin-content bg-center bg-no-repeat px-5 py-[22px]"
                      style={{ backgroundImage: `url('${partner.logo}')` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mid:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] mt-10 grid gap-[18px]">
          <Link href={content.featured.href} className={`${CARD} flex flex-col overflow-hidden`}>
            <div
              className="relative h-[clamp(180px,19vw,250px)] w-full"
              style={{ backgroundImage: PROOF_FEATURED_PLACEHOLDER }}
            >
              <span className="pointer-events-none absolute top-4 left-4 z-[2] flex items-center gap-2 rounded-full border border-white/22 bg-[rgba(7,18,28,0.72)] px-3 py-1.5 text-[10px] tracking-[0.16em] text-white uppercase">
                <span aria-hidden className="bg-teal block h-1.5 w-1.5 rounded-full" />
                <span className="font-mono-label">{content.featured.badge}</span>
              </span>
              <span className="font-mono-label pointer-events-none absolute right-3.5 bottom-3.5 z-[2] rounded-full bg-[rgba(7,18,28,0.72)] px-2.5 py-[5px] text-[11px] text-white">
                {content.featured.duration}
              </span>
              <PlayBadge size={58} />
            </div>

            <div className="flex flex-col gap-3.5 px-[30px] pt-[26px] pb-7">
              <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                {content.featured.kicker}
              </span>
              <h3 className="font-headline m-0 text-[clamp(24px,2.9vw,34px)] leading-[1.14] tracking-[-0.015em] text-pretty">
                {content.featured.heading}
              </h3>
              <p className="text-ink-body m-0 max-w-[520px] text-[14.5px] leading-[1.7]">
                {content.featured.blurb}
              </p>

              {/* The before-and-after is a claim about this particular case
                  study, not something every resource has, so it only appears
                  when an editor has written both halves. */}
              {content.featured.before && content.featured.after ? (
                <div className="mt-1.5 flex flex-wrap items-baseline gap-2.5">
                  <span className="font-mono-label text-ink-dim text-[26px] line-through">
                    {content.featured.before}
                  </span>
                  <span aria-hidden className="text-teal text-[15px]">
                    →
                  </span>
                  <span className="font-mono-label text-primary text-[30px]">
                    {content.featured.after}
                  </span>
                </div>
              ) : null}

              <span className="text-primary mt-2 inline-flex items-center gap-[7px] text-[13.5px] font-bold">
                {content.featured.ctaLabel}
                <span aria-hidden className="text-xs">
                  →
                </span>
              </span>
            </div>
          </Link>

          <div className="flex min-w-0 flex-col gap-3.5">
            {content.clips.map((clip, i) => (
              <Link
                key={clip.title}
                href={clip.href}
                className={`${CARD} flex items-center gap-3.5 p-3`}
              >
                <div
                  className="relative h-[74px] w-[120px] flex-none overflow-hidden rounded-lg"
                  style={{
                    backgroundImage: PROOF_CLIP_PLACEHOLDERS[i % PROOF_CLIP_PLACEHOLDERS.length],
                  }}
                >
                  <PlayBadge size={30} />
                </div>
                <div className="flex min-w-0 flex-col gap-[7px]">
                  <span className="font-mono-label text-ink-soft text-[10px] tracking-[0.14em] uppercase">
                    {clip.meta}
                  </span>
                  <span className="text-[14.5px] leading-[1.4] font-medium tracking-[-0.005em] text-pretty">
                    {clip.title}
                  </span>
                </div>
              </Link>
            ))}

            <Link
              href={content.allResourcesHref}
              className="rounded-card text-primary hover:border-primary hover:bg-primary-tint flex items-center justify-between gap-2.5 border border-dashed border-[#D6DEE4] px-[22px] py-3.5 text-[13.5px] font-medium transition-colors"
            >
              {content.allResourcesLabel}
              <span aria-hidden className="text-xs">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
