import { Sheet, SheetContent } from "@/components/ui/sheet";

const InterviewDetailsSheet = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>Details</SheetContent>
    </Sheet>
  );
};

export default InterviewDetailsSheet;
