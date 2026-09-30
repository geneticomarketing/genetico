import type { HomeImpactContent } from "@/content/home";
import type { SectionMeta } from "@/lib/cms/sections";
import type { AboutLogo as Partner } from "@/lib/cms/about-page-data";

import { H2, Label, SECTION } from "./label";

/**
 * 05 — impact: where Genetico is deployed, and the institutions and
 * programmes it works with. The third figure is counted from the CMS awards.
 */
export function Impact({
  section,
  num,
  awardCount,
  firstAwardYear,
  logos,
  content,
}: {
  section: SectionMeta;
  num: string;
  awardCount: number;
  firstAwardYear: string;
  logos: Partner[];
  content: HomeImpactContent;
}) {
  const figures = [...content.figures];
  if (awardCount) {
    figures.push({
      label: content.awardsLabel,
      figure: `${awardCount} grants & awards`,
      body: `${firstAwardYear ? `Since ${firstAwardYear}, ` : ""}${content.awardsBody}`,
    });
  }

  return (
    <section id={section.id} className={`${SECTION} bg-sheet-cool`}>
      <div className="max-w-site mx-auto">
        <div
          data-reveal
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-end gap-x-16 gap-y-6"
        >
          <div className="flex flex-col gap-6">
            <Label num={num}>{section.eyebrow}</Label>
            <h2 className={`${H2} text-ink`}>{content.heading}</h2>
          </div>
          <p className="text-ink-body m-0 max-w-[440px] text-lg leading-[1.75] text-pretty">
            {content.description}
          </p>
        </div>

        <div
          data-reveal
          className="nav:grid-cols-3 mt-[clamp(56px,7vw,88px)] grid grid-cols-[minmax(0,1fr)] gap-x-9 gap-y-10"
        >
          {figures.map((item) => (
            <div
              key={item.label}
              className="flex min-w-0 flex-col gap-3.5 border-t border-[#D6DEE4] pt-[22px]"
            >
              <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.16em] uppercase">
                {item.label}
              </span>
              <span className="font-headline text-primary text-[clamp(36px,4.2vw,56px)] leading-none tracking-[-0.025em]">
                {item.figure}
              </span>
              <p className="text-ink-body m-0 max-w-[320px] text-base leading-[1.7]">{item.body}</p>
            </div>
          ))}
        </div>

        {logos.length ? (
          <>
            <div className="mt-[clamp(64px,8vw,104px)] flex items-center gap-4">
              <span className="font-mono-label text-ink-soft flex-none text-[11px] tracking-[0.2em] uppercase">
                {content.logosLabel}
              </span>
              <span aria-hidden className="bg-rule block h-px flex-1" />
            </div>
            <div className="mt-2 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
              <div className="flex w-max items-center motion-safe:animate-[marquee_42s_linear_infinite]">
                {[0, 1].map((copy) => (
                  <div key={copy} aria-hidden={copy === 1} className="flex items-center">
                    {logos.map((logo) => (
                      <div
                        key={logo.name}
                        role="img"
                        aria-label={logo.name}
                        className="h-[104px] w-[170px] flex-none bg-contain bg-origin-content bg-center bg-no-repeat px-5 py-[22px]"
                        style={{ backgroundImage: `url('${logo.logo}')` }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
