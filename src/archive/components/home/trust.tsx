import { SectionLabel } from "@/components/chrome/eyebrow";
import type { HomeSectionMeta, HomeTrustContent } from "@/lib/cms/home-content";

/**
 * Section 04 — the security and compliance band.
 *
 * The one dark stretch between the hero and the footer, so it reads as a
 * statement rather than another card grid. Point numbers come from position.
 */
export function Trust({
  section,
  num,
  content,
  columns = "auto",
}: {
  section: HomeSectionMeta;
  num: string;
  content: HomeTrustContent;
  /**
   * `fixed` sets the track count per breakpoint — five across, then two with
   * the last point spanning both, then one — so no width leaves a single
   * orphaned point on its own row, as `auto` can.
   */
  columns?: "auto" | "fixed";
}) {
  return (
    <section
      id={section.id}
      data-reveal
      className="bg-dark-band px-edge scroll-mt-32 pt-[clamp(52px,6vw,64px)] pb-[clamp(54px,6vw,68px)] text-white"
    >
      <div className="max-w-site mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-2.5">
            <SectionLabel num={num} tone="dark">
              {section.eyebrow}
            </SectionLabel>
            <h2 className="font-headline m-0 text-[clamp(26px,3vw,36px)] leading-[1.14] tracking-[-0.015em] text-white">
              {content.heading}
            </h2>
          </div>
          <p className="text-sky m-0 max-w-[320px] text-sm leading-[1.65]">{content.description}</p>
        </div>

        <div
          className={`mt-[34px] grid gap-[18px] ${
            columns === "fixed"
              ? "nav:grid-cols-2 mid:grid-cols-5 grid-cols-1 gap-x-[26px]"
              : "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
          }`}
        >
          {content.points.map((point, i) => (
            <div
              key={point}
              className={`flex min-w-0 flex-col gap-[9px] border-t border-white/28 pt-4 ${
                columns === "fixed" && i === content.points.length - 1 && i % 2 === 0
                  ? "nav:col-span-2 mid:col-span-1"
                  : ""
              }`}
            >
              <span className="font-mono-label text-mint text-[10.5px] tracking-[0.14em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="m-0 text-sm leading-[1.6] text-white">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
