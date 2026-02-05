"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { authClient, signUp } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"register" | "verify">("register");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await authClient.getSession();
      if (session.data?.user) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const result = await signUp.email({
        name,
        email,
        password,
      });

      // Check if signup was successful
      if (result.error) {
        const errorMessage =
          result.error.message || "Signup failed. Please try again.";
        setError(errorMessage);
        toast("Error signing up", {
          description: errorMessage,
          duration: 3000,
          position: "top-center",
        });
        setLoading(false);
        return;
      }

      toast("Account created", {
        description: "Please check your email",
        duration: 2000,
        position: "top-center",
      });
      setStep("verify");
    } catch (err: any) {
      console.log("SIGNUP ERROR:", err);

      const message =
        err?.message ||
        err?.error?.message ||
        err?.data?.message ||
        err?.data?.error ||
        "Signup failed";

      setError(message);

      toast("Error signing up", {
        description: message,
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code");
      setLoading(false);
      return;
    }

    try {
      const result = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });

      if (result.error) {
        const errorMessage =
          result.error.message ||
          "Invalid verification code. Please try again.";
        setError(errorMessage);
        toast("Error verifying account", {
          description: errorMessage,
          duration: 2000,
          position: "top-center",
        });
        setLoading(false);
        return;
      }

      toast("Account verified", {
        description: "Sign in to continue",
        duration: 3000,
        position: "top-center",
      });
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessage = error?.message || "An unexpected error has occurred";
      setError(errorMessage);
      toast("Error verifying account", {
        description: errorMessage,
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError("");

    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });
      toast("Verification code resent", {
        description: "Please check your email",
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      setError("An unexpected error has occurred");
      toast("Error resending verification code", {
        description: "Please try again",
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg p-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-primary">
            Sign Up
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create an account to start tracking your job applications
          </CardDescription>
        </CardHeader>

        {step === "register" ? (
          <>
            <form className="space-y-4" onSubmit={onSubmit}>
              <CardContent className="space-y-4">
                {error && <Badge variant={"destructive"}>{error}</Badge>}
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? "Starting your journey..." : "Sign Up"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?
                  <Link
                    href={"/sign-in"}
                    className="font-medium text-primary hover:underline"
                  >
                    {" "}
                    Sign In
                  </Link>
                </p>
              </CardFooter>
            </form>
          </>
        ) : (
          <form onSubmit={handleVerify}>
            <CardContent className="space-y-8 pt-2">
              {error && (
                <div className="w-full flex justify-center">
                  <Badge variant={"destructive"} className="text-center">
                    {error}
                  </Badge>
                </div>
              )}

              <div className="space-y-4 text-center">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    A verification code has been sent to
                  </p>
                  <Badge
                    variant="outline"
                    className="px-4 py-2 text-sm font-normal"
                  >
                    {email}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Please check your inbox and enter the 6-digit code below
                </p>
              </div>

              {/* OTP Input */}
              <div className="space-y-4">
                <Label className="block text-center text-sm font-medium">
                  Verification Code
                </Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    disabled={loading}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3 pb-6 pt-6">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the code?{" "}
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleResendCode}
                    disabled={loading}
                    className="h-auto p-0 text-sm font-medium text-primary hover:underline"
                  >
                    Resend
                  </Button>
                </p>
              </div>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default SignUp;
