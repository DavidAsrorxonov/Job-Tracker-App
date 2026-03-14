"use client";

import { ITimelineEntry } from "@/lib/models/job-application";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format, isToday, isYesterday } from "date-fns";
import { GitBranch, Bell, CalendarDays, Zap, Circle } from "lucide-react";

const typeConfig: Record<
  ITimelineEntry["type"],
  { icon: React.ElementType; color: string; badgeClass: string; label: string }
> = {
  status_change: {
    icon: GitBranch,
    color: "bg-primary/10 text-primary",
    badgeClass: "border-primary/30 text-primary bg-primary/10",
    label: "Stage",
  },
  interview: {
    icon: CalendarDays,
    color: "bg-emerald-500/10 text-emerald-600",
    badgeClass: "border-emerald-500/30 text-emerald-600 bg-emerald-500/10",
    label: "Interview",
  },
  follow_up: {
    icon: Bell,
    color: "bg-amber-500/10 text-amber-600",
    badgeClass: "border-amber-500/30 text-amber-600 bg-amber-500/10",
    label: "Follow-up",
  },
  other: {
    icon: Zap,
    color: "bg-muted text-muted-foreground",
    badgeClass: "border-border text-muted-foreground",
    label: "Other",
  },
};

function formatDateLabel(date: Date) {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMMM d, yyyy");
}

function groupByDay(entries: ITimelineEntry[]) {
  const groups: { label: string; entries: ITimelineEntry[] }[] = [];
  const map = new Map<string, ITimelineEntry[]>();

  for (const entry of entries) {
    const key = format(new Date(entry.date), "yyyy-MM-dd");
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(entry);
  }

  for (const [, dayEntries] of map) {
    groups.push({
      label: formatDateLabel(new Date(dayEntries[0].date)),
      entries: dayEntries,
    });
  }

  return groups;
}

const TimelineFeed = ({ timeline }: { timeline: ITimelineEntry[] }) => {
  if (timeline.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <Circle
          className="h-12 w-12 text-muted-foreground/20"
          strokeWidth={1}
        />
        <p className="text-sm font-medium text-muted-foreground">
          No activity yet.
        </p>
        <p className="text-xs text-muted-foreground/60 max-w-48">
          Events will appear here as you update this job.
        </p>
      </div>
    );
  }

  const groups = groupByDay(timeline);

  return (
    <div className="space-y-6">
      {groups.map((group, gi) => (
        <div key={gi} className="space-y-3">
          <div className="flex items-center gap-3">
            <p className="text-xs font-semibold text-muted-foreground shrink-0">
              {group.label}
            </p>
            <Separator className="flex-1" />
          </div>

          <div className="space-y-2">
            {group.entries.map((entry, ei) => {
              const config = typeConfig[entry.type];
              const Icon = config.icon;

              return (
                <div
                  key={entry._id?.toString() ?? ei}
                  className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/10 px-4 py-3.5 hover:bg-muted/20 transition-colors"
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                      config.color,
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="text-sm font-medium">{entry.action}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs font-normal py-0",
                            config.badgeClass,
                          )}
                        >
                          {config.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(entry.date), "h:mm a")}
                        </span>
                      </div>
                    </div>
                    {entry.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {entry.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineFeed;
