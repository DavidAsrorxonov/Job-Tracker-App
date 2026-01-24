"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignUp = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create an account to start tracking your job applicatoins
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent>
            <div></div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
