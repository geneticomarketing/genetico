import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BlogPost } from "@/lib/blogs";
import { blogHref } from "@/lib/blogs";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={blogHref(post.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <span aria-hidden className="absolute inset-0" style={{ background: post.thumbnail }} />
        <span className="t-badge secondaryFont absolute top-4 left-4 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#121212] uppercase">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p
          className="t-badge secondaryFont text-[11px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: post.categoryColor }}
        >
          {post.category}
        </p>

        <h3
          className="group-hover:text-brand mt-2 text-[1.05rem] leading-[1.25] font-medium tracking-[-0.02em] text-[#121212] transition-colors sm:text-[1.125rem]"
          style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"SERF" 100' }}
        >
          {post.title}
        </h3>

        <p className="secondaryFont mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[#6e6e73]">
          {post.excerpt}
        </p>

        <div className="secondaryFont mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#8b8f97]">
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

        <span className="text-brand mt-4 inline-flex items-center gap-1 text-sm font-medium">
          Read blog
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </span>
      </div>
    </Link>
  );
}
