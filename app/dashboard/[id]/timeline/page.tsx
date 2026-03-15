import { notFound } from "next/navigation";
import TimelineFeed from "./_components/timeline-feed";
import { differenceInDays, format } from "date-fns";
import { ITimelineEntry } from "@/lib/models/job-application";
import { Activity, GitBranch, CalendarDays, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { getJobApplicationById } from "@/lib/actions/job-applications";

export default async function TimelinePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const job = await getJobApplicationById(id);
  if (!job) notFound();
  if ("error" in job || !job.data) notFound();

  const timeline: ITimelineEntry[] = (job.data?.timeline ?? [])
    .map((e: any) => ({
      ...e,
      _id: e._id?.toString(),
      date: new Date(e.date),
    }))
    .sort(
      (a: ITimelineEntry, b: ITimelineEntry) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  const appliedDate = job.data.appliedData?.appliedDate
    ? new Date(job.data.appliedData.appliedDate)
    : null;

  const daysSinceApplied = appliedDate
    ? differenceInDays(new Date(), appliedDate)
    : null;

  const stats = [
    {
      icon: Activity,
      label: "Total Events",
      value: timeline.length,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: GitBranch,
      label: "Stage Changes",
      value: timeline.filter((e) => e.type === "status_change").length,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: CalendarDays,
      label: "Interviews",
      value: timeline.filter((e) => e.type === "interview").length,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: Bell,
      label: "Follow-ups",
      value: timeline.filter((e) => e.type === "follow_up").length,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-6 rounded-full bg-primary" />
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Activity Timeline
          </p>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {job.data.position}
          </h1>
          <p className="text-muted-foreground mt-0.5">
            {job.data.company}
            {appliedDate && (
              <span className="text-muted-foreground/50 text-sm ml-2">
                · Applied {format(appliedDate, "MMM d, yyyy")}
                {daysSinceApplied !== null && ` · ${daysSinceApplied} days ago`}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div
            key={label}
            className="relative rounded-xl border border-border/50 bg-card/50 px-4 py-4 overflow-hidden group hover:border-border/80 transition-colors"
          >
            <div
              className={cn(
                "absolute -top-3 -right-3 h-12 w-12 rounded-full opacity-20 blur-xl transition-opacity group-hover:opacity-40",
                bg,
              )}
            />
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-lg mb-3",
                bg,
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", color)} />
            </div>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <TimelineFeed timeline={timeline} />
    </div>
  );
}
