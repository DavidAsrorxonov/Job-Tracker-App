"use client";

import { IOfferData } from "@/lib/models/job-application";
import { Brain, CheckCircle2, MessageSquare, XCircle } from "lucide-react";

type Decision = NonNullable<IOfferData["decision"]>;

const decisionConfig: Record<
  Decision,
  { label: string; icon: React.ElementType; className: string }
> = {
  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    className:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className:
      "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20",
  },
  negotiating: {
    label: "Negotiating",
    icon: MessageSquare,
    className:
      "border-amber-500/40 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20",
  },
  considering: {
    label: "Considering",
    icon: Brain,
    className:
      "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20",
  },
};

const DecisionPanel = () => {
  return <div>DecisionPanel</div>;
};

export default DecisionPanel;
