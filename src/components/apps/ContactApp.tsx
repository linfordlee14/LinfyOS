"use client";

import { useState } from "react";
import { personal, socials } from "@/lib/data";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";

export function ContactApp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(
      `From: ${name} <${email}>\n\n${msg}`
    );
    const subject = encodeURIComponent(`Signal from ${name || "visitor"}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-os-desktop p-5">
      <div className="font-mono text-[11px] text-os-text-muted mb-3">
        $ open /dev/contact
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-os-text">
            <Mail className="w-4 h-4 text-os-cyan" />
            <a href={`mailto:${personal.email}`} className="hover:text-os-cyan">
              {personal.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-os-text">
            <Phone className="w-4 h-4 text-os-cyan" />
            <a href={`tel:${personal.phone}`} className="hover:text-os-cyan">
              {personal.phone}
            </a>
          </div>
          <div className="flex items-center gap-2 text-os-text-muted">
            <MapPin className="w-4 h-4 text-os-cyan" />
            {personal.location}
          </div>

          <div className="pt-3 mt-3 border-t border-os-border/40 space-y-2">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-os-text hover:text-os-cyan"
            >
              <Github className="w-4 h-4" /> {personal.github.replace("https://", "")}
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-os-text hover:text-os-cyan"
            >
              <Linkedin className="w-4 h-4" /> {personal.linkedin.replace("https://", "")}
            </a>
          </div>
        </div>

        <form
          onSubmit={send}
          className="rounded-md border border-os-cyan/30 bg-os-panel/40 p-4 space-y-3"
        >
          <div className="text-xs font-mono text-os-cyan uppercase tracking-widest">
            // send_signal()
          </div>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-black/40 border border-os-border/60 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-os-cyan"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full bg-black/40 border border-os-border/60 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-os-cyan"
          />
          <textarea
            required
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Message..."
            rows={5}
            className="w-full bg-black/40 border border-os-border/60 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-os-cyan resize-none"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm bg-os-cyan/20 hover:bg-os-cyan/30 text-os-cyan border border-os-cyan/40 transition-colors"
          >
            <Send className="w-4 h-4" /> {sent ? "Resent" : "Send signal"}
          </button>
          {sent && (
            <div className="text-xs text-os-green term-glow">
              Signal queued in your mail client.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
