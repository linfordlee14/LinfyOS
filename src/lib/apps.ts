import {
  Terminal,
  FolderOpen,
  User,
  Cpu,
  Briefcase,
  Mail,
  FileText,
  Settings,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type AppId =
  | "terminal"
  | "projects"
  | "about"
  | "skills"
  | "experience"
  | "contact"
  | "resume"
  | "settings"
  | "linfy";

export type AppDefinition = {
  id: AppId;
  title: string;
  icon: LucideIcon;
  color: string;
  defaultSize: { w: number; h: number };
};

export const APPS: Record<AppId, AppDefinition> = {
  projects: {
    id: "projects",
    title: "Projects",
    icon: FolderOpen,
    color: "#06b6d4",
    defaultSize: { w: 880, h: 560 },
  },
  terminal: {
    id: "terminal",
    title: "Terminal",
    icon: Terminal,
    color: "#10b981",
    defaultSize: { w: 720, h: 480 },
  },
  about: {
    id: "about",
    title: "About",
    icon: User,
    color: "#22d3ee",
    defaultSize: { w: 760, h: 520 },
  },
  skills: {
    id: "skills",
    title: "Skills",
    icon: Cpu,
    color: "#14b8a6",
    defaultSize: { w: 700, h: 540 },
  },
  experience: {
    id: "experience",
    title: "Experience",
    icon: Briefcase,
    color: "#06b6d4",
    defaultSize: { w: 720, h: 520 },
  },
  contact: {
    id: "contact",
    title: "Contact",
    icon: Mail,
    color: "#f59e0b",
    defaultSize: { w: 620, h: 540 },
  },
  resume: {
    id: "resume",
    title: "Resume",
    icon: FileText,
    color: "#94a3b8",
    defaultSize: { w: 680, h: 560 },
  },
  settings: {
    id: "settings",
    title: "Settings",
    icon: Settings,
    color: "#64748b",
    defaultSize: { w: 620, h: 480 },
  },
  linfy: {
    id: "linfy",
    title: "Linfy AI",
    icon: Sparkles,
    color: "#22d3ee",
    defaultSize: { w: 560, h: 600 },
  },
};

export const DESKTOP_ICON_ORDER: AppId[] = [
  "projects",
  "terminal",
  "about",
  "skills",
  "experience",
  "contact",
  "resume",
  "settings",
  "linfy",
];
