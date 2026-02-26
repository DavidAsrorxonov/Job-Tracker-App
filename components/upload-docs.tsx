"use client";

import * as React from "react";
import { useSession } from "@/lib/auth/auth-client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

type DocType = "cv" | "cover-letter";

export default function UploadDocs() {
  const { data: session } = useSession();

  const [file, setFile] = React.useState<File | null>(null);
  const [docType, setDocType] = React.useState<DocType>("cv");
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const maxBytes = 5 * 1024 * 1024;

  const isAuthed = !!session?.user?.id;
  const isPdf = file?.type === "application/pdf";
  const isSizeOk = file ? file.size <= maxBytes : true;

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setProgress(0);
  }

  function clearFile() {
    setFile(null);
    setProgress(0);
  }

  async function upload() {
    if (!file) return;

    if (!isAuthed) {
      toast.error("You must be signed in to upload a file.", {
        duration: 2000,
        position: "top-center",
        description: "Please sign in.",
      });
      return;
    }

    if (!isPdf) {
      toast.error("Please upload a PDF file.", {
        duration: 2000,
        position: "top-center",
        description: "Only PDF files are allowed.",
      });
      return;
    }

    if (!isSizeOk) {
      toast.error("Please upload a file less than 5MB.", {
        duration: 2000,
        position: "top-center",
        description: "Only PDF files are allowed.",
      });
      return;
    }

    try {
      setIsUploading(true);

      setProgress(20);

      const fd = new FormData();
      fd.append("file", file);
      fd.append("userId", session!.user.id);
      fd.append("docType", docType);

      const res = await fetch("/api/upload-document", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error ?? "Upload failed");
      }

      setProgress(100);

      toast.success("Successfully uploaded document", {
        duration: 2000,
        position: "top-center",
      });

      clearFile();
    } catch (err: any) {
      toast.error("Failed to upload document", {
        duration: 2000,
        position: "top-center",
        description: err.message,
      });
      setProgress(0);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Upload documents</CardTitle>
        <CardDescription>
          Upload your CV or cover letter as a PDF (max 5MB).
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Document type</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={docType === "cv" ? "default" : "outline"}
              onClick={() => setDocType("cv")}
              disabled={isUploading}
            >
              CV
            </Button>
            <Button
              type="button"
              variant={docType === "cover-letter" ? "default" : "outline"}
              onClick={() => setDocType("cover-letter")}
              disabled={isUploading}
            >
              Cover letter
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pdf">PDF file</Label>
          <Input
            id="pdf"
            type="file"
            accept="application/pdf"
            onChange={onPickFile}
            disabled={isUploading}
          />
          <p className="text-sm text-muted-foreground">
            Tip: Name your file clearly (e.g.{" "}
            <span className="font-medium">Software_Engineer_CV.pdf</span>).
          </p>
        </div>

        {file && (
          <div className="rounded-lg border p-3 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                  {file.type || "unknown type"}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={clearFile}
                disabled={isUploading}
              >
                Remove
              </Button>
            </div>

            {!isPdf && (
              <p className="text-xs text-destructive">
                Only PDF files are allowed.
              </p>
            )}
            {!isSizeOk && (
              <p className="text-xs text-destructive">
                File must be 5MB or smaller.
              </p>
            )}

            {(isUploading || progress > 0) && <Progress value={progress} />}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={upload}
            disabled={!file || !isAuthed || isUploading || !isPdf || !isSizeOk}
            className="flex-1"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={clearFile}
            disabled={!file || isUploading}
          >
            Clear
          </Button>
        </div>

        {!isAuthed && (
          <p className="text-sm text-destructive">
            You must be signed in to upload documents.
          </p>
        )}

        <p className="text-muted-foreground text-center text-sm">
          After <span className="text-primary">uploading</span>, please click
          the <span className="text-primary">'Refresh'</span> button on the{" "}
          <span className="text-primary">'Your Documents'</span> section.
        </p>
      </CardContent>
    </Card>
  );
}
