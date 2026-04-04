import { google } from "googleapis";

export const GOOGLE_DRIVE_SCOPE =
  process.env.GOOGLE_DRIVE_SCOPE ||
  "https://www.googleapis.com/auth/drive.file";

export function getGoogleDriveOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;

  if (!clientId) {
    throw new Error("GOOGLE_CLIENT_ID is not defined");
  }

  if (!clientSecret) {
    throw new Error("GOOGLE_CLIENT_SECRET is not defined");
  }

  if (!redirectUri) {
    throw new Error("GOOGLE_DRIVE_REDIRECT_URI is not defined");
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}
