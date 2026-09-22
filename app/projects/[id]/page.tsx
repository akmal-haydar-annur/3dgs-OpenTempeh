"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  Layers,
  Building2,
  FileVideo,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Cpu,
  Play,
  Check,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LoadingSpinner } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { JobWorkflowStepper } from "@/components/projects/JobWorkflowStepper";
import { GaussianSplatViewer } from "@/components/3d/GaussianSplatViewer";
import { formatDate, formatBytes } from "@/lib/utils";
import type { Project } from "@/lib/supabase/types";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [outputDownloadUrl, setOutputDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "3d_viewer" | "worker_bridge">("overview");

  // Fetch project details
  const fetchProject = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) throw new Error("Project not found");
      const data = await res.json();
      setProject(data.project);

      // If output asset exists, get download URL
      if (data.project?.output_asset_id) {
        fetch(`/api/assets/${data.project.output_asset_id}/url`)
          .then((r) => r.json())
          .then((d) => {
            if (d.url) setOutputDownloadUrl(d.url);
          })
          .catch(console.error);
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProject();
  }, [id]);

  // Rule 29: Polling every 3-5 seconds if job is queued or processing
  useEffect(() => {
    if (!project || (project.status !== "queued" && project.status !== "processing")) {
      return;
    }

    const interval = setInterval(() => {
      fetchProject(true);
    }, 3500);

    return () => clearInterval(interval);
  }, [project?.status, id]);

  // Handle retry
  const handleRetry = async () => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "retry" }),
      });
      if (!res.ok) throw new Error("Failed to retry project");
      const data = await res.json();
      setProject(data.project);
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setActionLoading(false);
    }
  };

  // Simulated GPU Worker Actions for demonstration / testing
  const handleSimulateWorker = async (nextStatus: "processing" | "completed" | "failed") => {
    try {
      setActionLoading(true);
      const payload: Record<string, unknown> = { status: nextStatus };

      if (nextStatus === "completed") {
        payload.output_asset = {
          name: `${project?.name || "reconstruction"}_splat.splat`,
          type: "splat",
          storage_provider: "huggingface",
          storage_path: `properties/${project?.property_id}/output/${project?.id}_result.splat`,
          file_size: 48920100,
          metadata: {
            splat_count: 750000,
            iterations: 30000,
            simulated: true,
          },
        };
      } else if (nextStatus === "failed") {
        payload.error_message = "Vast.ai Worker Demo: Simulated CUDA memory limit reached during densification.";
      }

      const res = await fetch(`/api/worker/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Simulation failed");
      }

      await fetchProject(true);
      if (nextStatus === "completed") {
        setActiveTab("3d_viewer");
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading 3DGS project pipeline..." />;
  }

  if (!project) {
    return (
      <EmptyState
        title="Project Not Found"
        description="The requested 3DGS project job does not exist."
        action={
          <Link href="/projects">
            <Button size="sm">Back to Projects</Button>
          </Link>
        }
      />
    );
  }

  const isCompleted = project.status === "completed";
  const isFailed = project.status === "failed";
  const isProcessing = project.status === "processing";
  const isQueued = project.status === "queued";

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header and Back Link */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to 3DGS Jobs
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950 font-mono">
                {project.name}
              </h2>
              <StatusBadge status={project.status} />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mt-1">
              <span>Job ID: {project.id}</span>
              <span>•</span>
              <span>Created {formatDate(project.created_at)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isFailed && (
              <Button
                onClick={handleRetry}
                disabled={actionLoading}
                isLoading={actionLoading}
                size="sm"
                className="gap-1.5 text-xs font-mono"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retry Job
              </Button>
            )}

            {isCompleted && project.output_asset && (
              <Button
                onClick={() => setActiveTab("3d_viewer")}
                size="sm"
                className="gap-1.5 text-xs font-mono bg-zinc-900 text-white"
              >
                <Sparkles className="w-3.5 h-3.5" /> View 3D Result
              </Button>
            )}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-md bg-red-50 border border-red-200 text-red-800 text-xs font-mono">
          {errorMsg}
        </div>
      )}

      {/* Visual Workflow Stepper */}
      <Card className="border-zinc-300">
        <CardContent className="p-6">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-2">
            3DGS PIPELINE WORKFLOW (AUTO-POLLING EVERY 3.5S)
          </div>
          <JobWorkflowStepper
            status={project.status}
            createdAt={project.created_at}
            startedAt={project.started_at}
            completedAt={project.completed_at}
            errorMessage={project.error_message}
            inputAssetName={project.input_asset?.name}
          />
        </CardContent>
      </Card>

      {/* Tabs: Overview, 3D Viewer, GPU Worker Simulation Bridge */}
      <div className="flex items-center gap-2 border-b border-zinc-200 text-xs font-mono">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === "overview"
              ? "border-zinc-900 text-zinc-900"
              : "border-transparent text-zinc-500 hover:text-zinc-900"
          }`}
        >
          Job Specifications
        </button>

        {isCompleted && project.output_asset && (
          <button
            onClick={() => setActiveTab("3d_viewer")}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "3d_viewer"
                ? "border-zinc-900 text-zinc-900"
                : "border-transparent text-zinc-500 hover:text-zinc-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
            3D Gaussian Splat Result
          </button>
        )}

        <button
          onClick={() => setActiveTab("worker_bridge")}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "worker_bridge"
              ? "border-zinc-900 text-zinc-900"
              : "border-transparent text-zinc-500 hover:text-zinc-900"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          GPU Worker Bridge & Test Controls
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Property & Input Asset */}
          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-sm font-mono flex items-center gap-2">
                <Building2 className="w-4 h-4 text-zinc-700" />
                INPUT DATASET SPECIFICATIONS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-zinc-100">
                <span className="text-zinc-500">Property</span>
                {project.property ? (
                  <Link
                    href={`/properties/${project.property_id}`}
                    className="font-semibold text-zinc-900 hover:underline flex items-center gap-1"
                  >
                    {project.property.name} <ExternalLink className="w-3 h-3" />
                  </Link>
                ) : (
                  <span>-</span>
                )}
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100">
                <span className="text-zinc-500">Input Video Asset</span>
                {project.input_asset ? (
                  <Link
                    href={`/assets/${project.input_asset_id}`}
                    className="font-semibold text-zinc-900 hover:underline flex items-center gap-1"
                  >
                    {project.input_asset.name} <ExternalLink className="w-3 h-3" />
                  </Link>
                ) : (
                  <span>-</span>
                )}
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100">
                <span className="text-zinc-500">Video File Size</span>
                <span className="text-zinc-800">
                  {formatBytes(project.input_asset?.file_size)}
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-zinc-500">HF Bucket Storage Path</span>
                <span className="text-zinc-800 truncate max-w-xs">
                  {project.input_asset?.storage_path}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 3DGS Hyperparameters & Timings */}
          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-sm font-mono flex items-center gap-2">
                <Layers className="w-4 h-4 text-zinc-700" />
                TRAINING PARAMETERS & TIMINGS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-zinc-100">
                <span className="text-zinc-500">Created Time</span>
                <span className="text-zinc-800">{formatDate(project.created_at)}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100">
                <span className="text-zinc-500">Started Time</span>
                <span className="text-zinc-800">{formatDate(project.started_at)}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-zinc-100">
                <span className="text-zinc-500">Completed Time</span>
                <span className="text-zinc-800">{formatDate(project.completed_at)}</span>
              </div>

              <div className="py-2">
                <span className="text-zinc-500 block mb-1">Inference Parameters (JSON)</span>
                <pre className="p-3 bg-zinc-100 rounded text-[11px] overflow-x-auto text-zinc-800">
                  {JSON.stringify(project.params || {}, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: 3D RESULT VIEWER */}
      {activeTab === "3d_viewer" && project.output_asset && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-mono text-zinc-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Reconstructed 3D Gaussian Splatting Output
            </h3>
            <Link href={`/assets/${project.output_asset_id}`}>
              <Button size="sm" variant="outline" className="text-xs font-mono gap-1">
                Inspect Output Asset <ExternalLink className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          <GaussianSplatViewer
            assetName={project.output_asset.name}
            storagePath={project.output_asset.storage_path}
            fileSize={project.output_asset.file_size}
            mimeType={project.output_asset.mime_type}
            downloadUrl={outputDownloadUrl}
            metadata={project.output_asset.metadata}
          />
        </div>
      )}

      {/* TAB 3: GPU WORKER BRIDGE & OPERATOR TEST CONTROLS */}
      {activeTab === "worker_bridge" && (
        <Card className="border-2 border-zinc-900 bg-zinc-50/50">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-mono flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-zinc-900" />
                  VAST.AI GPU WORKER CONTRACT & SIMULATION
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-1">
                  When Vast.ai worker connects, it claims jobs via API. Use buttons below to test end-to-end lifecycle without GPU.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-6">
            {/* Step Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                variant={isQueued ? "primary" : "secondary"}
                disabled={actionLoading || !isQueued}
                isLoading={actionLoading && isQueued}
                onClick={() => handleSimulateWorker("processing")}
                className="flex items-center justify-center gap-2 font-mono text-xs h-11"
              >
                <Play className="w-4 h-4" />
                1. Claim & Start (Processing)
              </Button>

              <Button
                variant={isProcessing ? "primary" : "secondary"}
                disabled={actionLoading || !isProcessing}
                isLoading={actionLoading && isProcessing}
                onClick={() => handleSimulateWorker("completed")}
                className="flex items-center justify-center gap-2 font-mono text-xs h-11"
              >
                <Check className="w-4 h-4" />
                2. Complete with 3D Output
              </Button>

              <Button
                variant="outline"
                disabled={actionLoading || (!isQueued && !isProcessing)}
                onClick={() => handleSimulateWorker("failed")}
                className="flex items-center justify-center gap-2 font-mono text-xs h-11 text-red-700 hover:text-red-800 hover:bg-red-50 border-red-200"
              >
                <XCircle className="w-4 h-4" />
                Simulate Worker Failure
              </Button>
            </div>

            {/* API Contract Reference for Vast.ai */}
            <div className="p-4 rounded-lg bg-zinc-900 text-white font-mono text-xs space-y-3">
              <div className="text-zinc-400 font-semibold uppercase text-[11px] tracking-wider">
                Vast.ai Worker HTTP Endpoints
              </div>
              <div className="space-y-1.5 text-zinc-300">
                <div><code>GET /api/worker/jobs</code> — Poll for oldest queued job</div>
                <div><code>PATCH /api/worker/jobs/{project.id}</code> with <code>{`{ status: "processing" }`}</code> — Claim job</div>
                <div><code>PATCH /api/worker/jobs/{project.id}</code> with <code>{`{ status: "completed", output_asset: { ... } }`}</code> — Finish job</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
