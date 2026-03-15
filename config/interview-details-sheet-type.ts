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

export const typeOptions: {
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

export const outcomeOptions = [
  { value: "passed", label: "Passed" },
  { value: "waiting", label: "Waiting" },
  { value: "failed", label: "Failed" },
];
