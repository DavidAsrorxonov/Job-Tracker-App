"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { GoogleIcon } from "@/components/google-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth/auth-client";
import { ModeToggle } from "@/components/mode-toggle";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error("Failed to sign in", {
          position: "top-center",
          description: "Something went wrong. Please try again",
          duration: 2000,
        });
        console.error(error);
      }
    } catch (error) {
      toast.error("Failed to sign in", {
        position: "top-center",
        description: "Something went wrong. Please try again",
        duration: 2000,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[480px_1fr]">
        <section className="flex min-h-screen items-center justify-center border-r border-border bg-background px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <Link href="/" className="mb-12 inline-block">
              <Image
                src="/images/ascendio-glowing-cropped.png"
                alt="Ascendio"
                width={170}
                height={56}
                priority
                className="h-auto w-auto"
              />
            </Link>

            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Welcome!
              </h1>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                Sign in to continue managing your job applications with clarity.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <Button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="h-12 w-full"
                variant={"outline"}
              >
                {loading ? (
                  "Redirecting..."
                ) : (
                  <span className="flex items-center gap-2">
                    <GoogleIcon />
                    Continue with Google
                  </span>
                )}
              </Button>

              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Ascendio
                </span>
                <Separator className="flex-1" />
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                Built for focused job seekers who want a cleaner way to track
                applications, interviews, and offers.
              </p>
            </div>

            <p className="mt-14 text-xs leading-6 text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link
                href="#"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-muted/20 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(1,98,56,0.18),transparent_30%)] dark:bg-[radial-gradient(circle_at_top,rgba(1,98,56,0.28),transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(120,120,120,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_30%)]" />

          <div className="relative flex w-full flex-col justify-between px-10 py-10 xl:px-16">
            <div className="flex gap-2 justify-end">
              <Button variant="outline" asChild>
                <Link href="/">
                  Back to website
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <ModeToggle />
            </div>

            <div className="mx-auto flex w-full max-w-3xl flex-1 items-center">
              <div className="space-y-8">
                <div className="text-7xl leading-none text-muted-foreground/20">
                  “
                </div>

                <div className="space-y-6">
                  <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
                    Track every application.
                    <br />
                    Stay organized.
                    <br />
                    Move upward.
                  </h2>

                  <p className="max-w-xl text-base leading-7 text-muted-foreground xl:text-lg">
                    Ascendio helps you keep your job search structured — from
                    application to interview to offer — without the chaos of
                    scattered notes and forgotten follow-ups.
                  </p>
                </div>

                <div className="grid max-w-xl gap-4 pt-4 sm:grid-cols-3">
                  <Card className="border-border/70 bg-card/70 backdrop-blur">
                    <CardContent className="p-4">
                      <FolderKanban className="mb-3 h-5 w-5 text-[#016238]" />
                      <p className="text-sm font-medium">Track applications</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Keep every role and stage in one place.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border/70 bg-card/70 backdrop-blur">
                    <CardContent className="p-4">
                      <BriefcaseBusiness className="mb-3 h-5 w-5 text-[#016238]" />
                      <p className="text-sm font-medium">Organize interviews</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Stay on top of timelines and next steps.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border/70 bg-card/70 backdrop-blur">
                    <CardContent className="p-4">
                      <Sparkles className="mb-3 h-5 w-5 text-[#016238]" />
                      <p className="text-sm font-medium">Move with clarity</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        A calmer workflow for your search.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>Ascendio</p>
              <p>Designed for modern job tracking</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignIn;
