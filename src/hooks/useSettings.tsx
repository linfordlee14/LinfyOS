"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Settings = {
  matrix: boolean;
  scanlines: boolean;
  glitchFreq: "off" | "low" | "medium" | "high";
  theme: "cyan" | "green" | "teal";
  boot: boolean;
};

const DEFAULT: Settings = {
  matrix: false,
  scanlines: true,
  glitchFreq: "low",
  theme: "cyan",
  boot: true,
};

const KEY = "linfyos.settings.v1";

type Ctx = {
  settings: Settings;
  set: <K extends keyof Settings>(k: K, v: Settings[K]) => void;
};

const SettingsContext = createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSettings({ ...DEFAULT, ...JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const set = useCallback(<K extends keyof Settings>(k: K, v: Settings[K]) => {
    setSettings((s) => ({ ...s, [k]: v }));
  }, []);

  // Listen to terminal events that toggle features
  useEffect(() => {
    const onMatrix = () => set("matrix", !settings.matrix);
    window.addEventListener("linfyos:toggle-matrix", onMatrix);
    return () => window.removeEventListener("linfyos:toggle-matrix", onMatrix);
  }, [settings.matrix, set]);

  const value = useMemo(() => ({ settings, set }), [settings, set]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
