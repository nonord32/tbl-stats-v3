# TBLStats Redesign — Claude Code Handoff

A developer-ready package for implementing the **Merged direction** as the production TBLStats rebuild. This directory contains everything an engineer needs to scaffold the site.

## What's in here

- `SPEC.md` — this file (start here)
- `TOKENS.md` — design tokens (color, type, spacing, motion)
- `COMPONENTS.md` — component inventory with props & variants
- `PAGES.md` — page inventory with layout notes
- `DATA.md` — data contracts (TypeScript-style shapes)
- `COPY.md` — voice, tone, microcopy guide
- `IMPLEMENTATION.md` — tech choices, folder layout, migration plan

## Design direction

**Merged** — editorial bones (Broadsheet) + warmth & photography (Arena) + density (Almanac).

- **Paper** `#f5f1e8` · **Ink** `#1a1612` · **Accent** `#c4321e` (oxblood red)
- Georgia italic for editorial moments; Inter for UI; JetBrains Mono for stat glyphs
- 1px hairline rules, numbered section headers, dotted row dividers
- Hero fighter photos, round-level stat tables, full-bleed pick'em card

The other four explorations (Broadsheet pure, Fight Card, Terminal, Arena, Almanac) are preserved in the design canvas for reference but are not the production direction.

## How to use this pack

1. Read `SPEC.md` (this) for the 30-second overview
2. Read `TOKENS.md` and set up a tokens file in your stack of choice (CSS vars, Tailwind theme, or Style Dictionary)
3. Read `COMPONENTS.md` and scaffold the component library — start with Nav, SectionHeader, StandingRow, FighterPill, BoutCard
4. Read `PAGES.md` and wire each route
5. Read `DATA.md` for API contracts; stub with fixtures from the design canvas

## Route map

```
/                     → Home            (hero + top fighters + standings + pick'em + card)
/fighters             → Fighters index  (filterable table, division tabs)
/fighters/:slug       → Fighter profile (photo, stats wall, fight log, round grid)
/standings            → Standings       (full 12-team table, divisional splits)
/teams/:code          → Team profile    (roster, results, schedule)
/schedule             → Schedule        (week-by-week card)
/results              → Results         (past bouts, round cards)
/rankings             → Rankings        (NPPR, WAR, custom)
/pickem               → Pick'em         (current week's card)
/leaderboard          → Leaderboard     (season standings, weekly winners)
/u/:username          → User profile    (picks history, accuracy)
```

## Breakpoints

- `sm` 390px — mobile (designed)
- `md` 768px — tablet (extrapolate from sm/lg)
- `lg` 1024px — desktop narrow
- `xl` 1280px — desktop full (primary design target)

## Accessibility targets

- WCAG AA text contrast (ink on paper = 14.2:1; accent on paper = 5.1:1 ✓)
- 44px minimum touch targets on mobile
- Keyboard navigation on all interactive elements
- `prefers-reduced-motion` respected for any micro-animation

## Not in scope for v1

- Admin tools / stat-entry backend
- Live scoring (round-by-round push updates)
- Social features beyond pick'em leaderboard
- Native apps (web-responsive only)
