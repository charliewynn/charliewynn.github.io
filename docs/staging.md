# Staging-only features

The `staging` branch build sets `NEXT_PUBLIC_SHOW_DRAFTS=true` (a per-branch
environment variable in the Amplify console: App settings → Environment
variables). It enables staging-only editorial features. Never set it on the
production branch.

## Draft posts

Mark a post as a draft with `draft: true` in its frontmatter.

- **Staging:** drafts are listed and rendered with a "Draft" badge.
- **Prod:** drafts are filtered out at build time — their pages are never
  generated, so they are excluded from the deployment entirely.

Local preview: `NEXT_PUBLIC_SHOW_DRAFTS=true npm run dev`.

## Copy post ID button

On staging, every article page shows a small "Copy post ID" button next to
the byline. It copies the post's ID in `section/slug` form (e.g.
`projects/garage-door-monitor`), so Charlie can say "edit post <paste>"
in chat to request changes. Not rendered in prod.
