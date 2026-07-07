import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = "onboarding@resend.dev";
    const toEmail = process.env.TO_EMAIL || process.env.RESEND_TO_EMAIL;

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

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: "Test Email from Islah Web Service",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0ea5e9;">Test Email</h1>
          <p>This is a test email from Islah Web Service to verify Resend integration.</p>
          <p>Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
      emailId: data?.id,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}