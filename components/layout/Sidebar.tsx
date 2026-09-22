"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  FolderArchive,
  Layers,
  Settings,
  Cpu,
  Boxes,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Properties", href: "/properties", icon: Building2 },
  { name: "Assets", href: "/assets", icon: FolderArchive },
  { name: "3D Projects", href: "/projects", icon: Layers },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-zinc-200 bg-zinc-50/50 flex flex-col justify-between min-h-screen">
      <div>
        {/* Brand / Logo */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 gap-3 bg-white">
          <div className="h-8 w-8 rounded bg-zinc-950 flex items-center justify-center text-white font-mono font-bold text-sm">
            <Boxes className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight text-zinc-900 leading-none">
              3DGS PLATFORM
            </div>
            <div className="text-[10px] font-mono text-zinc-500 mt-0.5 tracking-wider uppercase">
              Property Visualization
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-3 mb-2 font-semibold">
            System Modules
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/" || pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-zinc-900 text-white shadow-xs font-semibold"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                  )}
                >
                  <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-zinc-500")} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer / Pipeline Status Info */}
      <div className="p-4 border-t border-zinc-200 bg-white m-3 rounded-lg border">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-4 h-4 text-zinc-800" />
          <span className="text-xs font-semibold text-zinc-900">GPU Worker Bridge</span>
        </div>
        <p className="text-[11px] text-zinc-500 leading-relaxed">
          Ready for Vast.ai inference. Polls Supabase jobs & downloads HF videos.
        </p>
        <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <span>Vast.ai + gsplat</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </aside>
  );
}
