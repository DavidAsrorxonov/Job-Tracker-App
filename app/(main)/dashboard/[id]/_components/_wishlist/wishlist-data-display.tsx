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
import { priorityConfig } from "@/config/wishlist-data-display-priority";

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
    <div className="space-y-2 sm:space-y-2.5">
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span className="wrap-break-word">{title}</span>
      </div>
      {children}
    </div>
  );
}

const WishlistDataDisplay = ({
  wishlistData,
}: {
  wishlistData?: IWishlistData;
}) => {
  if (!wishlistData) return null;

  const priority = wishlistData.priority
    ? priorityConfig[wishlistData.priority]
    : null;
  const company = wishlistData.companyInfo;
  const reqs = wishlistData.requirementsMatch;

  const hasAnyData =
    wishlistData.researchNotes ||
    wishlistData.pros?.length ||
    wishlistData.cons?.length ||
    wishlistData.priority ||
    wishlistData.targetApplyDate ||
    company?.size ||
    company?.industry ||
    company?.culture ||
    reqs?.mustHave?.length ||
    reqs?.niceToHave?.length ||
    reqs?.gaps?.length;

  const cardHeader = (
    <CardHeader className="border-b border-border/50 bg-muted/20 px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-0.5">
          <CardTitle className="text-lg font-bold tracking-tight sm:text-xl">
            Wishlist Notes
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Notes you took before applying · Read only
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {priority && (
            <Badge
              variant="outline"
              className={cn(
                "max-w-full text-xs font-normal wrap-break-word",
                priority.className,
              )}
            >
              {priority.label}
            </Badge>
          )}

          {wishlistData.targetApplyDate && (
            <Badge
              variant="outline"
              className="max-w-full gap-1 text-xs font-normal text-muted-foreground wrap-break-word whitespace-normal"
            >
              <CalendarDays className="h-3 w-3 shrink-0" />
              <span>
                Target:{" "}
                {format(new Date(wishlistData.targetApplyDate), "MMM d, yyyy")}
              </span>
            </Badge>
          )}
        </div>
      </div>
    </CardHeader>
  );

  if (!hasAnyData) {
    return (
      <Card className="mt-4 w-full overflow-hidden border-border/60 shadow-sm opacity-75">
        {cardHeader}
        <CardContent className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center sm:px-6 sm:py-16">
          <BookOpen
            className="h-14 w-14 text-muted-foreground/20 sm:h-16 sm:w-16"
            strokeWidth={1}
          />
          <p className="text-sm font-medium text-muted-foreground">
            No wishlist notes
          </p>
          <p className="max-w-56 text-xs text-muted-foreground/60 sm:max-w-48">
            You didn't record anything when this job was in your wishlist.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4 w-full overflow-hidden border-border/60 shadow-sm opacity-90">
      {cardHeader}

      <CardContent className="space-y-5 px-4 py-5 sm:px-6">
        {/* Research Notes */}
        <Section icon={BookOpen} title="Research Notes">
          {wishlistData.researchNotes ? (
            <p className="rounded-md border border-border/50 bg-muted/30 px-3 py-2.5 text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap wrap-break-word">
              {wishlistData.researchNotes}
            </p>
          ) : (
            <p className="text-xs italic text-muted-foreground">
              No research notes added.
            </p>
          )}
        </Section>

        <Separator />

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Section icon={ThumbsUp} title="Pros">
            {wishlistData.pros?.length ? (
              <ul className="space-y-1.5">
                {wishlistData.pros.map((pro, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <span className="wrap-break-word">{pro}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs italic text-muted-foreground">
                None listed.
              </p>
            )}
          </Section>

          <Section icon={ThumbsDown} title="Cons">
            {wishlistData.cons?.length ? (
              <ul className="space-y-1.5">
                {wishlistData.cons.map((con, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive/70" />
                    <span className="wrap-break-word">{con}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs italic text-muted-foreground">
                None listed.
              </p>
            )}
          </Section>
        </div>

        <Separator />

        {/* Company Info */}
        <Section icon={Building2} title="Company Info">
          {company?.size || company?.industry || company?.culture ? (
            <div className="flex flex-wrap gap-2">
              {company.size && (
                <Badge
                  variant="secondary"
                  className="max-w-full text-xs font-normal wrap-break-word whitespace-normal"
                >
                  Size: {company.size}
                </Badge>
              )}
              {company.industry && (
                <Badge
                  variant="secondary"
                  className="max-w-full text-xs font-normal wrap-break-word whitespace-normal"
                >
                  {company.industry}
                </Badge>
              )}
              {company.culture && (
                <p className="w-full rounded-md border border-border/50 bg-muted/30 px-3 py-2 text-sm text-foreground/80 wrap-break-word">
                  {company.culture}
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs italic text-muted-foreground">
              No company info recorded.
            </p>
          )}
        </Section>

        <Separator />

        {/* Requirements Match */}
        <Section icon={Target} title="Requirements Match">
          {reqs?.mustHave?.length ||
          reqs?.niceToHave?.length ||
          reqs?.gaps?.length ? (
            <div className="space-y-3">
              {reqs.mustHave?.length ? (
                <div>
                  <p className="mb-1.5 text-xs text-muted-foreground">
                    Must Have
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {reqs.mustHave.map((item, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="max-w-full border-emerald-500/30 bg-emerald-500/5 text-xs font-normal text-emerald-700 dark:text-emerald-400 wrap-break-word whitespace-normal"
                      >
                        <CheckCircle2 className="mr-1 h-3 w-3 shrink-0" />
                        <span className="wrap-break-word">{item}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {reqs.niceToHave?.length ? (
                <div>
                  <p className="mb-1.5 text-xs text-muted-foreground">
                    Nice to Have
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {reqs.niceToHave.map((item, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="max-w-full text-xs font-normal wrap-break-word whitespace-normal"
                      >
                        <Minus className="mr-1 h-3 w-3 shrink-0" />
                        <span className="wrap-break-word">{item}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {reqs.gaps?.length ? (
                <div>
                  <p className="mb-1.5 text-xs text-muted-foreground">Gaps</p>
                  <div className="flex flex-wrap gap-1.5">
                    {reqs.gaps.map((item, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="max-w-full border-destructive/30 bg-destructive/5 text-xs font-normal text-destructive/80 wrap-break-word whitespace-normal"
                      >
                        <XCircle className="mr-1 h-3 w-3 shrink-0" />
                        <span className="wrap-break-word">{item}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="text-xs italic text-muted-foreground">
              No requirements match recorded.
            </p>
          )}
        </Section>
      </CardContent>
    </Card>
  );
};

export default WishlistDataDisplay;
