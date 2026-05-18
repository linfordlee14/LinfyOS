"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import type { WindowState } from "@/hooks/useWindowManager";
import { useWindowManager } from "@/hooks/useWindowManager";
import { APPS } from "@/lib/apps";
import { cn, clamp } from "@/lib/utils";

const TASKBAR_H = 48;
const MIN_W = 320;
const MIN_H = 220;

export function WindowFrame({
  win,
  children,
}: {
  win: WindowState;
  children: React.ReactNode;
}) {
  const { focus, close, minimize, toggleMaximize, move, resize, activeId } =
    useWindowManager();
  const active = activeId === win.id;
  const app = APPS[win.appId];
  const Icon = app.icon;

  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    mode: "move" | "resize" | null;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
  }>({ mode: null, startX: 0, startY: 0, origX: 0, origY: 0, origW: 0, origH: 0 });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d.mode) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      if (d.mode === "move") {
        const maxX = window.innerWidth - 80;
        const maxY = window.innerHeight - TASKBAR_H - 32;
        move(
          win.id,
          clamp(d.origX + dx, -d.origW + 80, maxX),
          clamp(d.origY + dy, 0, maxY)
        );
      } else if (d.mode === "resize") {
        resize(
          win.id,
          clamp(d.origW + dx, MIN_W, window.innerWidth - 24),
          clamp(d.origH + dy, MIN_H, window.innerHeight - TASKBAR_H - 24)
        );
      }
    },
    [win.id, move, resize]
  );

  const onPointerUp = useCallback(() => {
    dragRef.current.mode = null;
    document.body.classList.remove("dragging");
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }, [onPointerMove]);

  const startDrag = (mode: "move" | "resize") => (e: React.PointerEvent) => {
    if (win.maximized && mode === "move") return;
    if (isMobile) return;
    e.preventDefault();
    focus(win.id);
    dragRef.current = {
      mode,
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
      origW: win.w,
      origH: win.h,
    };
    document.body.classList.add("dragging");
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  if (win.minimized) return null;

  const style: React.CSSProperties = isMobile
    ? {
        left: 0,
        top: 0,
        width: "100vw",
        height: `calc(100vh - ${TASKBAR_H}px)`,
        zIndex: win.z,
      }
    : win.maximized
      ? {
          left: 0,
          top: 0,
          width: "100vw",
          height: `calc(100vh - ${TASKBAR_H}px)`,
          zIndex: win.z,
        }
      : {
          left: win.x,
          top: win.y,
          width: win.w,
          height: win.h,
          zIndex: win.z,
        };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.18 }}
      style={style}
      className={cn(
        "absolute flex flex-col rounded-lg overflow-hidden shadow-window border border-os-border/60 bg-os-panel",
        active && "window-focus"
      )}
      onPointerDown={() => focus(win.id)}
    >
      {/* Title bar */}
      <div
        onPointerDown={startDrag("move")}
        onDoubleClick={() => toggleMaximize(win.id)}
        className={cn(
          "h-9 flex items-center px-2 select-none",
          active ? "bg-os-panel" : "bg-os-panel/70",
          isMobile ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        )}
        style={{
          borderBottom: `1px solid ${app.color}33`,
        }}
      >
        <div className="flex items-center gap-2 px-1">
          <Icon className="w-3.5 h-3.5" style={{ color: app.color }} />
          <span className="text-xs text-os-text font-mono tracking-wide">
            {win.title}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimize(win.id);
            }}
            className="w-6 h-6 rounded hover:bg-os-yellow/20 flex items-center justify-center group"
            aria-label="Minimize"
          >
            <Minus className="w-3 h-3 text-os-yellow group-hover:text-os-yellow" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize(win.id);
            }}
            className="w-6 h-6 rounded hover:bg-os-green/20 flex items-center justify-center group"
            aria-label="Maximize"
          >
            <Square className="w-3 h-3 text-os-green" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              close(win.id);
            }}
            className="w-6 h-6 rounded hover:bg-os-red/30 flex items-center justify-center group"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5 text-os-red" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-auto bg-os-desktop/40">
        {children}
      </div>

      {/* Resize handle */}
      {!win.maximized && !isMobile && (
        <div
          onPointerDown={startDrag("resize")}
          className="absolute right-0 bottom-0 w-4 h-4 cursor-nwse-resize"
          style={{
            background:
              "linear-gradient(135deg, transparent 50%, rgba(34,211,238,0.5) 50%)",
          }}
        />
      )}
    </motion.div>
  );
}
