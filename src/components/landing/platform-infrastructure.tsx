"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { EASE, Reveal, StaggerGroup, StaggerItem, useInViewAnimation } from "@/components/motion/reveal";

const INTEGRATION_TAGS = [
  "HL7 / FHIR",
  "EHR Systems",
  "Lab APIs",
  "OMIM",
  "ORPHANET",
  "HAPI-FHIR",
  "Custom Webhooks",
  "DICOM",
];

const DEPLOYMENT_OPTIONS = [
  {
    title: "Cloud-Based",
    description: "Managed infrastructure, auto-scaling, zero operational overhead.",
  },
  {
    title: "On-Premise",
    description: "Full data sovereignty, custom infrastructure, air-gapped options.",
  },
  {
    title: "Hybrid",
    description: "Mix of cloud and on-premise based on data sensitivity policies.",
  },
];

const CYCLE_MS = 1800;
const CROSSFADE = { duration: 0.38, ease: EASE };

function SectionBadge({ label, dotClassName }: { label: string; dotClassName?: string }) {
  return (
    <span className="text-brand inline-flex w-fit items-center gap-2 rounded-full bg-[#e8f4fc] px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase">
      <span aria-hidden className={`size-1.5 rounded-full ${dotClassName ?? "bg-accent"}`} />
      {label}
    </span>
  );
}

function IntegrationsCard() {
  const { ref, visible, reduce } = useInViewAnimation();

  return (
    <article ref={ref} className="flex h-full flex-col rounded-2xl bg-[#f4f6f8] p-6 sm:p-8">
      <SectionBadge label="Integrations" />

      <div className="mt-8 flex flex-1 flex-col justify-center gap-3 sm:mt-10">
        <div className="flex flex-wrap gap-2.5">
          {INTEGRATION_TAGS.slice(0, 4).map((tag, index) => (
            <motion.span
              key={tag}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: EASE, delay: index * 0.05 }}
              className="rounded-lg border border-[#dfe6ee] bg-white px-4 py-2.5 text-[13px] text-black/70"
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {INTEGRATION_TAGS.slice(4).map((tag, index) => (
            <motion.span
              key={tag}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.2 + index * 0.05 }}
              className="rounded-lg border border-[#dfe6ee] bg-white px-4 py-2.5 text-[13px] text-black/70"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="border-line mt-8 border-t pt-8">
        <h3
          className="t-card-title max-w-none text-black"
          style={{ fontVariationSettings: '"SERF" 100' }}
        >
          Integrations
        </h3>
        <p className="text-ink-muted mt-3 text-[15px] leading-relaxed sm:text-base">
          IndiGeneUs.AI is designed to work alongside your existing digital ecosystem. Connect with
          hospital information systems, laboratory platforms, genetic testing workflows, and external
          knowledge resources to create a unified clinical experience.
        </p>
      </div>
    </article>
  );
}

function DeploymentCard() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % DEPLOYMENT_OPTIONS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <article className="flex h-full flex-col rounded-2xl bg-[#f4f6f8] p-6 sm:p-8">
      <SectionBadge label="Deployment" dotClassName="bg-brand" />

      <div className="mt-8 flex flex-1 flex-col justify-center gap-3 sm:mt-10">
        {DEPLOYMENT_OPTIONS.map((option, index) => {
          const isActive = index === active;
          return (
            <motion.div
              key={option.title}
              animate={{
                backgroundColor: isActive ? "#e8f4fc" : "#ffffff",
                borderColor: isActive ? "rgba(2, 67, 133, 0.35)" : "#dfe6ee",
              }}
              transition={CROSSFADE}
              className="rounded-xl border px-4 py-4 sm:px-5 sm:py-4"
            >
              <div className="flex items-start gap-3">
                <motion.span
                  aria-hidden
                  className="mt-1.5 size-2 shrink-0 rounded-full"
                  animate={{
                    backgroundColor: isActive ? "#024385" : "#c5d0dc",
                    scale: isActive && !reduce ? [1, 1.15, 1] : 1,
                  }}
                  transition={
                    isActive && !reduce
                      ? { duration: 0.9, repeat: Infinity, ease: EASE }
                      : CROSSFADE
                  }
                />
                <div>
                  <p
                    className={`text-[15px] font-semibold ${isActive ? "text-black" : "text-black/75"}`}
                  >
                    {option.title}
                  </p>
                  <p className="text-ink-muted mt-1 text-[13px] leading-relaxed sm:text-sm">
                    {option.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="border-line mt-8 border-t pt-8">
        <h3
          className="t-card-title max-w-none text-black"
          style={{ fontVariationSettings: '"SERF" 100' }}
        >
          Deployment Flexibility
        </h3>
        <p className="text-ink-muted mt-3 text-[15px] leading-relaxed sm:text-base">
          Whether deployed on-premise or in the cloud, IndiGeneUs.AI adapts to institutional security,
          compliance, and operational requirements while ensuring scalability and performance.
        </p>
      </div>
    </article>
  );
}

export function PlatformInfrastructure() {
  return (
    <section id="infrastructure" className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <p className="t-eyebrow text-[0.7rem] tracking-[0.32em] text-[#7a8fa8]">
                  Infrastructure
                </p>
                <span aria-hidden className="bg-accent h-0.5 w-10 sm:w-14" />
              </div>
              <h2
                className="t-heading mt-5 max-w-none text-black"
                style={{ fontVariationSettings: '"SERF" 100' }}
              >
                Built for Enterprise Healthcare Environments
              </h2>
            </div>
            <p className="text-ink-muted max-w-md text-[15px] leading-relaxed sm:text-base lg:justify-self-end lg:pb-1">
              Designed to integrate with existing healthcare ecosystems while providing the flexibility
              to deploy across hospitals, research institutions, and public health programs without
              disrupting existing workflows.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-2 lg:gap-8">
          <StaggerItem className="h-full">
            <IntegrationsCard />
          </StaggerItem>
          <StaggerItem className="h-full">
            <DeploymentCard />
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
