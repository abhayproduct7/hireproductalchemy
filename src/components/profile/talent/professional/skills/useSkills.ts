import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SkillsState } from "./types";
import { skillsService } from "./skillsService";

export const useSkills = (applicationId: string | null) => {
  const { toast } = useToast();
  const [state, setState] = useState<SkillsState>({
    skills: [],
    isLoadingSkills: true,
  });

  useEffect(() => {
    const fetchSkills = async () => {
      if (!applicationId) {
        setState(prev => ({ ...prev, isLoadingSkills: false }));
        return;
      }

      try {
        const skills = await skillsService.fetchSkills(applicationId);
        setState({ skills, isLoadingSkills: false });
      } catch (error) {
        console.error('Error fetching skills:', error);
        toast({
          title: "Error",
          description: "Failed to load skills. Please try again.",
          variant: "destructive",
        });
        setState(prev => ({ ...prev, isLoadingSkills: false }));
      }
    };

    fetchSkills();
  }, [applicationId, toast]);

  const addSkill = async (newSkill: string) => {
    if (!applicationId || !newSkill.trim()) return;

    try {
      const addedSkill = await skillsService.addSkill(applicationId, newSkill);
      setState(prev => ({ ...prev, skills: [...prev.skills, addedSkill] }));
      
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
      await skillsService.removeSkill(applicationId, skillToRemove);
      setState(prev => ({
        ...prev,
        skills: prev.skills.filter(skill => skill !== skillToRemove)
      }));
      
      toast({
        title: "Success",
        description: "Skill removed successfully.",
      });
    } catch (error) {
      console.error('Error removing skill:', error);
      toast({
        title: "Error",
        description: "Failed to remove skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    ...state,
    addSkill,
    removeSkill,
  };
};