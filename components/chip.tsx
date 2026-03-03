import { cn } from "@/lib/utils";

export const Chip = ({
  children,
  onClick,
  variant = "ghost",
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-normal transition-all cursor-pointer select-none",
        variant === "primary" &&
          "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20",
        variant === "secondary" &&
          "bg-secondary border-border text-secondary-foreground hover:bg-secondary/80",
        variant === "ghost" &&
          "bg-transparent border-border/60 text-muted-foreground hover:border-border hover:text-foreground hover:bg-muted/50",
        className,
      )}
    >
      {children}
    </button>
  );
};
