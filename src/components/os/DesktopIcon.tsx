"use client";

import { motion } from "framer-motion";
import type { AppDefinition } from "@/lib/apps";
import { useWindowManager } from "@/hooks/useWindowManager";

export function DesktopIcon({ app }: { app: AppDefinition }) {
  const { open } = useWindowManager();
  const Icon = app.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      onDoubleClick={() => open(app.id)}
      onClick={() => open(app.id)}
      className="group flex flex-col items-center gap-1.5 w-[88px] rounded-lg p-2 outline-none focus-visible:ring-2 focus-visible:ring-os-cyan/60"
    >
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all"
        style={{
          background: `linear-gradient(135deg, ${app.color}22, ${app.color}08)`,
          border: `1px solid ${app.color}55`,
          boxShadow: `0 0 0 0 ${app.color}00`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color: app.color }} />
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ boxShadow: `0 0 24px ${app.color}80` }}
        />
      </div>
      <span className="text-[11px] leading-tight text-center text-os-text/90 group-hover:text-white group-hover:term-glow max-w-[88px] line-clamp-2">
        {app.title}
      </span>
    </motion.button>
  );
}
