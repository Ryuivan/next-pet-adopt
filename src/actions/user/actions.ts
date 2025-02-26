"use server";

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
