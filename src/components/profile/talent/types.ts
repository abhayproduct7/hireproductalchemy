export interface Skill {
  name: string;
}

export interface SkillResponse {
  skills: {
    name: string;
  };
}

export interface SkillsState {
  skills: string[];
  isLoadingSkills: boolean;
}