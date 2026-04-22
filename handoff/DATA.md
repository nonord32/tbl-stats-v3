# Data Contracts

TypeScript-style shapes for every resource the UI consumes. The backend team can adapt to their ORM.

## Core types

```ts
type TeamCode = 'SA' | 'MIA' | 'PHI' | 'NYC' | 'ATL' | 'DAL' | 'LV'
              | 'PHX' | 'HOU' | 'NSH' | 'CHI' | 'DET';

type Division = 'FLY' | 'BW' | 'FW' | 'LW' | 'WW' | 'MW' | 'LHW' | 'HW';

type Stance = 'orthodox' | 'southpaw' | 'switch';

type RoundResult = 'W' | 'L' | 'D';
```

## Fighter

```ts
interface Fighter {
  id: string;
  slug: string;                    // "kye-brooks"
  name: string;
  teamCode: TeamCode;
  teamName: string;
  division: Division;
  weightClass: number;             // 147
  stance: Stance;
  hometown: string;                // "Cleveland, OH"
  joinedAt: string;                // ISO date

  // Season-level stats (refresh after each fight)
  season: {
    year: 2026;
    record: { w: number; l: number; d: number };
    rounds: { w: number; l: number };
    net: number;                   // +10.0
    nppr: number;                  // net points per round
    war: number;                   // wins above replacement
    winPct: number;                // 0.81
    streak: string;                // "W4" | "L2"
    rank: number | null;           // league-wide by net
  };

  // Optional
  photoUrl?: string;               // falls back to <Placeholder/>
  nickname?: string;
  bio?: string;
}
```

## Team

```ts
interface Team {
  code: TeamCode;
  name: string;                    // "San Antonio"
  fullName: string;                // "San Antonio Rattlesnakes" or whatever TBL uses
  rosterIds: string[];

  season: {
    year: 2026;
    record: { w: number; l: number };
    diff: number;                  // point differential
    pointsFor: number;
    pointsAgainst: number;
    streak: string;
    rank: number;
  };

  tint: string;                    // hex; see TEAM_TINT in TOKENS.md
}
```

## Fight (bout)

```ts
interface Fight {
  id: string;
  matchId: string;                 // the team match this bout is part of
  week: number;
  season: 2026;
  scheduledAt: string;             // ISO datetime

  homeFighterId: string;
  awayFighterId: string;
  division: Division;

  status: 'scheduled' | 'live' | 'final' | 'cancelled';
  result?: {
    winnerId: string;
    method: 'decision' | 'ko' | 'tko' | 'dq';
    rounds: RoundCard[];           // one per judge
    netPoints: { home: number; away: number };
  };
}

interface RoundCard {
  judge: 'A' | 'B' | 'C';
  rounds: Array<{ home: number; away: number }>;
  totals: { home: number; away: number };
}
```

## Match (team vs team)

```ts
interface Match {
  id: string;
  week: number;
  season: 2026;
  scheduledAt: string;
  homeCode: TeamCode;
  awayCode: TeamCode;
  venue?: string;

  fightIds: string[];              // ordered by card position

  status: 'scheduled' | 'live' | 'final';
  result?: {
    homeScore: number;
    awayScore: number;
    winnerCode: TeamCode;
  };
}
```

## Pick'em

```ts
interface PickemBout {              // what the UI renders
  boutId: string;
  fight: Fight;                    // expanded
  match: Match;
  userPick?: {
    side: 'home' | 'away';
    margin?: number;               // 1-20
    submittedAt: string;
    lockedAt?: string;
    score?: number;                // filled when fight is final
  };
  lockAt: string;                  // ISO — first bell of the card
}

interface PickemWeek {
  week: number;
  season: 2026;
  bouts: PickemBout[];
  lockAt: string;
}
```

**Scoring**
- +1 for correct winner
- +2 additional if margin matches exactly
- 0 for incorrect winner (even if margin matches)

## Leaderboard

```ts
interface LeaderboardEntry {
  rank: number;
  user: { username: string; avatarUrl?: string };
  points: number;
  correct: number;
  exact: number;
  isYou?: boolean;                 // server-side flag when auth'd
}
```

## API endpoints

```
GET    /api/fighters?sort=net&limit=&division=&team=
GET    /api/fighters/:slug
GET    /api/fighters/:slug/fights?season=
GET    /api/teams
GET    /api/teams/:code
GET    /api/teams/:code/roster
GET    /api/teams/:code/schedule
GET    /api/schedule?week=&season=
GET    /api/results?week=&season=
GET    /api/fights/:id
GET    /api/pickem/week/:n
POST   /api/pickem/week/:n/picks        // { boutId, side, margin? }
DELETE /api/pickem/week/:n/picks/:id
GET    /api/leaderboard?season=
GET    /api/users/me
GET    /api/users/:username
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/signup
```

All mutations should return the updated resource so the UI can reconcile without a refetch.

## Fixture data

See `data.jsx` in the project root for a complete working fixture keyed by the above shapes. Use it verbatim in Storybook / tests while the backend is stubbed.
