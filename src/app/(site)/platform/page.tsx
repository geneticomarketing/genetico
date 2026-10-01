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
import { DEFAULT_CONTACT_SECTION } from "@/lib/cms/sections";
import { getPlatformContent } from "@/lib/cms/platform-page-data";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { staticPageMetadata } from "@/lib/seo-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, staticPageNodes } from "@/lib/structured-data";

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

export function generateMetadata(): Metadata {
  return staticPageMetadata("platform");
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
      {/* The hero is a full-height dark band, so the header sits on it in
          white and the rail waits until the hero has gone rather than sliding
          in over it. */}
      <SiteHeader navigation={navigation} sections={sections} tone="dark" />
      <SectionRail sections={sections} pageLabel="IndiGeneUs.AI" revealAfter="top" />

      <main id="main-content" className="flex flex-1 flex-col">
        <JsonLd data={graph(...staticPageNodes("platform", { about: "platform" }))} />

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
