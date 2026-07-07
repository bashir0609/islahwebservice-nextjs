import { NextResponse } from "next/server";
import { sendEmailToAdmin } from "@/lib/actions/settings";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await sendEmailToAdmin(data);

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
