import type { Metadata } from "next";

import { GetInTouch } from "@/components/chrome/get-in-touch";
import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { PlatformFeatures } from "@/components/platform/features";
import { PlatformHero } from "@/components/platform/hero";
import {
  ClinicalIntelligence,
  DeployedWith,
  Infrastructure,
  Longitudinal,
  PlatformSecurity,
} from "@/components/platform/sections";
import { DEFAULT_HOME_CONTACT } from "@/lib/cms/home-content";
import { getPlatformContent } from "@/lib/cms/platform-page-data";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

/** In render order; the rail, the numbers and the hero's jump links follow it. */
const PLATFORM_SECTIONS = [
  { id: "platform", label: "The Platform", eyebrow: "The Platform" },
  { id: "cdss", label: "Clinical Intelligence", eyebrow: "Clinical Intelligence" },
  { id: "longitudinal", label: "Longitudinal Care", eyebrow: "Longitudinal Care" },
  { id: "infrastructure", label: "Infrastructure", eyebrow: "Infrastructure" },
  { id: "security", label: "Security", eyebrow: "Security & Compliance" },
  { id: "get-in-touch", label: "Get in Touch", eyebrow: "Get in Touch" },
];

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPlatformContent();
  const seo = STATIC_PAGE_SEO.platform;

  return createPageMetadata({
    title: seo.title,
    description: content.hero.blurb || seo.description,
    path: seo.path,
  });
}

export default async function PlatformPage() {
  const [content, navigation, footer] = await Promise.all([
    getPlatformContent(),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(PLATFORM_SECTIONS);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  // The hero's jump links cover the platform itself, not the contact form.
  const inPlatform = sections.filter((s) => s.id !== "get-in-touch");

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} />
      <SectionRail sections={sections} pageLabel="IndiGeneUs.AI" />

      <PlatformHero content={content.hero} sections={inPlatform} />
      <DeployedWith logos={content.trustLogos} />

      <PlatformFeatures content={content.features} num={section.platform.num} />
      <ClinicalIntelligence content={content.cdss} num={section.cdss.num} />
      <Longitudinal content={content.longitudinal} num={section.longitudinal.num} />
      <Infrastructure content={content.infrastructure} num={section.infrastructure.num} />
      <PlatformSecurity content={content.security} num={section.security.num} />

      <GetInTouch
        section={section["get-in-touch"]}
        num={section["get-in-touch"].num}
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
