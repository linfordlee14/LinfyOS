"use client";

import { useEffect, useRef, useState } from "react";
import { personal, projects, skills } from "@/lib/data";
import { Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

function answer(q: string): string {
  const s = q.toLowerCase();

  if (/(hi|hello|hey|yo|sup)/.test(s))
    return `Hey — I'm Linfy, the AI inside this OS. Ask me about ${personal.name.split(" ")[0]}'s projects, stack, or experience.`;

  if (/(project|build|made|shipped)/.test(s)) {
    const list = projects
      .filter((p) => p.featured)
      .map((p) => `• ${p.title} — ${p.tagline}`)
      .join("\n");
    return `Featured projects:\n${list}\n\nThere are ${projects.length} total. Try "tell me about wildguard" or "open scan".`;
  }

  for (const p of projects) {
    if (s.includes(p.id) || s.includes(p.title.toLowerCase())) {
      return `${p.title} — ${p.tagline}\n\n${p.description}\n\nStack: ${p.stack.join(", ")}\nStatus: ${p.status}\nRepo: ${p.repoUrl}`;
    }
  }

  if (/(stack|skill|tech)/.test(s)) {
    return skills
      .map((sk) => `${sk.category} (${sk.level}%): ${sk.items.join(", ")}`)
      .join("\n");
  }

  if (/(contact|email|reach|hire)/.test(s)) {
    return `Reach Linford at ${personal.email} or ${personal.phone}.\nLinkedIn: ${personal.linkedin}\nGitHub: ${personal.github}`;
  }

  if (/(who|about|bio)/.test(s)) {
    return `${personal.name} — ${personal.headline}.\n\n${personal.bio[0]}`;
  }

  if (/(location|where|based)/.test(s)) return `Based in ${personal.location}.`;

  if (/(resume|cv)/.test(s)) return `You can open the Resume app, or download it from ${personal.resumeUrl}.`;

  return `I'm still learning. Ask Linford directly at ${personal.email}.`;
}

export function LinfyAI() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text: `Hi — I'm Linfy, ${personal.name.split(" ")[0]}'s AI assistant. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function send() {
    const q = input.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: answer(q) }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  }

  return (
    <div className="w-full h-full flex flex-col bg-os-desktop">
      <div className="px-4 py-2 border-b border-os-border/50 flex items-center gap-2 bg-os-panel/60">
        <div className="w-7 h-7 rounded-full holo-ring p-[1.5px]">
          <div className="w-full h-full rounded-full bg-os-panel flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-os-cyan" />
          </div>
        </div>
        <div>
          <div className="text-sm text-os-text">Linfy</div>
          <div className="text-[10px] text-os-green term-glow">● online</div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
              m.role === "user"
                ? "ml-auto bg-os-cyan/20 border border-os-cyan/40 text-os-text"
                : "bg-os-panel/70 border border-os-border/50 text-os-text"
            }`}
          >
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="bg-os-panel/70 border border-os-border/50 rounded-lg px-3 py-2 text-sm text-os-text-muted w-fit">
            <span className="inline-block animate-pulse">●●●</span>
          </div>
        )}
      </div>

      <div className="p-2 border-t border-os-border/50 bg-os-panel/40 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about projects, stack, contact..."
          className="flex-1 bg-black/40 border border-os-border/60 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-os-cyan"
        />
        <button
          onClick={send}
          className="p-2 rounded bg-os-cyan/20 hover:bg-os-cyan/30 text-os-cyan border border-os-cyan/40"
          aria-label="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
