import { z } from "zod";

export const ForgotPasswordFormSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordFormSchema>;
