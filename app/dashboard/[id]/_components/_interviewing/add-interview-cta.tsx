"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AddInterviewCTA = ({ onAdd }: { onAdd: () => void }) => {
  return (
    <Button
      onClick={onAdd}
      variant="outline"
      className="h-40 w-40 flex-col gap-2 border-2 border-dashed text-muted-foreground hover:border-primary hover:text-primary"
    >
      <Plus className="h-6 w-6" />
      Add Interview
    </Button>
  );
};

export default AddInterviewCTA;
