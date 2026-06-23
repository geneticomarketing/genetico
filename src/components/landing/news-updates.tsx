"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { EASE, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { COMING_SOON_PATH } from "@/lib/routes";

type Article = {
  tag: string;
  title: string;
  excerpt?: string;
  readTime?: string;
  image?: string;
  author?: string;
  date?: string;
  href?: string;
};

const FEATURED: Article = {
  tag: "News",
  title: "How AIIMS Delhi reduced rare disease diagnosis time from 3 weeks to 4 days",
  excerpt:
    "An inside look at the first year of Genetico's deployment at India's premier rare disease center — the workflow changes, the outcomes, and what other centers can learn.",
  author: "Genetico Team",
  date: "May 2025",
  readTime: "6 mins read",
  image: "/images/news-aiims.jpg",
};

const ARTICLES: Article[] = [
  {
    tag: "Research",
    title: "AI-assisted variant interpretation: accuracy vs. clinical workflow speed",
    readTime: "20 mins read",
  },
  {
    tag: "News",
    title: "Rare disease registries — what India can teach the world",
    readTime: "13 mins read",
  },
  {
    tag: "Blog",
    title: "India's rare disease burden: what the data says in 2025",
    readTime: "6 mins read",
  },
  {
    tag: "Resources",
    title: "Dive deeper into the genetic infrastructural world",
    readTime: "4 mins read",
  },
];

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

function Tag({ children }: { children: string }) {
  return (
    <span className="w-fit rounded-md bg-[#ECEEF1] px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em] text-[#5A5F66] uppercase">
      {children}
    </span>
  );
}

export function NewsUpdates() {
  const reduce = useReducedMotion();

  return (
    <section id="resources" className="bg-[#f6f8fb] px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <StaggerGroup className="flex flex-col items-center gap-4 text-center" stagger={0.12}>
          <StaggerItem>
            <h2 className="t-heading text-black">Latest Updates</h2>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-2xl text-base text-black/55 sm:text-lg sm:leading-normal">
              Key announcements, partnerships, product updates, and ecosystem developments from
              Genetico.
            </p>
          </StaggerItem>
        </StaggerGroup>

        <StaggerGroup
          className="mt-14 grid gap-10 lg:grid-cols-[1.7fr_1px_1fr] lg:gap-12"
          stagger={0.15}
        >
          <StaggerItem>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
              <StaggerGroup className="flex h-full flex-col" stagger={0.08} delayChildren={0.05}>
                <StaggerItem>
                  <div
                    className="aspect-[16/10] w-full rounded-xl bg-gray-200 bg-cover bg-center"
                    style={{ backgroundImage: `url('${FEATURED.image}')` }}
                  />
                </StaggerItem>
                <StaggerItem className="flex flex-1 flex-col gap-4 px-2 pt-5 pb-2">
                  <StaggerGroup className="flex flex-col gap-4" stagger={0.08}>
                    <StaggerItem>
                      <Tag>{FEATURED.tag}</Tag>
                    </StaggerItem>
                    <StaggerItem>
                      <h3 className="text-xl leading-snug font-semibold text-black sm:text-2xl">
                        {FEATURED.title}
                      </h3>
                    </StaggerItem>
                    <StaggerItem>
                      <p className="text-sm leading-relaxed text-black/55">{FEATURED.excerpt}</p>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-[13px] text-black/45">
                        <span>{FEATURED.author}</span>
                        <span aria-hidden className="text-black/20">
                          |
                        </span>
                        <span>{FEATURED.date}</span>
                        <span aria-hidden className="text-black/20">
                          |
                        </span>
                        <span>{FEATURED.readTime}</span>
                      </div>
                    </StaggerItem>
                  </StaggerGroup>
                </StaggerItem>
              </StaggerGroup>
            </article>
          </StaggerItem>

          <StaggerItem className="hidden self-stretch lg:block">
            <span aria-hidden className="block h-full w-px bg-black/10" />
          </StaggerItem>

          <StaggerItem className="flex h-full flex-col">
            <motion.ul
              className="flex flex-1 flex-col justify-between divide-y divide-black/10 border-y border-black/10 lg:border-t-0 lg:pt-0"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              }}
            >
              {ARTICLES.map((article) => (
                <motion.li key={article.title} variants={reduce ? undefined : listItemVariants}>
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
              href={COMING_SOON_PATH}
              className="text-brand mt-6 inline-block text-sm font-semibold transition-opacity hover:opacity-70"
              initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: EASE,
                delay: reduce ? 0 : 0.1 + ARTICLES.length * 0.1,
              }}
            >
              See all &gt;&gt;
            </motion.a>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
