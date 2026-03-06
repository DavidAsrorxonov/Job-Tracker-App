"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SingleInterview } from "./interview-card";
import {
  Brain,
  Code2,
  HelpCircle,
  Phone,
  Trophy,
  UserCheck,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const typeOptions: {
  value: SingleInterview["type"];
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "phone_screen", label: "Phone Screen", icon: Phone },
  { value: "technical", label: "Technical", icon: Code2 },
  { value: "behavioral", label: "Behavioral", icon: Brain },
  { value: "hiring_manager", label: "Hiring Manager", icon: UserCheck },
  { value: "final", label: "Final Round", icon: Trophy },
  { value: "other", label: "Other", icon: HelpCircle },
];

const outcomeOptions = [
  { value: "passed", label: "Passed" },
  { value: "waiting", label: "Waiting" },
  { value: "failed", label: "Failed" },
];

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

const emptyInterview: Omit<SingleInterview, "_id"> = {
  type: "phone_screen",
  scheduledDate: undefined,
  completedDate: undefined,
  duration: undefined,
  interviewer: "",
  notes: "",
  questionsAsked: [],
  outcome: undefined,
  rating: undefined,
};

const InterviewDetailsSheet = ({
  open,
  onOpenChange,
  interviewData,
  jobId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interviewData: SingleInterview | null;
  jobId: string;
}) => {
  const isEditingMode = Boolean(interviewData);

  const [saving, setSaving] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>Details</SheetContent>
    </Sheet>
  );
};

export default InterviewDetailsSheet;
