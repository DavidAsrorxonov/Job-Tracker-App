import { IOfferData } from "@/lib/models/job-application";

export const equityTypes: {
  value: NonNullable<IOfferData["equity"]>["type"];
  label: string;
}[] = [
  { value: "equity", label: "Equity" },
  { value: "stock", label: "Stock Options" },
  { value: "rsu", label: "RSUs (Restricted Stock Unit)" },
  { value: "other", label: "Other" },
  { value: "none", label: "None" },
];
