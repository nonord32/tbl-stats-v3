# tbl-stats-v3

Ground-up rebuild of [tblstats.com](https://tblstats.com). Broadsheet-editorial design; Supabase-backed reads (no request-time Google Sheet fetches); mobile-first.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript strict
- Tailwind CSS v4 · shadcn/ui (installed piecemeal)
- Supabase (Postgres + Auth + Edge Functions)
- Deploy on Vercel

## Setup

```bash
nvm use                    # Node 20
npm install
cp .env.example .env.local # then fill in Supabase URL + anon key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (Next config) |
| `npm run typecheck` | `tsc --noEmit` |

## Layout

```
app/            App Router pages + layouts
components/     Pure presentational components (added in Phase 3+)
lib/            Server helpers, env, Supabase clients, formatters
handoff/        Design spec — single source of truth for visual decisions
```

## Roadmap

- **Phase 1 (this PR)** — Scaffolding
- Phase 2 — Supabase schema + Sheet→DB sync edge function
- Phase 3 — Design tokens, nav, layout chrome, dark-mode toggle
- Phase 4 — Read-only pages (home, fighters, teams, standings, schedule, results, match detail)
- Phase 5 — Auth + picks + leaderboard
- Phase 6 — Admin resolver + polish + deploy

Each phase lands as its own PR.
