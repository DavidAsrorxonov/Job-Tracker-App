import { getJobApplicationById } from "@/lib/actions/job-applications";
import { ITimelineEntry } from "@/lib/models/job-application";
import { differenceInDays } from "date-fns";
import { notFound } from "next/navigation";
import TimelineFeed from "./_components/timeline-feed";

export default async function TimelinePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const job = await getJobApplicationById(id);
  if (!job) notFound();

  const timeline: ITimelineEntry[] = (job.data.timeline ?? [])
    .map((e: any) => ({
      ...e,
      _id: e?._id.toString(),
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

  const statusChanges = timeline.filter(
    (e) => e.type === "status_change",
  ).length;
  const interviews = timeline.filter((e) => e.type === "interview").length;
  const followUps = timeline.filter((e) => e.type === "follow_up").length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
          Activity
        </p>
        <h1 className="text-2xl font-bold tracking-tight">
          {job.data.position}
        </h1>
        <p className="text-sm text-muted-foreground">{job.data.company}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Events", value: timeline.length },
          {
            label: "Days Since Applied",
            value: daysSinceApplied !== null ? `${daysSinceApplied}d` : "—",
          },
          { label: "Stage Changes", value: statusChanges },
          { label: "Interviews", value: interviews },
          { label: "Follow Ups", value: followUps },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-border/60 bg-muted/20 px-4 py-3 space-y-1"
          >
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-xl font-bold tracking-tight">{value}</p>
          </div>
        ))}
      </div>

      <TimelineFeed timeline={timeline} />
    </div>
  );
}
