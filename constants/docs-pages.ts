import {
  Bell,
  BookOpen,
  Database,
  FileText,
  FolderOpen,
  GitBranch,
  HeartHandshake,
  Kanban,
  Layers,
  Scale,
  Shield,
  Terminal,
  Trophy,
} from "lucide-react";

export const USER_GUIDE_PAGES = [
  {
    icon: BookOpen,
    label: "Getting started",
    description:
      "Sign in with Google and add your first job in under a minute.",
    href: "/docs/user-guide/getting-started",
  },
  {
    icon: Kanban,
    label: "Kanban board",
    description:
      "Drag jobs across five stages and see your full pipeline at a glance.",
    href: "/docs/user-guide/kanban-board",
  },
  {
    icon: FileText,
    label: "Application tracking",
    description:
      "Log every detail — method, CV, cover letter, referral, and follow-up dates.",
    href: "/docs/user-guide/application-tracking",
  },
  {
    icon: Bell,
    label: "Interview management",
    description:
      "Track every round with type, outcome, rating, notes, and prep topics.",
    href: "/docs/user-guide/interview-management",
  },
  {
    icon: Scale,
    label: "Offer evaluation",
    description:
      "Break down compensation and weigh pros and cons before deciding.",
    href: "/docs/user-guide/offer-evaluation",
  },
  {
    icon: HeartHandshake,
    label: "Rejection reflection",
    description: "Turn rejections into growth by logging lessons and feedback.",
    href: "/docs/user-guide/rejection-reflection",
  },
  {
    icon: FolderOpen,
    label: "Document manager",
    description:
      "Upload CVs and cover letters and track which version you sent where.",
    href: "/docs/user-guide/document-manager",
  },
  {
    icon: Trophy,
    label: "Timeline",
    description:
      "View the full history of any job application in a premium feed UI.",
    href: "/docs/user-guide/timeline",
  },
];

export const TECHNICAL_PAGES = [
  {
    icon: Layers,
    label: "Architecture overview",
    description:
      "How Ascendio is structured — routing, rendering, and data flow.",
    href: "/docs/technical/architecture",
  },
  {
    icon: Terminal,
    label: "Tech stack",
    description: "Every tool, library, and service used to build Ascendio.",
    href: "/docs/technical/tech-stack",
  },
  {
    icon: Database,
    label: "Data models",
    description: "MongoDB schemas, indexes, and relationships explained.",
    href: "/docs/technical/data-models",
  },
  {
    icon: Shield,
    label: "Authentication",
    description: "How Better Auth and Google OAuth work together in Ascendio.",
    href: "/docs/technical/authentication",
  },
  {
    icon: GitBranch,
    label: "API reference",
    description: "All server actions and API routes with their signatures.",
    href: "/docs/technical/api-reference",
  },
];
