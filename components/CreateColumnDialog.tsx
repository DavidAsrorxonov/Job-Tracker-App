"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2, Plus } from "lucide-react";
import { Field, FieldGroup } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { createColumn } from "@/lib/actions/columns";
import { toast } from "sonner";

const CreateColumnDialog = ({ boardId }: { boardId: string }) => {
  const [loading, setLoading] = useState(false);
  const [columnName, setColumnName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await createColumn({
        name: columnName,
        boardId,
      });

      if (result.error) {
        toast.error("Failed to add a new column", {
          description: result.error,
          position: "top-center",
          duration: 2000,
        });
        return;
      }
      setColumnName("");

      toast.success("Successfully added a new column", {
        description: "Updating dashboard...",
        position: "top-center",
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to add a new column", {
        description: "Please try again",
        position: "top-center",
        duration: 2000,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="border-dashed h-20">
            <Plus />
            Add Column
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Column</DialogTitle>
            <DialogDescription>
              Specify the name of the new column
            </DialogDescription>
            <FieldGroup>
              <Field>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Stage - 1"
                  value={columnName}
                  onChange={(e) => setColumnName(e.target.value)}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={loading} onClick={handleSubmit}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Adding a new Column...
                  </>
                ) : (
                  <>Add a new column</>
                )}
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateColumnDialog;
