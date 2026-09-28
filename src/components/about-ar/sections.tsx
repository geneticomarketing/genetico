import { Eyebrow, SectionLabel } from "@/components/chrome/eyebrow";
import { Horizons } from "@/components/about-v2/sections";
import { ABOUT_AR_MISSION, ABOUT_AR_NOW } from "@/content/about-ar";

type SectionProps = { id: string; eyebrow: string; num: string };

const pad = (i: number) => String(i + 1).padStart(2, "0");

const SECTION = "px-edge pt-sect-top pb-sect-bot scroll-mt-32";

/** 04 — why now: four changes that arrived together, as lifting cards. */
export function WhyNow({ id, eyebrow, num }: SectionProps) {
  const content = ABOUT_AR_NOW;

  return (
    <section id={id} data-reveal className={`${SECTION} bg-sheet-cool border-rule border-y`}>
      <div className="max-w-site mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex max-w-[760px] min-w-0 flex-col gap-3.5">
            <SectionLabel num={num}>{eyebrow}</SectionLabel>
            <h2 className="font-headline text-ink m-0 text-[clamp(30px,4vw,48px)] leading-[1.08] tracking-[-0.018em] text-pretty">
              {content.heading}
            </h2>
          </div>
          <p className="text-ink-body m-0 max-w-[380px] text-[14.5px] leading-[1.7]">
            {content.aside}
          </p>
        </div>

        <div className="nav:grid-cols-2 mid:grid-cols-4 mt-[clamp(40px,5vw,56px)] grid gap-[18px]">
          {content.drivers.map((driver, i) => (
            <div
              key={driver.label}
              className="border-rule rounded-card shadow-card hover:shadow-card-lift flex min-w-0 flex-col gap-3 border bg-white px-6 pt-[26px] pb-6 transition-[transform,box-shadow] duration-[220ms] ease-out hover:-translate-y-1"
            >
              <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                {pad(i)} · {driver.label}
              </span>
              <h3 className="font-headline m-0 text-[23px] leading-[1.18] tracking-[-0.015em] text-pretty">
                {driver.title}
              </h3>
              <p className="text-ink-body m-0 text-[14.5px] leading-[1.7]">{driver.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 05 — mission and vision side by side in one panel, then where Genetico is
 * going. The pair divides with a left rule side by side and a top rule once
 * stacked, so the divider always falls between them.
 */
export function Mission({ id, eyebrow, num }: SectionProps) {
  const content = ABOUT_AR_MISSION;
  const pair = [
    { label: "Mission", text: content.mission },
    { label: "Vision", text: content.vision },
  ];

  return (
    <section id={id} data-reveal className={SECTION}>
      <div className="max-w-site mx-auto">
        <Eyebrow fluid>
          {num} · {eyebrow}
        </Eyebrow>
        <h2 className="font-headline text-ink mx-auto mt-7 mb-0 max-w-[720px] text-center text-[clamp(32px,4vw,50px)] leading-[1.1] tracking-[-0.018em] text-pretty">
          {content.heading}
        </h2>

        <div className="border-rule rounded-card bg-sheet-cool nav:grid-cols-2 mt-[clamp(40px,5vw,56px)] grid border">
          {pair.map((item, i) => (
            <div
              key={item.label}
              className={`flex min-w-0 flex-col gap-3.5 p-[clamp(28px,3.4vw,44px)] ${
                i > 0 ? "border-rule nav:border-t-0 nav:border-l border-t" : ""
              }`}
            >
              <span className="font-mono-label text-primary text-[10.5px] tracking-[0.16em] uppercase">
                {item.label}
              </span>
              <p className="font-headline text-ink m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.34] tracking-[-0.012em] text-pretty">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(52px,6vw,72px)] flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-headline m-0 text-[clamp(24px,2.8vw,32px)] leading-[1.14] tracking-[-0.015em]">
            {content.horizonsHeading}
          </h3>
          <span className="font-mono-label text-ink-soft text-[10.5px] tracking-[0.14em] uppercase">
            {content.horizonsLabel}
          </span>
        </div>
        <Horizons className="mt-8" />
      </div>
    </section>
  );
}
