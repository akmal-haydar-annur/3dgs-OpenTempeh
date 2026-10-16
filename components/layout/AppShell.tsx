"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage =
    pathname.startsWith("/landingpage") ||
    pathname.startsWith("/search") ||
    pathname.startsWith("/kos") ||
    pathname.startsWith("/labs/sandbox") ||
    pathname.startsWith("/audit-visual");

  if (isPublicPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex min-h-screen bg-zinc-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
