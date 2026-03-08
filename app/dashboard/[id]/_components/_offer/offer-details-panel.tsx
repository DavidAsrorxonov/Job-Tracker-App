"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IOfferData } from "@/lib/models/job-application";
import { CalendarDays, Clock, Rocket } from "lucide-react";
import { useState } from "react";
import DatePickerField from "../_interviewing/_components/date-picker-field";
import { Separator } from "@/components/ui/separator";

type OfferPanelProps = {
  data: IOfferData;
  updateData: (updater: (p: IOfferData) => IOfferData) => void;
};

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>
      {children}
    </div>
  );
}

const OfferDetailsPanel = ({ data, updateData }: OfferPanelProps) => {
  const [benefitInput, setBenefitInput] = useState("");

  function addBenefit() {
    const trimmed = benefitInput.trim();
    if (!trimmed) return;
    updateData((p) => ({
      ...p,
      benefits: [...(p.benefits ?? []), trimmed],
    }));
    setBenefitInput("");
  }

  function removeBenefit(index: number) {
    updateData((p) => ({
      ...p,
      benefits: (p.benefits ?? []).filter((_, i) => i !== index),
    }));
  }

  return (
    <Card className="w-full shadow-sm border-border/60">
      <CardHeader className="border-b border-border/50 bg-muted/30 px-6 py-4">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-semibold tracking-tight">
            Offer Details
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Dates, benefits and negotiation notes.
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-5 space-y-5">
        <Section icon={CalendarDays} title="Dates">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">Offer Received</p>
              <DatePickerField
                value={
                  data.offerReceivedDate
                    ? new Date(data.offerReceivedDate)
                    : undefined
                }
                onChange={(d) =>
                  updateData((p) => ({ ...p, offerReceivedDate: d }))
                }
                label="Offer Received"
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> Deadline
              </p>
              <DatePickerField
                value={
                  data.offerDeadline ? new Date(data.offerDeadline) : undefined
                }
                onChange={(d) =>
                  updateData((p) => ({ ...p, offerDeadline: d }))
                }
                label="Offer Deadline"
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Rocket className="h-3 w-3" /> Start Date
              </p>
              <DatePickerField
                value={data.startDate ? new Date(data.startDate) : undefined}
                onChange={(d) => updateData((p) => ({ ...p, startDate: d }))}
                label="Start Date"
              />
            </div>
          </div>
        </Section>

        <Separator />
      </CardContent>
    </Card>
  );
};

export default OfferDetailsPanel;
