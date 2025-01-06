import { z } from "zod";

export const scheduleSchema = z.object({
  availability_type: z.enum(["full_time", "part_time"]),
  earliest_start_date: z.date(),
  preferred_schedule: z.object({
    hoursPerWeek: z.string().min(1, "Hours per week is required"),
    timeZone: z.string().min(1, "Time zone is required"),
  }),
});

export type ScheduleFormType = z.infer<typeof scheduleSchema>;