import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { joinFormSchema, type JoinFormValues } from "./join-form/schema";
import { AuthDialog } from "./join-form/AuthDialog";
import { BasicInfoFields } from "./join-form/fields/BasicInfoFields";
import { CVUploadField } from "./join-form/fields/CVUploadField";
import { SkillsField } from "./join-form/fields/SkillsField";
import { AvailabilityFields } from "./join-form/fields/AvailabilityFields";

const STEPS = [
  { title: "Basic Information", component: BasicInfoFields },
  { title: "CV Upload", component: CVUploadField },
  { title: "Skills", component: SkillsField },
  { title: "Availability", component: AvailabilityFields },
];

export const JoinApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
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

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const CurrentStepComponent = STEPS[currentStep].component;

  // Get the field names for the current step
  const getStepFields = (stepIndex: number): (keyof JoinFormValues)[] => {
    switch (stepIndex) {
      case 0: // Basic Information
        return ["yearsExperience", "professionalSummary"];
      case 1: // CV Upload
        return ["cv"];
      case 2: // Skills
        return ["skills"];
      case 3: // Availability
        return ["availabilityType", "earliestStartDate", "preferredSchedule"];
      default:
        return [];
    }
  };

  const nextStep = async () => {
    const currentFields = getStepFields(currentStep);
    const isValid = await form.trigger(currentFields);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    } else {
      toast({
        title: "Please complete all required fields",
        description: "Some fields need your attention before proceeding.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

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
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Step {currentStep + 1} of {STEPS.length}</span>
            <span>{STEPS[currentStep].title}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="min-h-[400px]">
              <CurrentStepComponent form={form} />
            </div>

            <div className="flex gap-4 pt-4 border-t">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1"
                >
                  Previous
                </Button>
              )}
              
              {currentStep === STEPS.length - 1 ? (
                <Button 
                  type="submit" 
                  className="flex-1 bg-secondary hover:bg-secondary/90"
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
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-secondary hover:bg-secondary/90"
                >
                  Next
                </Button>
              )}
            </div>
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