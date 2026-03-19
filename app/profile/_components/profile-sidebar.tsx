"use client";

import { useSession } from "@/lib/auth/auth-client";
import { TabId } from "../page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

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
    </aside>
  );
};

export default ProfileSidebar;
