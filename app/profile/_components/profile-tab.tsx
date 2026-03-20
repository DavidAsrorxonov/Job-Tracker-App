"use client";

import { useState } from "react";
import {
  Loader2,
  Pencil,
  Check,
  X,
  Mail,
  CalendarDays,
  Shield,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { authClient, useSession } from "@/lib/auth/auth-client";

type EditState = "idle" | "editing" | "loading";

const ProfileTab = () => {
  const { data: session } = useSession();
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
      setError("Name cannot be empty.");
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

    setEditState("idle");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your account information from Google.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 text-center pb-2">
            <Avatar className="h-24 w-24 ring-2 ring-border">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
              <AvatarFallback className="text-xl font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold text-foreground">
                {user?.name ?? "—"}
              </p>
              <p className="text-sm text-muted-foreground">
                {user?.email ?? "—"}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Profile photo is managed by Google
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account details</CardTitle>
          <CardDescription>
            Manage your display name and view account information.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-0">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex flex-col gap-1 min-w-0">
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
                <p className="text-sm font-medium text-foreground">
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

          <Separator />

          <div className="flex items-center gap-3 py-4">
            <Mail className="h-4 w-4 shrink-0 text-muted-foreground/60" />
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <Label className="text-xs text-muted-foreground">
                Email address
              </Label>
              <p className="text-sm font-medium text-foreground truncate">
                {user?.email ?? "—"}
              </p>
            </div>
            <Badge variant="outline" className="shrink-0 text-xs rounded-full">
              Google
            </Badge>
          </div>

          <Separator />

          <div className="flex items-center gap-3 py-4">
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

          <Separator />

          <div className="flex items-center gap-3 py-4">
            <Shield className="h-4 w-4 shrink-0 text-muted-foreground/60" />
            <div className="flex flex-col gap-0.5 flex-1">
              <Label className="text-xs text-muted-foreground">
                Authentication
              </Label>
              <p className="text-sm font-medium text-foreground">
                Google OAuth
              </p>
            </div>
            <Badge
              variant="secondary"
              className="shrink-0 text-xs rounded-full bg-green-500/10 text-green-600 dark:text-green-400"
            >
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
