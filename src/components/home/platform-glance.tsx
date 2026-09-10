import Link from "next/link";

import { Eyebrow } from "@/components/chrome/eyebrow";
import type { HomePlatformContent, HomeSectionMeta } from "@/lib/cms/home-content";

/**
 * Section 02 — the platform as four layers, from the clinic visit to the
 * national registry. Numbers come from position, so reordering the layers in
 * the CMS renumbers them.
 */
export function PlatformGlance({
  section,
  num,
  content,
}: {
  section: HomeSectionMeta;
  num: string;
  content: HomePlatformContent;
}) {
  return (
    <section id={section.id} data-reveal className="px-edge pt-sect-top pb-sect-bot scroll-mt-32">
      <div className="max-w-site mx-auto">
        <Eyebrow>
          {num} · {section.eyebrow}
        </Eyebrow>

        <h2 className="font-headline mx-auto mt-[26px] mb-3.5 max-w-[720px] text-center text-[clamp(32px,4vw,50px)] leading-[1.1] tracking-[-0.018em]">
          {content.heading}
        </h2>
        <p className="text-ink-body mx-auto m-0 max-w-[560px] text-center text-[15.5px] leading-[1.72]">
          {content.description}
        </p>

        <div className="layer-grid mt-[52px]">
          {content.layers.map((layer, i) => (
            <div key={layer.title} className="flex min-w-0 flex-col gap-3 px-6 pt-[26px] pb-[22px]">
              <div className="flex items-center gap-3">
                <span className="font-mono-label text-primary text-[11px] tracking-[0.2em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="bg-rule-light block h-px flex-1" />
              </div>
              <h3 className="font-headline m-0 text-[23px] leading-[1.14] tracking-[-0.015em]">
                {layer.title}
              </h3>
              <p className="text-ink-body m-0 text-sm leading-[1.65]">{layer.body}</p>
              <span className="font-mono-label text-ink-soft mt-auto pt-3.5 text-[10.5px] tracking-[0.14em] uppercase">
                {layer.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <Link
            href={content.cta.href}
            className="border-rule text-ink hover:border-primary hover:text-primary inline-flex items-center gap-[9px] rounded-full border bg-white px-[clamp(18px,2vw,26px)] py-[13px] text-sm font-medium transition-colors"
          >
            {content.cta.label}
            <span aria-hidden className="text-xs">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
