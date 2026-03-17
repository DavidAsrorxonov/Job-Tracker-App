import { IRejectedData } from "@/lib/models/job-application";

export const stageConfig: Record<
  IRejectedData["rejectionStage"],
  { label: string; description: string }
> = {
  before_apply: {
    label: "Before Apply",
    description: "Decided not to apply after research",
  },
  after_apply: {
    label: "After Apply",
    description: "Rejected after submitting application",
  },
  after_screen: {
    label: "After Screen",
    description: "Rejected after phone/initial screen",
  },
  after_interview: {
    label: "After Interview",
    description: "Rejected after one or more interviews",
  },
  after_offer: {
    label: "After Offer",
    description: "Offer was rescinded",
  },
};
