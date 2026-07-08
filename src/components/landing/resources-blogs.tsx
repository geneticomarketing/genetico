"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/motion/reveal";
import { DEFAULT_RESOURCES_PAGE } from "@/lib/cms/defaults/resources";
import type { ResourcesPageData } from "@/lib/cms/types";
import type { BlogPost } from "@/lib/blogs";
import { BLOG_POSTS } from "@/lib/blogs";

export function ResourcesBlogs({
  compactTop = false,
  blogsSection = DEFAULT_RESOURCES_PAGE.blogsSection,
  blogPosts = [],
}: {
  compactTop?: boolean;
  blogsSection?: ResourcesPageData["blogsSection"];
  blogPosts?: BlogPost[];
}) {
  const posts = (blogPosts.length ? blogPosts : BLOG_POSTS).slice(0, 3);

  return (
    <section
      id="blogs"
      className={`bg-white px-6 sm:px-10 ${
        compactTop ? "pb-16 pt-0 sm:pb-20 lg:pb-24" : "py-16 sm:py-20 lg:py-24"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <span aria-hidden className="bg-brand h-10 w-1 shrink-0 rounded-full sm:h-11" />
            <h2
              className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.08] tracking-[-0.02em] text-[#121212]"
              style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
            >
              {blogsSection.heading}
            </h2>
          </div>

          <Link
            href={blogsSection.seeAllHref}
            className="text-brand inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors hover:text-[#01356b]"
          >
            {blogsSection.seeAllLabel}
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10" delay={0.06}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
