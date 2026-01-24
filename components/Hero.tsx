import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-32">
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
