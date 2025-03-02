import { z } from "zod";

export const UpdatePetFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  image: z.instanceof(File).optional(),
  species: z.string().min(3, "Species must be at least 3 characters long"),
  breed: z.string().min(3, "Breed must be at least 3 characters long"),
  gender: z.enum(["Male", "Female"], {
    message: "Gender must be either Male or Female",
  }),
  age: z.number().int().min(0, "Age must be a non-negative integer"),
  date_of_birth: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
});

export type UpdatePetFormData = z.infer<typeof UpdatePetFormSchema>;
