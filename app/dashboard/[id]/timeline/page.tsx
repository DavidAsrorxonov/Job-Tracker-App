import { notFound } from "next/navigation";
import TimelineFeed from "./_components/timeline-feed";
import { ITimelineEntry } from "@/lib/models/job-application";
import { getJobApplicationById } from "@/lib/actions/job-applications";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChartWrapper from "./_components/charts-wrapper";
import TimelineStats from "./_components/timeline-stats";

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

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(var(--primary),0.08),transparent_35%)]" />

      <div className="grid gap-6 lg:grid-cols-5 lg:items-start lg:h-[calc(100vh-8rem)] overflow-hidden">
        <TimelineStats job={job} timeline={timeline} />

        <main className="lg:col-span-3 h-full min-h-0">
          <TimelineFeed timeline={timeline} />
        </main>
      </div>
      <ChartWrapper timeline={timeline} />
    </div>
  );
}
