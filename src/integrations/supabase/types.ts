export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      candidate_applications: {
        Row: {
          availability_type: Database["public"]["Enums"]["availability_type"]
          created_at: string | null
          cv_url: string | null
          earliest_start_date: string | null
          id: string
          preferred_schedule: Json | null
          professional_summary: string
          profile_image_url: string | null
          updated_at: string | null
          user_id: string
          years_experience: number
        }
        Insert: {
          availability_type: Database["public"]["Enums"]["availability_type"]
          created_at?: string | null
          cv_url?: string | null
          earliest_start_date?: string | null
          id?: string
          preferred_schedule?: Json | null
          professional_summary: string
          profile_image_url?: string | null
          updated_at?: string | null
          user_id: string
          years_experience: number
        }
        Update: {
          availability_type?: Database["public"]["Enums"]["availability_type"]
          created_at?: string | null
          cv_url?: string | null
          earliest_start_date?: string | null
          id?: string
          preferred_schedule?: Json | null
          professional_summary?: string
          profile_image_url?: string | null
          updated_at?: string | null
          user_id?: string
          years_experience?: number
        }
        Relationships: []
      }
      candidate_skills: {
        Row: {
          application_id: string
          skill_id: string
        }
        Insert: {
          application_id: string
          skill_id: string
        }
        Update: {
          application_id?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_skills_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "candidate_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      case_studies: {
        Row: {
          application_id: string | null
          attachments: Json | null
          created_at: string | null
          description: string
          id: string
          outcome: string
          title: string
        }
        Insert: {
          application_id?: string | null
          attachments?: Json | null
          created_at?: string | null
          description: string
          id?: string
          outcome: string
          title: string
        }
        Update: {
          application_id?: string | null
          attachments?: Json | null
          created_at?: string | null
          description?: string
          id?: string
          outcome?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_studies_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "candidate_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      producthire: {
        Row: {
          "company name": string | null
          created_at: string
          email: string | null
          id: number
          name: string | null
        }
        Insert: {
          "company name"?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          "company name"?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      requirements: {
        Row: {
          answers: Json
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          answers: Json
          created_at?: string
          id?: never
          user_id?: string | null
        }
        Update: {
          answers?: Json
          created_at?: string
          id?: never
          user_id?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      work_experiences: {
        Row: {
          application_id: string | null
          company_name: string
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          industry: string
          role_title: string
          start_date: string
        }
        Insert: {
          application_id?: string | null
          company_name: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          industry: string
          role_title: string
          start_date: string
        }
        Update: {
          application_id?: string | null
          company_name?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          industry?: string
          role_title?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_experiences_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "candidate_applications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      availability_type: "full_time" | "part_time" | "fractional"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
