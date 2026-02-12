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
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="rounded-md border bg-muted/30 p-4 text-sm leading-relaxed whitespace-pre-wrap">
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
    <div className="div2">
      <Card className="flex flex-col shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Notes & Description
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {/* Notes */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Notes
            </h3>

            <div className="rounded-md border bg-muted/40 p-2 text-sm leading-relaxed">
              {notesPreview ? (
                <p className="whitespace-pre-wrap line-clamp-2">
                  {notesPreview}
                </p>
              ) : (
                <span className="text-muted-foreground italic">
                  No notes added yet.
                </span>
              )}
            </div>

            <ContentDialog
              title="Notes"
              content={notes}
              emptyText="No notes added yet."
            />
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Description
            </h3>

            <div className="rounded-md border bg-muted/40 p-2 text-sm leading-relaxed">
              {descPreview ? (
                <p className="whitespace-pre-wrap line-clamp-2">
                  {descPreview}
                </p>
              ) : (
                <span className="text-muted-foreground italic">
                  No description provided.
                </span>
              )}
            </div>

            <ContentDialog
              title="Description"
              content={description}
              emptyText="No description provided."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesAndDescriptionPanel;
