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
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed", error);
      setSigningOut(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          Danger Zone
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Irreversible and destructive actions.
        </p>
      </div>

      <Card className="border-destructive/30">
        <CardHeader className="px-4 pt-5 sm:px-6">
          <CardTitle className="text-sm sm:text-base">
            Account actions
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            These actions affect your account and cannot be undone.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-0 px-4 sm:px-6">
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1 flex flex-col gap-0.5">
              <p className="text-sm font-medium text-foreground">Sign out</p>
              <p className="text-xs text-muted-foreground wrap-break-word">
                End your current session and return to the sign-in page.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSignOutOpen(true)}
              disabled={signingOut}
              className="w-full shrink-0 sm:w-auto"
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

          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1 flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-foreground">
                  Delete account
                </p>
                <Badge variant="outline" className="rounded-full text-xs">
                  Coming soon
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground wrap-break-word">
                Permanently delete your account and all associated data. This
                cannot be undone.
              </p>
            </div>

            <Button
              variant="destructive"
              size="sm"
              disabled
              className="w-full shrink-0 sm:w-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={signOutOpen} onOpenChange={setSignOutOpen}>
        <AlertDialogContent className="w-[calc(100vw-2rem)] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out of Ascendio?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the sign-in page. Your data will remain
              intact.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            <AlertDialogCancel
              disabled={signingOut}
              className="w-full sm:w-auto"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOut}
              disabled={signingOut}
              className="w-full sm:w-auto"
            >
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
