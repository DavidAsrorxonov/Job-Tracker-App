"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { WishlistFormValues } from "@/types/wishlist";
import { useState } from "react";

function ChipInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [text, setText] = useState("");

  function add() {
    const v = text.trim();
    if (!v) return;
    if (value.includes(v)) {
      setText("");
      return;
    }
    onChange([...value, v]);
    setText("");
  }

  function remove(item: string) {
    onChange(value.filter((v) => v !== item));
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={text}
          placeholder={placeholder ?? "Type and press Enter"}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <Button type="button" variant={"outline"} onClick={add}>
          Add
        </Button>
      </div>

      {value.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">
          Nothing's been added yet.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {value.map((x) => (
            <Badge
              key={x}
              variant={"secondary"}
              className="font-normal cursor-pointer"
              title="Click to remove"
              onClick={() => remove(x)}
            >
              {x} ✕
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WishlistPanel({
  defaultValues,
  onSubmit,
  submitting,
}: {
  defaultValues: WishlistFormValues;
  onSubmit: (values: WishlistFormValues) => void | Promise<void>;
  submitting?: boolean;
}) {
  const [values, setValues] = useState<WishlistFormValues>(defaultValues);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Priority</Label>
          <Select
            value={values.priority ?? ""}
            onValueChange={(v) =>
              setValues((p) => ({ ...p, priority: v as any }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Target apply date</Label>
          <Input
            type="date"
            value={
              values.targetApplyDate
                ? new Date(values.targetApplyDate).toISOString().slice(0, 10)
                : ""
            }
            onChange={(e) =>
              setValues((p) => ({
                ...p,
                targetApplyDate: e.target.value
                  ? new Date(e.target.value)
                  : undefined,
              }))
            }
          />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Company size</Label>
          <Input
            value={values.companyInfo?.size ?? ""}
            onChange={(e) =>
              setValues((p) => ({
                ...p,
                companyInfo: { ...(p.companyInfo ?? {}), size: e.target.value },
              }))
            }
            placeholder="e.g., 50-200"
          />
        </div>
        <div className="space-y-2">
          <Label>Industry</Label>
          <Input
            value={values.companyInfo?.industry ?? ""}
            onChange={(e) =>
              setValues((p) => ({
                ...p,
                companyInfo: {
                  ...(p.companyInfo ?? {}),
                  industry: e.target.value,
                },
              }))
            }
            placeholder="e.g., FinTech"
          />
        </div>
        <div className="space-y-2">
          <Label>Culture</Label>
          <Input
            value={values.companyInfo?.culture ?? ""}
            onChange={(e) =>
              setValues((p) => ({
                ...p,
                companyInfo: {
                  ...(p.companyInfo ?? {}),
                  culture: e.target.value,
                },
              }))
            }
            placeholder="e.g., fast-paced, collaborative"
          />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ChipInput
          label="Pros"
          value={values.pros ?? []}
          onChange={(next) => setValues((p) => ({ ...p, pros: next }))}
          placeholder="e.g., remote, good mentorship"
        />

        <ChipInput
          label="Cons"
          value={values.cons ?? []}
          onChange={(next) => setValues((p) => ({ ...p, cons: next }))}
          placeholder="e.g., low salary, long commute"
        />
      </div>

      <Separator />

      <div className="space-y-5">
        <ChipInput
          label="Must-have"
          value={values.requirementsMatch?.mustHave ?? []}
          onChange={(next) =>
            setValues((p) => ({
              ...p,
              requirementsMatch: {
                ...(p.requirementsMatch ?? {}),
                mustHave: next,
              },
            }))
          }
        />
        <ChipInput
          label="Nice-to-have"
          value={values.requirementsMatch?.niceToHave ?? []}
          onChange={(next) =>
            setValues((p) => ({
              ...p,
              requirementsMatch: {
                ...(p.requirementsMatch ?? {}),
                niceToHave: next,
              },
            }))
          }
        />
        <ChipInput
          label="Gaps"
          value={values.requirementsMatch?.gaps ?? []}
          onChange={(next) =>
            setValues((p) => ({
              ...p,
              requirementsMatch: { ...(p.requirementsMatch ?? {}), gaps: next },
            }))
          }
        />
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Research notes</Label>
        <Textarea
          value={values.researchNotes ?? ""}
          onChange={(e) =>
            setValues((p) => ({ ...p, researchNotes: e.target.value }))
          }
          placeholder="What did you learn about this company? Links, impressions, red flags, etc."
          className="min-h-32"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
