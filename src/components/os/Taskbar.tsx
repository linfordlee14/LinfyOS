"use client";

import { Clock } from "./Clock";
import { APPS, DESKTOP_ICON_ORDER } from "@/lib/apps";
import { useWindowManager } from "@/hooks/useWindowManager";
import { cn } from "@/lib/utils";
import { Wifi, Volume2, Power } from "lucide-react";
import { useState } from "react";
import { StartMenu } from "./StartMenu";

export function Taskbar() {
  const { windows, activeId, focus, restore, open } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);

  return (
    <>
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      <div className="fixed bottom-0 left-0 right-0 h-12 z-[9000] glass border-t border-os-cyan/15">
        <div className="h-full flex items-center px-3 gap-2">
          {/* Start button */}
          <button
            onClick={() => setStartOpen((v) => !v)}
            className={cn(
              "h-9 px-3 rounded-md flex items-center gap-2 transition-colors",
              "hover:bg-os-panel-hover/60 text-os-cyan font-mono text-sm",
              startOpen && "bg-os-panel-hover/60"
            )}
          >
            <span className="w-2 h-2 rounded-full bg-os-cyan shadow-[0_0_8px_#22d3ee]" />
            <span className="tracking-wider">LINFY</span>
          </button>

          <div className="w-px h-6 bg-os-border/60" />

          {/* Pinned + open windows */}
          <div className="flex-1 flex items-center gap-1 overflow-x-auto">
            {DESKTOP_ICON_ORDER.slice(0, 4).map((id) => {
              const app = APPS[id];
              const Icon = app.icon;
              const isOpen = windows.some((w) => w.appId === id);
              return (
                <button
                  key={id}
                  onClick={() => open(id)}
                  className={cn(
                    "h-9 w-9 rounded-md flex items-center justify-center transition-colors hover:bg-os-panel-hover/60",
                    isOpen && "bg-os-panel/80"
                  )}
                  title={app.title}
                >
                  <Icon className="w-4 h-4" style={{ color: app.color }} />
                </button>
              );
            })}

            <div className="w-px h-6 bg-os-border/60 mx-1" />

            {windows.map((w) => {
              const app = APPS[w.appId];
              const Icon = app.icon;
              const active = activeId === w.id && !w.minimized;
              return (
                <button
                  key={w.id}
                  onClick={() => (w.minimized ? restore(w.id) : focus(w.id))}
                  className={cn(
                    "h-9 px-2 rounded-md flex items-center gap-2 text-xs transition-colors",
                    "hover:bg-os-panel-hover/60 text-os-text",
                    active && "bg-os-panel/90 border-b-2 border-os-cyan"
                  )}
                  title={w.title}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: app.color }} />
                  <span className="hidden sm:inline">{w.title}</span>
                </button>
              );
            })}
          </div>

          {/* System tray */}
          <div className="flex items-center gap-3 text-os-text-muted px-2">
            <Wifi className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
            <Power className="w-4 h-4 text-os-red" />
            <Clock />
          </div>
        </div>
      </div>
    </>
  );
}
