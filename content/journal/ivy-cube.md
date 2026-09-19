---
title: "Ivy Cube"
date: 2021-01-01 15:17 -0600
tags: [cubing, puzzles]
draft: true
image: /assets/lazycuber/ivy-cube/solved.jpeg
---

I got this for my birthday in Costa Rica. It's fairly easy to solve intuitively, but I worked out a method anyway.

# Initial Thoughts

Corner turner. It *looks* simple. Playing around confirms it can be solved by just messing around.

# Nomenclature

Ivy cube has two types of pieces. I call them "corners" and "leaves".

![nomenclature](/assets/lazycuber/ivy-cube/nomenclature.jpeg)

1) Orient the corners

This is relatively easy. I start with the white corners. Then there is usually just one or two corners that need some tweaking. I do this entirely intuitively. If you play around you should get a feel for how the corners move.

When the corners are solved the cube should look similar to this.

![corners solved](/assets/lazycuber/ivy-cube/matching-corners.jpeg)

2) Solve the leaves

Obviously if you can solve the leaves without messing up the corners we're done. I have one algorithm which swaps three leaves.

## Flower Swap

I call this a flower swap (three leaves that form a flower shape)

![Flower Swap](/assets/lazycuber/ivy-cube/flower-movement.jpeg)

![Flower Algorithm](/assets/lazycuber/ivy-cube/mixed-leaves-algo.jpeg)

(This is my first post; hopefully my way of documenting algorithms makes sense. I think this is easier than defining the movement at the beginning and then telling you `RrL'FFbL` or whatever.)

Twist the corner on which I drew a green overlay "up" (send the orange leaf up). Twist the red overlay "up". Green back down. Then red down.

**You can reverse the red and green to change the direction the three leaves get swapped.**
I think of it as:

1. corner of the leaf color I want to go 'up' first
2. other corner up
3. first corner down
4. second corner down

You may need to do this a few times to move the leaves around until you either solve the puzzle or get to a point where doing any more swaps will start undoing your other leaves.

## Triangle Swap

You may be left with a final condition which can't be solved with a flower swap. I call it a "triangle" swap.

![Triangle Swap](/assets/lazycuber/ivy-cube/triangle-swap.jpeg)

I'm sure I could come up with an algorithm for this. But in the spirit of lazy cubing we'll just use a Conjugate. ([RebKB has a great video on conjugates here](https://youtu.be/3WLb0VddFNg)).

In the example picture we'll take the green leaf and move it to make a flower with the orange and white leaves.

Your setup moves might be a bit different (there is more than one way to make the flower). Ideally you would memorize the setup moves so you can undo them after the algo. But on an ivy cube it's easy enough to undo the setup intuitively.

![Triangle Setup](/assets/lazycuber/ivy-cube/triangle-post-setup.jpeg)

After the setup you can do the flower swap as normal. It won't look solved, but after undoing the setup moves you should be done!

![Triangle Post Algorithm](/assets/lazycuber/ivy-cube/triangle-post-algo.jpeg)

# Done!

![Solved](/assets/lazycuber/ivy-cube/solved.jpeg)
