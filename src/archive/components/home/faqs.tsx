"use client";

import { useId, useState } from "react";

import { Eyebrow } from "@/components/chrome/eyebrow";
import type { HomeFaqContent, HomeSectionMeta } from "@/lib/cms/home-content";

/**
 * Section 05 — the FAQ accordion, and the only FAQ surface on the site: the
 * handoff notes there is no separate FAQ page and links elsewhere point here.
 *
 * One panel open at a time, the first by default, and clicking the open
 * question closes it.
 */
export function Faqs({
  section,
  num,
  content,
}: {
  section: HomeSectionMeta;
  num: string;
  content: HomeFaqContent;
}) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section id={section.id} data-reveal className="px-edge pt-sect-top pb-sect-bot scroll-mt-32">
      <div className="mx-auto max-w-[860px]">
        <Eyebrow>
          {num} · {section.eyebrow}
        </Eyebrow>

        <h2 className="font-headline mt-[26px] mb-3.5 text-center text-[clamp(32px,4vw,50px)] leading-[1.1] tracking-[-0.018em]">
          {content.heading}
        </h2>
        <p className="text-ink-body mx-auto m-0 max-w-[520px] text-center text-[15.5px] leading-[1.72]">
          {content.description}
        </p>

        <div className="border-rule mt-11 border-t">
          {content.items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-question-${i}`;

            return (
              <div key={item.question} className="border-rule border-b">
                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-5 py-[22px] text-left"
                  >
                    <span
                      className={`text-base leading-[1.45] ${
                        isOpen ? "text-primary font-bold" : "text-ink font-normal"
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border text-sm ${
                        isOpen ? "border-primary text-primary" : "border-rule text-ink-soft"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
                  <p className="text-ink-body m-0 max-w-[720px] pr-11 pb-6 text-[14.5px] leading-[1.75]">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
