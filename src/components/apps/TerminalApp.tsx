"use client";

import { useEffect, useRef, useState } from "react";
import { personal, projects, skills, experience, certifications } from "@/lib/data";
import { useWindowManager } from "@/hooks/useWindowManager";
import type { AppId } from "@/lib/apps";

type Line = { kind: "in" | "out" | "err" | "info" | "ok"; text: string };

const PROMPT = `${personal.handle}@${personal.hostname}:~$`;

const NEOFETCH = `       .-.
      (o o)        ${personal.handle}@${personal.hostname}
      | O \\       -----------------------
       \\   \\      OS:       LinfyOS v1.0
        '~~~'     Host:     Next.js 15
                  Kernel:   React 19
                  Uptime:   4 years
                  Shell:    TerminalApp v1
                  DE:       LinfyOS Custom
                  WM:       Framer Motion
                  Theme:    Kali-Cyberpunk
                  Icons:    Lucide
                  Terminal: JetBrains Mono
                  CPU:      Brain (overclocked)
                  Memory:   ∞ curiosity`;

const HELP = `Available commands:
  help            Show all commands
  whoami          About Linford
  projects        List all projects
  open [id]       Open a project window
  skills          Tech stack & levels
  experience      Work history
  certifications  Programmes & certs
  contact         Email, phone, socials
  resume          Open resume window
  socials         GitHub, LinkedIn
  neofetch        System / profile card
  matrix          Toggle matrix rain
  glitch          Trigger glitch effect
  clear           Clear terminal
  reboot          Restart system
  easter          ???`;

function listProjects(): string {
  const rows = projects.map(
    (p) =>
      `  ${p.id.padEnd(16)} ${p.title.padEnd(20)} ${p.status.padEnd(12)} ${p.stack.slice(0, 3).join(", ")}`
  );
  return `ID               TITLE                STATUS       STACK
${rows.join("\n")}\n\nUse 'open <id>' to open a project window.`;
}

export function TerminalApp({ initialArg }: { initialArg?: string }) {
  const [lines, setLines] = useState<Line[]>([
    {
      kind: "info",
      text: `LinfyOS Terminal v1.0 — type 'help' to see commands.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { open } = useWindowManager();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (initialArg) {
      run(`open ${initialArg}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialArg]);

  function append(line: Line) {
    setLines((prev) => [...prev, line]);
  }

  function appendMulti(text: string, kind: Line["kind"] = "out") {
    setLines((prev) => [
      ...prev,
      ...text.split("\n").map((t) => ({ kind, text: t })),
    ]);
  }

  function run(raw: string) {
    const cmd = raw.trim();
    append({ kind: "in", text: `${PROMPT} ${cmd}` });
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);

    const [name, ...args] = cmd.split(/\s+/);
    switch (name) {
      case "help":
        appendMulti(HELP, "info");
        break;
      case "whoami":
        appendMulti(
          `${personal.name}\n${personal.headline}\nLocation: ${personal.location}\n\n${personal.bio[0]}`,
          "ok"
        );
        break;
      case "projects":
        appendMulti(listProjects());
        break;
      case "open": {
        const id = args[0];
        if (!id) {
          append({ kind: "err", text: "usage: open <id>" });
          break;
        }
        const apps: AppId[] = [
          "projects",
          "about",
          "skills",
          "experience",
          "contact",
          "resume",
          "settings",
          "linfy",
        ];
        if ((apps as string[]).includes(id)) {
          open(id as AppId);
          append({ kind: "ok", text: `Opened ${id}.` });
        } else {
          const p = projects.find((x) => x.id === id);
          if (p) {
            open("projects", id);
            append({ kind: "ok", text: `Opening project: ${p.title}` });
          } else {
            append({ kind: "err", text: `unknown id: ${id}` });
          }
        }
        break;
      }
      case "skills":
        appendMulti(
          skills
            .map(
              (s) =>
                `${s.category.padEnd(14)} ${"█".repeat(Math.floor(s.level / 5)).padEnd(20)} ${s.level}%   ${s.items.join(", ")}`
            )
            .join("\n")
        );
        break;
      case "experience":
        appendMulti(
          experience
            .map(
              (e) =>
                `[${e.period}] ${e.role} @ ${e.company}\n  ${e.description}`
            )
            .join("\n\n")
        );
        break;
      case "certifications":
      case "certs":
        appendMulti(certifications.map((c) => `  • ${c}`).join("\n"));
        break;
      case "contact":
        appendMulti(
          `Email:    ${personal.email}\nPhone:    ${personal.phone}\nLocation: ${personal.location}\nLinkedIn: ${personal.linkedin}\nGitHub:   ${personal.github}`,
          "info"
        );
        break;
      case "resume":
        open("resume");
        append({ kind: "ok", text: "Opening resume..." });
        break;
      case "socials":
        appendMulti(`GitHub:   ${personal.github}\nLinkedIn: ${personal.linkedin}`, "info");
        break;
      case "neofetch":
        appendMulti(NEOFETCH, "info");
        break;
      case "matrix":
        window.dispatchEvent(new CustomEvent("linfyos:toggle-matrix"));
        append({ kind: "ok", text: "Matrix rain toggled." });
        break;
      case "glitch":
        window.dispatchEvent(new CustomEvent("linfyos:glitch"));
        append({ kind: "ok", text: "// reality.exe glitched //" });
        break;
      case "clear":
      case "cls":
        setLines([]);
        break;
      case "reboot":
        window.dispatchEvent(new CustomEvent("linfyos:reboot"));
        append({ kind: "info", text: "Restarting LinfyOS..." });
        break;
      case "sudo":
        append({ kind: "err", text: "Nice try. Linford already has root." });
        break;
      case "easter":
        appendMulti(
          `   ☄  You found it.\n   Built with espresso & purpose in Strand, Cape Town.\n   "The future I want to live in, I'd rather build."`,
          "ok"
        );
        break;
      case "ls":
        appendMulti("about.txt  projects/  skills.json  resume.pdf  contact.vcf");
        break;
      case "cat": {
        const f = args[0];
        if (f === "about.txt") appendMulti(personal.bio.join("\n\n"));
        else if (f === "resume.pdf") {
          open("resume");
          append({ kind: "ok", text: "Opening resume window..." });
        } else append({ kind: "err", text: `cat: ${f}: No such file` });
        break;
      }
      case "exit":
        append({ kind: "info", text: "Use the window close button. :)" });
        break;
      default:
        append({
          kind: "err",
          text: `command not found: ${name}. type 'help'`,
        });
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < 0) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx] ?? "");
      }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([]);
    }
  }

  const color = (k: Line["kind"]) =>
    k === "err"
      ? "text-os-red"
      : k === "ok"
        ? "text-os-green"
        : k === "info"
          ? "text-os-cyan"
          : k === "in"
            ? "text-os-text"
            : "text-os-text/90";

  return (
    <div
      className="w-full h-full bg-black font-mono text-[13px] text-os-green flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 leading-relaxed">
        {lines.map((l, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap break-words term-glow ${color(l.kind)}`}
          >
            {l.text}
          </pre>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-os-green term-glow">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent outline-none border-none text-os-text caret-os-cyan"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
      </div>
    </div>
  );
}
