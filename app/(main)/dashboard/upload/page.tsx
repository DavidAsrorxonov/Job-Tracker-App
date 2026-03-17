import Navbar from "./_components/navbar";
import { getUserDocumentsForPage } from "@/lib/documents/get-user-documents";
import UploadClient from "./_components/upload-client";

const Upload = async () => {
  const { docs } = await getUserDocumentsForPage();

  const safeDocs = docs.map((d: any) => ({
    ...d,
    _id: d._id.toString(),
    userId: d.userId?.toString?.() ?? d.userId,
    createdAt: d.createdAt?.toISOString?.() ?? d.createdAt,
    updatedAt: d.updatedAt?.toISOString?.() ?? d.updatedAt,
  }));

  return (
    <div>
      <Navbar />
      <UploadClient initialDocs={safeDocs} />
    </div>
  );
};

export default Upload;
