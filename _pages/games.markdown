---
layout: page
title: Games
permalink: /games/
---

<div id="games">
    {% for post in site.tags.games %}
        <div class="game">
            <a href="{{ post.url }}"><p class="title">{{ post.title }}</p>
                <img src="{{post.image}}" />
            </a>
            {{ post.excerpt | markdownify | strip_html | truncatewords: 50 }}
        </div>
    {% endfor %}
</div>
