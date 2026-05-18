"use client";

import { useSettings } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";

export function SettingsApp() {
  const { settings, set } = useSettings();

  return (
    <div className="w-full h-full overflow-y-auto bg-os-desktop p-5 space-y-5">
      <div className="font-mono text-[11px] text-os-text-muted">$ ~/.config/linfyos</div>

      <Row label="Matrix rain background">
        <Toggle value={settings.matrix} onChange={(v) => set("matrix", v)} />
      </Row>

      <Row label="CRT scanlines">
        <Toggle value={settings.scanlines} onChange={(v) => set("scanlines", v)} />
      </Row>

      <Row label="Random glitch frequency">
        <Segmented
          options={["off", "low", "medium", "high"] as const}
          value={settings.glitchFreq}
          onChange={(v) => set("glitchFreq", v)}
        />
      </Row>

      <Row label="Theme accent">
        <Segmented
          options={["cyan", "green", "teal"] as const}
          value={settings.theme}
          onChange={(v) => set("theme", v)}
        />
      </Row>

      <Row label="Boot animation on reload">
        <Toggle value={settings.boot} onChange={(v) => set("boot", v)} />
      </Row>

      <div className="text-[10px] text-os-text-muted mt-4 font-mono">
        // settings are saved in localStorage
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-os-border/50 bg-os-panel/40 p-3">
      <span className="text-sm text-os-text">{label}</span>
      {children}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        "relative w-10 h-5 rounded-full transition-colors",
        value ? "bg-os-cyan/70" : "bg-os-panel-hover"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all",
          value ? "left-5" : "left-0.5"
        )}
      />
    </button>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-md overflow-hidden border border-os-border/60 text-xs">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "px-2.5 py-1 transition-colors",
            value === o
              ? "bg-os-cyan/25 text-os-cyan"
              : "bg-os-panel/50 text-os-text-muted hover:bg-os-panel-hover/60"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
