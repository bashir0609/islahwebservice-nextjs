import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File, folder = "islahwebservice") {
  const bytes = Buffer.from(await file.arrayBuffer());
  const base64 = bytes.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: "auto",
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
    resourceType: result.resource_type,
    bytes: result.bytes,
  };
}

export async function deleteImage(publicId: string) {
  await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
}

export async function listImages(folder = "islahwebservice", maxResults = 100) {
  const result = await cloudinary.search
    .expression(`folder:${folder}`)
    .sort_by("created_at", "desc")
    .max_results(maxResults)
    .execute();

  return (result.resources as Array<{
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    bytes: number;
    created_at: string;
  }>).map((resource) => ({
    publicId: resource.public_id,
    url: resource.secure_url,
    width: resource.width,
    height: resource.height,
    format: resource.format,
    resourceType: resource.resource_type,
    bytes: resource.bytes,
    createdAt: resource.created_at,
  }));
}

export { cloudinary };
