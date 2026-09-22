import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  try {
    const { data: property, error } = await serverSupabase
      .from("properties")
      .select(`
        *,
        assets (*),
        projects (
          id, name, status, created_at, completed_at,
          input_asset:assets!projects_input_asset_id_fkey(*),
          output_asset:assets!projects_output_asset_id_fkey(*)
        )
      `)
      .eq("id", id)
      .single();

    if (error || !property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ property });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
