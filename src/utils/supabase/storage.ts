import { createClient } from "./client";

type ImageStorageProps = {
  file: File;
  bucket: string;
  folder?: string;
};

const getStorage = () => {
  const { storage } = createClient();

  return storage;
};

export const getImageFromStorage = async ({}) => {};


export const uploadImageToStorage = async (file: File) => {
  try {
    const supabase = createClient();

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `pets_picture/${fileName}`;

    const { data, error } = await supabase.storage
      .from("pets_picture")
      .upload(filePath, file);

    if (error) throw new Error(error.message);

    // Dapatkan URL publik
    const { data: publicURL } = supabase.storage
      .from("pets_picture")
      .getPublicUrl(filePath);

    return { imageUrl: publicURL.publicUrl, error: null };
  } catch (error) {
    console.error(error);
    return { imageUrl: null, error: error instanceof Error ? error.message : "Upload failed" };
  }
};

export const deleteImage = async ({
  file,
  bucket,
  folder,
}: ImageStorageProps) => {
  const storage = getStorage();

  const path = `${folder ? folder + "/" : ""}${file}`;

  const { error } = await storage.from(bucket).remove([path]);

  if (error) {
    console.error("Error deleting image: ", error);
    return { message: null, error: "Image upload failed" };
  }

  return { message: "Image deleted successfully.", error: null };
};
