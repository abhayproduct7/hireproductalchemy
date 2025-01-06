import { supabase } from "@/integrations/supabase/client";
import { CandidateSkill } from "./types";

export const skillsService = {
  async fetchSkills(applicationId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('candidate_skills')
      .select('skills(name)')
      .eq('application_id', applicationId);
    
    if (error) throw error;
    
    // Transform the response to get just the skill names
    return (data as CandidateSkill[]).map(item => item.skills.name);
  },

  async addSkill(applicationId: string, skillName: string) {
    // Check if skill exists
    const { data: existingSkill } = await supabase
      .from('skills')
      .select('id')
      .eq('name', skillName.trim())
      .maybeSingle();

    let skillId;

    if (!existingSkill) {
      const { data: newSkillData, error: newSkillError } = await supabase
        .from('skills')
        .insert({ name: skillName.trim() })
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
    return skillName.trim();
  },

  async removeSkill(applicationId: string, skillName: string) {
    const { data: skillData } = await supabase
      .from('skills')
      .select('id')
      .eq('name', skillName)
      .single();

    if (skillData) {
      const { error } = await supabase
        .from('candidate_skills')
        .delete()
        .eq('application_id', applicationId)
        .eq('skill_id', skillData.id);

      if (error) throw error;
    }
  }
};