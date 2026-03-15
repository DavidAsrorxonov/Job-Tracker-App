import { ITimelineEntry } from "@/lib/models/job-application";
import { Bell, CalendarDays, GitBranch, Zap } from "lucide-react";

export const typeConfig: Record<
  ITimelineEntry["type"],
  {
    icon: React.ElementType;
    label: string;
    dot: string;
    glow: string;
    badgeClass: string;
    accentLine: string;
    softBg: string;
  }
> = {
  status_change: {
    icon: GitBranch,
    label: "Stage Change",
    dot: "bg-blue-500",
    glow: "shadow-[0_0_0_6px_rgba(59,130,246,0.12)]",
    badgeClass: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    accentLine: "from-blue-500/70 to-blue-500/0",
    softBg: "from-blue-500/10 via-blue-500/5 to-transparent",
  },
  interview: {
    icon: CalendarDays,
    label: "Interview",
    dot: "bg-emerald-500",
    glow: "shadow-[0_0_0_6px_rgba(16,185,129,0.12)]",
    badgeClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    accentLine: "from-emerald-500/70 to-emerald-500/0",
    softBg: "from-emerald-500/10 via-emerald-500/5 to-transparent",
  },
  follow_up: {
    icon: Bell,
    label: "Follow-up",
    dot: "bg-amber-500",
    glow: "shadow-[0_0_0_6px_rgba(245,158,11,0.12)]",
    badgeClass: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    accentLine: "from-amber-500/70 to-amber-500/0",
    softBg: "from-amber-500/10 via-amber-500/5 to-transparent",
  },
  other: {
    icon: Zap,
    label: "Other",
    dot: "bg-slate-400",
    glow: "shadow-[0_0_0_6px_rgba(148,163,184,0.10)]",
    badgeClass: "border-slate-500/20 bg-slate-500/10 text-slate-300",
    accentLine: "from-slate-400/50 to-slate-400/0",
    softBg: "from-slate-400/10 via-slate-400/5 to-transparent",
  },
};
