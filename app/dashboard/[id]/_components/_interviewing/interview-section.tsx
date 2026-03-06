"use client";

import { useState } from "react";
import AddInterviewCTA from "./add-interview-cts";
import InterviewDetailsSheet from "./interview-details-sheet";

const InterviewSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AddInterviewCTA onAdd={() => setOpen(true)} />
      <InterviewDetailsSheet />
    </>
  );
};

export default InterviewSection;
