import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SkillsState } from "../../types";

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
        const { data: skillsData, error } = await supabase
          .from('candidate_skills')
          .select('skills(name)')
          .eq('application_id', applicationId);

        if (error) throw error;

        if (skillsData) {
          const skillNames = skillsData.map(item => item.skills.name);
          setState({ skills: skillNames, isLoadingSkills: false });
        }
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
      let { data: existingSkill } = await supabase
        .from('skills')
        .select('id')
        .eq('name', newSkill.trim())
        .maybeSingle();

      let skillId;

      if (!existingSkill) {
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

      const { error: linkError } = await supabase
        .from('candidate_skills')
        .insert({
          application_id: applicationId,
          skill_id: skillId,
        });

      if (linkError) throw linkError;

      setState(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      
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

        setState(prev => ({
          ...prev,
          skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
        
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

  return {
    ...state,
    addSkill,
    removeSkill,
  };
};