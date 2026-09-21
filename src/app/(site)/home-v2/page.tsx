import type { Metadata } from "next";

import { GetInTouch } from "@/components/chrome/get-in-touch";
import { numberSections } from "@/components/chrome/page-sections";
import { SectionRail } from "@/components/chrome/section-rail";
import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { Faqs } from "@/components/home/faqs";
import { Proof } from "@/components/home/proof";
import { Trust } from "@/components/home/trust";
import { HomeV2Hero } from "@/components/home-v2/hero";
import { Platform } from "@/components/home-v2/platform";
import { How, Problem, Shift, Who } from "@/components/home-v2/sections";
import {
  HOME_V2_FAQS,
  HOME_V2_FOOTER_TAGLINE,
  HOME_V2_INVESTOR_TAB_BLURB,
  HOME_V2_NAV_LABELS,
  HOME_V2_SECTIONS,
  HOME_V2_SOLUTIONS_LABEL,
} from "@/content/home-v2";
import { getHomePageContent } from "@/lib/cms/home-page-data";
import { getFooterContent, getNavigation } from "@/lib/cms/queries";
import { HOME_V2_PATH } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

/**
 * A preview of the home page's narrative rework, for review before it replaces
 * the live home page. Kept out of search: it is not in the sitemap and asks
 * not to be indexed, since it would otherwise compete with `/` for the same
 * content.
 */
export async function generateMetadata(): Promise<Metadata> {
  const seo = STATIC_PAGE_SEO.home;
  return createPageMetadata({
    title: `${seo.title} (preview)`,
    description: seo.description,
    path: HOME_V2_PATH,
    noIndex: true,
  });
}

export default async function HomeV2() {
  const [content, cmsNavigation, cmsFooter] = await Promise.all([
    getHomePageContent(),
    getNavigation(),
    getFooterContent(),
  ]);

  const sections = numberSections(HOME_V2_SECTIONS);
  const section = Object.fromEntries(sections.map((s) => [s.id, s]));

  // The rework renames the navigation. Applied here only, over whatever the
  // CMS holds, so the rest of the site keeps its labels until this is approved.
  const relabel = <T extends { label: string; href?: string | null }>(item: T): T => ({
    ...item,
    label: (item.href && HOME_V2_NAV_LABELS[item.href]) || item.label,
  });

  const navigation = {
    ...cmsNavigation,
    mainNav: (cmsNavigation.mainNav ?? []).map((item) =>
      item.type === "dropdown" ? { ...item, label: HOME_V2_SOLUTIONS_LABEL } : relabel(item),
    ),
  };

  const footer = {
    ...cmsFooter,
    // "The digital backbone for rare disease diagnosis" is retired by the
    // rework; the live footer keeps its wording until this is approved.
    tagline: HOME_V2_FOOTER_TAGLINE,
    sectionLabels: { ...cmsFooter.sectionLabels, solutionsHeading: HOME_V2_SOLUTIONS_LABEL },
    menuLinks: (cmsFooter.menuLinks ?? []).map((link) =>
      // The footer's FAQ link would otherwise leave for the live home page.
      link.href === "/#faqs" ? { ...link, href: "#faqs" } : relabel(link),
    ),
  };

  return (
    <div className="bg-sheet text-ink font-body flex min-h-full flex-col overflow-clip">
      <SiteHeader navigation={navigation} sections={sections} ctaHref="#get-in-touch" />
      <SectionRail sections={sections} />

      <HomeV2Hero credentials={content.hero.credentials} />

      {/* The fold rides up over the sticky hero as a card, and lifts into
          place as it enters. The footer sits inside it so the rounded top and
          its shadow cover everything below the hero. */}
      <div
        data-fold-lift
        className="bg-sheet relative z-[2] mt-[clamp(-56px,-4vw,-30px)] overflow-hidden rounded-t-[28px] shadow-[var(--shadow-sheet)]"
      >
        <Problem section={section.problem} num={section.problem.num} />
        <Shift section={section.shift} num={section.shift.num} />
        <How section={section.how} num={section.how.num} />
        <Platform
          section={section.platform}
          num={section.platform.num}
          platform={content.platform}
        />
        <Who section={section.who} num={section.who.num} />
        <Proof
          section={section.proof}
          num={section.proof.num}
          content={content.proof}
          partners={content.partners}
          playBadge="corner"
        />
        <Trust
          section={section.trust}
          num={section.trust.num}
          content={content.trust}
          columns="fixed"
        />
        <Faqs section={section.faqs} num={section.faqs.num} content={HOME_V2_FAQS} />
        <GetInTouch
          section={section["get-in-touch"]}
          num={section["get-in-touch"].num}
          content={content.contact}
          roleDescriptions={{ Investor: HOME_V2_INVESTOR_TAB_BLURB }}
        />

        <SiteFooter footer={footer} />
      </div>
    </div>
  );
}
