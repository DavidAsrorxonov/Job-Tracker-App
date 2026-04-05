import { UserDoc } from "@/types/user-documents";
import { useState } from "react";
import { toast } from "sonner";
import { setUnsetDefaultCvCoverLetter } from "../documents/set-unset-default-cv-cover-letter";

export function useDocumentsList(
  setDocs: React.Dispatch<React.SetStateAction<UserDoc[]>>,
  onRefresh: () => Promise<void>,
) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewFileName, setPreviewFileName] = useState<string | undefined>();
  const [previewOpen, setPreviewOpen] = useState(false);

  function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Something went wrong";
  }

  async function getSignedUrl(docId: string): Promise<string> {
    const res = await fetch("/api/user-documents/signed-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docId }),
    });
    const json = await res.json();
    if (!res.ok)
      throw new Error(json?.error ?? "Failed to generate signed url");
    return json.url;
  }

  async function openDoc(docId: string) {
    setBusyId(docId);
    try {
      const url = await getSignedUrl(docId);
      window.open(url, "_blank");
    } catch (error) {
      toast.error("Failed to open document", {
        description: getErrorMessage(error),
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setBusyId(null);
    }
  }

  async function deleteDoc(docId: string) {
    setBusyId(docId);
    try {
      const res = await fetch("/api/user-documents/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed to delete document");

      toast.success("Successfully deleted document", {
        duration: 2000,
        position: "top-center",
        description: `Document has been deleted`,
      });
      setDocs((prev) => prev.filter((doc) => doc._id !== docId));
    } catch (error: unknown) {
      toast.error("Failed to delete document", {
        description: getErrorMessage(error),
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setBusyId(null);
    }
  }

  async function viewDoc(docId: string, fileName?: string) {
    setBusyId(docId);
    try {
      const url = await getSignedUrl(docId);
      setPreviewUrl(url);
      setPreviewFileName(fileName);
      setPreviewOpen(true);
    } catch (error: unknown) {
      toast.error("Failed to preview document", {
        description: getErrorMessage(error),
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setBusyId(null);
    }
  }

  async function toggleDefault(
    docId: string,
    type: "cv" | "cover-letter",
    isDefault: boolean | undefined,
  ) {
    setBusyId(docId);
    try {
      const result = await setUnsetDefaultCvCoverLetter(
        isDefault ? "" : docId,
        type,
      );

      if (!result.success) throw new Error(result.error);

      setDocs((prev) =>
        prev.map((doc) => {
          if (doc.type !== type) return doc;
          if (doc._id === docId) return { ...doc, isDefault: !isDefault };

          return { ...doc, isDefault: false };
        }),
      );

      toast.success(isDefault ? "Default removed" : "Set as default", {
        description: isDefault
          ? "This document is no longer the default."
          : "This document will be pre-selected for new applications.",
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to update default", {
        description: getErrorMessage(error),
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setBusyId(null);
    }
  }

  async function uploadToGoogleDrive(docId: string) {
    setBusyId(docId);

    try {
      const res = await fetch("/api/integrations/google-drive/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: docId }),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json?.error === "Google Drive not connected") {
          window.location.href = `/api/integrations/google-drive/connect?documentId=${docId}`;
          return;
        }

        throw new Error(json?.error ?? "Failed to upload to Google Drive");
      }

      toast.success("Successfully uploaded to Google Drive", {
        description: "Your document was successfully uploaded.",
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to upload to Google Drive", {
        description: getErrorMessage(error),
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setBusyId(null);
    }
  }

  async function handleRefresh() {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  }

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard", {
      duration: 2000,
      position: "top-center",
      description: `Document ID: ${value}`,
    });
  }

  return {
    busyId,
    isRefreshing,
    pendingDeleteId,
    previewUrl,
    previewFileName,
    previewOpen,
    setPendingDeleteId,
    setPreviewOpen,
    openDoc,
    deleteDoc,
    viewDoc,
    toggleDefault,
    uploadToGoogleDrive,
    handleRefresh,
    copyToClipboard,
  };
}
