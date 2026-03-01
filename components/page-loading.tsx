"use client";

import { Loader2 } from "lucide-react";

export default function PageLoading({
  text = "Loading...",
}: {
  text?: string;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
