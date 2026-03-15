"use client";

import { ITimelineEntry } from "@/lib/models/job-application";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, isToday, isYesterday, formatDistanceToNow } from "date-fns";
import { GitBranch, Bell, CalendarDays, Zap, Activity } from "lucide-react";

const typeConfig: Record<
  ITimelineEntry["type"],
  {
    icon: React.ElementType;
    gradient: string;
    glow: string;
    badgeClass: string;
    label: string;
    lineColor: string;
  }
> = {
  status_change: {
    icon: GitBranch,
    gradient: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/40",
    badgeClass: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    label: "Stage Change",
    lineColor: "from-blue-500/40 to-transparent",
  },
  interview: {
    icon: CalendarDays,
    gradient: "from-emerald-500 to-teal-400",
    glow: "shadow-emerald-500/40",
    badgeClass: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    label: "Interview",
    lineColor: "from-emerald-500/40 to-transparent",
  },
  follow_up: {
    icon: Bell,
    gradient: "from-amber-500 to-orange-400",
    glow: "shadow-amber-500/40",
    badgeClass: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    label: "Follow-up",
    lineColor: "from-amber-500/40 to-transparent",
  },
  other: {
    icon: Zap,
    gradient: "from-slate-400 to-slate-300",
    glow: "shadow-slate-400/20",
    badgeClass: "border-slate-500/30 text-slate-400 bg-slate-500/10",
    label: "Other",
    lineColor: "from-slate-500/30 to-transparent",
  },
};

function formatDateLabel(date: Date) {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEEE, MMMM d");
}

function groupByDay(entries: ITimelineEntry[]) {
  const map = new Map<string, ITimelineEntry[]>();
  for (const entry of entries) {
    const key = format(new Date(entry.date), "yyyy-MM-dd");
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(entry);
  }
  return Array.from(map.entries()).map(([, dayEntries]) => ({
    label: formatDateLabel(new Date(dayEntries[0].date)),
    date: new Date(dayEntries[0].date),
    entries: dayEntries,
  }));
}

function EntryCard({
  entry,
  index,
  isLast,
}: {
  entry: ITimelineEntry;
  index: number;
  isLast: boolean;
}) {
  const config = typeConfig[entry.type];
  const Icon = config.icon;
  const date = new Date(entry.date);

  return (
    <div
      className="relative flex gap-4 group"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {!isLast && (
        <div className="absolute left-4.75top-10 bottom-0 w-px bg-linear-to-b from-border/60 to-transparent" />
      )}

      <div className="relative shrink-0 mt-1">
        <div
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br shadow-lg transition-transform duration-300 group-hover:scale-110",
            config.gradient,
            config.glow,
          )}
        >
          <Icon className="h-4 w-4 text-white" />
          <div
            className={cn(
              "absolute inset-0 rounded-full bg-linear-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm scale-150",
              config.gradient,
            )}
          />
        </div>
      </div>

      <div className="flex-1 min-w-0 pb-6">
        <div
          className={cn(
            "rounded-xl border bg-card/50 backdrop-blur-sm px-4 py-3.5 transition-all duration-300",
            "border-border/40 hover:border-border/80 hover:bg-card/80",
            "group-hover:shadow-lg group-hover:shadow-black/5",
          )}
        >
          <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-foreground leading-tight">
                {entry.action}
              </p>
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] font-medium py-0 h-4",
                  config.badgeClass,
                )}
              >
                {config.label}
              </Badge>
              {entry.automated && (
                <Badge
                  variant="outline"
                  className="text-[10px] font-normal py-0 h-4 border-muted-foreground/20 text-muted-foreground/60"
                >
                  auto
                </Badge>
              )}
            </div>
            <div className="flex flex-col items-end shrink-0 gap-0.5">
              <span className="text-xs font-medium text-muted-foreground tabular-nums">
                {format(date, "h:mm a")}
              </span>
              <span className="text-[10px] text-muted-foreground/50">
                {formatDistanceToNow(date, { addSuffix: true })}
              </span>
            </div>
          </div>

          {entry.description && (
            <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 border-t border-border/30 pt-1.5">
              {entry.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const TimelineFeed = ({ timeline }: { timeline: ITimelineEntry[] }) => {
  if (timeline.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center">
            <Activity className="h-7 w-7 text-muted-foreground/30" />
          </div>
          <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-muted-foreground">
            No activity yet
          </p>
          <p className="text-xs text-muted-foreground/50 max-w-48">
            Events will appear here as you update this job application.
          </p>
        </div>
      </div>
    );
  }

  const groups = groupByDay(timeline);

  return (
    <div className="space-y-8">
      {groups.map((group, gi) => (
        <div key={gi} className="space-y-0">
          <div className="flex items-center gap-3 mb-4 sticky top-0 z-10 py-2">
            <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 pl-3 pr-4 py-1.5 shadow-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              <span className="text-xs font-semibold text-foreground/80 tracking-wide">
                {group.label}
              </span>
              <span className="text-[10px] text-muted-foreground/60 tabular-nums">
                {format(group.date, "yyyy")}
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-r from-border/50 to-transparent" />
            <span className="text-[10px] text-muted-foreground/40 shrink-0">
              {group.entries.length} event{group.entries.length > 1 ? "s" : ""}
            </span>
          </div>

          <div>
            {group.entries.map((entry, ei) => (
              <EntryCard
                key={entry._id?.toString() ?? `${gi}-${ei}`}
                entry={entry}
                index={ei}
                isLast={ei === group.entries.length - 1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineFeed;
