import type { Metadata } from "next";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { BlogCard } from "@/components/blog/blog-card";

import { Reveal } from "@/components/motion/reveal";

import { getBlogPosts } from "@/lib/cms/queries";
import { getResourcesPageData } from "@/lib/cms/page-data";
import { createPageMetadata } from "@/lib/seo";
import { STATIC_PAGE_SEO } from "@/lib/seo-pages";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getResourcesPageData();
  const seo = STATIC_PAGE_SEO.blog;

  return createPageMetadata({
    title: data.blogListing.title.replace(` | Genetico`, "") || seo.title,
    description: data.blogListing.metaDescription || seo.description,
    path: seo.path,
  });
}

export default async function BlogPage() {
  const [data, posts] = await Promise.all([getResourcesPageData(), getBlogPosts()]);

  return (
    <main className="flex flex-1 flex-col bg-white">
      <section className="border-line border-b bg-[#F4F6F9] px-6 pt-20 pb-16 sm:px-10 sm:pt-24 sm:pb-20 lg:py-24 lg:pt-28">
        <div className="mx-auto w-full max-w-7xl">
          <Link
            href={data.blogListing.backHref}
            className="text-brand mb-8 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#01356b]"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            {data.blogListing.backLabel}
          </Link>

          <Reveal>
            <p className="t-eyebrow text-[11px] tracking-[0.16em] text-[#45B191]">
              {data.blogListing.eyebrow}
            </p>
            <h1
              className="mt-3 max-w-3xl text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-[-0.02em] text-[#121212]"
              style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
            >
              {data.blogListing.heading}
            </h1>
            <p className="secondaryFont mt-5 max-w-2xl text-base leading-relaxed text-[#6e6e73] sm:text-lg">
              {data.blogListing.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
