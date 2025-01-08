import { Database } from "@/integrations/supabase/types";

export interface RequirementAnswers {
  "1": string; // Role Type
  "2": string; // Industry
  "3": string; // Duration
  "4": string; // Responsibilities
  "5": string; // Experience
}

export type Requirement = {
  id: number;
  user_id: string | null;
  created_at: string;
  answers: RequirementAnswers;
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  requirements: Requirement[];
};