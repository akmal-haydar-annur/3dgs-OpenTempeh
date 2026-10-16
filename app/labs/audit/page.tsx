"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../../landingpage/landing.css";

// --------------------------------------------------------------------------
// DATA DICTIONARY BASED ON COMPREHENSIVE LANDING PAGE AUDIT
// --------------------------------------------------------------------------

interface ColorToken {
  name: string;
  hex: string;
  usage: string;
  freq: number;
  isOutlier?: boolean;
  notes: string;
}

const COLOR_CLUSTERS: { cluster: string; desc: string; colors: ColorToken[] }[] = [
  {
    cluster: "Klaster Latar Terang (Off-White / Cream)",
    desc: "Terdapat 9 variasi putih/krem berbeda di halaman dengan perbedaan kecerahan tipis (1%-2%).",
    colors: [
      { name: "Pure White (bg-white / text-white)", hex: "#FFFFFF", usage: "Latar kartu, teks pada dark, border badge", freq: 54, notes: "Standar putih murni" },
      { name: "Warm Off-White (bg-[#faf8f4])", hex: "#FAF8F4", usage: "Latar utama hero section baru", freq: 1, isOutlier: true, notes: "Warm paper modern" },
      { name: "Cream Section (bg-[#f8f5ee])", hex: "#F8F5EE", usage: "Latar navbar, seksi masalah & pain points", freq: 3, notes: "Krem seksi klasik" },
      { name: "Maritime Cream (bg-maritime-cream)", hex: "#F7F4ED", usage: "Latar global container halaman", freq: 3, notes: "Krem paper peninggalan" },
      { name: "Warm Card Cream (bg-[#fcfbf7])", hex: "#FCFBF7", usage: "Latar kartu masalah / pain point", freq: 4, notes: "Hampir identik dengan #FCFBF8" },
      { name: "Maritime Warm Card (bg-maritime-warmCard)", hex: "#FCFBF8", usage: "Latar kartu solusi", freq: 4, notes: "Hampir identik dengan #FCFBF7" },
      { name: "Pale Ivory (bg-[#fffcf0])", hex: "#FFFCF0", usage: "Latar sub-kartu perbandingan kos", freq: 1, isOutlier: true, notes: "Outlier seksi komparasi" },
      { name: "Muted Ivory (bg-[#fdf9ee])", hex: "#FDF9EE", usage: "Latar border kartu fitur", freq: 1, isOutlier: true, notes: "Outlier seksi komparasi" },
      { name: "Map Canvas Bg (bg-[#f5f1e8])", hex: "#F5F1E8", usage: "Latar grid canvas peta nautikal", freq: 1, isOutlier: true, notes: "Sisa peninggalan tema peta" },
    ],
  },
  {
    cluster: "Klaster Brand Oranye & Aksen Hangat",
    desc: "Pusat aksen brand OpenTempeh, namun bercampur antara hex #eb5722 dengan utility Tailwind orange.",
    colors: [
      { name: "Brand Orange (#eb5722 / maritime-orange)", hex: "#EB5722", usage: "Aksen utama, hover link, ticker, icon", freq: 57, notes: "Brand primary color resmi" },
      { name: "Maritime Rust (#d14614)", hex: "#D14614", usage: "Hover state tombol oranye lama", freq: 4, notes: "Darker rust hover" },
      { name: "Tailwind Orange-600", hex: "#EA580C", usage: "Aksen rating dan tag benefit", freq: 2, notes: "Utility Tailwind non-token" },
      { name: "Tailwind Orange-500", hex: "#F97316", usage: "Border ring kartu solusi", freq: 2, notes: "Utility Tailwind non-token" },
      { name: "Tailwind Orange-700", hex: "#C2410C", usage: "Border ticker announcement", freq: 1, isOutlier: true, notes: "Outlier border ticker" },
      { name: "Soft Peach Orange (#f79a74)", hex: "#F79A74", usage: "Aksen gradient dekoratif lama", freq: 1, isOutlier: true, notes: "Outlier dekorasi" },
    ],
  },
  {
    cluster: "Klaster Hitam & Abu-abu Gelap (Dark Surfaces)",
    desc: "Terdapat 8 variasi warna gelap/hitam yang bercampur antara hitam arang, hitam pekat, dan navy gelap.",
    colors: [
      { name: "Maritime Dark (#171412)", hex: "#171412", usage: "Teks judul utama, tombol solid, kartu metrik", freq: 39, notes: "Warna arang khas landing page" },
      { name: "Tailwind Stone-900 (#1C1917)", hex: "#1C1917", usage: "Latar kartu dark, teks tebal", freq: 18, notes: "Standar stone Tailwind" },
      { name: "Tailwind Stone-800 (#292524)", hex: "#292524", usage: "Border kartu gelap, shadow neo-brutalist", freq: 15, notes: "Standar stone Tailwind" },
      { name: "Pure Charcoal (#141414)", hex: "#141414", usage: "Teks judul H1 hero section baru", freq: 1, isOutlier: true, notes: "Outlier H1 hero" },
      { name: "Midnight Charcoal (#11161B)", hex: "#11161B", usage: "Latar kartu urgensi penawaran", freq: 1, isOutlier: true, notes: "Outlier seksi penawaran" },
      { name: "Maritime Darker (#100D0B)", hex: "#100D0B", usage: "Latar gelap CSS utilitas lama", freq: 2, notes: "Sisa utility CSS" },
      { name: "Slate Navy (#354B5E / #1C2733)", hex: "#354B5E", usage: "Wadah seksi peninggalan hero lama", freq: 6, notes: "Sisa tema maritim navy" },
    ],
  },
  {
    cluster: "Klaster Abu-abu Netral & Borders",
    desc: "10 variasi border dan abu-abu teks dengan tingkat opacity yang tidak seragam.",
    colors: [
      { name: "Stone 700 (text-stone-700)", hex: "#44403C", usage: "Teks body sekunder & nav links", freq: 20, notes: "Standar body text dark" },
      { name: "Stone 600 (text-stone-600)", hex: "#57534E", usage: "Teks paragraf penjelas & sub-headline", freq: 17, notes: "Muted readable text" },
      { name: "Stone 200 (border-stone-200)", hex: "#E7E5E4", usage: "Border pembatas section & divider", freq: 17, notes: "Garis pemisah lembut" },
      { name: "Stone 400 (text-stone-400)", hex: "#A8A29E", usage: "Teks mikro penjelas & caption", freq: 15, notes: "Subtle caption text" },
      { name: "Stone 300 (border-stone-300)", hex: "#D6D3D1", usage: "Border kartu pain point & underline", freq: 12, notes: "Border medium" },
      { name: "Stone 500 (text-stone-500)", hex: "#78716C", usage: "Teks tanggal & meta data kos", freq: 10, notes: "Mid-gray label" },
      { name: "Stone 100 (bg-stone-100)", hex: "#F5F5F4", usage: "Background pill tag & avatar placeholder", freq: 9, notes: "Soft surface" },
      { name: "Maritime Border (#DED8CB)", hex: "#DED8CB", usage: "Border editorial seksi lama", freq: 5, notes: "Krem abu-abu klasik" },
      { name: "Scrollbar Thumb (#B8B0A2)", hex: "#B8B0A2", usage: "Thumb scrollbar kustom di CSS", freq: 2, notes: "Custom scrollbar" },
      { name: "Static Underline Gray (#D6D3D1)", hex: "#D6D3D1", usage: "Garis bawah statis link Daftar Sekarang", freq: 1, notes: "CSS custom underline" },
    ],
  },
  {
    cluster: "Klaster Aksen Pastel & Status",
    desc: "Warna aksen spesifik yang digunakan pada visual collage hero dan status validasi.",
    colors: [
      { name: "Pastel Sage Green (#A7BEA2)", hex: "#A7BEA2", usage: "Frame kartu foto kamar interior hero", freq: 1, isOutlier: true, notes: "Aksen pastel arsitektural" },
      { name: "Pastel Lavender (#B5A8E8)", hex: "#B5A8E8", usage: "Frame kartu mahasiswi hero", freq: 1, isOutlier: true, notes: "Aksen pastel modern" },
      { name: "Cobalt Blue (#2563EB)", hex: "#2563EB", usage: "Stiker pebble badge '500+ Kos 3DGS'", freq: 1, isOutlier: true, notes: "Pop accent hero" },
      { name: "Amber Status (amber-100/300/900)", hex: "#FDE68A", usage: "Badge peringatan & tipuan foto", freq: 9, notes: "Warning alert" },
      { name: "Emerald Verified (emerald-400/500)", hex: "#34D399", usage: "Indikator centang terverifikasi 1:1", freq: 2, notes: "Success verification" },
      { name: "Red Warning (red-600/700)", hex: "#DC2626", usage: "Indikator kerugian calon penyewa", freq: 2, notes: "Danger alert" },
      { name: "Maritime Teal (#1F6472 / #4FA3B0)", hex: "#1F6472", usage: "Sisa aksen nautikal lama di CSS", freq: 4, notes: "Sisa peninggalan tema" },
    ],
  },
];

const FONT_SPECIMENS = [
  { token: "text-[60px]", px: "60px", em: "3.75rem", freq: 1, isOutlier: true, font: "font-display-modern", weight: "font-extrabold", text: "Temukan dan survei kos impianmu dalam visual 3D nyata!", note: "Breakoint xl pada judul H1 Hero Section" },
  { token: "text-[54px]", px: "54px", em: "3.375rem", freq: 1, isOutlier: true, font: "font-display-modern", weight: "font-extrabold", text: "Temukan dan survei kos impianmu dalam visual 3D nyata!", note: "Breakpoint lg pada judul H1 Hero Section" },
  { token: "text-5xl", px: "48px", em: "3.00rem", freq: 6, font: "font-headline", weight: "font-bold", text: "SURVEI KOS DARI RUMAH DENGAN UKURAN 100% NYATA", note: "Judul display kapital seksi penawaran lama" },
  { token: "text-4xl", px: "36px", em: "2.25rem", freq: 11, font: "font-headline", weight: "font-bold", text: "BOSAN TERTIPU SUDUT LENSA WIDE-ANGLE?", note: "Judul H2 seksi masalah dan seksi fitur" },
  { token: "text-3xl", px: "30px", em: "1.875rem", freq: 17, font: "font-handwriting", weight: "font-bold", text: "Realita Pencarian Kos di Sekitar Kampus", note: "Sub-eyebrow cursive Caveat seksi masalah" },
  { token: "text-2xl", px: "24px", em: "1.50rem", freq: 14, font: "font-display-modern", weight: "font-extrabold", text: "99.8% (Akurasi Skala Dimensi Ruangan 1:1)", note: "Angka besar pada kartu metrik akurasi hero" },
  { token: "text-xl", px: "20px", em: "1.25rem", freq: 3, font: "font-headline", weight: "font-bold", text: "KOST GRHA GRATIA BANDUNG", note: "Nama properti kos pada kartu katalog" },
  { token: "text-lg", px: "18px", em: "1.125rem", freq: 2, font: "font-headline", weight: "font-bold", text: "SPATIAL MARKETPLACE KOS", note: "Sub-judul kartu spesifikasi" },
  { token: "text-base", px: "16px", em: "1.00rem", freq: 7, font: "font-body-modern", weight: "font-normal", text: "OpenTempeh merekonstruksi kamar kos dari rekaman video menjadi model spasial 3D interaktif. Bebas manipulasi sudut lensa kamera.", note: "Teks paragraf utama hero section" },
  { token: "text-sm", px: "14px", em: "0.875rem", freq: 27, font: "font-body", weight: "font-normal", text: "Seluruh kamar dipindai dari rekaman video riil dan diaudit oleh kurator lapangan independen untuk transparansi ukuran fisik.", note: "Teks body paragraf seksi fitur dan testimoni" },
  { token: "text-[13px]", px: "13px", em: "0.8125rem", freq: 1, isOutlier: true, font: "font-body", weight: "font-medium", text: "Masalah & Solusi • Koleksi Kos • Fitur Unggulan • Bukti Nyata", note: "Teks menu navigasi tengah header" },
  { token: "text-xs", px: "12px", em: "0.75rem", freq: 68, font: "font-body", weight: "font-medium", text: "1.200+ Mahasiswa terlindungi dari jebakan foto manipulatif", note: "Teks micro paling sering digunakan di seluruh halaman" },
  { token: "text-[11px]", px: "11px", em: "0.6875rem", freq: 11, font: "font-condensed", weight: "font-bold", text: "AKURASI SKALA RUANGAN 1:1 • BEBAS TIPUAN LENSA KAMERA", note: "Teks pengumuman ticker marquee berjalan" },
  { token: "text-[10px]", px: "10px", em: "0.625rem", freq: 8, font: "font-body-modern", weight: "font-semibold", text: "3.8m × 4.2m Room • Kamar Mandi Dalam • Full Furnished", note: "Badge mikro spesifikasi kamar & metrik lidar" },
];

const SPACING_STEPS = [
  { step: "0.5", px: "2px", em: "0.125rem", freq: 13, note: "Offset mikro garis bawah & badge padding" },
  { step: "1", px: "4px", em: "0.25rem", freq: 14, note: "Gap mikro ikon, padding tag kecil" },
  { step: "1.5", px: "6px", em: "0.375rem", freq: 18, isIrregular: true, note: "Pecahan half-step: gap tombol & badge" },
  { step: "2", px: "8px", em: "0.5rem", freq: 33, note: "Padding tombol kecil, gap flex item" },
  { step: "2.5", px: "10px", em: "0.625rem", freq: 15, isIrregular: true, note: "Pecahan half-step: py ticker announcement" },
  { step: "3", px: "12px", em: "0.75rem", freq: 51, note: "Skala padding paling banyak digunakan" },
  { step: "3.5", px: "14px", em: "0.875rem", freq: 9, isIrregular: true, note: "Pecahan half-step: padding tombol hero" },
  { step: "4", px: "16px", em: "1.0rem", freq: 40, note: "Padding standar card, gap kontainer" },
  { step: "5", px: "20px", em: "1.25rem", freq: 15, note: "Padding widget metrik hero & card" },
  { step: "6", px: "24px", em: "1.5rem", freq: 29, note: "Gap antar tombol aksi, padding container" },
  { step: "7", px: "28px", em: "1.75rem", freq: 6, isIrregular: true, note: "Padding horizontal px-7 tombol hero" },
  { step: "8", px: "32px", em: "2.0rem", freq: 21, note: "Tinggi header h-20, padding seksi py-8" },
  { step: "10", px: "40px", em: "2.5rem", freq: 5, note: "Margin-top seksi mt-10 social proof" },
  { step: "12", px: "48px", em: "3.0rem", freq: 5, note: "Padding py-12 hero mobile & margin mb-12" },
  { step: "14", px: "56px", em: "3.5rem", freq: 9, isIrregular: true, note: "Padding seksi py-14 masalah & pain points" },
  { step: "16", px: "64px", em: "4.0rem", freq: 11, note: "Padding py-16 seksi fitur & gap-16 ticker" },
  { step: "20", px: "80px", em: "5.0rem", freq: 6, note: "Tinggi header h-20 & gap ticker ultrawide" },
  { step: "24", px: "96px", em: "6.0rem", freq: 2, note: "Padding py-24 hero desktop" },
];

const RADIUS_SAMPLES = [
  { token: "rounded-sm", px: "2px", freq: 7, class: "rounded-sm", note: "Badge mikro tag verifikasi" },
  { token: "rounded", px: "4px", freq: 17, class: "rounded", note: "Tombol header & kartu struk lama" },
  { token: "rounded-md", px: "6px", freq: 3, class: "rounded-md", note: "Input newsletter form" },
  { token: "rounded-lg", px: "8px", freq: 11, class: "rounded-lg", note: "Kartu fitur & listing katalog" },
  { token: "rounded-xl", px: "12px", freq: 2, class: "rounded-xl", note: "Tombol utama hero 'Mulai Eksplorasi'" },
  { token: "rounded-2xl", px: "16px", freq: 4, class: "rounded-2xl", note: "Widget dark metrik & pill controller" },
  { token: "rounded-3xl", px: "24px", freq: 2, class: "rounded-3xl", note: "Frame kartu foto kamar & mahasiswi" },
  { token: "rounded-full", px: "9999px", freq: 34, class: "rounded-full", note: "Avatar stack, tag filter, tombol kapsul" },
  { token: "rounded-t-lg", px: "8px atas", freq: 2, class: "rounded-t-lg", note: "Cover foto kartu kos" },
  { token: "rounded-bl-lg / br", px: "8px bawah", freq: 1, isOutlier: true, class: "rounded-bl-lg", note: "Sudut asimetris outlier di seksi solusi" },
  { token: "pebble-shape", px: "Custom CSS", freq: 1, isOutlier: true, class: "pebble-shape", note: "Stiker organik '500+ Kos 3DGS'" },
];

const SHADOW_SAMPLES = [
  { name: "shadow-xs", style: "0 1px 2px rgba(0,0,0,0.05)", freq: 4, class: "shadow-xs", note: "Elevasi mikro tombol border putih" },
  { name: "shadow-sm", style: "0 1px 3px rgba(0,0,0,0.1)", freq: 8, class: "shadow-sm", note: "Kartu pain points & foto frame" },
  { name: "shadow-md", style: "0 4px 6px -1px rgba(0,0,0,0.1)", freq: 6, class: "shadow-md", note: "Kartu katalog kos saat normal" },
  { name: "shadow-lg / xl", style: "0 10px 15px -3px rgba(0,0,0,0.1)", freq: 7, class: "shadow-xl", note: "Widget metrik dark & floating pill" },
  { name: "shadow-2xl", style: "0 25px 50px -12px rgba(0,0,0,0.25)", freq: 2, class: "shadow-2xl", note: "Wadah hero section lama" },
  { name: "Neo-Brutalist 2px", style: "2px 2px 0px #171412", freq: 2, class: "shadow-[2px_2px_0px_#171412]", isOutlier: true, note: "Tombol header 'Cari Kos'" },
  { name: "Neo-Brutalist 4px", style: "4px 4px 0px #171412", freq: 3, class: "shadow-[4px_4px_0px_#171412]", isOutlier: true, note: "Kartu solusi dan keunggulan" },
];

export default function VisualAuditPage() {
  const [activeTab, setActiveTab] = useState<"all" | "colors" | "typography" | "spacing" | "radius" | "transitions" | "components">("all");

  return (
    <div className="bg-[#FAF8F4] text-[#171412] min-h-screen font-body-modern antialiased selection:bg-[#eb5722] selection:text-white pb-32">
      
      {/* ---------------------------------------------------------------------
          HEADER TOOLBAR & DASHBOARD META
          --------------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-orange-100 text-[#eb5722] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eb5722] animate-pulse" />
              <span>LABS • VISUAL AUDIT &amp; DESIGN SYSTEM SPECIMEN</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold font-display-modern text-stone-900 mt-1">
              Audit Token &amp; Sistem Desain Landing Page
            </h1>
            <p className="text-xs text-stone-500 font-body-modern">
              Spektrum visual interaktif dari seluruh 55+ warna, 14 skala font, 19 step spasi, radius, dan bayangan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/landingpage"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
            >
              <span>← Kembali ke Landing Page</span>
            </Link>
            <a
              href="#components"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#171412] hover:bg-stone-800 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <span>Lihat Inkonsistensi Komponen</span>
            </a>
          </div>
        </div>

        {/* Quick Anchor Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-100 flex items-center gap-2 overflow-x-auto py-2 text-xs">
          {[
            { id: "all", label: "Semua Bagian" },
            { id: "colors", label: "1. Swatch Warna (55+ Nilai)" },
            { id: "typography", label: "2. Type Specimen (14 Skala)" },
            { id: "spacing", label: "3. Penggaris Spacing (19 Nilai)" },
            { id: "radius", label: "4. Radius, Border & Shadow" },
            { id: "transitions", label: "5. Durasi Transisi" },
            { id: "components", label: "6. Galeri Komponen Berulang" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[#171412] text-white font-semibold"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* ---------------------------------------------------------------------
          METRICS EXECUTIVE SUMMARY
          --------------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="text-xs text-stone-500 font-medium">Total Warna Unik</div>
            <div className="text-3xl font-extrabold font-display-modern text-[#171412] mt-1">55+</div>
            <div className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded mt-2 inline-block">
              ⚠️ 9 Varian Putih / Krem Mirip
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="text-xs text-stone-500 font-medium">Ukuran Huruf (Font Size)</div>
            <div className="text-3xl font-extrabold font-display-modern text-[#171412] mt-1">14</div>
            <div className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded mt-2 inline-block">
              ⚠️ 5 Ukuran Mikro Sub-14px
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="text-xs text-stone-500 font-medium">Tangga Spacing</div>
            <div className="text-3xl font-extrabold font-display-modern text-[#171412] mt-1">19 Step</div>
            <div className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded mt-2 inline-block">
              ⚠️ 5 Pecahan Half-step (1.5, 2.5, 3.5)
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="text-xs text-stone-500 font-medium">Nilai Outlier ("Kecelakaan")</div>
            <div className="text-3xl font-extrabold font-display-modern text-[#eb5722] mt-1">12 Token</div>
            <div className="text-[11px] text-red-700 bg-red-50 px-2 py-0.5 rounded mt-2 inline-block">
              Hanya Muncul 1–2 Kali
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------
          SECTION 1: COLOR SWATCHES WITH TEXT SAMPLE ON TOP
          --------------------------------------------------------------------- */}
      {(activeTab === "all" || activeTab === "colors") && (
        <section id="colors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="border-b border-stone-200 pb-3 mb-6 flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl font-extrabold font-display-modern text-stone-900">
                1. Swatch Warna dengan Sampel Teks di Atasnya
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Setiap kotak menampilkan warna asli, sampel kontras teks di atasnya, frekuensi pemakaian di kode, dan label outlier.
              </p>
            </div>
            <span className="text-xs font-semibold text-stone-500">5 Klaster Warna</span>
          </div>

          <div className="space-y-10">
            {COLOR_CLUSTERS.map((group, gIdx) => (
              <div key={`cluster-${gIdx}`} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                <div className="mb-4">
                  <h3 className="text-base font-bold font-display-modern text-stone-900">
                    {group.cluster}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                    {group.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.colors.map((c, cIdx) => (
                    <div
                      key={`color-${cIdx}`}
                      className="border border-stone-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between bg-stone-50"
                    >
                      {/* Color Preview Block with Dual Text Overlays */}
                      <div
                        className="h-28 p-3 flex flex-col justify-between relative border-b border-black/5"
                        style={{ backgroundColor: c.hex }}
                      >
                        {/* Outlier Badge */}
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] font-bold font-mono px-2 py-0.5 rounded shadow-xs"
                            style={{
                              backgroundColor: c.hex.toLowerCase() === "#ffffff" ? "#171412" : "#ffffff",
                              color: c.hex.toLowerCase() === "#ffffff" ? "#ffffff" : "#171412",
                            }}
                          >
                            {c.hex}
                          </span>
                          {c.isOutlier && (
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded shadow-xs">
                              ⚠️ Outlier (1x)
                            </span>
                          )}
                        </div>

                        {/* Text Samples on Top of the Color */}
                        <div className="space-y-1">
                          <div
                            className="text-xs font-bold leading-tight"
                            style={{ color: "#171412" }}
                          >
                            Teks Gelap (#171412) di Atas Warna Ini
                          </div>
                          <div
                            className="text-xs font-bold leading-tight"
                            style={{ color: "#FFFFFF", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                          >
                            Teks Putih (#FFFFFF) di Atas Warna Ini
                          </div>
                        </div>
                      </div>

                      {/* Token Details */}
                      <div className="p-3 bg-white space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-900 truncate pr-2">{c.name}</span>
                          <span className="font-mono font-bold px-1.5 py-0.5 rounded text-[11px] bg-stone-100 text-stone-700 shrink-0">
                            {c.freq}x pakai
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono truncate">
                          Fungsi: {c.usage}
                        </div>
                        <div className="text-[10px] text-stone-400 italic">
                          Catatan: {c.notes}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------------
          SECTION 2: TYPE SPECIMEN USING REAL TEXTS FROM LANDING PAGE
          --------------------------------------------------------------------- */}
      {(activeTab === "all" || activeTab === "typography") && (
        <section id="typography" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="border-b border-stone-200 pb-3 mb-6 flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl font-extrabold font-display-modern text-stone-900">
                2. Type Specimen (Menggunakan Teks Asli Landing Page)
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Spesimen 14 skala font riil dari 10px hingga 60px dengan teks kutipan asli dari tiap komponen halaman.
              </p>
            </div>
            <span className="text-xs font-semibold text-stone-500">14 Skala Ukuran</span>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-xs">
            {FONT_SPECIMENS.map((item, idx) => (
              <div key={`type-${idx}`} className="p-5 sm:p-6 hover:bg-stone-50/60 transition-colors">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-stone-900 text-white font-mono text-xs font-bold">
                      {item.token}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      {item.px} • {item.em}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      ({item.font} • {item.weight})
                    </span>
                    {item.isOutlier && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        ⚠️ Outlier (1x)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-orange-100 text-[#eb5722] px-2 py-0.5 rounded">
                      {item.freq}x digunakan
                    </span>
                  </div>
                </div>

                {/* Real Text Render with the exact font and size */}
                <div
                  className={`${item.font} ${item.weight} text-[#171412] leading-tight break-words`}
                  style={{ fontSize: item.px }}
                >
                  {item.text}
                </div>

                <div className="text-[11px] text-stone-500 mt-2 italic">
                  Sumber di Landing: {item.note}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------------
          SECTION 3: SPACING RULER (PENGGARIS SPACING)
          --------------------------------------------------------------------- */}
      {(activeTab === "all" || activeTab === "spacing") && (
        <section id="spacing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="border-b border-stone-200 pb-3 mb-6 flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl font-extrabold font-display-modern text-stone-900">
                3. Penggaris Spacing (Visual Spacing Ruler)
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Perbandingan visual panjang spasi (padding/margin/gap) dari skala 2px (0.5) hingga 96px (24) beserta frekuensi pakainya.
              </p>
            </div>
            <span className="text-xs font-semibold text-stone-500">19 Step Spasi</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            {SPACING_STEPS.map((s, sIdx) => {
              const numPx = parseInt(s.px, 10);
              // Max width proportional bar based on 96px max
              const barWidth = Math.max(numPx * 6, 8);

              return (
                <div key={`spacing-${sIdx}`} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-stone-100 last:border-0 gap-3">
                  {/* Left Label */}
                  <div className="w-48 shrink-0 flex items-center gap-2">
                    <span className="w-12 text-center py-1 rounded bg-stone-100 text-stone-800 font-mono text-xs font-bold">
                      {s.step}
                    </span>
                    <div>
                      <div className="text-xs font-bold font-mono text-stone-900">{s.px} <span className="text-stone-400 font-normal">({s.em})</span></div>
                      <div className="text-[10px] text-stone-500 truncate max-w-[120px]">{s.note}</div>
                    </div>
                  </div>

                  {/* Middle: Visual Bar / Ruler */}
                  <div className="grow flex items-center gap-3">
                    <div
                      className={`h-7 rounded flex items-center justify-end px-2 text-[10px] font-mono text-white font-bold transition-all ${
                        s.isIrregular ? "bg-amber-500 shadow-xs" : "bg-[#171412]"
                      }`}
                      style={{ width: `${Math.min(barWidth, 540)}px` }}
                    >
                      {numPx >= 20 ? s.px : ""}
                    </div>
                    {s.isIrregular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded shrink-0">
                        Pecahan Ganjil (Half-Step)
                      </span>
                    )}
                  </div>

                  {/* Right: Frequency */}
                  <div className="w-24 text-right shrink-0">
                    <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-stone-100 text-stone-700">
                      {s.freq}x pakai
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------------
          SECTION 4: RADIUS, BORDER & SHADOW SAMPLES SIDE-BY-SIDE
          --------------------------------------------------------------------- */}
      {(activeTab === "all" || activeTab === "radius") && (
        <section id="radius" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="border-b border-stone-200 pb-3 mb-6 flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl font-extrabold font-display-modern text-stone-900">
                4. Sampel Radius, Border &amp; Shadow Berdampingan
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Membandingkan kurvatur sudut, ketebalan border, dan elevasi bayangan (soft shadow vs neo-brutalist shadow).
              </p>
            </div>
            <span className="text-xs font-semibold text-stone-500">Side-by-Side Specimen</span>
          </div>

          {/* 4A. Border Radius Samples */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs mb-8">
            <h3 className="text-base font-bold font-display-modern text-stone-900 mb-4">
              A. 10 Tingkat Border Radius Berdampingan
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {RADIUS_SAMPLES.map((r, rIdx) => (
                <div key={`rad-${rIdx}`} className="flex flex-col items-center text-center p-3 border border-stone-200 rounded-xl bg-stone-50">
                  <div
                    className={`w-20 h-20 bg-[#171412] text-white flex items-center justify-center text-[10px] font-mono font-bold shadow-sm mb-3 ${r.class}`}
                  >
                    {r.token}
                  </div>
                  <div className="font-mono font-bold text-xs text-stone-900">{r.token}</div>
                  <div className="text-[11px] text-stone-500 font-mono">{r.px}</div>
                  <div className="text-[10px] text-stone-400 mt-1">{r.note}</div>
                  <div className="mt-2 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">
                    {r.freq}x pakai
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4B. Shadows: Soft Modern vs Neo-Brutalist Hard Shadow */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <h3 className="text-base font-bold font-display-modern text-stone-900 mb-2">
              B. Variasi Bayangan (Soft Minimalist vs Neo-Brutalist Hard Edge)
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Perhatikan ketidaksinkronan estetika antara seksi Hero (bayangan lembut) dengan seksi Solusi/Header (bayangan blok hitam 2px/4px).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SHADOW_SAMPLES.map((sh, shIdx) => (
                <div
                  key={`sh-${shIdx}`}
                  className={`p-5 rounded-xl border border-stone-800 bg-white flex flex-col justify-between ${sh.class}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs font-mono text-stone-900">{sh.name}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-stone-100 font-bold">
                        {sh.freq}x
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-stone-500 break-words mb-2">
                      {sh.style}
                    </div>
                    <div className="text-xs text-stone-600 font-body-modern">
                      {sh.note}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400">Efek Visual:</span>
                    <span className={`font-semibold ${sh.isOutlier ? "text-amber-700" : "text-stone-800"}`}>
                      {sh.isOutlier ? "Neo-Brutalist" : "Soft Modern"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------------
          SECTION 5: TRANSITION DURATION PLAYGROUND
          --------------------------------------------------------------------- */}
      {(activeTab === "all" || activeTab === "transitions") && (
        <section id="transitions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="border-b border-stone-200 pb-3 mb-6 flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl font-extrabold font-display-modern text-stone-900">
                5. Durasi Transisi (Interactive Hover Timing Playground)
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Arahkan kursor ke tiap kotak di bawah untuk merasakan langsung perbedaan respon timing animasi (150ms s.d. 500ms).
              </p>
            </div>
            <span className="text-xs font-semibold text-stone-500">5 Pilihan Durasi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { token: "duration-150", ms: "150ms", freq: 2, class: "duration-150", note: "Tombol Cari Kos di header", role: "Snappy / Instant" },
              { token: "duration-200", ms: "200ms", freq: 9, class: "duration-200", note: "Tombol hero Mulai Eksplorasi", role: "Recommended Micro-interaction ⭐" },
              { token: "0.25s (CSS)", ms: "250ms", freq: 3, class: "transition-all duration-[250ms]", note: "Animated sliding underline di CSS", role: "Medium Subtle" },
              { token: "duration-300", ms: "300ms", freq: 7, class: "duration-300", note: "Card scaling & sweep underline", role: "Recommended Macro-interaction ⭐" },
              { token: "duration-500", ms: "500ms", freq: 3, class: "duration-500", note: "Accordion & collapse FAQ", role: "Slow / Cinematic" },
            ].map((t, tIdx) => (
              <div
                key={`trans-${tIdx}`}
                className="group p-5 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between cursor-pointer hover:border-[#eb5722] hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-xs text-stone-900">{t.token}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 font-bold">{t.freq}x</span>
                  </div>
                  <div className="text-2xl font-extrabold font-display-modern text-[#171412]">{t.ms}</div>
                  <div className="text-[11px] text-stone-500 mt-1">{t.note}</div>
                </div>

                {/* Interactive Trigger Element */}
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <div className="text-[10px] text-stone-400 mb-2 font-mono">UJI HOVER KE SINI ↓</div>
                  <div
                    className={`w-full py-2.5 rounded-lg bg-stone-900 group-hover:bg-[#eb5722] text-white text-center text-xs font-bold transition-all group-hover:-translate-y-1 ${t.class}`}
                  >
                    Hover Me ({t.ms})
                  </div>
                  <div className="text-[10px] text-center text-stone-500 font-medium mt-2">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------------
          SECTION 6: INCONSISTENT REPEATING COMPONENTS GALLERY
          --------------------------------------------------------------------- */}
      {(activeTab === "all" || activeTab === "components") && (
        <section id="components" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="border-b border-stone-200 pb-3 mb-6 flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl font-extrabold font-display-modern text-stone-900">
                6. Galeri Komponen Berulang &amp; Inkonsistensi Variasi
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Perbandingan berdampingan dari variasi implementasi Button, Card, Badge, dan Section Header yang ada di halaman saat ini.
              </p>
            </div>
            <span className="text-xs font-semibold text-stone-500">Component Inventory</span>
          </div>

          <div className="space-y-12">
            
            {/* 6A. Buttons Variations */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="mb-4">
                <span className="text-xs font-mono font-bold text-[#eb5722] uppercase tracking-wider">KOMPONEN 1: BUTTON &amp; ACTION</span>
                <h3 className="text-lg font-bold font-display-modern text-stone-900 mt-0.5">
                  4 Variasi Tombol Berbeda di Satu Halaman
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Variant 1: Header Cari Kos */}
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-800">Variasi A (Header 'Cari Kos')</div>
                    <div className="text-[10px] text-stone-500 font-mono mb-3">Neo-Brutalist Hard Shadow</div>
                    <div className="my-4 flex items-center justify-center">
                      <div className="px-4 py-2 text-xs font-condensed font-bold uppercase tracking-wider text-stone-900 bg-white border border-stone-800 rounded shadow-[2px_2px_0px_#171412]">
                        Cari Kos →
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-stone-500 border-t border-stone-200 pt-2 font-mono">
                    Font: Oswald (all-caps) • Radius: 4px • Shadow: Hard 2px
                  </div>
                </div>

                {/* Variant 2: Hero Primary */}
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-800">Variasi B (Hero 'Mulai Eksplorasi')</div>
                    <div className="text-[10px] text-stone-500 font-mono mb-3">Modern Minimalist Rounded</div>
                    <div className="my-4 flex items-center justify-center">
                      <div className="px-6 py-3 rounded-xl bg-[#171412] text-white font-body-modern font-semibold text-xs shadow-sm">
                        Mulai Eksplorasi
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-stone-500 border-t border-stone-200 pt-2 font-mono">
                    Font: Plus Jakarta Sans • Radius: 12px • Shadow: Soft
                  </div>
                </div>

                {/* Variant 3: Newsletter Button */}
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-800">Variasi C (Newsletter CTA)</div>
                    <div className="text-[10px] text-stone-500 font-mono mb-3">Vibrant Orange Sharp Box</div>
                    <div className="my-4 flex items-center justify-center">
                      <div className="px-5 py-2.5 rounded bg-[#eb5722] text-white font-condensed font-bold text-xs uppercase tracking-wider">
                        Berlangganan
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-stone-500 border-t border-stone-200 pt-2 font-mono">
                    Font: Oswald • Radius: 4px • Warna: #eb5722
                  </div>
                </div>

                {/* Variant 4: Card Action */}
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-800">Variasi D (Katalog 'Lihat Detail')</div>
                    <div className="text-[10px] text-stone-500 font-mono mb-3">Full-Width Border Box</div>
                    <div className="my-4 flex items-center justify-center">
                      <div className="w-full py-2 rounded font-condensed font-bold text-xs uppercase tracking-wider text-center bg-white border border-stone-800">
                        Lihat Detail 3D
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-stone-500 border-t border-stone-200 pt-2 font-mono">
                    Font: Oswald • Radius: 4px • Border: 1px black
                  </div>
                </div>

              </div>
            </div>

            {/* 6B. Cards Variations */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="mb-4">
                <span className="text-xs font-mono font-bold text-[#eb5722] uppercase tracking-wider">KOMPONEN 2: CARD CONTAINER</span>
                <h3 className="text-lg font-bold font-display-modern text-stone-900 mt-0.5">
                  Variasi Card Antarseksi yang Bertabrakan Bahasa Desainnya
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Card 1: Soft Modern (Hero) */}
                <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-md flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">Hero Card (Modern)</span>
                    <h4 className="font-display-modern font-bold text-stone-900 text-base mt-2">Soft Rounded 2xl</h4>
                    <p className="text-xs text-stone-600 font-body-modern mt-1 leading-relaxed">
                      Menggunakan radius 16px (2xl), bayangan lembut, dan border stone-200 yang bersih.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-stone-100 text-[10px] font-mono text-stone-400">
                    Radius: 16px • Shadow: Soft sm/md
                  </div>
                </div>

                {/* Card 2: Neo-Brutalist (Solusi) */}
                <div className="p-6 rounded-lg bg-white border border-stone-800 shadow-[4px_4px_0px_#171412] flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Seksi Solusi (Retro)</span>
                    <h4 className="font-headline font-bold text-stone-900 text-lg mt-2 uppercase tracking-wide">Hard Shadow 4px</h4>
                    <p className="text-xs text-stone-600 font-body mt-1 leading-relaxed">
                      Menggunakan bayangan blok hitam pekat 4px dan border tebal 1px stone-800.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-stone-200 text-[10px] font-mono text-stone-400">
                    Radius: 8px • Shadow: [4px_4px_0px_#171412]
                  </div>
                </div>

                {/* Card 3: Dark Surface (Penawaran) */}
                <div className="p-6 rounded-xl bg-[#171412] text-white border border-stone-800 shadow-xl flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-950 text-[#eb5722] border border-[#eb5722]/30">Dark Surface</span>
                    <h4 className="font-display-modern font-bold text-white text-base mt-2">Dark Charcoal Metric</h4>
                    <p className="text-xs text-stone-400 font-body-modern mt-1 leading-relaxed">
                      Latar belakang #171412 dengan kontras angka putih 99.8% dan aksen oranye.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-stone-800 text-[10px] font-mono text-stone-500">
                    Radius: 16px • Shadow: xl
                  </div>
                </div>

              </div>
            </div>

            {/* 6C. Section Header Variations */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="mb-4">
                <span className="text-xs font-mono font-bold text-[#eb5722] uppercase tracking-wider">KOMPONEN 3: SECTION HEADER</span>
                <h3 className="text-lg font-bold font-display-modern text-stone-900 mt-0.5">
                  Disonansi Tipografi: Clean Modern vs Vintage Cursive Script
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                
                {/* Header Style 1: New Hero Style */}
                <div className="p-6 rounded-xl border border-stone-200 bg-[#FAF8F4]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">Style 1: Clean Editorial Modern (Hero)</span>
                  <div className="space-y-1">
                    <h4 className="text-2xl font-extrabold font-display-modern text-stone-900 tracking-tight leading-tight">
                      Temukan dan survei kos impianmu dalam visual 3D nyata!
                    </h4>
                    <p className="text-xs text-stone-600 font-body-modern leading-relaxed pt-1">
                      Menggunakan Plus Jakarta Sans (natural case), tanpa tulisan sambung, bernuansa produk teknologi masa kini.
                    </p>
                  </div>
                </div>

                {/* Header Style 2: Old Pain Points & Testimonial Style */}
                <div className="p-6 rounded-xl border border-stone-200 bg-[#F8F5EE]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">Style 2: Vintage Retro (Seksi Masalah &amp; Katalog)</span>
                  <div className="space-y-0.5">
                    <span className="font-handwriting text-2xl text-[#eb5722] block leading-none">
                      Realita Pencarian Kos
                    </span>
                    <h4 className="text-2xl font-headline uppercase tracking-tight text-stone-900 leading-none">
                      BOSAN TERTIPU SUDUT LENSA WIDE-ANGLE?
                    </h4>
                    <p className="text-xs text-stone-600 font-body leading-relaxed pt-2">
                      Menggunakan kombinasi font tulisan tangan sambung Caveat dan font poster kapital penuh Bebas Neue.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------------
          FOOTER REFERENCE LINK
          --------------------------------------------------------------------- */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center text-xs text-stone-400 font-body-modern">
        <p>Laporan audit desain statis ini digenerate secara otomatis berdasarkan file dokumen <Link href="/laporan_audit_desain.md" className="underline hover:text-stone-700">laporan_audit_desain.md</Link>.</p>
        <p className="mt-1">Dapat diakses melalui URL: <code className="bg-stone-200/80 px-1.5 py-0.5 rounded text-stone-800">/labs/audit</code> atau <code className="bg-stone-200/80 px-1.5 py-0.5 rounded text-stone-800">/audit-visual</code></p>
      </footer>

    </div>
  );
}
