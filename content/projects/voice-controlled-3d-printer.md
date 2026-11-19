---
title: "Voice In, Plastic Out: I Talk to My 3D Printer Now"
date: 2026-11-19 14:36 -0600
tags: [3d-printing, ai, automation, tinkering]
image: /assets/voice-controlled-3d-printer/printer-wide.jpg
---

![The A1 mini mid-print, three pieces on the plate and the rescued-out fourth sitting on the desk below](/assets/voice-controlled-3d-printer/printer-wide.jpg)

Two days ago I asked my AI assistant, out loud, to design a chunky twisty puzzle for my daughter. I have not opened a slicer since. I have not opened Bambu Studio, or the printer app, or a CAD program. Everything since then — the design, the print queue, three attempts at the print, a mid-print rescue that involved teaching the printer a trick its own manufacturer doesn't offer on this model, and a self-updating piece of infrastructure — has happened by talking, mostly by voice, plus the occasional photo I send back.

This post is the whole arc, because I still kind of can't believe it worked.

The print in these photos is a one-colour Twist Tower — a stacking, twisting puzzle for small hands, from my chunky-twisty-puzzles project. Four objects on one plate: a base, two rings, and a cap. The pink filament is just whatever was loaded.

<!--more-->

## The cast

There are three pieces of machinery here, and only one of them is the printer.

**The bridge** is a small program running on my PC at home. It talks to the Bambu A1 mini over my local network only — the printer is in LAN-only/developer mode, which means Bambu's cloud and the Handy phone app don't work with it at all. The bridge slices model files itself (with Orca), uploads them to the printer over FTP, and starts and monitors jobs over MQTT, the printer's own local protocol. It exposes a little token-guarded API: submit a job, ask for status, change speed, pause, resume, stop.

**Spooler** is a dedicated AI agent whose entire job is the printer. She keeps the queue register — what's waiting, what's printing, what finished, what failed and why — submits jobs through the bridge, monitors them, and reports back. She never designs anything; designs arrive print-ready from other conversations, the same way this tower did. Physical steps stay mine: clearing the plate, swapping filament, pulling a bad piece off. She holds a job until I confirm the plate is actually clear, because the printer will happily start a new print on top of a finished one.

**Me**, mostly on my phone, talking. Approving, correcting, and occasionally being the hands.

## The honest failure reel

Attempts one and two of the tower both failed, and both failures were mine, not the software's.

Attempt one started lifting off the plate — classic bed adhesion — and I killed it about ten percent in. Attempt two paused twice for no obvious reason, sat paused overnight, and then got resumed the next morning with the plate already cleared, which means it spent a while cheerfully printing into thin air before I killed it at 43%. The root cause, once I actually looked: the filament hadn't been seated properly, and later, it was too twisted and kept disconnecting. Old, badly-fed filament explains the runout-sensor pauses on both attempts. The queue absorbed all of this without drama — every transition logged, nothing silently retried, nothing pretending a failed print was fine.

Two bridge upgrades came directly out of the mess. First, a fix for a nasty deadlock: after a killed print, the printer's status stuck at FAILED and refused new jobs until I power-cycled it. Now FAILED is a startable state. Second — and this one changed everything — a camera endpoint.

## Giving the AI eyes

The A1 mini has a built-in camera, and as of this morning the bridge can pull frames from it on demand: full 1680×1080 stills, straight off the local network, no cloud compression. This is the first frame it ever served, verifying the plate was actually empty before attempt three:

![The printer's own camera: an empty plate, verified before starting attempt three](/assets/voice-controlled-3d-printer/camera-first-frame-empty-plate.jpg)

*The printer's own camera, 9:30 AM today. Empty plate, faint pink residue from the overnight attempt. Good enough to start.*

Attempt three started at 11:25, straight out of the FAILED state — the deadlock fix proving itself on its first morning. And then we set up the routine that makes this feel like a print shop instead of a gadget: **health monitoring**. Every twenty minutes, the watch pulls the printer's telemetry plus a fresh camera frame. Healthy print? Silence — I hear nothing. Something wrong — a stall, a pause, a piece lifting in the frame — I get the photo, a diagnosis, and a suggested action. If a failure is genuinely gnarly, the watch is allowed to pause the print first and alert me after; pausing is the only command it can send on its own. Skips and stops always wait for my word.

## The rescue

At 2:00 PM, at 12%, one of the tower's rings started lifting. The health watch's frame shows it plainly — on the left of the camera's view, the ring has curled up off the plate like a chip, while the big slab on the right is still flat and stuck fast:

![Camera frame at 2:01 PM: one ring curled up off the plate, the piece beside it still flat](/assets/voice-controlled-3d-printer/camera-lift-detected.jpg)

*The printer's camera at 2:01 PM. Left piece: gone. Right piece: fine. One print, two fates.*

The obvious move is to skip just the bad object and let the other three finish. Every official path to do that is closed on this printer: Bambu Studio's part-skip doesn't exist for the A1 series, the printer's own screen can't do it, and the phone app — the one route that can — is cloud-only, which my LAN-only setup rules out.

So, mid-print, the bridge learned a new trick. The Bambu protocol has a skip-objects command; the bridge just didn't speak it. Building `POST /skip` took about twenty minutes and hit every trap you'd hope a good story has:

- The first build read object IDs from the wrong place in the file — plausible-looking numbers that the printer would not have recognised. Caught on review, before it ever ran.
- The slicer hadn't written the ID file the skip command normally relies on. But the gcode itself had object labels turned on — four label IDs, one per piece — and those markers are what the printer builds its own skip map from. The file on the printer was the source of truth all along.
- Knowing the IDs wasn't enough; we had to know which ID was *the curled ring*. So the bridge learned to measure each object's position from its own extrusion moves in the gcode — first attempt at that map got polluted by the print head's park-and-purge travels, so it was rebuilt to use only real extruding moves and take the median position.
- And then a pure human problem: the AI kept saying "the left ring," because that's where it is *in the camera frame*. Standing at the printer, it was front-right. The gcode map settled it — object 20, centre (140, 45) in plate coordinates. My eyes were right; the camera's left is not the printer's left.

The print was already paused, so there was no clock on any of this. At 2:17 PM the skip fired — and the printer's own status report came back carrying the receipt: object 20, registered as skipped. Not "the bridge thinks it sent it." The printer said so, on three straight checks.

One last hands step, and it's the detail that matters: skipping a piece does not make the print head dodge it. Travel moves still cross that corner at layer height, and the curled tip stood well above it, half-detached — one graze could have dragged it through the good pieces. So I pulled it off the plate, said "resume," and the print restarted with the skip still in force. Here it is seconds later, bed already in motion, the pulled piece just visible at the far left edge of the frame, on the desk where I put it:

![Camera frame at 2:20 PM: printing resumed, three pieces on the moving bed, the skipped piece off at the left edge](/assets/voice-controlled-3d-printer/camera-resumed-after-skip.jpg)

*2:20 PM, from the printer's camera. Rescued. The tower will finish with three of its four pieces — base, one ring, and cap still give us the fit and detent data the prototype exists for. The missing ring is a short solo reprint later.*

And here is the same moment from my side of the machine — my photos, at 21%, with the printer's screen still showing the pause controls from the rescue. The close-up of the pulled piece is the best argument for the whole operation: that tip isn't slightly warped, it's standing up like a sail. It would never have sat flat in the tower, and on the plate it was a collision waiting for a travel move.

![Closer view at 21%: three pieces printing, the removed piece in the foreground](/assets/voice-controlled-3d-printer/printer-close-21pct.jpg)

![The skipped piece on the desk, its corner curled sharply upward](/assets/voice-controlled-3d-printer/curled-piece.jpg)

*The skipped piece, exiled to the desk. Verdict: correct.*

## The bridge learns to update itself

There was one remaining piece of friction, and it was me. Every bridge upgrade during this saga — and there were several in a single afternoon — meant the AI handing me a download link and a block of PowerShell to paste: download, stop the old process, start the new one, hope. During the rescue we even hit a version-ambiguity bug of our own making: my restart had landed an earlier build than we thought, and for a while nobody could say for certain which code was running. The bridge got a `/version` stamp (it reports the hash of its own running file) as a direct result.

Then we retired the dance. The updater is deliberately a *separate* little program, not a feature of the bridge: the bridge changes constantly, so it must not own the mechanism that rescues it when a bad build lands. The updater is about 200 lines, standard library only, and should essentially never change. For each update it downloads the new build, verifies the size and full SHA-256 hash, compile-checks it, backs up the running build (it keeps five), swaps, restarts, and polls `/version` until the bridge reports the expected hash. Any failure along the way — including a new build that comes up unhealthy — and it restores the backup, restarts, and says so. A hash mismatch is refused with the live file untouched.

Its maiden run was live, mid-print, at 2:27 PM: one line from me, and the bridge swapped itself underneath a running job. The print never noticed — it went from 13% to 17% across the swap, nozzle at temperature, and the skip on object 20 still in force afterward, verified from the printer's own report. Every future bridge feature now arrives the same way: a link, a hash, one line.

That includes features that arrived the same afternoon they were dreamed up. The health watch's frames now also feed a live status board — queue, printer state, speed control, and the newest camera frame as a "live plate view," timestamped:

![A health-check frame at 2:33 PM: the resumed print, mid-motion](/assets/voice-controlled-3d-printer/camera-health-check.jpg)

*A routine health-check frame, 2:33 PM. Silent in my messages, because everything in it is fine — it went to the board instead.*

## What's next, and what's still mine

As I write this, the tower is still printing — bumped from Silent back to Standard at my word, ETA this evening, three pieces out of four. Still on the dream list, in the open: a printed "shoe" for the toolhead and a sweep routine so the printer can clear its own plate after a clean finish — camera frame before, camera frame after, and anything that won't budge gets reported, never rammed. That design conversation started today. It is not built, and this post will not pretend otherwise.

The honest limits list, because there is one:

- The camera is one fixed, low angle, sampled every twenty minutes — not video. A failure can grow between frames, and subtle problems under a part are invisible to it.
- No ears. Extruder clicking and grinding are classic early warnings, and none of us can hear them.
- Borderline calls stay borderline. Today's curl was unambiguous; the next one might not be, and when it isn't, I get the photo and an "uncertain," not a confident verdict.
- The AI has no hands. Loading filament *properly* — the root cause of two of our three attempts — pulling a bad piece, and clearing a plate are still, stubbornly, a human's job. For now.

But step back from the tower for a second. In two days, talking out loud: an AI designed a toy for my daughter, a second AI took the job of running the printer, a bridge program grew a camera, a health watch, a mid-print object-skip that the manufacturer doesn't offer on this machine, and a self-updater with rollback — each feature specified in conversation, built in minutes, verified against the printer's own reports rather than anyone's say-so, and used for real the same day. The status updates I got were the kind a good shop tech sends: the photo, the number, what it means, what happens next.

I talk to my printer now. It talks back with pictures. This is a ridiculous way to make a plastic tower, and I would not go back.
