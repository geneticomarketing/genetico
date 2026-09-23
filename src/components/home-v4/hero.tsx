import Image from "next/image";
import Link from "next/link";

import { HOME_V4_HERO, HOME_V4_HERO_DOORS, HOME_V4_HUB, HOME_V4_PARTNERS } from "@/content/home-v4";

/**
 * The hub-and-spoke diagram beside the headline.
 *
 * Drawn rather than photographed because it is the page's thesis in one
 * picture: a single record at the centre, and the five places it is used
 * around it. Inline SVG so the labels are real text — selectable, searchable
 * and legible at any zoom — and so both themes' colours come from the same
 * tokens the rest of the band uses.
 *
 * The connectors march outward from the hub to read as flow rather than
 * structure. The dash pattern is 11 units long and the offset travels 22, so
 * the loop is seamless; `motion-safe` drops it entirely when motion is
 * reduced, leaving the same static diagram.
 */
function HubAndSpoke() {
  const hub = HOME_V4_HUB;

  return (
    <svg
      viewBox="0 0 400 440"
      role="img"
      aria-label={hub.alt}
      className="mx-auto block h-auto w-full max-w-[min(460px,86vw)] overflow-visible"
    >
      {/* The arc that closes the fan, so the five spokes read as one system. */}
      <path
        d="M241 18 Q 440 220 241 422"
        fill="none"
        stroke="rgba(143,198,239,0.35)"
        strokeWidth="1"
        strokeDasharray="4 7"
      />

      <g fill="none" stroke="rgba(143,198,239,0.55)" strokeWidth="1.2" strokeDasharray="5 6">
        {hub.spokes.map((spoke) => (
          <path
            key={spoke.key}
            d={`M${hub.x} ${hub.y} L${spoke.x} ${spoke.y}`}
            className="motion-safe:animate-[hero-spoke-flow_1.6s_linear_infinite]"
          />
        ))}
      </g>

      <circle cx={hub.x} cy={hub.y} r="88" fill="rgba(143,198,239,0.10)" />
      <circle cx={hub.x} cy={hub.y} r="64" fill="#ffffff" />
      <text
        x={hub.x}
        y={hub.y - 10}
        textAnchor="middle"
        fontSize="10.5"
        letterSpacing="1.6"
        fill="#0B4C86"
        className="font-mono-label uppercase"
      >
        {hub.label}
      </text>
      <text
        x={hub.x}
        y={hub.y + 9}
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="500"
        fill="#12161A"
        className="font-body"
      >
        {hub.title}
      </text>
      <text
        x={hub.x}
        y={hub.y + 25}
        textAnchor="middle"
        fontSize="10.5"
        fill="#6E767D"
        className="font-body"
      >
        {hub.sub}
      </text>

      {hub.spokes.map((spoke) => (
        <g key={spoke.key}>
          <circle
            cx={spoke.x}
            cy={spoke.y}
            r="40"
            fill="#0B3F6E"
            stroke="#8FC6EF"
            strokeWidth="1.2"
          />
          <text
            x={spoke.x}
            y={spoke.y - 2}
            textAnchor="middle"
            fontSize="9.5"
            letterSpacing="1.1"
            fill="#ffffff"
            className="font-mono-label"
          >
            {spoke.key}
          </text>
          <text
            x={spoke.x}
            y={spoke.y + 13}
            textAnchor="middle"
            fontSize="10.5"
            fill="#B9CFE2"
            className="font-body"
          >
            {spoke.caption}
          </text>
        </g>
      ))}
    </svg>
  );
}

/**
 * The hero of the fourth pass.
 *
 * Unlike v2 and v3 this is a dark band rather than a light sticky panel, and
 * it is a two-column split: the statement on the left, the diagram on the
 * right, and the four audience doors along the foot. The doors are the
 * page's one concession to the old "pick the one that describes you" —
 * they are signposts under the statement rather than the statement itself.
 *
 * A server component: nothing here is interactive, so none of it needs to
 * reach the browser as JavaScript.
 */
export function HomeV4Hero() {
  const hero = HOME_V4_HERO;

  return (
    <section
      id="top"
      className="bg-dark-band px-edge relative scroll-mt-32 pt-[clamp(88px,10vw,128px)] text-white"
    >
      <div className="max-w-site mx-auto grid items-center gap-[clamp(32px,5vw,64px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr))]">
        <div className="flex min-w-0 flex-col justify-center gap-6">
          <span className="font-mono-label text-sky-bright text-[11px] tracking-[0.2em] uppercase">
            {hero.eyebrow}
          </span>
          <h1 className="font-headline m-0 text-[clamp(36px,5vw,62px)] leading-[1.06] tracking-[-0.02em] text-balance">
            {hero.headline}
          </h1>
          <p className="text-sky m-0 max-w-[500px] text-[17px] leading-[1.7] text-pretty">
            {hero.blurb}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-6 gap-y-3.5">
            <Link
              href={hero.primaryCta.href}
              className="text-primary-deep hover:bg-primary-tint rounded-full bg-white px-[26px] py-3 text-sm font-bold transition-colors"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="text-sky flex items-center gap-2.5 text-sm transition-colors hover:text-white"
            >
              <Image
                src="/brand/indigeneus-mark-white.png"
                alt=""
                width={120}
                height={120}
                className="block h-[18px] w-auto"
              />
              <span>{hero.secondaryCta.label}</span>
            </Link>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-[18px]">
          <HubAndSpoke />
          <div className="font-mono-label text-sky-soft flex flex-wrap justify-center gap-x-[22px] gap-y-2.5 text-[10.5px] tracking-[0.16em] uppercase">
            {HOME_V4_HUB.legend.map((item) => (
              <span key={item.label} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={`block h-[9px] w-[9px] rounded-full ${
                    item.filled ? "bg-white" : "border-sky-bright border-[1.5px]"
                  }`}
                />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-site mx-auto mt-[clamp(40px,5vw,64px)] grid border-t border-white/[0.18] [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))]">
        {HOME_V4_HERO_DOORS.map((door) => (
          <Link
            key={door.label}
            href={door.href}
            className="flex flex-col gap-1.5 border-b border-white/10 py-[22px] pr-5 pb-[26px] text-white transition-[color,transform] duration-200 hover:translate-x-[3px] hover:text-[#8FC6EF]"
          >
            <span className="font-mono-label text-sky-bright text-[10.5px] tracking-[0.16em] uppercase">
              {door.label}
            </span>
            <span className="text-[15px] leading-[1.5]">{door.line} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * The institution marquee under the hero.
 *
 * The list is duplicated so the -50% travel lands exactly where it started;
 * the copy is hidden from assistive tech so the names are announced once. The
 * strip pauses on hover, and `motion-safe` holds it still when motion is
 * reduced — at which point it is simply a row of names that runs off the edge,
 * which the mask already implies is longer than the viewport.
 */
export function PartnerStrip() {
  const { label, names } = HOME_V4_PARTNERS;

  return (
    <div className="border-rule-light flex items-center overflow-hidden border-b bg-white py-[18px]">
      <div className="font-mono-label text-ink-soft px-edge relative z-[1] flex-none bg-white pr-[22px] text-[10.5px] tracking-[0.16em] uppercase">
        {label}
      </div>
      <div className="flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="flex w-max gap-12 hover:[animation-play-state:paused] motion-safe:animate-[marquee_44s_linear_infinite]">
          {names.map((name) => (
            <span key={name} className="text-ink-body flex-none text-[14.5px] whitespace-nowrap">
              {name}
            </span>
          ))}
          {names.map((name) => (
            <span
              key={`dup-${name}`}
              aria-hidden
              className="text-ink-body flex-none text-[14.5px] whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
