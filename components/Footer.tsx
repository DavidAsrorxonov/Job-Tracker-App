"use client";

import { ArrowRight, Github } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

  return (
    <footer>
      <Card className="border-t rounded-none bg-muted/30">
        <CardContent className="pt-14 space-y-14">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-2xl font-semibold">
              Organize better, <span className="text-primary">Get Hired</span>{" "}
              faster
            </h2>
            <p className="text-muted-foreground max-w-md">
              Clean UI. Thoughful UX. Solid engineering. Designed with
              developers in mind.
            </p>
            <Button className="group" onClick={() => router.push("/sign-up")}>
              Get Started{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <h3 className="font-bold text-primary text-lg">Job Tracker</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A thoughtfully crafted application focused on performance,
                clarity, and real-world usability.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">MongoDB</Badge>
                <Badge variant="secondary">shadcn/ui</Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="text-center text-xs text-muted-foreground">
            <p>
              Made with ❤️ by{" "}
              <a
                href="https://github.com/DavidAsrorxonov"
                target="_blank"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Dovudkhon Asrorkhonov
              </a>
            </p>
            <p className="mt-1">
              Built late at night ☕ — shipping from Japan 🇯🇵
            </p>
          </div>
        </CardContent>
      </Card>
    </footer>
  );
};

export default Footer;
