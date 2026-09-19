import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/actions/blog";

export const runtime = "nodejs";

export default async function generateImageMetadata(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
            padding: "60px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div
            style={{
              maxWidth: "1000px",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "72px", fontWeight: "bold", lineHeight: 1.1, color: "#ffffff", marginBottom: "24px", textWrap: "balance" }}>
              Article Not Found
            </h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", color: "#94a3b8", fontSize: "24px" }}>
              <span>Islah Web Service</span>
              <span>·</span>
              <span>B2B Prospect Research</span>
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(6, 182, 212, 0.15)",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              borderRadius: "9999px",
              padding: "8px 20px",
              marginBottom: "32px",
              color: "#06b6d4",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 17H20" />
              <path d="M12.5 17H20" />
              <path d="M6.5 12H20" />
              <path d="M12.5 7H20" />
            </svg>
            The Islah Journal
          </div>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              lineHeight: 1.1,
              color: "#ffffff",
              marginBottom: "24px",
              textWrap: "balance",
            }}
          >
            {post.title}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              color: "#94a3b8",
              fontSize: "24px",
            }}
          >
            <span>Islah Web Service</span>
            <span>·</span>
            <span>B2B Prospect Research</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}