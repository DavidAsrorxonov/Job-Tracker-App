import { LucideIcon } from "lucide-react";

const SectionDivider = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
}) => {
  return (
    <div className="relative my-3 flex items-center gap-2 sm:gap-4">
      <div className="h-px flex-1 bg-linear-to-r from-transparent to-border sm:h-0.5" />

      <div className="flex max-w-full items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 shadow-sm sm:px-4 sm:py-2">
        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />

        <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm leading-tight">
          <span className="font-semibold text-foreground wrap-break-word">
            {title}
          </span>

          {description && (
            <span className="text-muted-foreground wrap-break-word">
              {description}
            </span>
          )}
        </div>
      </div>

      <div className="h-px flex-1 bg-linear-to-l from-transparent to-border sm:h-0.5" />
    </div>
  );
};

export default SectionDivider;
