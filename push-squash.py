#!/usr/bin/env python3
"""One-time squash: rebuild refs/heads/staging as a single commit on top of
master, containing exactly the current working tree. Reuses blob SHAs from the
existing remote staging tree when file content matches, so images etc. are not
re-uploaded. After this, staging is a normal descendant of master and future
merges/PRs are clean."""
from __future__ import annotations

import base64
import concurrent.futures as cf
import json
import os
import subprocess
import sys
import urllib.request
import urllib.error

sys.path.insert(0, "/opt/hatch/skills/skill-creator/bin")
from dynamic_credentials import add_surrogate_to_request, read_response_body

API = "https://api.github.com"
REPO = "charliewynn/charliewynn.github.io"
ALLOWED = ("api.github.com",)
WORKDIR = os.path.expanduser("~/workspace/cwynn-new")

def api(method: str, path: str, payload: dict | None = None) -> dict:
    url = API + path
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(
        url, data=data, method=method,
        headers={"Accept": "application/vnd.github+json",
                 "User-Agent": "muse-agent",
                 "Content-Type": "application/json"},
    )
    add_surrogate_to_request(req, "custom.github", allowed_hosts=ALLOWED)
    try:
        resp = urllib.request.urlopen(req, timeout=120)
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")[:1500]
        raise RuntimeError(f"GitHub API {exc.code} {method} {path}\n{body}")
    raw = read_response_body(resp).decode("utf-8")
    return json.loads(raw) if raw.strip() else {}

def sh(*args: str) -> str:
    return subprocess.run(args, cwd=WORKDIR, capture_output=True,
                          check=True, text=True).stdout.strip()

def main() -> int:
    master = api("GET", f"/repos/{REPO}/git/ref/heads/master")["object"]["sha"]
    print("master:", master[:12], flush=True)

    # current staging tree -> path -> blob sha (for reuse)
    ref = api("GET", f"/repos/{REPO}/git/ref/heads/staging")
    old_commit = ref["object"]["sha"]
    old_tree_sha = api("GET", f"/repos/{REPO}/git/commits/{old_commit}")["tree"]["sha"]
    old_tree = api("GET", f"/repos/{REPO}/git/trees/{old_tree_sha}?recursive=1")
    old_blobs = {e["path"]: e["sha"] for e in old_tree["tree"] if e["type"] == "blob"}

    files = [p for p in sh("git", "ls-files").split("\n") if p]
    proc = subprocess.run(["git", "hash-object"] + files, cwd=WORKDIR,
                          capture_output=True, check=True, text=True)
    local = dict(zip(files, proc.stdout.strip().split("\n")))

    # which files need new blobs: content sha differs from the old tree's blob
    # (blob sha == hash-object sha when content matches)
    need_upload = [f for f in files if local[f] != old_blobs.get(f)]
    print(f"files: {len(files)}, reuse blobs: {len(files)-len(need_upload)}, "
          f"upload: {len(need_upload)}", flush=True)

    def make_blob(rel: str) -> tuple[str, str]:
        with open(os.path.join(WORKDIR, rel), "rb") as fh:
            content = base64.b64encode(fh.read()).decode()
        r = api("POST", f"/repos/{REPO}/git/blobs",
                {"content": content, "encoding": "base64"})
        return rel, r["sha"]

    blob_shas: dict[str, str] = {}
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for rel, sha in ex.map(make_blob, need_upload):
            blob_shas[rel] = sha
            if len(blob_shas) % 25 == 0:
                print(f"  blobs {len(blob_shas)}/{len(need_upload)}", flush=True)
    print("blobs done", flush=True)

    entries = [{"path": f, "mode": "100644", "type": "blob",
                "sha": blob_shas[f] if f in blob_shas else old_blobs[f]}
               for f in files]
    tr = api("POST", f"/repos/{REPO}/git/trees", {"tree": entries})
    print("tree:", tr["sha"], flush=True)
    cm = api("POST", f"/repos/{REPO}/git/commits", {
        "message": "Rebuild cwynn.com as a static Next.js site",
        "tree": tr["sha"],
        "parents": [master],
        "author": {"name": "Charlie Wynn", "email": "charlie@cwynn.com"},
    })
    print("commit:", cm["sha"], flush=True)
    api("PATCH", f"/repos/{REPO}/git/refs/heads/staging", {"sha": cm["sha"]})
    print("staging updated ->", cm["sha"], flush=True)
    return 0

if __name__ == "__main__":
    sys.exit(main())
