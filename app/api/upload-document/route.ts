import { uploadUserDoc } from "@/lib/supabase/actions/upload-cv";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  const userId = form.get("userId") as string | null;
  const docType = form.get("docType") as "cv" | "cover-letter" | null;

  if (!file || !userId || !docType) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    const path = await uploadUserDoc({ userId, file, docType });
    return NextResponse.json({ path });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Upload failed" },
      { status: 500 },
    );
  }
}
