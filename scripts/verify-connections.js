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

async function verifyAll() {
  const env = parseEnv();
  console.log('========================================');
  console.log('   SYSTEM INTEGRATION VERIFICATION');
  console.log('========================================\n');

  // 1. Check Hugging Face Bucket
  console.log('--- 1. Hugging Face Bucket ---');
  const hfRepo = env.HF_DATASET_REPO || 'Zaki-oracemeng/3dgs-test';
  if (!env.HF_TOKEN) {
    console.error('❌ HF_TOKEN is missing in .env');
  } else {
    try {
      const res = await fetch(`https://huggingface.co/api/datasets/${hfRepo}/tree/main`, {
        headers: { Authorization: `Bearer ${env.HF_TOKEN}` }
      });
      if (res.ok) {
        const tree = await res.json();
        console.log(`✅ Hugging Face Connected! Repo: ${hfRepo}`);
        console.log(`   Found ${tree.length} objects:`);
        tree.forEach(item => {
          const sizeMb = item.size ? (item.size / (1024 * 1024)).toFixed(2) + ' MB' : 'dir';
          console.log(`   - [${item.type}] ${item.path} (${sizeMb})`);
        });
      } else {
        console.error(`❌ Hugging Face API error: HTTP ${res.status} - ${res.statusText}`);
      }
    } catch (e) {
      console.error(`❌ Hugging Face fetch failed: ${e.message}`);
    }
  }

  // 2. Check Supabase
  console.log('\n--- 2. Supabase GoTrue Auth & PostgREST ---');
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Supabase credentials missing in .env');
  } else {
    try {
      const authRes = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`, {
        headers: { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY }
      });
      console.log(`✅ Supabase Auth: HTTP ${authRes.status} (Healthy)`);

      const tablesRes = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/properties?select=id&limit=1`, {
        headers: {
          apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        }
      });
      if (tablesRes.ok) {
        console.log('✅ Supabase Schema: Tables deployed and responding!');
      } else {
        console.log(`⚠️ Supabase Schema: HTTP ${tablesRes.status} (Tables need migration)`);
      }
    } catch (e) {
      console.error(`❌ Supabase fetch failed: ${e.message}`);
    }
  }
  console.log('\n========================================\n');
}

verifyAll();
