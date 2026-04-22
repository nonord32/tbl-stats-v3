# Design tokens

Three directions are designed. The **Merged** direction is recommended.

## Merged — editorial × modern

```css
:root {
  /* Paper + ink */
  --bg:         #f4efe4;  /* cream paper */
  --bg-alt:     #ebe4d3;  /* paper shade */
  --ink:        #1a1611;  /* near-black, warm */
  --ink-2:      #3a3229;
  --ink-3:      #6b5d48;
  --ink-4:      #8b7d64;

  /* Accent */
  --accent:     #a8271a;  /* oxblood red, sparing */
  --accent-bg:  #f7e8df;  /* accent at 8% */

  /* Rules */
  --rule:       #1a1611;
  --rule-soft:  #c9bfa7;

  /* Type */
  --serif: Georgia, "Times New Roman", serif;
  --sans:  "Inter", -apple-system, system-ui, sans-serif;
  --mono:  "JetBrains Mono", ui-monospace, monospace;

  /* Scale */
  --fs-display: 88px;
  --fs-h1:      56px;
  --fs-h2:      36px;
  --fs-h3:      22px;
  --fs-body:    15px;
  --fs-small:   13px;
  --fs-caption: 11px;  /* 2.5 letter-spacing, uppercase */
}
```

**Rules to live by**
- Display type is **Georgia italic**. Body + UI is **Inter**. Round codes and scores are **mono**.
- Red `--accent` is used only for: active nav, net-points values, "more →" links, streak badges, your-row highlight, CTA buttons.
- No shadows. Hierarchy comes from rules, borders, and type weight.
- Radii: 0 on page-level containers; 12–20 on interactive cards only.

---

## Broadsheet — editorial sports almanac

```css
:root {
  --bg:        #f4efe4;
  --bg-alt:    #ebe4d3;
  --ink:       #1a1611;
  --accent:    #a8271a;
  --rule-soft: #8b7d64;
  --serif:     Georgia, "Times New Roman", serif;
}
```

Differences from Merged: **serif everywhere** (no Inter for body), dotted row dividers, 3-column masthead for all inner pages, drop caps on feature ledes, triple-rule masthead.

---

## Arena — stadium energy

```css
:root {
  --bg:       #111014;
  --bg-2:     #17171c;
  --bg-3:     #1a1a20;
  --bdr:      #22222a;
  --text:     #f5f1ea;
  --mute:     #a8a29c;
  --mute-2:   #8b8580;
  --red:      #ff3b2f;
  --orange:   #ff7a45;
  --warm:     #ffb89d;
  --sans:     "Inter", "Helvetica Neue", system-ui, sans-serif;
  --grad:     linear-gradient(135deg, #ff7a45 0%, #ff3b2f 60%, #c01818 100%);
}
```

Differences: dark off-black surfaces, rounded cards (14–28px radii), amber→red gradient for display accents and hero CTAs, photo-forward with dark overlay gradients.

---

## Team tints (shared across all directions)

```js
const TEAM_TINT = {
  SA:  '#c8553d', MIA: '#ff6b9d', PHI: '#4a7c59', NYC: '#2b4c8c',
  ATL: '#d4a017', DAL: '#1e5ba8', LV:  '#8b1e3f', PHX: '#e67e22',
  HOU: '#c0392b', NSH: '#7b4397', CHI: '#2c3e50', DET: '#16a085',
};
```

Used as 10–14px dots in standings, 2px borders on fighter avatars, and 12% alpha fills for division chips. Never used as a dominant fill.
