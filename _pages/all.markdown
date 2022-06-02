---
layout: default
title: All Posts
permalink: /all/
---

<div class="home">
  {%- if page.title -%}
    <h1 class="page-heading">{{ page.title }}</h1>
  {%- endif -%}

{%- if site.paginate -%}
{%- assign posts = paginator.posts -%}
{%- else -%}
{%- assign posts = site.posts -%}
{%- endif -%}

{%- if posts.size > 0 -%}
{%- if page.list_title -%}

<h2 class="post-list-heading">{{ page.list_title }}</h2>
{%- endif -%}

    <div id="posts">
    {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}

    {%- for post in posts -%}
        {%- if post.content contains site.excerpt_separator -%}
        {%- assign hasReadMore = true -%}
        {%- assign postEllipis = '..' -%} {%- endif -%}
        <div class="post">
            <a href="{{ post.url }}">
                <p class="title">{{ post.title }}</p>
                <img src="{{post.image}}" />
            </a>

            <div class="post-text">
                {{ post.excerpt | markdownify | strip_html | remove:'(Play Here)' |
                truncatewords: 50 | strip | append: postEllipis }}
            </div>

            {%- if hasReadMore -%}
                <a href="{{ post.url }}">
                    <p class="title">(read more...)</p>
                </a>
            {%- endif -%}

            <div class="post_date">{{ post.date | date: date_format }}</div>
        </div>
    {%- endfor -%}

</div>

    {%- if site.paginate -%}
      <div class="pager">
        <ul class="pagination">
        {%- if paginator.previous_page -%}
          <li><a href="{{ paginator.previous_page_path | relative_url }}" class="previous-page">{{ paginator.previous_page }}</a></li>
        {%- else -%}
          <li><div class="pager-edge">•</div></li>
        {%- endif -%}
          <li><div class="current-page">{{ paginator.page }}</div></li>
        {%- if paginator.next_page -%}
          <li><a href="{{ paginator.next_page_path | relative_url }}" class="next-page">{{ paginator.next_page }}</a></li>
        {%- else -%}
          <li><div class="pager-edge">•</div></li>
        {%- endif -%}
        </ul>
      </div>
    {%- endif -%}

{%- endif -%}

</div>
