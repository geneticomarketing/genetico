import type { Metadata } from "next";

import { GetInTouch } from "@/components/chrome/get-in-touch";
import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { Ahead } from "@/components/home/ahead";
import { Does } from "@/components/home/does";
import { Hero } from "@/components/home/hero";
import { Impact } from "@/components/home/impact";
import { Insights } from "@/components/home/insights";
import { H2, LEAD, Label } from "@/components/home/label";
import { Platform } from "@/components/home/platform";
import { Scale } from "@/components/home/scale";
import { Serve } from "@/components/home/serve";
import { Why } from "@/components/home/why";
import { getHomePage } from "@/lib/cms/home-page";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { staticPageMetadata } from "@/lib/seo-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, staticPageNodes } from "@/lib/structured-data";

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return staticPageMetadata("home");
}

/**
 * The home page: mission, the problem, what Genetico does, the platform, the
 * three audiences, proof, insights, the road ahead, and the enquiry form.
 *
 * All copy is edited in the CMS (Home page · /) — see getHomePage(). Design
 * source: design_handoff_genetico_site/design_handoff_home_final/.
 */
export default async function Home() {
  const [page, navigation, footer] = await Promise.all([
    getHomePage(),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(page.sections);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));
  const next = section["get-in-touch"];

  return (
    <div className="text-ink font-body flex min-h-full flex-col overflow-clip bg-white">
      <SiteHeader
        navigation={navigation}
        sections={sections}
        tone="dark"
        solidAt="[data-hero-shot]"
        ctaShape="rounded"
        ctaHref="#get-in-touch"
      />
      {/* The rail waits for the hero to leave, so it never sits under the
          frosted-dark header the hero gets while it is in view. */}
      <SectionRail sections={sections} pageLabel="Genetico" revealAfter="top" />

      <main id="main-content" className="flex flex-1 flex-col">
        <JsonLd data={graph(...staticPageNodes("home"))} />

        <Hero content={page.hero} />

        <Why section={section.why} num={section.why.num} content={page.why} />
        <Scale content={page.scale} photo={page.scalePhoto} />
        <Does section={section.does} num={section.does.num} content={page.does} />
        <Platform section={section.platform} num={section.platform.num} content={page.platform} />
        <Serve
          section={section.serve}
          num={section.serve.num}
          content={page.serve}
          doors={page.doors}
        />
        <Impact
          section={section.impact}
          num={section.impact.num}
          content={page.impact}
          awardCount={page.awardCount}
          firstAwardYear={page.firstAwardYear}
          logos={page.logos}
        />
        <Insights
          section={section.insights}
          num={section.insights.num}
          content={page.insights}
          photo={page.insightsPhoto}
          featured={page.feed.featured}
          items={page.feed.clips}
        />
        <Ahead section={section.ahead} num={section.ahead.num} content={page.ahead} />
        <GetInTouch
          section={next}
          num={next.num}
          variant="split"
          content={page.contact}
          intro={
            <div className="flex min-w-0 flex-col items-start gap-6">
              <Label num={next.num}>{next.eyebrow}</Label>
              <h2 className={`${H2} text-ink`}>{page.contact.heading}</h2>
              <p className={`${LEAD} text-ink-body max-w-[460px]`}>{page.contact.description}</p>
            </div>
          }
        />
      </main>

      <SiteFooter footer={footer} />
    </div>
  );
}
