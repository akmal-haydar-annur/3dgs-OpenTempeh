"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Database, HardDrive, RefreshCw } from "lucide-react";
import Link from "next/link";

export function Header() {
  const pathname = usePathname();
  const [health, setHealth] = useState<{
    supabaseOk: boolean;
    hfOk: boolean;
    loading: boolean;
  }>({
    supabaseOk: true,
    hfOk: true,
    loading: false,
  });

  const checkHealth = async () => {
    try {
      setHealth((prev) => ({ ...prev, loading: true }));
      const res = await fetch("/api/health");
      const data = await res.json();
      setHealth({
        supabaseOk: data.supabase?.connected,
        hfOk: data.huggingFace?.connected,
        loading: false,
      });
    } catch {
      setHealth((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const getBreadcrumb = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0 || parts[0] === "dashboard") return "Dashboard Overview";
    return parts
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, " "))
      .join(" / ");
  };

  return (
    <header className="h-16 border-b border-zinc-200 bg-white px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold tracking-tight text-zinc-900 font-mono">
          {getBreadcrumb()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Live Integrations Indicators */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
          <Link
            href="/settings"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors border border-zinc-200"
          >
            <Database className="w-3.5 h-3.5 text-zinc-600" />
            <span>Supabase</span>
            <span
              className={`h-2 w-2 rounded-full ${
                health.supabaseOk ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors border border-zinc-200"
          >
            <HardDrive className="w-3.5 h-3.5 text-zinc-600" />
            <span>HF Bucket</span>
            <span
              className={`h-2 w-2 rounded-full ${
                health.hfOk ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
          </Link>
        </div>

        <button
          onClick={checkHealth}
          disabled={health.loading}
          className="p-1.5 rounded-md hover:bg-zinc-100 text-zinc-500 transition-colors"
          title="Refresh Integration Status"
        >
          <RefreshCw className={`w-4 h-4 ${health.loading ? "animate-spin" : ""}`} />
        </button>
      </div>
    </header>
  );
}
