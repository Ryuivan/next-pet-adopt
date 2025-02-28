"use server";

import { Pet } from "@/types/model/Pet";
import { createClient } from "@/utils/supabase/server";
import { uploadImageToStorage } from "@/utils/supabase/storage";

export const getTotalPets = async (): Promise<number> => {
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("pets")
      .select("id", { count: "exact" });

    if (error) throw new Error(error.message);

    return count ?? 0;
  } catch (error) {
    return -1;
  }
};

export const getMonthlyPets = async (): Promise<number> => {
  try {
    const supabase = await createClient();

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("pets")
      .select("id")
      .gte("created_at", startOfMonth.toISOString());

    if (error) throw new Error(error.message);

    return data.length;
  } catch (error) {
    console.error("Error fetching monthly pets:", error);
    return -1;
  }
};

export const getAllPets = async (): Promise<Pet[] | null> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data as Pet[];
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const createPet = async (
  petData: Omit<Pet, "id" | "created_at" | "updated_at">
) => {
  try {
    const supabase = await createClient();

    let imageUrl;

    if (petData.image instanceof File) {
      const { imageUrl: uploadedUrl, error } = await uploadImageToStorage(
        petData.image
      );

      if (error) {
        throw new Error(error);
      }

      imageUrl = uploadedUrl;
    }

    const newPet = {
      ...petData,
      image: imageUrl || undefined,
    };

    const { data, error } = await supabase.from("pets").insert(newPet);

    if (error) throw new Error(error.message);

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
