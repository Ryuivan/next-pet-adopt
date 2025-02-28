import { z } from "zod";

export const UpdateUserDashboardFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 50 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),

  role: z.enum(["user", "admin"]),
});

export type UpdateUserDashboardFormData = z.infer<typeof UpdateUserDashboardFormSchema>;
