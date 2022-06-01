---
layout: page
title: Games
permalink: /games/
---

<div id="posts">
    {% for post in site.tags.games %}
        <div class="post">
            <a href="{{ post.url }}"><p class="title">{{ post.title }}</p>
                <img src="{{post.image}}" />
            </a>
 {{ post.excerpt | markdownify | strip_html | remove:'(Play Here)' | truncatewords: 50}} {% if
    post.content contains site.excerpt_separator %}

    <a href="{{ post.url }}">
      <p class="title">(read more...)</p>
    </a>
    {% endif %}
        </div>
    {% endfor %}

</div>
