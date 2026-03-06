"use client";

import { useState } from "react";
import AddInterviewCTA from "./add-interview-cta";
import InterviewDetailsSheet from "./interview-details-sheet";
import InterviewCard, { SingleInterview } from "./interview-card";
import InterviewPrepPanel from "./interview-prep-panel";
import { IInterviewData } from "@/lib/models/job-application";

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
      <InterviewPrepPanel
        jobId={jobId}
        prepNotes={interviewData?.prepNotes}
        questionsToAsk={interviewData?.questionsToAsk}
        technicalTopics={interviewData?.technicalTopics}
        nextSteps={interviewData?.nextSteps}
      />

      <div className="space-y-2">
        {interviewData?.interviews?.length > 0 ? (
          interviewData.interviews.map((interview) => (
            <InterviewCard
              key={interview._id?.toString()}
              interviewData={interview}
              onClick={() => handleEdit(interview)}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground italic text-center py-4">
            No interviews yet. Add your first one below.
          </p>
        )}
        <AddInterviewCTA onAdd={handleAdd} />
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
