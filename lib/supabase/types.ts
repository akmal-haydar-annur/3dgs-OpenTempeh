export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AssetType = "video" | "thumbnail" | "ply" | "splat" | "result";
export type ProjectStatus = "queued" | "processing" | "completed" | "failed";

export interface Property {
  id: string;
  name: string;
  slug: string;
  location: string;
  address: string | null;
  price: number | null;
  price_display: string | null;
  description: string | null;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
  // Relations
  assets?: Asset[];
  projects?: Project[];
}

export interface Asset {
  id: string;
  property_id: string;
  project_id: string | null;
  name: string;
  type: AssetType;
  storage_provider: string;
  storage_path: string;
  mime_type: string | null;
  file_size: number | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  // Relations
  property?: Property;
  project?: Project;
}

export interface Project {
  id: string;
  property_id: string;
  input_asset_id: string;
  output_asset_id: string | null;
  name: string;
  status: ProjectStatus;
  error_message: string | null;
  params: Record<string, unknown> | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  updated_at: string;
  // Relations
  property?: Property;
  input_asset?: Asset;
  output_asset?: Asset;
}

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: Property;
        Insert: {
          id?: string;
          name: string;
          slug: string;
          location: string;
          address?: string | null;
          price?: number | null;
          price_display?: string | null;
          description?: string | null;
          thumbnail_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<{
          id?: string;
          name?: string;
          slug?: string;
          location?: string;
          address?: string | null;
          price?: number | null;
          price_display?: string | null;
          description?: string | null;
          thumbnail_url?: string | null;
          created_at?: string;
          updated_at?: string;
        }>;
        Relationships: [];
      };
      assets: {
        Row: Asset;
        Insert: {
          id?: string;
          property_id: string;
          project_id?: string | null;
          name: string;
          type: AssetType;
          storage_provider?: string;
          storage_path: string;
          mime_type?: string | null;
          file_size?: number | null;
          metadata?: Record<string, unknown> | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<{
          id?: string;
          property_id?: string;
          project_id?: string | null;
          name?: string;
          type?: AssetType;
          storage_provider?: string;
          storage_path?: string;
          mime_type?: string | null;
          file_size?: number | null;
          metadata?: Record<string, unknown> | null;
          created_at?: string;
          updated_at?: string;
        }>;
        Relationships: [];
      };
      projects: {
        Row: Project;
        Insert: {
          id?: string;
          property_id: string;
          input_asset_id: string;
          output_asset_id?: string | null;
          name: string;
          status?: ProjectStatus;
          error_message?: string | null;
          params?: Record<string, unknown> | null;
          created_at?: string;
          started_at?: string | null;
          completed_at?: string | null;
          updated_at?: string;
        };
        Update: Partial<{
          id?: string;
          property_id?: string;
          input_asset_id?: string;
          output_asset_id?: string | null;
          name?: string;
          status?: ProjectStatus;
          error_message?: string | null;
          params?: Record<string, unknown> | null;
          created_at?: string;
          started_at?: string | null;
          completed_at?: string | null;
          updated_at?: string;
        }>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
