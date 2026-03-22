"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { signOut } from "@/lib/auth/auth-client";
import { Loader2, LogOut, Trash2 } from "lucide-react";
import { useState } from "react";

const DangerZoneTab = () => {
  const [signOutOpen, setSignOutOpen] = useState<boolean>(false);
  const [signingOut, setSigningOut] = useState<boolean>(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Danger Zone</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Irreversible and destructive actions.
        </p>
      </div>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-base">Account actions</CardTitle>
          <CardDescription>
            These actions affect your account and cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-0">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-foreground">Sign out</p>
              <p className="text-xs text-muted-foreground">
                End your current session and return to the sign-in page.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSignOutOpen(true)}
              disabled={signingOut}
              className="shrink-0"
            >
              {signingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </>
              )}
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">
                  Delete account
                </p>
                <Badge variant="secondary" className="text-xs rounded-full">
                  Coming soon
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all associated data. This
                cannot be undone.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              disabled
              className="shrink-0"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={signOutOpen} onOpenChange={setSignOutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out of Ascendio?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the sign-in page. Your data will remain
              intact.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={signingOut}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut} disabled={signingOut}>
              {signingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing out...
                </>
              ) : (
                "Sign out"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DangerZoneTab;
