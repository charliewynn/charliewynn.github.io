import { listPosts } from "@/lib/content";
import { ArticlePage } from "@/components/article";

export async function generateStaticParams() {
  return listPosts("projects").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { getPost } = await import("@/lib/content");
  const post = getPost("projects", slug);
  return { title: post ? `${post.title} — Charlie Wynn` : "Not found" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticlePage section="projects" slug={slug} backHref="/projects" backLabel="Projects" />;
}
