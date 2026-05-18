# LINFORD OS v1.0
## Master Build Specification
### Project: Linford Musiyambodza — Futuristic OS Portfolio
### Stack: Next.js 15 · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion
### Deploy: Vercel
### Date: 2026-05-18

---

## THE VISION

Build a portfolio that IS an operating system. Not a website themed like one.
An actual interactive OS that boots up, has a desktop with app icons,
opens draggable windows, runs a terminal, and makes recruiters feel like
they're interfacing with a powerful system built by someone who knows
security, AI, and systems architecture.

**Inspiration sources:**
- OSFOLIO (desktop OS with windows, taskbar, boot screen)
- Kali Linux terminal portfolios (hacker aesthetic, command-line interface)
- Cyberpunk 2077 UI (neon, glitch effects, holographic feel)
- Anime tech interfaces (Ghost in the Shell, Psycho-Pass)

**What makes this powerful:**
1. Boot sequence on load — fake system initialization, your name typing out
2. Desktop with app icons — each icon opens a draggable window
3. Terminal app — real commands visitors can type (`help`, `projects`, `whoami`, `contact`)
4. Kali Linux color scheme — dark navy, cyan, teal, with glow effects
5. Glitch effects — occasional screen distortion, channel shift, flicker
6. Holographic profile photo — animated ring, glow on hover
7. AI assistant "Linfy" — chatbot that answers questions about you
8. Click glow on EVERY interactive element — radial glow follows cursor
9. Sound effects — subtle tech sounds (optional, muted by default)
10. Matrix rain background option — toggle in settings

---

## FILE STRUCTURE

```
portfolio-os/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # OS shell, no scroll, full viewport
│   │   ├── page.tsx            # Boot → Desktop
│   │   └── globals.css         # OS styles, animations, CRT effects
│   ├── components/
│   │   ├── os/
│   │   │   ├── BootScreen.tsx      # Boot animation, system init
│   │   │   ├── Desktop.tsx         # Desktop background, icon grid
│   │   │   ├── DesktopIcon.tsx     # Clickable app icons
│   │   │   ├── Taskbar.tsx         # Bottom bar, clock, start menu
│   │   │   ├── Window.tsx          # Draggable, resizable, minimizable
│   │   │   ├── StartMenu.tsx       # App launcher, system menu
│   │   │   ├── Clock.tsx           # Live clock widget
│   │   │   └── SystemTray.tsx      # Notifications, settings quick
│   │   ├── apps/
│   │   │   ├── TerminalApp.tsx     # Command-line interface
│   │   │   ├── ProjectsApp.tsx     # Project browser with images
│   │   │   ├── AboutApp.tsx        # Profile + bio + photo
│   │   │   ├── SkillsApp.tsx       # Tech stack visualization
│   │   │   ├── ExperienceApp.tsx   # Timeline in window
│   │   │   ├── ContactApp.tsx      # Contact form + links
│   │   │   ├── ResumeApp.tsx       # PDF viewer / download
│   │   │   ├── SettingsApp.tsx     # Theme toggle, sound, matrix
│   │   │   └── LinfyAI.tsx         # AI assistant chat window
│   │   ├── effects/
│   │   │   ├── GlitchEffect.tsx    # Random screen glitch
│   │   │   ├── MatrixRain.tsx      # Canvas matrix rain background
│   │   │   ├── Scanlines.tsx       # CRT scanline overlay
│   │   │   ├── GlowCursor.tsx      # Radial glow follows click
│   │   │   └── Hologram.tsx        # Holographic image effect
│   │   └── ui/                     # shadcn components
│   ├── lib/
│   │   ├── data.ts                 # All content: projects, skills, etc.
│   │   ├── commands.ts             # Terminal command definitions
│   │   └── utils.ts                # Helpers, window management
│   └── hooks/
│       ├── useWindowManager.ts     # Open/close/focus/minimize windows
│       ├── useBootSequence.ts      # Boot animation state machine
│       ├── useSound.ts             # Sound effect triggers
│       └── useGlitch.ts            # Random glitch timing
├── public/
│   ├── icons/                    # App icons (PNG/SVG)
│   ├── sounds/                   # UI sounds (click, boot, error)
│   ├── images/                   # Project screenshots, profile
│   └── resume.pdf
├── tailwind.config.ts
└── next.config.js
```

---

## PHASE 1: PROJECT SCAFFOLD

Run these commands:
```bash
npx create-next-app@latest portfolio-os --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
cd portfolio-os
npx shadcn@latest init -y -d
npx shadcn@latest add button card dialog separator
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## PHASE 2: DESIGN SYSTEM

### Color Palette (Kali Linux + Cyberpunk + Your Brand)

```
--os-bg:              #0a0e1a        (deep navy background)
--os-desktop:        #0f172a        (desktop area)
--os-panel:           #1e293b        (taskbar, window chrome)
--os-panel-hover:     #334155        (hover states)
--os-cyan:            #06b6d4        (primary accent)
--os-cyan-glow:       #22d3ee        (glow highlight)
--os-teal:            #14b8a6        (secondary accent)
--os-green:           #10b981        (success, terminal ok)
--os-red:             #ef4444        (error, close button)
--os-yellow:          #f59e0b        (warning, minimize)
--os-text:            #f1f5f9        (primary text)
--os-text-muted:      #94a3b8        (secondary text)
--os-border:          #334155        (borders)
--os-glow-cyan:       rgba(6,182,212,0.4)
--os-glow-teal:       rgba(20,184,166,0.4)
```

### Typography
- Primary: Geist Sans (Next.js default)
- Terminal: Geist Mono or JetBrains Mono
- Headings: Bold, tracking-tight
- Body: Normal, leading-relaxed

### Spacing
- Window padding: 0 (content touches edges, chrome provides spacing)
- Desktop padding: 24px
- Icon grid gap: 32px
- Taskbar height: 48px
- Window border-radius: 8px
- Window shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)

---

## PHASE 3: BOOT SEQUENCE

### BootScreen.tsx

**Sequence (5 seconds total):**
1. Black screen, 0.5s
2. "BIOS Linford Systems v2.6" appears, typewriter effect
3. Memory check: "32768MB OK" — counts up rapidly
4. Disk check: "NVMe SSD... OK"
5. "Loading kernel..."
6. "Initializing AI modules..."
7. "Mounting portfolio filesystem..."
8. "Starting LinfyOS..."
9. Progress bar fills (cyan)
10. Fade to desktop

**Visual:**
- Green terminal text on black (classic boot)
- Or cyan text on navy (modern)
- Cursor blink `_` at end of lines
- Random hex dumps scrolling in background (decorative)
- Sound: subtle boot-up hum (optional)

---

## PHASE 4: DESKTOP ENVIRONMENT

### Desktop.tsx

**Background:**
- Default: dark navy gradient with subtle grid pattern
- Optional: MatrixRain canvas background (toggle in settings)
- Optional: Cloudinary-hosted custom wallpaper

**Icons (arranged in grid, top-left to bottom):**
```
[Projects]    [Terminal]    [About]
[Skills]      [Experience]  [Contact]
[Resume]      [Settings]    [Linfy AI]
```

**Each DesktopIcon:**
- 72px × 84px (icon + label)
- Icon: 48px, rounded square with app logo
- Label: 12px, centered, 2 lines max
- Hover: scale 1.1, glow border, label brightens
- Click: scale 0.95 → bounce back, opens Window
- Double-click: also opens (desktop convention)
- Right-click: context menu (Open, Pin to taskbar)

### Taskbar.tsx

**Left:** Start button (Linfy logo) + pinned apps
**Center:** Open window previews (like Windows/macOS)
**Right:** System tray (clock, sound, network, settings)

**Height:** 48px, fixed bottom
**Style:** Glassmorphism — translucent with backdrop blur
**Border:** 1px top border, subtle glow on hover

### Window.tsx

**Features:**
- Draggable (drag title bar)
- Resizable (bottom-right corner handle)
- Minimize (to taskbar)
- Maximize (fullscreen within desktop)
- Close (with animation)
- Focus (click to bring to front, z-index management)
- Snap (drag to edges to snap left/right/full)

**Chrome:**
- Title bar: 36px height, app name left, controls right
- Controls: close (red), minimize (yellow), maximize (green) — macOS style
- Or: minimize, maximize, close — Windows style (your choice)
- Content area: scrollable if content overflows

**Animation:**
- Open: scale from 0.8 + fade in, 0.3s
- Close: scale to 0.8 + fade out, 0.2s
- Minimize: shrink to taskbar position, 0.3s
- Focus: subtle border glow intensifies

---

## PHASE 5: APPS

### 1. TerminalApp.tsx (The Hacker Signature)

**Interface:**
- Full terminal emulator look
- Prompt: `linford@linfyos:~$` in green
- Cursor: blinking block `_`
- Scrollback: unlimited

**Commands:**
```
help              → Show all commands
whoami            → About Linford
projects          → List projects with IDs
open [id]         → Open project in new window
skills            → Tech stack with levels
experience        → Work history
certifications    → ALX, Aspire, etc.
contact           → Email, phone, socials
resume            → Download resume
socials           → GitHub, LinkedIn links
clear             → Clear terminal
reboot            → Restart boot sequence
matrix            → Toggle matrix rain background
neofetch          → ASCII art system info (like Linux)
glitch            → Trigger glitch effect
easter            → Hidden surprise
```

**Typing effect:**
- Command appears instantly as user types
- Output types character-by-character with 10ms delay
- Some outputs have color coding (green=ok, red=error, cyan=info)

**Visual touches:**
- `neofetch` shows ASCII art of your profile + system specs
- `projects` shows table with name, stack, status
- Easter egg: type `sudo` → "Nice try. Linford already has root."

### 2. ProjectsApp.tsx

**Layout:**
- Sidebar: project list (click to select)
- Main area: project details
- Or: grid view like file explorer

**Each project:**
- Large screenshot from Cloudinary
- Title, tagline, description
- Tech stack badges
- Live demo button (opens browser tab)
- GitHub button
- "Open Terminal" button (opens Terminal with `open [id]` pre-typed)

**Projects to include:**
1. RentGuard CT (featured)
2. WildGuard AI v2 (featured)
3. SpazaLink (featured)
4. Scan
5. Linfy Academy
6. RhinoGuardians
7. KasiAssist AI

### 3. AboutApp.tsx

**Layout:**
- Left: Holographic profile photo (animated ring, glow)
- Right: Bio text with typing effect on open
- Bottom: Quick stats (projects shipped, hackathons, years coding)

**Content:**
- Your 4 paragraphs from data.ts
- Animated counters for stats
- "Download Resume" button

### 4. SkillsApp.tsx

**Layout:**
- Radar chart or hex grid visualization
- Or: terminal-style `ls -la` listing with progress bars
- Categories: AI/LLM, Full-Stack, DevOps, Cybersecurity, Data

**Visual:**
- Each skill has a "proficiency" percentage
- Animated fill on window open
- Color-coded by category

### 5. ExperienceApp.tsx

**Layout:**
- Vertical timeline in window
- Same as your current Experience component
- But inside a draggable window

### 6. ContactApp.tsx

**Layout:**
- Form: Name, Email, Message
- Or: Direct links styled as "system connections"
- Social icons with glow
- "Send Signal" button (instead of "Submit")

### 7. ResumeApp.tsx

**Layout:**
- PDF viewer embed
- Or: Terminal-style `cat resume.txt` output
- Download button prominent

### 8. SettingsApp.tsx

**Options:**
- Theme: Kali (green), Cyberpunk (cyan), Matrix (green rain)
- Background: Solid, Gradient, Matrix Rain, Custom
- Sound: On/Off
- Glitch frequency: Off/Low/Medium/High
- Boot animation: On/Off
- Window style: macOS/Windows

### 9. LinfyAI.tsx

**Interface:**
- Chat window like messaging app
- Or: Terminal-style chat
- Avatar: small animated icon

**Behavior:**
- Pre-loaded with your data
- Answers: "What projects has Linford built?"
- Answers: "Tell me about WildGuard AI"
- Answers: "What's his tech stack?"
- Fallback: "I'm still learning. Ask Linford directly at linfordlee14@gmail.com"

**Implementation:**
- Static responses based on keyword matching (no backend needed)
- Or: Groq API integration for real AI (if you want)

---

## PHASE 6: EFFECTS & POLISH

### GlitchEffect.tsx

**Triggers:**
- Random: every 30-60 seconds, 0.5s duration
- On command: `glitch`
- On hover: specific elements (optional)

**Visual:**
- RGB channel split (red/cyan offset)
- Horizontal scan lines
- Brief pixel displacement
- Sound: digital glitch noise (optional)

### MatrixRain.tsx

**Canvas animation:**
- Green characters falling
- Katakana + Latin + numbers
- Speed: configurable
- Opacity: low (background only)
- Toggle: on/off in settings

### Scanlines.tsx

**CSS overlay:**
- Horizontal lines, 2px, rgba(0,0,0,0.1)
- Subtle CRT feel
- Optional: slight flicker animation

### GlowCursor.tsx

**Behavior:**
- On click: radial gradient expands from click point
- Color: cyan or teal based on element
- Duration: 0.6s fade out
- Follows cursor on drag

### Hologram.tsx

**Profile photo effect:**
- Base image from Cloudinary
- Animated border ring (rotating gradient)
- Occasional glitch overlay
- Scanline effect on image
- Glow on hover

---

## PHASE 7: DATA LAYER

Write file: src/lib/data.ts
```typescript
export const personal = {
  name: "Linford Musiyambodza",
  handle: "linford",
  hostname: "linfyos",
  headline: "AI Product Builder | Full-Stack Developer | Founder",
  subheadline: "Building technology that protects wildlife, empowers township youth, and solves real problems for African communities.",
  location: "Strand, Cape Town, South Africa",
  email: "linfordlee14@gmail.com",
  phone: "+27 78 143 8132",
  linkedin: "https://linkedin.com/in/linfordlee14",
  github: "https://github.com/linfordlee14",
  resumeUrl: "/resume.pdf",
  profileImage: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/profile/linford.jpg",
  stats: {
    projectsShipped: 7,
    hackathons: 39,
    yearsCoding: 4,
    communitiesServed: 3,
  }
};

export const projects = [
  {
    id: "rentguard",
    title: "RentGuard CT",
    tagline: "Rental management platform",
    description: "Built and shipped overnight. Full-stack rental management for Cape Town landlords and tenants.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    liveUrl: "https://rentguard-ct.vercel.app",
    repoUrl: "https://github.com/linfordlee14/rentguard-ct",
    image: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/rentguard",
    featured: true,
    status: "Production",
  },
  {
    id: "wildguard",
    title: "WildGuard AI v2",
    tagline: "AI wildlife conservation",
    description: "48-hour hackathon build. AI agents, mapping, threat analytics for Black Rhino protection.",
    stack: ["React", "Flask", "Groq API", "Leaflet", "Python"],
    liveUrl: "https://wildguard-ai.vercel.app",
    repoUrl: "https://github.com/linfordlee14/wildguard-ai",
    image: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/wildguard",
    featured: true,
    status: "Hackathon",
  },
  {
    id: "spazalink",
    title: "SpazaLink",
    tagline: "Digital spaza shop platform",
    description: "Giving South African spaza shops digital tools for inventory, orders, and growth.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    liveUrl: "https://spazalink.linfytech.co.za",
    repoUrl: "https://github.com/linfordlee14/spazalink",
    image: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/spazalink",
    featured: true,
    status: "Production",
  },
  {
    id: "scan",
    title: "Scan",
    tagline: "Document & QR scanning",
    description: "Lightweight scanning and verification for African SMEs. Quick digitization.",
    stack: ["React", "Vite", "TypeScript", "Tailwind"],
    liveUrl: "https://scan.linfytech.xyz",
    repoUrl: "https://github.com/linfordlee14/scan",
    image: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/scan",
    featured: false,
    status: "Production",
  },
  {
    id: "academy",
    title: "Linfy Academy",
    tagline: "Tech mentorship for Strand youth",
    description: "Mobile-first, offline-friendly platform teaching coding, AI, and cybersecurity.",
    stack: ["Next.js", "TypeScript", "Supabase", "PWA"],
    liveUrl: "https://academy.linfytech.xyz",
    repoUrl: "https://github.com/linfordlee14/linfy-academy",
    image: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/academy",
    featured: false,
    status: "Beta",
  },
  {
    id: "rhinoguardians",
    title: "RhinoGuardians",
    tagline: "Computer vision for rhinos",
    description: "CV pipeline with FastAPI + PostgreSQL + Leaflet maps for anti-poaching.",
    stack: ["FastAPI", "PostgreSQL", "React", "Leaflet", "Python"],
    liveUrl: "#",
    repoUrl: "https://github.com/linfordlee14/rhinoguardians",
    image: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/rhinoguardians",
    featured: false,
    status: "Prototype",
  },
  {
    id: "kasiassist",
    title: "KasiAssist AI",
    tagline: "AI for township SMEs",
    description: "AI-powered assistance tailored for South African township communities.",
    stack: ["Next.js", "TypeScript", "AI APIs", "Tailwind"],
    liveUrl: "#",
    repoUrl: "https://github.com/linfordlee14/kasiassist-ai",
    image: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/kasiassist",
    featured: false,
    status: "Development",
  },
];

export const skills = [
  { category: "AI & LLM", items: ["Gemini API", "Groq", "LLM Agents", "Prompt Engineering", "RAG"], level: 90 },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"], level: 95 },
  { category: "Backend", items: ["Python", "Flask", "FastAPI", "PostgreSQL", "Supabase"], level: 85 },
  { category: "DevOps", items: ["Vercel", "Railway", "GitHub", "Cloudflare", "Linux"], level: 80 },
  { category: "Security", items: ["Kali Linux", "Secure Auth", "Data Recovery", "Phishing Awareness"], level: 75 },
  { category: "Data", items: ["Python", "SQL", "Dashboards", "Data Cleaning", "M&E"], level: 85 },
];

export const experience = [
  {
    company: "NeuroGrowth Labs",
    role: "Co-Founder & Head of AI Product",
    period: "2026-Present",
    description: "AI product architecture for enterprise software. Translating business needs into buildable technical plans.",
  },
  {
    company: "Linfy Tech Solutions",
    role: "Founder & CEO",
    period: "2024-Present",
    description: "Digital and AI solutions for small businesses. Websites, AI tools, cybersecurity training, IT support.",
  },
  {
    company: "ScholarUP Mentoring Academy",
    role: "Data Analyst Volunteer",
    period: "2025-2026",
    description: "Analyzed participant data from global conferences. Created visualizations and reports.",
  },
];

export const terminalCommands = {
  help: `Available commands:
  whoami         About Linford
  projects       List all projects
  open [id]      Open project details
  skills         Tech stack overview
  experience     Work history
  contact        Contact information
  resume         Download resume
  neofetch       System information
  matrix         Toggle matrix rain
  glitch         Trigger glitch effect
  clear          Clear terminal
  reboot         Restart system
  easter         ???`,

  whoami: `Linford Musiyambodza
  Founder & CEO, Linfy Tech Solutions
  Co-Founder & Head of AI Product, NeuroGrowth Labs
  Location: Strand, Cape Town, South Africa
  Mission: Build technology that protects wildlife,
  empowers township youth, and solves real problems.

  Type 'projects' to see what I've built.`,

  neofetch: `       .-.
      (o o)  linford@linfyos
      | O \\  -----------------
       \\   \\  OS: LinfyOS v1.0
        '~~~'  Host: Next.js 15
              Kernel: React 19
              Uptime: 4 years
              Shell: TerminalApp
              DE: Custom OS
              WM: Framer Motion
              Theme: Kali-Cyberpunk
              Icons: Lucide React
              Terminal: Geist Mono
              CPU: Brain (Overclocked)
              Memory: Unlimited curiosity`,
};
```

---

## PHASE 8: MOBILE EXPERIENCE

On screens < 768px:
- Transform to app-grid layout (like phone home screen)
- Bottom navigation bar (4 icons: Apps, Terminal, About, Contact)
- Windows become full-screen modals
- Boot sequence stays (shorter, 3 seconds)
- Swipe gestures for window management
- Touch-optimized icons (larger, more spacing)

---

## PHASE 9: BUILD & DEPLOY

```bash
npm run build
# Fix any errors
git add .
git commit -m "feat: LinfyOS v1.0 — interactive OS portfolio"
git push origin main
# Deploy on Vercel
```

**Post-deploy:**
1. Upload images to Cloudinary
2. Replace YOUR_CLOUD_NAME in data.ts
3. Add resume.pdf to public/
4. Test all terminal commands
5. Test on mobile
6. Share URL

---

## WHAT RECRUITERS WILL SEE

1. **First impression:** "This isn't a portfolio. This is a system."
2. **Boot sequence:** "This person thinks about user experience from second zero."
3. **Terminal:** "They built a command-line interface for fun. They know Linux."
4. **Draggable windows:** "They understand window managers, state management, event handling."
5. **Glitch effects:** "They care about visual polish and delight."
6. **Project content:** "They've shipped real products for real communities."
7. **Overall:** "This is someone who can build anything."

---

## COMPLEXITY ESTIMATE

**This is a 3-4 day build for a skilled React developer.**
**With Claude Code helping: 1-2 days.**

**Hardest parts:**
1. Window manager (drag, resize, z-index, minimize) — use framer-motion + pointer events
2. Terminal command parser — simple string split + switch statement
3. Boot sequence timing — use setTimeout chain or async/await

**Everything else is standard React + Tailwind.**

---

## INSTRUCTIONS FOR CLAUDE CODE / MIMO AGENT

1. Read this entire spec first
2. Build Phase 1 (scaffold)
3. Build Phase 2 (design system)
4. Build Phase 3 (BootScreen)
5. Build Phase 4 (Desktop + Taskbar + Window)
6. Build Phase 5 (all Apps)
7. Build Phase 6 (Effects)
8. Build Phase 7 (Data)
9. Build Phase 8 (Mobile)
10. Build Phase 9 (Deploy)

**Rules:**
- No narration. Just execute.
- If stuck, ask one concise question.
- Test after each phase.
- Use existing libraries (framer-motion, lucide-react) — no new deps.

---

## FINAL NOTE

This portfolio says: "I don't just write code. I build systems."
It says: "I understand UX, animation, state management, and polish."
It says: "I have the technical depth to architect complex interfaces."
It says: "I'm not like other applicants."

That's what powerful means.
