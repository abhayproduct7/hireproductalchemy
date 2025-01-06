import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
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
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const scheduleSchema = z.object({
  availability_type: z.enum(["full_time", "part_time"]),
  earliest_start_date: z.date(),
  preferred_schedule: z.object({
    hoursPerWeek: z.string().min(1, "Hours per week is required"),
    timeZone: z.string().min(1, "Time zone is required"),
  }),
});

type ScheduleForm = z.infer<typeof scheduleSchema>;

export const ScheduleAvailability = () => {
  const session = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ScheduleForm>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      availability_type: "full_time",
      preferred_schedule: {
        hoursPerWeek: "",
        timeZone: "",
      },
    },
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      if (session?.user) {
        const { data, error } = await supabase
          .from("candidate_applications")
          .select("availability_type, earliest_start_date, preferred_schedule")
          .eq("user_id", session.user.id)
          .single();

        if (!error && data) {
          form.reset({
            availability_type: data.availability_type,
            earliest_start_date: data.earliest_start_date ? new Date(data.earliest_start_date) : new Date(),
            preferred_schedule: data.preferred_schedule || {
              hoursPerWeek: "",
              timeZone: "",
            },
          });
        }
      }
    };

    fetchSchedule();
  }, [session, form]);

  const onSubmit = async (values: ScheduleForm) => {
    if (!session?.user) return;

    setIsLoading(true);
    const { error } = await supabase
      .from("candidate_applications")
      .upsert({
        user_id: session.user.id,
        availability_type: values.availability_type,
        earliest_start_date: values.earliest_start_date,
        preferred_schedule: values.preferred_schedule,
      })
      .eq("user_id", session.user.id);

    setIsLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update schedule. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Your schedule has been updated.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule & Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="availability_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                    <PopoverContent className="w-auto p-0" align="start">
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
      </CardContent>
    </Card>
  );
};