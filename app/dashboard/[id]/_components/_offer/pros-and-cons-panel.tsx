"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IOfferData } from "@/lib/models/job-application";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import ListEditor from "../_interviewing/_components/list-editor";
import { Separator } from "@/components/ui/separator";

type OfferPanelProps = {
  data: IOfferData;
  updateData: (updater: (p: IOfferData) => IOfferData) => void;
};

const ProsAndConsPanel = ({ data, updateData }: OfferPanelProps) => {
  return (
    <Card className="w-full shadow-sm border-border/60">
      <CardHeader className="border-b border-border/50 bg-muted/30 px-6 py-4">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-semibold tracking-tight">
            Pros & Cons
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Weigh up the offer before making your decision.
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-5">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600">
              <ThumbsUp className="h-3.5 w-3.5" />
              Pros
            </div>

            <ListEditor
              items={data.prosAndCons?.pros ?? []}
              onAdd={(value) =>
                updateData((p) => ({
                  ...p,
                  prosAndCons: {
                    ...p.prosAndCons,
                    pros: [...(p.prosAndCons?.pros ?? []), value],
                  },
                }))
              }
              onRemove={(index) =>
                updateData((p) => ({
                  ...p,
                  prosAndCons: {
                    ...p.prosAndCons,
                    pros: (p.prosAndCons?.pros ?? []).filter(
                      (_, i) => i !== index,
                    ),
                  },
                }))
              }
              placeholder="e.g. Great work-life balance"
            />
          </div>

          <Separator orientation="vertical" className="hidden sm:block" />

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-destructive/80">
              <ThumbsDown className="h-3.5 w-3.5" />
              Cons
            </div>
            <ListEditor
              items={data.prosAndCons?.cons ?? []}
              onAdd={(value) =>
                updateData((p) => ({
                  ...p,
                  prosAndCons: {
                    ...p.prosAndCons,
                    cons: [...(p.prosAndCons?.cons ?? []), value],
                  },
                }))
              }
              onRemove={(index) =>
                updateData((p) => ({
                  ...p,
                  prosAndCons: {
                    ...p.prosAndCons,
                    cons: (p.prosAndCons?.cons ?? []).filter(
                      (_, i) => i !== index,
                    ),
                  },
                }))
              }
              placeholder="e.g. Long commute"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProsAndConsPanel;
