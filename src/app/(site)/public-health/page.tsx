import type { Metadata } from "next";

import { GetInTouch } from "@/components/chrome/get-in-touch";
import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import {
  Architecture,
  Impact,
  PublicHealthHero,
  ThreeTier,
} from "@/components/public-health/sections";
import { DEFAULT_HOME_CONTACT } from "@/lib/cms/home-content";
import { getPublicHealthContent } from "@/lib/cms/public-health-page-data";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

/** In render order; the rail and the numbers follow it. */
const SECTIONS = [
  { id: "impact", label: "Impact", eyebrow: "Impact" },
  { id: "how-it-works", label: "How It Works", eyebrow: "Three-tier model" },
  { id: "architecture", label: "Architecture", eyebrow: "Architecture" },
  { id: "get-in-touch", label: "Request a Pilot", eyebrow: "Get in Touch" },
];

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicHealthContent();
  const seo = STATIC_PAGE_SEO.publicHealth;

  return createPageMetadata({
    title: seo.title,
    description: content.hero.blurb || seo.description,
    path: seo.path,
  });
}

export default async function PublicHealthPage() {
  const [content, navigation, footer] = await Promise.all([
    getPublicHealthContent(),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(SECTIONS);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} />
      <SectionRail sections={sections} pageLabel="Public Health" />

      <PublicHealthHero content={content.hero} />
      <Impact content={content.impact} num={section.impact.num} />
      <ThreeTier content={content.tiers} num={section["how-it-works"].num} />
      <Architecture content={content.architecture} num={section.architecture.num} />

      <GetInTouch
        section={section["get-in-touch"]}
        num={section["get-in-touch"].num}
        variant="panel"
        organisationLabel="Institution or department"
        organisationPlaceholder="Name of institution"
        emailPlaceholder="name@institution.gov.in"
        roleOrder={[
          "Government or Public Health",
          "Clinician or Hospital",
          "Life Science or Industry",
        ]}
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
