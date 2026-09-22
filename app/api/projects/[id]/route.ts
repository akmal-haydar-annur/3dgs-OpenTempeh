import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  try {
    const { data: project, error } = await serverSupabase
      .from("projects")
      .select(`
        *,
        property:properties (*),
        input_asset:assets!projects_input_asset_id_fkey (*),
        output_asset:assets!projects_output_asset_id_fkey (*)
      `)
      .eq("id", id)
      .single();

    if (error || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  try {
    const body = await request.json();
    const { status, error_message, action } = body;

    const updates: Record<string, unknown> = {};

    // Allow manual retry
    if (action === "retry") {
      updates.status = "queued";
      updates.error_message = null;
      updates.started_at = null;
      updates.completed_at = null;
    } else if (status) {
      updates.status = status;
      if (status === "processing" && !updates.started_at) {
        updates.started_at = new Date().toISOString();
      } else if (status === "completed") {
        updates.completed_at = new Date().toISOString();
      } else if (status === "failed") {
        updates.error_message = error_message || "Process terminated unexpectedly.";
      }
    }

    const { data, error } = await serverSupabase
      .from("projects")
      .update(updates)
      .eq("id", id)
      .select(`
        *,
        property:properties (*),
        input_asset:assets!projects_input_asset_id_fkey (*),
        output_asset:assets!projects_output_asset_id_fkey (*)
      `)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ project: data });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
