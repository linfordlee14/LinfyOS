"use client";

import { useEffect, useState } from "react";
import { skills } from "@/lib/data";

const COLORS: Record<string, string> = {
  "AI & LLM": "#22d3ee",
  Frontend: "#06b6d4",
  Backend: "#14b8a6",
  DevOps: "#10b981",
  Security: "#ef4444",
  Data: "#f59e0b",
};

export function SkillsApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto bg-os-desktop p-5">
      <div className="font-mono text-[11px] text-os-text-muted mb-3">
        $ ls -la /skills/
      </div>
      <div className="space-y-3">
        {skills.map((s) => {
          const color = COLORS[s.category] ?? "#06b6d4";
          return (
            <div key={s.category} className="rounded-md border border-os-border/50 bg-os-panel/40 p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                  />
                  <span className="text-sm font-medium text-os-text">{s.category}</span>
                </div>
                <div className="text-xs font-mono text-os-text-muted">
                  {s.level}%
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-os-panel/80 overflow-hidden">
                <div
                  className="h-full rounded-full transition-[width] duration-1000 ease-out"
                  style={{
                    width: mounted ? `${s.level}%` : "0%",
                    background: `linear-gradient(90deg, ${color}, ${color}88)`,
                    boxShadow: `0 0 12px ${color}`,
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {s.items.map((it) => (
                  <span
                    key={it}
                    className="px-2 py-0.5 text-[11px] rounded font-mono"
                    style={{
                      color,
                      background: `${color}15`,
                      border: `1px solid ${color}40`,
                    }}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
