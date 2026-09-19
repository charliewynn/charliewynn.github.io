import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/content";

export function Card({ post, href }: { post: PostMeta; href: string }) {
  return (
    <li className="card">
      {post.image && (
        <Link href={href} aria-label={post.title}>
          <img src={post.image} alt="" loading="lazy" />
        </Link>
      )}
      <div className="card-body">
        <div className="card-meta">
          {formatDate(post.date)}
          {post.draft && <span className="badge-draft">Draft</span>}
        </div>
        <h3>
          <Link href={href}>{post.title}</Link>
        </h3>
        <p className="card-blurb">{post.excerpt}</p>
        {(post.repo || post.playUrl) && (
          <div className="tag-row">
            {post.playUrl && (
              <a className="tag" href={post.playUrl}>
                ▶ Play it
              </a>
            )}
            {post.repo && (
              <a className="tag" href={post.repo}>
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export function CardGrid({
  posts,
  hrefFor,
}: {
  posts: PostMeta[];
  hrefFor: (p: PostMeta) => string;
}) {
  return (
    <ul className="card-grid">
      {posts.map((p) => (
        <Card key={p.slug} post={p} href={hrefFor(p)} />
      ))}
    </ul>
  );
}

export function SectionHead({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {href && <Link href={href}>{linkLabel ?? "View all →"}</Link>}
    </div>
  );
}
