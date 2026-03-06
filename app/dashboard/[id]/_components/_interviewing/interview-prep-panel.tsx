"use client";

import { useState } from "react";

type IInterviewPrepData = {
  prepNotes?: string;
  questionsToAsk?: string[];
  technicalTopics?: string[];
  nextSteps?: string;
};

const InterviewPrepPanel = ({
  jobId,
  prepNotes,
  questionsToAsk,
  technicalTopics,
  nextSteps,
}: {
  jobId: string;
} & IInterviewPrepData) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const [data, setData] = useState<IInterviewPrepData>({
    prepNotes: prepNotes ?? "",
    questionsToAsk: questionsToAsk ?? [],
    technicalTopics: technicalTopics ?? [],
    nextSteps: nextSteps ?? "",
  });

  function updateData(updater: (p: IInterviewPrepData) => IInterviewPrepData) {
    setData(updater);
    setIsDirty(true);
  }

  return <div>InterviewPrepPanel</div>;
};

export default InterviewPrepPanel;
