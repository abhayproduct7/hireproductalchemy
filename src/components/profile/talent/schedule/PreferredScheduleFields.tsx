import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ScheduleFormType } from "./types";

interface PreferredScheduleFieldsProps {
  form: UseFormReturn<ScheduleFormType>;
}

export const PreferredScheduleFields = ({ form }: PreferredScheduleFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="preferred_schedule.hoursPerWeek"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Hours per Week</FormLabel>
            <FormControl>
              <Input type="number" min="1" max="40" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferred_schedule.timeZone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Time Zone</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., UTC-5, PST, EST" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};