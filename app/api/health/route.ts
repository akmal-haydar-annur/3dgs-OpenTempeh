import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase/server";
import { hfStorage } from "@/lib/storage/huggingface";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = {
    timestamp: new Date().toISOString(),
    supabase: {
      connected: false,
      authHealthy: false,
      schemaReady: false,
      message: "",
    },
    huggingFace: {
      connected: false,
      repoId: hfStorage.repoId,
      message: "",
    },
    environment: {
      nodeEnv: process.env.NODE_ENV || "development",
      hasHfToken: Boolean(process.env.HF_TOKEN),
      hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      hasSupabaseAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    },
  };

  // 1. Verify Supabase
  try {
    const { data: properties, error } = await serverSupabase
      .from("properties")
      .select("id")
      .limit(1);

    if (error) {
      if (error.code === "PGRST205") {
        status.supabase.connected = true;
        status.supabase.schemaReady = false;
        status.supabase.message = "Connected to Supabase, but tables (schema) are not yet deployed.";
      } else {
        status.supabase.connected = false;
        status.supabase.message = error.message;
      }
    } else {
      status.supabase.connected = true;
      status.supabase.authHealthy = true;
      status.supabase.schemaReady = true;
      status.supabase.message = "Operational with active schema.";
    }
  } catch (e) {
    status.supabase.connected = false;
    status.supabase.message = (e as Error).message;
  }

  // 2. Verify Hugging Face Bucket
  try {
    const hfCheck = await hfStorage.checkConnection();
    if (hfCheck.ok) {
      status.huggingFace.connected = true;
      status.huggingFace.message = `Successfully connected to repository ${hfCheck.repoId}`;
    } else {
      status.huggingFace.connected = false;
      status.huggingFace.message = hfCheck.error || "Connection refused";
    }
  } catch (e) {
    status.huggingFace.connected = false;
    status.huggingFace.message = (e as Error).message;
  }

  const overallOk = status.supabase.connected && status.huggingFace.connected;
  return NextResponse.json(status, { status: overallOk ? 200 : 207 });
}
