"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  EllipsisVertical,
  ExternalLink,
  Eye,
  FolderOpen,
  Hash,
  Info,
  RefreshCcw,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertTitle } from "@/components/ui/alert";
import svgPdf from "../../../../public/svgs/pdf-svgrepo-com.svg";

import dynamic from "next/dynamic";
import { setUnsetDefaultCvCoverLetter } from "@/lib/documents/set-unset-default-cv-cover-letter";
const PDFPreviewSheet = dynamic(() => import("./pdf-preview-sheet"), {
  ssr: false,
});

type UserDoc = {
  _id: string;
  type: "cv" | "cover-letter";
  path: string;
  originalName?: string;
  createdAt: string;
  isDefault?: boolean;
};

type Props = {
  docs: UserDoc[];
  setDocs: React.Dispatch<React.SetStateAction<UserDoc[]>>;
  onRefresh: () => Promise<void>;
};

const DocumentsList = ({ docs, setDocs, onRefresh }: Props) => {
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
    } catch (error: unknown) {
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

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard", {
      duration: 2000,
      position: "top-center",
      description: `Document ID: ${value}`,
    });
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex justify-between">
          <div className="flex flex-col">
            <CardTitle>Your Documents</CardTitle>
            <CardDescription>
              Open or delete your uploaded CVs and cover letters.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              disabled={isRefreshing}
              onClick={async () => {
                setIsRefreshing(true);
                try {
                  await onRefresh();
                } finally {
                  setIsRefreshing(false);
                }
              }}
            >
              <RefreshCcw
                className={`mr-2 h-4 w-4 ${isRefreshing && "animate-spin"}`}
              />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 max-h-96 overflow-y-auto">
          {docs.length > 3 && (
            <Alert className="py-2">
              <Info className="h-4 w-4" />
              <AlertTitle>Scroll to view more documents</AlertTitle>
            </Alert>
          )}

          {docs.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No documents uploaded yet.
            </p>
          )}

          {docs.map((doc) => (
            <div
              key={doc._id}
              className="flex items-center justify-between gap-3 rounded-lg border p-3"
            >
              <div className="w-full flex items-center gap-3">
                <Image src={svgPdf} alt="pdf" width={40} height={40} />

                <div className="w-full flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={doc.type === "cv" ? "default" : "outline"}
                      >
                        {doc.type === "cv" ? "CV" : "Cover Letter"}
                      </Badge>
                      {doc.isDefault && (
                        <Badge variant="outline">Default</Badge>
                      )}
                    </div>

                    <p className="mt-1 truncate max-w-lg text-sm font-medium">
                      {doc.originalName ?? doc.path.split("/").pop()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded: {new Date(doc.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={busyId === doc._id}
                        >
                          <EllipsisVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                          {doc.originalName ?? "Unnamed"}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => copyToClipboard(doc._id)}
                        >
                          <Hash className="mr-2 h-4 w-4" />
                          Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => copyToClipboard(doc.path)}
                        >
                          <FolderOpen className="mr-2 h-4 w-4" />
                          Copy Path
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDoc(doc._id)}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            viewDoc(
                              doc._id,
                              doc.originalName ?? doc.path.split("/").pop(),
                            )
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            toggleDefault(doc._id, doc.type, doc.isDefault)
                          }
                          disabled={busyId === doc._id}
                        >
                          {doc.isDefault ? (
                            <StarOff className="mr-2 h-4 w-4" />
                          ) : (
                            <Star className="mr-2 h-4 w-4" />
                          )}
                          {doc.isDefault
                            ? "Unset as Default"
                            : "Set as Default"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setPendingDeleteId(doc._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <AlertDialog
        open={Boolean(pendingDeleteId)}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this document?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The document will be removed from
              storage permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!pendingDeleteId) return;
                void deleteDoc(pendingDeleteId);
                setPendingDeleteId(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PDFPreviewSheet
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        url={previewUrl}
        fileName={previewFileName}
      />
    </>
  );
};

export default DocumentsList;
