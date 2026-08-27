import { CtaButtons } from "@/components/landing/cta-buttons";
import { GetInTouch } from "@/components/landing/get-in-touch";
import { Reveal } from "@/components/motion/reveal";
import { DEFAULT_HOME_PAGE } from "@/lib/cms/defaults/home";
import type { PageCta } from "@/lib/cms/types";

export function HomeCta({ cta = DEFAULT_HOME_PAGE.cta }: { cta?: PageCta }) {
  return (
    <section
      id="get-in-touch"
      className="relative overflow-hidden bg-mist px-5 pt-20 sm:px-10 sm:pt-24 lg:pt-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src="/dna.svg"
          alt=""
          className="absolute top-1/2 right-[-18%] h-[140%] w-auto max-w-none -translate-y-1/2 scale-x-[-1] opacity-90"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,var(--color-mist)_35%,transparent_100%)]" />
      </div>

      <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="t-intro mx-auto">
          <h2 className="t-heading text-balance text-[#121212]">{cta.heading}</h2>
          <p className="t-subhead mt-5 text-base leading-relaxed text-black/55 sm:mt-6 sm:text-[1rem]">
            {cta.description}
          </p>
        </div>
        <CtaButtons buttons={cta.buttons} className="mt-8 mb-10 sm:mt-10" />
      </Reveal>

      <GetInTouch embedded />
    </section>
  );
}
