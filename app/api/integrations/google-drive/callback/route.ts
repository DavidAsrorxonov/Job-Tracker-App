import { getSession } from "@/lib/auth/auth";
import { getGoogleDriveOAuthClient } from "@/lib/drive/google-drive-oauth";
import GoogleDriveConnection from "@/lib/models/google-drive-connection";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const code = request.nextUrl.searchParams.get("code");
    const state = request.nextUrl.searchParams.get("state");

    if (!code || !state) {
      return NextResponse.json(
        { error: "Missing code or state" },
        { status: 400 },
      );
    }

    const decodedState = JSON.parse(
      Buffer.from(state, "base64url").toString(),
    ) as {
      csrfToken: string;
      userId: string;
      documentId: string | null;
    };

    const { csrfToken, documentId, userId } = decodedState;

    if (userId !== session.user.id) {
      return NextResponse.json({ error: "Invalid state" }, { status: 400 });
    }

    const cookiesStore = await cookies();
    const storedToken = cookiesStore.get("google_drive_oauth_state")?.value;

    if (!storedToken || storedToken !== csrfToken) {
      return NextResponse.json(
        { error: "Invalid CSRF token" },
        { status: 400 },
      );
    }

    const oauth2Client = getGoogleDriveOAuthClient();

    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.access_token) {
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: 400 },
      );
    }

    const existingConnection = await GoogleDriveConnection.findOne({
      userId: session.user.id,
    });

    await GoogleDriveConnection.findOneAndUpdate(
      { userId: session.user.id },
      {
        userId: session.user.id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token ?? existingConnection?.refreshToken,
        scope: tokens.scope ?? existingConnection?.scope,
        expiryDate: tokens.expiry_date
          ? new Date(tokens.expiry_date)
          : existingConnection?.expiryDate,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    const redirectUrl = documentId
      ? `/dashboard/upload?export=${documentId}`
      : `/dashboard/upload`;

    const response = NextResponse.redirect(new URL(redirectUrl, request.url));

    response.cookies.set("google_drive_oauth_state", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Google Drive callback error:", error);

    return NextResponse.json(
      { error: "Failed to complete Google Drive connection" },
      { status: 500 },
    );
  }
}
