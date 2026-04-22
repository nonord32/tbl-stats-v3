# Design Tokens

Copy these into your stack as CSS custom properties, a Tailwind config, or a Style Dictionary.

## Color

### Core palette

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#f5f1e8` | Page background, card backgrounds |
| `--paper-soft` | `#ebe3d2` | Alternate stripe, hover state surfaces |
| `--ink` | `#1a1612` | Primary text, headlines, heavy rules |
| `--ink-2` | `#3d362e` | Secondary text, body copy |
| `--ink-3` | `#6b5f4f` | Tertiary text, captions, table heads |
| `--rule` | `#d8cfbc` | Hairline dividers |
| `--rule-soft` | `#ebe3d2` | Dotted row dividers |
| `--accent` | `#c4321e` | Brand red (CTAs, emphasis, your-pick marker) |
| `--accent-soft` | `#e8a294` | Hover background for accent links |
| `--accent-deep` | `#8a1f10` | Active/pressed accent state |
| `--dark` | `#14100c` | Dark-mode surfaces (pick'em banner, footer) |

### Team tints

Used as 10–12px dots next to team names, and as stripe accents on team profiles. Never as dominant UI color.

```js
const TEAM_TINT = {
  SA:  '#b84a2c', MIA: '#d63384', PHI: '#3a6b49', NYC: '#1e3d73',
  ATL: '#c49116', DAL: '#1a4d8f', LV:  '#7a1632', PHX: '#cc6a1a',
  HOU: '#a53124', NSH: '#6b3680', CHI: '#1f2d3a', DET: '#107a68',
};
```

### Semantic

| Token | Value | Use |
|---|---|---|
| `--pos` | `--accent` | Positive differential, wins, net-gains |
| `--neg` | `--ink-3` | Negative differential, losses (muted, not alarming) |
| `--warn` | `#cc6a1a` | Pick'em countdown < 1 hr |

## Type

### Families

```css
--font-serif: Georgia, "Tiempos Text", "Times New Roman", serif;
--font-sans:  "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif;
--font-mono:  "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
```

### Scale (desktop)

| Token | Size | Line | Weight | Use |
|---|---|---|---|---|
| `--h-display` | 88–104px | 0.9 | 700 | Hero headlines, page masts |
| `--h-1` | 56–72px | 1.0 | 700 | Profile names |
| `--h-2` | 36–42px | 1.1 | 700 | Section titles |
| `--h-3` | 22–28px | 1.25 | 700 | Card titles, sub-heads |
| `--body-lg` | 18–20px | 1.5 | 400 | Lede paragraph |
| `--body` | 15px | 1.55 | 400 | Body copy |
| `--body-sm` | 13px | 1.5 | 400 | Captions, secondary |
| `--label` | 11px | 1.3 | 600 | Eyebrow/kicker labels |
| `--micro` | 10px | 1.2 | 700 | Tags, pill text |

### Italic serif moments

Use Georgia italic (not bold italic) for:
- Hero headline `<em>` accents (the second line of a two-line display)
- Section subtitles / dek below title bars
- Fighter hometown/vitals under profile names
- "Quote of the week" pulls

### Mono moments

Use JetBrains Mono for:
- Stat numbers in tables
- Round-by-round scoring cards
- Week badges (`WK 05 · S26`)
- Timestamps and counters

## Spacing

Based on a 4px grid.

```
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96
```

Page gutters:
- Mobile: 20px
- Desktop: 48–64px

Section vertical rhythm:
- Between major sections: 64px
- Between subsections: 40px
- Card internal padding: 20–28px

## Radius

Mostly flat — this is an editorial design.

```
--r-sm: 4px    (pills, badges)
--r-md: 8px    (buttons, input fields)
--r-lg: 14px   (cards — optional, use sparingly)
```

Images and stat-wall cells stay **unrounded** to preserve the broadsheet feel.

## Shadows

Avoid shadows. Use hairline borders and paper-tone backgrounds for elevation instead.

The one exception: the pick'em "call the card" banner can use a subtle `0 1px 0 rgba(0,0,0,0.06)` to lift it from the paper.

## Motion

- `--ease`: `cubic-bezier(0.2, 0.8, 0.2, 1)` (standard)
- `--ease-slow`: `cubic-bezier(0.4, 0, 0.2, 1)` (for layout shifts)
- Durations: 150ms (micro), 250ms (standard), 400ms (page/route)

Keep motion minimal. A round-card flip, a pick-select press, a navigation underline — no more.

## Borders

```
--bd-hair: 1px solid var(--rule)
--bd-rule: 1px solid var(--ink)
--bd-dot:  1px dotted var(--rule-soft)
```

Top-of-section uses `--bd-rule`; row dividers use `--bd-dot`; card edges use `--bd-hair`.
