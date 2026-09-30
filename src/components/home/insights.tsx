import Image from "next/image";
import Link from "next/link";

import type { HomeInsightsContent } from "@/content/home";
import type { SectionMeta } from "@/lib/cms/sections";
import type { ProofResource } from "@/lib/cms/home-proof-resources";
import { RESOURCES_PATH } from "@/lib/routes";

import { H2, Label, SECTION } from "./label";

/**
 * Grounds for the list thumbnails, in turn. Each resource's own still is
 * layered over one; a resource with no image shows the ground alone, as the
 * design draws every thumbnail until real images exist.
 */
const GROUNDS = [
  "radial-gradient(120% 130% at 30% 26%,#1E4A40 0%,#0F2A25 60%,#081815 100%)",
  "radial-gradient(120% 130% at 30% 24%,#6B4A22 0%,#39240F 60%,#1C1108 100%)",
  "radial-gradient(120% 130% at 28% 22%,#1B4A72 0%,#0C2436 62%,#07121C 100%)",
  "radial-gradient(120% 130% at 30% 24%,#2A4560 0%,#13202C 62%,#0A121A 100%)",
];

/** Resources open where they live: films on YouTube, blog posts on this site. */
function ResourceLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/**
 * 06 — Insights: a featured film and the latest items beside it, all read
 * from the Resources page's entries ticked "Show on the home page". Nothing is
 * curated here; an editor changes this section from the Resources collections.
 */
export function Insights({
  section,
  num,
  featured,
  items,
  content,
  photo,
}: {
  section: SectionMeta;
  num: string;
  featured: ProofResource | null;
  items: ProofResource[];
  content: HomeInsightsContent;
  photo: { src: string; alt: string };
}) {
  return (
    <section id={section.id} className={`${SECTION} bg-white`}>
      <div className="max-w-site mx-auto">
        <div
          data-reveal
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-end gap-x-16 gap-y-6"
        >
          <div className="flex flex-col gap-6">
            <Label num={num}>{section.eyebrow}</Label>
            <h2 className={`${H2} text-ink`}>{content.heading}</h2>
          </div>
          <div className="flex flex-col items-start gap-[22px]">
            <p className="text-ink-body m-0 max-w-[440px] text-lg leading-[1.75] text-pretty">
              {content.description}
            </p>
            <Link
              href={RESOURCES_PATH}
              className="text-ink hover:border-primary hover:text-primary inline-flex items-center gap-2.5 rounded-[10px] border border-[#D6DEE4] bg-white px-[22px] py-3.5 text-[15px] font-medium transition-colors"
            >
              {content.ctaLabel} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="mid:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] mt-[clamp(56px,7vw,88px)] grid grid-cols-[minmax(0,1fr)] items-stretch gap-x-12 gap-y-7">
          {featured ? (
            <ResourceLink
              href={featured.href}
              className="relative flex min-h-[clamp(440px,44vw,560px)] min-w-0 items-end overflow-hidden rounded-[20px] bg-[#040E1A] text-white shadow-[0_40px_100px_rgba(7,59,104,0.18)] hover:text-white"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1040px) 100vw, 55vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,14,26,0.15)_0%,rgba(4,14,26,0.72)_48%,rgba(4,14,26,0.95)_100%)]"
              />
              <div className="relative flex w-full flex-col gap-[18px] p-[clamp(24px,3.4vw,44px)]">
                {featured.kicker ? (
                  <span className="font-mono-label text-mint text-[11px] tracking-[0.18em] uppercase">
                    {featured.kicker}
                  </span>
                ) : null}
                <h3 className="font-headline m-0 text-[clamp(28px,3vw,40px)] leading-[1.1] font-normal tracking-[-0.02em] text-balance">
                  {content.featuredTitle}
                </h3>
                <span className="inline-flex items-center gap-3 text-[15px] font-bold text-white">
                  <span
                    aria-hidden
                    className="text-primary flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm"
                  >
                    ▶
                  </span>
                  Watch{featured.duration ? ` · ${featured.duration}` : ""}
                </span>
              </div>
            </ResourceLink>
          ) : null}

          {items.length ? (
            <div className="flex min-w-0 flex-col">
              <span className="font-mono-label text-ink-soft pb-3 text-[10.5px] tracking-[0.16em] uppercase">
                {content.latestLabel}
              </span>
              {items.map((item, i) => (
                <ResourceLink
                  key={item.id}
                  href={item.href}
                  className="border-rule text-ink hover:text-primary flex min-w-0 items-center gap-[18px] border-t py-[18px] transition-colors"
                >
                  <span
                    aria-hidden
                    className="nav:w-32 relative flex aspect-[16/10] w-[92px] flex-none items-center justify-center overflow-hidden rounded-[10px] bg-cover bg-center"
                    style={{
                      backgroundImage: [item.thumbnail, GROUNDS[i % GROUNDS.length]]
                        .filter(Boolean)
                        .join(", "),
                    }}
                  >
                    {item.duration ? (
                      <span className="text-primary flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/92 text-[10px]">
                        ▶
                      </span>
                    ) : null}
                  </span>
                  <span className="flex min-w-0 flex-col gap-1.5">
                    <span className="font-mono-label text-primary text-[10.5px] tracking-[0.14em] uppercase">
                      {item.meta}
                    </span>
                    <span className="font-headline text-[clamp(19px,1.7vw,22px)] leading-[1.25] tracking-[-0.01em] text-pretty">
                      {item.title}
                    </span>
                    {item.kicker ? (
                      <span className="text-ink-soft text-[13px]">{item.kicker}</span>
                    ) : null}
                  </span>
                </ResourceLink>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
