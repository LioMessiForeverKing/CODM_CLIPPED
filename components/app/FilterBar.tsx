"use client";

import { CATEGORY_LABELS, PLAYSTYLE_LABELS, type WeaponCategory, type Playstyle } from "@/lib/config";

interface FilterBarProps {
  activeCategory: WeaponCategory | null;
  activePlatstyle: Playstyle | null;
  activeSort: "top" | "newest";
  onCategoryChange: (category: WeaponCategory | null) => void;
  onPlaystyleChange: (playstyle: Playstyle | null) => void;
  onSortChange: (sort: "top" | "newest") => void;
}

export function FilterBar({
  activeCategory,
  activePlatstyle,
  activeSort,
  onCategoryChange,
  onPlaystyleChange,
  onSortChange,
}: FilterBarProps) {
  const categories: (WeaponCategory | null)[] = [
    null,
    "assault_rifle",
    "smg",
    "sniper",
    "lmg",
    "shotgun",
    "marksman",
  ];

  const playstyles: (Playstyle | null)[] = [
    null,
    "aggressive",
    "long-range",
    "support",
    "balanced",
  ];

  return (
    <div className="max-w-content mx-auto">
      {/* Category tabs + sort toggle */}
      <div className="flex items-center justify-between border-b border-border px-6">
        <div className="flex overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat ?? "all"}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                activeCategory === cat
                  ? "text-accent border-accent bg-accent/[0.08]"
                  : "text-dim border-transparent hover:text-muted"
              }`}
            >
              {cat ? CATEGORY_LABELS[cat] : "All"}
            </button>
          ))}
        </div>

        {/* Sort toggle */}
        <div className="flex items-center gap-1 ml-4 shrink-0">
          {(["top", "newest"] as const).map((sort) => (
            <button
              key={sort}
              onClick={() => onSortChange(sort)}
              className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors ${
                activeSort === sort
                  ? "text-accent bg-accent/[0.08]"
                  : "text-dim hover:text-muted"
              }`}
            >
              {sort === "top" ? "Top" : "New"}
            </button>
          ))}
        </div>
      </div>

      {/* Playstyle filters */}
      <div className="flex gap-2 px-6 py-3">
        {playstyles.map((ps) => (
          <button
            key={ps ?? "all"}
            onClick={() => onPlaystyleChange(ps)}
            className={`px-3 py-1 text-[11px] border rounded-sm transition-colors ${
              activePlatstyle === ps
                ? "text-accent border-accent/30 bg-accent/[0.05]"
                : "text-muted border-surface-2 bg-surface-1 hover:border-border"
            }`}
          >
            {ps ? PLAYSTYLE_LABELS[ps] : "All Styles"}
          </button>
        ))}
      </div>
    </div>
  );
}
