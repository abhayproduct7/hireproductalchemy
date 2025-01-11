export type RequirementAnswers = {
  type: string;
  email: string;
  company: string;
  duration: string;
  industry: string;
  timeline: string;
};

export type Requirement = {
  id: number;
  created_at: string;
  answers: RequirementAnswers;
  user_id: string | null;
};