"use client";

import { useCallback, useEffect, useState, memo } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";

import { EASE, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { DEFAULT_ABOUT_PAGE, DEFAULT_TEAM } from "@/lib/cms/defaults/about";
import type { TeamMember } from "@/lib/cms/types";

function InitialsAvatar({ person, className }: { person: TeamMember; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${person.bg} ${className ?? ""}`}
    >
      <span className="font-semibold text-white">{person.initials}</span>
    </div>
  );
}

function TeamPhoto({
  person,
  className,
  imgClassName = "size-full object-cover object-top",
}: {
  person: TeamMember;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <InitialsAvatar person={person} className={className} />;
  }

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <img
        src={encodeURI(person.image)}
        alt={person.name}
        className={imgClassName}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function MemberDrawer({ person, onClose }: { person: TeamMember; onClose: () => void }) {
  const [visible, setVisible] = useState(true);

  const requestClose = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [requestClose]);

  return createPortal(
    <AnimatePresence onExitComplete={onClose}>
      {visible ? (
        <motion.div
          key="drawer-overlay"
          className="fixed inset-0 z-[100] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={requestClose}
        >
          <div className="bg-navy/60 pointer-events-none absolute inset-0 backdrop-blur-[2px]" aria-hidden />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={`member-drawer-${person.id}`}
            className="relative z-10 flex h-full w-full max-w-[min(100vw,420px)] flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative shrink-0">
              <TeamPhoto
                person={person}
                className="h-[min(42vh,320px)] w-full"
                imgClassName="size-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 35%, rgba(0,16,31,0.55) 70%, #00101f 100%)",
                }}
              />
              <button
                type="button"
                onClick={requestClose}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                aria-label="Close profile"
              >
                <X className="h-4 w-4" strokeWidth={2.25} />
              </button>
              <div className="absolute right-0 bottom-0 left-0 px-7 pb-7">
                <p className="t-badge text-[0.68rem] font-semibold tracking-[0.22em] text-white/85 uppercase">
                  {person.title}
                </p>
                <h2
                  id={`member-drawer-${person.id}`}
                  className="mt-1 text-[clamp(1.75rem,5vw,2.25rem)] leading-tight font-light tracking-tight text-white"
                >
                  {person.name}
                </h2>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-7 py-8">
              <p className="t-badge text-brand text-[0.68rem] font-semibold tracking-[0.22em] uppercase">
                About
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#4a4a4f]">{person.about}</p>

              {person.linkedinUrl ? (
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand hover:bg-brand/90 mt-auto inline-flex w-fit items-center gap-2.5 rounded-lg px-5 py-3 text-sm font-medium text-white transition-colors"
                >
                  <FaLinkedinIn className="h-4 w-4" aria-hidden />
                  Connect on LinkedIn
                </a>
              ) : null}
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function MemberCard({
  person,
  onOpen,
}: {
  person: TeamMember;
  onOpen: (person: TeamMember) => void;
}) {
  return (
    <motion.article
      layout={false}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group flex h-full flex-col overflow-hidden border border-black/[0.08] bg-white shadow-[0_6px_20px_rgba(2,67,133,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(2,67,133,0.1)]"
    >
      <button
        type="button"
        onClick={() => onOpen(person)}
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8eef5] text-left"
        aria-label={`Open profile for ${person.name}`}
      >
        <TeamPhoto
          person={person}
          className="size-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          imgClassName="size-full object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-80" />
      </button>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="t-badge text-brand text-[0.6rem] font-semibold tracking-[0.16em] uppercase">
          {person.title}
        </p>
        <h3 className="mt-1.5 text-base font-medium tracking-tight text-[#121212] sm:text-[1.05rem]">
          {person.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-black/55">{person.about}</p>

        <div className="mt-auto flex items-center gap-2 pt-3.5">
          <button
            type="button"
            onClick={() => onOpen(person)}
            className="text-brand inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70 sm:text-[13px]"
          >
            View profile
            <ArrowUpRight className="size-3" aria-hidden />
          </button>
          {person.linkedinUrl ? (
            <a
              href={person.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex size-7 items-center justify-center rounded-full border border-black/10 text-[#0a66c2] transition-colors hover:border-[#0a66c2]/30 hover:bg-[#0a66c2]/5"
              aria-label={`${person.name} on LinkedIn`}
              onClick={(event) => event.stopPropagation()}
            >
              <FaLinkedinIn className="size-3" aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function LeadershipCarouselComponent({
  team = DEFAULT_TEAM,
  leadership = DEFAULT_ABOUT_PAGE.leadership,
}: {
  team?: TeamMember[];
  leadership?: { eyebrow: string; heading: string; subtitle: string };
}) {
  const [drawerPerson, setDrawerPerson] = useState<TeamMember | null>(null);

  return (
    <section className="relative overflow-hidden bg-mist px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-brand-glow absolute top-0 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <StaggerGroup className="mx-auto max-w-3xl text-center" stagger={0.12}>
          <StaggerItem>
            <p className="t-eyebrow text-brand">{leadership.eyebrow}</p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="t-heading mx-auto mt-4 text-balance text-[#121212]">
              {leadership.heading}
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 text-base leading-relaxed text-black/55 sm:text-lg">
              {leadership.subtitle}
            </p>
          </StaggerItem>
        </StaggerGroup>

        <StaggerGroup
          className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
          stagger={0.08}
          delayChildren={0.06}
        >
          {team.map((person) => (
            <StaggerItem key={person.id} className="h-full">
              <MemberCard person={person} onOpen={setDrawerPerson} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {drawerPerson ? <MemberDrawer person={drawerPerson} onClose={() => setDrawerPerson(null)} /> : null}
    </section>
  );
}

export const LeadershipCarousel = memo(LeadershipCarouselComponent);
