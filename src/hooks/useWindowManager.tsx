"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { AppId } from "@/lib/apps";
import { APPS } from "@/lib/apps";

export type WindowState = {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  // saved geometry to restore when un-maximizing
  saved?: { x: number; y: number; w: number; h: number };
  // optional initial argument (e.g. project id for terminal)
  initialArg?: string;
};

type Ctx = {
  windows: WindowState[];
  activeId: string | null;
  open: (appId: AppId, initialArg?: string) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, w: number, h: number) => void;
  restore: (id: string) => void;
};

const WindowManagerContext = createContext<Ctx | null>(null);

let zCounter = 100;

function nextId() {
  return Math.random().toString(36).slice(2, 9);
}

export function WindowManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const open = useCallback((appId: AppId, initialArg?: string) => {
    setWindows((prev) => {
      // If app is already open (single-instance behavior for non-terminal), focus it.
      if (appId !== "terminal") {
        const existing = prev.find((w) => w.appId === appId);
        if (existing) {
          zCounter += 1;
          setActiveId(existing.id);
          return prev.map((w) =>
            w.id === existing.id
              ? {
                  ...w,
                  minimized: false,
                  z: zCounter,
                  initialArg: initialArg ?? w.initialArg,
                }
              : w
          );
        }
      }
      const app = APPS[appId];
      const id = nextId();
      zCounter += 1;
      const baseX = 80 + (prev.length % 6) * 36;
      const baseY = 60 + (prev.length % 6) * 28;
      const w: WindowState = {
        id,
        appId,
        title: app.title,
        x: baseX,
        y: baseY,
        w: app.defaultSize.w,
        h: app.defaultSize.h,
        z: zCounter,
        minimized: false,
        maximized: false,
        initialArg,
      };
      setActiveId(id);
      return [...prev, w];
    });
  }, []);

  const close = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  const focus = useCallback((id: string) => {
    zCounter += 1;
    setActiveId(id);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, z: zCounter, minimized: false } : w
      )
    );
  }, []);

  const minimize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  const restore = useCallback((id: string) => {
    zCounter += 1;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, minimized: false, z: zCounter } : w
      )
    );
    setActiveId(id);
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.saved) {
          return { ...w, maximized: false, ...w.saved, saved: undefined };
        }
        return {
          ...w,
          maximized: true,
          saved: { x: w.x, y: w.y, w: w.w, h: w.h },
        };
      })
    );
  }, []);

  const move = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  const resize = useCallback((id: string, w: number, h: number) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, w, h } : win))
    );
  }, []);

  const value = useMemo(
    () => ({
      windows,
      activeId,
      open,
      close,
      focus,
      minimize,
      toggleMaximize,
      move,
      resize,
      restore,
    }),
    [
      windows,
      activeId,
      open,
      close,
      focus,
      minimize,
      toggleMaximize,
      move,
      resize,
      restore,
    ]
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx)
    throw new Error("useWindowManager must be used within WindowManagerProvider");
  return ctx;
}
