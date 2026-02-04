import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";
import { emailOTP } from "better-auth/plugins";
import { AWSVerifyEmail } from "@/templates/aws-email-verify-template";

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
    enabled: true,
    requireEmailVerification: true,
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
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        console.log("SEND OTP CALLED:", { email, otp, type });
        try {
          const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: email,
            subject: "Verify your email address",
            react: AWSVerifyEmail({ verificationCode: otp }),
          });

          if (error) {
            console.error("Resend error", error);
            throw new Error(`Failed to send email: ${error.message}`);
          }

          console.log("Verification email sent successfully", data?.id);
        } catch (error) {
          console.error("Error sending verification email:", error);
          throw error;
        }
      },
      sendVerificationOnSignUp: true,
      otpLength: 6,
      expiresIn: 1200,
    }),
  ],
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
