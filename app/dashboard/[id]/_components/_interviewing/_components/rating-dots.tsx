import { cn } from "@/lib/utils";

const RatingDots = ({ rating }: { rating?: number }) => {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            i < rating ? "bg-primary" : "bg-muted-foreground/20",
          )}
        />
      ))}
    </div>
  );
};

export default RatingDots;
