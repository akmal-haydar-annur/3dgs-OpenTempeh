"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Boxes, ExternalLink } from "lucide-react";

// Official @playcanvas/supersplat-viewer dynamically imported with SSR disabled
const SuperSplatViewer = dynamic(
  () => import("@/components/3dgs/SuperSplatViewer").then((mod) => mod.SuperSplatViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[640px] bg-black rounded-xl border border-zinc-800 flex flex-col items-center justify-center p-8 text-center text-zinc-400 font-mono text-xs">
        <Boxes className="w-8 h-8 text-zinc-500 animate-pulse mb-3" />
        <span>Loading official SuperSplat Viewer...</span>
      </div>
    ),
  }
);

export default function ThreeDgsDemoPage() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard"
              className="text-xs font-mono text-zinc-400 hover:text-zinc-700 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
            <span className="p-1 rounded-md bg-zinc-950 text-white">
              <Boxes className="w-4 h-4" />
            </span>
            3DGS SuperSplat Viewer (Official Mode)
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            Asset: <span className="text-zinc-700 font-semibold">/scene.ply</span> | Engine:{" "}
            <span className="text-zinc-700">@playcanvas/supersplat-viewer</span> | Renderer:{" "}
            <span className="text-emerald-600 font-semibold">WebGPU Native</span>
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <a
            href="/viewer/index.html?content=/scene.ply&debug"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-xs"
          >
            <span>Open Standalone Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Official Viewer Frame */}
      <div className="w-full h-[calc(100vh-190px)] min-h-[640px]">
        <SuperSplatViewer src="/scene.ply" debug={true} className="h-full" />
      </div>
    </div>
  );
}
