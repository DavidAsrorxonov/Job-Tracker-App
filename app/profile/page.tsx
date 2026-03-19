import { FolderOpen, Palette, TriangleAlert, User } from "lucide-react";
import ProfileTab from "./_components/profile-tab";
import PreferencesTab from "./_components/preferences-tab";
import DocumentsTab from "./_components/documents-tab";
import DangerZoneTab from "./_components/danger-zone-tab";

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
  return <div>ProfilePage</div>;
};

export default ProfilePage;
