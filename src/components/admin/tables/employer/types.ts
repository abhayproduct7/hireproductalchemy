import { Database } from "@/integrations/supabase/types";

export interface RequirementAnswers {
  type: string;
  industry: string;
  duration: string;
  experience: string;
  timeline: string;
  responsibilities: string;
}

export type Requirement = Database["public"]["Tables"]["requirements"]["Row"] & {
  answers: RequirementAnswers;
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  requirements: Requirement[];
};