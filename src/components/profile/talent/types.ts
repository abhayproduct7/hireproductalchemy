export interface Skill {
  id: string;
  name: string;
}

export interface CandidateSkill {
  application_id: string;
  skill_id: string;
  skills: Skill;
}