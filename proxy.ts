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
  const { pathname, searchParams } = request.nextUrl;

  // Markdown content negotiation (AIScan C1):
  // If a client sends Accept: text/markdown OR ?format=md, and the path is
  // a public page, rewrite to the markdown renderer.
  const wantsMarkdown =
    searchParams.get("format") === "md" ||
    (request.headers.get("accept") || "").includes("text/markdown");

  const isPublicPage =
    pathname !== "/admin" &&
    !pathname.startsWith("/admin/") &&
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/.well-known/") &&
    !pathname.startsWith("/_next/") &&
    !pathname.includes(".");

  if (wantsMarkdown && isPublicPage) {
    const mdUrl = request.nextUrl.clone();
    mdUrl.pathname = "/api/render-md";
    mdUrl.searchParams.set("path", pathname);
    mdUrl.searchParams.delete("format");
    return NextResponse.rewrite(mdUrl);
  }

  // Direct 301 for retired legacy URLs (matcher-scoped, so only these run).
  const legacyDestination = LEGACY_REDIRECTS[pathname];
  if (legacyDestination) {
    const url = request.nextUrl.clone();
    url.pathname = legacyDestination;
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  // Everything outside /admin passes straight through — but we tag every
  // public response with a Link header pointing at the API catalog so
  // machine clients can discover the OpenAPI description (AIScan D3).
  if (pathname !== "/admin" && !pathname.startsWith("/admin/")) {
    const res = NextResponse.next();
    res.headers.append(
      "Link",
      '<https://www.islahwebservice.com/.well-known/api-catalog>; rel="describedby"'
    );
    return res;
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
  // Run on all paths except Next.js internals. Routing logic inside the
  // proxy decides what to do per path.
  matcher: [
    "/((?!_next|favicon).*)",
  ],
};
