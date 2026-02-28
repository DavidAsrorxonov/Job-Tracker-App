import { getTotalFileSize } from "@/lib/helper/getTotalFileSize";
import { UserDoc } from "./upload-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileText, HardDrive, Scale } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Props = {
  docs: Pick<UserDoc, "size">[];
  limitBytes?: number;
};

const TotalFileSize = ({ docs, limitBytes }: Props) => {
  const { total, inKB, inMB } = getTotalFileSize(docs as UserDoc[]);

  const percent =
    typeof limitBytes === "number" && limitBytes > 0
      ? Math.min(100, (total / limitBytes) * 100)
      : null;

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <HardDrive className="h-4 w-4" />
          Storage usage
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Scale className="h-4 w-4" />
              Total
            </div>
            <div className="mt-1 text-lg font-semibold">
              {inMB.toFixed(2)} MB
            </div>
            <div className="text-xs text-muted-foreground">
              {inKB.toFixed(2)} KB • {total.toLocaleString()} bytes
            </div>
          </div>

          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              Avg per file
            </div>
            <div className="mt-1 text-lg font-semibold">
              {(docs.length ? inMB / docs.length : 0).toFixed(2)} MB
            </div>
            <div className="text-xs text-muted-foreground">
              {docs.length.toLocaleString()} file(s)
            </div>
          </div>

          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HardDrive className="h-4 w-4" />
              Status
            </div>
            <div className="mt-1 text-lg font-semibold">
              {percent === null ? "—" : `${percent.toFixed(0)}%`}
            </div>
            <div className="text-xs text-muted-foreground">
              {percent === null
                ? "No limit set"
                : `${((limitBytes ?? 0) / (1024 * 1024)).toFixed(0)} MB limit`}
            </div>
          </div>
        </div>

        {percent !== null && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Used</span>
              <span>
                {(total / (1024 * 1024)).toFixed(2)} /{" "}
                {(limitBytes! / (1024 * 1024)).toFixed(0)} MB
              </span>
            </div>
            <Progress value={percent} />
          </div>
        )}

        <Separator />
        <p className="text-xs text-muted-foreground">
          Tip: Keep CV and cover letter PDFs under a reasonable size for faster
          uploads and previews.
        </p>
      </CardContent>
    </Card>
  );
};

export default TotalFileSize;
