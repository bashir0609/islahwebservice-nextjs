import { NextResponse } from "next/server";

// RFC 8414 — Authorization Server Metadata
// Required by OAuth clients to auto-discover endpoints. The current site
// uses credential-based login; OAuth is not yet deployed, so this publishes
// a stub resource for future discovery.
export async function GET() {
  return NextResponse.json(
    {
      error: "not_supported",
      message:
        "Islah Web Service does not currently act as an OAuth authorization server. Use session-based authentication via /admin/login.",
      documentation: "https://www.islahwebservice.com",
    },
    {
      status: 501,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    }
  );
}
