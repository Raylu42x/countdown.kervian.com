# Handoff: Countdown — Holiday Canvas Collection

## Overview
A static website that counts down to holidays. The landing page is a grid of holiday
cards sorted soonest-first, with category filters at the top. Selecting a holiday opens
a full-screen countdown timer over an animated canvas background; the user can switch
between several canvases per holiday, scale the numbers, and adjust animation speed.
Users can also build a **custom** countdown (any title, date/time, accent color, canvas,
emoji set, and an end message) and share it via a URL that encodes every setting.

Everything is **fully responsive** (phone → desktop) and **self-maintaining**: holiday
dates recompute every year, so the site works indefinitely with no edits.

## About the Design Files
The files in this bundle are a **design reference created in HTML** — a working
prototype showing the intended look, motion, and behavior. They are **not** meant to be
shipped verbatim. The task is to **recreate this design in the target codebase's
environment** (React, Vue, Svelte, plain TS, etc.) using its established patterns. If no
codebase exists yet, React + a single `<canvas>` animation hook is the most natural fit.

> Implementation note: the prototype is authored as a "Design Component" (`.dc.html`)
> that depends on a runtime (`support.js`) providing a tiny template/`renderVals` layer.
> **Do not port `support.js`.** It is scaffolding for the prototyping environment. Read
> `Countdown.dc.html` for the logic (the `class Component` block) and markup, and
> re-express it in your framework. All real logic — the date engine, the particle
> system, layout math — is plain framework-agnostic JavaScript and ports directly.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, motion, and interactions are all
intended as shown. Recreate pixel-faithfully, then swap in the codebase's own primitives
where they exist (button, slider, text input).

---

## Screens / Views

The app is a single page with three views switched by an in-memory `view` state
(`'home' | 'timer' | 'about'`). No router; deep-linking is via `location.hash`.

### 1. Home (landing list)
- **Purpose**: Browse holidays, filter by category, jump into a countdown, or create a custom one.
- **Layout**:
  - Scrollable page on a radial-gradient background:
    `radial-gradient(120% 80% at 50% -10%, #171034 0%, #0a0820 45%, #06060d 100%)`.
  - Centered column, `max-width:1500px`, padding `clamp(14px,2.5vw,28px) clamp(18px,4vw,56px) 80px`.
  - **Header row** (right-aligned, `justify-content:flex-end`, gap 18px): a text "About"
    button and a pill "Create your own ↗" button.
  - **Hero**: `<h1>` "Every moment, counted beautifully." — "counted" is italic and gold.
    Font Instrument Serif, `clamp(40px,7.4vw,92px)`, line-height 0.98, color `#fff`.
    (Intentionally just the hero — no subheading or top-of-page countdown.)
  - **Filter chips row** (flex, wrap, gap 10px): one chip per category.
  - **Card grid**: `display:grid; grid-template-columns:repeat(auto-fill,minmax(min(230px,100%),1fr)); gap:clamp(13px,1.5vw,24px)`.
    The `230px` min is configurable (see Design Tokens → `cardMinWidth`). A "Create your
    own" dashed tile is always the last grid item.
- **Holiday card** (each grid cell):
  - `position:relative; overflow:hidden; border-radius:18px; height:clamp(170px,23vh,250px)`.
  - Background: `radial-gradient(135% 120% at 0% 0%, <accent>33, transparent 56%), linear-gradient(165deg, <bg0>, <bg1>)`.
  - Border `1px solid rgba(255,255,255,.08)`.
  - A full-bleed `<canvas>` (z-index 1) sits behind a bottom-up scrim
    `linear-gradient(180deg, rgba(6,6,13,0) 42%, rgba(6,6,13,.74) 100%)` (z-index 2).
  - Bottom-left text block (z-index 3): holiday **name** (Instrument Serif,
    `clamp(21px,2.3vw,31px)`, white, text-shadow `0 2px 14px rgba(0,0,0,.55)`); below it a
    row with **days remaining** (big, in the holiday accent, `font:700 clamp(20px,2.3vw,30px)`,
    text-shadow `0 0 18px <accent>55`) + a small caption ("days left" / "day left" /
    "happening now"), and the **date** right-aligned (`Space Grotesk 500 11px`,
    `rgba(255,255,255,.62)`).
  - **Hover**: `transform:translateY(-6px) scale(1.012); border-color:<accent>88;
    box-shadow:0 20px 52px -14px <accent>66`, transition `.35s cubic-bezier(.2,.8,.2,1)`.
    On hover the card's canvas runs that holiday's **first** canvas animation as a live
    preview (pre-seeded so it's full instantly). On mouse-out the canvas is cleared.
  - **Click** → open that holiday's timer.
- **"Create your own" tile**: dashed border `1.5px dashed rgba(255,255,255,.18)`, a "+"
  circle, "Create your own" (Instrument Serif 19px), caption "Any date · any canvas".
  Hover brightens border/background to gold tints. Click → custom timer with panel open.

### 2. Timer (full-screen countdown)
- **Purpose**: Watch a countdown; switch canvas / size / speed; (custom) edit settings; share.
- **Layout**:
  - Full-viewport stage: `linear-gradient(165deg, <bg0> 0%, <bg1> 100%)`.
  - Full-bleed `<canvas>` (z-index 1) + radial vignette
    `radial-gradient(120% 90% at 50% 42%, transparent 40%, rgba(6,6,13,.55) 100%)` (z2).
  - Top-left **"← All holidays"** pill (glass: `rgba(255,255,255,.06)`, `1px` border,
    `backdrop-filter:blur(10px)`). Top-right **gear** button (44×44 circle, same glass)
    toggles the options panel.
  - Centered content column (z-index 3): a small uppercase **date tag** in the accent
    color; the **name** (`<h2>`, Instrument Serif `clamp(34px,6vw,76px)`, white); then the
    countdown.
- **Countdown has three modes** (by time remaining):
  - **boxMode** (default, >60s): a centered flex-wrap of unit boxes. Each box is glass
    (`rgba(255,255,255,.05)`, `1px` border, `backdrop-filter:blur(8px)`, radius 18px) with a
    big number (Space Grotesk 700, accent color, `text-shadow 0 0 …px <accent>66`,
    `font-variant-numeric:tabular-nums`) and an uppercase label. **Units that are zero at
    the front drop off** (e.g. under a day, "Days" disappears) and the remaining boxes
    resize/relayout. Number size is driven by the size slider and clamped to fit.
  - **bigMode** (≤60s): a single huge pulsing seconds number (`animation:cdpulse .9s infinite`)
    with the caption "seconds to go".
  - **doneMode** (≤0): the **greeting** (Instrument Serif italic, accent,
    `clamp(40px,8vw,98px)`) + "THE MOMENT IS HERE". The selected canvas keeps animating
    behind it (do **not** force a specific effect here).
- **Options panel** (slides in from right, `width:min(380px,88vw)`, `rgba(10,9,18,.82)`,
  `backdrop-filter:blur(22px)`, left border, `animation:cdpanel .3s`):
  - *(Custom only)* **Title** input (selects all on focus), **Message at zero** input,
    **Date** + **Time** inputs, **Accent** swatches (16 colors; selected = white ring + glow).
  - **Number size** range slider (0–1).
  - **Animation speed** range slider (0–1).
  - **Canvas** list: one row per available canvas. Each row has a 42×42 `<canvas>`
    **live mini-preview** of that effect, the label, and a selection dot (filled accent +
    glow when active). Click selects it.
  - *(Custom + Emojis canvas selected)* **Your emojis** builder: a grid of ~28 clean
    emoji buttons, choose up to **5** (selected highlighted; a count "n/5"; further picks
    disabled at 5), plus a **Direction** segmented control (**Fall ↓ / Rise ↑**).
  - **Copy share link** button (gold gradient) → writes `location.href` to clipboard,
    label flips to "Copied!" for ~1.6s. Caption: "Share this link — settings travel with it."

### 3. About
- Back pill (top-left). Centered column `max-width:680px`.
- Eyebrow "ABOUT" (gold, letter-spacing .24em), `<h1>` "A countdown for *every* moment."
  (Instrument Serif, "every" italic gold), three paragraphs of body copy
  (`rgba(255,255,255,.72)`, line-height 1.65), a 3-item bullet list bounded by hairline
  rules, then "Create your own ↗" + "Browse holidays" buttons. Exact copy is in the file.

---

## Interactions & Behavior
- **Navigation**: card/tile click sets `view='timer'`; back pill → `view='home'`; About
  button → `view='about'`. No page reload.
- **Deep links (`location.hash`)** — settings travel with the URL:
  - Holiday: `#v=timer&h=<holidayId>&bg=<index>&sz=<0..1>&sp=<0..1>`
  - Custom: `#v=timer&c=<URI-encoded JSON>` where JSON is
    `{t:title, d:dateISO, tm:time, a:accent, e:effectId, s:size, sp:speed, msg:message, el:[emojis], ed:'fall'|'rise'}`.
  - On load, `parseHash()` restores the view/state; on any change, `syncHash()` rewrites it
    via `history.replaceState` (no history spam).
- **Tick**: a 200ms interval re-renders the timer; remaining time derives from `Date.now()`.
- **Canvas preview on hover** (home): starts immediately (the surface is "warmed" by
  simulating ~18 frames on creation) and is cleared on mouse-out and when switching cards.
- **Animation speed**: a global multiplier. `velMul = 0.25 + 1.4*speed` scales particle
  velocity; `rateMul = 0.55 + 0.6*speed` scales spawn rate. Default `speed = 0.4`.
- **Performance**: option-panel mini-previews update at ~30fps (every other frame, with
  doubled dt to compensate); particle count is capped (~300); devicePixelRatio capped at 2.
- **Responsive timer layout** (by viewport aspect, computed in JS):
  - width > height → all unit boxes in **one row**.
  - portrait/≈square → **2 columns** (odd box centers below).
  - very narrow (`width < 380`) → **single column**, stacking up to 4 tall.
- **reduceMotion** flag dampens spawn density (×0.45) for accessibility.

## State Management
In-memory state (single component):
- `view` `'home'|'timer'|'about'`
- `filter` category key
- `holidayId` selected holiday id (when not custom)
- `bg` selected canvas index for the holiday
- `isCustom` boolean
- `optionsOpen` boolean
- `size` 0–1 (number scale), `speed` 0–1 (animation speed)
- `winW`, `winH` (viewport, updated on resize)
- `tick`, `done`, `copied` (transient)
- `custom`: `{ title, dateISO, time, accent, effect, message, emojiList[], emojiDir }`
- Non-React mutable refs (don't need to trigger renders): `hoverId`, and the canvas
  "surfaces" (`tsurf`, `msurf`, `optSurf{}`) plus canvas element refs (`timerCanvas`,
  `cards{}`, `optCanvas{}`).

No data fetching — all holiday data is a static array in the file (`DATA`).

## The recurring-date engine (port this carefully)
Each holiday has a `rule`. `resolveMs(holiday)` returns the next occurrence ≥ "now"
(with a 24h grace so day-of still shows as current), scanning years `now-1 … now+2` and
falling back to `now+1`. Rule types:
- `fixed` `{month, day}` — e.g. Christmas.
- `nth` `{month, weekday, n}` — nth weekday of month (e.g. Thanksgiving = 4th Thu of Nov).
- `nthLast` `{month, weekday}` — last weekday of month (Memorial Day).
- `easter` — computed via the Anonymous Gregorian algorithm (`easter(y)`).
- `easterOffset` `{off}` — Easter ± N days (Mardi Gras = −47).
- `table` `{dates:[…], time?}` — published dates for lunar/observed holidays (Diwali, Eid,
  Hanukkah, Lunar New Year, Holi, Passover, etc.). Beyond the table it extrapolates by the
  average period so it never breaks; **replace with authoritative dates if exact accuracy
  matters** (these can shift a day by local observation).
Optional `time:'HH:MM'` on any rule for sundown-based starts.

## Design Tokens
**Fonts** (Google Fonts):
- Display/serif: **Instrument Serif** (400, has italic) — hero, holiday names, greetings.
- UI/sans: **Space Grotesk** (400/500/600/700) — everything else. `font-variant-numeric:tabular-nums` on countdown digits.

**Core colors**
- App background `#06060d`; text `#ece9f5`.
- Home gradient `#171034 → #0a0820 → #06060d` (radial).
- Gold accent (brand/CTA): gradient `#fde68a → #f5c542`; on-gold text `#0a0820`.
- Glass surfaces: fill `rgba(255,255,255,.05)`, border `rgba(255,255,255,.10–.13)`, blur 8–22px.
- Each holiday defines its own `accent`, two-stop `bg`, and a `particles[]` palette — see the `DATA` array for exact hex per holiday.

**Accent swatches (custom)**: `#f5c542 #ffd166 #ff7a18 #ff5a5f #ff3b30 #ff5d8f #ff9eb5
#a855f7 #7c5cff #5aa9ff #4f86ff #2dd4bf #2ecc71 #7ed957 #06d6a0 #ffffff`.

**Radii**: cards/stage boxes 18px; panel rows/inputs 11–13px; pills/chips 999px.
**Shadows/glow**: card hover `0 20px 52px -14px <accent>66`; number glow `0 0 …px <accent>66`; gold CTA `0 8px 24px -8px rgba(245,197,66,.6)`.
**Type scale (fluid)**: hero `clamp(40px,7.4vw,92px)`; timer name `clamp(34px,6vw,76px)`; card name `clamp(21px,2.3vw,31px)`; countdown number computed to fit each box (min 24px). Slide/box label letter-spacing .16em uppercase.

**Configurable props** (exposed as tweaks in the prototype): `defaultFilter`
(`all|religious|cultural|national|seasonal|fun`), `cardMinWidth` (160–340, default 230),
`reduceMotion` (boolean).

## Canvas / particle system
One reusable engine drives ~18 effects. A "surface" = `{canvas, ctx, parts[], effectId,
palette, emojis, dir, …}`. Per frame: clear → maybe draw a starfield backdrop → spawn new
particles (rate scaled by canvas area + speed) → update + draw + cull. Effects and their
shapes/kinds (`fall` / `rise` / `cross`, plus the special `fireworks` rocket→spark burst):
fireworks, confetti (rect), sparkles (4-point), emojis (glyph), balloons, bubbles, rockets,
hearts, snow (circle), petals, rain, lanterns, embers, leaves, shamrocks, butterflies,
stars (twinkle), bats. Shapes are drawn procedurally with Canvas2D (no images). Emoji uses
the system emoji font. Each holiday lists which canvases it offers (`backgrounds:[[id,label],…]`)
and, where relevant, a themed `emojis[]` set.

## Assets
**None external.** No images or icon files — all imagery is drawn on `<canvas>`, all icons
are inline SVG, all decorative "emoji" use the OS emoji font. Only dependency is the two
Google Fonts above.

## Files
- `Countdown.dc.html` — the entire design: markup (template), the `class Component` logic
  (date engine, particle system, state, layout math, hash sync), and inline styles. **This
  is the source of truth.** Read the `class Component` block for all behavior.
- `support.js` — prototyping-environment runtime ONLY. Provides the `<x-dc>` / template /
  `renderVals` plumbing the prototype renders through. **Do not port this**; reimplement the
  component in your framework instead.
