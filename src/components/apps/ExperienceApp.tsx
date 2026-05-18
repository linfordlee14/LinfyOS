"use client";

import { experience, certifications } from "@/lib/data";
import { Briefcase, Award } from "lucide-react";

export function ExperienceApp() {
  return (
    <div className="w-full h-full overflow-y-auto bg-os-desktop p-5">
      <div className="font-mono text-[11px] text-os-text-muted mb-3">
        $ git log --career
      </div>

      <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-os-cyan/30">
        {experience.map((e, i) => (
          <div key={i} className="relative">
            <div
              className="absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full bg-os-cyan"
              style={{ boxShadow: "0 0 12px #22d3ee" }}
            />
            <div className="text-[10px] font-mono uppercase tracking-widest text-os-cyan">
              {e.period}
            </div>
            <div className="text-sm font-medium text-os-text mt-0.5 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-os-teal" />
              {e.role} · <span className="text-os-text-muted font-normal">{e.company}</span>
            </div>
            <p className="text-xs text-os-text/80 mt-1 leading-relaxed">
              {e.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="font-mono text-[11px] text-os-text-muted mb-2">
          $ cat /etc/certifications
        </div>
        <ul className="space-y-1.5">
          {certifications.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2 text-sm text-os-text/90"
            >
              <Award className="w-3.5 h-3.5 text-os-yellow" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
