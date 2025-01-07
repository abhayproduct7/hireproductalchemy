import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalDetails } from "./talent/PersonalDetails";
import { ProfessionalExperience } from "./talent/ProfessionalExperience";
import { ScheduleAvailability } from "./talent/ScheduleAvailability";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Save } from "lucide-react";

export const TalentProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Trigger save methods from child components
      const personalDetailsForm = document.querySelector('form[data-form-type="personal-details"]');
      const professionalForm = document.querySelector('form[data-form-type="professional"]');
      const scheduleForm = document.querySelector('form[data-form-type="schedule"]');

      // Submit all forms
      if (personalDetailsForm) {
        await (personalDetailsForm as HTMLFormElement).requestSubmit();
      }
      if (professionalForm) {
        await (professionalForm as HTMLFormElement).requestSubmit();
      }
      if (scheduleForm) {
        await (scheduleForm as HTMLFormElement).requestSubmit();
      }

      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and preferences
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Details</TabsTrigger>
          <TabsTrigger value="professional">Professional Experience</TabsTrigger>
          <TabsTrigger value="schedule">Schedule & Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <PersonalDetails />
        </TabsContent>

        <TabsContent value="professional" className="space-y-6">
          <ProfessionalExperience />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <ScheduleAvailability />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-6 border-t">
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          size="lg"
          className="min-w-[200px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};