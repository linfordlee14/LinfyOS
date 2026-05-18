"use client";

import { AnimatePresence } from "framer-motion";
import { APPS, DESKTOP_ICON_ORDER } from "@/lib/apps";
import { DesktopIcon } from "./DesktopIcon";
import { Taskbar } from "./Taskbar";
import { WindowFrame } from "./Window";
import { useWindowManager } from "@/hooks/useWindowManager";
import { TerminalApp } from "@/components/apps/TerminalApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { AboutApp } from "@/components/apps/AboutApp";
import { SkillsApp } from "@/components/apps/SkillsApp";
import { ExperienceApp } from "@/components/apps/ExperienceApp";
import { ContactApp } from "@/components/apps/ContactApp";
import { ResumeApp } from "@/components/apps/ResumeApp";
import { SettingsApp } from "@/components/apps/SettingsApp";
import { LinfyAI } from "@/components/apps/LinfyAI";
import type { WindowState } from "@/hooks/useWindowManager";

function renderApp(w: WindowState) {
  switch (w.appId) {
    case "terminal":
      return <TerminalApp initialArg={w.initialArg} />;
    case "projects":
      return <ProjectsApp initialArg={w.initialArg} />;
    case "about":
      return <AboutApp />;
    case "skills":
      return <SkillsApp />;
    case "experience":
      return <ExperienceApp />;
    case "contact":
      return <ContactApp />;
    case "resume":
      return <ResumeApp />;
    case "settings":
      return <SettingsApp />;
    case "linfy":
      return <LinfyAI />;
  }
}

export function Desktop() {
  const { windows } = useWindowManager();

  return (
    <div className="fixed inset-0 desktop-bg overflow-hidden">
      {/* Watermark */}
      <div className="absolute top-3 right-4 z-[1] font-mono text-[10px] uppercase tracking-widest text-os-cyan/40 select-none pointer-events-none">
        linfyos · v1.0 · 2026
      </div>

      {/* Desktop icon grid */}
      <div className="absolute top-6 left-6 z-[1]">
        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
          {DESKTOP_ICON_ORDER.map((id) => (
            <DesktopIcon key={id} app={APPS[id]} />
          ))}
        </div>
      </div>

      {/* Window layer */}
      <div className="absolute inset-0 pb-12">
        <AnimatePresence>
          {windows.map((w) => (
            <WindowFrame key={w.id} win={w}>
              {renderApp(w)}
            </WindowFrame>
          ))}
        </AnimatePresence>
      </div>

      <Taskbar />
    </div>
  );
}
