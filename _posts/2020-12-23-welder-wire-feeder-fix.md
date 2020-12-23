---
layout: post
title:  "Welder wire feeder fix"
date:   2020-12-23 20:33:16 -0600
categories: welding soldering fix
---

My cheap Craigslist welder broke.  ![Craigslist Welder](../assets/welder/photo-1.jpeg)

Specifically the wire feed circuit blew.
![Wire Feed Circuit Board](../assets/welder/photo-7.jpeg)

The fuse blew as well as one of the traces on the board. Here I replaced one of the traces but as I replaced traces others blew.
![Replaced Trace](../assets/welder/photo-8.jpeg)

Unfortunately the welder is too cheap to be worth spending time and money to fix it properly. The welder I was about to buy as a replacement is $600. So it *is* worth the time to try to get a stop-gap fix is place.

---

After some testing it seems the button in the welder handle is working. The motor for the feed mechanism also appears to be working.

Luckily the motor had some specs printed on it. ![Wire feed motor](../assets/welder/photo-12.jpeg)

I found a 12v wall adapter in the trash and decided to give it a shot. ![Wall adapter](../assets/welder/photo-13.jpeg) I was fairly sure the motor wouldn't draw more than 750mA and decided to risk it.

The original circuit design on the motor is relatively simple. ![Original Welding Circuit](../assets/welder/photo.png)

Modifying to use my own power adapter was easy. I disconnected the handle's button from the circuit board and wired it to adapter. I desoldered the motor and wired it into the switch and adapter.
![New Welding Circuit](../assets/welder/photo-2.png)

This unfortunately leaves out the wire speed potentiometer. The circuit board had a potentiometer to change the wire speed from 0 to 10. I originally wired in my circuit, but it didn't work very well (0-7 and the wire did nothing. 8-9 and the wire moved slower but the potentiometer was smoking, 10 and it worked fine)

I assume the wire speed was controlled through some type of PWM controlled in the circuit board. Not a direct resistance potentiometer. I took it out of my circuit.

I screwed the adapter to the welder case. ![Power Adapter in Case](../assets/welder/photo-11.jpeg)
The case is ready to reassemble. ![Case open](../assets/welder/photo-10.jpeg)

--

The final solution is far from ideal. I lost wire speed control. Fortunately my welding needs are very basic and I hope to survive on this welder for a few years.


