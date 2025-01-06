import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export const scheduleSchema = z.object({
  availability_type: z.enum(["full_time", "part_time"]),
  earliest_start_date: z.date(),
  preferred_schedule: z.object({
    hoursPerWeek: z.string().min(1, "Hours per week is required"),
    timeZone: z.string().min(1, "Time zone is required"),
  }),
});

export type ScheduleForm = z.infer<typeof scheduleSchema>;

interface ScheduleFormProps {
  defaultValues: ScheduleForm;
  onSubmit: (values: ScheduleForm) => Promise<void>;
  isLoading: boolean;
}

export const ScheduleForm = ({ defaultValues, onSubmit, isLoading }: ScheduleFormProps) => {
  const form = useForm<ScheduleForm>({
    resolver: zodResolver(scheduleSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <FormField
          control={form.control}
          name="earliest_start_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Earliest Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-full pl-3 text-left font-normal ${
                        !field.value && "text-muted-foreground"
                      }`}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="bg-background border shadow-lg p-0 z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};