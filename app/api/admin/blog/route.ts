import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { listBlogPosts } from "@/lib/actions/blog";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = await listBlogPosts();
  return NextResponse.json(posts);
}
