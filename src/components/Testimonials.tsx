"use client";

import { useState, useEffect, useRef, memo, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { Reveal } from "./motion/reveal";
import type { TeamMember } from "@/lib/cms/types";
import { DEFAULT_ABOUT_PAGE, DEFAULT_TEAM } from "@/lib/cms/defaults/about";

interface TeamMemberWithQuote extends TeamMember {
  quote?: string;
}

interface AvatarProps {
  person: TeamMemberWithQuote;
  size?: "sm" | "md" | "lg";
  active?: boolean;
  onClick?: () => void;
}

const ORBIT_COUNT = 7;
const ORBIT_RADIUS = 280;
const AUTO_INTERVAL = 5000;

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

function MemberDrawer({ person, onClose }: { person: TeamMemberWithQuote; onClose: () => void }) {
  const [visible, setVisible] = useState(true);

  const requestClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    },
    [requestClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <AnimatePresence onExitComplete={onClose}>
      {visible ? (
        <motion.div
          key="drawer-overlay"
          className="fixed inset-0 flex justify-end"
          style={{ zIndex: 9999999999999999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={requestClose}
          aria-hidden={false}
        >
          <div
            className="bg-navy/60 pointer-events-none absolute inset-0 backdrop-blur-[2px]"
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={`member-drawer-${person.id}`}
            className="relative z-10 flex h-full w-full max-w-[min(100vw,420px)] flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
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
                <p className="t-badge secondaryFont text-[0.68rem] font-semibold tracking-[0.22em] text-white/85 uppercase">
                  {person.title}
                </p>
                <h2
                  id={`member-drawer-${person.id}`}
                  className="mainFont mt-1 text-[clamp(1.75rem,5vw,2.25rem)] leading-tight font-light tracking-tight text-white"
                >
                  {person.name}
                </h2>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-7 py-8">
              {person.quote ? (
                <blockquote className="border-accent border-l-[3px] pl-5">
                  <p className="mainFont text-[1.05rem] leading-relaxed text-[#1a1a1a] italic">
                    &ldquo;{person.quote}&rdquo;
                  </p>
                </blockquote>
              ) : null}

              <div className={person.quote ? "mt-8" : ""}>
                <p className="t-badge secondaryFont text-brand text-[0.68rem] font-semibold tracking-[0.22em] uppercase">
                  About
                </p>
                <p className="secondaryFont mt-3 text-[0.9375rem] leading-relaxed text-[#4a4a4f]">
                  {person.about}
                </p>
              </div>

              {person.linkedinUrl ? (
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand hover:bg-brand/90 secondaryFont mt-auto inline-flex w-fit items-center gap-2.5 rounded-lg px-5 py-3 text-sm font-medium text-white transition-colors"
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

function Avatar({ person, size = "md", active = false, onClick }: AvatarProps) {
  const sizeClass = {
    sm: "size-14 text-sm",
    md: "size-16 text-base",
    lg: "size-36 text-3xl",
  }[size];

  return (
    <button
      onClick={onClick}
      className={`overflow-hidden rounded-full shadow-lg transition-all duration-300 ${sizeClass} ${
        active
          ? "scale-110 ring-2 ring-offset-2 ring-offset-[#eef2f8]"
          : "opacity-70 hover:scale-105 hover:opacity-100"
      }`}
      style={active ? { boxShadow: `0 0 0 2px ${person.color}` } : undefined}
    >
      <TeamPhoto person={person} className="size-full" />
    </button>
  );
}

function LeadershipCarouselComponent({
  team = DEFAULT_TEAM,
  leadership = DEFAULT_ABOUT_PAGE.leadership,
}: {
  team?: TeamMember[];
  leadership?: { eyebrow: string; heading: string; subtitle: string };
}) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const [drawerPerson, setDrawerPerson] = useState<TeamMemberWithQuote | null>(null);
  const angleRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const centerPerson = team[activeIdx];
  const isPaused = paused || drawerPerson !== null;

  const openDrawer = (person: TeamMemberWithQuote) => {
    setDrawerPerson(person);
  };

  const closeDrawer = () => {
    setDrawerPerson(null);
  };

  const selectPerson = (idx: number, openProfile = false) => {
    setActiveIdx(idx);
    if (openProfile) setDrawerPerson(team[idx]);
  };

  useEffect(() => {
    const speed = 0.015;
    const tick = (ts: number) => {
      if (!isPaused) {
        if (lastTimeRef.current !== null) {
          const delta = ts - lastTimeRef.current;
          angleRef.current = (angleRef.current + speed * delta) % 360;
          setOrbitAngle(angleRef.current);
        }
        lastTimeRef.current = ts;
      } else {
        lastTimeRef.current = null;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((i) => (i + 1) % team.length);
    }, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused]);

  const orbitMembers = team.filter((_, i) => i !== activeIdx);
  const orbitSlots = orbitMembers.slice(0, ORBIT_COUNT);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50 px-4 py-16 font-sans sm:px-6 lg:px-4">
      {/* Header */}
      <div className="mb-8 text-center sm:mb-12">
        <Reveal>
          <p className="t-eyebrow mb-2 text-xs font-semibold tracking-widest text-blue-600">
            {leadership.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <h1
            className="mb-3 text-4xl leading-none font-light tracking-tight text-slate-800 sm:text-6xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {leadership.heading}
          </h1>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="text-sm tracking-wide text-slate-400">
            {leadership.subtitle}
          </p>
        </Reveal>
      </div>

      {/* Orbit stage */}
      <div
        className="relative flex w-full max-w-[700px] items-center justify-center lg:w-[700px]"
        style={{ aspectRatio: "1 / 1" }}
        // onMouseEnter={() => setPaused(true)}
        // onMouseLeave={() => setPaused(false)}
      >
        {/* Outer ring */}
        <div
          className="absolute hidden rounded-full border border-slate-300 lg:block"
          style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2 }}
        />
        {/* Inner ring */}
        <div
          className="absolute hidden rounded-full border border-slate-300 lg:block"
          style={{ width: ORBIT_RADIUS * 1.5, height: ORBIT_RADIUS * 1.5 }}
        />

        <div className="w-full lg:hidden">
          <div className="mx-auto max-w-md rounded-[2rem] py-6 md:border md:border-slate-200 md:bg-white/80 md:px-5 md:shadow-[0_10px_40px_rgba(15,23,42,0.08)] md:backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.button
                type="button"
                key={centerPerson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex w-full cursor-pointer flex-col items-center border-0 bg-transparent p-0 text-center"
                onClick={() => openDrawer(centerPerson)}
                aria-label={`Open profile for ${centerPerson.name}`}
              >
                <div
                  className="mb-4 rounded-full p-[3px] shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${centerPerson.color}88, ${centerPerson.color})`,
                    boxShadow: `0 0 40px ${centerPerson.color}33`,
                  }}
                >
                  <div className="h-28 w-28 overflow-hidden rounded-full sm:h-36 sm:w-36">
                    <TeamPhoto person={centerPerson} className="size-full" />
                  </div>
                </div>
                <p
                  className="t-badge mb-1 text-[0.65rem] font-semibold tracking-widest uppercase"
                  style={{ color: centerPerson.color }}
                >
                  {centerPerson.title}
                </p>
                <h2
                  className="mb-3 text-xl leading-tight font-light text-slate-800 sm:text-2xl"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {centerPerson.name}
                </h2>
                <p className="line-clamp-4 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
                  {centerPerson.about}
                </p>
              </motion.button>
            </AnimatePresence>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {team.map((person, i) => (
                <button
                  key={person.id}
                  onClick={() => selectPerson(i, true)}
                  className="overflow-hidden rounded-full border border-slate-200 bg-white transition-all duration-300"
                  style={{
                    width: i === activeIdx ? 42 : 34,
                    height: i === activeIdx ? 42 : 34,
                    boxShadow: i === activeIdx ? `0 0 0 2px ${centerPerson.color}` : undefined,
                  }}
                  aria-label={`View ${person.name}`}
                >
                  <TeamPhoto person={person} className="size-full" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orbiting avatars */}
        <div className="hidden lg:block">
          {orbitSlots.map((person, i) => {
            const angleStep = 360 / orbitSlots.length;
            const deg = ((orbitAngle + i * angleStep) * Math.PI) / 180;
            const x = Math.cos(deg) * ORBIT_RADIUS;
            const y = Math.sin(deg) * ORBIT_RADIUS;
            const avatarOffset = 32; // half of w-16 (64px)

            return (
              <motion.div
                key={person.id}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  x: x - avatarOffset,
                  y: y - avatarOffset,
                }}
                animate={{ x: x - avatarOffset, y: y - avatarOffset }}
                transition={{ type: "tween", ease: "linear", duration: 0 }}
              >
                <Avatar
                  person={person}
                  size="md"
                  onClick={() => {
                    const newIdx = team.findIndex((t) => t.id === person.id);
                    selectPerson(newIdx, true);
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Center person */}
        <AnimatePresence mode="wait">
          <motion.button
            type="button"
            key={centerPerson.id}
            className="absolute hidden cursor-pointer flex-col items-center border-0 bg-transparent p-0 text-center lg:flex"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ zIndex: 10, maxWidth: 260 }}
            onClick={() => openDrawer(centerPerson)}
            aria-label={`Open profile for ${centerPerson.name}`}
          >
            {/* Glowing ring around center image */}
            <div
              className="mb-4 rounded-full p-[3px] shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${centerPerson.color}88, ${centerPerson.color})`,
                boxShadow: `0 0 40px ${centerPerson.color}44`,
              }}
            >
              <div className="h-36 w-36 overflow-hidden rounded-full">
                <TeamPhoto person={centerPerson} className="size-full" />
              </div>
            </div>
            <p
              className="t-badge mb-1 text-xs font-semibold tracking-widest uppercase"
              style={{ color: centerPerson.color }}
            >
              {centerPerson.title}
            </p>
            <h2
              className="mb-3 text-2xl leading-tight font-light text-slate-800"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {centerPerson.name}
            </h2>
            <p className="line-clamp-4 text-sm leading-relaxed text-slate-400">
              {centerPerson.about}
            </p>
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Dot navigation */}
      <div className="mt-6 flex flex-wrap justify-center gap-2 px-2 sm:mt-4">
        {team.map((person, i) => (
          <button
            key={person.id}
            onClick={() => selectPerson(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIdx ? 28 : 8,
              height: 8,
              background: i === activeIdx ? centerPerson.color : "#cbd5e1",
            }}
          />
        ))}
      </div>

      {drawerPerson ? <MemberDrawer person={drawerPerson} onClose={closeDrawer} /> : null}
    </div>
  );
}

export const LeadershipCarousel = memo(LeadershipCarouselComponent);
