import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase/server";
import { hfStorage } from "@/lib/storage/huggingface";

export const dynamic = "force-dynamic";

/**
 * Worker API endpoint for Vast.ai GPU Worker to fetch pending tasks.
 * GET /api/worker/jobs
 */
export async function GET() {
  try {
    // 1. Find oldest queued job
    const { data: job, error } = await serverSupabase
      .from("projects")
      .select(`
        id,
        name,
        status,
        property_id,
        params,
        created_at,
        property:properties (id, name, location),
        input_asset:assets!projects_input_asset_id_fkey (*)
      `)
      .eq("status", "queued")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!job) {
      return NextResponse.json({ job: null, message: "No queued 3DGS jobs available." });
    }

    // Resolve streaming/direct URL for worker to download input video
    let inputDownloadUrl: string | null = null;
    const inputAsset = job.input_asset as { storage_provider?: string; storage_path?: string } | null;
    if (inputAsset && inputAsset.storage_provider === "huggingface" && inputAsset.storage_path) {
      try {
        inputDownloadUrl = await hfStorage.getDownloadUrl(inputAsset.storage_path);
      } catch (e) {
        console.warn("Could not resolve worker download url:", (e as Error).message);
      }
    }

    return NextResponse.json({
      job: {
        id: job.id,
        name: job.name,
        status: job.status,
        property_id: job.property_id,
        property_name: (job.property as { name?: string })?.name,
        params: job.params,
        created_at: job.created_at,
        input_asset: {
          ...((job.input_asset as unknown as Record<string, unknown>) || {}),
          download_url: inputDownloadUrl,
        },
      },
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
