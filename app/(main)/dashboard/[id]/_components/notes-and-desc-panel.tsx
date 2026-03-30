"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

function ContentDialog({
  title,
  content,
  emptyText,
}: {
  title: string;
  content?: string;
  emptyText: string;
}) {
  const hasContent = Boolean(content?.trim());

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          disabled={!hasContent}
          title={hasContent ? `View ${title.toLowerCase()}` : "Nothing to view"}
        >
          View {title}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100vw-2rem)] max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="whitespace-pre-wrap rounded-md border bg-muted/30 p-4 text-sm leading-relaxed wrap-break-word">
            {hasContent ? content : emptyText}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

const NotesAndDescriptionPanel = ({
  description,
  notes,
}: {
  description?: string;
  notes?: string;
}) => {
  const notesPreview = useMemo(() => notes?.trim(), [notes]);
  const descPreview = useMemo(() => description?.trim(), [description]);

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold sm:text-lg">
          Notes & Description
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <section className="space-y-2">
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
            Notes
          </h3>

          <div className="rounded-md border bg-muted/40 p-3 text-sm leading-relaxed">
            {notesPreview ? (
              <p className="line-clamp-3 whitespace-pre-wrap wrap-break-word">
                {notesPreview}
              </p>
            ) : (
              <span className="italic text-muted-foreground">
                No notes added yet.
              </span>
            )}
          </div>

          <ContentDialog
            title="Notes"
            content={notes}
            emptyText="No notes added yet."
          />
        </section>

        <Separator />

        <section className="space-y-2">
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
            Description
          </h3>

          <div className="rounded-md border bg-muted/40 p-3 text-sm leading-relaxed">
            {descPreview ? (
              <p className="line-clamp-3 whitespace-pre-wrap wrap-break-word">
                {descPreview}
              </p>
            ) : (
              <span className="italic text-muted-foreground">
                No description provided.
              </span>
            )}
          </div>

          <ContentDialog
            title="Description"
            content={description}
            emptyText="No description provided."
          />
        </section>
      </CardContent>
    </Card>
  );
};

export default NotesAndDescriptionPanel;
