# countdown.kervian.com

> Every moment, counted beautifully.

A countdown to anything — 49 prebuilt holidays, custom dates with shareable URLs, and 18 animated canvas effects. One self-contained HTML file. No accounts, no tracking, no install.

**→ [Try it at countdown.kervian.com](https://countdown.kervian.com)**

## Tour of the site

https://github.com/user-attachments/assets/4eabec10-2b16-41a7-86ef-b7120f3321a6

## What it does

![Home page — countdown cards sorted soonest first](./docs/screenshot-home.png)

- **49 prebuilt holidays** across 5 categories — Religious, Cultural, National, Seasonal, Fun
- **Full-screen timer** with 18 animated canvas backgrounds: fireworks, confetti, sparkles, balloons, bubbles, rockets, hearts, snowfall, petals, rain, sky lanterns, embers, falling leaves, shamrocks, butterflies, starlight, bats, emojis
- **Custom countdowns** — set any title, date and time, accent color, canvas effect, message, and emoji set
- **Shareable URLs** — your custom countdown is encoded in the URL hash, including the source timezone so a link from New York hits the same moment for a viewer in Tokyo
- **Self-maintaining holidays** — fixed dates, nth-weekday, last-weekday, Easter offsets, and astronomical / lunar tables auto-advance every year with no maintenance
- **Responsive home grid** sorted soonest-first, with category filters and live canvas previews on hover

## Custom countdowns

Pick any future moment, style it, and send a link.

![Custom countdown — pick a title, date, color, effect, and emojis](./docs/screenshot-custom.png)

The URL itself stores everything — title, date, time, source timezone, accent color, animation, emojis. No backend, no login. The recipient opens the link and sees your exact countdown.

## Full-screen timer

Click any card and the countdown takes over the screen with its own animation.

![Independence Day full-screen timer with fireworks](./docs/screenshot-timer.png)

When the moment arrives, the timer switches to a done-greeting mode automatically.

## Tech

One self-contained `index.html` — vanilla JS, no framework, no build step, no dependencies beyond Google Fonts (Instrument Serif + Space Grotesk) loaded from a CDN. The entire site is ~2400 lines.

## Repo layout

```
index.html       — the whole site
docs/            — screenshots and project notes
project/         — original design handoff files (reference only)
CNAME            — custom domain config for GitHub Pages
```

## Deployment

Hosted on GitHub Pages. Pushing to `main` deploys.

## License

MIT — see [LICENSE](LICENSE).
