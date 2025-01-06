import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import type { ScheduleFormType } from "./types";

interface AvailabilityTypeFieldProps {
  form: UseFormReturn<ScheduleFormType>;
}

export const AvailabilityTypeField = ({ form }: AvailabilityTypeFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="availability_type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Availability Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select availability type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-background border shadow-lg z-50">
              <SelectItem value="full_time">Full Time</SelectItem>
              <SelectItem value="part_time">Part Time / Fractional</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};