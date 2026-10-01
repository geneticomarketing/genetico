import type { Metadata } from "next";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { BlogCard } from "@/components/blog/blog-card";

import { Reveal } from "@/components/motion/reveal";

import { getBlogPosts } from "@/lib/cms/queries";
import { getBlogListing } from "@/lib/cms/page-data";
import { staticPageMetadata } from "@/lib/seo-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { BLOG_PATH, blogDate, blogHref } from "@/lib/blogs";
import { SITE_NAME, getSiteUrl } from "@/lib/seo";
import { blogPostingNode, graph, staticPageNodes } from "@/lib/structured-data";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { title, metaDescription } = await getBlogListing();

  // Resources page → Blogs heading holds this page's tab title and search
  // description; either falls back to the one in seo-pages.ts when empty.
  return staticPageMetadata("blog", {
    title: title.replace(/\s*\|\s*Genetico$/, ""),
    description: metaDescription,
  });
}

export default async function BlogPage() {
  const [blogListing, posts] = await Promise.all([getBlogListing(), getBlogPosts()]);
  const data = { blogListing };

  return (
    <main id="main-content" className="flex flex-1 flex-col bg-white">
      <JsonLd
        data={graph(
          ...staticPageNodes("blog", {
            type: "CollectionPage",
            extra: {
              mainEntity: {
                "@type": "Blog",
                name: `${SITE_NAME} blog`,
                url: `${getSiteUrl()}${BLOG_PATH}`,
                publisher: { "@id": `${getSiteUrl()}/#organization` },
                blogPost: posts.map((post) => ({
                  "@id": `${getSiteUrl()}${blogHref(post.slug)}#article`,
                })),
              },
            },
          }),
          ...posts.map((post) =>
            blogPostingNode({
              title: post.title,
              description: post.excerpt,
              path: blogHref(post.slug),
              author: post.author,
              datePublished: blogDate(post.date).iso,
            }),
          ),
        )}
      />
      <section className="border-line border-b bg-mist px-gutter pt-page pb-section">
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
            <div className="t-intro mt-3 text-left">
              <h1
                className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-[-0.02em] text-[#121212]"
                style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
              >
                {data.blogListing.heading}
              </h1>
              <p className="secondaryFont t-subhead mt-5 text-base leading-relaxed text-ink-muted sm:text-[1rem]">
                {data.blogListing.description}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-gutter py-section">
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
