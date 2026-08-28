import { NextResponse } from "next/server";

// RFC 9727 — API Catalog
// Links clients to our API description (OpenAPI) and terms of service.
// This is intentionally minimal: the site exposes a small authenticated
// admin API (portfolio, blog, settings) and a public contact endpoint,
// all described by /openapi.json when that file is deployed.
export async function GET() {
  const catalog = {
    "@context": "https://www.w3.org/ns/hydra/context.jsonld",
    "@id": "https://www.islahwebservice.com/.well-known/api-catalog",
    "@type": ["ApiCatalog", "Resource"],
    title: "Islah Web Service API Catalog",
    description:
      "Service discovery for the Islah Web Service website APIs. Most endpoints require authentication.",
    apis: [
      {
        title: "Site API",
        description:
          "Portfolio, blog, media, and settings endpoints powering the admin interface, plus a public contact submission endpoint.",
        url: "https://www.islahwebservice.com/openapi.json",
        documentation: "https://www.islahwebservice.com/docs",
        authentication: {
          type: "bearer",
          description:
            "Admin endpoints require a session cookie or bearer <_REDACTED>. The public /api/contact endpoint is unauthenticated.",
        },
      },
    ],
    provider: {
      name: "Islah Web Service",
      url: "https://www.islahwebservice.com",
      contact: "hello@islahwebservice.com",
    },
    service: [
      {
        "@id": "https://www.islahwebservice.com",
        "@type": "WebService",
        title: "Islah Web Service",
      },
    ],
  };

  return NextResponse.json(catalog, {
    status: 200,
    headers: {
      "Content-Type": "application/ld+json; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      Link: '<https://www.islahwebservice.com/openapi.json>; rel="describedby"',
    },
  });
}
