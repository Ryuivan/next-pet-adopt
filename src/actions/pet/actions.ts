import { createClient } from "@/utils/supabase/server";

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
