import { NextRequest, NextResponse } from "next/server";
import { uploadImage, deleteImage, listImages, cloudinary } from "@/lib/cloudinary";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  if (action === "list") {
    const folder = url.searchParams.get("folder") || "islahwebservice";
    const maxResults = Number(url.searchParams.get("maxResults")) || 100;
    const images = await listImages(folder, maxResults);
    return NextResponse.json({ images });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "islahwebservice";

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const result = await uploadImage(file, folder);
    return NextResponse.json({ image: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { publicId, newPublicId } = await req.json();
    if (!publicId || !newPublicId) {
      return NextResponse.json({ error: "Missing publicId or newPublicId" }, { status: 400 });
    }

    // Cloudinary does not support true move/rename via API.
    // Implemented here as: download original bytes, upload to new public ID, delete original.
    const downloadResult = await cloudinary.url(publicId, { resource_type: "auto" });
    const imageResponse = await fetch(downloadResult);
    const blob = await imageResponse.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = blob.type || "application/octet-stream";
    const dataUri = `data:${mimeType};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      public_id: newPublicId,
      overwrite: true,
      resource_type: "auto",
    });

    await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });

    return NextResponse.json({
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      resourceType: uploadResult.resource_type,
      bytes: uploadResult.bytes,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { publicId } = await req.json();
    if (!publicId) {
      return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
    }

    await deleteImage(publicId);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
