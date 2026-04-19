

## Typography + Hero + Selected Work redesign

### 1. Global typography (whole site, only 2 fonts)

Replace Syne + Space Mono with **Urbanist** (headings/display) + **Epilogue** (body/all text). Update:
- `src/index.css` — swap Google Fonts `@import` to load Urbanist (400–800) + Epilogue (300–600); update `--font-display` and `--font-mono` (rename mental model: `--font-display` = Urbanist, `--font-mono` = Epilogue). Keep CSS variable names so existing `font-display` / `font-mono` utilities continue working without touching every component.
- `tailwind.config.ts` — update `fontFamily.display` → `["Urbanist", "sans-serif"]`, `fontFamily.mono` → `["Epilogue", "sans-serif"]`.
- Globally switch headings from `ALL CAPS` source text to mixed case. To avoid editing every file, do the literal text changes only in: `Hero.tsx`, `ProjectsGrid.tsx`, `Services.tsx`, `WhyWorkWithMe.tsx`, `Contact.tsx`, `Footer.tsx`, `Navigation.tsx` mobile menu, `pages/Work.tsx`, `pages/About.tsx`. Remove `uppercase` Tailwind utility on prominent headings; keep small mono-style labels in uppercase only where they read as tags (project meta, nav micro-labels) — this preserves hierarchy while softening the overall feel.

### 2. Hero — Centered Statement layout

Rewrite `src/components/Hero.tsx`:
- Centered column, max-width ~1100px, vertical rhythm.
- Tiny top eyebrow: `— Creative Web Developer` (Epilogue, tracked, small).
- One huge centered headline (Urbanist, weight 700, tight leading, mixed case):
  *"I build websites that feel alive & unreal."*
  Word-by-word reveal (reuse current letter-stagger logic but per word, cleaner).
- Small portrait (square, ~120–160px) centered **below** the headline, subtle GSAP mouse-follow kept (smaller travel range).
- Below portrait: short intro paragraph (1–2 lines) + two inline meta rows (`Available for work` • `Based remotely` etc.).
- Keep the bottom scroll indicator line.
- Remove the absolute floating image from inside the headline.

### 3. Selected Work — Horizontal scroll stack

Rewrite `src/components/ProjectsGrid.tsx` with a horizontal GSAP ScrollTrigger pin:
- Section pins vertically; inner track translates X based on scroll progress (classic `xPercent` pin pattern).
- Each project = a card (image + title + category) sized ~70vw on mobile, ~38vw on desktop, with horizontal gaps.
- Hover behavior: hovered card expands (`flex-grow` / scale 1.05, slight Y lift), neighbors compress (`scale 0.95`, `opacity 0.5`, `blur(2px)`). Smooth GSAP transitions, similar feel to the current dim/blur logic but applied along the X axis.
- Keep the "Hire Me" cursor follower.
- Heading "Selected Work" (mixed case, Urbanist) on the left, "View all →" link on the right, both pinned above the track.
- Add an instructional micro-label ("scroll →") under heading.

### 4. Consistency sweep
- Update `Navigation.tsx` brand mark to mixed case `Alishan` (keep Arabic version on scroll).
- Convert headings in `Services`, `WhyWorkWithMe`, `Contact`, `Footer`, `Work`, `About` to mixed case. Keep mono small-caps tags as uppercase tracked labels.
- No new dependencies; GSAP + ScrollTrigger already installed.

### Technical notes
- Files touched: `src/index.css`, `tailwind.config.ts`, `src/components/Hero.tsx`, `src/components/ProjectsGrid.tsx`, `src/components/Navigation.tsx`, `src/components/Services.tsx`, `src/components/WhyWorkWithMe.tsx`, `src/components/Contact.tsx`, `src/components/Footer.tsx`, `src/pages/Work.tsx`, `src/pages/About.tsx`.
- Keep `font-mono` utility class name (now mapped to Epilogue) so we don't have to rewrite className references everywhere.
- Horizontal stack uses `gsap.context` + `ScrollTrigger` with `pin: true`, `scrub: 1`, `end: () => "+=" + track.scrollWidth`.
- Mobile fallback for horizontal stack: under `md`, fall back to vertical stack (no pin) to preserve usability on small screens.

### Out of scope
- No content/copy rewrite beyond casing.
- No color/theme changes.
- Project detail page styling untouched apart from font inheritance.

