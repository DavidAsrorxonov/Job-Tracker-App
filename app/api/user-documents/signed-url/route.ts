import { getSession } from "@/lib/auth/auth";
import UserDocuments from "@/lib/models/user-documents";
import { supabaseAdmin } from "@/lib/supabase/supabase-admin";
import { NextResponse } from "next/server";

async function getUserIdFromSession(): Promise<string | null> {
  const session = await getSession();
  return session?.user.id ?? null;
}

export async function POST(req: Request) {
  const userId = await getUserIdFromSession();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { docId } = await req.json();
  if (!docId)
    return NextResponse.json({ error: "Missing docId" }, { status: 400 });

  const doc = await UserDocuments.findOne({ _id: docId, userId }).lean();
  if (!doc)
    return NextResponse.json({ error: "Document not found" }, { status: 404 });

  const { data, error } = await supabaseAdmin.storage
    .from("user-documents")
    .createSignedUrl(doc.path, 60 * 5);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ url: data.signedUrl });
}
