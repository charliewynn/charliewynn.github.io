# cwynn.com

Charlie Wynn's personal site — projects, games, workshop 3D models, journal, and essays.

## Stack

- **Next.js 15** (App Router) with `output: "export"` — fully static, no server, no auth.
- **Markdown content** in `/content` (`projects/`, `games/`, `journal/`, `essays/`).
  - Frontmatter: `title`, `date`, `tags`, `image`, `repo`, `playUrl`, `featured`.
  - Everything in `projects/`/`games/` is also duplicated into `journal/` (the chronological log).
- **Hosting:** AWS Amplify Hosting. `staging` branch auto-builds to `staging.cwynn.com`;
  `main` builds to `cwynn.com`. Never push to `main` directly — open a PR, Charlie merges.

## Local dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Adding content

- **New project/game/journal entry:** drop a markdown file in the right `content/` folder.
  Images go in `public/assets/<slug>/` and are referenced as `/assets/<slug>/file.jpg`.
- **Workshop 3D model:** flip the Tinkercad design to Public, copy the share URL's ID
  (the part after `tinkercad.com/things/`), and add an entry to `MODELS` in
  `app/workshop/page.tsx`. It embeds as an interactive viewer automatically.
- **Essay:** add markdown to `content/essays/` and re-add the `app/essays/[slug]/`
  route pattern from git history (it was removed while the section was empty —
  static export requires `generateStaticParams` to return at least nothing breaks;
  see `app/projects/[slug]/page.tsx` for the template).

## Notes

- Game "Play" links point at `https://charliewynn.github.io/<game>/` — the games are
  separate repos with their own GitHub Pages; those subpaths only work there, not
  on the Amplify-hosted domain.
- Old Jekyll post URLs (`/YYYY/MM/DD/slug.html`) are preserved via Amplify
  redirects (see `/tmp/cwynn-redirects.json` on the build machine; applied in the
  Amplify console).
