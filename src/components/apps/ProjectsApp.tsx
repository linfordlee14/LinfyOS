"use client";

import { useEffect, useState } from "react";
import { projects, type Project } from "@/lib/data";
import { ExternalLink, Github, Terminal as TerminalIcon, Folder } from "lucide-react";
import { useWindowManager } from "@/hooks/useWindowManager";
import { cn } from "@/lib/utils";

export function ProjectsApp({ initialArg }: { initialArg?: string }) {
  const [selected, setSelected] = useState<Project>(
    projects.find((p) => p.id === initialArg) ?? projects[0]
  );
  const { open } = useWindowManager();

  useEffect(() => {
    if (initialArg) {
      const p = projects.find((x) => x.id === initialArg);
      if (p) setSelected(p);
    }
  }, [initialArg]);

  return (
    <div className="w-full h-full flex bg-os-desktop text-os-text">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-os-border/60 bg-os-panel/60 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-os-text-muted font-mono border-b border-os-border/40">
          /projects
        </div>
        <ul>
          {projects.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => setSelected(p)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors hover:bg-os-panel-hover/60",
                  selected.id === p.id &&
                    "bg-os-panel-hover/80 border-l-2 border-os-cyan"
                )}
              >
                <Folder
                  className="w-3.5 h-3.5"
                  style={{ color: p.featured ? "#22d3ee" : "#94a3b8" }}
                />
                <div className="min-w-0">
                  <div className="truncate text-os-text">{p.title}</div>
                  <div className="truncate text-[10px] text-os-text-muted font-mono">
                    {p.id}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="relative h-44 bg-gradient-to-br from-os-cyan/15 via-os-teal/10 to-transparent border-b border-os-border/40 flex items-end p-5">
          <div>
            <div className="text-[10px] font-mono text-os-cyan uppercase tracking-widest">
              {selected.status} · {selected.featured ? "Featured" : "Build"}
            </div>
            <h1 className="text-2xl font-semibold text-os-text mt-1">
              {selected.title}
            </h1>
            <p className="text-os-text-muted text-sm mt-1">{selected.tagline}</p>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <p className="text-sm leading-relaxed text-os-text/90">
            {selected.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {selected.stack.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 text-[11px] rounded border border-os-cyan/40 bg-os-cyan/10 text-os-cyan-glow font-mono"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {selected.liveUrl !== "#" && (
              <a
                href={selected.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-os-cyan/20 hover:bg-os-cyan/30 text-os-cyan border border-os-cyan/40 transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Live demo
              </a>
            )}
            <a
              href={selected.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-os-panel hover:bg-os-panel-hover text-os-text border border-os-border transition-colors"
            >
              <Github className="w-4 h-4" /> Source
            </a>
            <button
              onClick={() => open("terminal", selected.id)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-os-green/15 hover:bg-os-green/25 text-os-green border border-os-green/40 transition-colors"
            >
              <TerminalIcon className="w-4 h-4" /> Open in Terminal
            </button>
          </div>

          <div className="mt-6 rounded-md border border-os-border/50 bg-black/40 p-3 font-mono text-xs text-os-text-muted">
            <div className="text-os-cyan mb-1">$ cat metadata.json</div>
            <div className="space-y-0.5">
              <div>id: <span className="text-os-text">{selected.id}</span></div>
              <div>status: <span className="text-os-green">{selected.status}</span></div>
              <div>featured: <span className="text-os-yellow">{String(selected.featured)}</span></div>
              <div>repo: <span className="text-os-cyan">{selected.repoUrl}</span></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
