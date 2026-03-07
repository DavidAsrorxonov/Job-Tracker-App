"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SingleInterview } from "./interview-card";
import {
  Brain,
  Code2,
  HelpCircle,
  Phone,
  Trophy,
  UserCheck,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { upsertSingleInterview } from "@/lib/actions/interviewing";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import DatePickerField from "./_components/date-picker-field";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import ListEditor from "./_components/list-editor";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const typeOptions: {
  value: SingleInterview["type"];
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "phone_screen", label: "Phone Screen", icon: Phone },
  { value: "technical", label: "Technical", icon: Code2 },
  { value: "behavioral", label: "Behavioral", icon: Brain },
  { value: "hiring_manager", label: "Hiring Manager", icon: UserCheck },
  { value: "final", label: "Final Round", icon: Trophy },
  { value: "other", label: "Other", icon: HelpCircle },
];

const outcomeOptions = [
  { value: "passed", label: "Passed" },
  { value: "waiting", label: "Waiting" },
  { value: "failed", label: "Failed" },
];

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

const emptyInterview: Omit<SingleInterview, "_id"> = {
  type: "phone_screen",
  scheduledDate: undefined,
  completedDate: undefined,
  duration: undefined,
  interviewer: "",
  notes: "",
  questionsAsked: [],
  outcome: undefined,
  rating: undefined,
};

const InterviewDetailsSheet = ({
  open,
  onOpenChange,
  interviewData,
  jobId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interviewData: SingleInterview | null;
  jobId: string;
}) => {
  const isEditingMode = Boolean(interviewData);

  const [saving, setSaving] = useState<boolean>(false);
  const [data, setData] = useState<Omit<SingleInterview, "_id">>(
    interviewData ?? emptyInterview,
  );

  useEffect(() => {
    setData(interviewData ?? emptyInterview);
  }, [interviewData, open]);

  function updateData(
    updater: (p: Omit<SingleInterview, "_id">) => Omit<SingleInterview, "_id">,
  ) {
    setData(updater);
  }

  async function handleSave() {
    try {
      setSaving(true);
      await upsertSingleInterview(jobId, { ...data, _id: interviewData?._id });
      toast.success(isEditingMode ? "Interview updated" : "Interview added", {
        duration: 2000,
        position: "top-center",
      });
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to save", {
        duration: 2000,
        description: "Something went wrong. Please try again",
        position: "top-center",
      });
      console.log(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto px-6">
        <SheetHeader className="mb-6 border-b border-border">
          <SheetTitle>
            {isEditingMode ? "Edit Interview" : "Add Interview"}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-5 mt-2">
          <FormField label="Interview Type">
            <Select
              value={data.type}
              onValueChange={(v) =>
                updateData((p) => ({
                  ...p,
                  type: v as SingleInterview["type"],
                }))
              }
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select Interview Type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <div className="flex items-center gap-2">
                      <opt.icon className="h-3.5 w-3.5" />
                      {opt.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Interviewer">
            <Input
              value={data.interviewer ?? ""}
              onChange={(e) =>
                updateData((p) => ({ ...p, interviewer: e.target.value }))
              }
              placeholder="e.g. John Smith (Engineering Manager)"
              className="text-sm"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <DatePickerField
              label="Scheduled Date"
              value={
                data.scheduledDate ? new Date(data.scheduledDate) : undefined
              }
              onChange={(d) => updateData((p) => ({ ...p, scheduledDate: d }))}
            />
            <DatePickerField
              label="Completed Date"
              value={
                data.completedDate ? new Date(data.completedDate) : undefined
              }
              onChange={(d) => updateData((p) => ({ ...p, completedDate: d }))}
            />
          </div>

          <FormField label="Duration (minutes)">
            <Input
              type="number"
              value={data.duration ?? ""}
              onChange={(e) =>
                updateData((p) => ({
                  ...p,
                  duration: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              placeholder="e.g. 60"
              className="text-sm"
            />
          </FormField>

          <Separator />

          <FormField label="Outcome">
            <Select
              value={data.outcome ?? ""}
              onValueChange={(v) =>
                updateData((p) => ({
                  ...p,
                  outcome: v as SingleInterview["outcome"],
                }))
              }
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select outcome" />
              </SelectTrigger>
              <SelectContent>
                {outcomeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Rating">
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    updateData((p) => ({
                      ...p,
                      rating: p.rating === i + 1 ? undefined : i + 1,
                    }))
                  }
                  className={cn(
                    "h-7 w-7 rounded-full border transition-all text-xs font-semibold",
                    (data.rating ?? 0) > i
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/50",
                  )}
                >
                  {i + 1}
                </button>
              ))}
              {data.rating && (
                <button
                  type="button"
                  onClick={() =>
                    updateData((p) => ({ ...p, rating: undefined }))
                  }
                  className="text-xs text-muted-foreground hover:text-destructive ml-1"
                >
                  Clear
                </button>
              )}
            </div>
          </FormField>

          <Separator />

          <FormField label="Questions Asked">
            <ListEditor
              items={data.questionsAsked ?? []}
              onAdd={(value) =>
                updateData((p) => ({
                  ...p,
                  questionsAsked: [...(p.questionsAsked ?? []), value],
                }))
              }
              onRemove={(index) =>
                updateData((p) => ({
                  ...p,
                  questionsAsked: (p.questionsAsked ?? []).filter(
                    (_, i) => i !== index,
                  ),
                }))
              }
              placeholder="e.g. Design a URL shortener"
            />
          </FormField>

          <Separator />

          <FormField label="Notes">
            <Textarea
              value={data.notes ?? ""}
              onChange={(e) =>
                updateData((p) => ({ ...p, notes: e.target.value }))
              }
              placeholder="How did it go? Any observations or things to remember..."
              className="min-h-28 text-sm resize-none"
            />
          </FormField>
        </div>

        <div className="mt-8 flex items-center justify-end gap-2 pb-10">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : isEditingMode ? "Update" : "Add Interview"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InterviewDetailsSheet;
