"use client";

import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";

import { ResourcesBlogs } from "@/components/landing/resources-blogs";

import { ResourcesEditorial } from "@/components/landing/resources-editorial";

import { ResourcesLibrary } from "@/components/landing/resources-library";

import { ResourcesShortVideos } from "@/components/landing/resources-short-videos";

import { DEFAULT_RESOURCES_PAGE } from "@/lib/cms/defaults/resources";

import type {
  ExternalArticle,
  FeaturedVideo,
  ResourcesPageData,
  ShortVideo,
} from "@/lib/cms/types";

import type { BlogPost } from "@/lib/blogs";

type ResourceTab = string;

export function ResourcesContent({
  filterTabs = DEFAULT_RESOURCES_PAGE.filterTabs,

  featuredVideo = DEFAULT_RESOURCES_PAGE.featuredVideo,

  shortVideos = DEFAULT_RESOURCES_PAGE.shortVideos,

  externalArticles = DEFAULT_RESOURCES_PAGE.externalArticles,

  blogsSection = DEFAULT_RESOURCES_PAGE.blogsSection,

  blogPosts = [],

  sectionHeadings = DEFAULT_RESOURCES_PAGE.sectionHeadings,
}: {
  filterTabs?: string[];

  featuredVideo?: FeaturedVideo;

  shortVideos?: (ShortVideo & { categoryColor?: string })[];

  externalArticles?: ExternalArticle[];

  blogsSection?: ResourcesPageData["blogsSection"];

  blogPosts?: BlogPost[];

  sectionHeadings?: ResourcesPageData["sectionHeadings"];
}) {
  const [activeTab, setActiveTab] = useState<ResourceTab>(filterTabs[0] ?? "All");

  const showFeatured = activeTab === "All" || activeTab === "Featured";

  const showVideos = activeTab === "All" || activeTab === "Videos";

  const showArticles = activeTab === "All" || activeTab === "Articles";

  const showBlogs = activeTab === "All" || activeTab === "Blogs";

  const compactOffset = (showFeatured ? 1 : 0) + (showVideos ? 1 : 0) + (showArticles ? 1 : 0);

  return (
    <div className="bg-white">
      <section className="px-6 pt-20 sm:px-10 sm:pt-24 lg:pt-28">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <div className="flex w-full [scrollbar-width:none] overflow-x-auto lg:w-auto lg:overflow-visible [&::-webkit-scrollbar]:hidden">
              <div
                role="tablist"
                aria-label="Resource types"
                className="flex min-w-max items-center gap-1 rounded-md bg-[#eef1f5] p-1.5"
              >
                {filterTabs.map((tab) => {
                  const isActive = tab === activeTab;

                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-md px-4 py-2 text-[13px] font-medium transition-colors sm:px-5 sm:text-sm ${
                        isActive
                          ? "bg-brand text-white shadow-[0_4px_14px_rgba(2,67,133,0.28)]"
                          : "text-[#6e6e73] hover:text-black"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {showFeatured ? <ResourcesLibrary compactTop featuredVideo={featuredVideo} /> : null}

      {showVideos ? (
        <ResourcesShortVideos
          compactTop={showFeatured}
          videos={shortVideos}
          heading={sectionHeadings.videos}
        />
      ) : null}

      {showArticles ? (
        <ResourcesEditorial
          compactTop={showFeatured || showVideos}
          articles={externalArticles}
          heading={sectionHeadings.articles}
        />
      ) : null}

      {showBlogs ? (
        <ResourcesBlogs
          compactTop={compactOffset > 0}
          blogsSection={blogsSection}
          blogPosts={blogPosts}
        />
      ) : null}
    </div>
  );
}
