"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  FileVideo,
  Layers,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  ExternalLink,
  HardDrive,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LoadingSpinner } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatBytes, formatDate } from "@/lib/utils";
import type { Property, Asset, Project } from "@/lib/supabase/types";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [property, setProperty] = useState<Property | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/properties/${id}`);
      if (!res.ok) {
        throw new Error("Failed to load property details");
      }
      const data = await res.json();
      setProperty(data.property);

      // Pre-select first video asset if available
      const videoAssets = (data.property?.assets || []).filter(
        (a: Asset) => a.type === "video"
      );
      if (videoAssets.length > 0) {
        setSelectedAssetId(videoAssets[0].id);
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const handleCreate3DJob = async () => {
    if (!selectedAssetId || !property) return;

    try {
      setSubmitting(true);
      setErrorMsg(null);

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property.id,
          inputAssetId: selectedAssetId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create 3DGS project");
      }

      // Navigate to project detail page
      router.push(`/projects/${data.id}`);
    } catch (err) {
      setErrorMsg((err as Error).message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading property details..." />;
  }

  if (!property) {
    return (
      <EmptyState
        title="Property Not Found"
        description="The requested property record could not be found."
        action={
          <Link href="/properties">
            <Button size="sm">Back to Properties</Button>
          </Link>
        }
      />
    );
  }

  const videoAssets = (property.assets || []).filter((a) => a.type === "video");
  const relatedProjects = property.projects || [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Navigation & Header */}
      <div>
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Properties
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 font-mono">
              {property.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>{property.location}</span>
              {property.address && <span>• {property.address}</span>}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-mono text-zinc-500">Valuation / Rate</div>
            <div className="text-lg font-bold font-mono text-zinc-900">
              {property.price_display || "Contact for inquiry"}
            </div>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-md bg-red-50 border border-red-200 text-red-800 text-xs font-mono">
          {errorMsg}
        </div>
      )}

      {/* Main Grid: Details + Video Dataset Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Property Overview & Description */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <div className="h-48 w-full bg-zinc-100 overflow-hidden border-b border-zinc-200">
              {property.thumbnail_url ? (
                <img
                  src={property.thumbnail_url}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400">
                  <Building2 className="w-12 h-12" />
                </div>
              )}
            </div>
            <CardContent className="p-5 space-y-4 text-xs font-mono">
              <div>
                <span className="text-zinc-400 uppercase tracking-wider block text-[10px]">
                  Description
                </span>
                <p className="text-zinc-700 font-sans text-sm mt-1 leading-relaxed">
                  {property.description || "No description provided."}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex justify-between">
                <span className="text-zinc-400">Database ID</span>
                <span className="text-zinc-800 font-bold">{property.id.slice(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Registered</span>
                <span className="text-zinc-800">{formatDate(property.created_at)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Available Video Datasets & 3D Generation */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2 border-zinc-900">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-mono flex items-center gap-2">
                    <FileVideo className="w-4 h-4 text-zinc-900" />
                    AVAILABLE VIDEO DATASETS
                  </CardTitle>
                  <p className="text-xs text-zinc-500 mt-1">
                    Select a Hugging Face storage video to initialize a 3D Gaussian Splatting job.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 border text-zinc-700">
                  {videoAssets.length} Available
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
              {videoAssets.length === 0 ? (
                <div className="p-6 text-center rounded-lg border border-dashed border-zinc-300 text-xs text-zinc-500 font-mono">
                  No video datasets linked to this property. Link video assets in the Assets module.
                </div>
              ) : (
                <div className="space-y-3">
                  {videoAssets.map((asset) => {
                    const isSelected = selectedAssetId === asset.id;

                    return (
                      <div
                        key={asset.id}
                        onClick={() => setSelectedAssetId(asset.id)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-zinc-950 bg-zinc-900 text-white shadow-sm"
                            : "border-zinc-200 bg-white hover:border-zinc-400 hover:bg-zinc-50/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded flex items-center justify-center shrink-0 ${
                              isSelected ? "bg-white text-zinc-900" : "bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            <FileVideo className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm tracking-tight">
                              {asset.name}
                            </div>
                            <div
                              className={`text-xs font-mono flex items-center gap-2 mt-0.5 ${
                                isSelected ? "text-zinc-300" : "text-zinc-500"
                              }`}
                            >
                              <span>{formatBytes(asset.file_size)}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <HardDrive className="w-3 h-3" />
                                {asset.storage_provider}
                              </span>
                              <span>•</span>
                              <span className="truncate max-w-[150px]">{asset.storage_path}</span>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          {isSelected && (
                            <span className="text-xs font-mono font-bold bg-white text-zinc-950 px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-zinc-950" /> Selected
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Action Button: Generate 3D */}
              <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-zinc-500 font-mono">
                  {selectedAssetId ? (
                    <span>Ready to submit job to Vast.ai GPU Worker queue.</span>
                  ) : (
                    <span>Select a video dataset above to proceed.</span>
                  )}
                </div>

                <Button
                  onClick={handleCreate3DJob}
                  disabled={!selectedAssetId || submitting || videoAssets.length === 0}
                  isLoading={submitting}
                  size="md"
                  className="w-full sm:w-auto gap-2 font-mono text-xs uppercase tracking-wider"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate 3D (3DGS Job)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Projects Table */}
          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-sm font-mono flex items-center gap-2">
                <Layers className="w-4 h-4 text-zinc-700" />
                ASSOCIATED 3DGS PROJECTS ({relatedProjects.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {relatedProjects.length === 0 ? (
                <div className="p-6 text-center text-xs text-zinc-400 font-mono">
                  No 3DGS reconstruction jobs generated for this property yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase">
                      <tr>
                        <th className="py-2.5 px-5">Job Name</th>
                        <th className="py-2.5 px-5">Status</th>
                        <th className="py-2.5 px-5">Created</th>
                        <th className="py-2.5 px-5 text-right">View</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {relatedProjects.map((proj: Project) => (
                        <tr key={proj.id} className="hover:bg-zinc-50 transition-colors">
                          <td className="py-3 px-5 font-semibold text-zinc-900 truncate max-w-xs">
                            <Link href={`/projects/${proj.id}`} className="hover:underline">
                              {proj.name}
                            </Link>
                          </td>
                          <td className="py-3 px-5">
                            <StatusBadge status={proj.status} />
                          </td>
                          <td className="py-3 px-5 text-zinc-500">
                            {formatDate(proj.created_at)}
                          </td>
                          <td className="py-3 px-5 text-right">
                            <Link href={`/projects/${proj.id}`}>
                              <Button size="sm" variant="outline" className="h-6 text-[11px] px-2">
                                Details
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
      </div>
    </div>
  );
}
