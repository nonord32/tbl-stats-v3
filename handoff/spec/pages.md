# Pages

Each page below has: route, purpose, components used, and acceptance criteria.
Screenshots live in `design/TBLStats Redesign.html` — open it and navigate to the labeled artboards.

---

## Home — `/`

**Purpose.** Tell a first-time visitor what TBLStats is in under 3 seconds and route them to (a) the current week's stats, (b) this weekend's card, (c) making picks.

**Artboard.** "Phase 1 · Merged — Desktop / Home"

**Regions, top-to-bottom**
1. Nav (logo · links · week chip · "Make picks" CTA)
2. Hero: "Every round. Every fighter. Every team." + week kicker + fighter-of-the-week card on the right
3. Top fighters strip (cards 1–4 by net points)
4. Split: Team standings (left) · Pick'em CTA card (right, with top-3 leaderboard)
5. This weekend's card (4 bout cards)
6. Footer

**Acceptance**
- Renders cleanly at 1280w desktop and 390w mobile.
- Hero fighter card updates each week based on highest `netPoints`.
- Pick'em card shows live countdown to first bell.
- "More →" links route to `/fighters`, `/standings`, `/schedule`.

---

## Fighter profile — `/fighters/:slug`

**Purpose.** Deep dive on a single fighter. This is the page a fan opens after hearing a name.

**Artboard.** "Phase 1 · Merged — Desktop / Fighter"

**Regions**
1. Crumb (Fighters / Team / Name)
2. Big name + division tag + streak badge
3. Hero photo (left) + lede paragraph (right)
4. Stat wall: Net Pts, Record, Rounds W-L, NPPR, WAR, Streak
5. Fight log (one row per bout this season)
6. Round-by-round grid for the most recent bout (3 judges × 4 rounds)

**Acceptance**
- Stat wall items are sorted consistently: Net Pts first, Streak last.
- Round grid uses red fill for rounds won, muted fill for rounds lost.
- Fight log rows link to the bout page.

---

## Team — `/teams/:code`

**Regions.** Hero (team name + record + diff + streak) · Roster grid (12 fighters) · Results table · Upcoming schedule.

**Acceptance.** Team tint used on avatar borders and division chips only; not as page background.

---

## Pick'em — `/picks`

**Purpose.** Let signed-in users pick winners (and optional exact margins) for each bout of the current week.

**Artboard.** "Phase 1 · Merged — Desktop / Pick'em"

**Regions**
1. Hero: "Call the card." + kicker + stats card (picks made, locks in, rank, points)
2. 4 bout cards in a 2×2 grid
3. Sticky bottom bar: "N of 4 picks made" + "Lock picks →"

**Bout card states**
- Unpicked: both sides equal weight, grey border.
- Picked: chosen side has red border + cream fill + "✓ YOUR PICK" badge; a margin input appears below the face-off.

**Acceptance**
- Countdown runs live until first bell, then the page flips to a read-only "picks locked" state.
- Users can change picks any time before lock.
- Margin input is optional; blank means "any margin."

---

## Leaderboard — `/picks/leaderboard`

**Regions.** Hero · Podium (top 3) · Full standings table.

**Acceptance**
- Podium: gold/red for #1, cream for #2 and #3. #1 is taller (260px) than side panels (220px).
- Full table highlights "you" row with red border + cream tint.
- Sortable columns: Points (default desc), Correct, Exact.
- Ties broken by exact-margin count.

---

## Standings, Results, Schedule

Standard tabular pages — see `design/TBLStats Redesign.html` for layouts. These are lower-lift; implement after the above.
