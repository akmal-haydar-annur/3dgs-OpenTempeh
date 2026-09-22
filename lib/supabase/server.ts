import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 * Uses anon key for public endpoints, or service role key if available in env.
 */
export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase URL or Key in server environment.");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createClient<any>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
};

export const serverSupabase = createServerClient();
