import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, X } from "lucide-react";
import { SkillResponse } from "../types";

interface SkillsSectionProps {
  applicationId: string | null;
}

export const SkillsSection = ({ applicationId }: SkillsSectionProps) => {
  const { toast } = useToast();
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!applicationId) {
        setIsLoadingSkills(false);
        return;
      }

      try {
        const { data: skillsData, error } = await supabase
          .from('candidate_skills')
          .select('skills(name)')
          .eq('application_id', applicationId);

        if (error) throw error;

        if (skillsData) {
          const skillNames = skillsData.map((item: SkillResponse) => item.skills.name);
          setSkills(skillNames);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        toast({
          title: "Error",
          description: "Failed to load skills. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingSkills(false);
      }
    };

    fetchSkills();
  }, [applicationId, toast]);

  const addSkill = async () => {
    if (!applicationId || !newSkill.trim()) return;

    try {
      // First check if skill exists
      let { data: existingSkill } = await supabase
        .from('skills')
        .select('id')
        .eq('name', newSkill.trim())
        .maybeSingle();

      let skillId;

      if (!existingSkill) {
        // Create new skill if it doesn't exist
        const { data: newSkillData, error: newSkillError } = await supabase
          .from('skills')
          .insert({ name: newSkill.trim() })
          .select('id')
          .single();

        if (newSkillError) throw newSkillError;
        skillId = newSkillData.id;
      } else {
        skillId = existingSkill.id;
      }

      // Add skill to candidate_skills
      const { error: linkError } = await supabase
        .from('candidate_skills')
        .insert({
          application_id: applicationId,
          skill_id: skillId,
        });

      if (linkError) throw linkError;

      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      
      toast({
        title: "Success",
        description: "Skill added successfully.",
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Error",
        description: "Failed to add skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeSkill = async (skillToRemove: string) => {
    if (!applicationId) return;

    try {
      const { data: skillData } = await supabase
        .from('skills')
        .select('id')
        .eq('name', skillToRemove)
        .single();

      if (skillData) {
        const { error } = await supabase
          .from('candidate_skills')
          .delete()
          .eq('application_id', applicationId)
          .eq('skill_id', skillData.id);

        if (error) throw error;

        setSkills(skills.filter(skill => skill !== skillToRemove));
        
        toast({
          title: "Success",
          description: "Skill removed successfully.",
        });
      }
    } catch (error) {
      console.error('Error removing skill:', error);
      toast({
        title: "Error",
        description: "Failed to remove skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a skill (e.g., Agile, User Research)"
            />
            <Button type="button" onClick={addSkill}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {isLoadingSkills ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading skills...
              </div>
            ) : skills.length > 0 ? (
              skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-1 bg-secondary/20 px-3 py-1 rounded-full"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No skills added yet. Add some skills to help match with opportunities.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};