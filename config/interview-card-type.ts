import { IInterviewData } from "@/lib/models/job-application";
import {
  Brain,
  Code2,
  HelpCircle,
  Phone,
  Trophy,
  UserCheck,
} from "lucide-react";

export type SingleInterview = IInterviewData["interviews"][number];

export const typeConfig: Record<
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

export const outcomeConfig = {
  passed: {
    label: "Passed",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  waiting: {
    label: "Waiting",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};
