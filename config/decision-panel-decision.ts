import { IOfferData } from "@/lib/models/job-application";
import { Brain, CheckCircle2, MessageSquare, XCircle } from "lucide-react";

export type Decision = NonNullable<IOfferData["decision"]>;

export const decisionConfig: Record<
  Decision,
  {
    label: string;
    icon: React.ElementType;
    className: string;
    badgeClassName: string;
  }
> = {
  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    className:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 data-[selected=true]:ring-2 data-[selected=true]:ring-emerald-500/50 data-[selected=true]:ring-offset-2 data-[selected=true]:ring-offset-background",
    badgeClassName: "border-emerald-500/30 text-emerald-600 bg-emerald-500/10",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className:
      "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 data-[selected=true]:ring-2 data-[selected=true]:ring-destructive/50 data-[selected=true]:ring-offset-2 data-[selected=true]:ring-offset-background",
    badgeClassName: "border-destructive/30 text-destructive bg-destructive/10",
  },
  negotiating: {
    label: "Negotiating",
    icon: MessageSquare,
    className:
      "border-amber-500/40 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 data-[selected=true]:ring-2 data-[selected=true]:ring-amber-500/50 data-[selected=true]:ring-offset-2 data-[selected=true]:ring-offset-background",
    badgeClassName: "border-amber-500/30 text-amber-600 bg-amber-500/10",
  },
  considering: {
    label: "Considering",
    icon: Brain,
    className:
      "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 data-[selected=true]:ring-2 data-[selected=true]:ring-primary/50 data-[selected=true]:ring-offset-2 data-[selected=true]:ring-offset-background",
    badgeClassName: "border-primary/30 text-primary bg-primary/10",
  },
};
