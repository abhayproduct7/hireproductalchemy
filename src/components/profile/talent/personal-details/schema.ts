import { z } from "zod";

export const personalDetailsSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  avatar_url: z.string().optional(),
});

export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;