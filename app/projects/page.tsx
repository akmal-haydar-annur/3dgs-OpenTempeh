"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Layers,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Plus,
  ArrowRight,
  HardDrive,
  Cpu,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LoadingSpinner } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate, formatBytes } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/lib/supabase/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (selectedStatus === "all") return true;
    return p.status === selectedStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 font-mono">
            3DGS INFERENCE JOBS
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Tracking lifecycle and GPU inference workflow from video input to 3D Gaussian Splatting point clouds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={fetchProjects}
            variant="outline"
            size="sm"
            className="text-xs gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Jobs
          </Button>

          <Link href="/properties">
            <Button size="sm" className="gap-2 text-xs font-mono">
              <Plus className="w-3.5 h-3.5" /> New 3DGS Job
            </Button>
          </Link>
        </div>
      </div>

      {/* GPU Worker Contract Status Summary */}
      <div className="p-4 rounded-lg bg-zinc-900 text-white border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-4 h-4 text-zinc-300 shrink-0" />
          <span>Vast.ai Worker Interface: <code>GET /api/worker/jobs</code></span>
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <span>Queued: <strong className="text-white">{projects.filter(p => p.status === 'queued').length}</strong></span>
          <span>Processing: <strong className="text-white">{projects.filter(p => p.status === 'processing').length}</strong></span>
          <span>Completed: <strong className="text-white">{projects.filter(p => p.status === 'completed').length}</strong></span>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 pb-2 overflow-x-auto text-xs font-mono">
        {["all", "queued", "processing", "completed", "failed"].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3 py-1.5 rounded-md uppercase font-semibold transition-colors border ${
              selectedStatus === st
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
            }`}
          >
            {st === "all" ? "All Jobs" : st} (
            {st === "all"
              ? projects.length
              : projects.filter((p) => p.status === st).length}
            )
          </button>
        ))}
      </div>

      {/* Projects Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <LoadingSpinner text="Querying 3DGS jobs from Supabase..." />
          ) : filteredProjects.length === 0 ? (
            <EmptyState
              icon={<Layers className="w-6 h-6" />}
              title="No Projects in this View"
              description="No 3DGS tasks matching the selected filter. Create a job by choosing a property video."
              action={
                <Link href="/properties">
                  <Button size="sm">Choose Video Dataset</Button>
                </Link>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-6">Project Name</th>
                    <th className="py-3 px-6">Target Property</th>
                    <th className="py-3 px-6">Input Video Asset</th>
                    <th className="py-3 px-6">Job Status</th>
                    <th className="py-3 px-6">Output 3D Model</th>
                    <th className="py-3 px-6">Created</th>
                    <th className="py-3 px-6 text-right">Workflow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-zinc-50/70 transition-colors">
                      <td className="py-4 px-6 font-semibold text-zinc-900">
                        <Link href={`/projects/${project.id}`} className="hover:underline">
                          {project.name}
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-zinc-700">
                        {project.property ? (
                          <Link href={`/properties/${project.property_id}`} className="hover:underline">
                            {project.property.name}
                          </Link>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-4 px-6 text-zinc-600">
                        {project.input_asset ? (
                          <span className="font-semibold text-zinc-800">
                            {project.input_asset.name}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="py-4 px-6 text-zinc-700">
                        {project.output_asset ? (
                          <Link
                            href={`/assets/${project.output_asset_id}`}
                            className="font-semibold text-zinc-900 hover:underline flex items-center gap-1"
                          >
                            <span>{project.output_asset.name}</span>
                          </Link>
                        ) : project.status === "failed" ? (
                          <span className="text-red-600">None (Failed)</span>
                        ) : (
                          <span className="text-zinc-400">Pending inference...</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-zinc-500">
                        {formatDate(project.created_at)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link href={`/projects/${project.id}`}>
                          <Button size="sm" variant="outline" className="h-7 text-xs px-2.5">
                            Open Job
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
