"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient, useSession } from "@/lib/auth/auth-client";
import {
  CalendarDays,
  Check,
  Loader2,
  Mail,
  Pencil,
  Shield,
  X,
} from "lucide-react";
import { useState } from "react";

type EditState = "idle" | "editing" | "loading";

const ProfileTab = () => {
  const { data: session, refetch } = useSession();
  const user = session?.user;

  const [editState, setEditState] = useState<EditState>("idle");
  const [nameValue, setNameValue] = useState(user?.name ?? "");
  const [error, setError] = useState("");

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const handleEdit = () => {
    setNameValue(user?.name ?? "");
    setError("");
    setEditState("editing");
  };

  const handleCancel = () => {
    setNameValue(user?.name ?? "");
    setError("");
    setEditState("idle");
  };

  const handleSave = async () => {
    const trimmed = nameValue.trim();

    if (!trimmed) {
      setError("Name cannot be empty");
      return;
    }

    if (trimmed === user?.name) {
      setEditState("idle");
      return;
    }

    setEditState("loading");
    setError("");

    const { error: updateError } = await authClient.updateUser({
      name: trimmed,
    });

    if (updateError) {
      setError("Failed to update name. Please try again.");
      setEditState("editing");
      return;
    }

    await refetch();
    setEditState("idle");
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your account information from Google.
        </p>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-6 flex items-center gap-5">
        <Avatar className="h-20 w-20 shrink-0">
          <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
          <AvatarFallback className="text-lg font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-xs text-muted-foreground">
            Profile photo is managed by Google
          </p>
          <p className="text-lg font-semibold text-foreground truncate">
            {user?.name ?? "—"}
          </p>
          <p className="text-sm text-muted-foreground truncate">
            {user?.email ?? "—"}
          </p>
        </div>
      </div>

      <div className="border border-border/60 bg-card divide-y divide-border/50">
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="flex flex-col gap-0.5 min-w-0">
            <Label className="text-xs text-muted-foreground">
              Display name
            </Label>
            {editState === "editing" || editState === "loading" ? (
              <div className="flex flex-col gap-1 mt-1">
                <Input
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                    if (e.key === "Escape") handleCancel();
                  }}
                  disabled={editState === "loading"}
                  className="h-8 text-sm max-w-64"
                  autoFocus
                />
                {error && <p className="text-xs text-destructive">{error}</p>}
              </div>
            ) : (
              <p className="text-sm font-medium text-foreground truncate">
                {user?.name ?? "—"}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {editState === "idle" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="h-8 px-3 text-muted-foreground hover:text-foreground"
              >
                <Pencil className="h-3.5 w-3.5 mr-1.5" />
                Edit
              </Button>
            )}
            {(editState === "editing" || editState === "loading") && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  disabled={editState === "loading"}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={editState === "loading"}
                  className="h-8 px-3"
                >
                  {editState === "loading" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      Save
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4">
          <Mail className="h-4 w-4 shrink-0 text-muted-foreground/60" />
          <div className="flex flex-col gap-0.5 min-w-0">
            <Label className="text-xs text-muted-foreground">
              Email address
            </Label>
            <p className="text-sm font-medium text-foreground truncate">
              {user?.email ?? "—"}
            </p>
          </div>
          <Badge
            variant="secondary"
            className="ml-auto shrink-0 text-xs rounded-full"
          >
            Google
          </Badge>
        </div>

        <div className="flex items-center gap-3 px-5 py-4">
          <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground/60" />
          <div className="flex flex-col gap-0.5">
            <Label className="text-xs text-muted-foreground">
              Member since
            </Label>
            <p className="text-sm font-medium text-foreground">
              {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4">
          <Shield className="h-4 w-4 shrink-0 text-muted-foreground/60" />
          <div className="flex flex-col gap-0.5">
            <Label className="text-xs text-muted-foreground">
              Authentication
            </Label>
            <p className="text-sm font-medium text-foreground">Google OAuth</p>
          </div>
          <Badge
            variant="secondary"
            className="ml-auto shrink-0 text-xs rounded-full bg-green-500/10 text-green-600 dark:text-green-400"
          >
            Active
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
