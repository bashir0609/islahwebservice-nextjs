import { NextResponse } from "next/server";
import { getResendConfig, sendEmail } from "@/lib/email";
import { getErrorMessage } from "@/lib/utils";

export async function GET() {
  try {
    const { apiKey, fromEmail, toEmail } = getResendConfig();

    console.log("Testing Resend configuration...");
    console.log("RESEND_API_KEY:", apiKey ? `${apiKey.substring(0, 10)}...` : "NOT SET");
    console.log("FROM_EMAIL:", fromEmail);
    console.log("TO_EMAIL:", toEmail);

    if (!apiKey || !toEmail) {
      return NextResponse.json({
        success: false,
        error: "Missing Resend configuration",
        details: {
          hasApiKey: !!apiKey,
          hasFromEmail: !!fromEmail,
          hasToEmail: !!toEmail,
        },
      });
    }

    // Use Resend's test address for testing (domain may not be verified)
    // Extract email from "Name <email@domain.com>" format or use onboarding@resend.dev
    const emailMatch = fromEmail?.match(/<([^>]+)>/);
    const extractedEmail = emailMatch ? emailMatch[1] : fromEmail;
    const testFromEmail = extractedEmail && !extractedEmail.includes('updates.islahwebservice.com') ? extractedEmail : "onboarding@resend.dev";

    const data = await sendEmail({
      apiKey,
      from: testFromEmail,
      to: toEmail,
      subject: "Test Email from Islah Web Service",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0ea5e9;">Test Email</h1>
          <p>This is a test email from Islah Web Service to verify Resend integration.</p>
          <p>Sent at: ${new Date().toLocaleString()}</p>
          <p><small>Note: Using test sender address for unverified domains</small></p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
      emailId: data?.id,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: getErrorMessage(error),
    });
  }
}