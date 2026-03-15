"use client";

import { ITimelineEntry } from "@/lib/models/job-application";
import { format, isToday, isYesterday } from "date-fns";
import { Activity } from "lucide-react";
import DayMarker from "./day-marker";
import EntryCard from "./entry-card";

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
