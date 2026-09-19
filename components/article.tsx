import Link from "next/link";
import { getPost, formatDate, SHOW_DRAFTS } from "@/lib/content";
import { CopyPostIdButton } from "@/components/copy-post-id";

export function ArticlePage({
  section,
  slug,
  backHref,
  backLabel,
}: {
  section: string;
  slug: string;
  backHref: string;
  backLabel: string;
}) {
  const post = getPost(section, slug);
  if (!post) {
    return (
      <div className="wrap article">
        <h1>Not found</h1>
        <p>
          <Link href={backHref}>← {backLabel}</Link>
        </p>
      </div>
    );
  }
  return (
    <article className="article">
      <div className="prose-wrap">
        <Link href={backHref} className="back-link">
          ← {backLabel}
        </Link>
        <h1>{post.title}</h1>
        <div className="byline">
          {formatDate(post.date)}
          {post.draft && <span className="badge-draft">Draft</span>}
          {SHOW_DRAFTS && <CopyPostIdButton postId={`${section}/${slug}`} />}
        </div>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        {(post.repo || post.playUrl) && (
          <>
            <hr />
            <p>
              {post.playUrl && (
                <>
                  <a href={post.playUrl}>▶ Play it in your browser</a>
                  <br />
                </>
              )}
              {post.repo && <a href={post.repo}>Source code on GitHub →</a>}
            </p>
          </>
        )}
      </div>
    </article>
  );
}
