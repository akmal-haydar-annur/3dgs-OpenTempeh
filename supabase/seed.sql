-- 3DGS Platform Seed Data
-- Seed data referencing verified Hugging Face bucket objects (Church.mp4, Meetingroom.mp4)

-- 1. Insert Properties
INSERT INTO properties (id, name, slug, location, address, price, price_display, description, thumbnail_url)
VALUES 
(
    'a0000000-0000-0000-0000-000000000001',
    'Gedung Heritage Gereja Blenduk',
    'gedung-heritage-gereja-blenduk',
    'Kota Lama, Semarang',
    'Jl. Letjen Suprapto No.32, Tj. Mas, Semarang Utara',
    25000000,
    'Rp 25.000.000 / event',
    'Bangunan cagar budaya bersejarah dengan kubah oktagonal ikonik. Digunakan sebagai dataset benchmark visualisasi 3DGS arsitektur berskala besar.',
    'https://images.unsplash.com/photo-1548625361-195fe2062fa9?auto=format&fit=crop&w=800&q=80'
),
(
    'a0000000-0000-0000-0000-000000000002',
    'Co-working & Meeting Suite Tembalang',
    'coworking-meeting-suite-tembalang',
    'Tembalang, Semarang',
    'Jl. Prof. Sudarto No.12, Tembalang, Semarang',
    3500000,
    'Rp 3.500.000 / bulan',
    'Ruang indoor modern untuk kos eksekutif dan meeting room dengan interior kayu, meja konferensi, dan pencahayaan studio terintegrasi.',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description;

-- 2. Insert Real Video Assets from Hugging Face Bucket
INSERT INTO assets (id, property_id, name, type, storage_provider, storage_path, mime_type, file_size, metadata)
VALUES
(
    'b0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'Church.mp4',
    'video',
    'huggingface',
    'Church.mp4',
    'video/mp4',
    7607621900,
    '{"fps": 30, "resolution": "4K", "hf_repo": "datasets/Zaki-oracemeng/3dgs-test"}'::jsonb
),
(
    'b0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000002',
    'Meetingroom.mp4',
    'video',
    'huggingface',
    'Meetingroom.mp4',
    'video/mp4',
    4271432079,
    '{"fps": 30, "resolution": "1080p", "hf_repo": "datasets/Zaki-oracemeng/3dgs-test"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    storage_path = EXCLUDED.storage_path;

-- 3. Insert Demo Output 3D Asset
INSERT INTO assets (id, property_id, name, type, storage_provider, storage_path, mime_type, file_size, metadata)
VALUES
(
    'b0000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000001',
    'church_point_cloud.splat',
    'splat',
    'huggingface',
    'properties/a0000000-0000-0000-0000-000000000001/output/church_point_cloud.splat',
    'application/octet-stream',
    52428800,
    '{"splat_count": 850000, "format": "splat"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name;

-- 4. Insert Initial Projects (1 completed demo, 1 queued ready for GPU worker)
INSERT INTO projects (id, property_id, input_asset_id, output_asset_id, name, status, created_at, started_at, completed_at, params)
VALUES
(
    'c0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000003',
    '3DGS Reconstruction - Church Benchmark',
    'completed',
    now() - interval '2 hours',
    now() - interval '1 hour 50 minutes',
    now() - interval '1 hour 20 minutes',
    '{"iterations": 30000, "resolution": "1080p", "densify_grad_thresh": 0.0002}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Link back project_id in output asset
UPDATE assets 
SET project_id = 'c0000000-0000-0000-0000-000000000001' 
WHERE id = 'b0000000-0000-0000-0000-000000000003';
