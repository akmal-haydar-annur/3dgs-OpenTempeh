"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { KOS_DATA, type KosItem } from "./data";
import "../landingpage/landing.css";

export default function SearchExplorePage() {
  // Start with empty query so all 3 kos units display immediately without "0 Kos Tersedia"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("Semua");
  const [selectedSort, setSelectedSort] = useState<string>("rekomendasi");
  const [only3D, setOnly3D] = useState<boolean>(false);
  const [selectedKosId, setSelectedKosId] = useState<string>("kost-grha-gratia-tipe-a");
  const [savedIds, setSavedIds] = useState<string[]>(["kost-putri-tembalang-asri"]);
  const [mapMode, setMapMode] = useState<"MAP" | "3D" | "SPL">("MAP");
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [previewKos, setPreviewKos] = useState<KosItem | null>(null);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredList = useMemo(() => {
    return KOS_DATA.filter((item) => {
      // Filter Category
      if (selectedCategory !== "Semua" && item.category !== selectedCategory) {
        return false;
      }
      // Filter Price Range
      if (selectedPriceRange === "under1m" && item.price >= 1000000) {
        return false;
      }
      if (
        selectedPriceRange === "1m-1.5m" &&
        (item.price < 1000000 || item.price > 1500000)
      ) {
        return false;
      }
      if (
        selectedPriceRange === "1.5m-2m" &&
        (item.price < 1500000 || item.price > 2000000)
      ) {
        return false;
      }
      if (selectedPriceRange === "above2m" && item.price <= 2000000) {
        return false;
      }
      // Filter 3D Tour
      if (only3D && !item.has3dTour) {
        return false;
      }
      // Filter Search Query (supports multi-word matching)
      if (searchQuery.trim()) {
        const keywords = searchQuery.toLowerCase().split(/[\s,]+/).filter(Boolean);
        const targetText = `${item.name} ${item.location} ${item.subdistrict} ${item.category} ${item.facilities.join(" ")}`.toLowerCase();
        const matches = keywords.some((kw) => targetText.includes(kw));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (selectedSort === "harga-rendah") return a.price - b.price;
      if (selectedSort === "harga-tinggi") return b.price - a.price;
      if (selectedSort === "rating") return b.rating - a.rating;
      return b.views - a.views;
    });
  }, [selectedCategory, selectedPriceRange, selectedSort, only3D, searchQuery]);

  const activeKos = useMemo(() => {
    return KOS_DATA.find((item) => item.id === selectedKosId) || KOS_DATA[0];
  }, [selectedKosId]);

  return (
    <div className="min-h-screen flex flex-col bg-maritime-cream text-maritime-dark font-body antialiased selection:bg-maritime-orange selection:text-white paper-texture">
      {/* BEGIN: Main Header */}
      <header
        className="sticky top-0 z-40 bg-[#f7f3eb]/95 backdrop-blur border-b border-maritime-border"
        data-purpose="main-navigation"
      >
        <div className="max-w-[1920px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo - Clean with generous whitespace */}
          <Link
            className="flex items-center space-x-2 text-maritime-dark group shrink-0 transition-opacity"
            href="/landingpage"
          >
            <span className="font-headline text-2xl sm:text-3xl tracking-wider group-hover:text-maritime-orange transition-colors">
              Open
            </span>
            <span className="inline-flex items-center justify-center text-maritime-orange">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="6" cy="9" opacity="0.6" r="2.2" />
                <circle cx="18" cy="8" opacity="0.7" r="2.4" />
                <circle cx="8" cy="17" opacity="0.6" r="2" />
                <circle cx="16" cy="16" opacity="0.8" r="2.6" />
                <path
                  d="M6 9l6 3 6-4M8 17l4-5 4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="2 2"
                  strokeWidth="1.2"
                />
              </svg>
            </span>
            <span className="font-headline text-2xl sm:text-3xl tracking-wider group-hover:text-maritime-orange transition-colors">
              Tempeh
            </span>
          </Link>

          {/* Center Search Bar: Modern Search Pill */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6">
            <div className="relative flex items-center w-full bg-white border border-maritime-border rounded-full pl-4 pr-1.5 py-1.5 shadow-xs hover:border-stone-400 focus-within:border-stone-700 transition-colors">
              <span className="text-stone-400 shrink-0 mr-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <input
                className="w-full bg-transparent text-xs sm:text-sm font-body text-maritime-dark placeholder-stone-400 focus:outline-none"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama kos, area Tembalang, Banyumanik, fasilitas..."
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-stone-400 hover:text-stone-600 mr-2 text-xs"
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                className="shrink-0 px-3.5 py-1.5 bg-maritime-dark hover:bg-stone-800 text-white rounded-full font-condensed font-bold tracking-wider text-xs uppercase transition-colors cursor-pointer"
              >
                Cari
              </button>
            </div>
          </div>

          {/* Navigation Links: Essential links only */}
          <nav className="flex items-center space-x-4 sm:space-x-6 text-sm font-medium text-maritime-dark shrink-0">
            <Link
              className="text-maritime-orange font-semibold hover:text-maritime-rust transition-colors"
              href="/search"
            >
              Cari Kos
            </Link>
            <Link
              className="hidden sm:inline-block text-stone-600 hover:text-maritime-dark transition-colors"
              href="/landingpage#pilar-bisnis"
            >
              Mitra Pemilik
            </Link>
            <Link
              href="/dashboard"
              aria-label="Akun Pengguna"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-maritime-border bg-white hover:bg-stone-100 text-stone-700 transition-colors"
              title="Dashboard Pengguna"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </Link>
          </nav>
        </div>

        {/* Sub-Header: Single-Row Streamlined Filter Strip */}
        <div
          className="bg-[#f2ece2] border-t border-maritime-border px-4 lg:px-8 py-2.5"
          data-purpose="sub-filter-strip"
        >
          <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-3 text-xs">
            {/* Filter Controls in Single Compact Row */}
            <div className="flex items-center flex-wrap gap-2">
              {/* Tipe Kos Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-maritime-border hover:border-stone-400 text-stone-800 text-xs font-body py-1.5 pl-3 pr-8 rounded-full focus:outline-none focus:ring-1 focus:ring-stone-700 cursor-pointer shadow-2xs"
                >
                  <option value="Semua">Semua Tipe Kos</option>
                  <option value="Campur">Campur</option>
                  <option value="Khusus Putri">Khusus Putri</option>
                  <option value="Khusus Putra">Khusus Putra</option>
                </select>
              </div>

              {/* Rentang Harga Dropdown */}
              <div className="relative">
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="bg-white border border-maritime-border hover:border-stone-400 text-stone-800 text-xs font-body py-1.5 pl-3 pr-8 rounded-full focus:outline-none focus:ring-1 focus:ring-stone-700 cursor-pointer shadow-2xs"
                >
                  <option value="Semua">Semua Rentang Harga</option>
                  <option value="under1m">&lt; Rp1.000.000</option>
                  <option value="1m-1.5m">Rp1.000.000 - Rp1.500.000</option>
                  <option value="1.5m-2m">Rp1.500.000 - Rp2.000.000</option>
                  <option value="above2m">&gt; Rp2.000.000</option>
                </select>
              </div>

              {/* Toggle Hanya Tur 3D */}
              <button
                type="button"
                onClick={() => setOnly3D((prev) => !prev)}
                className={`px-3 py-1.5 rounded-full border text-xs font-body transition-colors cursor-pointer flex items-center gap-1.5 ${
                  only3D
                    ? "bg-maritime-dark text-white border-maritime-dark shadow-2xs"
                    : "bg-white border-maritime-border hover:border-stone-400 text-stone-700"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-maritime-orange" />
                <span>Tersedia Tur 3D</span>
              </button>

              <button
                type="button"
                className="hidden sm:inline-flex px-3 py-1.5 bg-white border border-maritime-border hover:border-stone-400 text-stone-700 text-xs font-body rounded-full transition-colors cursor-pointer"
              >
                Fasilitas Lengkap
              </button>
            </div>

            {/* Tenang Informational Text */}
            <div className="hidden md:flex items-center text-xs text-stone-500 font-body">
              <span>Temukan kos nyaman sekitar Undip dengan tur visual presisi skala 1:1</span>
            </div>
          </div>
        </div>
      </header>
      {/* END: Main Header */}

      {/* BEGIN: Main 50/50 Split Content Area */}
      <main
        className="flex-1 flex flex-col lg:flex-row max-w-[1920px] w-full mx-auto overflow-hidden"
        data-purpose="split-view"
      >
        {/* ========================================== */}
        {/* LEFT COLUMN: Kos Listings (50% Desktop)     */}
        {/* ========================================== */}
        <section
          className="w-full lg:w-1/2 border-r border-maritime-border bg-maritime-warmCard flex flex-col h-[calc(100vh-125px)] overflow-y-auto custom-scrollbar"
          data-purpose="listings-container"
        >
          {/* Listings Sticky Header */}
          <div className="sticky top-0 z-20 bg-maritime-warmCard/95 backdrop-blur-sm px-6 py-3.5 border-b border-maritime-border flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline space-x-2">
                <h1 className="font-headline text-2xl tracking-wide text-maritime-dark">
                  {filteredList.length} Kos Tersedia di Sekitar Undip
                </h1>
              </div>
              <p className="text-xs text-stone-500 font-body mt-0.5">
                Banyumanik &amp; Tembalang • Dilengkapi verifikasi tur visual presisi
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-white border border-maritime-border text-xs font-body py-1.5 pl-3 pr-7 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-700 text-stone-800 cursor-pointer shadow-2xs"
              >
                <option value="rekomendasi">Paling Sesuai</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="harga-rendah">Harga Terendah</option>
                <option value="harga-tinggi">Harga Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Listings Cards Wrapper */}
          <div className="p-6 space-y-4">
            {filteredList.length === 0 ? (
              <div className="bg-white border border-maritime-border rounded-lg p-8 text-center my-6">
                <p className="text-stone-600 font-body text-sm">
                  Tidak ada kos yang sesuai dengan filter yang dipilih.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("Semua");
                    setSelectedPriceRange("Semua");
                    setOnly3D(false);
                    setSearchQuery("");
                  }}
                  className="mt-3 text-xs text-maritime-orange font-semibold hover:underline"
                >
                  Reset Semua Filter
                </button>
              </div>
            ) : (
              filteredList.map((kos) => {
                const isSelected = selectedKosId === kos.id;
                const isSaved = savedIds.includes(kos.id);

                return (
                  <article
                    key={kos.id}
                    onClick={() => setSelectedKosId(kos.id)}
                    className={`group bg-white border rounded-lg transition-all p-4 relative cursor-pointer ${
                      isSelected
                        ? "border-stone-800 ring-1 ring-stone-800 shadow-md"
                        : "border-maritime-border hover:border-stone-400 hover:shadow-sm"
                    }`}
                    data-purpose="listing-card"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Thumbnail Image with Subtle Badge */}
                      <div className="relative w-full sm:w-48 h-40 bg-stone-100 flex-shrink-0 overflow-hidden rounded-md border border-maritime-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt={kos.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={kos.image}
                        />
                        {kos.has3dTour ? (
                          <div className="absolute top-2 left-2 bg-stone-900/85 backdrop-blur-xs text-white text-[10px] font-body font-medium px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-maritime-orange" />
                            <span>Tersedia Tur 3D</span>
                          </div>
                        ) : (
                          <div className="absolute top-2 left-2 bg-stone-800/80 backdrop-blur-xs text-stone-200 text-[10px] font-body font-medium px-2 py-0.5 rounded shadow-xs">
                            <span>Foto 2D</span>
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs text-stone-700 text-[10px] font-body px-1.5 py-0.5 rounded border border-maritime-border">
                          {kos.views}+ Dilihat
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-0.5 bg-stone-100 text-[10px] font-body text-stone-700 font-medium rounded">
                                {kos.category}
                              </span>
                              <span className="text-[11px] font-body text-stone-500">
                                {kos.type}
                              </span>
                            </div>
                            <div className="flex items-center text-xs font-body text-stone-700">
                              <svg
                                className="w-3.5 h-3.5 text-stone-700 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-semibold text-stone-900">
                                {kos.rating.toFixed(1)}
                              </span>
                              <span className="text-stone-400 text-[11px] ml-1">
                                ({kos.reviews})
                              </span>
                            </div>
                          </div>

                          <h2 className="font-headline text-xl tracking-wide text-maritime-dark group-hover:text-maritime-orange transition-colors leading-snug">
                            {kos.name}
                          </h2>

                          <p className="text-xs text-stone-500 mt-1 flex items-center font-body">
                            <svg
                              className="w-3.5 h-3.5 mr-1 text-stone-500 shrink-0 inline"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                              <path
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </svg>
                            <span className="truncate">{kos.location}</span>
                          </p>

                          {/* Facilities Pills */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {kos.facilities.map((fac, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-stone-50 border border-stone-200 text-stone-600 text-[10px] font-body rounded"
                              >
                                {fac}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price & CTA Buttons */}
                        <div className="mt-3.5 pt-2.5 border-t border-stone-100 flex items-end justify-between gap-3">
                          <div>
                            {kos.discountBadge && (
                              <div className="flex items-center space-x-1.5 mb-0.5">
                                <span className="text-[10px] font-body text-maritime-orange font-semibold">
                                  {kos.discountBadge}
                                </span>
                                {kos.originalPrice && (
                                  <span className="text-[11px] font-body text-stone-400 line-through">
                                    {kos.originalPrice}
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="text-maritime-dark font-body">
                              <span className="font-headline text-2xl text-maritime-dark">
                                {kos.priceLabel}
                              </span>
                              <span className="text-xs text-stone-500"> / bulan</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            {/* Bookmark Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSave(kos.id);
                              }}
                              aria-label="Simpan Kos"
                              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                                isSaved
                                  ? "border-stone-800 text-maritime-orange bg-stone-50"
                                  : "border-maritime-border hover:border-stone-600 text-stone-400"
                              }`}
                            >
                              <svg
                                className="w-4 h-4"
                                fill={isSaved ? "currentColor" : "none"}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                />
                              </svg>
                            </button>

                            {/* Tombol Utama: Lihat Detail */}
                            <Link
                              href={`/kos/${kos.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="bg-maritime-dark hover:bg-stone-800 text-white font-body text-xs font-medium px-3.5 py-2 rounded-md transition-colors shadow-2xs"
                            >
                              Lihat Detail
                            </Link>

                            {/* Tombol Sekunder: Tur 3D (Hanya jika has3dTour bernilai true) */}
                            {kos.has3dTour && (
                              <Link
                                href="/3dgs-demo"
                                onClick={(e) => e.stopPropagation()}
                                className="border border-stone-800 hover:border-maritime-orange text-stone-900 hover:text-maritime-orange text-xs font-body font-medium px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 bg-white shadow-2xs"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-maritime-orange" />
                                <span>Tur 3D</span>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Editorial Pagination Strip */}
          <nav
            aria-label="Navigasi Halaman"
            className="mt-auto px-6 py-3 border-t border-maritime-border bg-white flex items-center justify-between font-body text-xs text-stone-500"
            data-purpose="listings-pagination"
          >
            <span>Halaman 01 dari 64</span>
            <div className="flex items-center space-x-1">
              <button className="w-7 h-7 bg-maritime-dark text-white rounded font-medium flex items-center justify-center cursor-pointer">
                1
              </button>
              <button className="w-7 h-7 hover:bg-stone-100 text-stone-700 rounded flex items-center justify-center border border-maritime-border cursor-pointer">
                2
              </button>
              <button className="w-7 h-7 hover:bg-stone-100 text-stone-700 rounded flex items-center justify-center border border-maritime-border cursor-pointer">
                3
              </button>
              <span className="px-1 text-stone-400">...</span>
              <button className="w-7 h-7 hover:bg-stone-100 text-stone-700 rounded flex items-center justify-center border border-maritime-border cursor-pointer">
                64
              </button>
            </div>
          </nav>
        </section>

        {/* ========================================== */}
        {/* RIGHT COLUMN: Artisanal Radar Map (50%)    */}
        {/* ========================================== */}
        <section
          className="w-full lg:w-1/2 relative bg-[#E8E4DA] flex flex-col h-[520px] lg:h-[calc(100vh-125px)] overflow-hidden select-none border-t lg:border-t-0"
          data-purpose="map-viewport"
        >
          {/* Map Top Control Strip */}
          <div className="z-30 bg-[#f7f3eb]/95 backdrop-blur-sm px-5 py-2.5 border-b border-maritime-border flex items-center justify-between text-xs font-body">
            <div className="flex items-center space-x-2 text-stone-700 font-medium">
              <span>Peta Area Tembalang &amp; Banyumanik</span>
            </div>
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-1.5 cursor-pointer text-xs text-stone-700">
                <input
                  defaultChecked
                  className="rounded border-maritime-border text-maritime-dark focus:ring-0 w-3.5 h-3.5"
                  type="checkbox"
                />
                <span>Cari di area ini saat peta digeser</span>
              </label>
            </div>
          </div>

          {/* Map Area Canvas */}
          <div className="flex-1 relative map-canvas-bg overflow-hidden cursor-grab active:cursor-grabbing">
            {/* Cartographic Visual Elements (Roads, River Curves, Semarang Landmarks) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-50,150 Q300,100 500,280 T900,450"
                fill="none"
                stroke="#D3C9B8"
                strokeLinecap="round"
                strokeWidth="7"
              />
              <path
                d="M-50,150 Q300,100 500,280 T900,450"
                fill="none"
                stroke="#FAF7EE"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <path
                d="M220,0 Q240,260 210,500 T300,900"
                fill="none"
                stroke="#FAF7EE"
                strokeWidth="4"
              />
              <path
                d="M100,600 Q400,520 700,750"
                fill="none"
                stroke="#FAF7EE"
                strokeWidth="3"
              />
              <path
                d="M400,100 L750,200 L680,600"
                fill="none"
                stroke="#D9D0C1"
                strokeDasharray="4,4"
                strokeWidth="2"
              />
              <circle
                cx="520"
                cy="380"
                fill="rgba(20, 23, 25, 0.02)"
                r="160"
                stroke="#5c646d"
                strokeDasharray="5,5"
                strokeWidth="1"
              />
              <circle
                cx="520"
                cy="380"
                fill="none"
                opacity="0.3"
                r="320"
                stroke="#121619"
                strokeDasharray="2,6"
                strokeWidth="0.8"
              />
            </svg>

            {/* Subtle District Watermark Labels in Map Background */}
            <span className="absolute top-12 left-16 font-headline text-3xl text-[#D0C7B6]/70 tracking-widest pointer-events-none select-none">
              BANYUMANIK
            </span>
            <span className="absolute top-1/3 right-1/4 font-headline text-4xl text-[#C9BFAD]/70 tracking-widest pointer-events-none select-none">
              SEMARANG
            </span>
            <span className="absolute bottom-20 left-20 font-headline text-3xl text-[#D0C7B6]/70 tracking-widest pointer-events-none select-none">
              UNGARAN
            </span>
            <span className="absolute top-2/3 right-16 font-headline text-2xl text-[#D5CDBC]/70 tracking-widest pointer-events-none select-none">
              TEMBALANG UNDIP
            </span>

            {/* Static Cluster Nodes */}
            <div className="absolute top-[8%] left-[24%] bg-white border border-stone-300 rounded-full w-7 h-7 flex items-center justify-center font-mono-custom text-xs font-semibold shadow-xs text-stone-700 cursor-pointer hover:scale-105 transition-transform">
              14
            </div>
            <div className="absolute top-[10%] left-[30%] bg-white border border-stone-300 rounded-full w-7 h-7 flex items-center justify-center font-mono-custom text-xs font-semibold shadow-xs text-stone-700 cursor-pointer hover:scale-105 transition-transform">
              10
            </div>
            <div className="absolute top-[15%] left-[56%] bg-white border border-stone-300 rounded-full w-7 h-7 flex items-center justify-center font-mono-custom text-xs font-semibold shadow-xs text-stone-700">
              17
            </div>
            <div className="absolute top-[12%] right-[16%] bg-white border border-stone-300 rounded-full w-7 h-7 flex items-center justify-center font-mono-custom text-xs font-semibold shadow-xs text-stone-700">
              32
            </div>

            {/* Interactive Pins from Kos Data */}
            {filteredList.map((kos) => {
              const isSelected = selectedKosId === kos.id;

              return (
                <div
                  key={`pin-${kos.id}`}
                  style={{ top: kos.mapCoords.top, left: kos.mapCoords.left }}
                  onClick={() => setSelectedKosId(kos.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform hover:scale-105 ${
                    isSelected ? "z-30" : ""
                  }`}
                >
                  <div
                    className={`font-body text-xs font-medium px-2.5 py-1 rounded-full border shadow-xs transition-colors flex items-center gap-1 ${
                      isSelected
                        ? "bg-maritime-dark text-white border-stone-900 shadow-sm"
                        : "bg-white text-stone-800 border-stone-300 hover:border-stone-600"
                    }`}
                  >
                    <span>{kos.priceLabel.replace(".000", "rb")}</span>
                  </div>
                </div>
              );
            })}

            {/* ======================================================= */}
            {/* ACTIVE SELECTED PIN & SCRAPBOOK POPUP CARD              */}
            {/* ======================================================= */}
            {activeKos && (
              <div
                style={{ top: activeKos.mapCoords.top, left: activeKos.mapCoords.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              >
                {/* Active Pin Target Ring */}
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-stone-800/15 animate-ping" />
                  <div className="relative w-6 h-6 rounded-full bg-stone-900 border-2 border-white shadow-md flex items-center justify-center text-white pointer-events-auto cursor-pointer">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                </div>

                {/* Scrapbook Editorial Polaroid Pop-up Card */}
                <div className="mt-2 w-64 bg-white border border-stone-300 rounded-lg p-3 shadow-lg relative pointer-events-auto">
                  {/* Washi tape on top */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#E4D7BE] border border-maritime-border px-3 py-0.5 text-[9px] font-body uppercase tracking-wider text-stone-700 rotate-[-1deg] shadow-2xs rounded-xs">
                    Unit Terpilih
                  </div>

                  <div className="flex gap-2.5 items-center mt-1">
                    <div className="w-16 h-16 bg-stone-100 border border-maritime-border rounded overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={activeKos.name}
                        className="w-full h-full object-cover"
                        src={activeKos.image}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-body text-maritime-orange font-semibold block">
                        {activeKos.subdistrict} • {activeKos.type}
                      </span>
                      <h3 className="font-headline text-base tracking-wide text-maritime-dark truncate">
                        {activeKos.name}
                      </h3>
                      <div className="flex items-baseline space-x-1 mt-0.5">
                        <span className="font-headline text-lg text-maritime-dark leading-none">
                          {activeKos.priceLabel}
                        </span>
                        <span className="text-[10px] font-body text-stone-500">/bln</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center gap-1.5">
                    <Link
                      href={`/kos/${activeKos.id}`}
                      className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-body text-xs font-medium py-1.5 rounded transition-colors text-center"
                    >
                      Detail
                    </Link>
                    {activeKos.has3dTour && (
                      <Link
                        href="/3dgs-demo"
                        className="flex-1 bg-maritime-dark hover:bg-stone-800 text-white font-body text-xs font-medium py-1.5 rounded transition-colors flex items-center justify-center space-x-1 shadow-2xs"
                      >
                        <span>Tur 3D</span>
                        <span>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Floating Map Tool Controls */}
            <div
              className="absolute top-4 right-4 z-20 flex flex-col space-y-2"
              data-purpose="map-controls"
            >
              {/* Layer Switcher */}
              <div className="bg-white border border-maritime-border rounded-md shadow-xs flex flex-col font-body text-[11px] overflow-hidden">
                <button
                  onClick={() => setMapMode("MAP")}
                  className={`px-2.5 py-1 font-medium border-b border-maritime-border text-left cursor-pointer ${
                    mapMode === "MAP"
                      ? "bg-maritime-dark text-white"
                      : "hover:bg-stone-50 text-stone-700"
                  }`}
                >
                  MAP
                </button>
                <button
                  onClick={() => setMapMode("3D")}
                  className={`px-2.5 py-1 font-medium border-b border-maritime-border text-left cursor-pointer ${
                    mapMode === "3D"
                      ? "bg-maritime-dark text-white"
                      : "hover:bg-stone-50 text-stone-700"
                  }`}
                >
                  3D
                </button>
                <button
                  onClick={() => setMapMode("SPL")}
                  className={`px-2.5 py-1 font-medium text-left cursor-pointer ${
                    mapMode === "SPL"
                      ? "bg-maritime-dark text-white"
                      : "hover:bg-stone-50 text-stone-700"
                  }`}
                >
                  SPL
                </button>
              </div>

              {/* Zoom In / Out Controls */}
              <div className="bg-white border border-maritime-border rounded-md shadow-xs flex flex-col overflow-hidden font-body">
                <button
                  onClick={() => setMapZoom((prev) => Math.min(prev + 1, 3))}
                  aria-label="Perbesar Peta"
                  className="w-8 h-8 flex items-center justify-center font-medium text-base hover:bg-stone-50 border-b border-maritime-border text-stone-700 cursor-pointer"
                >
                  +
                </button>
                <button
                  onClick={() => setMapZoom((prev) => Math.max(prev - 1, 1))}
                  aria-label="Perkecil Peta"
                  className="w-8 h-8 flex items-center justify-center font-medium text-base hover:bg-stone-50 text-stone-700 cursor-pointer"
                >
                  -
                </button>
              </div>

              {/* GPS Recenter Button */}
              <button
                onClick={() => setSelectedKosId("kost-grha-gratia-tipe-a")}
                aria-label="Pusatkan ke lokasi saya"
                className="w-8 h-8 bg-white border border-maritime-border rounded-md shadow-xs flex items-center justify-center hover:bg-stone-50 text-stone-700 cursor-pointer"
                title="Pusatkan ke Unit Terpilih"
              >
                <svg
                  className="w-4 h-4 text-maritime-orange"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>

            {/* Map Bottom Technical Bar */}
            <div className="absolute bottom-2 left-3 right-3 bg-white/90 backdrop-blur-xs border border-maritime-border rounded px-3 py-1 flex items-center justify-between text-[10px] font-body text-stone-500">
              <span className="flex items-center space-x-1.5">
                <span className="inline-block w-1.5 h-1.5 bg-stone-700 rounded-full" />
                <span>Skala 1:1.000 • Proyeksi Spasial GS-V2</span>
              </span>
              <span className="hidden sm:inline">
                OpenStreetMap | Open Tempeh Spatial Engine
              </span>
            </div>
          </div>
        </section>
      </main>
      {/* END: Main 50/50 Split Content Area */}

      {/* BEGIN: Editorial Footer */}
      <footer
        className="bg-maritime-darker text-stone-400 border-t border-stone-800 py-3.5 px-4 lg:px-8 font-body text-xs"
        data-purpose="editorial-footer"
      >
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© 2026 OPEN TEMPEH SPATIAL PLATFORM. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-4 text-stone-400">
            <Link className="hover:text-stone-200 transition-colors" href="/landingpage">
              Landing Page
            </Link>
            <span>•</span>
            <Link className="hover:text-stone-200 transition-colors" href="/3dgs-demo">
              Viewer 3DGS
            </Link>
            <span>•</span>
            <Link className="hover:text-stone-200 transition-colors" href="/dashboard">
              Dashboard Mitra
            </Link>
          </div>
        </div>
      </footer>
      {/* END: Editorial Footer */}
    </div>
  );
}
