---
layout: page
title: Tinkering
permalink: /tinkering/
---

<div id="posts">
    {%- for post in site.tags.tinkering -%}
        <div class="post">
            <a href="{{ post.url }}"><p class="title">{{ post.title }}</p>
                <img src="{{post.image}}" />
            </a>

            <div class="post-text">
                {{ post.excerpt | markdownify | strip_html | remove:'(Play Here)' |
                truncatewords: 50 | strip | append: postEllipis }}
            </div>
             {%- if
    post.content contains site.excerpt_separator -%}

    <a href="{{ post.url }}">
      <p class="title">(read more...)</p>
    </a>
    {%- endif -%}
        </div>
    {%- endfor -%}

</div>
