import { getSession } from "../auth/auth";
import UserDocuments from "../models/user-documents";

import { unstable_noStore as noStore } from "next/cache";

export async function getUserDocumentsForPage() {
  noStore();

  const session = await getSession();
  if (!session?.user.id) return { docs: [], counts: { cv: 0, coverLetter: 0 } };

  const docs = await UserDocuments.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  const counts = {
    cv: docs.filter((doc: any) => doc.type === "cv").length,
    coverLetter: docs.filter((doc: any) => doc.type === "cover-letter").length,
  };

  return { docs, counts };
}
