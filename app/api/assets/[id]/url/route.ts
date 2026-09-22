import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase/server";
import { hfStorage } from "@/lib/storage/huggingface";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  try {
    const { data: asset, error } = await serverSupabase
      .from("assets")
      .select("id, name, storage_provider, storage_path, mime_type, file_size")
      .eq("id", id)
      .single();

    if (error || !asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    if (asset.storage_provider === "huggingface") {
      try {
        const directUrl = await hfStorage.getDownloadUrl(asset.storage_path);
        return NextResponse.json({
          id: asset.id,
          name: asset.name,
          url: directUrl,
          storage_provider: "huggingface",
          storage_path: asset.storage_path,
        });
      } catch (storageErr) {
        return NextResponse.json(
          { error: `Storage resolution error: ${(storageErr as Error).message}` },
          { status: 502 }
        );
      }
    }

    return NextResponse.json(
      { error: `Unsupported storage provider: ${asset.storage_provider}` },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
