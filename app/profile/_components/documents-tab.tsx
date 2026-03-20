"use client";

import { useState } from "react";
import { UserDoc } from "@/types/user-documents";
import DocumentsList from "@/app/(main)/dashboard/upload/_components/documents-list";

type Props = {
  initialDocs: UserDoc[];
};

const DocumentsTab = ({ initialDocs }: Props) => {
  const [docs, setDocs] = useState<UserDoc[]>(initialDocs);

  const fetchDocs = async () => {
    const res = await fetch("/api/user-documents");
    const json = await res.json();
    setDocs(json.docs);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Documents</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your uploaded CVs and cover letters.
        </p>
      </div>

      <DocumentsList docs={docs} setDocs={setDocs} onRefresh={fetchDocs} />
    </div>
  );
};

export default DocumentsTab;
