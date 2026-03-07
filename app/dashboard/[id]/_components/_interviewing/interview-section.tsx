"use client";

import { useState } from "react";
import AddInterviewCTA from "./add-interview-cta";
import InterviewDetailsSheet from "./interview-details-sheet";
import InterviewCard, { SingleInterview } from "./interview-card";
import InterviewPrepPanel from "./interview-prep-panel";
import { IInterviewData } from "@/lib/models/job-application";
import SectionDivider from "@/components/section-divider";
import { CalendarCheck, NotebookPen } from "lucide-react";

const InterviewSection = ({
  jobId,
  interviewData,
}: {
  jobId: string;
  interviewData: IInterviewData;
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
