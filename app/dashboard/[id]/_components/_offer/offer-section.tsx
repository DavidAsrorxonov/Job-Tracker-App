"use client";

import SectionDivider from "@/components/section-divider";
import {
  IInterviewData,
  IOfferData,
  IWishlistData,
} from "@/lib/models/job-application";
import { useState } from "react";
import { toast } from "sonner";
import OfferOverviewPanel from "./offer-overview-panel";
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  DollarSign,
  FileUser,
  ListChecks,
  Podcast,
  Scale,
  Trophy,
} from "lucide-react";
import OfferDetailsPanel from "./offer-details-panel";
import ProsAndConsPanel from "./pros-and-cons-panel";
import DecisionPanel from "./decision-panel";
import { Button } from "@/components/ui/button";
import { upsertOfferData } from "@/lib/actions/offer";
import AppliedDataDisplay from "../_applied/applied-data-display";
import { IAppliedData } from "../_applied/applied-panel";
import WishlistDataDisplay from "../_wishlist/wishlist-data-display";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import InterviewDataDisplay from "../_interviewing/interview-data-display";

const OfferSection = ({
  jobId,
  offerData,
  appliedData,
  wishlistData,
  interviewData,
}: {
  jobId: string;
  offerData?: IOfferData;
  appliedData?: IAppliedData;
  wishlistData?: IWishlistData;
  interviewData?: IInterviewData;
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
        title="Got an offer, huh?"
        description="Let's talk money.💰"
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

      <SectionDivider
        icon={Podcast}
        title="Interview Details"
        description="Your interview notes are below."
      />

      <InterviewDataDisplay interviewData={interviewData} />

      <SectionDivider
        icon={FileUser}
        title="Applied Details"
        description="Track how and when you applied"
      />

      <Collapsible>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors group">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Applied Details</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <AppliedDataDisplay appliedData={appliedData} />
        </CollapsibleContent>
      </Collapsible>

      <SectionDivider
        icon={BookOpen}
        title="Wishlist"
        description="Your wishlist notes are below."
      />

      <Collapsible>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors group">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Wishlist Details</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <WishlistDataDisplay wishlistData={wishlistData} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default OfferSection;
