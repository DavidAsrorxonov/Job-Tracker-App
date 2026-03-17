"use client";

import { useState } from "react";
import AddInterviewCTA from "./add-interview-cta";
import InterviewDetailsSheet from "./interview-details-sheet";
import InterviewCard from "./interview-card";
import InterviewPrepPanel from "./interview-prep-panel";
import { IInterviewData, IWishlistData } from "@/lib/models/job-application";
import SectionDivider from "@/components/section-divider";
import {
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  FileUser,
  NotebookPen,
} from "lucide-react";
import { IAppliedData } from "../_applied/applied-panel";
import AppliedDataDisplay from "../_applied/applied-data-display";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import WishlistDataDisplay from "../_wishlist/wishlist-data-display";
import { SingleInterview } from "@/config/interview-details-sheet-type";

const InterviewSection = ({
  jobId,
  interviewData,
  appliedData,
  wishlistData,
}: {
  jobId: string;
  interviewData: IInterviewData;
  appliedData: IAppliedData;
  wishlistData?: IWishlistData;
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] =
    useState<SingleInterview | null>(null);

  const handleEdit = (interview: SingleInterview) => {
    setSelectedInterview(interview);
    setSheetOpen(true);
  };

  const handleAdd = () => {
    setSelectedInterview(null);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-4">
      <SectionDivider
        icon={NotebookPen}
        title="Interview Prep"
        description="Notes and topics to prepare before your interviews."
      />

      <InterviewPrepPanel
        jobId={jobId}
        prepNotes={interviewData?.prepNotes}
        questionsToAsk={interviewData?.questionsToAsk}
        technicalTopics={interviewData?.technicalTopics}
        nextSteps={interviewData?.nextSteps}
      />

      <SectionDivider
        icon={CalendarCheck}
        title="Your Interviews"
        description="Track each round below."
      />

      <div>
        {interviewData?.interviews?.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {interviewData.interviews.map((interview, index) => (
              <div key={interview._id?.toString()} className="relative">
                <div className="absolute -top-2 -left-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="text-[10px] font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                </div>
                <InterviewCard
                  interviewData={interview}
                  jobId={jobId}
                  onClick={() => handleEdit(interview)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic text-center py-4">
            No interviews yet. Add your first one below.
          </p>
        )}

        <div className="mt-3">
          <AddInterviewCTA onAdd={handleAdd} />
        </div>
      </div>

      <SectionDivider
        icon={FileUser}
        title="Applied Details"
        description="Track how and when you applied."
      />

      <Collapsible>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors group">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Applied Details</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <AppliedDataDisplay appliedData={appliedData} />
        </CollapsibleContent>
      </Collapsible>

      <SectionDivider
        icon={BookOpen}
        title="Wishlist Details"
        description="Your wishlist notes are below."
      />

      <Collapsible>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors group">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Wishlist Details</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <WishlistDataDisplay wishlistData={wishlistData} />
        </CollapsibleContent>
      </Collapsible>

      <InterviewDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        interviewData={selectedInterview}
        jobId={jobId}
      />
    </div>
  );
};

export default InterviewSection;
