import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/auth";

/**
 * Legacy architecture redirects: one direct 301 to the final canonical page.
 *
 * These were formerly stage-of-service / retired pages. Google treats 301 and
 * 308 identically as permanent redirects; we emit literal 301s here so the
 * redirect map is unambiguous. No chains — every destination is final.
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  // Old "Why Us" content overlaps the homepage ("Why Clients Choose Islah").
  "/why-us": "/",
  // Broad-market positioning now lives on the homepage.
  "/b2b-lead-generation": "/",
  // Consolidated stage-of-service pages → core service page.
  "/decision-maker-research": "/b2b-prospect-research",
  "/prospect-list-building": "/b2b-prospect-research",
  // Retired /services pages → closest relevant current page.
  "/services/verified-b2b-contact-lists": "/b2b-prospect-research",
  "/services/lead-generation-analysis": "/b2b-prospect-research",
  // Business process automation is unrelated to prospect research; the
  // homepage is the relevant final destination (was previously chained via
  // /b2b-lead-generation — now direct).
  "/services/business-process-automation": "/",
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Direct 301 for retired legacy URLs (matcher-scoped, so only these run).
  const legacyDestination = LEGACY_REDIRECTS[pathname];
  if (legacyDestination) {
    const url = request.nextUrl.clone();
    url.pathname = legacyDestination;
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  // Everything outside /admin passes straight through.
  if (pathname !== "/admin" && !pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  // The login page must stay reachable without a session.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (await verifyAdminSession(token)) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/why-us",
    "/b2b-lead-generation",
    "/decision-maker-research",
    "/prospect-list-building",
    "/services/verified-b2b-contact-lists",
    "/services/lead-generation-analysis",
    "/services/business-process-automation",
  ],
};
