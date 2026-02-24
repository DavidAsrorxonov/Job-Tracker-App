import { supabaseAdmin } from "../supabase-admin";

export async function uploadUserDoc({
  userId,
  file,
  docType,
}: {
  userId: string;
  file: File;
  docType: "cv" | "cover-letter";
}) {
  if (file.type !== "application/pdf") throw new Error("Only PDF allowed");
  if (file.size > 5 * 1024 * 1024) throw new Error("File too large. Max 5MB");

  const folder = docType === "cv" ? "cvs" : "cover-letters";
  const filename = `${docType}-${Date.now()}.pdf`;
  const path = `${folder}/${userId}/${filename}`;

  const arrayBuffer = await file.arrayBuffer();

  const { data, error } = await supabaseAdmin.storage
    .from("user-documents")
    .upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) throw new Error(error.message);
  return data;
}
