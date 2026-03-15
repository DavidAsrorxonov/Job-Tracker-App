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
    <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(var(--primary),0.08),transparent_35%)]" />

      <div className="grid gap-6 lg:grid-cols-5 lg:items-start lg:h-[calc(100vh-8rem)] overflow-hidden">
        <aside className="lg:col-span-2 h-full min-h-0">
          <div className="h-full space-y-4">
            <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-6 backdrop-blur-xl md:p-8">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent" />

              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Activity Timeline
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {job.data.position}
                  </h1>
                  <p className="text-sm text-muted-foreground md:text-base">
                    {job.data.company}
                  </p>

                  {appliedDate && (
                    <p className="text-sm text-muted-foreground/80">
                      Applied on {format(appliedDate, "MMM d, yyyy")}
                      {daysSinceApplied !== null &&
                        ` · ${daysSinceApplied} days ago`}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-3">
              {stats.map(({ icon: Icon, label, value, color, bg }) => (
                <div
                  key={label}
                  className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                >
                  <div
                    className={cn(
                      "absolute -right-4 -top-4 h-16 w-16 rounded-full blur-2xl opacity-40",
                      bg,
                    )}
                  />

                  <div className="relative">
                    <div
                      className={cn(
                        "mb-3 flex h-9 w-9 items-center justify-center rounded-xl",
                        bg,
                      )}
                    >
                      <Icon className={cn("h-4 w-4", color)} />
                    </div>

                    <p className="text-2xl font-bold tracking-tight">{value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </aside>

        <main className="lg:col-span-3 h-full min-h-0">
          <section className="rounded-3xl border border-border/60 bg-card/30 p-4 backdrop-blur-sm md:p-6 h-full min-h-0 overflow-y-auto">
            <TimelineFeed timeline={timeline} />
          </section>
        </main>
      </div>
    </div>
  );
}
