import Image from "next/image";
import Link from "next/link";

import { SectionLabel } from "@/components/chrome/eyebrow";
import { HOME_V4_LATEST, HOME_V4_PROOF } from "@/content/home-v4";
import type { HomeSectionMeta } from "@/lib/cms/home-content";
import type { ProofResource } from "@/lib/cms/home-proof-resources";

type SectionProps = { section: HomeSectionMeta; num: string };

/** The panel colours the photo cards and the Latest cards cycle through. */
const TONE = {
  primary: "bg-primary",
  teal: "bg-teal-deep",
  deep: "bg-primary-deep",
  ink: "bg-ink",
} as const;

const LATEST_TONES = ["teal", "deep", "ink"] as const;

/**
 * 06 — where Genetico is in use.
 *
 * Two cards across the top, then three photo cards below. The filled card is
 * whichever resource is ticked "Show on the home page" on the Resources page,
 * so the case study is written once and read here; the handoff's "3 weeks →
 * 4 days" figure is deliberately not reproduced, since the study behind it is
 * unverified and the same before-and-after pair was already retired from the
 * live card. The falls-back copy stands in only when nothing is ticked.
 */
export function Proof({
  section,
  num,
  featured,
}: SectionProps & { featured: ProofResource | null }) {
  const proof = HOME_V4_PROOF;
  const fallback = proof.featuredFallback;

  /* The raw feed rather than `getHomePageContent().proof`, which fills a gap
     from the stored defaults — and those still carry the "3 weeks to 4 days"
     heading this round drops. Here an unticked Resources page falls back to
     copy that makes no figure claim at all. */
  const card = {
    kicker: featured?.kicker || fallback.kicker,
    heading: featured?.fullTitle || fallback.title,
    blurb: featured?.blurb || fallback.blurb,
    ctaLabel: fallback.ctaLabel,
    href: featured?.href || fallback.href,
  };

  return (
    <section
      id={section.id}
      data-reveal
      className="bg-dark-band px-edge pt-sect-top pb-sect-bot scroll-mt-32 text-white"
    >
      <div className="max-w-site mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex min-w-0 flex-col gap-3.5">
            <SectionLabel num={num} tone="dark">
              {section.eyebrow}
            </SectionLabel>
            <h2 className="font-headline m-0 text-[clamp(32px,4vw,50px)] leading-[1.1] tracking-[-0.018em] text-white">
              {proof.heading}
            </h2>
          </div>
          <p className="text-sky-soft m-0 max-w-[340px] text-[14.5px] leading-[1.7]">
            {proof.description}
          </p>
        </div>

        <div className="mt-[clamp(40px,5vw,56px)] grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          <Link
            href={card.href}
            className="bg-primary hover:bg-[#0F5FA3] rounded-card flex flex-col gap-2.5 p-[clamp(24px,3vw,32px)] text-white transition-colors"
          >
            <span className="font-mono-label text-sky text-[10.5px] tracking-[0.16em] uppercase">
              {card.kicker}
            </span>
            <h3 className="font-headline m-0 text-[clamp(26px,3vw,36px)] leading-[1.14] tracking-[-0.018em] text-pretty">
              {card.heading}
            </h3>
            <p className="text-sky m-0 text-[15px] leading-[1.6]">{card.blurb}</p>
            <span className="mt-2 self-start pb-1 text-sm font-bold shadow-[inset_0_-2px_0_#fff]">
              {card.ctaLabel}
            </span>
          </Link>

          <div className="rounded-card flex flex-col gap-2.5 border border-white/20 p-[clamp(24px,3vw,32px)]">
            <span className="font-mono-label text-sky-bright text-[10.5px] tracking-[0.16em] uppercase">
              {proof.network.label}
            </span>
            <span className="font-headline text-[clamp(40px,4.6vw,58px)] leading-none tracking-[-0.02em]">
              {proof.network.figure}
            </span>
            <span className="text-sky text-[15px] leading-[1.6]">{proof.network.body}</span>
          </div>
        </div>

        {/* The coloured panel overlaps the photograph above it rather than
            sitting flush, which is what stops three 4:3 pictures from reading
            as a contact sheet. It is inset so the picture shows past its edge. */}
        <div className="mt-6 grid gap-6 min-[760px]:grid-cols-3">
          {proof.cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="flex min-w-0 flex-col text-white transition-transform duration-200 ease-out hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[12px] bg-[#13283A]">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                  className="object-cover"
                  style={{ objectPosition: card.position }}
                />
              </div>
              <div
                className={`relative -mt-12 flex w-[92%] flex-col gap-2.5 px-[22px] pt-5 pb-[22px] ${TONE[card.tone]}`}
              >
                <h3 className="font-headline m-0 text-[22px] leading-[1.2] tracking-[-0.012em]">
                  {card.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.65] text-white">{card.body}</p>
                <span className="mt-1.5 self-start pb-1 text-[13.5px] font-bold shadow-[inset_0_-2px_0_#fff]">
                  Learn more
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
 * 07 — talks and coverage.
 *
 * Every card comes from the Resources page: an editor ticks "Show on the home
 * page" against a resource and it appears here, in the order the Resources
 * page already holds. Nothing on this section is written on the home page, so
 * the two cannot drift apart.
 *
 * The still is a `background-image` stack rather than an `<img>` so a YouTube
 * `maxresdefault` that does not exist falls through to the smaller still and
 * then to the panel colour, instead of breaking the card. When a resource has
 * no image at all the panel simply fills the card.
 */
export function Latest({ section, num, clips }: SectionProps & { clips: ProofResource[] }) {
  if (!clips.length) return null;

  return (
    <section
      id={section.id}
      data-reveal
      className="bg-sheet-mute px-edge pt-sect-top pb-sect-bot scroll-mt-32"
    >
      <div className="max-w-site mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex min-w-0 flex-col gap-3.5">
            <SectionLabel num={num}>{section.eyebrow}</SectionLabel>
            <h2 className="font-headline text-ink m-0 text-[clamp(32px,4vw,50px)] leading-[1.1] tracking-[-0.018em]">
              {HOME_V4_LATEST.heading}
            </h2>
          </div>
          <Link
            href={HOME_V4_LATEST.ctaHref}
            className="text-ink hover:text-primary shadow-[inset_0_-2px_0_var(--color-teal-mid)] hover:shadow-[inset_0_-2px_0_var(--color-primary)] pb-[5px] text-[15px] font-bold transition-[color,box-shadow]"
          >
            {HOME_V4_LATEST.ctaLabel}
          </Link>
        </div>

        <div className="mt-[clamp(40px,5vw,56px)] grid gap-6 min-[760px]:grid-cols-3">
          {clips.slice(0, 3).map((clip, i) => {
            const tone = TONE[LATEST_TONES[i % LATEST_TONES.length]];
            const external = /^https?:\/\//i.test(clip.href);

            return (
              <Link
                key={clip.href}
                href={clip.href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="rounded-card shadow-card hover:shadow-card-lift flex min-w-0 flex-col overflow-hidden text-white transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1"
              >
                {clip.thumbnail ? (
                  <div
                    className="aspect-video w-full bg-[#13283A] bg-cover bg-center"
                    style={{ backgroundImage: clip.thumbnail }}
                  />
                ) : null}
                <div className={`flex flex-1 flex-col gap-2.5 px-[22px] pt-[22px] pb-5 ${tone}`}>
                  <span className="font-mono-label text-[10.5px] tracking-[0.16em] text-white/[0.86] uppercase">
                    {clip.kind || clip.meta}
                  </span>
                  <h3 className="font-headline m-0 text-[22px] leading-[1.2] tracking-[-0.012em] text-pretty">
                    {clip.title}
                  </h3>
                  {/* The kind is already the label above, so the foot carries
                      just the length — "Video · 4:32" under a "VIDEO" chip
                      says the same thing twice. */}
                  <span className="mt-auto text-[13px] text-white/[0.86]">
                    {clip.duration || clip.meta}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
