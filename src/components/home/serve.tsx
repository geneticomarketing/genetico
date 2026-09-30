import Image from "next/image";
import Link from "next/link";

import { HOME_SERVE_DOORS, type HomeServeContent } from "@/content/home";
import type { SectionMeta } from "@/lib/cms/sections";

import { H2, LEAD, Label, SECTION } from "./label";

const SNIPPET_LABEL = "font-mono-label text-ink-soft text-[10px] tracking-[0.14em] uppercase";

/** The slice of interface floated over each audience's photograph. */
function Snippet({ kind }: { kind: (typeof HOME_SERVE_DOORS)[number]["snippet"] }) {
  if (kind === "cohort") {
    return (
      <>
        <span className={SNIPPET_LABEL}>Cohort query · 3 sites</span>
        <div className="flex flex-wrap gap-[5px]">
          <span className="bg-primary-tint text-primary-deep rounded-md px-2 py-1 text-xs">
            MPS spectrum
          </span>
          <span className="bg-primary-tint text-primary-deep rounded-md px-2 py-1 text-xs">
            Age 2–10
          </span>
          <span className="bg-teal-tint text-teal-deep rounded-md px-2 py-1 text-xs">
            Genotyped
          </span>
        </div>
      </>
    );
  }

  const [label, name, value, bar] =
    kind === "score"
      ? ["RAPID score · ranked", "Mucopolysaccharidosis I", "0.92", "bg-primary"]
      : ["Registry completeness", "Centre A", "86%", "bg-teal-mid"];
  const width = kind === "score" ? "92%" : "86%";

  return (
    <>
      <span className={SNIPPET_LABEL}>{label}</span>
      <div className="flex flex-col gap-[5px]">
        <div className="flex justify-between gap-2 text-[13px]">
          <span className="font-medium">{name}</span>
          <span className="font-mono-label text-primary">{value}</span>
        </div>
        <span className="block h-1 overflow-hidden rounded-sm bg-[#EDF0F2]">
          <span className={`block h-full rounded-sm ${bar}`} style={{ width }} />
        </span>
      </div>
    </>
  );
}

/** 04 — who we serve: a photo card per audience, each opening its solution page. */
export function Serve({
  section,
  num,
  content,
  doors,
}: {
  section: SectionMeta;
  num: string;
  content: HomeServeContent;
  /** Per card, by position: destination, photo and interface snippet. */
  doors: readonly {
    href: string;
    snippet: (typeof HOME_SERVE_DOORS)[number]["snippet"];
    photo: { src: string; position: string; alt: string };
  }[];
}) {
  return (
    <section id={section.id} className={SECTION}>
      <div className="max-w-site mx-auto">
        <div
          data-reveal
          className="mx-auto flex max-w-[880px] flex-col items-center gap-6 text-center"
        >
          <Label num={num}>{section.eyebrow}</Label>
          <h2 className={`${H2} text-ink`}>{content.heading}</h2>
          <p className={`${LEAD} text-ink-body`}>{content.description}</p>
        </div>

        <div
          data-reveal
          className="nav:grid-cols-3 mt-[clamp(56px,7vw,88px)] grid grid-cols-[minmax(0,1fr)] gap-[22px]"
        >
          {content.doors.slice(0, doors.length).map((copy, i) => {
            const door = { ...doors[i], ...copy };
            return (
              <Link
                key={door.href}
                href={door.href}
                className="border-rule text-ink hover:text-ink relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border bg-white shadow-[0_18px_44px_rgba(7,59,104,0.08)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_34px_80px_rgba(7,59,104,0.18)]"
              >
                <div className="relative h-[clamp(260px,26vw,340px)] overflow-hidden bg-[#0C2436]">
                  <Image
                    src={door.photo.src}
                    alt={door.photo.alt}
                    fill
                    sizes="(max-width: 880px) 100vw, 33vw"
                    className="object-cover"
                    style={{ objectPosition: door.photo.position }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,14,26,0)_35%,rgba(4,14,26,0.55)_100%)]"
                  />
                  <span className="font-mono-label text-ink absolute top-4 left-4 rounded-full bg-white/92 px-[11px] py-[5px] text-[10px] tracking-[0.14em] uppercase">
                    {door.kicker}
                  </span>
                  <div
                    aria-hidden
                    className="absolute right-4 bottom-4 left-4 flex flex-col gap-2 rounded-xl bg-white px-3.5 py-3 shadow-[0_18px_40px_rgba(4,14,26,0.30)]"
                  >
                    <Snippet kind={door.snippet} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3.5 p-[clamp(24px,2.6vw,32px)]">
                  <h3 className="font-headline m-0 text-[clamp(26px,2.6vw,32px)] leading-[1.12] font-normal tracking-[-0.016em] text-balance">
                    {door.title}
                  </h3>
                  <p className="text-ink-body m-0 text-[16.5px] leading-[1.7]">{door.body}</p>
                  <span className="text-primary mt-auto inline-flex items-center gap-2 pt-3.5 text-[15px] font-bold">
                    {door.ctaLabel} <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <span className="text-ink-dim mt-4 block text-xs">{content.caption}</span>
      </div>
    </section>
  );
}
