import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data: properties, error } = await serverSupabase
      .from("properties")
      .select(`
        *,
        assets (id, name, type, file_size, storage_path),
        projects (id, status, created_at)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
    }

    return NextResponse.json({ properties });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, location, address, price, price_display, description, thumbnail_url } = body;

    if (!name || !slug || !location) {
      return NextResponse.json(
        { error: "Fields 'name', 'slug', and 'location' are required." },
        { status: 400 }
      );
    }

    const { data, error } = await serverSupabase
      .from("properties")
      .insert({
        name,
        slug,
        location,
        address,
        price,
        price_display,
        description,
        thumbnail_url,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ property: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
