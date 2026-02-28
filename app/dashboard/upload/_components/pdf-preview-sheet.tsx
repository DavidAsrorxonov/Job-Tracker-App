"use client";

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
}: Props) {}
