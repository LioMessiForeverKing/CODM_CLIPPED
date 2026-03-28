"use client";

import Link from "next/link";

export function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-border sticky top-0 bg-bg z-50">
      <Link href="/" className="font-display text-2xl font-extrabold tracking-[3px] uppercase">
        CLIP<span className="text-accent">P</span>ED
      </Link>
      <div className="flex items-center gap-3">
        <Link
          href="/requests"
          className="text-muted hover:text-white text-[12px] font-display uppercase tracking-wider transition-colors hidden sm:inline"
        >
          Request a Gun
        </Link>
        <Link
          href="/build"
          className="bg-accent hover:bg-accent-hover text-black font-display font-bold text-[13px] uppercase tracking-wider px-5 py-2 rounded-sm transition-colors"
        >
          <span className="hidden sm:inline">+ Submit Loadout</span>
          <span className="sm:hidden text-lg leading-none">+</span>
        </Link>
      </div>
    </nav>
  );
}
