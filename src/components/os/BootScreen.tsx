"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  { text: "BIOS Linford Systems v2.6 — Initializing...", delay: 400 },
  { text: "Memory check ... 32768MB OK", delay: 350 },
  { text: "NVMe SSD ............ OK", delay: 300 },
  { text: "GPU: Neural Cortex v4 ... OK", delay: 250 },
  { text: "Loading kernel ........ /linfy/core", delay: 350 },
  { text: "Initializing AI modules ... Gemini · Groq · RAG", delay: 400 },
  { text: "Mounting portfolio filesystem ... /home/linford", delay: 300 },
  { text: "Starting LinfyOS v1.0 ..." , delay: 300 },
];

const HEX_LINES = Array.from({ length: 16 }).map(() =>
  Array.from({ length: 8 })
    .map(() => Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0"))
    .join(" ")
);

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let acc = 0;

    LINES.forEach((line, i) => {
      acc += line.delay;
      setTimeout(() => {
        if (cancelled) return;
        setShown((s) => Math.max(s, i + 1));
      }, acc);
    });

    const totalText = acc;
    const start = performance.now();
    const dur = totalText + 600;

    let raf = 0;
    const tick = () => {
      const t = performance.now() - start;
      const p = Math.min(100, (t / dur) * 100);
      setProgress(p);
      if (p < 100 && !cancelled) raf = requestAnimationFrame(tick);
      else if (!cancelled) setTimeout(onDone, 400);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black text-os-green font-mono"
    >
      {/* Decorative hex dump in background */}
      <div className="absolute inset-0 overflow-hidden opacity-10 select-none pointer-events-none">
        <div className="animate-[scanline_12s_linear_infinite] text-[10px] leading-tight whitespace-pre">
          {HEX_LINES.concat(HEX_LINES).concat(HEX_LINES).map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-[min(720px,92vw)] text-sm md:text-base term-glow">
        <pre className="text-os-cyan mb-4 text-xs md:text-sm">
{`   __    _        ____      ____  ____
  / /   (_)___   / __/_  __/ __ \\/ __/
 / /   / / __ \\ / /_/ / / / / / /\\__ \\
/ /___/ / / / // __/ /_/ / /_/ /___/ /
\\____/_/_/ /_//_/  \\__, /\\____/_____/
                  /____/
  L i n f y O S   v 1 . 0`}
        </pre>

        <div className="space-y-1">
          {LINES.slice(0, shown).map((l, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-os-cyan">[ {(i + 1).toString().padStart(2, "0")} ]</span>
              <span>{l.text}</span>
              <span className="text-os-green">OK</span>
            </div>
          ))}
          {shown < LINES.length && (
            <div className="flex gap-2 text-os-text-muted">
              <span className="text-os-cyan">[ {(shown + 1).toString().padStart(2, "0")} ]</span>
              <span className="cursor-block">{LINES[shown].text.slice(0, 12)}</span>
            </div>
          )}
        </div>

        <div className="mt-8">
          <div className="flex justify-between text-xs text-os-cyan mb-2">
            <span>BOOT PROGRESS</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="h-2 bg-os-panel/60 rounded-sm overflow-hidden border border-os-cyan/30">
            <div
              className="h-full bg-gradient-to-r from-os-cyan via-os-cyan-glow to-os-teal"
              style={{ width: `${progress}%`, transition: "width 80ms linear" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
