"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Spotlight } from "./effects/spotlight";

const Hero = () => {
  return (
    <section className="relative w-full py-32">
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
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-6xl font-bold">
          A better way to track your job applications
        </h1>
        <p className="text-muted-foreground mb-10 text-xl">
          Capture, organize and manage your job search in one place
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link href={"/sign-up"}>
            <Button size="lg" className="h-12 px-8 text-lg font-medium">
              Start for free
              <ArrowRightIcon className="ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Free forever! No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
