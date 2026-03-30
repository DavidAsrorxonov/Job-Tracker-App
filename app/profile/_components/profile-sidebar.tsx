"use client";

import { useSession } from "@/lib/auth/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TabId, TABS } from "./profile-shell";

type Props = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

const ProfileSidebar = ({ activeTab, onTabChange }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <aside className="top-0 z-20 w-full border-b border-border/60 bg-muted/20 px-3 py-4 lg:sticky lg:h-screen lg:w-60 lg:shrink-0 lg:border-r lg:border-b-0 lg:px-3 lg:py-6">
      <div className="mb-4 flex items-center gap-3 px-1 sm:px-2 lg:mb-6 lg:flex-col lg:text-center">
        <Avatar className="h-12 w-12 shrink-0 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
          <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
          <AvatarFallback className="text-sm font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 lg:w-full">
          <p className="truncate text-sm font-medium text-foreground">
            {user?.name ?? "—"}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user?.email ?? "—"}
          </p>
        </div>
      </div>

      <Separator className="mb-3 lg:mb-4" />

      <ScrollArea className="w-full -mx-3 px-3 lg:hidden">
        <nav className="flex gap-2 pb-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isDanger = tab.id === "danger-zone";

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "group relative flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm whitespace-nowrap transition-all duration-200",
                  isActive && !isDanger
                    ? "bg-primary/8 text-foreground"
                    : isDanger && isActive
                      ? "bg-destructive/8 text-destructive"
                      : isDanger
                        ? "text-muted-foreground hover:bg-destructive/5 hover:text-destructive"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                {isActive && (
                  <div
                    className={cn(
                      "absolute left-0 top-1/2 hidden h-5 w-0.5 -translate-y-1/2 rounded-full lg:block",
                      isDanger ? "bg-destructive" : "bg-primary",
                    )}
                  />
                )}

                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    isActive && !isDanger
                      ? "text-primary"
                      : isActive && isDanger
                        ? "text-destructive"
                        : isDanger
                          ? "text-muted-foreground/60 group-hover:text-destructive"
                          : "text-muted-foreground/60 group-hover:text-foreground",
                  )}
                />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </ScrollArea>

      <nav className="hidden gap-2 lg:flex lg:flex-col lg:gap-0.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isDanger = tab.id === "danger-zone";

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "group relative flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm whitespace-nowrap transition-all duration-200 lg:gap-3 lg:px-3 lg:py-2.5",
                isActive && !isDanger
                  ? "bg-primary/8 text-foreground"
                  : isDanger && isActive
                    ? "bg-destructive/8 text-destructive"
                    : isDanger
                      ? "text-muted-foreground hover:bg-destructive/5 hover:text-destructive"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              {isActive && (
                <div
                  className={cn(
                    "absolute left-0 top-1/2 hidden h-5 w-0.5 -translate-y-1/2 rounded-full lg:block",
                    isDanger ? "bg-destructive" : "bg-primary",
                  )}
                />
              )}

              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive && !isDanger
                    ? "text-primary"
                    : isActive && isDanger
                      ? "text-destructive"
                      : isDanger
                        ? "text-muted-foreground/60 group-hover:text-destructive"
                        : "text-muted-foreground/60 group-hover:text-foreground",
                )}
              />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="hidden flex-1 lg:block" />

      <div className="mt-4 lg:mt-0">
        <Separator className="mb-3 lg:mb-4" />

        <Button
          variant="ghost"
          size="sm"
          asChild
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="truncate">Back to dashboard</span>
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
