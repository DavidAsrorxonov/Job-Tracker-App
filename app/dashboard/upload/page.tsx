import UploadDocs from "@/components/upload-docs";
import Navbar from "./_components/navbar";
import DocumentsList from "./_components/documents-list";
import { getUserDocumentsForPage } from "@/lib/documents/get-user-documents";

const Upload = async () => {
  const { docs, counts } = await getUserDocumentsForPage();

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
      <div className="w-full flex">
        <div className="w-1/2 p-6 flex h-fit">
          <UploadDocs />
        </div>

        <div className="w-1/2 p-6">
          <DocumentsList initialDocs={safeDocs} />
        </div>
      </div>
    </div>
  );
};

export default Upload;
