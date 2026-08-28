import { NextResponse } from "next/server";

// RFC 9728 — Protected Resource Metadata
// Declares how a client authenticates to access protected resources.
// Currently session-based (cookie); no bearer/OAuth flow deployed.
export async function GET() {
  return NextResponse.json(
    {
      resource: "https://www.islahwebservice.com",
      authorization_servers: [
        "https://www.islahwebservice.com/.well-known/oauth-authorization-server",
      ],
      bearer_methods: ["header"],
      resource_documentation: "https://www.islahwebservice.com/docs",
      message:
        "Protected resources use session-cookie authentication. OAuth bearer tokens are not yet deployed.",
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    }
  );
}
