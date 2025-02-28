"use server";

import { Pet } from "@/types/model/Pet";
import { createClient } from "@/utils/supabase/server";
import { uploadImageToStorage } from "@/utils/supabase/storage";
import { getUserById } from "../user/actions";

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

    const now = new Date();
    const startOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0)
    );
    const startOfNextMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0)
    );

    const { data, error } = await supabase
      .from("pets")
      .select("id")
      .gte("created_at", startOfMonth.toISOString())
      .lt("created_at", startOfNextMonth.toISOString());

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

export const getAllPetsAndUsername = async () => {
  const pets = await getAllPets();

  if (!pets) {
    return [];
  }

  return Promise.all(
    pets.map(async (pet) => {
      const user = pet?.added_by ? await getUserById(pet.added_by) : null;

      return { ...pet, added_by: user?.username };
    })
  );
};

export const createPet = async (
  petData: Omit<Pet, "id" | "created_at" | "updated_at">
) => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("pets").insert(petData);

    if (error) throw new Error(error.message);

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const deletePet = async (id: string): Promise<boolean> => {
  return false;
};
