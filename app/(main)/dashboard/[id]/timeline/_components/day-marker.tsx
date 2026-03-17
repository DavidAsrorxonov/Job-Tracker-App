import { format } from "date-fns";

export default function DayMarker({
  label,
  date,
  count,
}: {
  label: string;
  date: Date;
  count: number;
}) {
  return (
    <div className="relative pl-16">
      <div className="absolute left-[1.1rem] top-1.5 h-4 w-4 rounded-full border border-border bg-background shadow-sm" />
      <div className="absolute left-[1.55rem] top-6 -bottom-8 w-px bg-linear-to-b from-border via-border/40 to-transparent" />

      <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 backdrop-blur-sm shadow-sm">
        <span className="text-xs font-semibold text-foreground">{label}</span>
        <span className="text-[10px] text-muted-foreground">
          {format(date, "yyyy")}
        </span>
        <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
        <span className="text-[10px] text-muted-foreground">
          {count} event{count > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
