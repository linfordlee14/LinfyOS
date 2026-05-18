# LinfyOS

A portfolio that **is** an operating system.

Live: deploy this repo to Vercel and it just works.

## Stack
- Next.js 15 (App Router) · TypeScript
- Tailwind CSS · Framer Motion · Lucide icons

## Local dev

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. Go to <https://vercel.com/new>, import `linfordlee14/LinfyOS`.
3. Framework preset: **Next.js** (auto-detected).
4. Root directory: `./` · Build: `next build` · Output: `.next` (defaults).
5. Click **Deploy**.

That's it — every push to `main` auto-deploys.

## Customize content

All copy lives in `src/lib/data.ts` — bio, projects, skills, experience, certifications.

### Resume PDF
Drop your PDF at `public/resume.pdf` (or set `personal.resumeUrl` in `data.ts` to a hosted URL).

### Profile photo
Upload to Cloudinary and replace `YOUR_CLOUD_NAME` in `src/lib/data.ts` → `personal.profileImage`. The current About app shows initials as a fallback.

## Try it
- Double-click any desktop icon.
- Open **Terminal** and run: `help`, `whoami`, `projects`, `open wildguard`, `neofetch`, `matrix`, `glitch`, `sudo`, `easter`.
- Drag window title bars, resize from the bottom-right corner, minimise to the taskbar.
- Open **Settings** to toggle matrix rain, scanlines, glitch frequency, theme.

## File map

```
src/
├── app/page.tsx        # Boot → Desktop
├── components/
│   ├── os/             # BootScreen, Desktop, Taskbar, StartMenu, Window, Clock
│   ├── apps/           # Terminal, Projects, About, Skills, Experience, Contact, Resume, Settings, LinfyAI
│   └── effects/        # MatrixRain, Scanlines, GlowCursor, GlitchEffect
├── hooks/              # useWindowManager, useSettings
└── lib/                # data.ts (content), apps.ts (registry), utils.ts
```
