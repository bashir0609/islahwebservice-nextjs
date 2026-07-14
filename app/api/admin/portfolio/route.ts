import { NextRequest, NextResponse } from "next/server";
import { listPortfolioItems } from "@/lib/actions/portfolio";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await listPortfolioItems();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json(
      { error: "Failed to load portfolio items" },
      { status: 500 }
    );
  }
}
