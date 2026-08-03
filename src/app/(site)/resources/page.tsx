import type { Metadata } from "next";

import { ResourcesContent } from "@/components/landing/resources-content";
import { ResourcesHero } from "@/components/landing/resources-hero";
import { Reveal } from "@/components/motion/reveal";
import { ScrollParallaxPage } from "@/components/motion/scroll-parallax-page";
import { getResourcesPageData } from "@/lib/cms/page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getResourcesPageData();
  const seo = STATIC_PAGE_SEO.resources;

  return createPageMetadata({
    title: seo.title,
    description: data.hero.subtitle || data.hero.description || seo.description,
    path: seo.path,
    ogImage: data.hero.image || undefined,
  });
}

export default async function ResourcesPage() {
  const data = await getResourcesPageData();

  return (
    <ScrollParallaxPage
      className="flex flex-1 flex-col bg-[#010207]"
      hero={<ResourcesHero hero={data.hero} />}
    >
      <ResourcesContent
        filterTabs={data.filterTabs}
        featuredVideo={data.featuredVideo}
        shortVideos={data.shortVideos}
        externalArticles={data.externalArticles}
        blogsSection={data.blogsSection}
        blogPosts={data.blogPosts}
        sectionHeadings={data.sectionHeadings}
        deepDivesSection={data.deepDivesSection}
        deepDives={data.deepDives}
      />
      <section
        id="get-in-touch"
        className="relative overflow-hidden bg-mist px-5 py-20 sm:px-10 sm:py-24 lg:py-32"
      >
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
            <h2 className="t-heading text-balance text-[#121212]">
              {data.newsletterCta.heading}
            </h2>
            <p className="t-subhead mt-5 text-base leading-relaxed text-black/55 sm:mt-6 sm:text-[1rem]">
              {data.newsletterCta.description}
            </p>
          </div>
          <a
            href={data.newsletterCta.buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand mt-8 inline-flex rounded-lg px-7 py-3 text-sm font-medium text-white shadow-[0_4px_14px_rgba(2,67,133,0.35)] transition-colors hover:bg-[#01356b] sm:mt-10"
          >
            {data.newsletterCta.buttonLabel}
          </a>
        </Reveal>
      </section>
    </ScrollParallaxPage>
  );
}
