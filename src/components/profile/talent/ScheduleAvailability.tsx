import { useSession } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleForm, type ScheduleForm } from "./schedule/ScheduleForm";

export const ScheduleAvailability = () => {
  const session = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const defaultValues: ScheduleForm = {
    availability_type: "full_time",
    earliest_start_date: new Date(),
    preferred_schedule: {
      hoursPerWeek: "",
      timeZone: "",
    },
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!session?.user) return;

      try {
        // First try to get existing application
        const { data: existingApp, error: fetchError } = await supabase
          .from("candidate_applications")
          .select("id, availability_type, earliest_start_date, preferred_schedule")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (fetchError) throw fetchError;

        // If no application exists, create one
        if (!existingApp) {
          const { data: newApp, error: insertError } = await supabase
            .from("candidate_applications")
            .insert({
              user_id: session.user.id,
              years_experience: 0,
              professional_summary: "",
              availability_type: defaultValues.availability_type,
              earliest_start_date: defaultValues.earliest_start_date,
              preferred_schedule: defaultValues.preferred_schedule,
            })
            .select("id")
            .single();

          if (insertError) throw insertError;
          setApplicationId(newApp.id);
          return;
        }

        // If application exists, set the form values
        setApplicationId(existingApp.id);
        if (existingApp.availability_type || existingApp.earliest_start_date || existingApp.preferred_schedule) {
          defaultValues.availability_type = existingApp.availability_type;
          defaultValues.earliest_start_date = existingApp.earliest_start_date ? new Date(existingApp.earliest_start_date) : new Date();
          defaultValues.preferred_schedule = existingApp.preferred_schedule || {
            hoursPerWeek: "",
            timeZone: "",
          };
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
        toast({
          title: "Error",
          description: "Failed to load schedule data. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchSchedule();
  }, [session, toast]);

  const onSubmit = async (values: ScheduleForm) => {
    if (!session?.user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("candidate_applications")
        .update({
          availability_type: values.availability_type,
          earliest_start_date: values.earliest_start_date,
          preferred_schedule: values.preferred_schedule,
        })
        .eq("user_id", session.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your schedule has been updated.",
      });
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update schedule. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule & Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <ScheduleForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};