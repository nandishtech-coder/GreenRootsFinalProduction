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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blogs: {
        Row: {
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string
          is_active: boolean
          published_date: string
          slug: string
          sort_order: number
          tag: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          created_at?: string
          excerpt: string
          id?: string
          image_url: string
          is_active?: boolean
          published_date: string
          slug: string
          sort_order?: number
          tag?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string
          is_active?: boolean
          published_date?: string
          slug?: string
          sort_order?: number
          tag?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      category_content: {
        Row: {
          created_at: string
          description: string | null
          gallery: Json | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          gallery?: Json | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          gallery?: Json | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          interested_in: string | null
          message: string
          name: string
          phone: string | null
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          interested_in?: string | null
          message: string
          name: string
          phone?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          interested_in?: string | null
          message?: string
          name?: string
          phone?: string | null
          status?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          id: string
          location: string
          message: string
          name: string
          product_bought: string
          rating: number
        }
        Insert: {
          created_at?: string
          id?: string
          location: string
          message: string
          name: string
          product_bought: string
          rating: number
        }
        Update: {
          created_at?: string
          id?: string
          location?: string
          message?: string
          name?: string
          product_bought?: string
          rating?: number
        }
        Relationships: []
      }
      latest_updates: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          sort_order: number
          text: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          sort_order?: number
          text: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          sort_order?: number
          text?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          badge: string | null
          created_at: string | null
          customer_support: string | null
          description: string | null
          id: string
          image: string
          is_active: boolean | null
          material_type: string | null
          mrp: number
          price: number
          rating: number | null
          reviews: number | null
          tags: string[] | null
          title: string
          updated_at: string | null
          variant_label: string | null
          variants: string[] | null
          weight: string | null
        }
        Insert: {
          badge?: string | null
          created_at?: string | null
          customer_support?: string | null
          description?: string | null
          id?: string
          image: string
          is_active?: boolean | null
          material_type?: string | null
          mrp: number
          price: number
          rating?: number | null
          reviews?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          variant_label?: string | null
          variants?: string[] | null
          weight?: string | null
        }
        Update: {
          badge?: string | null
          created_at?: string | null
          customer_support?: string | null
          description?: string | null
          id?: string
          image?: string
          is_active?: boolean | null
          material_type?: string | null
          mrp?: number
          price?: number
          rating?: number | null
          reviews?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          variant_label?: string | null
          variants?: string[] | null
          weight?: string | null
        }
        Relationships: []
      }
      reels: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          poster: string
          sort_order: number | null
          src: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          poster: string
          sort_order?: number | null
          src: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          poster?: string
          sort_order?: number | null
          src?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          about: string
          created_at: string
          cta_heading: string
          cta_note: string
          description: string
          footnote: string
          icon: string
          id: string
          image_url: string
          includes: string[]
          is_active: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          about?: string
          created_at?: string
          cta_heading?: string
          cta_note?: string
          description?: string
          footnote?: string
          icon?: string
          id?: string
          image_url?: string
          includes?: string[]
          is_active?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          about?: string
          created_at?: string
          cta_heading?: string
          cta_note?: string
          description?: string
          footnote?: string
          icon?: string
          id?: string
          image_url?: string
          includes?: string[]
          is_active?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workforce_pages: {
        Row: {
          about: string | null
          created_at: string
          cta_heading: string | null
          cta_note: string | null
          description: string
          footnote: string | null
          gallery_urls: string | null
          icon: string
          id: string
          image_url: string
          includes: string[] | null
          is_active: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          about?: string | null
          created_at?: string
          cta_heading?: string | null
          cta_note?: string | null
          description: string
          footnote?: string | null
          gallery_urls?: string | null
          icon: string
          id?: string
          image_url: string
          includes?: string[] | null
          is_active?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          about?: string | null
          created_at?: string
          cta_heading?: string | null
          cta_note?: string | null
          description?: string
          footnote?: string | null
          gallery_urls?: string | null
          icon?: string
          id?: string
          image_url?: string
          includes?: string[] | null
          is_active?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "user"],
    },
  },
} as const
