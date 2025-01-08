import { Database } from "@/integrations/supabase/types";

export interface RequirementAnswers {
  "1": string; // type
  "2": string; // industry
  "3": string; // duration
  "4": string; // responsibilities
  "5": string; // experience
  "6": string; // email
  "7": string; // password
}

export type Requirement = Database["public"]["Tables"]["requirements"]["Row"] & {
  answers: RequirementAnswers;
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  requirements: Requirement[];
};