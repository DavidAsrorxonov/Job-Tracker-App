"use client";

import { Sparkles, ArrowDown } from "lucide-react";

const WishlistReminder = () => {
  return (
    <div className="mt-5 mb-4 w-full rounded-2xl border bg-muted/30 p-4 shadow-sm animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm animate-pulse">
          <Sparkles className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="flex items-center gap-2 text-sm font-semibold leading-tight">
            Need a quick reminder?
            <span className="rounded-full border bg-background px-2 py-0.5 text-[10px] font-medium">
              Wishlist recap
            </span>
          </h1>

          <p className="mt-1 text-xs text-muted-foreground">
            Your original notes and wishlist details are just below.
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <ArrowDown className="h-4 w-4 animate-bounce" />
            <span>Scroll to see your notes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistReminder;
