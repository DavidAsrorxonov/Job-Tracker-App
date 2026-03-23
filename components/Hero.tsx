"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, PlayCircle, Sparkle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spotlight } from "./effects/spotlight";
import { FEATURES } from "@/constants/hero-features";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[28px_28px] mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-primary opacity-[0.18] blur-[80px]" />
        <div className="absolute top-25 left-[8%] h-50 w-50 rounded-full bg-primary opacity-[0.10] blur-[60px]" />
        <div className="absolute top-15 right-[8%] h-45 w-45 rounded-full bg-primary opacity-[0.10] blur-[60px]" />

        <motion.div
          className="absolute inset-0 pointer-events-none -z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Spotlight
            className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 opacity-50"
            fill="white"
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge className="px-4 py-1.5 text-xs font-medium uppercase tracking-widest">
              <Sparkle className="mr-2 h-4 w-4" />
              Built for focused job seekers
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mb-5 font-serif text-5xl font-semibold leading-[1.12] tracking-tight text-balance md:text-6xl lg:text-7xl"
          >
            Your job search deserves to feel{" "}
            <em className="text-primary italic">intentional</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mb-10 max-w-lg text-lg font-light leading-relaxed text-muted-foreground"
          >
            The job search is already hard enough.{" "}
            <span className="font-medium text-foreground">Ascendio</span> keeps
            every application, interview, and offer in one calm, clear space —
            so you can focus on what actually matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="flex flex-col items-center gap-3"
          >
            <Button size={"lg"} asChild>
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
              <Link href="#how-it-works">
                <PlayCircle className="mr-2 h-4 w-4" />
                See how it works
              </Link>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-4 text-xs text-muted-foreground/60"
          >
            No credit card required · Free to start
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38 }}
            className="mt-12 flex flex-wrap justify-center gap-2"
          >
            {FEATURES.map((label) => (
              <Badge
                key={label}
                variant="secondary"
                className="rounded-full px-3 py-1.5 text-xs font-normal text-muted-foreground"
              >
                <span className="mr-1.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary/10">
                  <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                    <path
                      d="M1 2.5L2.8 4L6 1"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    />
                  </svg>
                </span>
                {label}
              </Badge>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
