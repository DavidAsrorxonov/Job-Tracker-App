import { getSession } from "@/lib/auth/auth";
import { getGoogleDriveOAuthClient } from "@/lib/drive/google-drive-oauth";
import GoogleDriveConnection from "@/lib/models/google-drive-connection";
import UserDocuments from "@/lib/models/user-documents";
import { supabaseAdmin } from "@/lib/supabase/supabase-admin";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { documentId } = await request.json();

    if (!documentId) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 },
      );
    }

    const document = await UserDocuments.findById(documentId);

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }

    if (document.userId.toString() !== session.user.id) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        { status: 403 },
      );
    }

    const connection = await GoogleDriveConnection.findOne({
      userId: session.user.id,
    });

    if (!connection) {
      return NextResponse.json(
        { error: "Google Drive not connected" },
        { status: 400 },
      );
    }

    const oaut2Client = getGoogleDriveOAuthClient();

    oaut2Client.setCredentials({
      access_token: connection.accessToken,
      refresh_token: connection.refreshToken,
    });

    const drive = google.drive({
      version: "v3",
      auth: oaut2Client,
    });

    const { data, error } = await supabaseAdmin.storage
      .from("user-documents")
      .download(document.path);

    if (error || !data) {
      return NextResponse.json(
        { error: "Failed to download file from storage" },
        { status: 500 },
      );
    }

    const fileBuffer = Buffer.from(await data.arrayBuffer());

    const fileName = document.label || document.originalName || "document.pdf";

    const driveResponse = await drive.files.create({
      requestBody: {
        name: fileName,
      },
      media: {
        mimeType: document.mimeType || "application/pdf",
        body: Buffer.from(fileBuffer),
      },
    });

    return NextResponse.json({
      success: true,
      fileId: driveResponse.data.id,
    });
  } catch (error) {
    console.error("Google Drive export error:", error);

    return NextResponse.json(
      { error: "Failed to export to Google Drive" },
      { status: 500 },
    );
  }
}
