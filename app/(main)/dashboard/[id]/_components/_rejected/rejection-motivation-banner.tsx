"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { quotes } from "@/constants/quotes";

const RejectionMotivationBanner = () => {
  const router = useRouter();

  const [quote, setQuote] = useState(quotes[0]);
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="w-full rounded-xl border border-border/60 bg-muted/20 px-8 py-8 flex flex-col items-center text-center gap-6">
      <Quote className="h-8 w-8 text-muted-foreground/20" strokeWidth={1.5} />

      <div className="space-y-3 max-w-lg">
        <p className="text-base font-medium text-foreground/80 leading-relaxed italic">
          "{quote.text}"
        </p>
        <p className="text-sm text-muted-foreground">— {quote.author}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-muted-foreground">
          Keep going. The right opportunity is out there!
        </p>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => router.push("/dashboard")}
        >
          <LayoutDashboard className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default RejectionMotivationBanner;
