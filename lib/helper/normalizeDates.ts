import { isSameDay } from "date-fns";

export const normalizeDates = (
  dates: (Date | string)[] | undefined,
): Date[] => {
  const arr = (dates ?? []).map((d) => (d instanceof Date ? d : new Date(d)));
  const uniq: Date[] = [];
  for (const d of arr) {
    if (!uniq.some((x) => isSameDay(x, d))) uniq.push(d);
  }
  uniq.sort((a, b) => a.getTime() - b.getTime());
  return uniq;
};
