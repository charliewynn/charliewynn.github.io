import { listPosts } from "@/lib/content";
import { ArticlePage } from "@/components/article";

export async function generateStaticParams() {
  return listPosts("journal").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { getPost } = await import("@/lib/content");
  const post = getPost("journal", slug);
  return { title: post ? `${post.title} — Charlie Wynn` : "Not found" };
}

export default async function JournalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticlePage section="journal" slug={slug} backHref="/journal" backLabel="Journal" />;
}
