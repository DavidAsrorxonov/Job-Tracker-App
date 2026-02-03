"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import SpotlightFooter from "./effects/spotlight-footer";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="relative w-full overflow-hidden">
      <Card className="rounded-none border-none">
        <CardContent className="p-0">
          <div className="border-b">
            <div className="container mx-auto px-4 py-16 lg:py-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Contact
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="link"
                      className="h-auto p-0 text-muted-foreground hover:text-primary"
                      asChild
                    >
                      <a href="mailto:info@jobtracker.com">
                        info@jobtracker.com
                      </a>
                    </Button>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-muted-foreground hover:text-primary block"
                    >
                      Get in touch
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Connect
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="link"
                      className="h-auto p-0 text-muted-foreground hover:text-primary block"
                      asChild
                    >
                      <Link
                        href={"https://www.instagram.com/adovudkhan"}
                        target="_blank"
                      >
                        Instagram
                      </Link>
                    </Button>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-muted-foreground hover:text-primary block"
                      asChild
                    >
                      <Link href={"https://t.me/whoisdave01"} target="_blank">
                        Telegram
                      </Link>
                    </Button>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-muted-foreground hover:text-primary block"
                      asChild
                    >
                      <Link
                        href={"https://github.com/DavidAsrorxonov"}
                        target="_blank"
                      >
                        GitHub
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Subscribe
                  </h3>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Email"
                      className="w-full bg-transparent"
                    />
                    <ArrowRight className="absolute right-2 bottom-2 h-4 w-4 text-white/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative py-12 lg:py-16 overflow-hidden">
            <div className="w-full px-4">
              <h2
                className="
                  text-center font-extrabold uppercase leading-none
                  tracking-tighter text-primary
                  whitespace-nowrap
                  text-[clamp(2.5rem,12vw,10rem)]
                  select-none
                "
              >
                JOB TRACKER
              </h2>
            </div>
            <SpotlightFooter
              className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
              fill="#22c55e"
            />
          </div>

          <Separator />

          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>&copy; 2026 Job Tracker</p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <Button
                  variant="link"
                  className="h-auto p-0 text-muted-foreground text-sm"
                  asChild
                >
                  <a href="#">Privacy Policy</a>
                </Button>
                <Button
                  variant="link"
                  className="h-auto p-0 text-muted-foreground text-sm"
                  asChild
                >
                  <a href="#">Terms of Service</a>
                </Button>
                <span className="inline-flex items-center gap-2">
                  Crafted by
                  <Link
                    href={"https://github.com/DavidAsrorxonov"}
                    target="_blank"
                  >
                    @David
                  </Link>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </footer>
  );
};

export default Footer;
