"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string | null;
  fileName?: string;
};

export default function PDFPreviewSheet({
  open,
  onOpenChange,
  url,
  fileName,
}: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPageNumber(1);
    setScale(1.0);
    setNumPages(0);
    setLoading(true);
  }, [url]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  }

  function onDocumentLoadStart() {
    setLoading(true);
  }

  function onDocumentLoadError() {
    setLoading(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl flex flex-col p-0"
      >
        <SheetHeader className="px-6 py-4 border-b shrink-0">
          <SheetTitle className="truncate text-sm font-medium">
            {fileName ?? "Document Preview"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/40 shrink-0">
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              size={"icon"}
              className="w-7 h-7"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground min-w-15 text-center">
              {loading ? "..." : `${pageNumber} / ${numPages}`}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={scale <= 0.5}
              onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={scale >= 2.5}
              onClick={() => setScale((s) => Math.min(2.5, s + 0.25))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto flex justify-center bg-muted/20 p-4">
          {url ? (
            <Document
              file={url}
              onLoadStart={onDocumentLoadStart}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center gap-2 mt-20 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm">Loading PDF...</span>
                </div>
              }
              error={
                <div className="mt-20 text-center text-sm text-destructive">
                  Failed to load PDF. Try opening it directly.
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                className={"shadow-md"}
              />
            </Document>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
