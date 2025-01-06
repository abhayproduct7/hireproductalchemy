import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillInput } from "./skills/SkillInput";
import { SkillsList } from "./skills/SkillsList";
import { useSkills } from "./skills/useSkills";

interface SkillsSectionProps {
  applicationId: string | null;
}

export const SkillsSection = ({ applicationId }: SkillsSectionProps) => {
  const { skills, isLoadingSkills, addSkill, removeSkill } = useSkills(applicationId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <SkillInput onAddSkill={addSkill} />
          <SkillsList 
            skills={skills} 
            isLoading={isLoadingSkills} 
            onRemoveSkill={removeSkill} 
          />
        </div>
      </CardContent>
    </Card>
  );
};