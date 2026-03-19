"use client";

import { useSession } from "@/lib/auth/auth-client";
import { TabId } from "../page";

type Props = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

const ProfileSidebar = ({ activeTab, onTabChange }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
};

export default ProfileSidebar;
