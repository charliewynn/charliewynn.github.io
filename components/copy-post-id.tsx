"use client";
import { useState } from "react";

// Staging-only editorial chrome: copies the post's "section/slug" ID so
// Charlie can say "edit post <paste>" in chat.
export function CopyPostIdButton({ postId }: { postId: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(postId);
    } catch {
      // Fallback for non-secure contexts (plain http preview URLs).
      const ta = document.createElement("textarea");
      ta.value = postId;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      className="copy-id-btn"
      onClick={copy}
      title="Copy post ID (section/slug) for editing"
    >
      {copied ? "✓ Copied" : "⧉ Copy post ID"}
    </button>
  );
}
