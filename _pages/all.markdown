---
layout: page
title: All Posts
permalink: /all/
---

<div id="posts">
  {%- for post in site.posts -%}
  <article class="post-card">
    <a href="{{ post.url | relative_url }}">
      {%- if post.image -%}
      <img src="{{ post.image }}" alt="{{ post.title | escape }}">
      {%- endif -%}
      <h3>{{ post.title | escape }}</h3>
    </a>
    <footer>
      <small>{{ post.date | date: "%B %-d, %Y" }}</small>
      <a href="{{ post.url | relative_url }}">Read more &rarr;</a>
    </footer>
  </article>
  {%- endfor -%}
</div>
