"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IOfferData } from "@/lib/models/job-application";
import {
  CalendarDays,
  Clock,
  MessageSquare,
  Plus,
  Rocket,
  Tag,
  X,
} from "lucide-react";
import { useState } from "react";
import DatePickerField from "../_interviewing/_components/date-picker-field";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

        <Section icon={Tag} title="Benefits">
          <div className="space-y-2">
            {(data.benefits ?? []).length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {(data.benefits ?? []).map((benefit, i) => (
                  <Badge
                    key={i}
                    variant={"outline"}
                    className="text-xs font-normal gap-1 pr-1"
                  >
                    {benefit}
                    <button
                      type="button"
                      onClick={() => removeBenefit(i)}
                      className="ml-0.5 hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                No benefits added yet.
              </p>
            )}
            <div className="flex items-center gap-2">
              <Input
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addBenefit();
                  }
                }}
                placeholder="e.g. Health insurance, 401k, Remote..."
                className="h-8 text-sm"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 shrink-0"
                onClick={addBenefit}
                disabled={!benefitInput.trim()}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Section>

        <Separator />

        <Section icon={MessageSquare} title="Negotiation Notes">
          <Textarea
            value={data.negotiationNotes ?? ""}
            onChange={(e) =>
              updateData((p) => ({ ...p, negotiationNotes: e.target.value }))
            }
            placeholder="What did you negotiate? Counter offers, responses, anything worth noting..."
            className="min-h-24 text-sm resize-none"
          />
        </Section>
      </CardContent>
    </Card>
  );
};

export default OfferDetailsPanel;
