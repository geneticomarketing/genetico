"use client";

import { FileText, ShieldCheck, UserCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { DEFAULT_PLATFORM_PAGE } from "@/lib/cms/defaults/platform";
import type { PlatformPageData, SecurityCard } from "@/lib/cms/types";

const SECURITY_ICONS = [ShieldCheck, UserCog, FileText] as const;

type SecurityCardWithIcon = SecurityCard & { icon: LucideIcon };

function SecurityFeatureCard({ card }: { card: SecurityCardWithIcon }) {
  const Icon = card.icon;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/6 p-7 backdrop-blur-sm sm:p-8">
      <div className="grid size-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
        <Icon className="text-accent size-5" strokeWidth={1.75} />
      </div>

      <h3
        className="t-card-title mt-6 max-w-none text-white"
        style={{ fontVariationSettings: '"SERF" 100' }}
      >
        {card.title}
      </h3>

      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-white/55 sm:text-base">
        {card.description}
      </p>
    </article>
  );
}

export function PlatformSecurity({
  section = DEFAULT_PLATFORM_PAGE.security,
}: {
  section?: PlatformPageData["security"];
}) {
  const cards: SecurityCardWithIcon[] = section.cards.map((card, index) => ({
    ...card,
    icon: SECURITY_ICONS[index] ?? ShieldCheck,
  }));

  return (
    <section
      id="security"
      className="bg-brand-deep relative overflow-hidden px-6 py-20 text-white sm:px-10 sm:py-24 lg:py-28"
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span aria-hidden className="throbbing-bgH h-px w-10 rounded-full sm:w-16" />
            <p className="t-eyebrow text-accent shrink-0 text-[0.7rem] tracking-[0.32em]">
              {section.eyebrow}
            </p>
            <span aria-hidden className="throbbing-bgH h-px w-10 rounded-full sm:w-16" />
          </div>

          <h2
            className="t-heading mx-auto mt-6 max-w-none text-white"
            style={{ fontVariationSettings: '"SERF" 100' }}
          >
            {section.heading}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/55 sm:text-base">
            {section.description}
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <StaggerItem key={card.title} className="h-full">
              <SecurityFeatureCard card={card} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
