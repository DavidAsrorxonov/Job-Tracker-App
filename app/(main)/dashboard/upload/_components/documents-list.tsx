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
import { Alert, AlertTitle } from "@/components/ui/alert";
import svgPdf from "@/public/svgs/pdf-svgrepo-com.svg";
import drive from "@/public/svgs/drive.svg";

import dynamic from "next/dynamic";
import { UserDoc } from "@/types/user-documents";
import { useDocumentsList } from "@/lib/hooks/useDocumentsList";
const PDFPreviewSheet = dynamic(() => import("./pdf-preview-sheet"), {
  ssr: false,
});

type Props = {
  docs: UserDoc[];
  setDocs: React.Dispatch<React.SetStateAction<UserDoc[]>>;
  onRefresh: () => Promise<void>;
};

const DocumentsList = ({ docs, setDocs, onRefresh }: Props) => {
  const {
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
    handleRefresh,
    copyToClipboard,
  } = useDocumentsList(setDocs, onRefresh);

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
            <Button disabled={isRefreshing} onClick={handleRefresh}>
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
                      <DropdownMenuContent align="end" className="w-64">
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
                        <DropdownMenuItem disabled={true}>
                          <Image
                            src={drive}
                            alt="google drive image"
                            width={20}
                            height={20}
                          />
                          Upload to Google Drive
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
