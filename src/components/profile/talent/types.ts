export interface Skill {
  name: string;
}

export interface SkillResponse {
  skills: Skill;
}

export interface SkillsState {
  skills: string[];
  isLoadingSkills: boolean;
}