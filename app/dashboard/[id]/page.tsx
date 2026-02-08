import { getJobApplicationById } from "@/lib/actions/job-applications";
import JobDetailsHeader from "./_components/job-details-header";

export default async function JobDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getJobApplicationById(id);

  if ("error" in result) return <div>{result.error}</div>;

  return (
    <div>
      <JobDetailsHeader job={result.data} />
    </div>
  );
}
