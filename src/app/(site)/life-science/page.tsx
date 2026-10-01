import type { Metadata } from "next";

import { GetInTouch } from "@/components/chrome/get-in-touch";
import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { CohortPanel, IntakePanel, LifeScienceHero } from "@/components/life-science/sections";
import { ExtractPanel } from "@/components/solutions/extract-panel";
import { Challenge, Outcomes, Walkthrough } from "@/components/solutions/sections";
import { DEFAULT_CONTACT_SECTION } from "@/lib/cms/sections";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { getSolutionContent } from "@/lib/cms/solution-page-data";
import { staticPageMetadata } from "@/lib/seo-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, staticPageNodes } from "@/lib/structured-data";

export const revalidate = 60;

/** In render order; the rail and the numbers follow it. */
const SECTIONS = [
  { id: "challenge", label: "The Challenge", eyebrow: "The Challenge" },
  { id: "solution", label: "How It Works", eyebrow: "How It Works" },
  { id: "outcomes", label: "Outcomes", eyebrow: "Outcomes" },
  { id: "get-in-touch", label: "Book a Demo", eyebrow: "Get in Touch" },
];

export function generateMetadata(): Metadata {
  return staticPageMetadata("lifeScience");
}

export default async function LifeSciencePage() {
  const [content, navigation, footer] = await Promise.all([
    getSolutionContent("pharma"),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(SECTIONS);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} />
      <SectionRail sections={sections} pageLabel="Life Sciences" />

      <main id="main-content" className="flex flex-1 flex-col">
        <JsonLd data={graph(...staticPageNodes("lifeScience", { about: "platform" }))} />

        <LifeScienceHero content={content.hero} />
        <Challenge content={content.challenge} num={section.challenge.num} />
        <Walkthrough
          content={content.solution}
          num={section.solution.num}
          panels={[
            <IntakePanel key="intake" />,
            <ExtractPanel
              key="extract"
              filename="lab_report_aiims_2024.pdf"
              caption="Free-text notes become HPO-coded, registry-ready fields."
            />,
            <CohortPanel key="cohort" />,
          ]}
        />
        <Outcomes content={content.outcomes} num={section.outcomes.num} />

        <GetInTouch
          section={section["get-in-touch"]}
          num={section["get-in-touch"].num}
          variant="panel"
          emailPlaceholder="name@organisation.com"
          roleOrder={["Life Science or Research", "Clinician or Hospital"]}
          content={{
            heading: content.cta.heading || DEFAULT_CONTACT_SECTION.heading,
            description: content.cta.description || DEFAULT_CONTACT_SECTION.description,
            primaryCta: DEFAULT_CONTACT_SECTION.primaryCta,
            secondaryCta: DEFAULT_CONTACT_SECTION.secondaryCta,
          }}
        />
      </main>

      <SiteFooter footer={footer} />
    </div>
  );
}
