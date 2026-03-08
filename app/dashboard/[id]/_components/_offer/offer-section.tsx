"use client";

import SectionDivider from "@/components/section-divider";
import { IOfferData } from "@/lib/models/job-application";
import { useState } from "react";
import { toast } from "sonner";
import OfferOverviewPanel from "./offer-overview-panel";
import { DollarSign, ListChecks, Scale, Trophy } from "lucide-react";
import OfferDetailsPanel from "./offer-details-panel";
import ProsAndConsPanel from "./pros-and-cons-panel";
import DecisionPanel from "./decision-panel";
import { Button } from "@/components/ui/button";
import { upsertOfferData } from "@/lib/actions/offer";

const OfferSection = ({
  jobId,
  offerData,
}: {
  jobId: string;
  offerData?: IOfferData;
}) => {
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [data, setData] = useState<IOfferData>(offerData ?? {});

  function updateData(updater: (p: IOfferData) => IOfferData) {
    setData(updater);
    setIsDirty(true);
  }

  async function handleSave() {
    try {
      setSaving(true);
      await upsertOfferData(jobId, data);
      setIsDirty(false);
      toast.success("Saved", {
        duration: 2000,
        description: "Your offer details have been saved",
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to save", {
        duration: 2000,
        description: "Something went wrong. Please try again",
        position: "top-center",
      });
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-end gap-2">
        {isDirty && (
          <span className="text-xs text-muted-foreground">Unsaved changes</span>
        )}
        <Button
          size="sm"
          onClick={handleSave}
          disabled={saving || !isDirty}
          className="h-7 text-xs"
        >
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>

      <SectionDivider
        icon={DollarSign}
        title="Compensation"
        description="Salary, equity and bonus breakdown."
      />
      <OfferOverviewPanel data={data} updateData={updateData} />

      <SectionDivider
        icon={ListChecks}
        title="Offer Details"
        description="Dates, benefits and negotiation notes."
      />
      <OfferDetailsPanel data={data} updateData={updateData} />

      <SectionDivider
        icon={Scale}
        title="Pros & Cons"
        description="Weigh up the offer."
      />
      <ProsAndConsPanel data={data} updateData={updateData} />

      <SectionDivider
        icon={Trophy}
        title="Decision"
        description="What's your final call?"
      />
      <DecisionPanel data={data} updateData={updateData} />
    </div>
  );
};

export default OfferSection;
