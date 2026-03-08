"use client";

import { IInterviewData } from "@/lib/models/job-application";
import {
  Brain,
  CheckCircle2,
  Clock,
  Code2,
  HelpCircle,
  Phone,
  Trophy,
  UserCheck,
  XCircle,
} from "lucide-react";

type SingleInterview = IInterviewData["interviews"][number];

const typeConfig: Record<
  SingleInterview["type"],
  { label: string; icon: React.ElementType }
> = {
  phone_screen: { label: "Phone Screen", icon: Phone },
  technical: { label: "Technical", icon: Code2 },
  behavioral: { label: "Behavioral", icon: Brain },
  hiring_manager: { label: "Hiring Manager", icon: UserCheck },
  final: { label: "Final Round", icon: Trophy },
  other: { label: "Other", icon: HelpCircle },
};

const outcomeConfig = {
  passed: {
    label: "Passed",
    className: "border-emerald-500/30 text-emerald-600 bg-emerald-500/10",
    icon: CheckCircle2,
  },
  waiting: {
    label: "Waiting",
    className: "border-amber-500/30 text-amber-600 bg-amber-500/10",
    icon: Clock,
  },
  failed: {
    label: "Failed",
    className: "border-destructive/30 text-destructive bg-destructive/10",
    icon: XCircle,
  },
};

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="flex items-center gap-2 w-32 shrink-0 text-muted-foreground">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span className="text-xs">{label}</span>
      </div>
      <div className="flex-1 text-foreground">{children}</div>
    </div>
  );
}

const InterviewDataDisplay = ({
  interviewData,
}: {
  interviewData?: IInterviewData;
}) => {
  return <div>InterviewDataDisplay</div>;
};

export default InterviewDataDisplay;
