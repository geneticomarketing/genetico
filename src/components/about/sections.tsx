import { Eyebrow, SectionLabel } from "@/components/chrome/eyebrow";
import type { AboutContent, AboutLogo } from "@/lib/cms/about-page-data";

/**
 * Section 01 — what Genetico exists to solve.
 *
 * The first foundation is set as a full-width statement and the rest sit side
 * by side beneath it, so the problem reads before the response to it. Numbers
 * come from position, so reordering in the CMS renumbers them.
 */
export function Vision({ content, num }: { content: AboutContent["vision"]; num: string }) {
  const [lead, ...rest] = content.items;

  return (
    <section
      id="vision"
      data-reveal
      className="px-edge scroll-mt-32 pt-[clamp(67px,7vw,96px)] pb-[clamp(73px,7.6vw,104px)]"
    >
      <div className="max-w-site mx-auto">
        <Eyebrow>
          {num} · {content.eyebrow}
        </Eyebrow>
        <h2 className="font-headline mx-auto mt-7 max-w-[660px] text-center text-[clamp(32px,4vw,50px)] leading-[1.14] tracking-[-0.015em]">
          {content.heading}
        </h2>

        {lead ? (
          <div className="border-rule rounded-card bg-sheet-cool mx-auto mt-16 flex max-w-[900px] flex-col items-center gap-[22px] border p-[clamp(32px,4vw,52px)] text-center">
            <SectionLabel num="01">{lead.title}</SectionLabel>
            <p className="font-headline text-ink m-0 max-w-[760px] text-[clamp(21px,2.4vw,29px)] leading-[1.42] tracking-[-0.01em] text-pretty">
              {lead.body}
            </p>
          </div>
        ) : null}

        {rest.length ? (
          <div className="mx-auto mt-14 grid max-w-[1000px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(32px,5vw,72px)]">
            {rest.map((item, i) => (
              <div key={item.title} className="flex flex-col gap-3.5">
                <SectionLabel num={String(i + 2).padStart(2, "0")}>{item.title}</SectionLabel>
                <h3 className="font-headline m-0 text-[clamp(20px,2.1vw,26px)] leading-[1.34] tracking-[-0.01em]">
                  {item.body}
                </h3>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Section 03 — grants and awards on a timeline.
 *
 * Cards alternate either side of a centre line from the `mid` breakpoint;
 * below it they stack against a line on the left, because two columns of
 * 280px do not fit and a zig-zag in a narrow column reads as a mistake.
 */
export function Recognition({
  content,
  num,
}: {
  content: AboutContent["recognition"];
  num: string;
}) {
  return (
    <section
      id="recognition"
      data-reveal
      className="px-edge scroll-mt-32 bg-[radial-gradient(120%_90%_at_15%_0%,#04253F_0%,#0A4577_55%,#0C5493_100%)] pt-[clamp(67px,7vw,96px)] pb-[clamp(73px,7.6vw,104px)] text-white"
    >
      <div className="max-w-site mx-auto">
        <div className="flex items-center justify-center gap-[22px]">
          <span
            aria-hidden
            className="block h-px w-[72px] shrink-0 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.55))]"
          />
          <span className="font-mono-label text-center text-[11px] tracking-[0.2em] text-white uppercase">
            {num} · {content.eyebrow}
          </span>
          <span
            aria-hidden
            className="block h-px w-[72px] shrink-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.55),rgba(255,255,255,0))]"
          />
        </div>

        <h2 className="font-headline mt-6 mb-4 text-center text-[clamp(34px,4.6vw,54px)] leading-[1.06] tracking-[-0.02em]">
          {content.heading}
        </h2>
        <p className="mx-auto m-0 max-w-[470px] text-center text-[14.5px] leading-[1.65] text-[#B7CCDD]">
          {content.description}
        </p>

        <ol className="relative mt-16 list-none p-0">
          <span
            aria-hidden
            className="mid:left-1/2 absolute top-0 bottom-0 left-[7px] w-px bg-white/25"
          />
          {content.awards.map((award, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={award.id}
                className="mid:grid-cols-[1fr_1fr] mid:gap-x-14 relative grid grid-cols-[1fr] items-center gap-y-3 pb-10 pl-9 last:pb-0 mid:pl-0"
              >
                <span
                  aria-hidden
                  className="mid:left-1/2 mid:-translate-x-1/2 absolute top-2 left-0 block h-[15px] w-[15px] rounded-full border-[3px] border-[#0A4577] bg-[#63C9B6]"
                />
                <div
                  className={`flex flex-col gap-2 ${
                    right ? "mid:col-start-2 mid:items-start" : "mid:col-start-1 mid:items-end"
                  }`}
                >
                  <div className="rounded-card flex max-w-[420px] items-center gap-3.5 border border-white/22 bg-white/10 px-[18px] py-3.5 backdrop-blur-[6px]">
                    {award.logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={award.logo}
                        alt=""
                        className="h-[34px] w-[34px] flex-none rounded-full bg-white object-contain p-[3px]"
                      />
                    ) : null}
                    <div className="flex flex-col gap-1">
                      <span className="text-[14.5px] leading-[1.3] font-bold">{award.title}</span>
                      {award.organisation ? (
                        <span className="font-mono-label text-mint text-[10.5px] tracking-[0.1em] uppercase">
                          {award.organisation}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-sm text-[#9FBDD6] ${
                    right
                      ? "mid:col-start-1 mid:row-start-1 mid:text-right"
                      : "mid:col-start-2 mid:row-start-1"
                  }`}
                >
                  {award.year}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** One scrolling row of logos. Hidden entirely when it has nothing in it. */
function LogoRow({
  label,
  logos,
  size,
}: {
  label: string;
  logos: AboutLogo[];
  /** `lead` is the larger, full-strength row; `quiet` sits beneath it. */
  size: "lead" | "quiet";
}) {
  if (!logos.length) return null;
  const lead = size === "lead";

  return (
    <>
      <div className={`flex items-center gap-4 ${lead ? "mt-14" : "mt-12"}`}>
        <span className="font-mono-label text-ink-soft flex-none text-[11px] tracking-[0.2em] uppercase">
          {label}
        </span>
        <span aria-hidden className="bg-rule block h-px flex-1" />
      </div>
      <div
        className={`mt-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)] ${
          lead ? "border-rule-light border-b" : ""
        }`}
      >
        <div
          className={`flex w-max items-center ${
            lead
              ? "motion-safe:animate-[marquee_42s_linear_infinite]"
              : "motion-safe:animate-[marquee-reverse_52s_linear_infinite]"
          }`}
        >
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center">
              {logos.map((logo) => (
                <div
                  key={logo.name}
                  role="img"
                  aria-label={logo.name}
                  className={`flex flex-none items-center justify-center bg-contain bg-center bg-no-repeat ${
                    lead ? "h-[112px] w-[180px] p-5" : "h-[92px] w-[150px] p-[18px] opacity-72"
                  }`}
                  style={{ backgroundImage: `url('${logo.logo}')` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/** Section 04 — who Genetico works with, and who backs it. */
export function Partners({ content, num }: { content: AboutContent["partners"]; num: string }) {
  return (
    <section
      id="partners"
      data-reveal
      className="px-edge scroll-mt-32 pt-[clamp(67px,7vw,96px)] pb-[clamp(73px,7.6vw,104px)]"
    >
      <div className="max-w-site mx-auto">
        <Eyebrow>{num} · Partners</Eyebrow>
        <div className="mx-auto mt-6 flex max-w-[760px] flex-col gap-[18px] text-center">
          <h2 className="font-headline m-0 text-[clamp(32px,4.2vw,50px)] leading-[1.1] tracking-[-0.018em]">
            {content.heading}
          </h2>
          {content.description ? (
            <p className="text-ink-body m-0 text-[14.5px] leading-[1.65]">{content.description}</p>
          ) : null}
        </div>

        <LogoRow
          label="Institutional & clinical partners"
          logos={content.institutions}
          size="lead"
        />
        <LogoRow label="Supported by" logos={content.supporters} size="quiet" />
      </div>
    </section>
  );
}

/** Section 05 — the security strip, sharing its points with the home page. */
export function Trust({ content, num }: { content: AboutContent["trust"]; num: string }) {
  return (
    <section
      id="trust"
      data-reveal
      className="bg-sheet-cool border-rule px-edge scroll-mt-32 border-t border-b py-[clamp(39px,4.1vw,56px)]"
    >
      <div className="max-w-site mx-auto grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-start gap-x-14 gap-y-9">
        <div className="flex flex-col gap-2.5">
          <span className="font-mono-label text-primary text-[11px] tracking-[0.2em] uppercase">
            {num} · {content.eyebrow}
          </span>
          <h2 className="font-headline m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.25] tracking-[-0.012em]">
            {content.heading}
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-10 gap-y-3.5">
          {content.points.map((point) => (
            <div key={point} className="flex items-start gap-[11px]">
              <span
                aria-hidden
                className="bg-primary mt-[7px] block h-[5px] w-[5px] flex-none rounded-full"
              />
              <p className="text-ink-body m-0 text-[14.5px] leading-[1.55]">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
