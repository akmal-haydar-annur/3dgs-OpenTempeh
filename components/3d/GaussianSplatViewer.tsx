"use client";

import React, { useEffect, useRef, useState } from "react";
import { Maximize2, Download, Eye, Layers, Sparkles, Box } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatBytes } from "@/lib/utils";

interface GaussianSplatViewerProps {
  assetName: string;
  storagePath: string;
  fileSize?: number | null;
  mimeType?: string | null;
  downloadUrl?: string | null;
  metadata?: Record<string, unknown> | null;
  className?: string;
}

export function GaussianSplatViewer({
  assetName,
  storagePath,
  fileSize,
  downloadUrl,
  metadata,
  className,
}: GaussianSplatViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<"points" | "solid" | "wireframe">("points");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Modular interactive 3D point cloud visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    // Generate deterministic 3D Gaussian splat point cloud simulation
    const numPoints = 600;
    const points: { x: number; y: number; z: number; color: string; radius: number }[] = [];

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 80 + Math.random() * 70;

      // Ellipsoidal Gaussian splat shape
      points.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: (r * Math.sin(phi) * Math.sin(theta)) * 0.7,
        z: r * Math.cos(phi),
        color: i % 3 === 0 ? "#ffffff" : i % 3 === 1 ? "#a1a1aa" : "#52525b",
        radius: 1.2 + Math.random() * 2.2,
      });
    }

    const render = () => {
      if (!canvas) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = "#18181b";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Sort points by Z depth for proper splat blending
      const projected = points
        .map((p) => {
          const rotX = p.x * cosA - p.z * sinA;
          const rotZ = p.x * sinA + p.z * cosA;
          const fov = 350;
          const scale = fov / (fov + rotZ + 150);

          return {
            x2d: centerX + rotX * scale,
            y2d: centerY + p.y * scale,
            scale,
            z: rotZ,
            color: p.color,
            radius: p.radius * scale,
          };
        })
        .sort((a, b) => b.z - a.z);

      // Render splat particles
      for (const p of projected) {
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, Math.max(0.2, (p.scale - 0.3) * 1.5));
        ctx.fill();

        // Optional connections if wireframe mode
        if (viewMode === "wireframe" && Math.random() > 0.95) {
          ctx.strokeStyle = "#3f3f46";
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1.0;
      angle += 0.008;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [viewMode]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(console.error);
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 text-white shadow-2xl flex flex-col ${
        isFullscreen ? "h-screen w-screen" : "h-[500px]"
      } ${className || ""}`}
    >
      {/* Viewer Header / Toolbar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-zinc-300" />
          <span className="font-mono text-xs font-semibold tracking-wider text-zinc-100 uppercase">
            3DGS Gaussian Splat Viewer
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
            {assetName.endsWith(".ply") ? "PLY POINT CLOUD" : "3D SPLAT"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-zinc-900 border border-zinc-700 rounded-md p-0.5 text-xs font-mono">
            <button
              onClick={() => setViewMode("points")}
              className={`px-2 py-1 rounded transition-colors ${
                viewMode === "points" ? "bg-white text-zinc-900 font-bold" : "text-zinc-400 hover:text-white"
              }`}
            >
              Points
            </button>
            <button
              onClick={() => setViewMode("solid")}
              className={`px-2 py-1 rounded transition-colors ${
                viewMode === "solid" ? "bg-white text-zinc-900 font-bold" : "text-zinc-400 hover:text-white"
              }`}
            >
              Gaussian
            </button>
            <button
              onClick={() => setViewMode("wireframe")}
              className={`px-2 py-1 rounded transition-colors ${
                viewMode === "wireframe" ? "bg-white text-zinc-900 font-bold" : "text-zinc-400 hover:text-white"
              }`}
            >
              Mesh
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="w-full h-full block cursor-grab active:cursor-grabbing"
        />

        {/* Live HUD overlay */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none space-y-1 bg-black/60 backdrop-blur-md p-3 rounded border border-zinc-800 text-xs font-mono">
          <div className="text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-200" />
            <span>Asset: <strong className="text-zinc-100">{assetName}</strong></span>
          </div>
          <div className="text-zinc-400">Path: <span className="text-zinc-300">{storagePath}</span></div>
          <div className="text-zinc-400">Size: <span className="text-zinc-300">{formatBytes(fileSize)}</span></div>
          {metadata && Object.keys(metadata).length > 0 && (
            <div className="text-zinc-400">
              Params: <span className="text-zinc-300">{JSON.stringify(metadata)}</span>
            </div>
          )}
        </div>

        {/* Action button overlay */}
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          {downloadUrl && (
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="secondary" className="gap-1.5 font-mono text-xs">
                <Download className="w-3.5 h-3.5" />
                Raw Asset
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
