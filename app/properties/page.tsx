"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  FileVideo,
  Layers,
  Search,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingState";
import type { Property } from "@/lib/supabase/types";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/properties");
      const data = await res.json();
      setProperties(data.properties || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((prop) => {
    const q = searchQuery.toLowerCase();
    return (
      prop.name.toLowerCase().includes(q) ||
      prop.location.toLowerCase().includes(q) ||
      (prop.address && prop.address.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 font-mono">
            PROPERTIES DIRECTORY
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Registered real estate spaces with video datasets ready for 3D Gaussian Splatting.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-xs"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSpinner text="Loading property catalog..." />
      ) : filteredProperties.length === 0 ? (
        <EmptyState
          icon={<Building2 className="w-6 h-6" />}
          title={searchQuery ? "No Matching Properties" : "No Properties Registered"}
          description={
            searchQuery
              ? `No property matches "${searchQuery}". Try different keywords.`
              : "Database has no properties yet. Apply migration and seed data in Settings."
          }
          action={
            <Link href="/settings">
              <Button size="sm">Check Database Schema</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => {
            const videoAssets = (property.assets || []).filter((a) => a.type === "video");
            const projectCount = (property.projects || []).length;

            return (
              <Card
                key={property.id}
                className="overflow-hidden flex flex-col justify-between hover:border-zinc-950 transition-all hover:shadow-md group"
              >
                <div>
                  {/* Property Image Header */}
                  <div className="relative h-44 w-full bg-zinc-100 overflow-hidden border-b border-zinc-200">
                    {property.thumbnail_url ? (
                      <img
                        src={property.thumbnail_url}
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-400">
                        <Building2 className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded">
                      {property.price_display || "Price on request"}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-base text-zinc-900 group-hover:underline">
                      <Link href={`/properties/${property.id}`}>{property.name}</Link>
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1.5 font-mono">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                      <span className="truncate">{property.location}</span>
                    </div>

                    <p className="text-xs text-zinc-600 line-clamp-2 mt-3 leading-relaxed">
                      {property.description || "No description provided."}
                    </p>
                  </div>
                </div>

                {/* Footer Badges & Actions */}
                <div className="px-5 py-3.5 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3 text-zinc-600">
                    <span className="flex items-center gap-1" title="Available video datasets">
                      <FileVideo className="w-3.5 h-3.5 text-zinc-500" />
                      <strong>{videoAssets.length}</strong> videos
                    </span>
                    <span className="flex items-center gap-1" title="3DGS Projects">
                      <Layers className="w-3.5 h-3.5 text-zinc-500" />
                      <strong>{projectCount}</strong> jobs
                    </span>
                  </div>

                  <Link href={`/properties/${property.id}`}>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1 px-2.5">
                      Select <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
