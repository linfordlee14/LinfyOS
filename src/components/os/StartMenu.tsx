"use client";

import { motion } from "framer-motion";
import { APPS, DESKTOP_ICON_ORDER } from "@/lib/apps";
import { useWindowManager } from "@/hooks/useWindowManager";
import { personal } from "@/lib/data";

export function StartMenu({ onClose }: { onClose: () => void }) {
  const { open } = useWindowManager();
  return (
    <>
      <div className="fixed inset-0 z-[8900]" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18 }}
        className="fixed bottom-14 left-3 z-[9100] w-[340px] rounded-xl glass border-os-cyan/20 p-4 shadow-window"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full holo-ring p-[2px]">
            <div className="w-full h-full rounded-full bg-os-panel flex items-center justify-center text-os-cyan font-bold">
              L
            </div>
          </div>
          <div>
            <div className="text-sm text-os-text font-medium">
              {personal.name}
            </div>
            <div className="text-[11px] text-os-text-muted font-mono">
              {personal.handle}@{personal.hostname}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {DESKTOP_ICON_ORDER.map((id) => {
            const app = APPS[id];
            const Icon = app.icon;
            return (
              <button
                key={id}
                onClick={() => {
                  open(id);
                  onClose();
                }}
                className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-os-panel-hover/60 transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${app.color}22, ${app.color}08)`,
                    border: `1px solid ${app.color}44`,
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: app.color }} />
                </div>
                <span className="text-[10px] text-os-text/80">{app.title}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-os-border/40 text-[10px] text-os-text-muted font-mono">
          LinfyOS v1.0 · Build 2026.05.18
        </div>
      </motion.div>
    </>
  );
}
