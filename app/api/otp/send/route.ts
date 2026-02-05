import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, type } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (type !== "sign-in" && type !== "email-verification") {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const result = await auth.api.sendVerificationOTP({
    body: { email, type },
  });

  if (!result.success) {
    return NextResponse.json(
      { error: "Failed to send One Time Verification Password" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
