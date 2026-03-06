"use client";

import { Button } from "@/components/ui/button";

const AddInterviewCTA = ({ onAdd }: { onAdd: () => void }) => {
  return <Button onClick={onAdd}>Add Interview</Button>;
};

export default AddInterviewCTA;
