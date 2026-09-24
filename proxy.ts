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
  // Retired technical SEO offer now maps to the core research service.
  "/technical-seo": "/b2b-prospect-research",
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
  // Old blog and legal slugs have equivalent current pages.
  "/blog/what-is-b2b-lead-generation-guide-2026": "/blog/what-is-b2b-lead-generation-a-2026-guide-for-growth-teams",
  "/blog/how-to-build-clean-b2b-lead-list": "/blog/how-to-build-b2b-prospect-lists",
  "/terms-of-service": "/terms",
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
    // Preserve the negotiated path even when Next normalizes the rewritten URL.
    const headers = new Headers(request.headers);
    headers.set("x-markdown-path", pathname);
    return NextResponse.rewrite(mdUrl, { request: { headers } });
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
    // Add Vary: Accept for content negotiation (Task 1)
    // Append to existing Vary header from Next.js (rsc, next-router-*)
    const existingVary = res.headers.get('Vary');
    if (existingVary) {
      res.headers.set('Vary', `${existingVary}, Accept`);
    } else {
      res.headers.set('Vary', 'Accept');
    }
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
