import { getSession } from "@/lib/auth/auth";
import UserDocuments from "@/lib/models/user-documents";
import { uploadUserDoc } from "@/lib/supabase/actions/upload-cv";
import { supabaseAdmin } from "@/lib/supabase/supabase-admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getSession();
  const form = await req.formData();
  const file = form.get("file") as File | null;
  const userId = form.get("userId") as string | null;
  const docType = form.get("docType") as "cv" | "cover-letter" | null;

  if (!file || !userId || !docType) {
    return new Response("Missing required fields", { status: 400 });
  }

  if (!session?.user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let path: string | null = null;

  try {
    path = await uploadUserDoc({ userId, file, docType });

    await UserDocuments.updateMany(
      { userId, type: docType, isDefault: true },
      { $set: { isDefault: false } },
    );

    const doc = await UserDocuments.create({
      userId,
      type: docType,
      path,
      isDefault: true,
      originalName: file.name,
      size: file.size,
      mimeType: file.type,
    });

    return NextResponse.json({ ok: true, doc });
  } catch (error: any) {
    if (path) {
      await supabaseAdmin.storage.from("user-documents").remove([path]);
    }
    return NextResponse.json(
      { error: error.message ?? "Upload failed" },
      { status: 500 },
    );
  }
}
