"use client";

import { ResourcesContent } from "@/components/landing/resources-content";
import { ResourcesHero } from "@/components/landing/resources-hero";
import { Reveal } from "@/components/motion/reveal";
import type { ResourcesPageData } from "@/lib/cms/types";
import type { BlogPost } from "@/lib/blogs";
import { useProjectScroll } from "@/lib/motion/use-project-scroll";
import { motion, useTransform } from "motion/react";
import { useRef } from "react";

type ResourcesClientData = ResourcesPageData & { blogPosts: BlogPost[] };

export function ResourcesClient({ data }: { data: ResourcesClientData }) {
  const pageRef = useRef(null);

  const { scrollYProgress: pageScroll } = useProjectScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(pageScroll, [0, 0.4], [1, 0.55]);
  const heroY = useTransform(pageScroll, [0, 0.4], ["0%", "50%"]);

  return (
    <main ref={pageRef} className="flex flex-1 flex-col bg-[#010207]">
      <motion.div
        className="fixed w-full"
        style={{
          scale: heroScale,
          y: heroY,
        }}
      >
        <ResourcesHero hero={data.hero} />
      </motion.div>
      <div className="min-h-screen" />
      <div className="relative z-999999999">
        <ResourcesContent
          filterTabs={data.filterTabs}
          featuredVideo={data.featuredVideo}
          shortVideos={data.shortVideos}
          externalArticles={data.externalArticles}
          blogsSection={data.blogsSection}
          blogPosts={data.blogPosts}
          sectionHeadings={data.sectionHeadings}
        />
        <section
          id="get-in-touch"
          className="relative overflow-hidden bg-[#F4F6F9] px-5 py-20 sm:px-10 sm:py-24 lg:py-32"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img
              src="/dna.svg"
              alt=""
              className="absolute top-1/2 right-[-18%] h-[140%] w-auto max-w-none -translate-y-1/2 scale-x-[-1] opacity-90"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,#F4F6F9_35%,transparent_100%)]" />
          </div>

          <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="t-heading mx-auto text-balance text-[#121212]">
              {data.newsletterCta.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/55 sm:mt-6 sm:text-lg">
              {data.newsletterCta.description}
            </p>
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
      </div>
    </main>
  );
}
