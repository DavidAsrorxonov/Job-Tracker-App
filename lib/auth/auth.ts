import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";
import { emailOTP } from "better-auth/plugins";

import { Resend } from "resend";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (!user.id) return;
          try {
            await initializeUserBoard(user.id);
          } catch (err) {
            console.error("Failed to initialize user board", err);
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
