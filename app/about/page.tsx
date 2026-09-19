export const metadata = { title: "About — Charlie Wynn" };

export default function About() {
  return (
    <div className="wrap article">
      <div className="prose-wrap">
        <h1>Hi, I&apos;m Charlie.</h1>
        <div className="prose">
          <p>
            I&apos;m a software developer, working remotely. I&apos;m married, I&apos;m
            in my mid-30s, and I spend a surprising amount of my free time
            fixing things that weren&apos;t quite broken enough to justify the
            effort — until they were.
          </p>
          <p>
            This site is where I keep the results: little web games built over the
            last fifteen years or so, microcontroller projects from around the
            house, 3D-printed parts, and the occasional essay. Some I did right,
            some I did quickly, some were just an idea I wanted to play with.
          </p>
          <p>
            Off the keyboard I&apos;m into disc golf, backgammon, rock climbing,
            philosophy, and tools — especially the fixing-things kind.
          </p>
          <h2>Elsewhere</h2>
          <ul>
            <li>
              <a href="https://github.com/charliewynn">GitHub</a> — most of the
              projects here have their source there.
            </li>
            <li>
              <a href="https://stackoverflow.com/users/773230/charlie-wynn">
                Stack Overflow
              </a>{" "}
              — where I&apos;ve answered questions since the early days.
            </li>
          </ul>
          <h2>Contact</h2>
          <p>
            The best way to reach me is <a href="mailto:charlie@cwynn.com">email</a>.
            I read everything.
          </p>
        </div>
      </div>
    </div>
  );
}
