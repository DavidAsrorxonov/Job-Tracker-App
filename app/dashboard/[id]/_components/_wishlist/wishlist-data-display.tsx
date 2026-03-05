"use client";

import { IWishlistData } from "@/lib/models/job-application";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  BookOpen,
  ThumbsUp,
  ThumbsDown,
  Target,
  Building2,
  CheckCircle2,
  XCircle,
  Minus,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";

const priorityConfig = {
  high: {
    label: "High Priority",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  medium: {
    label: "Medium Priority",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  low: {
    label: "Low Priority",
    className: "bg-muted text-muted-foreground border-border",
  },
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

const WishlistDataDisplay = ({
  wishlistData,
}: {
  wishlistData: IWishlistData;
}) => {
  if (!wishlistData) return null;

  const hasAnyData =
    wishlistData.researchNotes ||
    wishlistData.pros?.length ||
    wishlistData.cons?.length ||
    wishlistData.priority ||
    wishlistData.targetApplyDate ||
    wishlistData.companyInfo?.size ||
    wishlistData.companyInfo?.industry ||
    wishlistData.companyInfo?.culture ||
    wishlistData.requirementsMatch?.mustHave?.length ||
    wishlistData.requirementsMatch?.niceToHave?.length ||
    wishlistData.requirementsMatch?.gaps?.length;

  if (!hasAnyData) return null;

  const priority = wishlistData.priority
    ? priorityConfig[wishlistData.priority]
    : null;
  const company = wishlistData.companyInfo;
  const reqs = wishlistData.requirementsMatch;

  return (
    <Card className="w-full mt-4 shadow-sm border-border/60 overflow-hidden opacity-90">
      <CardHeader className="border-b border-border/50 bg-muted/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-semibold tracking-tight text-muted-foreground">
              Wishlist Notes
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Notes you took before applying · Read only
            </p>
          </div>
          <div className="flex items-center gap-2">
            {priority && (
              <Badge
                variant="outline"
                className={cn("text-xs font-normal", priority.className)}
              >
                {priority.label}
              </Badge>
            )}
            {wishlistData.targetApplyDate && (
              <Badge
                variant="outline"
                className="text-xs font-normal text-muted-foreground gap-1"
              >
                <CalendarDays className="h-3 w-3" />
                Target:{" "}
                {format(new Date(wishlistData.targetApplyDate), "MMM d, yyyy")}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-5 space-y-5">
        {/* Research Notes */}
        {wishlistData.researchNotes && (
          <Section icon={BookOpen} title="Research Notes">
            <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed rounded-md bg-muted/30 border border-border/50 px-3 py-2.5">
              {wishlistData.researchNotes}
            </p>
          </Section>
        )}

        {/* Pros & Cons */}
        {(wishlistData.pros?.length || wishlistData.cons?.length) && (
          <>
            {wishlistData.researchNotes && <Separator />}
            <div className="grid grid-cols-2 gap-4">
              {wishlistData.pros?.length ? (
                <Section icon={ThumbsUp} title="Pros">
                  <ul className="space-y-1.5">
                    {wishlistData.pros.map((pro, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </Section>
              ) : null}
              {wishlistData.cons?.length ? (
                <Section icon={ThumbsDown} title="Cons">
                  <ul className="space-y-1.5">
                    {wishlistData.cons.map((con, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <XCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-destructive/70" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </Section>
              ) : null}
            </div>
          </>
        )}

        {/* Company Info */}
        {(company?.size || company?.industry || company?.culture) && (
          <>
            <Separator />
            <Section icon={Building2} title="Company Info">
              <div className="flex flex-wrap gap-2">
                {company.size && (
                  <Badge variant="secondary" className="text-xs font-normal">
                    Size: {company.size}
                  </Badge>
                )}
                {company.industry && (
                  <Badge variant="secondary" className="text-xs font-normal">
                    {company.industry}
                  </Badge>
                )}
                {company.culture && (
                  <p className="w-full text-sm text-foreground/80 rounded-md bg-muted/30 border border-border/50 px-3 py-2">
                    {company.culture}
                  </p>
                )}
              </div>
            </Section>
          </>
        )}

        {/* Requirements Match */}
        {(reqs?.mustHave?.length ||
          reqs?.niceToHave?.length ||
          reqs?.gaps?.length) && (
          <>
            <Separator />
            <Section icon={Target} title="Requirements Match">
              <div className="space-y-3">
                {reqs.mustHave?.length ? (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">
                      Must Have
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {reqs.mustHave.map((item, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs font-normal border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-500/5"
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" /> {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
                {reqs.niceToHave?.length ? (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">
                      Nice to Have
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {reqs.niceToHave.map((item, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          <Minus className="h-3 w-3 mr-1" /> {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
                {reqs.gaps?.length ? (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">Gaps</p>
                    <div className="flex flex-wrap gap-1.5">
                      {reqs.gaps.map((item, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs font-normal border-destructive/30 text-destructive/80 bg-destructive/5"
                        >
                          <XCircle className="h-3 w-3 mr-1" /> {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </Section>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WishlistDataDisplay;
