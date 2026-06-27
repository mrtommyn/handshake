export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      agreements: {
        Row: {
          content: string | null
          created_at: string
          deal_id: string
          fields: Json
          id: string
          pdf_path: string | null
          signed_at: string | null
          status: Database["public"]["Enums"]["agreement_status"]
          template: string
          unique_code: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          deal_id: string
          fields?: Json
          id?: string
          pdf_path?: string | null
          signed_at?: string | null
          status?: Database["public"]["Enums"]["agreement_status"]
          template?: string
          unique_code?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          deal_id?: string
          fields?: Json
          id?: string
          pdf_path?: string | null
          signed_at?: string | null
          status?: Database["public"]["Enums"]["agreement_status"]
          template?: string
          unique_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agreements_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          deal_id: string | null
          detail: Json | null
          id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          deal_id?: string | null
          detail?: Json | null
          id?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          deal_id?: string | null
          detail?: Json | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_log_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_parties: {
        Row: {
          created_at: string
          deal_id: string
          email: string | null
          id: string
          invite_token: string | null
          invited_at: string | null
          joined_at: string | null
          name: string | null
          phone: string | null
          profile_id: string | null
          role: Database["public"]["Enums"]["party_role"]
        }
        Insert: {
          created_at?: string
          deal_id: string
          email?: string | null
          id?: string
          invite_token?: string | null
          invited_at?: string | null
          joined_at?: string | null
          name?: string | null
          phone?: string | null
          profile_id?: string | null
          role: Database["public"]["Enums"]["party_role"]
        }
        Update: {
          created_at?: string
          deal_id?: string
          email?: string | null
          id?: string
          invite_token?: string | null
          invited_at?: string | null
          joined_at?: string | null
          name?: string | null
          phone?: string | null
          profile_id?: string | null
          role?: Database["public"]["Enums"]["party_role"]
        }
        Relationships: [
          {
            foreignKeyName: "deal_parties_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_parties_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          amount: number | null
          created_at: string
          creator_id: string
          currency: string | null
          deadline: string | null
          deal_type: string
          description: string | null
          id: string
          meetup_at: string | null
          mode: Database["public"]["Enums"]["deal_mode"]
          notes: string | null
          status: Database["public"]["Enums"]["deal_status"]
          title: string | null
          updated_at: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          creator_id: string
          currency?: string | null
          deadline?: string | null
          deal_type?: string
          description?: string | null
          id?: string
          meetup_at?: string | null
          mode?: Database["public"]["Enums"]["deal_mode"]
          notes?: string | null
          status?: Database["public"]["Enums"]["deal_status"]
          title?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          creator_id?: string
          currency?: string | null
          deadline?: string | null
          deal_type?: string
          description?: string | null
          id?: string
          meetup_at?: string | null
          mode?: Database["public"]["Enums"]["deal_mode"]
          notes?: string | null
          status?: Database["public"]["Enums"]["deal_status"]
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          identity_provider: string | null
          identity_verified: boolean
          identity_verified_at: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          identity_provider?: string | null
          identity_verified?: boolean
          identity_verified_at?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          identity_provider?: string | null
          identity_verified?: boolean
          identity_verified_at?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      signatures: {
        Row: {
          agreement_id: string
          id: string
          ip: string | null
          method: string | null
          party_id: string | null
          signed_at: string
          signer_name: string
        }
        Insert: {
          agreement_id: string
          id?: string
          ip?: string | null
          method?: string | null
          party_id?: string | null
          signed_at?: string
          signer_name: string
        }
        Update: {
          agreement_id?: string
          id?: string
          ip?: string | null
          method?: string | null
          party_id?: string | null
          signed_at?: string
          signer_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "signatures_agreement_id_fkey"
            columns: ["agreement_id"]
            isOneToOne: false
            referencedRelation: "agreements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signatures_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "deal_parties"
            referencedColumns: ["id"]
          },
        ]
      }
      verifications: {
        Row: {
          completed_at: string | null
          created_at: string
          deal_id: string | null
          id: string
          party_id: string | null
          provider: string
          provider_ref: string | null
          result: Json | null
          status: Database["public"]["Enums"]["verification_status"]
          subject_profile_id: string | null
          requester_id: string | null
          subject_name: string | null
          subject_phone: string | null
          subject_email: string | null
          invite_token: string | null
          invited_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          deal_id?: string | null
          id?: string
          party_id?: string | null
          provider?: string
          provider_ref?: string | null
          result?: Json | null
          status?: Database["public"]["Enums"]["verification_status"]
          subject_profile_id?: string | null
          requester_id?: string | null
          subject_name?: string | null
          subject_phone?: string | null
          subject_email?: string | null
          invite_token?: string | null
          invited_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          deal_id?: string | null
          id?: string
          party_id?: string | null
          provider?: string
          provider_ref?: string | null
          result?: Json | null
          status?: Database["public"]["Enums"]["verification_status"]
          subject_profile_id?: string | null
          requester_id?: string | null
          subject_name?: string | null
          subject_phone?: string | null
          subject_email?: string | null
          invite_token?: string | null
          invited_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verifications_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifications_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifications_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "deal_parties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifications_subject_profile_id_fkey"
            columns: ["subject_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      agreement_status: "draft" | "pending_signatures" | "signed" | "void"
      deal_mode: "verify" | "agree" | "both"
      deal_status:
        | "draft"
        | "invited"
        | "active"
        | "completed"
        | "cancelled"
        | "expired"
      party_role: "initiator" | "counterparty"
      verification_status: "pending" | "verified" | "not_confirmed" | "declined"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
