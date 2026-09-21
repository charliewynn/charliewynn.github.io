"use client";

import { usePathname } from "next/navigation";

// Remounts (and replays) the wire-build GIF on every SPA navigation.
export default function BrandMark() {
  const pathname = usePathname();
  return (
    <img
      key={pathname}
      src="/ctw-mark.gif"
      alt=""
      aria-hidden="true"
      className="brand-mark"
      width={34}
      height={34}
    />
  );
}
