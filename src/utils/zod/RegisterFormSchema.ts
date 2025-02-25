import { z } from "zod";

export const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 50 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
