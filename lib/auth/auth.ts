import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";
import { multiSession } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL_DEV!,
  database: mongodbAdapter(db, {
    client,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [multiSession()],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (!user.id) return;
          try {
            await initializeUserBoard(user.id);
          } catch (err) {
            console.error("Failed to initialize user board", err);
            throw err; // Propagate error to client
          }
        },
      },
    },
  },
});

export const signOut = async () => {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/sign-in");
  }
};

export const getSession = async () => {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  return result;
};
