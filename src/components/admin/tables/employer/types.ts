import { Database } from "@/integrations/supabase/types";

export interface RequirementAnswers {
  type: string;
  email: string;
  company: string;
  duration: string;
  industry: string;
  timeline: string;
  responsibilities: string;
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