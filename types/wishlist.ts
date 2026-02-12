export type WishlistFormValues = {
  researchNotes?: string;
  pros?: string[];
  cons?: string[];
  priority?: "high" | "medium" | "low";
  targetApplyDate?: Date;
  companyInfo?: {
    size?: string;
    industry?: string;
    culture?: string;
  };
  requirementsMatch?: {
    mustHave?: string[];
    niceToHave?: string[];
    gaps?: string[];
  };
};
