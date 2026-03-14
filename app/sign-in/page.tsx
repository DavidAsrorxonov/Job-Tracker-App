"use client";

import { GoogleIcon } from "@/components/google-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth/auth-client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      toast.error("Failed to sign in", {
        position: "top-center",
        description: "Please try again",
        duration: 2000,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="items-center text-center space-y-3">
          <CardTitle>Welcome to</CardTitle>
          <div className="w-full flex items-center justify-center">
            <Image
              src={"/images/ascendio-glowing-cropped.png"}
              alt="Ascendio"
              width={300}
              height={300}
            />
          </div>
          <div>
            <CardDescription className="mt-1">
              Sign in to manage your applications
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              "Redirecting..."
            ) : (
              <>
                <GoogleIcon />
                Continue with Google
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our terms of service and privacy policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
