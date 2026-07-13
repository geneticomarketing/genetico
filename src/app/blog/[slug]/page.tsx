import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { JsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { BLOG_PATH } from "@/lib/blogs";
import { getAllBlogSlugs, getBlogBySlug } from "@/lib/cms/queries";
import { articleJsonLd, createPageMetadata } from "@/lib/seo";

export const revalidate = 60;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return createPageMetadata({
      title: "Blog",
      path: BLOG_PATH,
    });
  }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `${BLOG_PATH}/${slug}`,
    type: "article",
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col bg-white">
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt,
          path: `${BLOG_PATH}/${slug}`,
          author: post.author,
        })}
      />
      <article className="px-6 pt-20 pb-16 sm:px-10 sm:pt-24 sm:pb-20 lg:py-24 lg:pt-28">
        <div className="mx-auto w-full max-w-3xl">
          <Link
            href={BLOG_PATH}
            className="text-brand mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#01356b]"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            All blogs
          </Link>

          <Reveal>
            <div
              aria-hidden
              className="aspect-[16/9] w-full overflow-hidden rounded-2xl"
              style={{ background: post.thumbnail }}
            />

            <p
              className="t-badge secondaryFont mt-8 text-[11px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: post.categoryColor }}
            >
              {post.category}
            </p>

            <h1
              className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.12] tracking-[-0.02em] text-[#121212]"
              style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
            >
              {post.title}
            </h1>

            <div className="secondaryFont mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#8b8f97]">
              <span>{post.author}</span>
              <span aria-hidden className="text-[#d1d5db]">
                •
              </span>
              <span>{post.date}</span>
              <span aria-hidden className="text-[#d1d5db]">
                •
              </span>
              <span>{post.readTime}</span>
            </div>

            <p className="secondaryFont mt-8 text-lg leading-relaxed text-[#4b4f56]">
              {post.excerpt}
            </p>
          </Reveal>

          <Reveal className="mt-10 space-y-5" delay={0.06}>
            {post.content.map((paragraph) => (
              <p key={paragraph} className="secondaryFont text-base leading-relaxed text-[#6e6e73]">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </article>
    </main>
  );
}
