"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[28px_28px] mask-[radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-[0.08] blur-[120px]" />
        <div className="absolute top-0 right-[10%] h-55 w-55 rounded-full bg-primary opacity-[0.05] blur-[70px]" />
        <div className="absolute bottom-0 left-[10%] h-55 w-55 rounded-full bg-primary opacity-[0.05] blur-[70px]" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border/60 bg-muted/20 px-8 py-16 text-center md:px-16"
        >
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px]" />

          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
            <div className="absolute -top-20 left-1/2 h-75 w-75 -translate-x-1/2 rounded-full bg-primary opacity-[0.08] blur-[80px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge
                variant="outline"
                className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground"
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                Get started today
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mb-4 font-serif text-4xl font-semibold tracking-tight text-balance md:text-5xl"
            >
              Your next role is{" "}
              <em className="text-primary italic">closer than you think</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mb-10 max-w-md text-base font-light leading-relaxed text-muted-foreground"
            >
              Stop losing track of where you applied and start approaching your
              search with clarity, intention, and calm.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="flex flex-col items-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-[15px] font-medium"
              >
                <Link href="/sign-in">
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Link href="#preview">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  See how it works
                </Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-4 text-xs text-muted-foreground/60"
            >
              No credit card required · Free to start
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
