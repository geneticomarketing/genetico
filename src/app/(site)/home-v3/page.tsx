import type { Metadata } from "next";

import { GetInTouch } from "@/components/chrome/get-in-touch";
import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { Faqs } from "@/components/home/faqs";
import { Proof } from "@/components/home/proof";
import { Trust } from "@/components/home/trust";
import { HomeV3Hero } from "@/components/home-v3/hero";
import { Platform } from "@/components/home-v3/platform";
import { How, OpeningBand, Problem, Shift, Who } from "@/components/home-v3/sections";
import {
  HOME_V3_CONTACT,
  HOME_V3_FAQS,
  HOME_V3_FOOTER_TAGLINE,
  HOME_V3_PROOF_HEADING,
  HOME_V3_ROLE_DESCRIPTIONS,
  HOME_V3_SECTIONS,
  HOME_V3_TRUST,
} from "@/content/home-v3";
import { getHomePageContent } from "@/lib/cms/home-page-data";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { HOME_V3_PATH } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

/**
 * The third pass at the home page, for review alongside /home-v2 before either
 * replaces the live one. Kept out of search: not in the sitemap, and asking
 * not to be indexed, since it would otherwise compete with `/` and with
 * /home-v2 for the same content.
 */
export async function generateMetadata(): Promise<Metadata> {
  const seo = STATIC_PAGE_SEO.home;
  return createPageMetadata({
    title: `${seo.title} (preview v3)`,
    description: seo.description,
    path: HOME_V3_PATH,
    noIndex: true,
  });
}

export default async function HomeV3() {
  const [content, navigation, cmsFooter] = await Promise.all([
    getHomePageContent(),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(HOME_V3_SECTIONS);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  /*
   * Unlike v2, this round leaves the navigation alone: the handoff restores
   * About / Platform / Solutions / Resources, which is what the CMS already
   * holds, so nothing has to be relabelled over it.
   */
  const footer = {
    ...cmsFooter,
    tagline: HOME_V3_FOOTER_TAGLINE,
    menuLinks: (cmsFooter.menuLinks ?? []).map((link) =>
      // The footer's FAQ link would otherwise leave for the live home page.
      link.href === "/#faqs" ? { ...link, href: "#faqs" } : link,
    ),
  };

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} ctaHref="#get-in-touch" />
      <SectionRail sections={sections} />

      <HomeV3Hero credentials={content.hero.credentials} />

      {/* The fold rides up over the sticky hero as a card, and lifts into
          place as it enters. The footer sits inside it so the rounded top and
          its shadow cover everything below the hero. */}
      <div
        data-fold-lift
        className="bg-sheet relative z-[2] mt-[clamp(-56px,-4vw,-30px)] overflow-hidden rounded-t-[28px] shadow-[var(--shadow-sheet)]"
      >
        <OpeningBand />

        <Problem section={section.problem} num={section.problem.num} />
        <Shift section={section.shift} num={section.shift.num} />
        <How section={section.how} num={section.how.num} />
        <Platform section={section.platform} num={section.platform.num} />
        <Who section={section.who} num={section.who.num} />
        <Proof
          section={section.proof}
          num={section.proof.num}
          content={{ ...content.proof, heading: HOME_V3_PROOF_HEADING }}
          partners={content.partners}
          playBadge="corner"
        />
        <Trust
          section={section.trust}
          num={section.trust.num}
          content={HOME_V3_TRUST}
          columns="fixed"
        />
        <Faqs section={section.faqs} num={section.faqs.num} content={HOME_V3_FAQS} />
        <GetInTouch
          section={section["get-in-touch"]}
          num={section["get-in-touch"].num}
          content={{ ...content.contact, ...HOME_V3_CONTACT }}
          roleDescriptions={HOME_V3_ROLE_DESCRIPTIONS}
        />

        <SiteFooter footer={footer} />
      </div>
    </div>
  );
}
