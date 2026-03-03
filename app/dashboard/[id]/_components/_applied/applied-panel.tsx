"use client";

import { isSameDay } from "date-fns";

export interface IAppliedData {
  appliedDate: Date;
  applicationMethod?: "linkedin" | "company_site" | "referral" | "other";
  resumeVersion?: string;
  coverLetterUsed?: boolean;
  referralContact?: string;
  followUpDates?: Date[];
  lastFollowUpDate?: Date;
  expectedResponseDate?: Date;
  applicationNotes?: string;
}

function methodLabel(m?: IAppliedData["applicationMethod"]) {
  switch (m) {
    case "linkedin":
      return "LinkedIn";
    case "company_site":
      return "Company Site";
    case "referral":
      return "Referral";
    case "other":
      return "Other";
    default:
      return "Not Set";
  }
}

function methodBadgeVariant(m?: IAppliedData["applicationMethod"]) {
  return m ? "default" : "outline";
}

function normalizeDates(dates: (Date | string)[] | undefined) {
  const arr = (dates ?? []).map((d) => (d instanceof Date ? d : new Date(d)));
  const uniq: Date[] = [];
  for (const d of arr) {
    if (!uniq.some((x) => isSameDay(x, d))) uniq.push(d);
  }

  uniq.sort((a, b) => a.getTime() - b.getTime());
}
