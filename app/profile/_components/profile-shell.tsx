"use client";

import { useState } from "react";
import {
  User,
  Palette,
  FolderOpen,
  TriangleAlert,
  Monitor,
} from "lucide-react";

import ProfileSidebar from "./profile-sidebar";
import ProfileTab from "./profile-tab";
import PreferencesTab from "./preferences-tab";
import DocumentsTab from "./documents-tab";
import DangerZoneTab from "./danger-zone-tab";
import { UserDoc } from "@/types/user-documents";
import SessionsTab from "./sessions-tab";

export type TabId =
  | "profile"
  | "preferences"
  | "documents"
  | "sessions"
  | "danger-zone";

export const TABS = [
  { id: "profile" as TabId, label: "Profile", icon: User },
  { id: "preferences" as TabId, label: "Preferences", icon: Palette },
  { id: "documents" as TabId, label: "Documents", icon: FolderOpen },
  { id: "sessions" as TabId, label: "Sessions", icon: Monitor },
  { id: "danger-zone" as TabId, label: "Danger Zone", icon: TriangleAlert },
];

type Props = {
  initialDocs: UserDoc[];
};

const ProfileShell = ({ initialDocs }: Props) => {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const TAB_CONTENT: Record<TabId, React.ReactNode> = {
    profile: <ProfileTab />,
    preferences: <PreferencesTab />,
    documents: <DocumentsTab initialDocs={initialDocs} />,
    sessions: <SessionsTab />,
    "danger-zone": <DangerZoneTab />,
  };

  return (
    <div className="flex min-h-screen bg-background">
      <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-10">
          {TAB_CONTENT[activeTab]}
        </div>
      </main>
    </div>
  );
};

export default ProfileShell;
