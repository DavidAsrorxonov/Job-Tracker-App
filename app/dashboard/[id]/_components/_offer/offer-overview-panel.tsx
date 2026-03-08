import { IOfferData } from "@/lib/models/job-application";
import { cn } from "@/lib/utils";
import React from "react";

type OfferPanelProps = {
  data: IOfferData;
  updateData: (updater: (p: IOfferData) => IOfferData) => void;
};

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "SGD"];

const equityTypes: {
  value: NonNullable<IOfferData["equity"]>["type"];
  label: string;
}[] = [
  { value: "equity", label: "Equity" },
  { value: "stock", label: "Stock Options" },
  { value: "rsu", label: "RSUs (Restricted Stock Unit)" },
  { value: "other", label: "Other" },
  { value: "none", label: "None" },
];

function StatCard({
  icon: Icon,
  label,
  value,
  subValue,
  isEmpty,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue?: string;
  isEmpty: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-3 rounded-xl border p-5 text-left transition-all duration-200 hover:bg-muted/40 hover:border-border w-full",
        isEmpty
          ? "border-dashed border-border/60 bg-muted/10"
          : "border-border/60 bg-muted/20",
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg",
          isEmpty
            ? "bg-muted text-muted-foreground"
            : "bg-primary/10 text-primary",
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="space-y-0.5 w-full">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
          {label}
        </p>
        <p
          className={cn(
            "text-xl font-bold tracking-tight",
            isEmpty && "text-muted-foreground/40 text-base font-normal",
          )}
        >
          {value}
        </p>
        {subValue && (
          <p className="text-xs text-muted-foreground">{subValue}</p>
        )}
      </div>
    </button>
  );
}

const OfferOverviewPanel = () => {
  return <div>OfferOverviewPanel</div>;
};

export default OfferOverviewPanel;
