import { getJobApplicationById } from "@/lib/actions/job-applications";
import JobDetailsHeader from "./_components/job-details-header";
import TasksPanel from "./_components/tasks-panel";
import RemindersPanel from "./_components/reminders-panel";
import "./_styles/panel.css";

export default async function JobDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getJobApplicationById(id);

  if ("error" in result) return <div>{result.error}</div>;

  return (
    <div className="parent pt-3">
      <JobDetailsHeader job={result.data} />

      <TasksPanel />
      <RemindersPanel />
    </div>
  );
}
