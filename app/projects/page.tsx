import { listPosts } from "@/lib/content";
import { CardGrid, SectionHead } from "@/components/cards";

export const metadata = { title: "Projects — Charlie Wynn" };

export default function ProjectsIndex() {
  const posts = listPosts("projects");
  return (
    <div className="wrap">
      <section className="hero">
        <h1>Projects</h1>
        <p className="lede">
          Fixes and builds from around the house — microcontrollers, sensors, and
          3D-printed parts. Each one solved a real problem, more or less.
        </p>
      </section>
      <section>
        <SectionHead title={`All projects (${posts.length})`} />
        <CardGrid posts={posts} hrefFor={(p) => `/projects/${p.slug}`} />
      </section>
    </div>
  );
}
