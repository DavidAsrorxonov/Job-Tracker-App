import { sendEmail } from "@/lib/mail/actions/send-email";

async function main() {
  console.log("Starting test...");

  const email = process.env.TEST_EMAIL;
  if (!email) {
    console.error("✗ No test email found! Aborting the operation.");
    return;
  }

  console.log("Test email found! Moving on...");

  console.log("Sending test email...");

  const result = await sendEmail({
    name: "Test User",
    email: "dovudxon.asrorxonov@icloud.com",
    subject: "Test",
    message: "This is testing",
  });

  if (result.success) {
    console.log("✓ Email sent successfully");
  } else {
    console.error("✗ Failed to send email:", result.error);
  }
}

main();
