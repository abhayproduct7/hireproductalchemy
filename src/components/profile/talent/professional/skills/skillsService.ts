import { supabase } from "@/integrations/supabase/client";
import { CandidateSkillResponse } from "./types";

export const skillsService = {
  async fetchSkills(applicationId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('candidate_skills')
      .select(`
        skill_id,
        skills:skills!inner (
          name
        )
      `)
      .eq('application_id', applicationId);
    
    if (error) throw error;
    
    // Safely type and transform the response
    const typedData = data as unknown as Array<{
      skill_id: string;
      skills: { name: string };
    }>;
    
    return typedData.map(item => item.skills.name);
  },

  async addSkill(applicationId: string, skillName: string) {
    // Check if skill exists
    const { data: existingSkill, error: searchError } = await supabase
      .from('skills')
      .select('id')
      .eq('name', skillName.trim())
      .maybeSingle();

    if (searchError) throw searchError;

    let skillId;

    if (!existingSkill) {
      // Create new skill if it doesn't exist
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

    // Link skill to application
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
    const { data: skillData, error: searchError } = await supabase
      .from('skills')
      .select('id')
      .eq('name', skillName)
      .maybeSingle();

    if (searchError) throw searchError;

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