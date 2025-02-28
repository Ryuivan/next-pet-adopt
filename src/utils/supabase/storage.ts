import { createClient } from "./client";
import { createServiceClient } from "./service";

type ImageStorageProps = {
  file: File;
  bucket: string;
  pathname?: string;
  folder?: string;
};

const getStorage = () => {
  const { storage } = createClient();

  return storage;
};

export const getImageFromStorage = async ({}) => {};

export const uploadImageToStorage = async ({
  file,
  bucket,
  folder,
}: ImageStorageProps) => {
  try {
    const supabase = createClient();

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder ? folder + "/" : ""}${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) throw new Error(error.message);

    // Dapatkan URL publik
    const { data: publicURL } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return { imageUrl: publicURL.publicUrl, error: null };
  } catch (error) {
    console.error(error);
    return {
      imageUrl: null,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
};

export const deleteImage = async ({
  bucket,
  pathname,
  folder,
}: Partial<ImageStorageProps>) => {
  const supabase = await createServiceClient()

  if (!bucket) {
    console.error("Bucket name is required");
    return { message: null, error: "Image upload failed" };
  }

  const path = `${folder ? folder + "/" : ""}${pathname}`;

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    console.error("Error deleting image: ", error);
    return { message: null, error: "Image upload failed" };
  }

  return { message: "Image deleted successfully.", error: null };
};
