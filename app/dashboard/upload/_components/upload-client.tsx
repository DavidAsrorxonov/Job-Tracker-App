"use client";

import UploadDocs from "@/components/upload-docs";
import { useMemo, useState } from "react";
import DocumentsList from "./documents-list";
import PieChartForDocsAnalysis from "./pie-chart-for-docs-analysis";
import TotalFileSize from "./total-file-size";
import { MAX_LIMIT_FILE_SIZE } from "@/constants/limit-bytes";

export interface UserDoc {
  _id: string;
  type: "cv" | "cover-letter";
  path: string;
  originalName?: string;
  createdAt: string;
  isDefault?: boolean;
  size?: number;
}

export default function UploadClient({
  initialDocs,
}: {
  initialDocs: UserDoc[];
}) {
  const [docs, setDocs] = useState<UserDoc[]>(initialDocs);

  const counts = useMemo(() => {
    const cv = docs.filter((doc: any) => doc.type === "cv").length;
    const coverLetter = docs.filter(
      (doc: any) => doc.type === "cover-letter",
    ).length;
    return { cv, coverLetter };
  }, [docs]);

  async function refreshDocs() {
    const res = await fetch("/api/user-documents", { cache: "no-store" });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error ?? "Failed to load documents");
    setDocs(json.docs);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col gap-6 flex-1 min-w-0">
          <UploadDocs onUploaded={refreshDocs} />

          <DocumentsList
            docs={docs}
            setDocs={setDocs}
            onRefresh={refreshDocs}
          />
        </div>

        <aside className="w-full lg:w-80 shrink-0">
          <div className="space-y-6 lg:sticky lg:top-40">
            <PieChartForDocsAnalysis counts={counts} />

            <TotalFileSize docs={docs} limitBytes={MAX_LIMIT_FILE_SIZE} />
          </div>
        </aside>
      </div>
    </main>
  );
}
