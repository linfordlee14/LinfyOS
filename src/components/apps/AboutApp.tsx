"use client";

import { useEffect, useState } from "react";
import { personal } from "@/lib/data";
import { useWindowManager } from "@/hooks/useWindowManager";
import { Download, MapPin, Mail } from "lucide-react";

function useCounter(target: number, durationMs = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / durationMs);
      setV(Math.floor(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return v;
}

export function AboutApp() {
  const { open } = useWindowManager();
  const proj = useCounter(personal.stats.projectsShipped);
  const hack = useCounter(personal.stats.hackathons);
  const yrs = useCounter(personal.stats.yearsCoding);
  const com = useCounter(personal.stats.communitiesServed);

  return (
    <div className="w-full h-full overflow-y-auto bg-os-desktop">
      <div className="p-6 grid md:grid-cols-[180px_1fr] gap-6">
        {/* Holographic photo placeholder */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-36 h-36 rounded-full holo-ring p-[3px]">
            <div className="w-full h-full rounded-full bg-os-panel flex items-center justify-center text-4xl font-bold text-os-cyan term-glow">
              LM
            </div>
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: "inset 0 0 30px rgba(34,211,238,0.3)",
              }}
            />
          </div>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-widest text-os-cyan font-mono">
              identity
            </div>
            <div className="text-sm text-os-text font-medium">{personal.name}</div>
            <div className="text-[11px] text-os-text-muted">{personal.handle}@{personal.hostname}</div>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-semibold text-os-text">{personal.headline}</h1>
          <p className="text-sm text-os-text-muted mt-1">{personal.subheadline}</p>

          <div className="flex flex-wrap gap-3 mt-3 text-xs text-os-text-muted">
            <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {personal.location}</span>
            <a className="inline-flex items-center gap-1 hover:text-os-cyan" href={`mailto:${personal.email}`}><Mail className="w-3 h-3" /> {personal.email}</a>
          </div>

          <div className="mt-4 space-y-3 text-sm leading-relaxed text-os-text/90">
            {personal.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { label: "Projects shipped", value: proj },
              { label: "Hackathons", value: hack },
              { label: "Years coding", value: yrs },
              { label: "Communities", value: com },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-md border border-os-cyan/25 bg-os-panel/40 p-3"
              >
                <div className="text-2xl font-bold text-os-cyan term-glow tabular-nums">
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-os-text-muted mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => open("resume")}
            className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-os-cyan/15 hover:bg-os-cyan/25 text-os-cyan border border-os-cyan/40 transition-colors"
          >
            <Download className="w-4 h-4" /> Open resume
          </button>
        </div>
      </div>
    </div>
  );
}
