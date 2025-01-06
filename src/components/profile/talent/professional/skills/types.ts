export interface Skill {
  id: string;
  name: string;
}

export interface CandidateSkill {
  application_id: string;
  skill_id: string;
  skills: Skill;
}

export interface SkillsState {
  skills: string[];
  isLoadingSkills: boolean;
}

// This represents the actual structure returned by Supabase
export interface SkillsResponse {
  skills: Skill;
}