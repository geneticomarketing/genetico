import type { RareInsightsCopy } from "@/lib/cms/rare-insights-data";

/**
 * The dark sign-up band at the foot of /rare-insights and every edition.
 * Signing up happens on Mailchimp; this only links out to it.
 */
export function RareInsightsSubscribe({
  copy,
  subscribeUrl,
}: {
  copy: RareInsightsCopy["subscribe"];
  subscribeUrl: string;
}) {
  return (
    <section
      id="subscribe"
      className="px-edge relative scroll-mt-16 overflow-hidden bg-[image:var(--gradient-dark-band)] py-[clamp(96px,12vw,160px)] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_80%_at_50%_50%,#000_0%,transparent_100%)] bg-[linear-gradient(rgba(143,198,239,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(143,198,239,0.07)_1px,transparent_1px)] bg-[size:64px_64px]"
      />
      <div
        data-reveal
        className="relative mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center"
      >
        <div className="flex items-center gap-3.5">
          <span
            aria-hidden
            className="h-px w-14 bg-[linear-gradient(90deg,rgba(143,198,239,0),#8FC6EF)]"
          />
          <span className="font-mono-label text-sky-bright text-[11px] tracking-[0.2em] uppercase">
            {copy.eyebrow}
          </span>
          <span
            aria-hidden
            className="h-px w-14 bg-[linear-gradient(90deg,#8FC6EF,rgba(143,198,239,0))]"
          />
        </div>
        <h2 className="font-headline m-0 text-[clamp(38px,5.2vw,68px)] leading-[1.06] font-normal tracking-[-0.02em] text-balance text-white">
          {copy.heading}
        </h2>
        <p className="text-sky m-0 max-w-[560px] text-lg leading-[1.75] text-pretty">
          {copy.description}
        </p>
        <a
          href={subscribeUrl}
          target="_blank"
          rel="noreferrer"
          className="text-primary-deep hover:bg-sky hover:text-primary-deep mt-2 inline-flex items-center gap-2.5 rounded-[10px] bg-white px-7 py-[15px] text-[15px] font-bold transition-colors"
        >
          {copy.buttonLabel} <span aria-hidden>↗</span>
        </a>
        <span className="text-sky-soft text-[13px]">{copy.note}</span>
      </div>
    </section>
  );
}
