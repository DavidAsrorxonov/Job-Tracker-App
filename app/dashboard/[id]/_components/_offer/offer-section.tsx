"use client";

import { IOfferData } from "@/lib/models/job-application";
import { useState } from "react";
import { toast } from "sonner";

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
      //   await upsertOfferData(jobId, data);
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

  return <div>OfferSection</div>;
};

export default OfferSection;
