# cwynn.com — Design System

Personal site for Charlie Wynn. Warm, sensible, and deliberately **not** the
family-hub look (that's coffee & creme; this is paper & spruce).

## Palette

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f7f2e8` | Page background. Warm paper, a touch lighter than family-hub creme. |
| `--paper-deep` | `#efe7d3` | Card backgrounds, subtle panels. |
| `--ink` | `#211c14` | Headlines, body text. Warm near-black, never pure `#000`. |
| `--ink-soft` | `#5c554a` | Secondary text, dates, captions. |
| `--accent` | `#2e5d4b` | Deep spruce green. Links, buttons, section eyebrows, active states. The one confident color. |
| `--accent-deep` | `#1e4034` | Hover states on accent elements. |
| `--brass` | `#a87f2a` | Kickers, rules, tiny highlights. Sparing — never large fills. |
| `--line` | `#e0d5bd` | Borders, dividers, card outlines. |
| `--card` | `#fffdf7` | Card surface on top of paper. |

Rationale: the site is a workshop/museum of built things. Spruce + brass on warm
paper reads "well-kept workshop" without going full brown like the family hub.
One accent color, used decisively. Everything else is paper and ink.

## Typography

- **Display:** Fraunces (serif, via `next/font`). Headlines, hero, article titles.
  Weights 400–700. Tight letter-spacing on large sizes.
- **Body/UI:** system sans stack. Articles, cards, nav. 1.6–1.7 line-height for prose.
- **Eyebrow/kicker:** 12px, uppercase, letter-spacing 0.12em, brass, semibold.
  Used above hero titles and section headers ("Featured builds", dates on cards).

## Components

- **Nav:** wordmark `cwynn` (Fraunces, lowercase) left; section links right.
  Mobile: links wrap to a second row, no hamburger. Sticky? No — simple static bar
  with a hairline bottom border.
- **Cards:** white surface, 1px `--line` border, 12px radius, image on top (16/10),
  date eyebrow, serif title, 2-line excerpt. Hover: title goes accent, card lifts
  2px. No shadows by default — the border does the work.
- **Article:** max-width 42rem, centered. Serif H1, soft date line, prose with
  generous spacing. Images full-bleed within the column, 8px radius, caption in
  `--ink-soft`.
- **Hero (home):** eyebrow ("Personal site of"), huge Fraunces name, one short
  paragraph in his voice. No photo, no "hire me" panel.
- **Section headers:** serif H2 left, small accent link right ("All projects →").
- **Footer:** hairline top border, three columns on desktop (sections / elsewhere /
  colophon), stacked on mobile. Quiet.
- **Buttons/links:** text links are accent with underline on hover. The rare solid
  button (e.g. "Play game") is accent fill, paper text, 8px radius.

## Voice (content, not chrome)

- Practical, technically competent, candid, funny without performing.
- No résumé energy: no skills bars, no "hire me", no testimonials.
- Corrections welcome; fluff is not. If a post is thin, shorten it — don't pad it.
- Megalomaniacal positioning ("imagine what an all-around pro he is") guides
  *tone only* and never appears in copy, docs, or code.

## Responsive

- Desktop-first content, mobile-first checking. Max content width 72rem.
- Grids: 3 → 2 → 1 columns at 1024 / 640.
- **Never scrolls horizontally on mobile.** Check at 390px after every change.
- Touch targets ≥ 44px where tappable.

## What this is not

- Not family-hub: no coffee browns, no creme-on-creme, no rounded-everything.
- Not a portfolio template: no hero photo, no skill meters, no contact form.
- No client-side JS beyond Next.js defaults. No auth, no backend, no tracking.
