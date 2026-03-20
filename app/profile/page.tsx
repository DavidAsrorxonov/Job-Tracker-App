import { Suspense } from "react";
import ProfileShell from "./_components/profile-shell";
import { getUserDocumentsForPage } from "@/lib/documents/get-user-documents";
import { Loader2 } from "lucide-react";

const ProfileContent = async () => {
  const { docs } = await getUserDocumentsForPage();

  const safeDocs = docs.map((d: any) => ({
    ...d,
    _id: d._id.toString(),
    userId: d.userId?.toString?.() ?? d.userId,
    createdAt: d.createdAt?.toISOString?.() ?? d.createdAt,
    updatedAt: d.updatedAt?.toISOString?.() ?? d.updatedAt,
  }));

  return <ProfileShell initialDocs={safeDocs} />;
};

const ProfilePage = async () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
};

export default ProfilePage;
