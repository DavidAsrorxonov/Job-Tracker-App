import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const CreateJobDialog = ({
  columnId,
  boardId,
}: {
  columnId: string;
  boardId: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus />
          Add Job
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  required
                  placeholder="e.g., Google, Facebook"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  required
                  placeholder="e.g., Software Engineer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  required
                  placeholder="e.g., New York, NY or Remote"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input id="salary" required placeholder="e.g., $100k - $150k" />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobDialog;
