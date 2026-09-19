import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Charlie Wynn — tinkerer",
  description:
    "Charlie Wynn builds things: microcontroller projects around the house, little web games, 3D-printed fixes, and the occasional essay.",
};

const NAV = [
  { href: "/projects", label: "Projects" },
  { href: "/games", label: "Games" },
  { href: "/workshop", label: "Workshop" },
  { href: "/journal", label: "Journal" },
  { href: "/essays", label: "Essays" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>
        <header className="site-header">
          <div className="wrap">
            <Link href="/" className="brand">
              cwynn
            </Link>
            <nav className="nav" aria-label="Primary">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <span>© {new Date().getFullYear()} Charlie Wynn · Oklahoma</span>
            <ul className="elsewhere">
              <li>
                <a href="https://github.com/charliewynn">GitHub</a>
              </li>
              <li>
                <a href="https://stackoverflow.com/users/773230/charlie-wynn">Stack Overflow</a>
              </li>
              <li>
                <a href="mailto:charlie@cwynn.com">Email</a>
              </li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
