---
name: check-post
description: Fetch the rendered HTML of the local pocket-counter page. Use when you need to load or inspect the HTML of a typical post so it can be analyzed.
---

# check-post

Curl the local pocket-counter page and return its HTML for analysis.

## Steps

1. Make sure the Jekyll dev server is running (use the /serve skill if it isn't).
2. Fetch the page HTML:

   ```bash
   curl -s http://127.0.0.1:4000/pocket-counter/
   ```

3. Analyze the html for anything amiss
