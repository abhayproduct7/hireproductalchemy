import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalDetails } from "./talent/PersonalDetails";
import { ProfessionalExperience } from "./talent/ProfessionalExperience";
import { ScheduleAvailability } from "./talent/ScheduleAvailability";

export const TalentProfile = () => {
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
    </div>
  );
};