"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  FileVideo,
  Box,
  HardDrive,
  Building2,
  Layers,
  ArrowLeft,
  Download,
  Calendar,
  FileCode,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/StatusBadge";
import { LoadingSpinner } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { GaussianSplatViewer } from "@/components/3d/GaussianSplatViewer";
import { formatBytes, formatDate } from "@/lib/utils";
import type { Asset } from "@/lib/supabase/types";

export default function AssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [asset, setAsset] = useState<Asset | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [urlLoading, setUrlLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchAsset = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/assets/${id}`);
      if (!res.ok) throw new Error("Asset not found");
      const data = await res.json();
      setAsset(data.asset);

      // Fetch streaming / download URL
      setUrlLoading(true);
      const urlRes = await fetch(`/api/assets/${id}/url`);
      if (urlRes.ok) {
        const urlData = await urlRes.json();
        setDownloadUrl(urlData.url);
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setLoading(false);
      setUrlLoading(false);
    }
  };

  useEffect(() => {
    fetchAsset();
  }, [id]);

  if (loading) {
    return <LoadingSpinner text="Loading asset metadata..." />;
  }

  if (!asset) {
    return (
      <EmptyState
        title="Asset Not Found"
        description="The requested asset record does not exist in Supabase metadata."
        action={
          <Link href="/assets">
            <Button size="sm">Back to Assets</Button>
          </Link>
        }
      />
    );
  }

  const is3DOutput = ["splat", "ply", "result"].includes(asset.type);
  const isVideo = asset.type === "video";

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Back button & Header */}
      <div>
        <Link
          href="/assets"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Asset Inventory
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950 font-mono">
                {asset.name}
              </h2>
              <Badge variant="outline" className="uppercase text-xs font-mono">
                {asset.type}
              </Badge>
            </div>
            <p className="text-xs font-mono text-zinc-500 mt-1">
              Path: {asset.storage_path}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {downloadUrl && (
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="secondary" className="gap-2 text-xs font-mono">
                  <Download className="w-3.5 h-3.5" /> Download Stream
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded bg-red-50 border border-red-200 text-red-800 text-xs font-mono">
          {errorMsg}
        </div>
      )}

      {/* Preview Section */}
      {is3DOutput && (
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
            3D Gaussian Splat Interactive Preview
          </div>
          <GaussianSplatViewer
            assetName={asset.name}
            storagePath={asset.storage_path}
            fileSize={asset.file_size}
            mimeType={asset.mime_type}
            downloadUrl={downloadUrl}
            metadata={asset.metadata}
          />
        </div>
      )}

      {isVideo && (
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
            Dataset Video Preview
          </div>
          <Card className="overflow-hidden bg-black text-white">
            {downloadUrl ? (
              <video
                controls
                className="w-full max-h-[460px] mx-auto bg-black"
                src={downloadUrl}
              >
                Your browser does not support HTML5 video preview.
              </video>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center p-6 text-zinc-400 font-mono text-xs gap-2">
                <FileVideo className="w-8 h-8 text-zinc-500" />
                <span>Generating secure Hugging Face streaming URL...</span>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Metadata Specification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-sm font-mono flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-zinc-800" />
              STORAGE & OBJECT ATTRIBUTES
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-3 font-mono text-xs">
            <div className="flex justify-between py-2 border-b border-zinc-100">
              <span className="text-zinc-500">Storage Provider</span>
              <span className="font-semibold text-zinc-900 uppercase">
                {asset.storage_provider}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-100">
              <span className="text-zinc-500">File Size</span>
              <span className="text-zinc-900">{formatBytes(asset.file_size)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-100">
              <span className="text-zinc-500">MIME Type</span>
              <span className="text-zinc-900">{asset.mime_type || "N/A"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-100">
              <span className="text-zinc-500">Storage Path</span>
              <span className="text-zinc-900 truncate max-w-xs">{asset.storage_path}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500">Registered At</span>
              <span className="text-zinc-900">{formatDate(asset.created_at)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-sm font-mono flex items-center gap-2">
              <Building2 className="w-4 h-4 text-zinc-800" />
              RELATIONSHIP BINDINGS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-3 font-mono text-xs">
            <div className="flex justify-between py-2 border-b border-zinc-100">
              <span className="text-zinc-500">Linked Property</span>
              {asset.property ? (
                <Link
                  href={`/properties/${asset.property_id}`}
                  className="font-semibold text-zinc-900 hover:underline flex items-center gap-1"
                >
                  {asset.property.name} <ExternalLink className="w-3 h-3" />
                </Link>
              ) : (
                <span className="text-zinc-400">None</span>
              )}
            </div>

            <div className="flex justify-between py-2 border-b border-zinc-100">
              <span className="text-zinc-500">Associated 3D Project</span>
              {asset.project ? (
                <Link
                  href={`/projects/${asset.project_id}`}
                  className="font-semibold text-zinc-900 hover:underline flex items-center gap-1"
                >
                  {asset.project.name} <ExternalLink className="w-3 h-3" />
                </Link>
              ) : (
                <span className="text-zinc-400">None (Input dataset)</span>
              )}
            </div>

            <div className="py-2">
              <span className="text-zinc-500 block mb-1">Raw Metadata JSON</span>
              <pre className="p-3 bg-zinc-100 rounded text-[11px] overflow-x-auto text-zinc-800">
                {JSON.stringify(asset.metadata || {}, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
