import { listPosts } from "@/lib/content";
import { CardGrid, SectionHead } from "@/components/cards";

export default function Home() {
  const projects = listPosts("projects");
  const games = listPosts("games");
  const journal = listPosts("journal");
  const featured = [...projects, ...games].filter((p) => p.featured).slice(0, 6);

  return (
    <div className="wrap">
      <section className="hero">
        <span className="kicker">Personal site of</span>
        <h1>Charlie Wynn</h1>
        <p className="lede">
          I build things — microcontroller fixes around the house, little web games,
          3D-printed problem-solvers. Some projects I do
          right, some I do quickly, some are just an idea I wanted to play with.
        </p>
      </section>

      {featured.length > 0 && (
        <section>
          <SectionHead title="Featured builds" href="/projects" linkLabel="All projects →" />
          <CardGrid posts={featured} hrefFor={(p) => `/projects/${p.slug}`} />
        </section>
      )}

      {games.length > 0 && (
        <section>
          <SectionHead title="Games" href="/games" linkLabel="All games →" />
          <CardGrid posts={games.slice(0, 3)} hrefFor={(p) => `/games/${p.slug}`} />
        </section>
      )}

      {journal.length > 0 && (
        <section>
          <SectionHead title="From the journal" href="/journal" linkLabel="All entries →" />
          <CardGrid posts={journal.slice(0, 3)} hrefFor={(p) => `/journal/${p.slug}`} />
        </section>
      )}
    </div>
  );
}
