import { BookOpen, Code2 } from "lucide-react";

type NavPage = {
  label: string;
  href: string;
};

type NavSection = {
  section: string;
  icon: React.ReactNode;
  pages: NavPage[];
  comingSoon?: boolean;
};

export const DOCS_NAV: NavSection[] = [
  {
    section: "User Guide",
    icon: <BookOpen className="h-3.5 w-3.5" />,
    pages: [
      { label: "Getting started", href: "/docs/user-guide/getting-started" },
      { label: "Kanban board", href: "/docs/user-guide/kanban-board" },
      {
        label: "Application tracking",
        href: "/docs/user-guide/application-tracking",
      },
      {
        label: "Interview management",
        href: "/docs/user-guide/interview-management",
      },
      { label: "Offer evaluation", href: "/docs/user-guide/offer-evaluation" },
      {
        label: "Rejection reflection",
        href: "/docs/user-guide/rejection-reflection",
      },
      { label: "Document manager", href: "/docs/user-guide/document-manager" },
      { label: "Timeline", href: "/docs/user-guide/timeline" },
    ],
  },
  {
    section: "Technical Reference",
    icon: <Code2 className="h-3.5 w-3.5" />,
    pages: [
      { label: "Architecture overview", href: "/docs/technical/architecture" },
      { label: "Tech stack", href: "/docs/technical/tech-stack" },
      { label: "Data models", href: "/docs/technical/data-models" },
      { label: "Authentication", href: "/docs/technical/authentication" },
      { label: "API reference", href: "/docs/technical/api-reference" },
    ],
    comingSoon: true,
  },
];
