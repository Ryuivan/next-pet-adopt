"use server";

import { Pet } from "@/types/model/Pet";
import { createClient } from "@/utils/supabase/server";
import { getUserById } from "../user/actions";
import { deleteImage } from "@/utils/supabase/storage";

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

export const getPetById = async (id: string): Promise<Pet | null> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    return data as Pet;
  } catch (error) {
    console.error("Error fetching pet:", error);
    return null;
  }
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

export const updatePet = async (pet: Partial<Pet>): Promise<boolean> => {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("pets")
      .update({
        name: pet.name,
        image: pet.image,
        species: pet.species,
        breed: pet.breed,
        gender: pet.gender,
        age: pet.age,
        date_of_birth: pet.date_of_birth,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pet.id);

    if (error) throw new Error("Error updating pet:", error);

    return true;
  } catch (error) {
    console.error("Error updating pet:", error);
    return false;
  }
};

export const deletePet = async (pet: Pet): Promise<boolean> => {
  try {
    const supabase = await createClient();

    if (pet.image && typeof pet.image === "string") {
      const filePath = pet.image.split(
        "/storage/v1/object/public/pets_picture/"
      )[1];

      if (!filePath) {
        throw new Error("Invalid image URL format");
      }

      const { error } = await deleteImage({
        pathname: filePath,
        bucket: "pets_pictures",
      });

      if (error) throw new Error(error);
    }

    const { error } = await supabase
      .from("pets")
      .delete()
      .match({ id: pet.id });
    if (error) throw new Error(error.message);

    return true;
  } catch (error) {
    console.error("Error deleting pet:", error);
    return false;
  }
};
