import * as z from "zod";

export const personalDetailsSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  avatar_url: z.string().optional(),
});

export type PersonalDetailsForm = z.infer<typeof personalDetailsSchema>;