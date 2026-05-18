"use client";

import { useEffect, useState } from "react";

type Pulse = { id: number; x: number; y: number };

export function GlowCursor() {
  const [pulses, setPulses] = useState<Pulse[]>([]);

  useEffect(() => {
    let id = 0;
    function onClick(e: MouseEvent) {
      const p = { id: ++id, x: e.clientX, y: e.clientY };
      setPulses((cur) => [...cur, p]);
      setTimeout(() => {
        setPulses((cur) => cur.filter((q) => q.id !== p.id));
      }, 600);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9500]">
      {pulses.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x - 12,
            top: p.y - 12,
            width: 24,
            height: 24,
            background:
              "radial-gradient(circle, rgba(34,211,238,0.6), rgba(34,211,238,0) 70%)",
            animation: "pulseOut 600ms ease-out forwards",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes pulseOut {
          0% { transform: scale(0.4); opacity: 1; }
          100% { transform: scale(3.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
