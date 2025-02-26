import { z } from "zod";

export const ResetPasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof ResetPasswordFormSchema>;
