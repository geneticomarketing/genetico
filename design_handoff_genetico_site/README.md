# Handoff: Genetico website (7 pages)

## Overview
A complete marketing/product website for **Genetico** and its platform **IndiGeneUs.AI** — rare-disease clinical intelligence infrastructure for India. Seven pages: Home, Platform, Hospital/Clinician/CoE, Life Science/Biotech, Public Health, Resources, About Us. All share one header, section rail, contact section and footer.

Audience framing across the site: **who** (About) → **what** (Platform) → **for whom** (Hospital / Life Science / Public Health) → **proof** (Resources), with Home as the condensation of all six.

## About the design files
The files in `design/` are **design references authored in HTML** — prototypes that show the intended look, copy and behaviour. They are **not production code to copy**.

They are written as "Design Components": each `*.dc.html` is a single file containing a markup template plus a small logic class, executed by the bundled `support.js` runtime. **Do not port `support.js` or the `<x-dc>` / `<sc-for>` / `<sc-if>` / `{{ }}` template syntax into the real codebase.** Read them as specifications:

- `<x-dc>…</x-dc>` = the page body markup. All styling is **inline `style=""`** by design (a constraint of the prototyping tool) — in production these should become your normal styling layer (CSS modules / Tailwind / styled-components).
- `style-hover=""`, `style-active=""`, `style-focus=""` = `:hover` / `:active` / `:focus` rules.
- `<sc-for list="{{ items }}" as="item">` = `items.map(...)`.
- `<sc-if value="{{ flag }}">` = conditional render.
- `{{ name }}` = a value returned from the logic class's `renderVals()`.
- `class Component extends DCLogic { state = …; renderVals() { … } }` = a React class component; `renderVals()` returns everything the template consumes (data, handlers, computed style strings). Treat it as the component's state + derived props.
- `<helmet>` at the top of each template = what belongs in `<head>` (Google Font links, `@keyframes`, body reset).

**The task**: **update the existing genetico.in codebase to match these designs.** This is a redesign of a live site, not a greenfield build — so:

1. **Survey the existing app first.** Identify its framework, styling layer, routing, component conventions, and where the current page content lives. Everything below must be expressed in *those* conventions.
2. **Map old → new.** For each of the seven designs, find the existing route/page it replaces. Where a design introduces a page the codebase lacks (the Home layout is new; there is no FAQ page), note it before building.
3. **Extract the shared chrome once.** Header, section rail, eyebrow motif, reveal animation, contact section and footer are byte-identical across all seven pages — they should become shared components/layout in the codebase, replacing whatever per-page duplication exists today.
4. **Move design values into the codebase's token layer** (Tailwind config, CSS variables, theme file — whatever is already there) rather than hardcoding hexes per component. The tables below are the source values.
5. **Keep existing behaviour that the designs don't cover** — analytics, SEO metadata, sitemap, redirects, form endpoints, CMS wiring, i18n. The prototypes have none of it; don't drop it.
6. **Preserve existing URLs.** Do not change route paths as a side effect of the redesign.

If the existing codebase turns out to be unsuitable to extend (e.g. a page-builder export with no component layer), say so and propose the migration explicitly instead of silently rewriting — **Next.js (App Router) + TypeScript + Tailwind** would be the natural target: the site is content-driven, mostly static, and benefits from per-page metadata and static rendering.

### Suggested order of work
1. Tokens + fonts into the theme layer.
2. Shared chrome (header, rail, footer, contact section, reveal) as shared components.
3. Page-by-page, simplest first: **About → Public Health → Resources → Life Science → Hospital → Platform → Home**. Home last — it reuses fragments from all the others and has the most bespoke motion.
4. Responsive pass at 880px and 1040px, then the reduced-motion pass.

## Fidelity
**High-fidelity.** Final copy, colours, typography, spacing, motion and interaction states. Recreate pixel-accurately. Every hex value, font size, radius and shadow in the prototypes is intentional and is catalogued in `DESIGN_SYSTEM.md`.

Two known gaps, both awaiting client material — do not invent values:
1. **Resources** has 17 empty `<image-slot>` placeholders (thumbnails for videos/articles).
2. **Platform**'s outcome strip has no real figures yet.

---

## Design tokens

### Typography
Three families, loaded from Google Fonts.

| Role | Family | Notes |
|---|---|---|
| Headlines | **Newsreader** (serif) | weight 400 only, `letter-spacing:-0.02em`, `line-height:1.06–1.14` |
| UI + body | **DM Sans** | 400/500/700 |
| Eyebrows, labels, figures | **IBM Plex Mono** | 400/500 |

Scale:

```
h1        clamp(36px, 5vw, 62px)   Newsreader 400 / lh 1.06 / ls -0.02em
h2        clamp(32px, 4vw, 50px)   Newsreader 400 / lh 1.10 / ls -0.018em
h3        clamp(26px, 3.2vw, 38px) Newsreader 400 / lh 1.14
body      16px / lh 1.75
secondary 14.5px / lh 1.65–1.72
meta      13px, 12.5px
eyebrow   IBM Plex Mono 11px  / ls 0.20em / uppercase
label sm  IBM Plex Mono 10.5px / ls 0.16em / uppercase
```

### Colour

```
Ink          #12161A  primary text
             #3C434A  body
             #6E767D  secondary / eyebrow grey
             #9AA6B1  tertiary
Border       #E4E9ED  standard rule
             #EDF0F2  light rule
Surfaces     #FFFFFF  #FAFBFC  #F4F6F8  #F6F9FA
Primary      #0B4C86  brand blue
             #073B68  deep (buttons)
             #EDF3F9  tint (chips, hover fills)
Accent teal  #4FB3A0  #2E9B82  #1F6E5C   tint #EDF6F3
```

Dark band (footer, outcome strips, security strip):
```css
background: radial-gradient(140% 120% at 0% 0%, #042743 0%, #0A4577 48%, #0F5FA3 100%);
/* text on dark: #fff, #DCE9F4, #B9CFE2, #8FC6EF */
```

Dark problem/challenge tiles:
```css
background: radial-gradient(120% 130% at 25% 20%, #0B4C86, #0A3050, #07161F);
```

### Geometry & elevation

```
Container    max-width 1200px, centred
Gutters      padding: 0 clamp(20px, 4vw, 32px)   ← header, rail, every section, footer
Section pad  clamp(64px, 7vw, 96px) top / clamp(68px, 8vw, 104px) bottom
Radius       12px default · 999px pills · 6–10px chips · 32px 32px 0 0 (Home content sheet)
Card shadow  0 18px 44px rgba(7,59,104,0.06) → 0.10
Hover lift   transform: translateY(-4px); box-shadow: 0 26px 60px rgba(7,59,104,0.16)
Scroll offset scroll-margin-top: 128px on every section
Inputs       height 46px, padding 0 14px, radius 10px, 1px solid #E4E9ED, font-size 14.5px
             textarea: same + padding 12px 14px
Form label   <span> 13.5px / 500 / #12161A, asterisk inside the text ("First name*")
```

### Breakpoints
Driven from JS state in the prototypes (window width listener) because inline styles can't hold media queries. **In production use CSS media queries instead.**

```
narrow  < 880px   → hamburger nav, single-column forms and grids
mid     < 1040px  → stack two-column grids, collapse carousels to stacked cards
```

---

## Shared chrome (identical on all seven pages)

Build these once as real shared components.

### 1. Header — 64px, sticky, `z-index` above content
- Logo left (`assets/genetico-logo.png`), centred nav, "Book a demo" pill right (`#073B68` bg, white, radius 999px, 13–14px/700).
- Nav items: **About · Platform · Solutions ▾ · Resources**.
- **Solutions** dropdown (hover/focus open, click-outside + Escape close):
  - Hospital / Clinician / CoE → `Hospital`
  - Life Science / Biotech → `Life Science`
  - Public Health → `Public Health`
- Below 880px: hamburger → panel listing the current page's sections (the same `sections` array the rail uses).
- Transparent over the hero on pages with a dark/gradient hero; solid white with a `#EDF0F2` bottom rule once scrolled.

### 2. Section rail — fixed, `top: 64px`
Appears after **420px** of scroll. Row of: mono page label, then numbered pills (`01`, `02`…) linking to in-page sections; the active pill (section top ≤ 190px from viewport top) takes the `#EDF3F9` fill / `#073B68` text. A 2px progress line tracks scroll depth. `overflow-x: auto` on narrow screens.

### 3. Eyebrow motif (used to open most sections)
```
hairline gradient rule (72px, linear-gradient(90deg, rgba(11,76,134,0), #0B4C86))
+ mono eyebrow text
+ mirrored rule (gradient reversed)
```
Centred, 22px gap.

### 4. Section reveal
CSS-only, **never JS/IntersectionObserver-gated** — an earlier IO implementation left whole sections invisible.
```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    [data-reveal] { animation: rev linear both; animation-timeline: view(); animation-range: entry 0% entry 55%; }
    @keyframes rev { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:none } }
  }
}
```
Content must be fully visible with animations disabled.

### 5. "Get in touch" section
Four audience tabs, each with its own blurb: **Clinician / Hospital · Life Science / Industry · Government / Public Health · Investor**. Below, a two-column form: first name, last name, email, phone, organisation, message → on submit, swap to a **"Request received"** confirmation state. Submit label is **"Talk to our team"** on every page (the header pill stays "Book a demo"). Sentence-case labels and placeholders.

### 6. Footer
Dark radial band. Short blurb, X / LinkedIn / YouTube circular icon buttons, "Menu" and "Solutions" link columns, legal row, and a giant gradient **GENETICO** wordmark clipped to its container (sized with a container query so it scales without overflow).

---

## Pages

### Home — `design/Home.dc.html`
The condensation of the site; highest UI bar. Sections (`id` → rail label):

| # | id | Label | Content |
|---|---|---|---|
| — | `top` | — | Hero |
| 01 | `who` | Who it's for | "Find your path in one click" — three audience doors |
| 02 | `platform` | Platform | Platform in one glance, four layers |
| 03 | `proof` | Proof | Partner logo marquee + case study + recognition |
| 04 | `trust` | Security | Dark band security/compliance strip |
| 05 | `faqs` | FAQs | Accordion (behind the `showFaqs` prop) |
| 06 | `get-in-touch` | Get in Touch | Closing CTA + contact form |

**Hero** — `position: sticky; top: 0; min-height: calc(100svh - 64px)`, light gradient ground `linear-gradient(180deg,#F4F6F8,#F9FAFB 58%,#FDFDFE)` with an animated `<canvas>` grid behind it. Eyebrow `Genetico · IndiGeneUs.AI`. `h1` at `clamp(34px, min(5vw,7vh), 62px)` ending in a **rotating word** (own span, animated, then a full stop in `#12161A`). Blurb ≤540px. Two CTAs: "Book a demo" (filled `#073B68` pill) and a secondary outline pill. A visual panel sits to the right (max 600px; on narrow it stacks and the panel becomes a fixed-height scaled block).

The content below the hero sits in a white sheet that overlaps the hero: `margin-top:-32px; border-radius:32px 32px 0 0; box-shadow:0 -26px 70px rgba(7,59,104,0.16)` — this produces the hero "scrolling under" effect. Keep the sticky hero + overlapping sheet; it is the page's signature move.

**Prop**: `showFaqs: boolean = true` — when false, the FAQ section and its rail pill both disappear (the rail array is filtered, so numbering stays contiguous).

### Platform — `design/Platform.dc.html`
Full-bleed dark `#04101C` hero with the IndiGeneUs mark. Sections: **01** The Platform / Intelligent Data Capture · **02** Clinical Intelligence & CDSS (dark band) · **03** Longitudinal record · **04** Infrastructure · **05** Security · closing CTA *"Build the Future of Rare Disease Care with IndiGeneUs.AI"*. Data arrays in the logic class: `FEATURES`, `TRUST_LOGOS`, `CASES` (Epilepsy et al.). Outcome strip figures are **placeholders pending real data**.

### Hospital / Clinician / CoE — `design/Hospital.dc.html`
Split hero *"Purpose-built for Centers of Excellence"* + a live consultation card (HPO term chips feeding animated **RAPID Score** bars) + three hero stats.
- **01 The Challenge** — four-card expanding carousel, dark tiles, crossfading body copy.
- **02 The Solution** — four alternating steps, each with a browser-chrome mockup: care pathway · document import/extraction · RAPID Score ranked candidates (clickable → evidence summary) · patient timeline.
- **03 Outcomes** — dark band: Minutes / Reproducible / Registry-ready, each as before→after.
- **04** Book a demo.

**Props**: `autoRotateChallenges: boolean = true`, `animateMockups: boolean = true` (both must respect `prefers-reduced-motion`).

### Life Science / Biotech — `design/Life Science.dc.html`
Centred hero + three hero cards (research-cohort live counter, natural history study, "12 sites synchronized"). Challenge carousel (4 tiles) · three-step solution (intake form, extraction, cohort discovery with filter chips) · Outcomes dark band (90%+ / Standardized / Research-ready) · contact form. `SITES` array drives the site list.

### Public Health — `design/Public Health.dc.html`
Light split hero + a three-tier diagram (stacked bars on a vertical spine). **01** Impact · **02** How It Works (the three levels of India's health system) · **03** Architecture (hub-and-spoke: Hub A/B national ↔ NPRD, Spoke C hospitals) · **04** Book a demo. `IMPACT` array drives section 01.

### Resources — `design/Resources.dc.html`
Video-first library, **tab filters only** (All / Videos / Deep Dives / Media / Articles / Blogs), 17 items. Featured AIIMS Delhi case study (*3 weeks → 4 days*). Then Videos, Deep Dives, Media (Amar Ujala, Global Rare Disease Summit…), Articles, Blogs, and a Subscribe block (Mailchimp clinical digest). `YT = https://youtube.com/@geneticord`.

`image-slot.js` is a **prototyping-only** drag-and-drop image placeholder — replace each `<image-slot>` with a real `<Image>`/`<img>` once thumbnails arrive. 17 slots are currently empty.

### About Us — `design/About Us.dc.html`
Hero *"Building Infrastructure For {rotating word}"* + credential chips (15 Rare Disease Centres · PraGed Mission). Sections: Our Vision (mission/vision pair on a `#F6F9FA` card) · Leadership (photo cards → bio modal) · Rewards & Recognition (dark band) · Trusted Across the Rare Disease Ecosystem (partner logos) · Built for Trust. Designed for Healthcare. (security strip) · Get in touch.

---

## Interactions & behaviour

| Behaviour | Spec |
|---|---|
| Solutions dropdown | opens on hover and on focus; closes on click-outside, Escape, blur, and route change |
| Mobile nav | < 880px; hamburger toggles a panel of the current page's sections; locks body scroll while open |
| Section rail | appears after 420px scroll; active item = last section whose top ≤ 190px; smooth-scrolls with a 128px offset |
| Section reveal | CSS scroll-driven only (see above); no-op under `prefers-reduced-motion` |
| Rotating hero word | timed swap (Home, About); fades/translates the word span only, never reflows the headline |
| Challenge carousels | auto-rotate (Hospital prop-gated), crossfade body copy, pause on hover/focus, arrow-key navigable |
| Mockup animations | looped, decorative, `aria-hidden`; freeze under reduced motion |
| RAPID Score bars | animate width on enter; clicking a candidate opens its evidence summary |
| Leadership modal | focus-trapped, Escape to close, returns focus to the trigger card |
| Resources filters | client-side tab filter over 17 items; "All" default |
| Contact form | required: first name, last name, email, message; email format check; on submit → "Request received" state |
| Hover lift | cards: `translateY(-4px)` + deeper shadow, ~180ms ease-out |

**Accessibility to preserve**: every interactive element is keyboard-reachable with a visible focus ring (`outline: 2px solid #0B4C86; outline-offset: 2px`); decorative canvases/mockups are `aria-hidden`; body text meets 4.5:1 against its ground; nav is a real `<nav>` with a labelled list.

## State
Per page (all client-side, no backend in the prototypes):
- `scrollY` → header solidity + rail visibility + active section
- `width` → `narrow` / `mid` flags (**replace with CSS media queries in production**)
- `menuOpen`, `dropdownOpen`
- carousel index + `paused`
- Resources: `activeFilter`
- Contact: field values, `errors`, `submitted`
- About: `openBioIndex`
- Hospital: selected RAPID candidate

Real data needs: contact form → CRM/email endpoint; Resources items → CMS collection; Subscribe → Mailchimp list; partner logos → CDN. Everything else is static content and should live in typed content modules, not inline in components.

## Assets
`design/assets/` — `genetico-logo.png`, `indigeneus-lockup-white.png`, `indigeneus-mark-black.png`, `indigeneus-mark-white.png`.

Partner/institution logos are loaded remotely from:
```
https://pfmdimjfbcxamkhrozxa.storage.supabase.co/storage/v1/object/public/genetico/media/
```
(e.g. `Vector-1.png` = AIIMS Delhi, `Vector.png` = CDFD). These filenames are opaque — **rename them on migration** and self-host.

Fonts: Newsreader, DM Sans, IBM Plex Mono (Google Fonts). Self-host or use `next/font` to avoid layout shift.

## Screenshots

`screenshots/` holds eight sequential captures per page at ~910px wide (a mid-width viewport — narrower than the 1200px container, so grids are shown mid-reflow rather than at full desktop width). Files are `<page>-01.png` … `<page>-08.png`, top of page to bottom:

```
home-01…08   platform-01…08   hospital-01…08   life-science-01…08
public-health-01…08   resources-01…08   about-01…08
```

Use them for orientation and for checking your build against the intended composition. **They are not the specification** — they are single frames of animated, scroll-driven pages, so carousels, counters, rotating words and reveal animations are frozen mid-state and some captures land on a section boundary. For any exact value, read the HTML and the token tables in this README; open the HTML in a browser to see motion and interaction.

## Files

```
design/
  Home.dc.html            Home (hero + 6 sections)
  Platform.dc.html        IndiGeneUs.AI platform
  Hospital.dc.html        Hospital / Clinician / CoE
  Life Science.dc.html    Life Science / Biotech
  Public Health.dc.html   Public Health
  Resources.dc.html       Resource library
  About Us.dc.html        About
  support.js              prototyping runtime — reference only, do NOT port
  image-slot.js           prototyping image placeholder — replace with real <img>
  assets/                 logos
screenshots/              8 captures per page, top-to-bottom (orientation only)
DESIGN_SYSTEM.md          condensed token + chrome reference (source of truth for values)
```

Open any `design/*.dc.html` directly in a browser to see the live page.

## Not built
- **FAQ page** — links currently point at `genetico.in/#faqs`; the Home FAQ accordion is the only FAQ surface.
- Resources thumbnails (17), Platform outcome figures.

## Voice (for any new copy)
Clinical, plain, understated. No hype, no emoji. Numbers only when real; qualify claims ("illustrative interface", "depends on case mix"). Sentence-case body; Title Case only where the existing pages already use it.
