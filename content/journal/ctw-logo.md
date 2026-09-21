---
title: "The CTW mark"
date: 2026-09-21 13:00 -0500
tags: [design, logo]
draft: true
image: /assets/ctw-logo/wire-built-version.gif
---

![The CTW mark, built](/assets/ctw-logo/wire-built-version.gif)

I've been working on a logo for this site: my initials, C-T-W, as one connected 3D solid. It started as a pile of concept renders and ended up as a little animation that now sits in the navbar up top. It plays once when the page loads and holds on the solid.

<!--more-->

## Starting concepts

I began by generating a bunch of variations — different ways to read C, T, and W out of a single cube. A few of the directions:

![Concept 2](/assets/ctw-logo/concept-2-v2.png)

![Concept 5](/assets/ctw-logo/concept-5-v2.png)

![Solid clay study](/assets/ctw-logo/ctw-solid-clay.png)

The solid-clay direction won: one continuous block, no floating pieces, matte finish. From there I stopped generating and started measuring.

## Refining the faces

To get exact control I built a 2D face editor: [w-shape-editor](https://charliewynn.github.io/w-shape-editor/). Each letter is a flat polygon — W on the right face, T on the front, C on top — and the tool unions them into a single watertight solid at a given thickness. Drag the red points, and the 3D preview updates live.

![W face editor](/assets/ctw-logo/w-shape-editor.png)

I exported the coordinates, ran them through my slicer as a sanity check (it passed with no warnings, so the union is clean), and settled on a thickness of 0.75. The flat-shaded studio render is the current still:

![Pure studio render](/assets/ctw-logo/ctw-logo-pure-v1-studio.png)

I also tried a rounded clay variant, but the pure flat-faced version is the one.

![Clay studio render](/assets/ctw-logo/ctw-logo-clay-v5-studio.png)

## Animating it

Then I wanted a build animation, so I made a second tool: [ctw-animator](https://charliewynn.github.io/ctw-animator/) ([repo](https://github.com/charliewynn/ctw-animator)). It's a playground for the "wireframe builds, faces fill in behind it" animation — sliders for timing, build order, colors, and light direction, with video export.

![CTW animator](/assets/ctw-logo/ctw-animator.png)

## The animations

The one I kept: edges draw from the ground up, and the faces start filling in a little past halfway through the wireframe, in the same bottom-up order.

![Wire-built version](/assets/ctw-logo/wire-built-version.gif)

I also tried a 3D-print style layer sweep, which didn't make the cut but was fun to watch:

![Layer build](/assets/ctw-logo/anim-build-layers-v2.gif)

The wire-built version is what's in the navbar now. Plays once, holds solid.
