# Countdown — Work Tracker

A static holiday-countdown site: landing list sorted soonest-first with category
filters, a full-screen timer per holiday with switchable animated canvases, and
custom user countdowns with shareable links. Single file: `Countdown.dc.html`.

---

## ✅ Done

- **43 holidays** across 6 filters (All / Religious / Cultural / National / Seasonal / Fun).
- **Self-rolling dates forever** — fixed, nth-weekday, last-weekday, Easter (+offset for
  Mardi Gras), and published-table holidays (lunar/observed) all auto-advance each year.
- **Landing list** — responsive grid, themed cards, animated canvas preview on hover.
- **Full-screen timer** — date → name → numbers; zero units drop off as it gets close;
  boxes reflow by aspect (wide row / 2-up / phone stack).
- **~18 canvases**: fireworks, confetti, sparkles, emojis, balloons, bubbles, rockets,
  hearts, snow, petals, rain, lanterns, embers, leaves, shamrocks, butterflies, stars, bats.
- **Live animated preview thumbnails** in the options panel.
- **Custom countdowns** — title, date/time, accent (16 colors), canvas; shareable links.
- **Number-size slider** + **About page**.

### Just landed (this round of feedback)
- **Canvas switching on "done" holidays fixed** — a holiday whose date is today
  (e.g. Juneteenth) no longer locks to fireworks; the picked canvas now shows.
- **Animation speed** — slider added + global default lowered (slower, calmer).
- **Card previews no longer stick** — the canvas fully clears when you move off / between cards.
- **Make-your-own emoji canvas** — for custom countdowns: pick up to **5** emojis from a
  clean, filtered set + choose **direction** (fall ↓ / rise ↑).
- **Custom "message at zero"** — set the message shown when a custom countdown ends.
- **Perf pass** — preview thumbnails throttled, particle cap lowered.

---

## 📝 Still want from you (open questions / decisions)

- **Deploy** — wire into the real `countdown.kervian.com/index.html` for GitHub Pages?
- **Holiday list** — any to add/remove? Any that should get a bespoke canvas
  (menorah candles, dancing skeletons, etc.) instead of a shared one?
- **Date accuracy** — lunar/observed dates (Holi, Vesak, Jewish/Islamic holidays) are
  best-published estimates and can shift a day by local observation. OK as-is?
- **Emoji set** — happy with the curated ~28-emoji clean lineup, or want specific ones?
- **Speed feel** — is the new default speed right, or still too fast/slow?
- Anything else on visuals, layout, or behavior.

---

## 🔭 Possible next ideas (not started — tell me which you want)

- Search box on the landing page.
- "Add to calendar" / reminder link on the timer.
- Sound/mute toggle at zero.
- Pin favorites to the top of the list.
