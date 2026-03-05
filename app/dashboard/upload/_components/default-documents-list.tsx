"use client";

import React, { useState } from "react";
import { UserDoc } from "./upload-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format } from "date-fns";
import {
  FileText,
  Mail,
  Star,
  ChevronDown,
  Hash,
  FolderOpen,
  HardDrive,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

function formatBytes(bytes?: number) {
  if (!bytes) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DocCard({
  doc,
  type,
}: {
  doc?: UserDoc;
  type: "cv" | "cover-letter";
}) {
  const [open, setOpen] = useState(false);

  const isCV = type === "cv";
  const icon = isCV ? FileText : Mail;
  const Icon = icon;
  const label = isCV ? "CV / Resume" : "Cover Letter";
  const emptyText = isCV
    ? "No Default CV set yet"
    : "No Default Cover Letter set yet";

  if (!doc) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-dashed border-border/60 px-4 py-3.5 text-muted-foreground">
        <Icon className="h-4 w-4 shrink-0" />
        <div>
          <p className="text-xs font-medium">{label}</p>
          <p className="text-xs italic">{emptyText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border/60 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3.5">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
            isCV
              ? "bg-primary/10 text-primary"
              : "bg-violet-500/10 text-violet-500",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {label}
            </p>
            {doc.isDefault && (
              <Badge
                variant="secondary"
                className="text-xs font-normal gap-1 py-0"
              >
                <Star className="h-2.5 w-2.5" /> Default
              </Badge>
            )}
          </div>
          <p className="text-sm font-medium truncate mt-0.5">
            {doc.originalName ?? "Unnamed file"}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-xs text-muted-foreground">
          {formatBytes(doc.size) && (
            <span className="hidden sm:inline">{formatBytes(doc.size)}</span>
          )}
        </div>
      </div>

      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="border-t border-border/40 px-4 py-1.5 bg-muted/30">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-muted-foreground gap-1 px-0 hover:text-foreground hover:bg-transparent"
            >
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  open && "rotate-180",
                )}
              />
              Advanced
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="border-t border-border/40 px-4 py-3 space-y-2 bg-muted/10">
            <div className="flex items-start gap-2 text-xs">
              <Hash className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-muted-foreground mb-0.5">ID</p>
                <p className="font-mono text-foreground break-all">{doc._id}</p>
              </div>
            </div>
            <Separator className="my-1" />
            <div className="flex items-start gap-2 text-xs">
              <FolderOpen className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-muted-foreground mb-0.5">Path</p>
                <p className="font-mono text-foreground break-all">
                  {doc.path}
                </p>
              </div>
            </div>
            <Separator className="my-1" />
            <div className="flex items-center gap-2 text-xs">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground mb-0.5">Uploaded</p>
                <p className="text-foreground">
                  {format(new Date(doc.createdAt), "PPP")}
                </p>
              </div>
            </div>
            {doc.size && (
              <>
                <Separator className="my-1" />
                <div className="flex items-center gap-2 text-xs">
                  <HardDrive className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground mb-0.5">Size</p>
                    <p className="text-foreground">{formatBytes(doc.size)}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

const DefaultDocumentsList = ({
  cv,
  coverLetter,
}: {
  cv?: UserDoc;
  coverLetter?: UserDoc;
}) => {
  return (
    <Card className="w-full shadow-sm border-border/60">
      <CardHeader className="border-b border-border/50 bg-muted/30 px-6 py-4">
        <CardTitle className="text-base font-semibold tracking-tight">
          Default Documents
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          These documents are used by default when applying to jobs
        </p>
      </CardHeader>
      <CardContent className="px-6 py-5 space-y-3">
        <DocCard doc={cv} type="cv" />
        <DocCard doc={coverLetter} type="cover-letter" />
      </CardContent>
    </Card>
  );
};

export default DefaultDocumentsList;
