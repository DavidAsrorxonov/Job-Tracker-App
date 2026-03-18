"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { STEPS } from "@/constants/steps";

const HowItWorks = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-20 max-w-xl">
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
              How it works
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-serif text-4xl font-semibold tracking-tight text-balance leading-[1.15] md:text-5xl"
          >
            Up and running in{" "}
            <em className="text-primary italic">four steps</em>
          </motion.h2>
        </div>

        <div className="relative mx-auto max-w-2xl">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border/50" />

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className={`group relative flex items-center gap-8 py-10 ${
                    isEven ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${isEven ? "text-right" : "text-left"}`}
                  >
                    <span className="font-serif text-[80px] font-semibold leading-none text-foreground/10 transition-colors duration-300 group-hover:text-primary/30 select-none">
                      {step.number}
                    </span>
                  </div>

                  <div className="relative z-10 shrink-0">
                    <div className="h-3 w-3 rounded-full border-2 border-border bg-background transition-all duration-300 group-hover:border-primary group-hover:bg-primary/20" />
                  </div>

                  <div
                    className={`flex-1 ${isEven ? "text-left" : "text-right"}`}
                  >
                    <h3 className="font-serif text-xl font-semibold tracking-tight text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
                      {step.title}
                    </h3>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
