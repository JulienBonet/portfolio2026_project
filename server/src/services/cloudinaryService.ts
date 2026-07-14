import cloudinary from "../config/cloudinary.js";

export function uploadImageBuffer(
  buffer: Buffer,
  folder: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result!.secure_url);
      },
    );

    stream.end(buffer);
  });
}

export async function deleteImageFromCloudinary(
  imageUrl: string,
) {
  const parts = imageUrl.split("/upload/");

  if (parts.length !== 2) {
    throw new Error("Invalid Cloudinary URL");
  }

  const publicIdWithExtension = parts[1]
    .replace(/^v\d+\//, "");

  const publicId = decodeURIComponent(
    publicIdWithExtension.replace(/\.[^/.]+$/, ""),
  );

  console.log("Cloudinary delete publicId:", publicId);

  return cloudinary.uploader.destroy(
    publicId,
  );
}