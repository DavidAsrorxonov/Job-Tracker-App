"use client";

import { useState } from "react";
import AddInterviewCTA from "./add-interview-cta";
import InterviewDetailsSheet from "./interview-details-sheet";
import InterviewCard, { SingleInterview } from "./interview-card";

const InterviewSection = () => {
  const [open, setOpen] = useState(false);

  const mockInterview: SingleInterview = {
    type: "technical",
    scheduledDate: new Date("2026-03-10T14:00:00"),
    completedDate: new Date("2026-03-10T15:30:00"),
    duration: 90,
    interviewer: "Mike Chen (Senior Engineer)",
    notes:
      "Heavy focus on system design. Got a bit stuck on the distributed cache question but recovered well.",
    questionsAsked: ["Design a URL shortener", "Explain CAP theorem"],
    outcome: "passed",
    rating: 4,
  };

  return (
    <>
      <AddInterviewCTA onAdd={() => setOpen(true)} />

      <InterviewCard
        interviewData={mockInterview}
        onClick={() => console.log("clicked")}
      />
      <InterviewDetailsSheet open={open} onOpenChange={setOpen} />
    </>
  );
};

export default InterviewSection;
