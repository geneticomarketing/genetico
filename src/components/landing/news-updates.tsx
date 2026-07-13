"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { EASE, StaggerGroup, StaggerItem, useInViewAnimation } from "@/components/motion/reveal";
import { DEFAULT_HOME_PAGE } from "@/lib/cms/defaults/home";
import { DEFAULT_RESOURCES_PAGE } from "@/lib/cms/defaults/resources";
import type { ExternalArticle } from "@/lib/cms/types";
import { BLOG_POSTS, blogHref, type BlogPost } from "@/lib/blogs";

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

function Tag({ children, uppercase = true }: { children: string; uppercase?: boolean }) {
  return (
    <span
      className={`t-badge w-fit rounded-md bg-[#ECEEF1] px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em] text-[#5A5F66] ${uppercase ? "uppercase" : ""}`}
    >
      {children}
    </span>
  );
}

function thumbnailStyle(thumbnail: string): CSSProperties {
  if (!thumbnail) return { backgroundColor: "#e5e7eb" };
  if (thumbnail.startsWith("radial") || thumbnail.startsWith("linear")) {
    return { background: thumbnail };
  }
  if (thumbnail.startsWith("http") || thumbnail.startsWith("/")) {
    return {
      backgroundImage: `url('${thumbnail}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  return { background: thumbnail };
}

type SidebarItem = { kind: "blog"; blog: BlogPost } | { kind: "article"; article: ExternalArticle };

export function NewsUpdates({
  newsSection = DEFAULT_HOME_PAGE.newsSection,
  featuredBlog = BLOG_POSTS[0] ?? null,
  previewBlog = BLOG_POSTS[1] ?? null,
  articles = DEFAULT_RESOURCES_PAGE.externalArticles.slice(0, 2),
}: {
  newsSection?: {
    heading: string;
    description: string;
    ctaLabel: string;
    // ctaHref: string;
  };
  featuredBlog?: BlogPost | null;
  previewBlog?: BlogPost | null;
  articles?: ExternalArticle[];
}) {
  const reduce = useReducedMotion();
  const { ref: articlesRef, visible: articlesVisible } = useInViewAnimation<HTMLUListElement>();
  const { ref: ctaRef, visible: ctaVisible } = useInViewAnimation<HTMLAnchorElement>();

  const sidebarItems: SidebarItem[] = [
    ...(previewBlog ? [{ kind: "blog" as const, blog: previewBlog }] : []),
    ...articles.slice(0, 3).map((article) => ({ kind: "article" as const, article })),
  ];

  return (
    <section id="news" className="bg-white px-6 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <StaggerGroup className="flex flex-col items-center gap-3 text-center" stagger={0.12}>
          <StaggerItem>
            <h2 className="t-heading text-black">{newsSection.heading}</h2>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-2xl text-base text-black/55 sm:text-lg sm:leading-normal">
              {newsSection.description}
            </p>
          </StaggerItem>
        </StaggerGroup>

        <StaggerGroup
          className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-[1.7fr_1px_1fr] lg:gap-8"
          stagger={0.15}
        >
          {featuredBlog && (
            <StaggerItem>
              <a
                href={blogHref(featuredBlog.slug)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-3 shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
              >
                <StaggerGroup className="flex h-full flex-col" stagger={0.08} delayChildren={0.05}>
                  <StaggerItem>
                    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl">
                      <span
                        aria-hidden
                        className="absolute inset-0"
                        style={thumbnailStyle(featuredBlog.thumbnail)}
                      />
                    </div>
                  </StaggerItem>
                  <StaggerItem className="flex flex-1 flex-col gap-3 px-1.5 pt-3 pb-1">
                    <StaggerGroup className="flex flex-col gap-3" stagger={0.08}>
                      <StaggerItem>
                        <Tag uppercase={false}>{featuredBlog.category}</Tag>
                      </StaggerItem>
                      <StaggerItem>
                        <h3 className="group-hover:text-brand text-lg leading-snug font-semibold text-black sm:text-xl">
                          {featuredBlog.title}
                        </h3>
                      </StaggerItem>
                      {featuredBlog.excerpt && (
                        <StaggerItem>
                          <p className="line-clamp-2 text-sm leading-relaxed text-black/55">
                            {featuredBlog.excerpt}
                          </p>
                        </StaggerItem>
                      )}
                      <StaggerItem>
                        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[13px] text-black/45">
                          <span>{featuredBlog.author}</span>
                          <span aria-hidden className="text-black/20">
                            |
                          </span>
                          <span>{featuredBlog.date}</span>
                          <span aria-hidden className="text-black/20">
                            |
                          </span>
                          <span>{featuredBlog.readTime}</span>
                        </div>
                      </StaggerItem>
                    </StaggerGroup>
                  </StaggerItem>
                </StaggerGroup>
              </a>
            </StaggerItem>
          )}

          <StaggerItem className="hidden self-stretch lg:block">
            <span aria-hidden className="block h-full w-px bg-black/10" />
          </StaggerItem>

          <StaggerItem className="flex h-full flex-col">
            <motion.ul
              ref={articlesRef}
              className="flex flex-1 flex-col justify-between divide-y divide-black/10 border-y border-black/10 lg:border-t-0 lg:pt-0"
              initial={reduce ? false : "hidden"}
              animate={articlesVisible ? "show" : "hidden"}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              }}
            >
              {sidebarItems.map((item, index) => (
                <motion.li
                  key={
                    item.kind === "blog"
                      ? `blog-${item.blog.slug}`
                      : `article-${item.article.url}-${index}`
                  }
                  variants={reduce ? undefined : listItemVariants}
                >
                  {item.kind === "blog" ? (
                    <a
                      href={blogHref(item.blog.slug)}
                      className="group flex flex-col gap-2 py-3.5 transition-opacity hover:opacity-70"
                    >
                      <Tag>{item.blog.category}</Tag>
                      <h3 className="text-base leading-snug font-medium text-black sm:text-lg">
                        {item.blog.title}
                      </h3>
                      {item.blog.readTime && (
                        <span className="text-sm text-black/45">{item.blog.readTime}</span>
                      )}
                    </a>
                  ) : (
                    <a
                      href={item.article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-2 py-3.5 transition-opacity hover:opacity-70"
                    >
                      <Tag>Article</Tag>
                      <h3 className="text-base leading-snug font-medium text-black sm:text-lg">
                        {item.article.title}
                      </h3>
                    </a>
                  )}
                </motion.li>
              ))}
            </motion.ul>
            <motion.a
              ref={ctaRef}
              href={"/resources"}
              className="text-brand mt-4 inline-block text-sm font-semibold transition-opacity hover:opacity-70"
              initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
              animate={
                ctaVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.96 }
              }
              transition={{
                duration: 0.7,
                ease: EASE,
                delay: reduce ? 0 : 0.1 + sidebarItems.length * 0.1,
              }}
            >
              {newsSection.ctaLabel}
            </motion.a>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
