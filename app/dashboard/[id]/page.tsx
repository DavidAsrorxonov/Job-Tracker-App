import { getJobApplicationById } from "@/lib/actions/job-applications";
import JobDetailsHeader from "./_components/job-details-header";
import "./_styles/panel.css";
import NotesAndDescriptionPanel from "./_components/notes-and-desc-panel";
import WishlistPanel from "./_components/_wishlist/wishlist-panel";

export default async function JobDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getJobApplicationById(id);
  const { data, error } = result;

  if ("error" in result) return <div>{error}</div>;

  return (
    <div>
      <div className="parent pt-3">
        <JobDetailsHeader job={data} />

        <NotesAndDescriptionPanel
          description={data.description}
          notes={data.notes}
        />

        {data.status === "wish-list" ||
          (data.status === "Wish List" && (
            <WishlistPanel jobId={data._id} wishlistData={data.wishlistData} />
          ))}
      </div>
    </div>
  );
}
