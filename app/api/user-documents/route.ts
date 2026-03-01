import { getSession } from "@/lib/auth/auth";
import UserDocuments from "@/lib/models/user-documents";
import { NextResponse } from "next/server";

async function getUserIdFromSession(): Promise<string | null> {
  const session = await getSession();
  return session?.user.id ?? null;
}

export async function GET() {
  const userId = await getUserIdFromSession();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const docs = await UserDocuments.find({ userId })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(
    { docs },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
  );
}
