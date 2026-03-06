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
import { useEffect, useState } from "react";
import { upsertSingleInterview } from "@/lib/actions/interviewing";
import { toast } from "sonner";

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
  const [data, setData] = useState<Omit<SingleInterview, "_id">>(
    interviewData ?? emptyInterview,
  );

  useEffect(() => {
    setData(interviewData ?? emptyInterview);
  }, [interviewData, open]);

  function updateData(
    updater: (p: Omit<SingleInterview, "_id">) => Omit<SingleInterview, "_id">,
  ) {
    setData(updater);
  }

  async function handleSave() {
    try {
      setSaving(true);
      await upsertSingleInterview(jobId, { ...data, _id: interviewData?._id });
      toast.success(isEditingMode ? "Interview updated" : "Interview added", {
        duration: 2000,
        position: "top-center",
      });
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to save", {
        duration: 2000,
        description: "Something went wrong. Please try again",
        position: "top-center",
      });
      console.log(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>Details</SheetContent>
    </Sheet>
  );
};

export default InterviewDetailsSheet;
