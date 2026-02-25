"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type UserDoc = {
  _id: string;
  type: "cv" | "cover-letter";
  path: string;
  originalName?: string;
  createdAt: string;
  isDefault?: boolean;
};

const DocumentsList = () => {
  const [docs, setDocs] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/user-documents");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed to load documents");
      setDocs(json.docs);
    } catch (error: any) {
      toast.error("Failed to load documents", {
        description: error.message,
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

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
    } catch (error: any) {
      toast.error("Failed to open document", {
        description: error.message,
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
    } catch (error: any) {
      toast.error("Failed to delete document", {
        description: error.message,
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Documents</CardTitle>
        <CardDescription>
          Open or delete your uploaded CVs and cover letters.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading && (
          <>
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </>
        )}

        {!loading && docs.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No documents uploaded yet.
          </p>
        )}

        {!loading &&
          docs.map((doc) => (
            <div
              key={doc._id}
              className="flex items-center justify-between gap-3 rounded-lg border p-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant={doc.type === "cv" ? "default" : "secondary"}>
                    {doc.type === "cv" ? "CV" : "Cover Letter"}
                  </Badge>
                  {doc.isDefault && <Badge variant="outline">Default</Badge>}
                </div>

                <p className="mt-1 truncate text-sm font-medium">
                  {doc.originalName ?? doc.path.split("/").pop()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Uploaded: {new Date(doc.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openDoc(doc._id)}
                  disabled={busyId === doc._id}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={busyId === doc._id}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this document?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove it from storage and you won’t be able
                        to recover it.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteDoc(doc._id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default DocumentsList;
