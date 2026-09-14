import type { Metadata } from "next";

import { GetInTouch } from "@/components/chrome/get-in-touch";
import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import {
  HospitalHero,
  PathwayPanel,
  RapidPanel,
  TimelinePanel,
} from "@/components/hospital/sections";
import { ExtractPanel } from "@/components/solutions/extract-panel";
import { Challenge, Outcomes, Walkthrough } from "@/components/solutions/sections";
import { DEFAULT_HOME_CONTACT } from "@/lib/cms/home-content";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { getSolutionContent } from "@/lib/cms/solution-page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

/** In render order; the rail and the numbers follow it. */
const SECTIONS = [
  { id: "challenge", label: "The Challenge", eyebrow: "The Challenge" },
  { id: "solution", label: "The Solution", eyebrow: "The Solution" },
  { id: "outcomes", label: "Outcomes", eyebrow: "Outcomes" },
  { id: "get-in-touch", label: "Book a Demo", eyebrow: "Get in Touch" },
];

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSolutionContent("hospital");
  const seo = STATIC_PAGE_SEO.hospital;
  const title = `${content.hero.headline} ${content.hero.headlineHighlight}`.trim();

  return createPageMetadata({
    title: title || seo.title,
    description: content.hero.blurb || seo.description,
    path: seo.path,
  });
}

export default async function HospitalPage() {
  const [content, navigation, footer] = await Promise.all([
    getSolutionContent("hospital"),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(SECTIONS);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} />
      <SectionRail sections={sections} pageLabel="Hospitals & CoEs" />

      <HospitalHero content={content.hero} />
      <Challenge content={content.challenge} num={section.challenge.num} />
      <Walkthrough
        content={content.solution}
        num={section.solution.num}
        panels={[
          <PathwayPanel key="pathway" />,
          <ExtractPanel
            key="extract"
            filename="discharge_summary_2024.pdf"
            caption="No re-typing: reports arrive as coded, reviewable fields."
          />,
          <RapidPanel key="rapid" />,
          <TimelinePanel key="timeline" />,
        ]}
      />
      <Outcomes content={content.outcomes} num={section.outcomes.num} />

      <GetInTouch
        section={section["get-in-touch"]}
        num={section["get-in-touch"].num}
        variant="panel"
        organisationLabel="Hospital or centre"
        organisationPlaceholder="Name of hospital or centre"
        emailPlaceholder="name@hospital.org"
        roleOrder={["Clinician or Hospital", "Life Science or Industry"]}
        content={{
          heading: content.cta.heading || DEFAULT_HOME_CONTACT.heading,
          description: content.cta.description || DEFAULT_HOME_CONTACT.description,
          primaryCta: DEFAULT_HOME_CONTACT.primaryCta,
          secondaryCta: DEFAULT_HOME_CONTACT.secondaryCta,
        }}
      />

      <SiteFooter footer={footer} />
    </div>
  );
}
