"use client";

import { useEffect, useState } from "react";

export function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) {
    return <div className="font-mono text-xs text-os-text/80 tabular-nums">--:--</div>;
  }
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="text-right leading-tight font-mono tabular-nums">
      <div className="text-sm text-os-text">{time}</div>
      <div className="text-[10px] text-os-text-muted">{date}</div>
    </div>
  );
}
