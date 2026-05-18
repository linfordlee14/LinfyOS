export const personal = {
  name: "Linford Musiyambodza",
  handle: "linford",
  hostname: "linfyos",
  headline: "AI Product Builder | Full-Stack Developer | Founder",
  subheadline:
    "Building technology that protects wildlife, empowers township youth, and solves real problems for African communities.",
  location: "Strand, Cape Town, South Africa",
  email: "linfordlee14@gmail.com",
  phone: "+27 78 143 8132",
  linkedin: "https://linkedin.com/in/linfordlee14",
  github: "https://github.com/linfordlee14",
  resumeUrl: "/resume.pdf",
  profileImage:
    "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/profile/linford.jpg",
  bio: [
    "I'm a founder and engineer based in Strand, Cape Town. I build AI products that ship — full-stack systems, LLM agents, computer-vision pipelines, and the cybersecurity layers that keep them safe.",
    "I started Linfy Tech Solutions to bring real digital tools to small African businesses, and co-founded NeuroGrowth Labs to translate enterprise problems into buildable AI architecture.",
    "I prototype fast and ship faster — RentGuard CT was built overnight, WildGuard AI v2 in a 48-hour hackathon. Speed is a feature when communities are waiting.",
    "When I'm not coding, I'm mentoring Strand youth, designing offline-first apps for spaza shops, or chasing rhinos through computer-vision pipelines. The future I want to live in, I'd rather build.",
  ],
  stats: {
    projectsShipped: 7,
    hackathons: 39,
    yearsCoding: 4,
    communitiesServed: 3,
  },
} as const;

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  liveUrl: string;
  repoUrl: string;
  image: string;
  featured: boolean;
  status: string;
};

export const projects: Project[] = [
  {
    id: "rentguard",
    title: "RentGuard CT",
    tagline: "Rental management platform",
    description:
      "Built and shipped overnight. Full-stack rental management for Cape Town landlords and tenants.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    liveUrl: "https://rentguard-ct.vercel.app",
    repoUrl: "https://github.com/linfordlee14/rentguard-ct",
    image:
      "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/rentguard",
    featured: true,
    status: "Production",
  },
  {
    id: "wildguard",
    title: "WildGuard AI v2",
    tagline: "AI wildlife conservation",
    description:
      "48-hour hackathon build. AI agents, mapping, threat analytics for Black Rhino protection.",
    stack: ["React", "Flask", "Groq API", "Leaflet", "Python"],
    liveUrl: "https://wildguard-ai.vercel.app",
    repoUrl: "https://github.com/linfordlee14/wildguard-ai",
    image:
      "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/wildguard",
    featured: true,
    status: "Hackathon",
  },
  {
    id: "spazalink",
    title: "SpazaLink",
    tagline: "Digital spaza shop platform",
    description:
      "Giving South African spaza shops digital tools for inventory, orders, and growth.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    liveUrl: "https://spazalink.linfytech.co.za",
    repoUrl: "https://github.com/linfordlee14/spazalink",
    image:
      "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/spazalink",
    featured: true,
    status: "Production",
  },
  {
    id: "scan",
    title: "Scan",
    tagline: "Document & QR scanning",
    description:
      "Lightweight scanning and verification for African SMEs. Quick digitization.",
    stack: ["React", "Vite", "TypeScript", "Tailwind"],
    liveUrl: "https://scan.linfytech.xyz",
    repoUrl: "https://github.com/linfordlee14/scan",
    image:
      "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/scan",
    featured: false,
    status: "Production",
  },
  {
    id: "academy",
    title: "Linfy Academy",
    tagline: "Tech mentorship for Strand youth",
    description:
      "Mobile-first, offline-friendly platform teaching coding, AI, and cybersecurity.",
    stack: ["Next.js", "TypeScript", "Supabase", "PWA"],
    liveUrl: "https://academy.linfytech.xyz",
    repoUrl: "https://github.com/linfordlee14/linfy-academy",
    image:
      "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/academy",
    featured: false,
    status: "Beta",
  },
  {
    id: "rhinoguardians",
    title: "RhinoGuardians",
    tagline: "Computer vision for rhinos",
    description:
      "CV pipeline with FastAPI + PostgreSQL + Leaflet maps for anti-poaching.",
    stack: ["FastAPI", "PostgreSQL", "React", "Leaflet", "Python"],
    liveUrl: "#",
    repoUrl: "https://github.com/linfordlee14/rhinoguardians",
    image:
      "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/rhinoguardians",
    featured: false,
    status: "Prototype",
  },
  {
    id: "kasiassist",
    title: "KasiAssist AI",
    tagline: "AI for township SMEs",
    description:
      "AI-powered assistance tailored for South African township communities.",
    stack: ["Next.js", "TypeScript", "AI APIs", "Tailwind"],
    liveUrl: "#",
    repoUrl: "https://github.com/linfordlee14/kasiassist-ai",
    image:
      "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/portfolio/projects/kasiassist",
    featured: false,
    status: "Development",
  },
];

export const skills = [
  {
    category: "AI & LLM",
    items: ["Gemini API", "Groq", "LLM Agents", "Prompt Engineering", "RAG"],
    level: 90,
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    level: 95,
  },
  {
    category: "Backend",
    items: ["Python", "Flask", "FastAPI", "PostgreSQL", "Supabase"],
    level: 85,
  },
  {
    category: "DevOps",
    items: ["Vercel", "Railway", "GitHub", "Cloudflare", "Linux"],
    level: 80,
  },
  {
    category: "Security",
    items: [
      "Kali Linux",
      "Secure Auth",
      "Data Recovery",
      "Phishing Awareness",
    ],
    level: 75,
  },
  {
    category: "Data",
    items: ["Python", "SQL", "Dashboards", "Data Cleaning", "M&E"],
    level: 85,
  },
];

export const experience = [
  {
    company: "NeuroGrowth Labs",
    role: "Co-Founder & Head of AI Product",
    period: "2026 — Present",
    description:
      "AI product architecture for enterprise software. Translating business needs into buildable technical plans.",
  },
  {
    company: "Linfy Tech Solutions",
    role: "Founder & CEO",
    period: "2024 — Present",
    description:
      "Digital and AI solutions for small businesses. Websites, AI tools, cybersecurity training, IT support.",
  },
  {
    company: "ScholarUP Mentoring Academy",
    role: "Data Analyst Volunteer",
    period: "2025 — 2026",
    description:
      "Analyzed participant data from global conferences. Created visualizations and reports.",
  },
];

export const certifications = [
  "ALX — Software Engineering Track",
  "Aspire Leaders Programme",
  "Cybersecurity Fundamentals (ISC²)",
  "Cloudflare Web Performance",
];

export const socials = [
  { label: "GitHub", url: personal.github },
  { label: "LinkedIn", url: personal.linkedin },
  { label: "Email", url: `mailto:${personal.email}` },
];
