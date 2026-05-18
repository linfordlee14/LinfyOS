"use client";

export function Scanlines({ active }: { active: boolean }) {
  if (!active) return null;
  return <div className="scanlines animate-flicker" aria-hidden />;
}
