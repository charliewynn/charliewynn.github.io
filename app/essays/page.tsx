import Link from "next/link";
import { listPosts, formatDate } from "@/lib/content";

export const metadata = { title: "Essays — Charlie Wynn" };

export default function EssaysIndex() {
  const posts = listPosts("essays");
  return (
    <div className="wrap">
      <section className="hero">
        <h1>Essays</h1>
        <p className="lede">
          Longer pieces — explanations of things I&apos;ve thought a lot about,
          written the way I&apos;d explain them over coffee.
        </p>
      </section>
      <section>
        {posts.length === 0 ? (
          <div className="empty">
            <h3>First essay on the way</h3>
            <p>
              An early-retirement math manifesto is in the works — one more
              explanation of the 4% rule, in case the other five hundred
              didn&apos;t quite land.
            </p>
          </div>
        ) : (
          <ul className="entry-list">
            {posts.map((p) => (
              <li key={p.slug}>
                <span className="card-meta entry-date">{formatDate(p.date)}</span>
                <Link href={`/essays/${p.slug}`}>{p.title}</Link>
                {p.draft && <span className="badge-draft">Draft</span>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
