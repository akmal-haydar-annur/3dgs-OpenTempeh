-- 3DGS Platform Schema Migration
-- Compatible with Supabase PostgreSQL

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean up existing if needed
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS assets CASCADE;
DROP TABLE IF EXISTS properties CASCADE;

-- 1. Table: properties
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    location TEXT NOT NULL,
    address TEXT,
    price NUMERIC,
    price_display TEXT,
    description TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Table: assets
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    project_id UUID,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('video', 'thumbnail', 'ply', 'splat', 'result')),
    storage_provider TEXT NOT NULL DEFAULT 'huggingface',
    storage_path TEXT NOT NULL,
    mime_type TEXT,
    file_size BIGINT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Table: projects (3DGS Inference Jobs)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    input_asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE RESTRICT,
    output_asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
    error_message TEXT,
    params JSONB DEFAULT '{"iterations": 30000, "resolution": "1080p"}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Link circular foreign key from assets to projects safely
ALTER TABLE assets 
    ADD CONSTRAINT fk_assets_project 
    FOREIGN KEY (project_id) 
    REFERENCES projects(id) 
    ON DELETE SET NULL;

-- Indexes for fast querying
CREATE INDEX idx_properties_slug ON properties(slug);
CREATE INDEX idx_assets_property_id ON assets(property_id);
CREATE INDEX idx_assets_type ON assets(type);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_property_id ON projects(property_id);

-- Auto-update updated_at timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trg_properties_updated_at 
    BEFORE UPDATE ON properties 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_assets_updated_at 
    BEFORE UPDATE ON assets 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Operator / Demo access policies (public & anon)
CREATE POLICY "Public read properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Public insert properties" ON properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update properties" ON properties FOR UPDATE USING (true);

CREATE POLICY "Public read assets" ON assets FOR SELECT USING (true);
CREATE POLICY "Public insert assets" ON assets FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update assets" ON assets FOR UPDATE USING (true);

CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public insert projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update projects" ON projects FOR UPDATE USING (true);
