import { PageCtaSection } from "@/components/landing/page-cta-section";
import { SolutionsClinicalBurden } from "@/components/landing/solutions-clinical-burden";
import { SolutionsHero } from "@/components/landing/solutions-hero";
import { SolutionsHowItWorks } from "@/components/landing/solutions-how-it-works";
import { SolutionsMeasurableOutcomes } from "@/components/landing/solutions-measurable-outcomes";
import { ScrollParallaxPage } from "@/components/motion/scroll-parallax-page";
import {
  SOLUTIONS_CONTENT,
  type SolutionsContent,
  type SolutionsVariant,
} from "@/lib/solutions-content";

export function SolutionsPage({
  variant,
  content: contentProp,
}: {
  variant: SolutionsVariant;
  content: SolutionsContent;
}) {
  const content = contentProp ?? SOLUTIONS_CONTENT[variant];

  return (
    <ScrollParallaxPage
      className="flex flex-1 flex-col bg-white max-md:overflow-x-hidden"
      hero={<SolutionsHero content={content.hero} variant={variant} />}
      heroYEnd="20%"
      fixedHeroFromMd
    >
      <div className="bg-white">
        <SolutionsClinicalBurden content={content.clinicalBurden} />
        <SolutionsHowItWorks content={content.howItWorks} />
        <SolutionsMeasurableOutcomes content={content.measurableOutcomes} />
        <PageCtaSection
          heading={content.cta.heading}
          description={content.cta.description}
          buttons={content.cta.buttons ?? []}
        />
      </div>
    </ScrollParallaxPage>
  );
}
