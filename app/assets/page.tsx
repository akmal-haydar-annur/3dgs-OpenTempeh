"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderArchive,
  FileVideo,
  Box,
  Image as ImageIcon,
  HardDrive,
  Filter,
  ExternalLink,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/StatusBadge";
import { LoadingSpinner } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatBytes, formatDate } from "@/lib/utils";
import type { Asset, AssetType } from "@/lib/supabase/types";

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [hfObjects, setHfObjects] = useState<Array<{ path: string; size: number }>>([]);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/assets");
      const data = await res.json();
      setAssets(data.assets || []);

      // Also check real files currently on HF bucket
      try {
        const hfRes = await fetch("/api/storage/list");
        if (hfRes.ok) {
          const hfData = await hfRes.json();
          setHfObjects(hfData.objects || []);
        }
      } catch {
        // Non-blocking
      }
    } catch (err) {
      console.error("Error loading assets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const filteredAssets = assets.filter((a) => {
    if (selectedType === "all") return true;
    return a.type === selectedType;
  });

  const getAssetIcon = (type: AssetType) => {
    switch (type) {
      case "video":
        return <FileVideo className="w-4 h-4 text-zinc-900" />;
      case "splat":
      case "ply":
      case "result":
        return <Box className="w-4 h-4 text-zinc-900" />;
      default:
        return <ImageIcon className="w-4 h-4 text-zinc-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 font-mono">
            ASSET INVENTORY
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Metadata management for video datasets and 3D Gaussian Splatting point clouds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={fetchAssets}
            variant="outline"
            size="sm"
            className="text-xs gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
        </div>
      </div>

      {/* Hugging Face Bucket Storage Reference Bar */}
      <div className="p-4 rounded-lg bg-zinc-900 text-white border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <HardDrive className="w-4 h-4 text-zinc-300" />
          <span>Storage Provider: <strong className="text-white">Hugging Face Bucket</strong></span>
          <span className="text-zinc-500">|</span>
          <span className="text-zinc-400">datasets/Zaki-oracemeng/3dgs-test</span>
        </div>
        <div className="text-zinc-400 flex items-center gap-2">
          <span>Physical Bucket Objects: <strong className="text-zinc-200">{hfObjects.length}</strong></span>
        </div>
      </div>

      {/* Type Filter Tabs */}
      <div className="flex items-center gap-2 pb-2 overflow-x-auto text-xs font-mono">
        {["all", "video", "splat", "ply", "thumbnail"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 rounded-md uppercase font-semibold transition-colors border ${
              selectedType === type
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
            }`}
          >
            {type === "all" ? "All Types" : type} (
            {type === "all"
              ? assets.length
              : assets.filter((a) => a.type === type).length}
            )
          </button>
        ))}
      </div>

      {/* Asset Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <LoadingSpinner text="Querying asset metadata from Supabase..." />
          ) : filteredAssets.length === 0 ? (
            <EmptyState
              icon={<FolderArchive className="w-6 h-6" />}
              title="No Assets Found"
              description="No assets recorded with the selected filter. Sync or check database migrations in Settings."
              action={
                <Link href="/settings">
                  <Button size="sm">System Status & Migration</Button>
                </Link>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-6">Asset Name</th>
                    <th className="py-3 px-6">Type</th>
                    <th className="py-3 px-6">File Size</th>
                    <th className="py-3 px-6">Storage Path</th>
                    <th className="py-3 px-6">Related Property</th>
                    <th className="py-3 px-6">Created At</th>
                    <th className="py-3 px-6 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filteredAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-zinc-50/70 transition-colors">
                      <td className="py-4 px-6 font-semibold text-zinc-900 flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200">
                          {getAssetIcon(asset.type)}
                        </div>
                        <Link href={`/assets/${asset.id}`} className="hover:underline truncate max-w-xs">
                          {asset.name}
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="outline" className="uppercase text-[11px]">
                          {asset.type}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-zinc-600">
                        {formatBytes(asset.file_size)}
                      </td>
                      <td className="py-4 px-6 text-zinc-500 truncate max-w-xs" title={asset.storage_path}>
                        {asset.storage_path}
                      </td>
                      <td className="py-4 px-6 text-zinc-700">
                        {asset.property ? (
                          <Link href={`/properties/${asset.property_id}`} className="hover:underline font-medium">
                            {asset.property.name}
                          </Link>
                        ) : (
                          <span className="text-zinc-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-zinc-500">
                        {formatDate(asset.created_at)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link href={`/assets/${asset.id}`}>
                          <Button size="sm" variant="outline" className="h-7 text-xs px-2.5">
                            Inspect
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
