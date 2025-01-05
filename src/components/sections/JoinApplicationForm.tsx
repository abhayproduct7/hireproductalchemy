import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { joinFormSchema, type JoinFormValues } from "./join-form/schema";
import { AuthDialog } from "./join-form/AuthDialog";
import { FormFields } from "./join-form/FormFields";

export const JoinApplicationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const navigate = useNavigate();
  const session = useSession();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const form = useForm<JoinFormValues>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      professionalSummary: "",
      preferredSchedule: {
        hoursPerWeek: "",
        timeZone: "",
      },
      skills: [],
    },
  });

  const onSubmit = async (values: JoinFormValues) => {
    if (!session?.user) {
      localStorage.setItem('pendingApplication', JSON.stringify(values));
      setShowAuthDialog(true);
      return;
    }

    setIsLoading(true);
    try {
      let cvUrl = null;
      
      // Upload CV if provided
      if (values.cv) {
        const fileExt = values.cv.name.split('.').pop();
        const filePath = `${session.user.id}/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('assets')
          .upload(filePath, values.cv);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('assets')
          .getPublicUrl(filePath);

        cvUrl = publicUrl;
      }

      // First insert the application
      const { data: applicationData, error: applicationError } = await supabase
        .from("candidate_applications")
        .insert({
          user_id: session.user.id,
          years_experience: parseInt(values.yearsExperience),
          professional_summary: values.professionalSummary,
          availability_type: values.availabilityType,
          earliest_start_date: values.earliestStartDate,
          preferred_schedule: values.preferredSchedule,
          cv_url: cvUrl,
        })
        .select()
        .single();

      if (applicationError) throw applicationError;

      // Then handle skills
      const skillPromises = values.skills.map(async (skillName) => {
        // First, insert or get the skill
        const { data: skillData, error: skillError } = await supabase
          .from("skills")
          .select("id")
          .eq("name", skillName)
          .single();

        if (skillError && skillError.code !== "PGRST116") {
          throw skillError;
        }

        let skillId;
        if (!skillData) {
          const { data: newSkill, error: newSkillError } = await supabase
            .from("skills")
            .insert({ name: skillName })
            .select()
            .single();

          if (newSkillError) throw newSkillError;
          skillId = newSkill.id;
        } else {
          skillId = skillData.id;
        }

        const { error: linkError } = await supabase
          .from("candidate_skills")
          .insert({
            application_id: applicationData.id,
            skill_id: skillId,
          });

        if (linkError) throw linkError;
      });

      await Promise.all(skillPromises);

      toast({
        title: "Application submitted successfully!",
        description: "We'll review your application and get back to you soon.",
      });
      
      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormFields form={form} />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </Form>

      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />
    </div>
  );
};