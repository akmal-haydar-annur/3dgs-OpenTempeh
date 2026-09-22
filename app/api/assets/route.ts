import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("property_id");
    const type = searchParams.get("type");

    let query = serverSupabase
      .from("assets")
      .select(`
        *,
        property:properties (id, name, location)
      `)
      .order("created_at", { ascending: false });

    if (propertyId) {
      query = query.eq("property_id", propertyId);
    }
    if (type) {
      query = query.eq("type", type);
    }

    const { data: assets, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ assets });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { property_id, project_id, name, type, storage_provider, storage_path, mime_type, file_size, metadata } = body;

    if (!property_id || !name || !type || !storage_path) {
      return NextResponse.json(
        { error: "Fields 'property_id', 'name', 'type', and 'storage_path' are required." },
        { status: 400 }
      );
    }

    const { data, error } = await serverSupabase
      .from("assets")
      .insert({
        property_id,
        project_id,
        name,
        type,
        storage_provider: storage_provider || "huggingface",
        storage_path,
        mime_type,
        file_size,
        metadata: metadata || {},
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ asset: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
