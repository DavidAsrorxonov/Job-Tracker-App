import UploadDocs from "@/components/upload-docs";
import Navbar from "./_components/navbar";
import DocumentsList from "./_components/documents-list";
import { getUserDocumentsForPage } from "@/lib/documents/get-user-documents";
import PieChartForDocsAnalysis from "./_components/pie-chart-for-docs-analysis";
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

  console.log("SAFE DOCS: ", safeDocs);

  return (
    <div>
      <Navbar />
      {/* <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            <UploadDocs />
            <DocumentsList initialDocs={safeDocs} />
          </div>

          <aside className="w-80 shrink-0">
            <div className="sticky top-32">
              <PieChartForDocsAnalysis counts={counts} />
            </div>
          </aside>
        </div>
      </main> */}
      <UploadClient initialDocs={safeDocs} />
    </div>
  );
};

export default Upload;
