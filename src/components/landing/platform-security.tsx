"use client";

import { FileText, ShieldCheck, UserCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

type SecurityCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const CARDS: SecurityCard[] = [
  {
    icon: ShieldCheck,
    title: "Clinical-grade Security",
    description:
      "End-to-end encryption and secure infrastructure for sensitive patient data. SOC 2 Type II certified with zero-trust architecture.",
  },
  {
    icon: UserCog,
    title: "Role-based Access Control",
    description:
      "Granular access permissions to ensure appropriate data usage across roles — clinicians, admins, researchers, and institutional leads.",
  },
  {
    icon: FileText,
    title: "Audit & Compliance",
    description:
      "Maintain complete audit trails and adhere to global healthcare data regulations including HIPAA, DPDP, and NHS standards.",
  },
];

function SecurityFeatureCard({ card }: { card: SecurityCard }) {
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

      <a
        href="/#get-in-touch"
        className="mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
      >
        Learn more
        <span aria-hidden>→</span>
      </a>
    </article>
  );
}

export function PlatformSecurity() {
  return (
    <section
      id="security"
      className="relative overflow-hidden px-6 py-20 text-white sm:px-10 sm:py-24 lg:py-28"
      style={{
        background: "linear-gradient(280deg, #12325a 0%, #12327f 46%, #12325a 78%, #12325a 100%)",
      }}
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span aria-hidden className="h-px w-10 bg-white/20 sm:w-16" />
            <p className="t-eyebrow shrink-0 text-[0.7rem] tracking-[0.32em] text-white/50">
              Trust &amp; Safety
            </p>
            <span aria-hidden className="h-px w-10 bg-white/20 sm:w-16" />
          </div>

          <h2
            className="t-heading mx-auto mt-6 max-w-none text-white"
            style={{ fontVariationSettings: '"SERF" 100' }}
          >
            Security &amp; Compliance
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/55 sm:text-base">
            Ensure data protection, privacy, and compliance with healthcare standards at every
            layer.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-8">
          {CARDS.map((card) => (
            <StaggerItem key={card.title} className="h-full">
              <SecurityFeatureCard card={card} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
