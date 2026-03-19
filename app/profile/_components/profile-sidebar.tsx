"use client";

import { useSession } from "@/lib/auth/auth-client";
import { TabId, TABS } from "../page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-border/60 bg-muted/20 px-3 py-6">
      <div className="mb-6 flex flex-col items-center gap-3 px-2 text-center">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
          <AvatarFallback className="text-sm font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="w-full">
          <p className="truncate text-sm font-medium text-foreground">
            {user?.name ?? "—"}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user?.email ?? "—"}
          </p>
        </div>
      </div>

      <Separator />

      <nav className="flex flex-col gap-0.5">
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
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200",
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
                    "absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full",
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

      <div className="flex-1" />

      <Separator />

      <Button
        variant="ghost"
        size="sm"
        asChild
        className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
      >
        <Link href="/dashboard">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
      </Button>
    </aside>
  );
};

export default ProfileSidebar;
