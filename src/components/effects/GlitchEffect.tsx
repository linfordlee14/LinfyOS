"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/hooks/useSettings";

export function GlitchEffect() {
  const { settings } = useSettings();
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (settings.glitchFreq === "off") return;
    const intervals: Record<string, [number, number]> = {
      low: [40000, 80000],
      medium: [20000, 40000],
      high: [8000, 18000],
    };
    const [min, max] = intervals[settings.glitchFreq];

    function schedule() {
      const t = min + Math.random() * (max - min);
      return window.setTimeout(() => {
        setOn(true);
        setTimeout(() => setOn(false), 280);
        timer = schedule();
      }, t);
    }
    let timer = schedule();

    const onTrigger = () => {
      setOn(true);
      setTimeout(() => setOn(false), 280);
    };
    window.addEventListener("linfyos:glitch", onTrigger);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("linfyos:glitch", onTrigger);
    };
  }, [settings.glitchFreq]);

  if (!on) return null;
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9700] mix-blend-screen"
      style={{
        background:
          "linear-gradient(rgba(239,68,68,0.06), rgba(6,182,212,0.06))",
        animation: "glitch 0.28s steps(2, end)",
      }}
      aria-hidden
    />
  );
}
