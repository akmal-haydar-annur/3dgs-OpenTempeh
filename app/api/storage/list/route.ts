import { NextResponse } from "next/server";
import { hfStorage } from "@/lib/storage/huggingface";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get("prefix") || undefined;

    const objects = await hfStorage.listObjects(prefix);
    return NextResponse.json({
      repo: hfStorage.repoId,
      objects,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
