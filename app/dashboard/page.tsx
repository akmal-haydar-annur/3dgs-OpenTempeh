"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  FileVideo,
  Layers,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Database,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LoadingSpinner } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";
import type { Project, Property, Asset } from "@/lib/supabase/types";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalProperties: 0,
    totalVideos: 0,
    totalProjects: 0,
    completedProjects: 0,
    processingProjects: 0,
    failedProjects: 0,
    queuedProjects: 0,
  });
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [schemaWarning, setSchemaWarning] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setSchemaWarning(null);

      // 1. Fetch properties
      const propRes = await fetch("/api/properties");
      const propData = await propRes.json();

      if (propData.code === "PGRST205") {
        setSchemaWarning("Supabase tables not detected yet. Run migration script to initialize schema.");
        setLoading(false);
        return;
      }

      // 2. Fetch assets
      const assetRes = await fetch("/api/assets");
      const assetData = await assetRes.json();

      // 3. Fetch projects
      const projRes = await fetch("/api/projects");
      const projData = await projRes.json();

      const properties: Property[] = propData.properties || [];
      const assets: Asset[] = assetData.assets || [];
      const projects: Project[] = projData.projects || [];

      const videoAssets = assets.filter((a) => a.type === "video");
      const completed = projects.filter((p) => p.status === "completed");
      const processing = projects.filter((p) => p.status === "processing");
      const queued = projects.filter((p) => p.status === "queued");
      const failed = projects.filter((p) => p.status === "failed");

      setMetrics({
        totalProperties: properties.length,
        totalVideos: videoAssets.length,
        totalProjects: projects.length,
        completedProjects: completed.length,
        processingProjects: processing.length,
        failedProjects: failed.length,
        queuedProjects: queued.length,
      });

      setRecentProjects(projects.slice(0, 6));
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 font-mono">
            OPERATIONAL DASHBOARD
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            System overview for 3D Gaussian Splatting property datasets and GPU inference jobs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/properties">
            <Button variant="outline" size="sm" className="gap-2">
              <Building2 className="w-4 h-4" />
              Browse Properties
            </Button>
          </Link>
          <Link href="/projects">
            <Button size="sm" className="gap-2">
              <Layers className="w-4 h-4" />
              Manage Jobs
            </Button>
          </Link>
        </div>
      </div>

      {/* Migration Notice Banner if schema not applied */}
      {schemaWarning && (
        <div className="p-4 rounded-lg bg-zinc-900 text-white border border-zinc-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="font-semibold text-sm">Supabase Database Setup Required</div>
              <p className="text-xs text-zinc-400 mt-0.5">{schemaWarning}</p>
            </div>
          </div>
          <Link href="/settings">
            <Button size="sm" variant="secondary" className="whitespace-nowrap text-xs gap-1.5 font-mono">
              Apply Migration <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="hover:border-zinc-400 transition-colors">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
              <span>Properties</span>
              <Building2 className="w-4 h-4 text-zinc-400" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold font-mono text-zinc-900">
              {loading ? "-" : metrics.totalProperties}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Real estate spaces</p>
          </CardContent>
        </Card>

        <Card className="hover:border-zinc-400 transition-colors">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
              <span>Input Videos</span>
              <FileVideo className="w-4 h-4 text-zinc-400" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold font-mono text-zinc-900">
              {loading ? "-" : metrics.totalVideos}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">HF bucket datasets</p>
          </CardContent>
        </Card>

        <Card className="hover:border-zinc-400 transition-colors">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
              <span>Total Jobs</span>
              <Layers className="w-4 h-4 text-zinc-400" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold font-mono text-zinc-900">
              {loading ? "-" : metrics.totalProjects}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Created 3DGS tasks</p>
          </CardContent>
        </Card>

        <Card className="hover:border-zinc-400 transition-colors">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
              <span>Queued</span>
              <Clock className="w-4 h-4 text-zinc-500" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold font-mono text-zinc-900">
              {loading ? "-" : metrics.queuedProjects}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Ready for GPU worker</p>
          </CardContent>
        </Card>

        <Card className="hover:border-zinc-400 transition-colors">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
              <span>Completed</span>
              <CheckCircle2 className="w-4 h-4 text-zinc-900" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold font-mono text-zinc-900">
              {loading ? "-" : metrics.completedProjects}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">3D point clouds ready</p>
          </CardContent>
        </Card>

        <Card className="hover:border-zinc-400 transition-colors">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
              <span>Failed</span>
              <AlertTriangle className="w-4 h-4 text-zinc-400" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold font-mono text-zinc-900">
              {loading ? "-" : metrics.failedProjects}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Requires retry</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div>
            <CardTitle className="text-base font-mono">RECENT 3DGS INFERENCE JOBS</CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">Latest reconstruction pipeline tasks</p>
          </div>
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <LoadingSpinner text="Loading recent jobs..." />
          ) : recentProjects.length === 0 ? (
            <EmptyState
              title="No 3DGS Projects Yet"
              description="Start by selecting a property and its video dataset to queue a new reconstruction job."
              action={
                <Link href="/properties">
                  <Button size="sm">Select Property & Video</Button>
                </Link>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-xs font-mono uppercase text-zinc-500">
                  <tr>
                    <th className="py-3 px-6">Project Name</th>
                    <th className="py-3 px-6">Property</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Created At</th>
                    <th className="py-3 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-mono text-xs">
                  {recentProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-zinc-50/70 transition-colors">
                      <td className="py-4 px-6 font-semibold text-zinc-900">
                        <Link href={`/projects/${project.id}`} className="hover:underline">
                          {project.name}
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-zinc-600">
                        {project.property?.name || "Assigned Property"}
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="py-4 px-6 text-zinc-500">
                        {formatDate(project.created_at)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link href={`/projects/${project.id}`}>
                          <Button size="sm" variant="outline" className="text-xs h-7 px-2.5">
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
  );
}
