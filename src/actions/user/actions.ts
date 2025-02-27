"use server";

import { User } from "@/types/model/User";
import { createClient } from "@/utils/supabase/server";

export const fetchUserData = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return { user: null, role: null };

  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return {
    user,
    role: profile?.role,
  };
};

export const getTotalUsers = async (): Promise<number> => {
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("user_profiles")
      .select("id", { count: "exact" });

    if (error) throw new Error(error.message);

    return count ?? 0;
  } catch (error) {
    return -1;
  }
};

export const getAllUsers = async (): Promise<User[] | null> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const getMonthlyUsers = async (): Promise<number> => {
  try {
    const supabase = await createClient();

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("user_profiles")
      .select("id")
      .gte("created_at", startOfMonth.toISOString());

    if (error) throw new Error(error.message);

    return data.length;
  } catch (error) {
    console.error("Error fetching monthly users:", error);
    return -1;
  }
};
