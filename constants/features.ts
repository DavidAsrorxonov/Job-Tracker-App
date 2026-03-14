import {
  Kanban,
  FileText,
  Bell,
  TrendingUp,
  Scale,
  BookOpen,
  Trophy,
  HeartHandshake,
  FolderOpen,
} from "lucide-react";

export const FEATURES = [
  {
    icon: Kanban,
    title: "Kanban Pipeline",
    description:
      "Drag and drop jobs across five stages — Wishlist, Applied, Interviewing, Offer, and Rejected. Your entire job search at a glance.",
  },
  {
    icon: BookOpen,
    title: "Wishlist Research",
    description:
      "Research jobs before applying. Record pros, cons, company culture, and assess your skills match including gaps before committing.",
  },
  {
    icon: FileText,
    title: "Application Tracking",
    description:
      "Log every detail of your application — method, CV used, cover letter, referral contact, and follow-up dates with overdue alerts.",
  },
  {
    icon: Bell,
    title: "Follow-up Reminders",
    description:
      "Never go silent after applying. Schedule follow-ups with quick +3 or +7 day shortcuts and track which ones are overdue.",
  },
  {
    icon: TrendingUp,
    title: "Interview Management",
    description:
      "Track every interview round with type, outcome, rating, and notes. Manage your prep — topics, questions to ask, and next steps.",
  },
  {
    icon: Scale,
    title: "Offer Evaluation",
    description:
      "Break down compensation with salary, equity, and bonuses. Weigh pros and cons and record your final decision with a timestamp.",
  },
  {
    icon: HeartHandshake,
    title: "Rejection Reflection",
    description:
      "Turn rejections into growth. Log the stage, reason, feedback received, lessons learned, and whether you'd reapply in the future.",
  },
  {
    icon: FolderOpen,
    title: "Document Manager",
    description:
      "Upload and manage your CVs and cover letters. Set defaults and track exactly which version you sent to each application.",
  },
  {
    icon: Trophy,
    title: "Stage History",
    description:
      "As a job moves forward, all previous stage data stays accessible in collapsed sections — full context without the clutter.",
  },
] as const;
