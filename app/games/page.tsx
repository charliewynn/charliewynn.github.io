import { listPosts } from "@/lib/content";
import { CardGrid, SectionHead } from "@/components/cards";

export const metadata = { title: "Games — Charlie Wynn" };

export default function GamesIndex() {
  const posts = listPosts("games");
  return (
    <div className="wrap">
      <section className="hero">
        <h1>Games</h1>
        <p className="lede">
          Little web games built over the years. Not serious game development —
          just a nice way to get ideas in front of people.
        </p>
      </section>
      <section>
        <SectionHead title={`All games (${posts.length})`} />
        <CardGrid posts={posts} hrefFor={(p) => `/games/${p.slug}`} />
      </section>
    </div>
  );
}
