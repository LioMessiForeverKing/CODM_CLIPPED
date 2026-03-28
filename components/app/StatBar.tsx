"use client";

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  delay?: number;
}

export function StatBar({ label, value, maxValue = 100, delay = 0 }: StatBarProps) {
  const pct = Math.min(100, Math.max(0, (value / maxValue) * 100));

  return (
    <div className="flex items-center gap-0 mb-1.5">
      <span className="w-[72px] text-right pr-2.5 font-data text-stat text-muted uppercase tracking-wider">
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-[1px] overflow-hidden">
        <div
          className="h-full bg-accent rounded-[1px] animate-stat-fill"
          style={{ width: `${pct}%`, animationDelay: `${delay}ms` }}
        />
      </div>
      <span className="w-8 text-right font-data text-[10px] text-dim pl-2">
        {value}
      </span>
    </div>
  );
}

interface WeaponStatsProps {
  stats: {
    damage: number;
    range: number;
    fireRate: number;
    accuracy: number;
    mobility: number;
    control: number;
  };
}

export function WeaponStats({ stats }: WeaponStatsProps) {
  const entries = [
    { label: "Damage", value: stats.damage },
    { label: "Range", value: stats.range },
    { label: "Fire Rate", value: stats.fireRate },
    { label: "Accuracy", value: stats.accuracy },
    { label: "Mobility", value: stats.mobility },
    { label: "Control", value: stats.control },
  ];

  return (
    <div className="py-3">
      {entries.map((entry, i) => (
        <StatBar key={entry.label} label={entry.label} value={entry.value} delay={i * 50} />
      ))}
    </div>
  );
}
