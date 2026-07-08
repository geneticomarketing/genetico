"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { EASE, StaggerGroup, StaggerItem, useInViewAnimation } from "@/components/motion/reveal";
import {
  DEFAULT_HOME_PAGE,
  DEFAULT_NEWS_ARTICLES,
  DEFAULT_NEWS_FEATURED,
} from "@/lib/cms/defaults/home";
import type { NewsArticle } from "@/lib/cms/types";
import { COMING_SOON_PATH } from "@/lib/routes";

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

function Tag({ children, uppercase = true }: { children: string; uppercase?: boolean }) {
  return (
    <span
      className={`w-fit rounded-md bg-[#ECEEF1] px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em] text-[#5A5F66] ${uppercase ? "uppercase" : ""}`}
    >
      {children}
    </span>
  );
}

export function NewsUpdates({
  newsSection = DEFAULT_HOME_PAGE.newsSection,
  featured = DEFAULT_NEWS_FEATURED,
  articles = DEFAULT_NEWS_ARTICLES,
}: {
  newsSection?: {
    heading: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  featured?: NewsArticle | null;
  articles?: NewsArticle[];
}) {
  const reduce = useReducedMotion();
  const { ref: articlesRef, visible: articlesVisible } = useInViewAnimation<HTMLUListElement>();
  const { ref: ctaRef, visible: ctaVisible } = useInViewAnimation<HTMLAnchorElement>();

  return (
    <section id="news" className="bg-white px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <StaggerGroup className="flex flex-col items-center gap-4 text-center" stagger={0.12}>
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
          className="mt-14 grid gap-10 lg:grid-cols-[1.7fr_1px_1fr] lg:gap-12"
          stagger={0.15}
        >
          {featured && (
            <StaggerItem>
              <a
                href={featured.href ?? COMING_SOON_PATH}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
              >
                <StaggerGroup className="flex h-full flex-col" stagger={0.08} delayChildren={0.05}>
                  {featured.image && (
                    <StaggerItem>
                      <div
                        className="aspect-[16/10] w-full rounded-xl bg-gray-200 bg-cover bg-center"
                        style={{ backgroundImage: `url('${featured.image}')` }}
                      />
                    </StaggerItem>
                  )}
                  <StaggerItem className="flex flex-1 flex-col gap-4 px-2 pt-5 pb-2">
                    <StaggerGroup className="flex flex-col gap-4" stagger={0.08}>
                      <StaggerItem>
                        <Tag uppercase={false}>{featured.tag}</Tag>
                      </StaggerItem>
                      <StaggerItem>
                        <h3 className="text-xl leading-snug font-semibold text-black group-hover:text-brand sm:text-2xl">
                          {featured.title}
                        </h3>
                      </StaggerItem>
                      {featured.excerpt && (
                        <StaggerItem>
                          <p className="text-sm leading-relaxed text-black/55">{featured.excerpt}</p>
                        </StaggerItem>
                      )}
                      {(featured.author || featured.date || featured.readTime) && (
                        <StaggerItem>
                          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-[13px] text-black/45">
                            {featured.author && <span>{featured.author}</span>}
                            {featured.author && featured.date && (
                              <span aria-hidden className="text-black/20">
                                |
                              </span>
                            )}
                            {featured.date && <span>{featured.date}</span>}
                            {(featured.author || featured.date) && featured.readTime && (
                              <span aria-hidden className="text-black/20">
                                |
                              </span>
                            )}
                            {featured.readTime && <span>{featured.readTime}</span>}
                          </div>
                        </StaggerItem>
                      )}
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
              {articles.map((article, index) => (
                <motion.li
                  key={`${article.title}-${index}`}
                  variants={reduce ? undefined : listItemVariants}
                >
                  <a
                    href={article.href ?? COMING_SOON_PATH}
                    className="group flex flex-col gap-3 py-5 transition-opacity hover:opacity-70"
                  >
                    <Tag>{article.tag}</Tag>
                    <h3 className="text-lg leading-snug font-medium text-black">{article.title}</h3>
                    {article.readTime && (
                      <span className="text-sm text-black/45">{article.readTime}</span>
                    )}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <motion.a
              ref={ctaRef}
              href={newsSection.ctaHref}
              className="text-brand mt-6 inline-block text-sm font-semibold transition-opacity hover:opacity-70"
              initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
              animate={ctaVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.96 }}
              transition={{
                duration: 0.7,
                ease: EASE,
                delay: reduce ? 0 : 0.1 + articles.length * 0.1,
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
