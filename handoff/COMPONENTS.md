# Component Inventory

For each component: purpose, props, variants, notes. Implement as React + Tailwind (or your preferred stack).

## Layout

### `<Nav active week>`
Top navigation bar. Three columns: logo · links · week badge.

**Props**
- `active: string` — which link is current
- `week: number` — current week number

**Notes**
- Current link gets 1.5px `--accent` underline, 2px below baseline
- Below-nav hairline rule is inset 64px on desktop, 20px on mobile
- Mobile: collapse links into `≡` drawer; week badge stays visible

### `<PageMast kicker title sub align>`
Centered page title block.

**Props**
- `kicker: string` — small uppercase eyebrow
- `title: ReactNode` — headline (can contain `<em>` for red italic accent)
- `sub: string` — italic serif dek
- `align?: 'center' | 'left'` — default 'center'

### `<SectionHeader num title subtitle more>`
Numbered section start. Rule below title; optional italic subtitle indented to column grid.

**Props**
- `num: string | number` — "01." rendered in red italic serif
- `title: string` — uppercase tracked sans title
- `subtitle?: string` — italic serif pull quote style
- `more?: string` — right-aligned link text

---

## Data display

### `<StatCell label value emphasize>`
Single stat in a wall/grid.

**Props**
- `label: string` — uppercase micro label
- `value: string | number` — large number
- `emphasize?: boolean` — if true, value renders in `--accent`
- `mono?: boolean` — use mono font (default true for numeric values)

**Variants**
- `size: 'sm' | 'md' | 'lg'` — controls padding and font size

### `<StatWall stats>`
Grid of StatCells. Dense, editorial.

**Props**
- `stats: Array<{label, value, emphasize?}>`
- `cols?: number` — default 6 on desktop, 3 on mobile

### `<StandingRow rank team record diff isYou?>`
Single row in the standings table.

**Props**
- `rank: number`
- `team: { name, code }`
- `record: string` — e.g. "2-0"
- `diff: number` — positive = red accent; negative = muted ink-3
- `isYou?: boolean` — adds a "← you" tag and soft background

**Notes**
- Grid: `40px 12px 1fr auto auto` (rank, team-dot, name, record, diff)
- Dotted bottom border
- Hover: `--paper-soft` background

### `<FighterPill rank fighter net compact?>`
Ranked fighter card. Used on home (top 4) and fighter index.

**Props**
- `rank: number` — in a filled-red circle
- `fighter: { name, team, teamCode, record }`
- `net: number` — large red number
- `compact?: boolean` — switch to single-row layout

### `<FightLogRow week opponent rounds net result>`
Row in a fighter's fight log.

**Props**
- `week: number`
- `opponent: { name, teamCode }`
- `rounds: Array<'W' | 'L'>` — 4 items
- `net: number`
- `result: 'W' | 'L' | 'D'`

### `<RoundGrid judges>`
Round-by-round 3-judge scorecard.

**Props**
- `judges: Array<{ letter, rounds: string[], total: string }>` — typically 3 judges

---

## Pick'em

### `<BoutCard bout picked? onPick>`
The atomic unit of the pick'em flow.

**Props**
- `bout: { home, homeCode, away, awayCode, day, time }`
- `picked?: 'home' | 'away' | null`
- `margin?: number` — optional exact-margin guess
- `onPick: (side) => void`
- `onMarginChange?: (n) => void`

**Variants**
- `size: 'desktop' | 'mobile'`
- `state: 'open' | 'locked' | 'settled'` — settled shows result + points earned

### `<PickemBanner week timeLeft picksMade total>`
The dark "Call the card" hero card.

**Props**
- `week: number`
- `timeLeft: string` — "04:22:18" formatted
- `picksMade: number`
- `total: number`

### `<LeaderboardRow rank user pts correct exact isYou?>`
Row in the season leaderboard.

### `<Podium top3>`
Medal-podium visual for top 3. `#1` center, slightly taller.

---

## Atoms

### `<Pill>`
Small uppercase tag.

**Props**
- `tone: 'default' | 'accent' | 'team'`
- `teamCode?: string` — uses TEAM_TINT as background

### `<Placeholder w h label tint>`
Striped image placeholder. Use anywhere a real photo hasn't been supplied.

### `<Rule weight='hair' | 'rule'>`
Horizontal divider.

### `<Eyebrow>`
11px uppercase tracked label. Used above titles.

---

## Mobile

Most components support a mobile variant via `size` prop or media queries. Specific mobile-only pieces:

### `<MobileTabBar active>`
5-slot bottom tab bar: Home · Stats · Picks · Board · You. Sticky. Fixed 28px bottom padding for home indicator.

### `<MobileHero>`
Compact version of page mast with 44px headline instead of 88px.

---

## State machines to implement

**BoutCard** — `unopened → partial (picked winner) → complete (picked margin) → locked → settled`

**PickemFlow** — `empty (0 picks) → partial (1-3) → all-in (4) → submitted → locked → scored`
