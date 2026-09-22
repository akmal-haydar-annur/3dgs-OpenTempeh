import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Worker API endpoint for Vast.ai GPU Worker to claim, complete, or fail a job.
 * PATCH /api/worker/jobs/[id]
 */
export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  try {
    const body = await request.json();
    const { status, error_message, output_asset } = body;

    // Check existing project
    const { data: project, error: getErr } = await serverSupabase
      .from("projects")
      .select("id, property_id, status")
      .eq("id", id)
      .single();

    if (getErr || !project) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // 1. Worker Claims/Starts Job
    if (status === "processing") {
      const { data: updated, error } = await serverSupabase
        .from("projects")
        .update({
          status: "processing",
          started_at: new Date().toISOString(),
          error_message: null,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        message: "Job claimed and marked as processing.",
        job: updated,
      });
    }

    // 2. Worker Reports Failure
    if (status === "failed") {
      const { data: updated, error } = await serverSupabase
        .from("projects")
        .update({
          status: "failed",
          error_message: error_message || "Inference failed on GPU worker.",
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        message: "Job marked as failed.",
        job: updated,
      });
    }

    // 3. Worker Completes Job with Output 3D Asset
    if (status === "completed") {
      let outputAssetId: string | null = null;

      if (output_asset) {
        // Create the 3D output asset record in Supabase
        const { data: newAsset, error: assetErr } = await serverSupabase
          .from("assets")
          .insert({
            property_id: project.property_id,
            project_id: project.id,
            name: output_asset.name || "Reconstruction Output",
            type: output_asset.type || "splat",
            storage_provider: output_asset.storage_provider || "huggingface",
            storage_path: output_asset.storage_path,
            mime_type: output_asset.mime_type || "application/octet-stream",
            file_size: output_asset.file_size,
            metadata: output_asset.metadata || {},
          })
          .select("id")
          .single();

        if (assetErr) {
          console.error("Failed to insert output asset:", assetErr.message);
        } else if (newAsset) {
          outputAssetId = newAsset.id;
        }
      }

      const { data: updated, error } = await serverSupabase
        .from("projects")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
          output_asset_id: outputAssetId,
          error_message: null,
        })
        .eq("id", id)
        .select(`
          *,
          output_asset:assets!projects_output_asset_id_fkey (*)
        `)
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        message: "Job completed successfully with output asset attached.",
        job: updated,
      });
    }

    return NextResponse.json(
      { error: "Invalid status transition. Allowed values: 'processing', 'completed', 'failed'." },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
