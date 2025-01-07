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
      if (!session?.user) {
        console.log("No user session found");
        setIsLoading(false);
        return;
      }

      try {
        console.log("Fetching schedule data for user:", session.user.id);
        
        const { data: existingApp, error: fetchError } = await supabase
          .from("candidate_applications")
          .select("id, availability_type, earliest_start_date, preferred_schedule")
          .eq("user_id", session.user.id)
          .limit(1)
          .single();

        if (fetchError) {
          console.error("Error fetching schedule:", fetchError);
          throw fetchError;
        }

        console.log("Fetched application data:", existingApp);

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
      } catch (error: any) {
        console.error("Error in fetchSchedule:", error);
        toast({
          title: "Error",
          description: "Failed to load schedule data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [session, toast]);

  const onSubmit = async (values: ScheduleFormType) => {
    if (!session?.user) {
      console.log("No user session found during submit");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Updating schedule with values:", values);
      
      const { error } = await supabase
        .from("candidate_applications")
        .upsert({
          user_id: session.user.id,
          availability_type: values.availability_type,
          earliest_start_date: values.earliest_start_date,
          preferred_schedule: values.preferred_schedule,
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your schedule has been updated.",
      });
      setFormData(values);
    } catch (error: any) {
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