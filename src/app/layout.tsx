import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LinfyOS — Linford Musiyambodza",
  description:
    "An operating system for a portfolio. AI Product Builder, Full-Stack Developer & Founder. Boot in.",
  metadataBase: new URL("https://linfyos.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-os-bg text-os-text">{children}</body>
    </html>
  );
}
