"use client";

import React from "react";

interface SuperSplatViewerProps {
  src?: string;
  className?: string;
  debug?: boolean;
}

/**
 * Official @playcanvas/supersplat-viewer embed component.
 * Renders raw Gaussian Splatting (.ply) assets using PlayCanvas WebGPU engine.
 */
export function SuperSplatViewer({
  src = "/scene.ply",
  className = "",
  debug = true,
}: SuperSplatViewerProps) {
  const viewerUrl = `/viewer/index.html?content=${encodeURIComponent(src)}${debug ? "&debug" : ""}`;

  return (
    <div
      className={`relative w-full h-full min-h-[640px] bg-black rounded-xl overflow-hidden border border-zinc-800 shadow-2xl ${className}`}
    >
      <iframe
        src={viewerUrl}
        title="Official PlayCanvas SuperSplat Viewer"
        className="w-full h-full border-0 absolute inset-0 block"
        allow="accelerometer; camera; encrypted-media; gyroscope; xr-spatial-tracking; fullscreen"
      />
    </div>
  );
}

export default SuperSplatViewer;
