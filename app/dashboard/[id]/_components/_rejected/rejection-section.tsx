"use client";

import { useState } from "react";
import { IRejectedData } from "@/lib/models/job-application";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SectionDivider from "@/components/section-divider";
import { AlertCircle, BookOpen } from "lucide-react";
import ReflectionPanel from "./reflection-panel";
import RejectionOverviewPanel from "./rejection-overview-panel";
import { upsertRejectedData } from "@/lib/actions/rejected";
import RejectionMotivationBanner from "./rejection-motivation-banner";

const RejectedSection = ({
  jobId,
  rejectedData,
}: {
  jobId: string;
  rejectedData?: IRejectedData;
}) => {
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [data, setData] = useState<IRejectedData>(
    rejectedData ?? { rejectionStage: "after_apply" },
  );

  function updateData(updater: (p: IRejectedData) => IRejectedData) {
    setData(updater);
    setIsDirty(true);
  }

  async function handleSave() {
    try {
      setSaving(true);
      await upsertRejectedData(jobId, data);
      setIsDirty(false);
      toast.success("Saved", {
        duration: 2000,
        description: "Your rejection details have been saved",
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
      {/* Global save button */}
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
        icon={AlertCircle}
        title="Rejection Details"
        description="What stage and why it didn't work out."
      />
      <RejectionOverviewPanel data={data} updateData={updateData} />

      <SectionDivider
        icon={BookOpen}
        title="Reflection"
        description="Turn this into a learning opportunity."
      />
      <ReflectionPanel data={data} updateData={updateData} />

      <RejectionMotivationBanner />
    </div>
  );
};

export default RejectedSection;
