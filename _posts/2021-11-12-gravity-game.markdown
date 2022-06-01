---
layout: page
title: Gravity Game
date: 2021-11-12 10:33:16 -0600
categories: javascript html5 canvas game
tags: [games]
image: ../assets/gravity/gameplay.png
---

[![Image of gravity game gameplay. Click to navigate to game.](../assets/gravity/gameplay.png)](https://cwynn.com/gravity)

I made a physics game where you launch a "spacecraft" (red circle) and attempt to land on a "planet" (green circle).
You use the gravity from nearby "planets" (blue circles) to collect bonuses (purple dots).
The longer the trip the more points! Your score is divided by the number of launches it takes to land on the planet.

I ran into a number of interesting issues with the game. A big one is that html5 canvas struggled to render every breadcrumb of the spaceship's travel. The solution I came up with was that every 50 breadcrumbs I render I take a "screenshot" of the breadcrumbs and planets (without the player) and cache it. Then I delete all of the breadcrumbs and render the image which is much faster.

<!--more-->

[Play Here](https://cwynn.com/gravity)
