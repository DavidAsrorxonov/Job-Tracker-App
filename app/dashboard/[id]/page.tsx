import { getJobApplicationById } from "@/lib/actions/job-applications";
import JobDetailsHeader from "./_components/job-details-header";
import "./_styles/panel.css";
import NotesAndDescriptionPanel from "./_components/notes-and-desc-panel";
import WishlistPanel from "./_components/_wishlist/wishlist-panel";
import AppliedPanel from "./_components/_applied/applied-panel";
import WishlistDataDisplay from "./_components/_wishlist/wishlist-data-display";
import WishlistReminderBanner from "./_components/_wishlist/wishlist-reminder-banner";
import { getUserDocumentsForPage } from "@/lib/documents/get-user-documents";
import { UserDoc } from "@/types/user-documents";

export default async function JobDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [{ docs }, result] = await Promise.all([
    getUserDocumentsForPage(),
    getJobApplicationById(id),
  ]);

  const cvDocs: UserDoc[] = docs
    .filter((d) => d.type === "cv")
    .map((d) => ({
      _id: d._id.toString(),
      type: d.type,
      path: d.path,
      originalName: d.originalName,
      createdAt: d.createdAt.toISOString(),
      isDefault: d.isDefault,
    }));
  const { data, error } = result;

  if ("error" in result) return <div>{error as string}</div>;

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
                cvDocs={cvDocs}
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
