"use client";

import { ITimelineEntry } from "@/lib/models/job-application";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, isToday, isYesterday, formatDistanceToNow } from "date-fns";
import {
  GitBranch,
  Bell,
  CalendarDays,
  Zap,
  Activity,
  Clock3,
} from "lucide-react";

const typeConfig: Record<
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

function DayMarker({
  label,
  date,
  count,
}: {
  label: string;
  date: Date;
  count: number;
}) {
  return (
    <div className="relative pl-16">
      <div className="absolute left-[1.1rem] top-1.5 h-4 w-4 rounded-full border border-border bg-background shadow-sm" />
      <div className="absolute left-[1.55rem] top-6 -bottom-8 w-px bg-linear-to-b from-border via-border/40 to-transparent" />

      <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 backdrop-blur-sm shadow-sm">
        <span className="text-xs font-semibold text-foreground">{label}</span>
        <span className="text-[10px] text-muted-foreground">
          {format(date, "yyyy")}
        </span>
        <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
        <span className="text-[10px] text-muted-foreground">
          {count} event{count > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

function EntryCard({
  entry,
  isLast,
}: {
  entry: ITimelineEntry;
  isLast: boolean;
}) {
  const config = typeConfig[entry.type];
  const Icon = config.icon;
  const date = new Date(entry.date);

  return (
    <div className="relative pl-16 group">
      {!isLast && (
        <div className="absolute left-6 top-10 -bottom-6 w-px bg-linear-to-b from-border via-border/50 to-transparent" />
      )}

      <div className="absolute left-[0.92rem] top-5">
        <div
          className={cn(
            "relative flex h-5 w-5 items-center justify-center rounded-full border-4 border-background transition-transform duration-300 group-hover:scale-110",
            config.dot,
            config.glow,
          )}
        >
          <div className="absolute h-2 w-2 rounded-full bg-white/80" />
        </div>
      </div>

      <div className="absolute left-8 top-[1.7rem] h-px w-6 bg-linear-to-r from-border to-transparent" />

      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/70 backdrop-blur-xl transition-all duration-300 hover:border-border hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-1 bg-linear-to-b",
            config.accentLine,
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-linear-to-br opacity-70",
            config.softBg,
          )}
        />

        <div className="relative px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border/50 bg-background/70">
                  <Icon className="h-4 w-4 text-foreground/80" />
                </div>

                <Badge
                  variant="outline"
                  className={cn(
                    "h-6 rounded-full px-2.5 text-[11px]",
                    config.badgeClass,
                  )}
                >
                  {config.label}
                </Badge>

                {entry.automated && (
                  <Badge
                    variant="outline"
                    className="h-6 rounded-full border-muted-foreground/20 bg-muted/40 px-2.5 text-[11px] text-muted-foreground"
                  >
                    automated
                  </Badge>
                )}
              </div>

              <h3 className="text-sm font-semibold leading-6 text-foreground">
                {entry.action}
              </h3>

              {entry.description && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {entry.description}
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1 rounded-xl border border-border/40 bg-background/60 px-3 py-2 text-right">
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground/80">
                <Clock3 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="tabular-nums">{format(date, "h:mm a")}</span>
              </div>
              <span className="text-[11px] text-muted-foreground">
                {formatDistanceToNow(date, { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TimelineFeed = ({ timeline }: { timeline: ITimelineEntry[] }) => {
  if (timeline.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-dashed border-border/60 bg-card/40 px-6 py-16">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent" />
        <div className="relative flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-background/70 shadow-sm">
            <Activity className="h-7 w-7 text-muted-foreground/40" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground/80">
              No timeline activity yet
            </p>
            <p className="mx-auto max-w-sm text-sm text-muted-foreground">
              As this job moves forward, status updates, interviews, and
              follow-ups will appear here in chronological order.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const groups = groupByDay(timeline);

  return (
    <div className="relative">
      <div className="space-y-10">
        {groups.map((group, gi) => (
          <section key={gi} className="space-y-4">
            <DayMarker
              label={group.label}
              date={group.date}
              count={group.entries.length}
            />

            <div className="space-y-4">
              {group.entries.map((entry, ei) => (
                <EntryCard
                  key={entry._id?.toString() ?? `${gi}-${ei}`}
                  entry={entry}
                  isLast={ei === group.entries.length - 1}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TimelineFeed;
