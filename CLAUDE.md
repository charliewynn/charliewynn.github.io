# cwynn.com — Jekyll Blog

Personal blog at https://cwynn.com. Built with Jekyll and PicoCSS, deployed via GitHub Pages.

## Dev server

Always use Homebrew's Ruby (not the system Ruby 2.6):

```
/opt/homebrew/opt/ruby/bin/bundle exec jekyll serve
```

Runs at http://localhost:4000. The config file (`_config.yml`) is NOT hot-reloaded — restart the server after changing it.

## Structure

- `_posts/` — blog posts (Markdown)
- `_pages/` — static pages included via `_config.yml`'s `include: [_pages]`
- `_layouts/home.html` — home layout (post-card grid, filters `site.tags.featured`)
- `_includes/header.html` — custom nav header
- `assets/` — images and static files

## Post conventions

Frontmatter for a typical post:

```yaml
---
layout: post
title: My Post Title
date: 2024-02-26 11:35 -0600
tags: [featured, tinkering]
image: ../assets/my_post/hero_image.jpg
---
```

- **tags** drive which pages a post appears on:
  - `featured` → home page (`/`)
  - `tinkering` → `/tinkering/`
  - `games` → `/games/`
  - A post can have multiple tags
- **image** is shown as the post thumbnail on listing pages
- **excerpt** is everything before `<!--more-->` — used as the preview blurb on listing pages. The separator is set in `_config.yml` as `excerpt_separator: <!--more-->`
- Post filenames: `YYYY-MM-DD-slug.md`

## Linking between posts

Use Jekyll's `post_url` tag to link between posts (avoids broken links if slugs change):

```markdown
[See the related post]({% post_url 2024-02-01-washing-machine-drain-overflow-auto-cutoff %})
```

## Pages

Pages live in `_pages/` and use `layout: page`. Each listing page (tinkering, games, all) renders posts by filtering `site.tags.<tagname>`. To add a page to the nav, add it to `header_pages` in `_config.yml`.
