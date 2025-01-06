export interface Skill {
  id: string;
  name: string;
}

export interface CandidateSkillResponse {
  skill_id: string;
  skills: {
    name: string;
  };
}

export interface SkillsState {
  skills: string[];
  isLoadingSkills: boolean;
}