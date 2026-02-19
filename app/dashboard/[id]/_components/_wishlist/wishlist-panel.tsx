"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IWishlistData } from "@/lib/models/job-application";
import { WishlistFormValues } from "@/types/wishlist";
import { useMemo, useState, useTransition } from "react";
import WishlistForm from "./wishlist-form";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { upsertWishlistData } from "@/lib/actions/wishlist";
import "../../_styles/panel.css";
import { toast } from "sonner";

function calcCompletion(d?: IWishlistData) {
  if (!d) return { done: 0, total: 8, percent: 0 };

  const checks = [
    Boolean(d.priority),
    Boolean(d.targetApplyDate),
    Boolean(d.researchNotes?.trim()),
    (d.pros?.length ?? 0) > 0,
    (d.cons?.length ?? 0) > 0,
    Boolean(d.companyInfo?.industry?.trim()),
    (d.requirementsMatch?.mustHave?.length ?? 0) > 0,
    (d.requirementsMatch?.gaps?.length ?? 0) > 0,
  ];

  const done = checks.filter(Boolean).length;
  const total = checks.length;
  const percent = Math.round((done / total) * 100);

  return { done, total, percent };
}

export default function WishlistPanel({
  jobId,
  wishlistData,
}: {
  jobId: string;
  wishlistData?: IWishlistData;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const completion = useMemo(
    () => calcCompletion(wishlistData),
    [wishlistData],
  );

  const hasAnything =
    completion.done > 0 ||
    Boolean(wishlistData?.priority || wishlistData?.researchNotes);

  async function onSubmit(values: WishlistFormValues) {
    startTransition(async () => {
      try {
        await upsertWishlistData(jobId, values);
        setOpen(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to update wishlist", {
          description: "Please try again",
          duration: 2000,
          position: "top-center",
        });
      }
    });
  }

  return (
    <Card className="w-full shadow-md h-fit">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle className="text-lg">Wishlist details</CardTitle>
          <p className="text-sm text-muted-foreground">
            Fill this out to decide if it's worth applying.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size={"sm"} variant={hasAnything ? "outline" : "default"}>
              {hasAnything ? "Edit" : "Fill out"}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Wishlist details</DialogTitle>
            </DialogHeader>

            <div className="max-h-[70vh] overflow-y-auto pr-2">
              <WishlistForm
                defaultValues={{
                  researchNotes: wishlistData?.researchNotes ?? "",
                  priority: wishlistData?.priority ?? undefined,
                  targetApplyDate: wishlistData?.targetApplyDate
                    ? new Date(wishlistData.targetApplyDate)
                    : undefined,
                  pros: wishlistData?.pros ?? [],
                  cons: wishlistData?.cons ?? [],
                  companyInfo: {
                    size: wishlistData?.companyInfo?.size ?? "",
                    industry: wishlistData?.companyInfo?.industry ?? "",
                    culture: wishlistData?.companyInfo?.culture ?? "",
                  },
                  requirementsMatch: {
                    mustHave: wishlistData?.requirementsMatch?.mustHave ?? [],
                    niceToHave:
                      wishlistData?.requirementsMatch?.niceToHave ?? [],
                    gaps: wishlistData?.requirementsMatch?.gaps ?? [],
                  },
                }}
                onSubmit={onSubmit}
                submitting={isPending}
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Completion</span>
            <span className="font-medium">
              {completion.done}/{completion.total} ({completion.percent}%)
            </span>
          </div>
          <Progress value={completion.percent} />
        </div>

        <Separator />

        {!hasAnything ? (
          <p className="text-sm text-muted-foreground italic">
            Nothing filled out yet. Click{" "}
            <span className="font-medium">Fill out</span> to start.
          </p>
        ) : (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Priority:</span>
              <Badge>{wishlistData?.priority ?? "Not set"}</Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {(wishlistData?.pros ?? []).slice(0, 3).map((p, i) => (
                <Badge
                  key={`pro-${i}`}
                  variant="secondary"
                  className="font-normal"
                >
                  ✅ {p}
                </Badge>
              ))}
              {(wishlistData?.cons ?? []).slice(0, 3).map((c, i) => (
                <Badge
                  key={`con-${i}`}
                  variant="outline"
                  className="font-normal"
                >
                  ⚠️ {c}
                </Badge>
              ))}
              {(wishlistData?.pros?.length ?? 0) +
                (wishlistData?.cons?.length ?? 0) >
              6 ? (
                <Badge variant="outline" className="font-normal">
                  More…
                </Badge>
              ) : null}
            </div>

            {wishlistData?.researchNotes?.trim() ? (
              <p className="text-muted-foreground line-clamp-3 whitespace-pre-wrap">
                {wishlistData.researchNotes}
              </p>
            ) : (
              <p className="text-muted-foreground italic">
                No research notes yet.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
