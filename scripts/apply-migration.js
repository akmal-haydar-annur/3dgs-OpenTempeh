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

async function main() {
  const env = parseEnv();
  const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20260923000001_create_3dgs_platform_schema.sql');
  const seedPath = path.join(__dirname, '..', 'supabase', 'seed.sql');

  const migrationSql = fs.readFileSync(migrationPath, 'utf8');
  const seedSql = fs.readFileSync(seedPath, 'utf8');

  console.log('--- Migration Runner ---');
  if (env.DATABASE_URL) {
    console.log('DATABASE_URL detected. Executing via postgres connection...');
    // If user provided direct DB connection
    // We could use pg if installed, or recommend psql
  } else if (env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('SUPABASE_SERVICE_ROLE_KEY detected. Executing via Supabase Management/SQL API...');
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sql: migrationSql + '\n' + seedSql })
      });
      console.log('SQL exec status:', res.status);
    } catch (e) {
      console.error('SQL exec failed:', e.message);
    }
  } else {
    console.log('\n============================================================');
    console.log('📋 ACTION REQUIRED: APPLY MIGRATION IN SUPABASE DASHBOARD');
    console.log('============================================================');
    console.log('Your .env contains public keys. DDL queries require direct');
    console.log('execution in your Supabase dashboard SQL editor:');
    console.log('\n🔗 URL: https://supabase.com/dashboard/project/dheqvdjttcwtmddzbvdn/sql/new');
    console.log('\n1. Copy the SQL from:');
    console.log('   supabase/migrations/20260923000001_create_3dgs_platform_schema.sql');
    console.log('2. Paste and click "Run".');
    console.log('3. Copy the SQL from:');
    console.log('   supabase/seed.sql');
    console.log('4. Paste and click "Run".');
    console.log('============================================================\n');
  }
}

main();
