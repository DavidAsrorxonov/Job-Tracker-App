"use client";

import { FolderOpen, Palette, TriangleAlert, User } from "lucide-react";
import ProfileTab from "./_components/profile-tab";
import PreferencesTab from "./_components/preferences-tab";
import DocumentsTab from "./_components/documents-tab";
import DangerZoneTab from "./_components/danger-zone-tab";
import { useState } from "react";
import ProfileSidebar from "./_components/profile-sidebar";

export type TabId = "profile" | "preferences" | "documents" | "danger-zone";

export const TABS = [
  { id: "profile" as TabId, label: "Profile", icon: User },
  { id: "preferences" as TabId, label: "Preferences", icon: Palette },
  { id: "documents" as TabId, label: "Documents", icon: FolderOpen },
  { id: "danger-zone" as TabId, label: "Danger Zone", icon: TriangleAlert },
];

const TABS_CONTENT: Record<TabId, React.ReactNode> = {
  profile: <ProfileTab />,
  preferences: <PreferencesTab />,
  documents: <DocumentsTab />,
  "danger-zone": <DangerZoneTab />,
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  return (
    <div className="flex min-h-screen bg-background">
      <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-10">
          {TABS_CONTENT[activeTab]}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
