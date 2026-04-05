"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface GoogleDriveAutoExportProps {
  onSuccess?: () => Promise<void> | void;
}

export default function GoogleDriveAutoExport({
  onSuccess,
}: GoogleDriveAutoExportProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasRunRef = useRef(false);

  useEffect(() => {
    const documentId = searchParams.get("export");

    if (!documentId || hasRunRef.current) return;

    hasRunRef.current = true;

    async function runExport() {
      try {
        const res = await fetch("/api/integrations/google-drive/export", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentId }),
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.error ?? "Failed to upload to Google Drive");
        }

        await onSuccess?.();

        toast.success("Uploaded to Google Drive", {
          description: "Your document was successfully uploaded.",
          duration: 2000,
          position: "top-center",
        });
      } catch (error) {
        toast.error("Failed to upload to Google Drive", {
          description:
            error instanceof Error ? error.message : "Something went wrong",
          duration: 2000,
          position: "top-center",
        });
      } finally {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("export");

        const nextUrl = params.toString()
          ? `/dashboard/upload?${params.toString()}`
          : "/dashboard/upload";

        router.replace(nextUrl);
      }
    }

    void runExport();
  }, [onSuccess, router, searchParams]);

  return null;
}
