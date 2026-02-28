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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  ExternalLink,
  Eye,
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

  function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Something went wrong";
  }

  async function openDoc(docId: string) {
    setBusyId(docId);
    try {
      const res = await fetch("/api/user-documents/signed-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docId }),
      });

      const json = await res.json();
      if (!res.ok)
        throw new Error(json?.error ?? "Failed to generate signed url");
      window.open(json.url, "_blank");
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

  function viewDocPlaceholder() {
    toast.info("View action is not implemented yet.", {
      duration: 2000,
      position: "top-center",
    });
  }

  function toggleDefaultPlaceholder(isDefault?: boolean) {
    toast.info(
      isDefault
        ? "Unset default is not implemented yet."
        : "Set as default is not implemented yet.",
      {
        duration: 2000,
        position: "top-center",
      },
    );
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
                <Image
                  src={"/images/pdf.png"}
                  alt="pdf"
                  width={40}
                  height={40}
                />

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
                        <DropdownMenuItem onClick={() => openDoc(doc._id)}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={viewDocPlaceholder}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            toggleDefaultPlaceholder(doc.isDefault)
                          }
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
    </>
  );
};

export default DocumentsList;
