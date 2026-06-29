# countdown.kervian.com

> Every moment, counted beautifully.

A countdown to anything. 49 prebuilt holidays, custom countdowns with shareable links, and 18 animated canvas effects. It's one self-contained HTML file with no accounts, no tracking, and no install.

**→ [Try it at countdown.kervian.com](https://countdown.kervian.com)**

## Tour of the site

https://github.com/user-attachments/assets/4eabec10-2b16-41a7-86ef-b7120f3321a6

## What it does

![Home page, countdown cards sorted soonest first](./docs/screenshot-home.png)

- **49 prebuilt holidays** across 5 categories: Religious, Cultural, National, Seasonal, and Fun.
- **Full-screen timer** with 18 animated canvas backgrounds: fireworks, confetti, sparkles, balloons, bubbles, rockets, hearts, snowfall, petals, rain, sky lanterns, embers, falling leaves, shamrocks, butterflies, starlight, bats, and emojis.
- **Custom countdowns.** Set any title, date and time, accent color, canvas effect, message, and emoji set.
- **Shareable links.** A custom countdown is encoded in the URL hash, including the source timezone, so a link made in New York ends at the same moment for someone opening it in Tokyo.
- **Self-maintaining holidays.** Fixed dates, nth-weekday, last-weekday, Easter offsets, and astronomical/lunar tables all roll forward to the next year automatically.
- **Responsive home grid** sorted soonest-first, with category filters and live canvas previews on hover.

## Custom countdowns

Pick any future date, style it, and send the link.

![Custom countdown setup with title, date, color, effect, and emojis](./docs/screenshot-custom.png)

The link itself stores everything: title, date, time, source timezone, accent color, animation, and emojis. There's no backend and no login. Whoever opens the link sees the exact countdown you made.

## Full-screen timer

Click any card and the countdown takes over the screen with its own animation.

![Independence Day full-screen timer with fireworks](./docs/screenshot-timer.png)

When the moment arrives, the timer switches to a done-greeting automatically.

## Tech

One self-contained `index.html`. Vanilla JS, no framework, no build step. The only dependency is Google Fonts (Instrument Serif for the display headings and Space Grotesk for the countdown digits); the rest of the UI uses the system font stack. The whole site is about 2400 lines.

## Repo layout

```
index.html       the whole site
docs/            screenshots and project notes
CNAME            custom domain config for GitHub Pages
```

## Deployment

Hosted on GitHub Pages. Pushing to `main` deploys.

## License

MIT, see [LICENSE](LICENSE).

## Contact

hello@kervian.com
## Repo layout

```
index.html       — the whole site
docs/            — screenshots and project notes
CNAME            — custom domain config for GitHub Pages
```

## Deployment

Hosted on GitHub Pages. Pushing to `main` deploys.

## License

MIT — see [LICENSE](LICENSE).

## Email
hello@kervian.com
