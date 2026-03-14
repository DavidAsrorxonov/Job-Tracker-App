"use client";
import { FEATURES } from "@/constants/features";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Features = () => {
  const [active, setActive] = useState(0);
  const activeFeature = FEATURES[active];
  const Icon = activeFeature.icon;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Everything you need
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground leading-tight">
            Built for every step of
            <br />
            your job search.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-1">
            {FEATURES.map((feature, i) => {
              const FeatureIcon = feature.icon;
              const isActive = active === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted/60 text-muted-foreground hover:text-foreground",
                  )}
                >
                  <FeatureIcon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isActive ? "text-primary-foreground" : "",
                    )}
                  >
                    {feature.title}
                  </span>
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground/60" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-3 rounded-2xl border border-border/60 bg-muted/20 p-10 flex flex-col gap-6 min-h-64 justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                {activeFeature.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                {activeFeature.description}
              </p>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {FEATURES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full transition-all duration-200",
                    i === active
                      ? "h-2 w-6 bg-primary"
                      : "h-2 w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
