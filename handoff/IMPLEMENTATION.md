# Implementation Notes

Opinionated recommendations. Adapt to your team's conventions.

## Stack recommendation

- **Framework:** Next.js 14+ (App Router) — SSR for SEO, RSC for fast data-heavy pages
- **Styling:** Tailwind CSS with the token values from `TOKENS.md` baked into `tailwind.config.ts`
- **State:** React Server Components for data fetching + `useOptimistic` for pick'em mutations
- **Forms:** native HTML forms + Server Actions (no react-hook-form needed for this scope)
- **Auth:** whatever TBL already has. This pack assumes session cookies; Bearer tokens work identically
- **Testing:** Playwright for critical flows (pick-submit, leaderboard sort); Vitest for component logic

## Folder layout

```
app/
  layout.tsx                // nav, footer, fonts
  page.tsx                  // /
  fighters/
    page.tsx                // index
    [slug]/page.tsx
  teams/[code]/page.tsx
  pickem/
    page.tsx                // current week redirect
    week/[n]/page.tsx
    actions.ts              // server actions: submitPick, clearPick
  leaderboard/page.tsx
  schedule/page.tsx
  results/page.tsx
  rankings/page.tsx
  u/[username]/page.tsx
  api/
    (REST proxies if backend is separate)

components/
  layout/
    Nav.tsx
    Footer.tsx
    PageMast.tsx
    SectionHeader.tsx
  data/
    StatCell.tsx
    StatWall.tsx
    StandingRow.tsx
    FighterPill.tsx
    FightLogRow.tsx
    RoundGrid.tsx
  pickem/
    BoutCard.tsx
    PickemBanner.tsx
    LeaderboardRow.tsx
    Podium.tsx
  atoms/
    Pill.tsx
    Placeholder.tsx
    Rule.tsx
    Eyebrow.tsx
  mobile/
    MobileTabBar.tsx

lib/
  api.ts                    // typed fetch wrapper
  types.ts                  // the shapes from DATA.md
  tokens.ts                 // TEAM_TINT, format helpers
  formatters.ts             // formatDiff, formatStreak, etc.

styles/
  globals.css               // CSS vars from TOKENS.md

public/
  fonts/                    // Inter + JetBrains Mono self-hosted
  fighters/                 // photos by slug
  teams/                    // team-logo PNG/SVG
```

## Tailwind config sketch

```ts
// tailwind.config.ts
export default {
  theme: {
    colors: {
      paper: '#f5f1e8',
      'paper-soft': '#ebe3d2',
      ink: '#1a1612',
      'ink-2': '#3d362e',
      'ink-3': '#6b5f4f',
      rule: '#d8cfbc',
      'rule-soft': '#ebe3d2',
      accent: '#c4321e',
      'accent-soft': '#e8a294',
      'accent-deep': '#8a1f10',
      dark: '#14100c',
    },
    fontFamily: {
      serif: ['Georgia', 'Tiempos Text', 'serif'],
      sans: ['Inter', 'Söhne', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
    },
    extend: {
      letterSpacing: {
        label: '0.12em',
        micro: '0.18em',
      },
    },
  },
};
```

## Self-host fonts

- Inter — https://rsms.me/inter/download/
- JetBrains Mono — https://www.jetbrains.com/lp/mono/
- Georgia — system font, do not ship

Use `next/font/local` for both. Set `display: 'swap'` and preload `Inter-400`, `Inter-600`, `Inter-700`, `JetBrainsMono-500`.

## Number formatters

Centralize these so copy stays consistent:

```ts
export const fmt = {
  diff: (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(1)}`,
  net:  (n: number) => `${n >= 0 ? '+' : '−'}${Math.abs(n).toFixed(1)}`,
  record: (w: number, l: number, d = 0) => d ? `${w}-${l}-${d}` : `${w}-${l}`,
  streak: (s: string) => s,                   // already "W4"
  pct: (n: number) => `${Math.round(n * 100)}%`,
  week: (n: number) => `Wk ${String(n).padStart(2, '0')}`,
};
```

## Images & placeholders

The mockups use striped placeholders. In production:

- Fighter photos: `public/fighters/:slug.jpg` (portrait, 800×1200)
- Team logos: `public/teams/:code.svg`
- Fallback: render `<Placeholder>` component with the fighter's initials on a tinted background

## Pick'em — lock flow

This is the one place real-time matters.

1. Server stores `lockAt` on the PickemWeek (first bell of the card).
2. Client computes remaining time every second from `Date.now() - lockAt`.
3. At `lockAt - 60s`, disable margin edits.
4. At `lockAt`, disable everything and show "Card's locked."
5. Server validates `now() < lockAt` on every POST. Reject with 409 if past.

Don't trust the client clock for anything except display.

## Migration plan

Phase A — scaffold
1. Set up Next app, install fonts, write tokens, implement Nav + SectionHeader + Pill
2. Build Home page with fixtures (no backend yet)

Phase B — data
3. Wire fighter & team list/detail to real API
4. Implement standings, schedule, results

Phase C — pick'em
5. Auth integration
6. Pick'em week view with optimistic updates
7. Lock flow + countdown
8. Leaderboard

Phase D — polish
9. Mobile passes for every route
10. Accessibility audit (keyboard, focus-visible, color contrast)
11. Performance pass (image sizes, font subsetting)
12. Analytics hooks on pick submit, leaderboard view, fighter follow

## Things not to do

- Don't add a dark mode. The cream paper is the brand.
- Don't animate hero headlines. Editorial weight > motion.
- Don't use emoji anywhere in the product UI.
- Don't round corners more than 14px. This is a ledger, not a SaaS app.
- Don't add social feeds, commenting, or reactions in v1.
- Don't use team colors as dominant backgrounds. Tints only — dots and stripes.

## Design system handoff

The Merged direction lives in `merged/` as working React components. They're demo-fidelity (inline styles, window globals) — port each to the production component structure above, keeping the visual output identical.

Reference the design canvas (`TBLStats Redesign.html`) in a second monitor while implementing.
