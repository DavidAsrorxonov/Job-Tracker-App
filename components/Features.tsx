"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { FEATURES } from "@/constants/features";
import { cn } from "@/lib/utils";

const Features = () => {
  const [active, setActive] = useState(0);
  const activeFeature = FEATURES[active];
  const Icon = activeFeature.icon;

  return (
    <section className="py-24" id="features">
      <div className="container mx-auto px-4">
        <div className="mb-14 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <Badge
              variant="outline"
              className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Everything you need
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-serif text-4xl font-semibold tracking-tight text-balance leading-[1.15] md:text-5xl"
          >
            Built for every step of
            <br />
            your job search
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start"
        >
          <div className="lg:col-span-2 flex flex-col gap-0.5">
            {FEATURES.map((feature, i) => {
              const FeatureIcon = feature.icon;
              const isActive = active === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-200",
                    isActive
                      ? "bg-primary/8 text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAccent"
                      className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <FeatureIcon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground/60 group-hover:text-foreground",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "",
                    )}
                  >
                    {feature.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-3 relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20 min-h-72">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px]" />

            <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-primary opacity-[0.07] blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative z-10 flex flex-col gap-6 p-10 justify-center"
              >
                <div className="relative w-fit">
                  <div className="absolute inset-0 rounded-xl bg-primary opacity-20 blur-md" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                    {activeFeature.title}
                  </h3>
                  <p className="text-base font-light text-muted-foreground leading-relaxed max-w-md">
                    {activeFeature.description}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground/50 font-medium tabular-nums">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(FEATURES.length).padStart(2, "0")}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
