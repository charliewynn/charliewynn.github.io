import Link from "next/link";
import { listPosts, formatDate } from "@/lib/content";

export const metadata = { title: "Journal — Charlie Wynn" };

export default function JournalIndex() {
  const posts = listPosts("journal");
  return (
    <div className="wrap">
      <section className="hero">
        <h1>Journal</h1>
        <p className="lede">Build notes and project writeups, newest first.</p>
      </section>
      <section>
        <ul className="entry-list">
          {posts.map((p) => (
            <li key={p.slug}>
              <span className="card-meta entry-date">{formatDate(p.date)}</span>
              <Link href={`/journal/${p.slug}`}>{p.title}</Link>
              {p.draft && <span className="badge-draft">Draft</span>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
