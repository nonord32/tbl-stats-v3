# Data model

All data is fictional placeholder content for the design. Real integration is out of scope for the handoff.

## Types

```ts
export type TeamCode =
  | 'SA' | 'MIA' | 'PHI' | 'NYC' | 'ATL' | 'DAL'
  | 'LV' | 'PHX' | 'HOU' | 'NSH' | 'CHI' | 'DET';

export type Division =
  | 'FLY'   // 112
  | 'BW'    // 118
  | 'FW'    // 126
  | 'LW'    // 135
  | 'WW'    // 147
  | 'MW'    // 160
  | 'LHW'   // 175
  | 'HW';   // 200+

export interface Team {
  code: TeamCode;
  name: string;          // "San Antonio"
  record: string;        // "2-0"
  diff: number;          // +21.0
  tint: string;          // "#c8553d"
}

export interface Fighter {
  slug: string;
  name: string;
  team: TeamCode;
  division: Division;
  record: string;        // "4-0"
  rank: number;          // overall league rank by netPoints
  netPoints: number;     // +10.0
  roundsW: number;
  roundsL: number;
  winPct: number;        // 0.81
  nppr: number;          // net points per round, +0.63
  war: number;           // 2.4
  streak: string;        // "W4"
}

export interface Round {
  judgeA: 'W'|'L'|'D';
  judgeB: 'W'|'L'|'D';
  judgeC: 'W'|'L'|'D';
}

export interface Bout {
  id: string;
  week: number;
  day: 'FRI'|'SAT'|'SUN';
  startsAt: string;           // ISO
  home: { team: TeamCode; fighter: string; };
  away: { team: TeamCode; fighter: string; };
  rounds?: Round[];           // present only after bout finishes
  winner?: 'home'|'away'|'draw';
  homeScore?: number;
  awayScore?: number;
}

export interface Pick {
  userId: string;
  boutId: string;
  winner: 'home'|'away';
  margin?: number;      // optional
  locked: boolean;      // true after first bell
  score?: number;       // 1 = correct winner, 3 = correct + exact margin
}

export interface UserStanding {
  rank: number;
  userId: string;
  username: string;
  points: number;
  correct: number;
  exact: number;
  isYou?: boolean;
}
```

## Fixtures

A working fixture set is in `design/shared/data.jsx`. It covers:

- 8 fighters (ranks 1–8)
- 12 teams (full league)
- 4 upcoming bouts for Week 5
- 4 leaderboard rows (with `isYou: true` on rank 4)
- `TEAM_TINT` map

Use this as the initial content model when scaffolding the app. Replace with real API calls once backend is live.

## Scoring rules

- **Correct winner:** +1 point.
- **Exact margin:** +2 additional points (3 total).
- **Margin** is computed as `|homeScore - awayScore|`. It is optional on a pick — a blank margin can still win the winner point.
- **Ties** in season leaderboard are broken first by `exact` count, then by earliest pick timestamp.
