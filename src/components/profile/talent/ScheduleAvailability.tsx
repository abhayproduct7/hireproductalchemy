import { useSession } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleForm } from "./schedule/ScheduleForm";
import type { ScheduleFormType } from "./schedule/types";
import { Loader2 } from "lucide-react";

export const ScheduleAvailability = () => {
  const session = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ScheduleFormType>({
    availability_type: "full_time",
    earliest_start_date: new Date(),
    preferred_schedule: {
      hoursPerWeek: "",
      timeZone: "",
    },
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!session?.user) return;

      try {
        const { data: existingApp, error: fetchError } = await supabase
          .from("candidate_applications")
          .select("id, availability_type, earliest_start_date, preferred_schedule")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (existingApp) {
          setApplicationId(existingApp.id);
          setFormData({
            availability_type: existingApp.availability_type || "full_time",
            earliest_start_date: existingApp.earliest_start_date ? new Date(existingApp.earliest_start_date) : new Date(),
            preferred_schedule: existingApp.preferred_schedule || {
              hoursPerWeek: "",
              timeZone: "",
            },
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        toast({
          title: "Error",
          description: "Failed to load schedule data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [session, toast]);

  const onSubmit = async (values: ScheduleFormType) => {
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
      setFormData(values);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule & Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <ScheduleForm
          defaultValues={formData}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};