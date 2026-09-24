import { NextResponse } from "next/server";

// Contact submissions use the verified server action. The legacy endpoint
// accepted arbitrary JSON and must never send email directly.
export async function POST() {
  return NextResponse.json({ error: "Use the contact form." }, { status: 410 });
}
