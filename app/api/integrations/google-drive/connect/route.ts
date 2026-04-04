import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getSession } from "@/lib/auth/auth";
import {
  getGoogleDriveOAuthClient,
  GOOGLE_DRIVE_SCOPE,
} from "@/lib/drive/google-drive-oauth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const documentId = request.nextUrl.searchParams.get("documentId");

    const csrfToken = randomBytes(16).toString("hex");

    const statePayload = {
      csrfToken,
      userId: session.user.id,
      documentId: documentId || null,
    };

    const state = Buffer.from(JSON.stringify(statePayload)).toString(
      "base64url",
    );

    const oauth2Client = getGoogleDriveOAuthClient();

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: [GOOGLE_DRIVE_SCOPE],
      state,
    });

    const response = NextResponse.redirect(authUrl);

    response.cookies.set("google_drive_oauth_state", csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 10,
    });

    return response;
  } catch (error) {
    console.error("Google Drive connect error:", error);

    return NextResponse.json(
      { error: "Failed to start Google Drive connection" },
      { status: 500 },
    );
  }
}
