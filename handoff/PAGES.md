# Page Inventory

Every route, its purpose, and layout notes. Cross-reference mockups in `TBLStats Redesign.html` under "Phase 1 · Merged".

## `/` Home

**Purpose:** Snapshot of the league right now — who's fighting, who's winning, what's at stake this week.

**Sections (top to bottom)**
1. **Nav** — sticky on scroll
2. **Hero** — two-col: big editorial headline + fighter-of-the-week photo card
3. **Top fighters** — 4 FighterPills in a row
4. **Two-col split** — Standings (left, 8 rows) + Pick'em banner (right)
5. **This weekend's card** — 4 BoutCards horizontally
6. **Footer**

**Data**
- `GET /api/fighters?sort=net&limit=4`
- `GET /api/teams?sort=rank&limit=8`
- `GET /api/schedule?week=current`

**Mobile**
- Hero collapses to single column, headline 44px, photo card full-width
- Horizontal sections become stacked
- Pick'em banner sits after standings preview (5 rows)

---

## `/fighters/:slug` Fighter profile

**Purpose:** Everything about one fighter.

**Sections**
1. Nav
2. Breadcrumb: `Fighters / {City} / {Name}`
3. **Hero split** — photo column (560px tall) + meta column (kicker, name, bio, 2 big stats, 6-cell stat wall)
4. **Fight log** — FightLogRows for each bout this season
5. **Round-by-round** — RoundGrid for most-recent fight (3 judges × 4 rounds)
6. Footer

**Data**
- `GET /api/fighters/:slug`
- `GET /api/fighters/:slug/fights?season=2026`
- `GET /api/fights/:id/rounds` (for most recent fight)

---

## `/teams/:code` Team profile

**Sections**
1. Nav
2. **Hero** — team name (108px), record, differential, CTA row; big stat card on right
3. **Roster** — 4×2 grid of FighterPills for team fighters
4. **Results** — list of completed bouts
5. **Next up** — upcoming schedule rows
6. Footer

**Data**
- `GET /api/teams/:code`
- `GET /api/teams/:code/roster`
- `GET /api/teams/:code/schedule`

---

## `/pickem` Pick'em (current week)

**Sections**
1. Nav
2. **Hero split** — big gradient headline ("Call the card. / Top the board.") + stats card (your picks · locks-in timer · rank · points)
3. **Bouts grid** — 2×2 of BoutCards
4. **Submit bar** — sticky bottom: picks-made progress + big red "Lock picks →" button

**Interactions**
- Click fighter side → select pick (immediate local update, debounced POST)
- Optional: click margin field → numeric picker (1–20)
- Countdown timer ticks every second; lock the bouts at 0

**Data**
- `GET /api/pickem/week/:n`
- `POST /api/pickem/week/:n/picks` `{ boutId, side, margin? }`
- `GET /api/users/me/picks?week=:n`

---

## `/leaderboard` Leaderboard

**Sections**
1. Nav
2. **Mast** — centered: kicker + "The sharpest eyes in boxing."
3. **Podium** — top 3 as medal boxes (#1 slightly taller, filled red)
4. **Full standings** — rows: rank, user, correct, exact, points
5. "You" row pinned or highlighted with accent border

**Data**
- `GET /api/leaderboard?season=2026`

---

## `/standings` Standings

**Sections**
1. Nav
2. **Mast**
3. **Divisional split** — East/West columns (or however TBL splits)
4. **Full table** — 12 rows with all key stats (W-L, diff, PF, PA, streak, last 5)

---

## `/schedule` Schedule

Weekly card layout. Each week is a horizontal row of BoutCards with the week number as a section divider.

---

## `/results` Results

Similar to schedule but completed bouts. Each card shows the final score, result icon, and link to round cards.

---

## `/rankings` Rankings

Switchable table: Net · NPPR · WAR · Custom. Same FighterPill-style rows with sort arrows.

---

## `/u/:username` User profile

Public profile of a pick'em user. Shows their season picks, accuracy stats, badges (e.g. "Week 3 winner"), and recent activity.

---

## Auth / account pages

Minimal. Keep them out of the main editorial voice — pure utility:
- `/login`
- `/signup`
- `/settings`

Design them as centered 420px cards on paper with the same nav.
