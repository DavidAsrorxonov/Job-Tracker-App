"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { upsertInterviewPrepData } from "@/lib/actions/interviewing";
import { useState } from "react";
import { toast } from "sonner";
import InterviewPrepPanelSection from "./_components/interview-prep-panel-section";
import { ArrowRight, BookOpen, Code2, HelpCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import ListEditor from "./_components/list-editor";

type IInterviewPrepData = {
  prepNotes?: string;
  questionsToAsk?: string[];
  technicalTopics?: string[];
  nextSteps?: string;
};

const InterviewPrepPanel = ({
  jobId,
  prepNotes,
  questionsToAsk,
  technicalTopics,
  nextSteps,
}: {
  jobId: string;
} & IInterviewPrepData) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const [data, setData] = useState<IInterviewPrepData>({
    prepNotes: prepNotes ?? "",
    questionsToAsk: questionsToAsk ?? [],
    technicalTopics: technicalTopics ?? [],
    nextSteps: nextSteps ?? "",
  });

  function updateData(updater: (p: IInterviewPrepData) => IInterviewPrepData) {
    setData(updater);
    setIsDirty(true);
  }

  async function handleSave() {
    try {
      setSaving(true);
      await upsertInterviewPrepData(jobId, data);
      setIsDirty(false);
      toast.success("Saved", {
        duration: 2000,
        description: "Your prep notes have been saved",
        position: "top-center",
      });
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
    <Card className="w-full shadow-sm border-border/20">
      <CardHeader className="border-b border-border/50 bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-semibold tracking-tight">
              Interview Prep
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Global notes for all your interviews · Press save when done
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isDirty && (
              <span className="text-xs text-muted-foreground">
                Unsaved changes
              </span>
            )}
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving || !isDirty}
              className="h-7 text-xs"
            >
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-5 space-y-5">
        <InterviewPrepPanelSection icon={BookOpen} title="Prep Notes">
          <Textarea
            value={data.prepNotes ?? ""}
            onChange={(e) =>
              updateData((p) => ({ ...p, prepNotes: e.target.value }))
            }
            placeholder="Research the company, note key talking points, anything you want to remember..."
            className="min-h-24 text-sm resize-none"
          />
        </InterviewPrepPanelSection>

        <Separator />

        <InterviewPrepPanelSection icon={HelpCircle} title="Questions To Ask">
          <ListEditor
            items={data.questionsToAsk ?? []}
            onAdd={(value) =>
              updateData((p) => ({
                ...p,
                questionsToAsk: [...(p.questionsToAsk ?? []), value],
              }))
            }
            onRemove={(index) =>
              updateData((p) => ({
                ...p,
                questionsToAsk: [
                  ...(p.questionsToAsk ?? []).filter((_, i) => i !== index),
                ],
              }))
            }
            placeholder="What does the onboarding look like?"
          />
        </InterviewPrepPanelSection>

        <Separator />

        <InterviewPrepPanelSection icon={Code2} title="Technical Topics">
          <ListEditor
            items={data.technicalTopics ?? []}
            onAdd={(value) =>
              updateData((p) => ({
                ...p,
                technicalTopics: [...(p.technicalTopics ?? []), value],
              }))
            }
            onRemove={(index) =>
              updateData((p) => ({
                ...p,
                technicalTopics: [
                  ...(p.technicalTopics ?? []).filter((_, i) => i !== index),
                ],
              }))
            }
            placeholder="System design, React performance..."
          />
        </InterviewPrepPanelSection>

        <Separator />

        <InterviewPrepPanelSection icon={ArrowRight} title="Next Steps">
          <Textarea
            value={data.nextSteps ?? ""}
            onChange={(e) =>
              updateData((p) => ({ ...p, nextSteps: e.target.value }))
            }
            placeholder="Follow up by Friday, waiting for feedback on technical round..."
            className="min-h-16 text-sm resize-none"
          />
        </InterviewPrepPanelSection>
      </CardContent>
    </Card>
  );
};

export default InterviewPrepPanel;
