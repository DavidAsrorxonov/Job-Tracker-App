import { JobTrackerVerifyEmail } from "@/templates/job-tracker-email-verify-template";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  console.log("API KEY exists:", !!process.env.RESEND_API_KEY);
  console.log("Email FROM:", process.env.EMAIL_FROM);
  console.log("Test EMAIL:", process.env.TEST_EMAIL);

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.TEST_EMAIL!,
      subject: "Test: Your Verification Code",
      react: JobTrackerVerifyEmail({ verificationCode: "123456" }),
    });

    if (error) {
      console.log(
        `Error sending email: ${error.message} | ${error.name} | ${error.statusCode}`,
      );
      return;
    }

    console.log("Email sent successfully", data?.id);
    console.log(data);
    console.log("Check your inbox");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

testEmail();
