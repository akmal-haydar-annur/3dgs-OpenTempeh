import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const propertyId = searchParams.get("property_id");

    let query = serverSupabase
      .from("projects")
      .select(`
        *,
        property:properties (id, name, location, thumbnail_url),
        input_asset:assets!projects_input_asset_id_fkey (id, name, type, file_size, storage_path),
        output_asset:assets!projects_output_asset_id_fkey (id, name, type, file_size, storage_path)
      `)
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }
    if (propertyId) {
      query = query.eq("property_id", propertyId);
    }

    const { data: projects, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ projects });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { propertyId, inputAssetId, name, params } = body;

    if (!propertyId || !inputAssetId) {
      return NextResponse.json(
        { error: "Both 'propertyId' and 'inputAssetId' are required." },
        { status: 400 }
      );
    }

    // 1. Validate property exists
    const { data: property, error: propErr } = await serverSupabase
      .from("properties")
      .select("id, name")
      .eq("id", propertyId)
      .single();

    if (propErr || !property) {
      return NextResponse.json(
        { error: "Validation failed: Specified property does not exist." },
        { status: 404 }
      );
    }

    // 2. Validate asset exists, belongs to property, and is a video
    const { data: asset, error: assetErr } = await serverSupabase
      .from("assets")
      .select("id, property_id, type, name")
      .eq("id", inputAssetId)
      .single();

    if (assetErr || !asset) {
      return NextResponse.json(
        { error: "Validation failed: Specified input asset does not exist." },
        { status: 404 }
      );
    }

    if (asset.property_id !== propertyId) {
      return NextResponse.json(
        { error: "Validation failed: Input asset does not belong to the specified property." },
        { status: 400 }
      );
    }

    if (asset.type !== "video") {
      return NextResponse.json(
        { error: `Validation failed: Asset must be of type 'video', found '${asset.type}'.` },
        { status: 400 }
      );
    }

    // 3. Create project with status = 'queued'
    const projectName = name || `3DGS Reconstruction - ${property.name} (${asset.name})`;

    const { data: newProject, error: createErr } = await serverSupabase
      .from("projects")
      .insert({
        property_id: propertyId,
        input_asset_id: inputAssetId,
        name: projectName,
        status: "queued",
        params: params || { iterations: 30000, resolution: "1080p" },
      })
      .select()
      .single();

    if (createErr || !newProject) {
      return NextResponse.json(
        { error: `Failed to create project: ${createErr?.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        id: newProject.id,
        status: newProject.status,
        project: newProject,
        message: "Job successfully queued for GPU worker.",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
