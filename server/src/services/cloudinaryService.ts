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