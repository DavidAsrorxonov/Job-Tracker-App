import { getJobApplicationById } from "@/lib/actions/job-applications";
import JobDetailsHeader from "./_components/job-details-header";
import "./_styles/panel.css";
import NotesAndDescriptionPanel from "./_components/notes-and-desc-panel";
import WishlistPanel from "./_components/_wishlist/wishlist-panel";
import { getUserDocumentsForPage } from "@/lib/documents/get-user-documents";
import { UserDoc } from "@/types/user-documents";
import InterviewSection from "./_components/_interviewing/interview-section";
import AppliedSection from "./_components/_applied/applied-section";
import OfferSection from "./_components/_offer/offer-section";
import RejectedSection from "./_components/_rejected/rejection-section";

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

  if ("error" in result) return <div>{result.error as string}</div>;

  const { data } = result;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 pt-3">
        <div className="w-full">
          <JobDetailsHeader job={data} />
        </div>

        <div className="px-4 pb-10 sm:px-6">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
            <div className="min-w-0">
              {(data.status === "wish-list" || data.status === "Wish List") && (
                <WishlistPanel
                  jobId={data._id}
                  wishlistData={data.wishlistData}
                />
              )}

              {(data.status === "applied" || data.status === "Applied") && (
                <AppliedSection
                  jobId={data._id}
                  appliedData={data.appliedData}
                  wishlistData={data.wishlistData}
                  cvDocs={cvDocs}
                />
              )}

              {(data.status === "interviewing" ||
                data.status === "Interviewing") && (
                <InterviewSection
                  jobId={data._id}
                  interviewData={data.interviewData}
                  appliedData={data.appliedData}
                  wishlistData={data.wishlistData}
                />
              )}

              {(data.status === "offer" || data.status === "Offer") && (
                <OfferSection
                  jobId={data._id}
                  offerData={data.offerData}
                  appliedData={data.appliedData}
                  wishlistData={data.wishlistData}
                  interviewData={data.interviewData}
                />
              )}

              {(data.status === "rejected" || data.status === "Rejected") && (
                <RejectedSection
                  jobId={data._id}
                  rejectedData={data.rejectedData}
                />
              )}
            </div>

            <aside className="min-w-0 xl:sticky xl:top-32 xl:self-start">
              <NotesAndDescriptionPanel
                description={data.description}
                notes={data.notes}
              />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
