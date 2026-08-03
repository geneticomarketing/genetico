"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { EASE, StaggerGroup, StaggerItem, useInViewAnimation } from "@/components/motion/reveal";
import { DEFAULT_HOME_PAGE } from "@/lib/cms/defaults/home";
import type { FaqItem } from "@/lib/cms/types";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function FaqRow({
  item,
  index,
  open,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.li variants={reduce ? undefined : itemVariants} className="border-b border-black/10">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-start justify-between gap-6 py-5 text-left sm:py-6"
        >
          <span
            className={`text-base leading-snug font-semibold transition-colors duration-300 sm:text-[1rem] ${
              open ? "text-brand" : "text-black group-hover:text-brand"
            }`}
          >
            {item.question}
          </span>
          <span
            aria-hidden
            className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
              open
                ? "border-brand/30 bg-brand/5 text-brand"
                : "border-black/15 text-black/45 group-hover:border-brand/30 group-hover:text-brand"
            }`}
          >
            <motion.span
              className="relative block size-3.5"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
            >
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
              <motion.span
                className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current"
                animate={{ scaleY: open ? 0 : 1 }}
                transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
              />
            </motion.span>
          </span>
        </button>
      </h3>

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="grid"
        initial={false}
        animate={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
      >
        <div className="overflow-hidden">
          <motion.p
            className="max-w-3xl pb-5 text-[15px] leading-relaxed text-black/55 sm:pb-6 sm:text-base"
            initial={false}
            animate={{
              opacity: open ? 1 : 0,
              y: open ? 0 : 8,
            }}
            transition={{
              duration: reduce ? 0 : 0.3,
              ease: EASE,
              delay: open && !reduce ? 0.06 : 0,
            }}
          >
            {item.answer}
          </motion.p>
        </div>
      </motion.div>
    </motion.li>
  );
}

export function HomeFaqs({
  eyebrow = DEFAULT_HOME_PAGE.faqSection.eyebrow,
  heading = DEFAULT_HOME_PAGE.faqSection.heading,
  description = DEFAULT_HOME_PAGE.faqSection.description,
  items = DEFAULT_HOME_PAGE.faqSection.items,
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items?: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const reduce = useReducedMotion();
  const { ref: listRef, visible: listVisible } = useInViewAnimation<HTMLUListElement>();

  return (
    <section id="faqs" className="relative overflow-hidden bg-white px-5 py-20 sm:px-10 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-black/5" />
        <div className="bg-brand-glow absolute top-[-20%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <StaggerGroup className="flex flex-col items-center text-center" stagger={0.12}>
          <StaggerItem className="mx-auto w-full max-w-4xl text-center relative flex items-center justify-center gap-4 sm:gap-6">
            <span
              aria-hidden
              className="throbbing-bgH h-px w-12 shrink-0 rounded-full sm:w-20 md:w-28"
            />
            <p className="font-jetbrains-mono text-sm font-medium tracking-[0.08em] text-brand">
              {eyebrow}
            </p>
            <span
              aria-hidden
              className="throbbing-bgH h-px w-12 shrink-0 rounded-full sm:w-20 md:w-28"
            />
          </StaggerItem>
          <StaggerItem>
            <h2 className="t-heading mt-4 text-balance text-[#121212]">{heading}</h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/55 sm:text-[1rem]">
              {description}
            </p>
          </StaggerItem>
        </StaggerGroup>

        <motion.ul
          ref={listRef}
          className="mt-12 border-t border-black/10 sm:mt-14"
          initial={reduce ? false : "hidden"}
          animate={listVisible ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
          }}
        >
          {items.map((item, index) => (
            <FaqRow
              key={item.question}
              item={item}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
