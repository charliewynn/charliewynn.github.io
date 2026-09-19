import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Build-time flag: Amplify sets NEXT_PUBLIC_SHOW_DRAFTS=true on the staging
// branch only. Drafts render (with a badge) on staging; in prod they are
// filtered out before page generation, so their HTML is never built or
// deployed.
export const SHOW_DRAFTS = process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true";

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO
  tags: string[];
  image?: string;
  excerpt: string;
  repo?: string;
  playUrl?: string;
  featured?: boolean;
  draft: boolean;
}

export interface Post extends PostMeta {
  html: string;
}

function excerptOf(body: string): string {
  const cut = body.split("<!--more-->");
  const raw = (cut[0] ?? body)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/[#>*`\[\]!]/g, "")
    .replace(/\(.*?\)/g, "");
  const oneLine = raw.split("\n").map((l) => l.trim()).filter(Boolean).join(" ");
  return oneLine.length > 220 ? oneLine.slice(0, 217).trimEnd() + "…" : oneLine;
}

function readPost(section: string, file: string): Post {
  const slug = file.replace(/\.(md|markdown)$/, "");
  const full = path.join(CONTENT_DIR, section, file);
  const { data, content } = matter(fs.readFileSync(full, "utf8"));
  const tags: string[] = Array.isArray(data.tags) ? data.tags.map(String) : [];
  const html = marked.parse(content, { async: false }) as string;
  return {
    slug,
    title: String(data.title ?? slug),
    date: data.date ? new Date(data.date).toISOString() : "1970-01-01T00:00:00.000Z",
    tags,
    image: data.image ? String(data.image) : undefined,
    excerpt: data.excerpt ? String(data.excerpt) : excerptOf(content),
    repo: data.repo ? String(data.repo) : undefined,
    playUrl: data.playUrl ? String(data.playUrl) : undefined,
    featured: Boolean(data.featured ?? tags.includes("featured")),
    draft: Boolean(data.draft),
    html,
  };
}

export function listPosts(section: string): PostMeta[] {
  const dir = path.join(CONTENT_DIR, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(md|markdown)$/.test(f))
    .map((f) => {
      const { html, ...meta } = readPost(section, f);
      return meta;
    })
    .filter((p) => SHOW_DRAFTS || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(section: string, slug: string): Post | null {
  const dir = path.join(CONTENT_DIR, section);
  const file = fs.readdirSync(dir).find((f) => f.replace(/\.(md|markdown)$/, "") === slug);
  if (!file) return null;
  const post = readPost(section, file);
  if (post.draft && !SHOW_DRAFTS) return null;
  return post;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });
}
