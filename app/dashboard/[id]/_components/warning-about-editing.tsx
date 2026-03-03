import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";

export function WarningAboutEditing() {
  return (
    <Alert className="w-fit flex items-center justify-center border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
      <AlertTriangleIcon />
      <AlertDescription className="text-xs">
        You are viewing the Job Details page. Modifications to the primary job
        information cannot be made from this page. Please navigate back to the
        Dashboard to update the details.
      </AlertDescription>
    </Alert>
  );
}
