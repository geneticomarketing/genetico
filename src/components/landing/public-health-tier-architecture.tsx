"use client";

import { motion, useReducedMotion } from "motion/react";

import { EASE, StaggerGroup, StaggerItem, useInViewAnimation } from "@/components/motion/reveal";
import { DEFAULT_PUBLIC_HEALTH_PAGE } from "@/lib/cms/defaults/public-health";
import type { PublicHealthClassification, PublicHealthPageData } from "@/lib/cms/types";

type Classification = PublicHealthClassification;

const HUB = { x: 108, y: 188, r: 52 };
const C_RADIUS = 104;
const D_RADIUS = 172;
const C_ANGLES = [-54, -17, 21, 56];
const D_ANGLES = [-68, 16, 60];
const PLUS_ANGLES = [-35.5, 2, 37.5];

const FONT_SANS = "var(--font-sans), ui-sans-serif, system-ui, sans-serif";

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const SPOKE_C = C_ANGLES.map((deg) => {
  const { x, y } = polar(HUB.x, HUB.y, C_RADIUS, deg);
  return { x, y, label: "SPOKE C", sub: "Class C" };
});

const SPOKE_D = D_ANGLES.map((deg) => {
  const { x, y } = polar(HUB.x, HUB.y, D_RADIUS, deg);
  return { x, y, label: "SPOKE D", sub: "Class D", angle: deg };
});

const INNER_ARC_START = polar(HUB.x, HUB.y, C_RADIUS, C_ANGLES[0]);
const INNER_ARC_END = polar(HUB.x, HUB.y, C_RADIUS, C_ANGLES[C_ANGLES.length - 1]);
const OUTER_ARC_START = polar(HUB.x, HUB.y, D_RADIUS - 8, D_ANGLES[0]);
const OUTER_ARC_END = polar(HUB.x, HUB.y, D_RADIUS - 8, D_ANGLES[D_ANGLES.length - 1]);

const INNER_ARC_D = `M ${INNER_ARC_START.x} ${INNER_ARC_START.y} A ${C_RADIUS} ${C_RADIUS} 0 1 1 ${INNER_ARC_END.x} ${INNER_ARC_END.y}`;
const OUTER_BAND_D = `M ${OUTER_ARC_START.x} ${OUTER_ARC_START.y} A ${D_RADIUS - 8} ${D_RADIUS - 8} 0 1 1 ${OUTER_ARC_END.x} ${OUTER_ARC_END.y}`;
const OUTER_DASH_D = `M ${polar(HUB.x, HUB.y, D_RADIUS, D_ANGLES[0]).x} ${polar(HUB.x, HUB.y, D_RADIUS, D_ANGLES[0]).y} A ${D_RADIUS} ${D_RADIUS} 0 1 1 ${polar(HUB.x, HUB.y, D_RADIUS, D_ANGLES[2]).x} ${polar(HUB.x, HUB.y, D_RADIUS, D_ANGLES[2]).y}`;

function TagPill({ children }: { children: string }) {
  return (
    <span className="t-badge secondaryFont text-brand rounded-full bg-[#eef4f9] px-3 py-1.5 text-[0.68rem] font-medium">
      {children}
    </span>
  );
}

function ClassificationBlock({ item, index }: { item: Classification; index: number }) {
  return (
    <StaggerItem>
      <article className={index > 0 ? "border-t border-[#e8ebf0] pt-8" : ""}>
        <div className="flex flex-wrap items-center gap-2">
          <span aria-hidden className="bg-brand size-1.5 shrink-0 rounded-full" />
          <span className="t-badge secondaryFont text-[0.62rem] font-semibold tracking-[0.14em] text-[#6e6e73] uppercase">
            {item.level}
          </span>
          {item.timeBadge && (
            <span className="t-badge secondaryFont text-brand rounded-full bg-[#e8f4fc] px-2 py-0.5 text-[0.6rem] font-semibold">
              {item.timeBadge}
            </span>
          )}
        </div>

        <h3 className="secondaryFont mt-3 text-[1.05rem] font-semibold text-[#121212] sm:text-[1rem]">
          {item.title}
        </h3>

        <p className="secondaryFont mt-2 text-[0.9rem] leading-relaxed text-[#8f8f8f] sm:text-[0.9375rem]">
          {item.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      </article>
    </StaggerItem>
  );
}

function HubSpokeDiagram() {
  const reduce = useReducedMotion();
  const { ref, visible } = useInViewAnimation();
  const show = Boolean(reduce) || visible;

  return (
    <StaggerItem className="flex items-center justify-center lg:justify-end">
      <div ref={ref} className="relative w-full max-w-[min(100%,480px)]">
        <svg viewBox="0 0 520 380" className="h-auto w-full" aria-hidden>
          <defs>
            <radialGradient id="ph-hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5fd7cb" stopOpacity="0.42" />
              <stop offset="55%" stopColor="#024385" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#024385" stopOpacity="0" />
            </radialGradient>
            <filter id="ph-hub-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          {/* Outer pale band */}
          <motion.path
            d={OUTER_BAND_D}
            fill="none"
            stroke="#5fd7cb"
            strokeWidth="36"
            strokeOpacity="0.14"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          />

          {/* Outer dashed path through spoke D */}
          <motion.path
            d={OUTER_DASH_D}
            fill="none"
            stroke="#b8d9f0"
            strokeWidth="1.25"
            strokeDasharray="5 7"
            className={reduce ? undefined : "ph-tier-dash"}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
          />

          {/* Inner dashed arc through spoke C */}
          <motion.path
            d={INNER_ARC_D}
            fill="none"
            stroke="#b8d9f0"
            strokeWidth="1.25"
            strokeDasharray="5 7"
            className={reduce ? undefined : "ph-tier-dash"}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.28 }}
          />

          {/* Hub → Spoke C solid spokes */}
          {SPOKE_C.map((node, i) => (
            <motion.line
              key={`hub-spoke-${i}`}
              x1={HUB.x}
              y1={HUB.y}
              x2={node.x}
              y2={node.y}
              stroke="#b8d9f0"
              strokeWidth="1.25"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.2 + i * 0.07 }}
            />
          ))}

          {/* Spoke D → inner arc dotted links */}
          {SPOKE_D.map((node, i) => {
            const inner = polar(HUB.x, HUB.y, C_RADIUS + 6, node.angle);
            return (
              <motion.line
                key={`d-link-${i}`}
                x1={inner.x}
                y1={inner.y}
                x2={node.x}
                y2={node.y}
                stroke="#b8d9f0"
                strokeWidth="1.25"
                strokeDasharray="4 6"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={show ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.55 + i * 0.1 }}
              />
            );
          })}

          {/* Plus icons on inner arc */}
          {PLUS_ANGLES.map((deg, i) => {
            const { x, y } = polar(HUB.x, HUB.y, C_RADIUS, deg);
            return (
              <motion.g
                key={`plus-${i}`}
                initial={reduce ? false : { opacity: 0, scale: 0.5 }}
                animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.45 + i * 0.08 }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                <rect
                  x={x - 11}
                  y={y - 8}
                  width="22"
                  height="16"
                  rx="5"
                  fill="white"
                  stroke="#b8d9f0"
                  strokeWidth="1.25"
                />
                <text
                  x={x}
                  y={y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#024385"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily={FONT_SANS}
                >
                  +
                </text>
              </motion.g>
            );
          })}

          {/* Hub glow */}
          {reduce ? (
            <circle
              cx={HUB.x}
              cy={HUB.y}
              r={HUB.r + 22}
              fill="url(#ph-hub-glow)"
              filter="url(#ph-hub-blur)"
            />
          ) : (
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              r={HUB.r + 22}
              fill="url(#ph-hub-glow)"
              filter="url(#ph-hub-blur)"
              className="ph-hub-pulse"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.75, ease: EASE }}
            />
          )}

          {/* Hub core */}
          <motion.g
            initial={reduce ? false : { scale: 0 }}
            animate={show ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.05 }}
            style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
          >
            <circle cx={HUB.x} cy={HUB.y} r={HUB.r} fill="#024385" />
            <text
              x={HUB.x}
              y={HUB.y - 12}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="700"
              fontFamily={FONT_SANS}
            >
              HUB A/B
            </text>
            <text
              x={HUB.x}
              y={HUB.y + 2}
              textAnchor="middle"
              fill="white"
              fontSize="10.5"
              fontWeight="700"
              fontFamily={FONT_SANS}
            >
              NPRD
            </text>
            <text
              x={HUB.x}
              y={HUB.y + 16}
              textAnchor="middle"
              fill="white"
              fontSize="8.5"
              fontWeight="500"
              opacity={0.88}
              fontFamily={FONT_SANS}
            >
              National Registry
            </text>
          </motion.g>

          {/* Spoke C nodes */}
          {SPOKE_C.map((node, i) => (
            <motion.g
              key={`c-${i}`}
              initial={reduce ? false : { opacity: 0, scale: 0.65 }}
              animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.65 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.38 + i * 0.07 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r="36"
                fill="white"
                stroke="#b8d9f0"
                strokeWidth="1.5"
              />
              <text
                x={node.x}
                y={node.y - 3}
                textAnchor="middle"
                fill="#024385"
                fontSize="9.5"
                fontWeight="700"
                fontFamily={FONT_SANS}
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y={node.y + 11}
                textAnchor="middle"
                fill="#6e6e73"
                fontSize="8.5"
                fontFamily={FONT_SANS}
              >
                {node.sub}
              </text>
            </motion.g>
          ))}

          {/* Spoke D nodes */}
          {SPOKE_D.map((node, i) => (
            <motion.g
              key={`d-${i}`}
              initial={reduce ? false : { opacity: 0, scale: 0.65 }}
              animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.65 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.62 + i * 0.1 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r="34"
                fill="white"
                stroke="#b8d9f0"
                strokeWidth="1.5"
              />
              <text
                x={node.x}
                y={node.y - 3}
                textAnchor="middle"
                fill="#024385"
                fontSize="9"
                fontWeight="700"
                fontFamily={FONT_SANS}
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y={node.y + 10}
                textAnchor="middle"
                fill="#6e6e73"
                fontSize="8"
                fontFamily={FONT_SANS}
              >
                {node.sub}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>
    </StaggerItem>
  );
}

export function PublicHealthTierArchitecture({
  section = DEFAULT_PUBLIC_HEALTH_PAGE.architecture,
}: {
  section?: PublicHealthPageData["architecture"];
}) {
  const CLASSIFICATIONS = section.classifications;
  return (
    <section
      id="tier-architecture"
      className="bg-[#f6f8fb] px-6 py-20 text-[#121212] sm:px-10 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <StaggerGroup className="mx-auto max-w-3xl text-center" stagger={0.1}>
          <StaggerItem>
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <span aria-hidden className="throbbing-bgH h-px w-12 shrink-0 rounded-full" />
              <p className="t-eyebrow secondaryFont text-brand shrink-0 text-[0.7rem] tracking-[0.36em]">
                {section.eyebrow}
              </p>
              <span aria-hidden className="throbbing-bgH h-px w-12 shrink-0 rounded-full" />
            </div>
          </StaggerItem>

          <StaggerItem className="t-intro mx-auto mt-8">
            <h2 className="t-heading text-balance text-[#121212]">{section.heading}</h2>
            <p className="secondaryFont t-subhead mt-5 text-[15px] leading-relaxed text-[#8f8f8f] sm:mt-6 sm:text-base">
              {section.description}
            </p>
          </StaggerItem>
        </StaggerGroup>

        <div className="mt-14 grid items-center gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <StaggerGroup className="space-y-8" stagger={0.12} delayChildren={0.05}>
            <StaggerItem>
              <p className="t-badge secondaryFont text-[0.62rem] font-semibold tracking-[0.18em] text-[#a3afc4] uppercase">
                {section.classificationLabel}
              </p>
            </StaggerItem>
            {CLASSIFICATIONS.map((item, index) => (
              <ClassificationBlock key={item.id} item={item} index={index} />
            ))}
          </StaggerGroup>

          <img src="/ph.png" alt="" />
          {/* <HubSpokeDiagram /> */}
        </div>
      </div>
    </section>
  );
}
