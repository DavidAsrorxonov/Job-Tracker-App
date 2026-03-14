"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Quote } from "lucide-react";
import { useMemo } from "react";

const quotes = [
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison",
  },
  {
    text: "It's fine to celebrate success, but it is more important to heed the lessons of failure.",
    author: "Bill Gates",
  },
  {
    text: "Failure is simply the opportunity to begin again, this time more intelligently.",
    author: "Henry Ford",
  },
  {
    text: "Every strike brings me closer to the next home run.",
    author: "Babe Ruth",
  },
  {
    text: "The master has failed more times than the beginner has even tried.",
    author: "Stephen McCranie",
  },
  {
    text: "Rejection is just redirection.",
    author: "Unknown",
  },
  {
    text: "You may encounter many defeats, but you must not be defeated.",
    author: "Maya Angelou",
  },
  {
    text: "Our greatest glory is not in never falling, but in rising every time we fall.",
    author: "Confucius",
  },
  {
    text: "The only real mistake is the one from which we learn nothing.",
    author: "Henry Ford",
  },
];

const RejectionMotivationBanner = () => {
  const router = useRouter();

  const quote = useMemo(
    () => quotes[Math.floor(Math.random() * quotes.length)],
    [],
  );

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
