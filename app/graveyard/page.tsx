import Link from "next/link";
import { notFound } from "next/navigation";
import { listArchived, formatDate, SHOW_DRAFTS } from "@/lib/content";

export const dynamic = "force-static";

export const metadata = { title: "Graveyard — Charlie Wynn" };

const SECTIONS = [
  { dir: "projects", label: "Projects" },
  { dir: "games", label: "Games" },
  { dir: "journal", label: "Journal" },
  { dir: "essays", label: "Essays" },
];

// Staging-only: retired posts. Delisted everywhere else; still readable here.
export default function GraveyardPage() {
  if (!SHOW_DRAFTS) notFound();
  const groups = SECTIONS.map((s) => ({
    ...s,
    posts: listArchived(s.dir),
  })).filter((g) => g.posts.length > 0);
  const total = groups.reduce((n, g) => n + g.posts.length, 0);

  return (
    <div className="wrap">
      <section className="hero">
        <h1>Graveyard</h1>
        <p className="lede">
          Retired posts. Gone from the rest of the site
          {total > 0 ? ` — ${total} buried here.` : " — nothing buried yet."}
        </p>
      </section>
      {groups.map((g) => (
        <section key={g.dir}>
          <h2>
            {g.label} ({g.posts.length})
          </h2>
          <ul className="entry-list">
            {g.posts.map((p) => (
              <li key={p.slug}>
                <span className="card-meta entry-date">{formatDate(p.date)}</span>
                <Link href={`/${g.dir}/${p.slug}`}>{p.title}</Link>
                <span className="badge-archived">Archived</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
