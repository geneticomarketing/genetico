import { CtaButtons } from "@/components/landing/cta-buttons";
import { GetInTouch } from "@/components/landing/get-in-touch";
import { Reveal } from "@/components/motion/reveal";
import type { CtaButton } from "@/lib/cms/types";

type PageCtaSectionProps = {
  heading: string;
  description: string;
  buttons?: CtaButton[];
  descriptionClassName?: string;
  showContactForm?: boolean;
};

/**
 * Shared get-in-touch band. Remains a Server Component; motion/form stay as
 * client leaves so heading copy is composed on the server.
 */
export function PageCtaSection({
  heading,
  description,
  buttons,
  descriptionClassName = "secondaryFont t-subhead mt-5 text-base leading-relaxed text-ink-muted sm:mt-6",
  showContactForm = true,
}: PageCtaSectionProps) {
  return (
    <section id="get-in-touch" className="relative overflow-hidden bg-mist px-gutter pt-section">
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
          <h2 className="t-heading text-balance text-[#121212]">{heading}</h2>
          <p className={descriptionClassName}>{description}</p>
        </div>
        {buttons?.length ? <CtaButtons buttons={buttons} className="mt-8 mb-10 sm:mt-10" /> : null}
      </Reveal>

      {showContactForm ? <GetInTouch embedded /> : null}
    </section>
  );
}
