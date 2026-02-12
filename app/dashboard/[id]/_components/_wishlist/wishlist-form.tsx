"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        </div>
      </div>
    </form>
  );
}
