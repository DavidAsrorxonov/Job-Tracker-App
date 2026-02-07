import { getJobApplicationById } from "@/lib/actions/job-applications";

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
      <pre>{JSON.stringify(result.data, null, 2)}</pre>
    </div>
  );
}
