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

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  company_name: string | null;
  created_at: string | null;
  location: string | null;
  phone: string | null;
  requirements?: Requirement[];
};