"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DocumentsList from "./documents-list";
import PieChartForDocsAnalysis from "./pie-chart-for-docs-analysis";
import TotalFileSize from "./total-file-size";
import { MAX_LIMIT_FILE_SIZE } from "@/constants/limit-bytes";
import { useSession } from "@/lib/auth/auth-client";
import dynamic from "next/dynamic";
import PageLoading from "@/components/page-loading";
import DefaultDocumentsList from "./default-documents-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UploadDocs = dynamic(() => import("@/components/upload-docs"), {
  ssr: false,
  loading: () => <PageLoading text="Loading document uploader" />,
});

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
  const sessionQuery = useSession();
  const session = (sessionQuery as any)?.data ?? sessionQuery;
  const isPending = Boolean((sessionQuery as any)?.isPending);

  const userId: string | undefined = session?.user?.id;

  const prevUserIdRef = useRef<string | undefined>(undefined);

  const [docs, setDocs] = useState<UserDoc[]>(initialDocs);

  useEffect(() => {
    if (isPending) return;

    const prevUserId = prevUserIdRef.current;
    if (prevUserId === userId) return;

    prevUserIdRef.current = userId;

    setDocs([]);

    if (!userId) return;

    void refreshDocs();
  }, [userId, isPending]);

  const counts = useMemo(() => {
    const cv = docs.filter((doc: any) => doc.type === "cv").length;
    const coverLetter = docs.filter(
      (doc: any) => doc.type === "cover-letter",
    ).length;
    return { cv, coverLetter };
  }, [docs]);

  async function refreshDocs() {
    const res = await fetch("/api/user-documents", {
      cache: "no-store",
      headers: { "Cache-Control": "no-store" },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error ?? "Failed to load documents");
    setDocs(json.docs);
  }

  const defaultCV = docs.filter(
    (doc) => doc.isDefault === true && doc.type === "cv",
  )[0];

  const defaultCoverLetter = docs.filter(
    (doc) => doc.isDefault === true && doc.type === "cover-letter",
  )[0];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6 min-w-0">
          <UploadDocs onUploaded={refreshDocs} docs={docs} />
          <DocumentsList
            docs={docs}
            setDocs={setDocs}
            onRefresh={refreshDocs}
          />
        </div>

        <aside className="lg:sticky lg:top-40">
          <div className="rounded-2xl border bg-background p-4 shadow-sm">
            <Tabs defaultValue="defaults" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="defaults">Defaults</TabsTrigger>
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="size">Size</TabsTrigger>
              </TabsList>

              <TabsContent value="defaults" className="mt-4">
                <DefaultDocumentsList
                  cv={defaultCV}
                  coverLetter={defaultCoverLetter}
                />
              </TabsContent>

              <TabsContent value="chart" className="mt-4">
                <PieChartForDocsAnalysis counts={counts} />
              </TabsContent>

              <TabsContent value="size" className="mt-4">
                <TotalFileSize docs={docs} limitBytes={MAX_LIMIT_FILE_SIZE} />
              </TabsContent>
            </Tabs>
          </div>
        </aside>
      </div>
    </main>
  );
}
