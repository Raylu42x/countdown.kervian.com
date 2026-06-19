# countdown.kervian.com

A holiday countdown site at [countdown.kervian.com](https://countdown.kervian.com).

## What it does

- **43 holidays** across 6 categories: Religious, Cultural, National, Seasonal, Fun
- **Home page**: responsive card grid sorted soonest-first, with category filters and animated canvas previews on hover
- **Full-screen timer**: counts down to the next occurrence of any holiday with animated canvas backgrounds; switches between box / single-seconds / done-greeting modes automatically
- **18 canvas effects**: fireworks, confetti, sparkles, emojis, balloons, bubbles, rockets, hearts, snowfall, petals, rain, sky lanterns, embers, falling leaves, shamrocks, butterflies, starlight, bats
- **Custom countdowns**: set any title, date/time, accent color, canvas, and emoji set — then share via a URL that encodes every setting
- **Self-maintaining dates**: fixed, nth-weekday, last-weekday, Easter offset, and published-table (lunar/observed) rules auto-advance every year — no maintenance needed
- **About page** with site description

## Tech

Single self-contained `index.html` — vanilla JS, no framework, no build step. Google Fonts (Instrument Serif + Space Grotesk) loaded from CDN. Everything else is inline.

## Files

```
index.html          — the entire site
docs/               — project notes
project/            — original design handoff files (reference only)
```

## Deployment

Hosted on GitHub Pages. Custom domain set via `CNAME`. To deploy changes, push to `main`.
