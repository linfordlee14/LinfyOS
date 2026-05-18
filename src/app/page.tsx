"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BootScreen } from "@/components/os/BootScreen";
import { Desktop } from "@/components/os/Desktop";
import { WindowManagerProvider } from "@/hooks/useWindowManager";
import { SettingsProvider, useSettings } from "@/hooks/useSettings";
import { MatrixRain } from "@/components/effects/MatrixRain";
import { Scanlines } from "@/components/effects/Scanlines";
import { GlowCursor } from "@/components/effects/GlowCursor";
import { GlitchEffect } from "@/components/effects/GlitchEffect";

function Shell() {
  const { settings } = useSettings();
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (!settings.boot) setBooted(true);
  }, [settings.boot]);

  useEffect(() => {
    const onReboot = () => {
      setBooted(false);
      setTimeout(() => setBooted(true), 4500);
    };
    window.addEventListener("linfyos:reboot", onReboot);
    return () => window.removeEventListener("linfyos:reboot", onReboot);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-os-bg">
      <MatrixRain active={settings.matrix} />
      <Scanlines active={settings.scanlines} />
      <GlowCursor />
      <GlitchEffect />

      <AnimatePresence mode="wait">
        {!booted ? (
          <BootScreen key="boot" onDone={() => setBooted(true)} />
        ) : (
          <Desktop key="desktop" />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function Page() {
  return (
    <SettingsProvider>
      <WindowManagerProvider>
        <Shell />
      </WindowManagerProvider>
    </SettingsProvider>
  );
}
