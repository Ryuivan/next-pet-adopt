"use server";

import { RegisterUserCredentials } from "@/types/auth/RegisterUserCredentials";
import { User } from "@/types/model/User";
import { createClient } from "@/utils/supabase/server";
import { RegisterFormSchema } from "@/utils/zod/RegisterFormSchema";
import { revalidatePath } from "next/cache";

export const registerUser = async (
  credentials: RegisterUserCredentials
): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    const supabase = await createClient();

    // Validate credentials
    const validCredentials = RegisterFormSchema.parse(credentials);
    const { username, email, password } = validCredentials;

    // Check if username already exists
    const { data: userExists, error: userCheckError } = await supabase
      .from("user_profiles")
      .select("username")
      .eq("username", username)
      .single();

    if (userExists) throw new Error("Username already exists");

    // Sign up user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) throw new Error(`Failed to register user: ${error.message}`);
    if (!data.user) throw new Error("User creation failed.");

    // Insert user profile
    const userProfile: Omit<User, "created_at" | "updated_at" | "role"> = {
      id: data.user.id,
      username,
      email,
    };

    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert([{ ...userProfile, role: "user" }]);

    if (profileError)
      throw new Error(`Failed to create user profile: ${profileError.message}`);

    // Revalidate cache and return response
    revalidatePath("/", "layout");

    return {
      success: true,
      message: "User registered successfully",
      user: {
        ...userProfile,
        role: "user",
        created_at: new Date(),
        updated_at: new Date(),
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};
