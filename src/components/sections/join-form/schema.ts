import * as z from "zod";

export const joinFormSchema = z.object({
  yearsExperience: z.string().min(1, "Years of experience is required"),
  professionalSummary: z.string().min(100, "Please provide at least 100 characters"),
  availabilityType: z.enum(["full_time", "part_time"]),
  earliestStartDate: z.date(),
  preferredSchedule: z.object({
    hoursPerWeek: z.string().min(1, "Hours per week is required"),
    timeZone: z.string().min(1, "Time zone is required"),
  }),
  skills: z.array(z.string()).min(1, "Please add at least one skill"),
});

export type JoinFormValues = z.infer<typeof joinFormSchema>;