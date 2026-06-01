Restart the Jekyll dev server: kill any running instance, then start a fresh one.

```bash
pkill -f "jekyll serve" 2>/dev/null; sleep 1; /opt/homebrew/opt/ruby/bin/bundle exec jekyll serve --detach
```

Run the command above, then confirm the server is back up at http://localhost:4000