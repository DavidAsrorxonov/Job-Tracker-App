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
    <div className="relative my-2 py-2 flex items-center gap-4">
      <div className="flex-1 h-1 bg-linear-to-r from-transparent to-border" />

      <div className="flex items-center gap-2.5 rounded-full border border-border/60 bg-muted/40 px-4 py-2 shadow-sm">
        <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-semibold text-foreground">{title}</span>
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
        </div>
      </div>

      <div className="flex-1 h-1 bg-linear-to-l from-transparent to-border" />
    </div>
  );
};

export default SectionDivider;
