import { getSession } from "@/lib/auth/auth";
import { getGoogleDriveOAuthClient } from "@/lib/drive/google-drive-oauth";
import GoogleDriveConnection from "@/lib/models/google-drive-connection";
import UserDocuments from "@/lib/models/user-documents";
import { supabaseAdmin } from "@/lib/supabase/supabase-admin";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

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

    const oauth2Client = getGoogleDriveOAuthClient();

    oauth2Client.setCredentials({
      access_token: connection.accessToken,
      refresh_token: connection.refreshToken,
      expiry_date: connection.expiryDate
        ? new Date(connection.expiryDate).getTime()
        : undefined,
    });

    const tokenResponse = await oauth2Client.getAccessToken();

    const latestAccessToken =
      tokenResponse.token || oauth2Client.credentials.access_token;

    if (!latestAccessToken) {
      return NextResponse.json(
        {
          error:
            "Failed to refresh Google Drive access token. Please reconnect Google Drive.",
        },
        { status: 401 },
      );
    }

    const refreshedRefreshToken =
      oauth2Client.credentials.refresh_token || connection.refreshToken;

    const refreshedExpiryDate = oauth2Client.credentials.expiry_date
      ? new Date(oauth2Client.credentials.expiry_date)
      : connection.expiryDate;

    await GoogleDriveConnection.updateOne(
      { userId: session.user.id },
      {
        accessToken: latestAccessToken,
        refreshToken: refreshedRefreshToken,
        expiryDate: refreshedExpiryDate,
      },
    );

    oauth2Client.setCredentials({
      access_token: latestAccessToken,
      refresh_token: refreshedRefreshToken,
      expiry_date: refreshedExpiryDate
        ? new Date(refreshedExpiryDate).getTime()
        : undefined,
    });

    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
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

    let folderId = connection.driveFolderId;

    if (!folderId) {
      const folderSearch = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder' and name='Ascendio' and trashed=false",
        fields: "files(id, name)",
      });

      if (folderSearch.data.files && folderSearch.data.files.length > 0) {
        folderId = folderSearch.data.files[0].id!;
      } else {
        const folder = await drive.files.create({
          requestBody: {
            name: "Ascendio",
            mimeType: "application/vnd.google-apps.folder",
          },
          fields: "id",
        });

        folderId = folder.data.id!;
      }

      await GoogleDriveConnection.updateOne(
        { userId: session.user.id },
        { driveFolderId: folderId },
      );
    }

    const driveResponse = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: folderId ? [folderId] : undefined,
      },
      media: {
        mimeType: document.mimeType || "application/pdf",
        body: Readable.from(fileBuffer),
      },
      fields: "id, webViewLink, name",
    });

    return NextResponse.json({
      success: true,
      fileId: driveResponse.data.id,
      fileName: driveResponse.data.name,
      webViewLink: driveResponse.data.webViewLink,
      folderId,
    });
  } catch (error) {
    console.error("Google Drive export error:", error);

    return NextResponse.json(
      { error: "Failed to export to Google Drive" },
      { status: 500 },
    );
  }
}
