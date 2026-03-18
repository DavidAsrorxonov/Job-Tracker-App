"use server";

import { ContactFormData } from "@/types/contact-form-data";
import { transporter } from "../nodemailer";

const escapeHtml = (value: string): string => {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });
};

export const sendEmail = async (data: ContactFormData) => {
  const { name, email, subject, message } = data;
  if (!process.env.GMAIL_USER) {
    console.error("GMAIL_USER environment variable is not set");
    return { success: false, error: "Email service is not configured." };
  }

  try {
    await transporter.sendMail({
      from: `"Ascendio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Ascendio] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #111827; margin-bottom: 4px;">New message from Ascendio</h2>
          <p style="color: #6b7280; font-size: 13px; margin-bottom: 24px;">Submitted via the contact form</p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; width: 80px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 13px;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 13px;">
                <a href="mailto:${email}" style="color: #1a56db;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Subject</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 13px;">${escapeHtml(subject)}</td>
            </tr>
          </table>

          <div style="background: #f9fafb; border-radius: 8px; padding: 16px;">
            <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Message</p>
            <p style="color: #111827; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>

          <p style="color: #9ca3af; font-size: 11px; margin-top: 24px;">
            Reply directly to this email to respond to ${escapeHtml(name)}.
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (e) {
    console.error("Failed to send email: ", e);
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    };
  }
};
