import { UserDoc } from "@/types/user-documents";
import AppliedPanel, { IAppliedData } from "./applied-panel";
import { IWishlistData } from "@/lib/models/job-application";
import SectionDivider from "@/components/section-divider";
import { BookOpen, Route } from "lucide-react";
import WishlistDataDisplay from "../_wishlist/wishlist-data-display";

const AppliedSection = ({
  jobId,
  appliedData,
  cvDocs,
  wishlistData,
}: {
  jobId: string;
  appliedData?: IAppliedData;
  cvDocs: UserDoc[];
  wishlistData?: IWishlistData;
}) => {
  return (
    <div className="w-full">
      <SectionDivider
        icon={Route}
        title="Application Journey"
        description="Track how and when you applied."
      />

      <AppliedPanel jobId={jobId} appliedData={appliedData} cvDocs={cvDocs} />

      <SectionDivider
        icon={BookOpen}
        title="Quick Recap?"
        description="Your wishlist notes are below."
      />

      <WishlistDataDisplay wishlistData={wishlistData} />
    </div>
  );
};

export default AppliedSection;
