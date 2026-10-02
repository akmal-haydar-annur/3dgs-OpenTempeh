-- Run this in Supabase SQL Editor to grant table permissions to the anon role:
GRANT ALL ON TABLE properties TO anon, authenticated, service_role;
GRANT ALL ON TABLE assets TO anon, authenticated, service_role;
GRANT ALL ON TABLE projects TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
