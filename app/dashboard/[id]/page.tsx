import { getJobApplicationById } from "@/lib/actions/job-applications";
import JobDetailsHeader from "./_components/job-details-header";
import "./_styles/panel.css";
import NotesAndDescriptionPanel from "./_components/notes-and-desc-panel";
import WishlistPanel from "./_components/_wishlist/wishlist-panel";
import AppliedPanel from "./_components/_applied/applied-panel";
import WishlistDataDisplay from "./_components/_wishlist/wishlist-data-display";
import WishlistReminderBanner from "./_components/_wishlist/wishlist-reminder-banner";

export default async function JobDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getJobApplicationById(id);
  const { data, error } = result;

  if ("error" in result) return <div>{error as string}</div>;

  const testResumeData = [
    { id: "1", value: "Resume 1", label: "Resume 1" },
    { id: "2", value: "Resume 2", label: "Resume 2" },
  ];

  const saveData = () => {};

  return (
    <div>
      <div className="flex flex-col gap-4 pt-3">
        <div className="w-full">
          <JobDetailsHeader job={data} />
        </div>

        <div className="w-full flex gap-2 px-4 pb-10">
          {(data.status === "wish-list" || data.status === "Wish List") && (
            <WishlistPanel jobId={data._id} wishlistData={data.wishlistData} />
          )}

          {(data.status === "applied" || data.status === "Applied") && (
            <div className="w-full">
              <AppliedPanel
                jobId={data._id}
                appliedData={data.appliedData}
                resumes={testResumeData}
              />

              <WishlistReminderBanner />

              <WishlistDataDisplay wishlistData={data.wishlistData} />
            </div>
          )}

          <div className="max-w-md">
            <NotesAndDescriptionPanel
              description={data.description}
              notes={data.notes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
