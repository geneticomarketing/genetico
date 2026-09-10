# Genetico site — project memory

Six pages built as Design Components, one unified system. Next task: **the Home page** (condensation of all six, highest UI/UX bar).

## Files
`About Us.dc.html` · `Platform.dc.html` · `Hospital.dc.html` · `Life Science.dc.html` · `Public Health.dc.html` · `Resources.dc.html` · helper `image-slot.js`
Assets: `assets/genetico-logo.png`, `indigeneus-lockup-white.png`, `indigeneus-mark-black.png`, `indigeneus-mark-white.png`.
Remote logos base (`SB` const in Platform): `https://pfmdimjfbcxamkhrozxa.storage.supabase.co/storage/v1/object/public/genetico/media/` (Vector-1.png = AIIMS Delhi, Vector.png = CDFD, etc.).

## Design system (copy literally — inline styles only)
**Type**: Newsreader (serif headlines, weight 400, letter-spacing -0.02em, line-height 1.06–1.14) · DM Sans (UI/body) · IBM Plex Mono (eyebrows/labels/figures).
Sizes: h1 `clamp(36px,5vw,62px)`; h2 `clamp(32px,4vw,50px)`; h3 `clamp(26px,3.2vw,38px)`; body 16px/1.75, secondary 14.5px, meta 13px/12.5px; eyebrow mono 11px, letter-spacing .2em, uppercase; small label mono 10.5px/.16em.
**Colour**: ink #12161A / #3C434A / #6E767D / #9AA6B1; border #E4E9ED (light rule #EDF0F2); surfaces #fff, #FAFBFC, #F4F6F8, #F6F9FA; primary #0B4C86, deep #073B68, tint #EDF3F9; accent teal #4FB3A0 / #2E9B82 / #1F6E5C (+ #EDF6F3); dark band `radial-gradient(140% 120% at 0% 0%,#042743 0%,#0A4577 48%,#0F5FA3 100%)` with text #fff / #DCE9F4 / #B9CFE2 / #8FC6EF; card gradients for problem tiles `radial-gradient(120% 130% at 25% 20%,#0B4C86,#0A3050,#07161F)` family.
**Geometry**: max-width 1200px, gutters `clamp(20px,4vw,32px)` (all pages, header + rail + sections + footer), section padding fluid `clamp(~0.7×,7vw,base)`, section padding 96–104px, radius 12px (pills 999px, chips 6–10px), card shadow `0 18px 44px rgba(7,59,104,0.06–0.10)`, hover lift `translateY(-4px)` + `0 26px 60px rgba(7,59,104,0.16)`, scroll offset 128px.
**Breakpoints** (JS state): `narrow < 880` (mobile nav + 1-col forms), `mid < 1040` (stack two-col grids, collapse carousel).

## Shared chrome (identical on every page)
1. 64px sticky header: logo left, centred nav (About · Platform · Solutions ▾ · Resources), "Book a demo" pill right; narrow → hamburger + in-page section list. Solutions dropdown: Hospital / Clinician / CoE → `Hospital.dc.html`, Life Science / Biotech → `Life%20Science.dc.html`, Public Health → `Public%20Health.dc.html`.
2. Fixed section rail at top:64px, appears after 420px scroll, page-name mono label + numbered pills (01…), 2px progress line.
3. Eyebrow motif: hairline gradient rule + mono eyebrow + mirrored rule, centred.
4. Section reveal: scroll-driven `opacity/translateY(14px)` with `prefers-reduced-motion` guard; nothing IO-gated for content that must paint.
5. Get-in-touch section: 4 audience tabs (Clinician/Hospital · Life Science/Industry · Government/Public Health · Investor) each with its own blurb, then 2-col form (name, email, phone, org, message) → "Request received" state. Field style is uniform sitewide: label `<span>` 13.5px/500/#12161A with `*` in the text, sentence-case labels and placeholders ("First name*", "How can we help?"), inputs `height:46px;padding:0 14px;border-radius:10px;border:1px solid #E4E9ED;font-size:14.5px`, textarea same but `padding:12px 14px`, submit label "Talk to our team" on every page (header pill stays "Book a demo").
7. Section reveals must never gate content: `reveal()` returns "" and the animation is CSS-only (`[data-reveal]` + `@keyframes rev` with `animation-timeline:view()`). Never re-introduce IO/scroll-gated opacity — it left whole sections invisible on Life Science / Public Health.
6. Footer: dark radial band, blurb, X/LinkedIn/YouTube circles, Menu + Solutions columns, legal row, giant gradient "GENETICO" wordmark clipped in a container-query block.

## Page content in brief
**About Us** — hero "Building Infrastructure For {rotating word}" + credential chips (15 Rare Disease Centres · PraGed Mission). Sections: Our Vision (mission/vision pair on #F6F9FA card) · Leadership (photo cards → bio modal) · Rewards & Recognition (dark band) · Trusted Across the Rare Disease Ecosystem (partner logos) · Built for Trust. Designed for Healthcare. (security strip) · Get in touch.
**Platform** — full-bleed dark #04101C hero with IndiGeneUs mark; sections: The Platform (Intelligent Data Capture) 01 · Clinical Intelligence / CDSS 02 (dark band) · Longitudinal 03 · Infrastructure 04 · Security 05 · CTA "Build the Future of Rare Disease Care with IndiGeneUs.AI". Has FEATURES, TRUST_LOGOS, CASES (Epilepsy etc.) data. Outcome strip still awaits real figures.
**Hospital / Clinician / CoE** — split hero "Purpose-built for Centers of Excellence" + live consultation card (HPO chips → RAPID Score bars) + 3 hero stats. 01 The Challenge (4-card expanding carousel, dark tiles, crossfading body) · 02 The Solution — 4 alternating steps with browser-chrome mockups: care pathway, document import/extraction, RAPID Score ranked candidates (clickable → evidence summary), patient timeline · 03 Outcomes (dark band, Minutes / Reproducible / Registry-ready with before→after) · 04 Book a demo. Props: `autoRotateChallenges`, `animateMockups`.
**Life Science / Biotech** — centred hero + 3 hero cards (research cohort live counter, natural history study, 12 sites synchronized). Challenge carousel (4 tiles) · 3-step solution (intake form, extraction, cohort discovery with filter chips) · Outcomes dark band (90%+ / Standardized / Research-ready) · form.
**Public Health** — light split hero + three-tier diagram (stacked bars on a spine). Sections: Impact 01 · How It Works 02 (three levels of India's system) · Architecture 03 (hub-and-spoke, Hub A/B national ↔ NPRD, Spoke C hospitals) · Book a demo 04.
**Resources** — video-first, tab filters only (All / Videos / Deep Dives / Media / Articles / Blogs, 17 items). Featured AIIMS Delhi case study (3 weeks → 4 days), Videos, Deep Dives, Media (Amar Ujala, Global Rare Disease Summit…), Articles, Blogs, Subscribe (Mailchimp clinical digest). 17 `<image-slot>` placeholders still empty.

## Voice
Clinical, plain, understated. No hype, no emoji. Numbers only when real; qualify claims ("illustrative interface", "depends on case mix"). Sentence-case body, Title Case only where existing pages use it. Audience framing: who (About) → what (Platform) → for whom (Hospital / Life Science / Public Health) → proof (Resources).

## Open items
- Home page — not built (next).
- FAQ page — not built (site links point to `genetico.in/#faqs`).
- Resources: 17 empty image slots (needs user assets).
- Platform outcome strip: real figures pending from user.

## Home page brief (agreed direction)
Condense the six pages: one hero that states the mission, the platform in one glance, three audience doors (Hospital/CoE · Life Science · Public Health), proof (partners, recognition, resources/case study), trust/security, one CTA. Reuse the shared chrome verbatim; vary hero treatment from all five existing heroes; keep motion scroll-driven and reduced-motion safe.
