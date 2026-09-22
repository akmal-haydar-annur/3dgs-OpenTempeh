/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function parseEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.substring(0, eqIdx).trim();
      let val = trimmed.substring(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

async function verifySchema() {
  const env = parseEnv();
  console.log('\n========================================');
  console.log('   SUPABASE SCHEMA & RELATION VERIFICATION');
  console.log('========================================\n');

  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Missing Supabase URL or Anon Key in .env');
    return false;
  }

  const baseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const headers = {
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
  };

  const tables = ['properties', 'assets', 'projects'];
  let allExist = true;

  for (const table of tables) {
    try {
      const res = await fetch(`${baseUrl}/rest/v1/${table}?select=*&limit=5`, { headers });
      if (res.ok) {
        const rows = await res.json();
        console.log(`✅ Table '${table}': Accessible (${rows.length} rows found)`);
        if (rows.length > 0) {
          console.log(`   Sample record: ID=${rows[0].id}, Name="${rows[0].name || rows[0].slug}"`);
        }
      } else {
        allExist = false;
        const err = await res.json();
        console.log(`❌ Table '${table}': HTTP ${res.status} - ${err.message || res.statusText}`);
      }
    } catch (e) {
      allExist = false;
      console.log(`❌ Table '${table}': Network error - ${e.message}`);
    }
  }

  // Check Foreign Key relationship query through PostgREST
  console.log('\n--- Checking Relational Joins ---');
  try {
    const res = await fetch(`${baseUrl}/rest/v1/projects?select=*,property:properties(*),input_asset:assets!projects_input_asset_id_fkey(*)&limit=1`, { headers });
    if (res.ok) {
      const joined = await res.json();
      console.log('✅ Relational Join (projects -> property, input_asset): Working!');
      if (joined[0]) {
        console.log(`   Joined Project: "${joined[0].name}" -> Property: "${joined[0].property?.name}"`);
      }
    } else {
      console.log('⚠️ Relational join query status:', res.status);
    }
  } catch (e) {
    console.log('⚠️ Relational join check notice:', e.message);
  }

  console.log('\n========================================');
  return allExist;
}

verifySchema().then(ok => {
  if (!ok) {
    console.log('\n💡 TO APPLY MIGRATION:');
    console.log('Open Supabase SQL Editor: https://supabase.com/dashboard/project/dheqvdjttcwtmddzbvdn/sql/new');
    console.log('Copy & run contents of:');
    console.log('1. supabase/migrations/20260923000001_create_3dgs_platform_schema.sql');
    console.log('2. supabase/seed.sql');
  }
});
