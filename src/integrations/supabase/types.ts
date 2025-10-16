export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      available_time_slots: {
        Row: {
          created_at: string | null
          date: string
          end_time: string
          id: string
          is_available: boolean | null
          session_format: Database["public"]["Enums"]["session_format"]
          start_time: string
        }
        Insert: {
          created_at?: string | null
          date: string
          end_time: string
          id?: string
          is_available?: boolean | null
          session_format: Database["public"]["Enums"]["session_format"]
          start_time: string
        }
        Update: {
          created_at?: string | null
          date?: string
          end_time?: string
          id?: string
          is_available?: boolean | null
          session_format?: Database["public"]["Enums"]["session_format"]
          start_time?: string
        }
        Relationships: []
      }
      bush_buddies_bookings: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          notes: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          phone_number: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          total_price_kes: number | null
          total_price_usd: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          phone_number?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price_kes?: number | null
          total_price_usd?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          phone_number?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price_kes?: number | null
          total_price_usd?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bush_buddies_bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "bush_buddies_events"
            referencedColumns: ["id"]
          },
        ]
      }
      bush_buddies_events: {
        Row: {
          created_at: string | null
          current_participants: number | null
          date: string
          description: string | null
          end_time: string
          id: string
          is_active: boolean | null
          location: string | null
          max_participants: number | null
          poster_url: string | null
          price_kes: number | null
          price_usd: number | null
          start_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_participants?: number | null
          date: string
          description?: string | null
          end_time: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          max_participants?: number | null
          poster_url?: string | null
          price_kes?: number | null
          price_usd?: number | null
          start_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_participants?: number | null
          date?: string
          description?: string | null
          end_time?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          max_participants?: number | null
          poster_url?: string | null
          price_kes?: number | null
          price_usd?: number | null
          start_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      psychometric_assessments: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          questions: Json
          result_fee_kes: number | null
          result_fee_usd: number | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          questions: Json
          result_fee_kes?: number | null
          result_fee_usd?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          questions?: Json
          result_fee_kes?: number | null
          result_fee_usd?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      therapy_bookings: {
        Row: {
          booking_date: string
          booking_time: string
          created_at: string | null
          discount_applied: boolean | null
          discount_percentage: number | null
          id: string
          is_first_session: boolean | null
          meeting_link: string | null
          notes: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          phone_number: string | null
          service_id: string | null
          session_format: Database["public"]["Enums"]["session_format"]
          sessions_count: number | null
          status: Database["public"]["Enums"]["booking_status"] | null
          total_price_kes: number | null
          total_price_usd: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          booking_date: string
          booking_time: string
          created_at?: string | null
          discount_applied?: boolean | null
          discount_percentage?: number | null
          id?: string
          is_first_session?: boolean | null
          meeting_link?: string | null
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          phone_number?: string | null
          service_id?: string | null
          session_format: Database["public"]["Enums"]["session_format"]
          sessions_count?: number | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price_kes?: number | null
          total_price_usd?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          booking_date?: string
          booking_time?: string
          created_at?: string | null
          discount_applied?: boolean | null
          discount_percentage?: number | null
          id?: string
          is_first_session?: boolean | null
          meeting_link?: string | null
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          phone_number?: string | null
          service_id?: string | null
          session_format?: Database["public"]["Enums"]["session_format"]
          sessions_count?: number | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price_kes?: number | null
          total_price_usd?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "therapy_bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "therapy_services"
            referencedColumns: ["id"]
          },
        ]
      }
      therapy_services: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_active: boolean | null
          name: string
          online_price_kes: number | null
          online_price_usd: number | null
          physical_price_kes: number | null
          physical_price_usd: number | null
          type: Database["public"]["Enums"]["therapy_service_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          online_price_kes?: number | null
          online_price_usd?: number | null
          physical_price_kes?: number | null
          physical_price_usd?: number | null
          type: Database["public"]["Enums"]["therapy_service_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          online_price_kes?: number | null
          online_price_usd?: number | null
          physical_price_kes?: number | null
          physical_price_usd?: number | null
          type?: Database["public"]["Enums"]["therapy_service_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      user_assessment_results: {
        Row: {
          access_token: string | null
          admin_verified: boolean | null
          answers: Json
          assessment_id: string | null
          completed_at: string | null
          email: string | null
          id: string
          mobile_number: string | null
          payment_claimed_at: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          result_unlocked: boolean | null
          user_id: string | null
        }
        Insert: {
          access_token?: string | null
          admin_verified?: boolean | null
          answers: Json
          assessment_id?: string | null
          completed_at?: string | null
          email?: string | null
          id?: string
          mobile_number?: string | null
          payment_claimed_at?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          result_unlocked?: boolean | null
          user_id?: string | null
        }
        Update: {
          access_token?: string | null
          admin_verified?: boolean | null
          answers?: Json
          assessment_id?: string | null
          completed_at?: string | null
          email?: string | null
          id?: string
          mobile_number?: string | null
          payment_claimed_at?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          result_unlocked?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_assessment_results_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "psychometric_assessments"
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
      booking_status: "pending" | "confirmed" | "completed" | "cancelled"
      payment_status: "pending" | "paid" | "refunded"
      session_format: "online" | "physical"
      therapy_service_type:
        | "individual_adult"
        | "adolescent"
        | "couples"
        | "group"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: ["pending", "confirmed", "completed", "cancelled"],
      payment_status: ["pending", "paid", "refunded"],
      session_format: ["online", "physical"],
      therapy_service_type: [
        "individual_adult",
        "adolescent",
        "couples",
        "group",
      ],
    },
  },
} as const
