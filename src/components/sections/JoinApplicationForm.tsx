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
      // Update user type to 'talent'
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ user_type: 'talent' })
        .eq('id', session.user.id);

      if (profileError) throw profileError;

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
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 text-center bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent rounded-lg p-8 animate-fade-up">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Thank You for Creating Your Account
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          You're just a few steps away from joining our community of product leaders. 
          Please complete your application below to help us understand your experience and preferences.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-muted p-8 animate-fade-up">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          Complete Your Application
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormFields form={form} />
            
            <Button 
              type="submit" 
              className="w-full bg-secondary hover:bg-secondary/90"
              disabled={isLoading}
            >
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
      </div>

      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />
    </div>
  );
};