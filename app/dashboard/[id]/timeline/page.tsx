import { getJobApplicationById } from "@/lib/actions/job-applications";
import { ITimelineEntry } from "@/lib/models/job-application";
import { notFound } from "next/navigation";

export default async function TimelinePage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJobApplicationById(params.id);
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
}
