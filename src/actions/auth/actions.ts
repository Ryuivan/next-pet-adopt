"use server";

import { ForgotPasswordUserCredentials } from "@/types/auth/ForgotPasswordUserCredentials";
import { LoginUserCredentials } from "@/types/auth/LoginUserCredentials";
import { RegisterUserCredentials } from "@/types/auth/RegisterUserCredentials";
import { User } from "@/types/model/User";
import { createClient } from "@/utils/supabase/server";
import { ForgotPasswordFormSchema } from "@/utils/zod/ForgotPasswordFormSchema";
import { LoginFormSchema } from "@/utils/zod/LoginFormSchema";
import { RegisterFormSchema } from "@/utils/zod/RegisterFormSchema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const registerUser = async (credentials: RegisterUserCredentials) => {
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

export const login = async (credentials: LoginUserCredentials) => {
  try {
    const supabase = await createClient();

    // Validate credentials
    const validCredentials = LoginFormSchema.parse(credentials);
    const { email, password } = validCredentials;

    // Sign in user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(`Failed to login: ${error.message}`);
    if (!data.user) throw new Error("User login failed");

    revalidatePath("/", "layout");

    return {
      success: true,
      data: data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const logout = async () => {
  try {
    const supabase = await createClient();

    // Sign out user
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(`Failed to logout: ${error.message}`);

    revalidatePath("/", "layout");
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const getUserSession = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;

  return {
    success: true,
    user: data?.user,
  };
};

export const forgotPassword = async (
  credentials: ForgotPasswordUserCredentials
) => {
  try {
    const supabase = await createClient();
    const origin = process.env.NEXT_PUBLIC_APP_URL;

    const validCredentials = ForgotPasswordFormSchema.parse(credentials);
    const { email } = validCredentials;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/reset-password`,
    });

    if (error)
      throw new Error(`Failed to send password reset: ${error.message}`);

    return {
      success: true,
      message: "Password reset email sent",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const resetPassword = async (credentials: string, code: string) => {
  try {
    const supabase = await createClient();

    const { error: CodeError } = await supabase.auth.exchangeCodeForSession(
      code
    );

    if (CodeError)
      throw new Error(`Failed to reset password: ${CodeError.message}`);

    const { error } = await supabase.auth.updateUser({
      password: credentials,
    });

    if (error) throw new Error(`Failed to reset password: ${error.message}`);

    return {
      success: true,
      message: "Password reset successful",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};
