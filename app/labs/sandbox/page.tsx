"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./sandbox.css";

const TICKER_ITEMS = [
  "AKURASI SKALA RUANGAN 1:1",
  "BEBAS TIPUAN LENSA KAMERA",
  "CUKUP REKAM VIDEO DARI HP",
  "100% TERVERIFIKASI LAPANGAN",
  "JARAK JALAN KAKI ASLI KE KAMPUS",
];

export default function SandboxLandingPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // 3x repetisi per grup menjamin lebar grup > 4.000px (melebihi layar 4K/Ultrawide)
  // sehingga tidak akan pernah ada celah kosong pada layar monitor apapun saat berputar
  const tickerSequence = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="bg-maritime-cream text-maritime-dark font-body antialiased selection:bg-[#eb5722] selection:text-white paper-texture min-h-screen">

      {/* =========================================================================
          ANNOUNCEMENT TICKER (Vibrant Orange, No Emojis, Clean Typography)
          ========================================================================= */}
      <aside
        aria-label="Standar Mutu Layanan"
        className="bg-maritime-orange text-white text-xs font-condensed font-bold tracking-wider uppercase overflow-hidden py-2.5 border-b border-orange-700 shadow-inner select-none"
      >
        <div className="ticker-track flex items-center">
          {/* Group 1 (Lebar > 4000px, lebih lebar dari resolusi layar apapun) */}
          <div className="flex items-center gap-16 sm:gap-20 pr-16 sm:pr-20 shrink-0">
            {tickerSequence.map((text, idx) => (
              <span key={`ticker-g1-${idx}`}>{text}</span>
            ))}
          </div>
          {/* Group 2 (Klon identik untuk seamless infinite loop sempurna) */}
          <div className="flex items-center gap-16 sm:gap-20 pr-16 sm:pr-20 shrink-0" aria-hidden="true">
            {tickerSequence.map((text, idx) => (
              <span key={`ticker-g2-${idx}`}>{text}</span>
            ))}
          </div>
        </div>
      </aside>

      {/* =========================================================================
          HEADER (Left Brand Logo, Center Navigation, Right Actions)
          ========================================================================= */}
      <header className="border-b border-maritime-border bg-[#f8f5ee]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 relative flex items-center justify-between">

          {/* 1. Left: Brand Logo (OPEN TEMPEH) */}
          <Link
            className="flex items-center space-x-2 text-2xl sm:text-3xl font-headline tracking-wider text-maritime-dark hover:opacity-90 transition-opacity shrink-0 z-10"
            href="/landingpage"
          >
            <span>OPEN</span>
            <span className="inline-flex items-center justify-center text-maritime-orange">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3.6" />
                <circle cx="6" cy="9" opacity="0.65" r="2.2" />
                <circle cx="18" cy="8" opacity="0.75" r="2.4" />
                <circle cx="8" cy="17" opacity="0.6" r="2.1" />
                <circle cx="16" cy="16" opacity="0.8" r="2.5" />
                <path
                  d="M6 9l6 3 6-4M8 17l4-5 4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="2 2"
                  strokeWidth="1.2"
                />
              </svg>
            </span>
            <span>TEMPEH</span>
          </Link>

          {/* 2. Center: 4 Nav Links (Title Case, Space Grotesk, Editorial Animated Underline) */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-7 lg:space-x-8 text-sm font-body-modern font-medium text-stone-700"
          >
            <a className="nav-editorial-link" href="#masalah">
              Masalah &amp; Solusi
            </a>
            <a className="nav-editorial-link" href="#katalog">
              Koleksi Kos
            </a>
            <a className="nav-editorial-link" href="#keunggulan">
              Fitur Unggulan
            </a>
            <a className="nav-editorial-link" href="#testimoni">
              Bukti Nyata
            </a>
          </nav>

          {/* 3. Right: Action Buttons (Login Link + Spotlighted Cari Kos CTA) */}
          <div className="flex items-center space-x-3 sm:space-x-5 shrink-0 z-10">
            <Link
              href="/dashboard"
              className="text-sm font-body-modern font-medium text-stone-600 hover:text-[#171412] transition-colors px-2 py-1.5"
            >
              Login
            </Link>
            <Link
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-body-modern font-semibold text-white bg-[#eb5722] hover:bg-[#d14614] rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0"
              href="/search"
            >
              <span>Cari Kos</span>
              <svg className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================================
          [1. HERO SECTION - TOTAL REDESIGN]
          Clean, Airy Neo-Modern Minimalist Layout Inspired by Reference
          Modern Geometric Display Typography, Real-Life 3DGS Spatial Collage
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[#faf8f4] border-b border-stone-200/60" data-purpose="hero-section">
        {/* Subtle decorative glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-orange-100/40 via-amber-50/20 to-transparent rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* ---------------------------------------------------------------
                LEFT COLUMN: Punchy Modern Headline, Persuasive Subtext, CTAs
                --------------------------------------------------------------- */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center z-10">

              {/* Main Headline (Clean Sentence Case, Ultra-Bold, Modern Sans) */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-[#171412] font-display-modern tracking-[-0.03em] leading-[1.08]">
                Temukan dan survei kos impianmu dalam visual 3D nyata!
              </h1>

              {/* Sub-headline: Clear & Persuasive */}
              <p className="mt-6 text-stone-600 font-body-modern text-base sm:text-lg leading-relaxed max-w-xl">
                OpenTempeh merekonstruksi kamar kos dari rekaman video menjadi model spasial 3D interaktif. Bebas manipulasi sudut lensa kamera, rasakan skala dimensi 1:1 sebelum survei langsung.
              </p>

              {/* Action Buttons: Primary Solid Button + Clean Non-Button Text Link */}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link
                  href="#katalog"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[#171412] text-white font-body-modern font-semibold text-sm sm:text-base hover:bg-stone-800 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  Mulai Eksplorasi
                </Link>
                <Link
                  href="/dashboard"
                  className="group relative inline-flex items-center text-stone-800 hover:text-[#eb5722] font-body-modern font-semibold text-sm sm:text-base py-2 transition-colors duration-200"
                >
                  <span>Daftar Sekarang</span>
                  {/* Baseline static underline */}
                  <span className="absolute left-0 bottom-0.5 w-full h-[2px] bg-stone-300 rounded-full pointer-events-none" />
                  {/* Animated hover underline that sweeps and changes color to vibrant orange */}
                  <span className="absolute left-0 bottom-0.5 w-0 h-[2px] bg-[#eb5722] rounded-full transition-all duration-300 ease-out group-hover:w-full pointer-events-none" />
                </Link>
              </div>

              {/* Micro Social Proof Stack */}
              <div className="mt-10 pt-6 border-t border-stone-200/80 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Mahasiswa 1"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Mahasiswa 2"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="Mahasiswa 3"
                  />
                  <div className="h-8 w-8 rounded-full bg-stone-100 ring-2 ring-white flex items-center justify-center text-xs font-bold text-stone-700">
                    +1.2k
                  </div>
                </div>
                <div className="text-xs text-stone-500 font-body-modern">
                  <span className="font-semibold text-stone-800">1.200+ Mahasiswa</span> terlindungi dari jebakan foto manipulatif
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                RIGHT COLUMN: Layered Geometric Collage with Micro-Widgets
                --------------------------------------------------------------- */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] sm:max-w-[540px] h-[480px] sm:h-[530px]">

                {/* 1. TOP-LEFT CARD: Aesthetic Room with Soft Sage Green Pastel Frame */}
                <div className="absolute top-4 left-2 sm:left-4 w-[240px] sm:w-[280px] h-[260px] sm:h-[300px] rounded-3xl p-3 bg-[#a7bea2] shadow-sm transition-transform duration-300 hover:scale-[1.02] z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
                    alt="Kamar kos pencahayaan alami"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                {/* 2. TOP-RIGHT FLOATING DARK METRIC WIDGET (Total Accuracy) */}
                <div className="absolute top-0 right-2 sm:right-6 z-30 bg-[#171412] text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-stone-800 w-[180px] sm:w-[205px] transition-transform duration-300 hover:-translate-y-1">
                  <div className="text-xs text-stone-400 font-body-modern font-medium">
                    Akurasi Dimensi
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-2xl sm:text-3xl font-extrabold font-display-modern text-white tracking-tight">
                      99.8%
                    </span>
                    <span className="text-xs text-[#eb5722] font-semibold">
                      Skala 1:1
                    </span>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-[#eb5722]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                      Verified by 3DGS
                    </span>
                  </div>
                </div>

                {/* 3. BOTTOM-RIGHT CARD: Student with Soft Lavender Pastel Frame */}
                <div className="absolute bottom-4 right-2 sm:right-6 w-[230px] sm:w-[270px] h-[250px] sm:h-[290px] rounded-3xl p-3 bg-[#b5a8e8] shadow-sm transition-transform duration-300 hover:scale-[1.02] z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/hero-student.jpg"
                    alt="Mahasiswa senang survei kos interaktif dari smartphone"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                {/* 4. FLOATING INTERACTIVE SPATIAL CONTROLLER PILL (Audio Waveform Equivalent) */}
                <div className="absolute left-0 sm:left-2 top-[220px] sm:top-[260px] z-30 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-stone-200/90 flex items-center gap-3.5 transition-transform duration-300 hover:-translate-y-1">
                  {/* Play / 3D Orbit Icon Button */}
                  <div className="w-9 h-9 rounded-full bg-[#171412] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Real-Scale Measurement Waveform Bars */}
                  <div className="flex items-center gap-1 h-6">
                    <span className="w-1 bg-stone-900 h-2.5 rounded-full" />
                    <span className="w-1 bg-stone-900 h-4 rounded-full" />
                    <span className="w-1 bg-[#eb5722] h-6 rounded-full animate-pulse" />
                    <span className="w-1 bg-stone-900 h-3.5 rounded-full" />
                    <span className="w-1 bg-stone-900 h-5 rounded-full" />
                    <span className="w-1 bg-[#eb5722] h-6 rounded-full" />
                    <span className="w-1 bg-stone-900 h-4 rounded-full" />
                    <span className="w-1 bg-stone-900 h-2 rounded-full" />
                  </div>

                  {/* Dimension Label */}
                  <div className="border-l border-stone-200 pl-3">
                    <div className="text-xs font-bold font-display-modern text-stone-900 leading-tight">
                      360° Real-Scale
                    </div>
                    <div className="text-xs text-stone-500 font-body-modern">
                      3.8m × 4.2m Room
                    </div>
                  </div>
                </div>

                {/* 5. ENERGETIC ORANGE ZIG-ZAG GEOMETRIC ACCENT */}
                <div className="absolute left-[34%] sm:left-[36%] bottom-[80px] sm:bottom-[95px] z-20 pointer-events-none">
                  <svg className="w-24 h-16 sm:w-32 sm:h-20 text-[#eb5722] drop-shadow-sm" viewBox="0 0 100 60" fill="currentColor">
                    <path d="M0,0 L90,0 L50,22 L85,22 L10,60 L45,35 L15,35 Z" />
                  </svg>
                </div>

                {/* 6. ORGANIC PEBBLE BADGE (Cobalt Blue 500+ Splat Badge) */}
                <div className="absolute -bottom-2 -right-1 sm:-right-3 z-30 bg-[#2563eb] text-white px-4 py-3.5 pebble-shape shadow-lg flex flex-col items-center justify-center text-center transition-transform duration-300 hover:rotate-3 select-none">
                  <span className="text-base sm:text-lg font-extrabold font-display-modern leading-none">
                    500+
                  </span>
                  <span className="text-xs font-body-modern font-medium leading-tight mt-0.5">
                    Kos 3DGS
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          [2. PAIN POINT / MASALAH AUDIENS]
          Bosan dengan Masalah Utama Konsumen? Atau sering mengalami ini?
          3 Poin Masalah Spesifik yang Bikin Konsumen Frustrasi & Rugi
          ========================================================================= */}
      <section
        className="border-y border-stone-200/90 bg-[#faf8f4] py-14 sm:py-20"
        data-purpose="pain-points"
        id="masalah"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sub-header Masalah */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171412] font-display-modern tracking-tight leading-tight">
              Bosan Tertipu Sudut Lensa Wide-Angle?
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-3 font-body-modern leading-relaxed max-w-xl mx-auto">
              Tiga kendala klasik yang paling sering menguras waktu, tenaga, dan biaya Anda:
            </p>
          </div>

          {/* 3 Poin Masalah Spesifik (Minimalis, Seragam, Efek Hover Halus) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Masalah 1: Distorsi Visual */}
            <div className="group bg-white border border-stone-200/90 p-7 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-stone-300 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                  <span className="font-mono-custom text-xs font-bold text-stone-400 group-hover:text-[#eb5722] transition-colors">
                    [ 01 ]
                  </span>
                  <span className="font-mono-custom text-xs text-stone-400 uppercase tracking-wider">
                    Distorsi Visual
                  </span>
                </div>
                <h3 className="font-display-modern font-bold text-lg sm:text-xl text-[#171412] mt-4 leading-snug">
                  Kamar Luas di Foto, Aslinya Sempit &amp; Pengap
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed font-body-modern">
                  Lensa ultra-wide ekstrem membuat kamar 2x3 meter tampak seperti kamar hotel berbintang. Saat tiba di lokasi fisik, ruang gerak bahkan tidak cukup untuk membuka koper.
                </p>
              </div>
            </div>

            {/* Masalah 2: Pemborosan Biaya & Waktu */}
            <div className="group bg-white border border-stone-200/90 p-7 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-stone-300 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                  <span className="font-mono-custom text-xs font-bold text-stone-400 group-hover:text-[#eb5722] transition-colors">
                    [ 02 ]
                  </span>
                  <span className="font-mono-custom text-xs text-stone-400 uppercase tracking-wider">
                    Waktu &amp; Biaya
                  </span>
                </div>
                <h3 className="font-display-modern font-bold text-lg sm:text-xl text-[#171412] mt-4 leading-snug">
                  Habis Ongkos &amp; Waktu untuk Survei Zonk
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed font-body-modern">
                  Harus meluangkan cuti kerja atau izin kuliah dan menghabiskan jutaan rupiah transportasi luar kota hanya untuk mendapati fasilitas riil tidak sesuai dengan foto iklan.
                </p>
              </div>
            </div>

            {/* Masalah 3: Ilusi Panorama 360 */}
            <div className="group bg-white border border-stone-200/90 p-7 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-stone-300 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                  <span className="font-mono-custom text-xs font-bold text-stone-400 group-hover:text-[#eb5722] transition-colors">
                    [ 03 ]
                  </span>
                  <span className="font-mono-custom text-xs text-stone-400 uppercase tracking-wider">
                    Ilusi Panorama
                  </span>
                </div>
                <h3 className="font-display-modern font-bold text-lg sm:text-xl text-[#171412] mt-4 leading-snug">
                  Tur 360° Biasa yang Buram &amp; Melengkung
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed font-body-modern">
                  Tur virtual panorama konvensional seringkali buram dan terdistorsi seperti cermin sirkus tanpa kedalaman ruang riil, sehingga mustahil mengukur skala perabot secara akurat.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          [3. SOLUSI & PENAWARAN PRODUK]
          Kenalkan OpenTempeh - Solusi Praktis untuk Tujuan Konsumen
          Paragraf Solusi + Katalog Showcase (Sesuai Referensi)
          ========================================================================= */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16"
        data-purpose="solusi-dan-penawaran"
        id="katalog"
      >
        {/* Sub-header Solusi & Paragraf */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-maritime-border gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display-modern font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#171412] leading-snug">
              Kenalkan OpenTempeh - Solusi Praktis Menemukan Kos Idaman Tanpa Drama
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-body-modern">
              OpenTempeh hadir sebagai jawaban telak atas semua masalah di atas. Melalui rekonstruksi spasial 3D dari rekaman ponsel biasa, Anda dapat melangkah masuk ke dalam kamar, memeriksa setiap sudut perabot, serta memastikan pencahayaan nyata langsung dari layar Anda sebelum memesan.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/search"
              className="group inline-flex items-center gap-2 bg-[#eb5722] hover:bg-[#d14614] text-white px-5 py-3 rounded-xl font-body-modern font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Jelajah Semua Unit</span>
              <svg className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Product Catalog Cards (Format 3 Kolom Modern & Konsisten) */}
        {/* Product Catalog Cards (Format 3 Kolom Modern Berstandar Industri) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 001: Semarang */}
          <div className="group bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Media Header (Full-Bleed Bersih Tanpa Badge) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Kost Grha Gratia Semarang Tipe A"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
                />
              </div>

              {/* Detail Konten Hunian */}
              <div className="p-5">
                {/* Metadata Lokasi (Tanpa Pill, Elegan & Rapi) */}
                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium font-body-modern">
                  <svg className="w-3.5 h-3.5 text-[#eb5722] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Tembalang, Semarang</span>
                </div>

                {/* Judul Properti (Warna Statis Tanpa Perubahan Warna Saat Hover) */}
                <h3 className="font-display-modern font-bold text-lg text-[#171412] mt-1.5 leading-snug">
                  Kost Grha Gratia Tipe A
                </h3>

                {/* Spesifikasi Fasilitas Kamar */}
                <div className="flex items-center gap-2 text-xs text-stone-500 font-body-modern mt-2 pb-4 border-b border-stone-100">
                  <span className="font-medium text-stone-700">Putri</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span>KM Dalam</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span>AC</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span>Wi-Fi</span>
                </div>
              </div>
            </div>

            {/* Footer Transaksi & Aksi 3D */}
            <div className="px-5 pb-5 pt-0 flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] text-stone-400 font-body-modern font-medium leading-none">Mulai dari</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-display-modern font-extrabold text-lg sm:text-xl text-[#171412]">Rp 1.555.000</span>
                  <span className="text-xs text-stone-500 font-normal">/bln</span>
                </div>
              </div>
              <Link
                href="/kos/kost-grha-gratia-tipe-a"
                className="inline-flex items-center gap-1.5 bg-[#171412] text-white px-4 py-2.5 rounded-xl text-xs font-semibold font-body-modern transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 shrink-0"
              >
                <span>Buka Tur 3D</span>
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 002: Bandung */}
          <div className="group bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Media Header (Full-Bleed Bersih Tanpa Badge) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Kost Pods Dago Sanctuary Modern Room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
                />
              </div>

              {/* Detail Konten Hunian */}
              <div className="p-5">
                {/* Metadata Lokasi (Tanpa Pill, Elegan & Rapi) */}
                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium font-body-modern">
                  <svg className="w-3.5 h-3.5 text-[#eb5722] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Coblong, Bandung</span>
                </div>

                {/* Judul Properti (Warna Statis Tanpa Perubahan Warna Saat Hover) */}
                <h3 className="font-display-modern font-bold text-lg text-[#171412] mt-1.5 leading-snug">
                  Kost Pods Dago Sanctuary
                </h3>

                {/* Spesifikasi Fasilitas Kamar */}
                <div className="flex items-center gap-2 text-xs text-stone-500 font-body-modern mt-2 pb-4 border-b border-stone-100">
                  <span className="font-medium text-stone-700">Campur</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span>KM Dalam</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span>AC</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span>Meja Kerja</span>
                </div>
              </div>
            </div>

            {/* Footer Transaksi & Aksi 3D */}
            <div className="px-5 pb-5 pt-0 flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] text-stone-400 font-body-modern font-medium leading-none">Mulai dari</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-display-modern font-extrabold text-lg sm:text-xl text-[#171412]">Rp 1.950.000</span>
                  <span className="text-xs text-stone-500 font-normal">/bln</span>
                </div>
              </div>
              <Link
                href="/kos/kost-grha-gratia-tipe-a"
                className="inline-flex items-center gap-1.5 bg-[#171412] text-white px-4 py-2.5 rounded-xl text-xs font-semibold font-body-modern transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 shrink-0"
              >
                <span>Buka Tur 3D</span>
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 003: Yogyakarta */}
          <div className="group bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Media Header (Full-Bleed Bersih Tanpa Badge) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Kost Loft Gejayan Sleman Studio room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
                />
              </div>

              {/* Detail Konten Hunian */}
              <div className="p-5">
                {/* Metadata Lokasi (Tanpa Pill, Elegan & Rapi) */}
                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium font-body-modern">
                  <svg className="w-3.5 h-3.5 text-[#eb5722] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Gejayan, Sleman, Yogyakarta</span>
                </div>

                {/* Judul Properti (Warna Statis Tanpa Perubahan Warna Saat Hover) */}
                <h3 className="font-display-modern font-bold text-lg text-[#171412] mt-1.5 leading-snug">
                  Kost Loft Gejayan Sleman
                </h3>

                {/* Spesifikasi Fasilitas Kamar */}
                <div className="flex items-center gap-2 text-xs text-stone-500 font-body-modern mt-2 pb-4 border-b border-stone-100">
                  <span className="font-medium text-stone-700">Putra</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span>KM Dalam</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span>AC</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span>Balkon</span>
                </div>
              </div>
            </div>

            {/* Footer Transaksi & Aksi 3D */}
            <div className="px-5 pb-5 pt-0 flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] text-stone-400 font-body-modern font-medium leading-none">Mulai dari</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-display-modern font-extrabold text-lg sm:text-xl text-[#171412]">Rp 1.600.000</span>
                  <span className="text-xs text-stone-500 font-normal">/bln</span>
                </div>
              </div>
              <Link
                href="/kos/kost-grha-gratia-tipe-a"
                className="inline-flex items-center gap-1.5 bg-[#171412] text-white px-4 py-2.5 rounded-xl text-xs font-semibold font-body-modern transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 shrink-0"
              >
                <span>Buka Tur 3D</span>
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          [4. FITUR & KEUNGGULAN UTAMA (ZIG-ZAG ALTERNATING SHOWCASE)]
          4 Baris Selang-Seling Minimalis Kiri-Kanan dengan Komponen Grafis Editorial
          ========================================================================= */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20"
        data-purpose="manfaat-dan-fitur"
        id="keunggulan"
      >
        {/* Header Bagian */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-display-modern text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171412]">
            Fitur Canggih untuk Transparansi Maksimal
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 font-body-modern max-w-xl mx-auto leading-relaxed">
            Standar baru pencarian kos bagi mahasiswa dan kemudahan pemasaran digital bagi pemilik properti tanpa manipulasi visual.
          </p>
        </div>

        <div className="space-y-16 sm:space-y-24">

          {/* ---------------------------------------------------------------------
              ROW 1: VISUALISASI 3D GAUSSIAN SPLATTING (Visual Kiri — Teks Kanan)
              --------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Visual Kiri: 3DGS Viewport Card (Modern Canvas) */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group">
                {/* 3D Spatial Canvas (Snapped to Brand Dark #171412) */}
                <div className="relative h-72 sm:h-80 bg-[#171412] rounded-xl overflow-hidden flex items-center justify-center border border-stone-800">
                  {/* Subtle 3D Isometric Room Lines SVG */}
                  <svg className="w-full h-full opacity-85" viewBox="0 0 500 300" fill="none">
                    {/* Isometric Grid Floor */}
                    <path d="M 50,150 L 250,260 L 450,150 L 250,40 Z" stroke="#253545" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M 100,125 L 300,235 M 150,100 L 350,210 M 200,75 L 400,185" stroke="#1c2733" strokeWidth="0.8" />
                    <path d="M 150,205 L 350,95 M 200,230 L 400,120" stroke="#1c2733" strokeWidth="0.8" />

                    {/* Room Corner Vectors */}
                    <path d="M 250,40 L 250,260" stroke="#354b5e" strokeWidth="1.5" />
                    <path d="M 50,150 L 250,260" stroke="#354b5e" strokeWidth="1.5" />
                    <path d="M 450,150 L 250,260" stroke="#354b5e" strokeWidth="1.5" />

                    {/* Dimension Lines (1:1 Measurements) */}
                    <path d="M 70,170 L 230,260" stroke="#eb5722" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x="110" y="235" fill="#eb5722" fontSize="10" fontFamily="monospace" fontWeight="bold">PANJANG 3.50 m</text>

                    <path d="M 270,260 L 430,170" stroke="#eb5722" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x="330" y="235" fill="#eb5722" fontSize="10" fontFamily="monospace" fontWeight="bold">LEBAR 3.00 m</text>

                    {/* Gaussian Splatting Point Cloud Nodes */}
                    <g className="animate-pulse">
                      <circle cx="210" cy="180" r="4" fill="#eb5722" opacity="0.9" />
                      <circle cx="230" cy="165" r="3" fill="#eb5722" opacity="0.7" />
                      <circle cx="270" cy="175" r="5" fill="#eb5722" opacity="0.85" />
                      <circle cx="290" cy="190" r="3.5" fill="#f79a74" opacity="0.8" />
                      <circle cx="250" cy="140" r="4" fill="#4fa3b0" opacity="0.9" />
                      <circle cx="260" cy="120" r="3" fill="#4fa3b0" opacity="0.75" />
                    </g>
                  </svg>

                  {/* Single Discreet Interactive Pill */}
                  <div className="absolute bottom-3 left-3 bg-stone-900/90 backdrop-blur-sm border border-stone-700/60 text-stone-300 text-xs font-mono-custom px-3 py-1.5 rounded-full flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>3D SPATIAL VIEWPORT · 60 FPS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teks Kanan */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <h3 className="font-display-modern font-bold text-xl sm:text-2xl text-[#171412] tracking-tight leading-snug">
                Tur 3D Fotorealistik Tanpa Manipulasi Sudut Lensa
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 font-body-modern leading-relaxed">
                OpenTempeh merekonstruksi ruang kamar secara spasial dari rekaman video biasa menjadi model 3D interaktif. Anda dapat mengukur jarak meja, lemari, hingga posisi stopkontak secara presisi 1:1 sebelum memutuskan survei fisik.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-stone-700 font-body">
                  <span className="text-maritime-orange shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Bebas Distorsi Lensa:</strong> Sudut pandang 360° dengan pencahayaan dan proporsi fisik identik di lapangan.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-stone-700 font-body">
                  <span className="text-maritime-orange shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Pembuatan Instan dari HP:</strong> Rekonstruksi otomatis dari rekaman ponsel tanpa memerlukan alat pemindai mahal.</span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------------
              ROW 2: PETA GEOSPASIAL & RADIUS JALAN KAKI (Teks Kiri — Visual Kanan)
              --------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Teks Kiri */}
            <div className="lg:col-span-5">
              <h3 className="font-display-modern font-bold text-xl sm:text-2xl text-[#171412] tracking-tight leading-snug">
                Peta Presisi Berdasarkan Waktu Tempuh Pejalan Kaki
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 font-body-modern leading-relaxed">
                Ucapkan selamat tinggal pada klaim ambigu jarak kos ke kampus. Sistem kami memetakan rute tempuh riil pejalan kaki dari gerbang kos langsung menuju gerbang fakultas terdekat dan stasiun transportasi umum.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-stone-700 font-body-modern">
                  <span className="text-[#eb5722] shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Radius Terkalibrasi:</strong> Menit tempuh jalan kaki yang akurat ke kampus ITB, UGM, UI, dan sekitarnya.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-stone-700 font-body-modern">
                  <span className="text-[#eb5722] shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Transparansi Akses Jalan:</strong> Menampilkan kondisi gang dan keterjangkauan kendaraan mobil atau motor secara jujur.</span>
                </div>
              </div>
            </div>

            {/* Visual Kanan: Peta Kartografi Modern */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden">
                {/* Cartographic Canvas */}
                <div className="relative h-72 sm:h-80 border border-stone-200 rounded-xl overflow-hidden map-canvas-bg p-4 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 500 280">
                    <path d="M 30,20 Q 90,70 60,130 T 70,210 T 35,260" stroke="#d6d3d1" strokeDasharray="4 4" strokeWidth="2.5" />
                    <path d="M 120,230 Q 220,180 320,160 T 430,120" stroke="#a8a29e" strokeDasharray="6 6" strokeWidth="2" />
                    <path d="M 320,160 Q 360,85 395,45" stroke="#eb5722" strokeDasharray="5 5" strokeWidth="2" />
                  </svg>

                  {/* Campus Walking Distance Badges (Clean Capsule Pills) */}
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm border border-stone-200 px-3.5 py-1.5 rounded-full shadow-sm text-xs font-body-modern font-semibold text-[#171412] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#eb5722]" />
                    <span>ITB Kampus Ganesha · 3 Menit Jalan Kaki</span>
                  </div>

                  <div className="absolute bottom-6 right-8 bg-white/95 backdrop-blur-sm border border-stone-200 px-3.5 py-1.5 rounded-full shadow-sm text-xs font-body-modern font-semibold text-[#171412] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#171412]" />
                    <span>UGM Bulaksumur · 4 Menit Jalan Kaki</span>
                  </div>

                  {/* Clean Card Note (Replacing Yellow Sticky Note #fffcf0) */}
                  <div className="absolute bottom-4 left-4 max-w-[210px] bg-white p-3.5 shadow-md border border-stone-200/90 rounded-xl">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#eb5722] mb-1.5" />
                    <p className="font-body-modern text-xs text-stone-700 leading-snug">
                      Jarak diukur langsung dari gerbang kos ke pintu fakultas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------------
              ROW 3: FILTER PENCARIAN & PEMBAYARAN ESCROW (Visual Kiri — Teks Kanan)
              --------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Visual Kiri: Filter & Payment Escrow Card */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden space-y-5">
                {/* Simulated Filter UI Chips */}
                <div>
                  <span className="text-xs font-body-modern uppercase tracking-wider text-stone-500 block mb-2.5 font-bold">
                    Pilihan Fasilitas Prioritas
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3.5 py-1.5 bg-[#171412] text-white text-xs font-body-modern font-medium rounded-full flex items-center gap-1.5 shadow-sm">
                      <span>✓ Kamar Mandi Dalam</span>
                    </span>
                    <span className="px-3.5 py-1.5 bg-[#171412] text-white text-xs font-body-modern font-medium rounded-full flex items-center gap-1.5 shadow-sm">
                      <span>✓ Ber-AC</span>
                    </span>
                    <span className="px-3.5 py-1.5 bg-[#171412] text-white text-xs font-body-modern font-medium rounded-full flex items-center gap-1.5 shadow-sm">
                      <span>✓ Wifi Kencang</span>
                    </span>
                    <span className="px-3.5 py-1.5 bg-stone-100 text-stone-600 border border-stone-200 text-xs font-body-modern font-medium rounded-full">
                      Parkir Mobil
                    </span>
                  </div>
                </div>

                {/* Price Range Slider Mockup */}
                <div className="pt-2">
                  <div className="flex justify-between items-center text-xs font-body-modern font-semibold text-stone-700 mb-2">
                    <span>Rentang Bujet Bulanan</span>
                    <span className="text-[#eb5722] font-mono-custom font-bold">Rp 1.000.000 — Rp 2.500.000 / bln</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full relative">
                    <div className="bg-[#eb5722] h-2 rounded-full absolute left-[20%] right-[30%]" />
                    <div className="w-4 h-4 bg-white border-2 border-stone-900 rounded-full absolute left-[20%] top-1/2 -translate-y-1/2 shadow" />
                    <div className="w-4 h-4 bg-white border-2 border-stone-900 rounded-full absolute right-[30%] top-1/2 -translate-y-1/2 shadow" />
                  </div>
                </div>

                {/* Escrow Guarantee Stamp (Replacing Yellowish #fdf9ee with Clean Amber Card) */}
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-body-modern font-bold uppercase tracking-wider text-amber-950">
                      Sistem Rekening Bersama (Escrow Terproteksi)
                    </div>
                    <div className="text-xs text-stone-600 font-body-modern leading-tight mt-0.5">
                      Uang sewa disimpan di rekening penampung dan baru diteruskan setelah serah terima kunci fisik berhasil.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teks Kanan */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <h3 className="font-display-modern font-bold text-xl sm:text-2xl text-[#171412] tracking-tight leading-snug">
                Pencarian Terarah dengan Rekening Bersama Terproteksi
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 font-body-modern leading-relaxed">
                Saring kamar yang benar-benar sesuai standar kebutuhan Anda dalam hitungan detik. Transaksi sewa dilindungi sistem rekening bersama (escrow) yang menjamin dana hanya diteruskan setelah serah terima kunci berhasil.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-stone-700 font-body">
                  <span className="text-maritime-orange shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Kriteria Fasilitas Esensial:</strong> Filter instan kamar mandi dalam, AC, Wi-Fi kencang, hingga aturan jam malam.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-stone-700 font-body">
                  <span className="text-maritime-orange shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Garansi Perlindungan Sewa:</strong> Dana tertahan aman di sistem rekening bersama hingga kondisi kamar terverifikasi.</span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------------
              ROW 4: AI CHATBOT & EKOSISTEM PEMILIK KOS (Teks Kiri — Visual Kanan)
              --------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Teks Kiri */}
            <div className="lg:col-span-5">
              <h3 className="font-display-modern font-bold text-xl sm:text-2xl text-[#171412] tracking-tight leading-snug">
                Asisten Spasial Cerdas dan Dukungan Kurator Lapangan
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 font-body-modern leading-relaxed">
                Konsultasikan kriteria hunian impian Anda menggunakan bahasa sehari-hari. Asisten AI kami memproses data spasial untuk mencocokkan kamar terbaik, didukung kurator lapangan yang siap membantu survei fisik.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-stone-700 font-body-modern">
                  <span className="text-[#eb5722] shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Pencarian Bahasa Alami (Beta):</strong> Rekomendasi unit akurat cukup dengan mengetik preferensi bujet dan fasilitas Anda.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-stone-700 font-body-modern">
                  <span className="text-[#eb5722] shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Verifikasi Langsung Tim:</strong> Tersedia layanan inspeksi fisik dan bantuan perekaman video oleh tim kurator OpenTempeh.</span>
                </div>
              </div>
            </div>

            {/* Visual Kanan: AI Chat Mockup (Modern Canvas) */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden">
                {/* Chat Header Tag */}
                <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono-custom font-bold text-stone-700 uppercase">
                      OpenTempeh Spatial AI
                    </span>
                  </div>
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full text-xs font-semibold font-body-modern">
                    Beta
                  </span>
                </div>

                {/* Chat Bubbles Mockup (Standard Rounded-2xl Bubbles) */}
                <div className="pt-4 space-y-3 font-body-modern">
                  {/* User Bubble (Right) */}
                  <div className="flex justify-end">
                    <div className="bg-[#171412] text-white text-xs p-3.5 rounded-2xl rounded-br-sm max-w-[85%] leading-relaxed shadow-sm">
                      &quot;Cari kos dekat gerbang barat ITB, bujet maks 2 juta, ada jendela luar yang terang dan meja kerja luas.&quot;
                    </div>
                  </div>

                  {/* AI Response Bubble (Left) */}
                  <div className="flex justify-start">
                    <div className="bg-stone-50 text-stone-800 text-xs p-4 rounded-2xl rounded-bl-sm max-w-[90%] border border-stone-200/90 leading-relaxed shadow-sm">
                      <div className="flex items-center gap-1.5 text-[#eb5722] font-body-modern text-xs font-semibold uppercase mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#eb5722] inline-block" />
                        Rekomendasi Spasial 3DGS
                      </div>
                      Menemukan <strong>2 unit terverifikasi</strong>: Kost Pods Dago Sanctuary (3 menit jalan kaki, jendela hadap luar, meja 1.2 × 0.6 m). Siap buka tur 3D?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          [5. SOCIAL PROOF / BUKTI NYATA]
          Sub-header: Apa Kata Mereka yang Sudah Mencobanya?
          Testimoni 1 (Hasil Nyata), Testimoni 2 (Bantah Keraguan), Testimoni 3 (Pemilik)
          + Infografis Distribusi Preferensi (Sesuai Referensi)
          ========================================================================= */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20"
        data-purpose="social-proof"
        id="testimoni"
      >
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171412] font-display-modern tracking-tight leading-tight">
            Apa Kata Mereka yang Sudah Mencobanya?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 font-body-modern leading-relaxed">
            Ratusan mahasiswa, pekerja, dan pemilik kos telah merasakan kemudahan menemukan dan menyewakan kamar secara transparan.
          </p>
        </div>

        {/* 3 Kartu Testimoni Seragam */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Testimoni 1: Fokus Hasil */}
          <div className="bg-white border border-stone-200/90 p-7 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="text-[#eb5722] mb-4">
                <svg className="w-6 h-6 fill-current opacity-80" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-body-modern italic">
                &ldquo;Survei kos dari luar kota jadi sangat tenang. Begitu saya sampai di Bandung dan masuk kamar aslinya, tata letak dan luasnya persis 100% seperti tur 3D di OpenTempeh. Tidak ada zonk sama sekali!&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 mt-5">
              <div className="font-display-modern font-bold text-[#171412] text-sm tracking-normal">
                Rizky Pratama
              </div>
              <div className="text-xs text-stone-500 font-mono-custom mt-0.5">
                Mahasiswa Baru ITB (Asal Surabaya)
              </div>
            </div>
          </div>

          {/* Testimoni 2: Membantah Keraguan Awal */}
          <div className="bg-white border border-stone-200/90 p-7 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="text-[#eb5722] mb-4">
                <svg className="w-6 h-6 fill-current opacity-80" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-body-modern italic">
                &ldquo;Awalnya saya kira ini cuma gimmick render 3D biasa. Ternyata pencahayaan jendela dan detail sudut kamar mandi benar-benar nyata. Menghemat jutaan rupiah ongkos tiket survei fisik bolak-balik.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 mt-5">
              <div className="font-display-modern font-bold text-[#171412] text-sm tracking-normal">
                Amanda Clarissa
              </div>
              <div className="text-xs text-stone-500 font-mono-custom mt-0.5">
                Karyawan Swasta (Domisili SCBD Jakarta)
              </div>
            </div>
          </div>

          {/* Testimoni 3: Dari Pemilik Kos */}
          <div className="bg-white border border-stone-200/90 p-7 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="text-[#eb5722] mb-4">
                <svg className="w-6 h-6 fill-current opacity-80" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-body-modern italic">
                &ldquo;Kamar kos saya terisi penuh dalam 4 hari setelah ditautkan tur spasial OpenTempeh. Calon penyewa langsung yakin bayar tanpa harus saya dampingi berkali-kali untuk survei langsung.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 mt-5">
              <div className="font-display-modern font-bold text-[#171412] text-sm tracking-normal">
                Hendra Gunawan
              </div>
              <div className="text-xs text-stone-500 font-mono-custom mt-0.5">
                Pemilik Kost (Kawasan Gejayan Yogyakarta)
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          [6. PENAWARAN KHUSUS & URGENSI]
          Sub-header: Penawaran Terbatas untuk Hari Ini!
          Kalimat Urgensi: Diskon potongan harga untuk orang pertama
          Garansi: Garansi Verifikasi Fisik 100%
          ========================================================================= */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        data-purpose="penawaran-dan-urgensi"
      >
        <div className="bg-[#171412] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-stone-800">
          <div className="relative z-10 max-w-3xl">
            {/* Tag Penawaran */}
            <div className="inline-block bg-[#eb5722] text-white text-xs font-body-modern font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
              Penawaran Terbatas untuk Hari Ini!
            </div>

            {/* Headline Urgensi */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display-modern font-extrabold tracking-tight text-white leading-tight">
              Dapatkan Voucher Potongan Sewa Rp 250.000 Khusus 50 Pendaftar Pertama
            </h2>

            {/* Kalimat Urgensi */}
            <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed font-body-modern">
              Dapatkan akses bebas biaya ke seluruh Tur Spasial 3D eksklusif dan voucher potongan sewa bulan pertama sebesar <strong className="text-white">Rp 250.000</strong> khusus untuk <strong className="text-[#eb5722]">50 orang pertama</strong> yang memesan kamar melalui OpenTempeh hari ini.
            </p>

            {/* Box Garansi 100% */}
            <div className="mt-6 bg-white/5 border border-white/10 p-5 rounded-xl">
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#eb5722] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-body-modern font-bold uppercase text-white tracking-wider text-sm">
                    Garansi Verifikasi Fisik 100%
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed font-body-modern">
                    Jika kondisi atau dimensi ruangan saat Anda tiba di lokasi tidak sesuai dengan model tur spasial 3D kami, tim kurasi kami memberikan garansi 100% bantuan relokasi unit atau pengembalian seluruh booking fee Anda tanpa potongan.
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Penawaran */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#katalog"
                className="bg-[#eb5722] hover:bg-[#d14614] text-white px-7 py-3.5 rounded-xl font-body-modern font-semibold tracking-normal text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>AMBIL DISKON &amp; MULAI CARI KOS</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/3dgs-demo"
                className="bg-stone-800/80 hover:bg-stone-800 text-stone-200 border border-stone-700 px-6 py-3.5 rounded-xl font-body-modern font-semibold tracking-normal text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                Coba Demo Interaktif
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          [7. CTA AKHIR & FOOTER]
          Sub-header: Jangan Tunda Lagi, Miliki Kamar Kos Idaman Anda Sekarang!
          Tombol CTA 2: SAMA DENGAN CTA 1
          Footer: Nama Brand | Kontak: Nomor/Email | Kebijakan Privasi
          ========================================================================= */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center"
        data-purpose="final-cta"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display-modern font-extrabold tracking-tight text-[#171412] leading-tight">
            Jangan Tunda Lagi, Temukan Kamar Kos Idaman Anda Sekarang!
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-body-modern max-w-xl mx-auto">
            Hentikan buang waktu dan uang untuk survei yang mengecewakan. Nikmati kemudahan eksplorasi kamar kos akurat langsung dari ponsel Anda.
          </p>

          <div className="mt-8 flex justify-center">
            {/* Tombol CTA 2 (Sama dengan CTA 1) */}
            <Link
              className="inline-flex items-center gap-3 bg-[#171412] hover:bg-stone-800 text-white px-8 py-4 rounded-xl font-body-modern font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              href="#katalog"
            >
              <span>MULAI SURVEI SPASIAL SEKARANG</span>
              <span className="w-5 h-5 rounded-full bg-[#eb5722] text-white flex items-center justify-center">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER (Nama Brand | Kontak | Kebijakan Privasi)
          ========================================================================= */}
      <footer
        className="bg-[#12100E] text-stone-300 pt-14 pb-10 border-t border-stone-800"
        data-purpose="main-footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
            {/* Brand Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 text-2xl font-display-modern font-extrabold tracking-wider text-white mb-3">
                <span>OPEN</span>
                <span className="text-[#eb5722]">•</span>
                <span>TEMPEH</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed font-body-modern">
                OpenTempeh Spatial Platform – Solusi marketplace kamar kos dan hunian sewa berbasis rekonstruksi rekaman kamera ponsel. Memberikan kepastian ukuran skala 1:1 sebelum survei langsung.
              </p>
              <div className="mt-4 text-xs font-mono-custom text-stone-400">
                Kontak Dukungan: halo@opentempeh.id | WhatsApp: +62 812-3456-7890
              </div>
            </div>

            {/* Navigasi Cepat */}
            <div>
              <div className="font-body-modern font-bold uppercase tracking-wider text-white text-xs mb-3">
                Navigasi Halaman
              </div>
              <ul className="space-y-2 text-xs font-body-modern text-stone-400">
                <li>
                  <a className="hover:text-white transition-colors" href="#masalah">
                    Masalah &amp; Solusi
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#katalog">
                    Koleksi Kos Spasial
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#keunggulan">
                    Fitur &amp; Manfaat
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#testimoni">
                    Bukti Nyata Pengguna
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <div className="font-body-modern font-bold uppercase tracking-wider text-white text-xs mb-3">
                Notifikasi Unit Kos Baru
              </div>
              <p className="text-xs text-stone-400 mb-3 leading-relaxed font-body-modern">
                Dapatkan informasi kamar kos terverifikasi dekat kampus setiap awal pekan.
              </p>
              {subscribed ? (
                <div className="bg-stone-900 border border-stone-700 text-stone-200 text-xs p-3 rounded-xl font-mono-custom">
                  Email Anda telah terdaftar.
                </div>
              ) : (
                <form className="space-y-2" onSubmit={handleSubscribe}>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 text-xs px-3.5 py-2.5 rounded-xl text-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-mono-custom"
                    placeholder="Masukkan email Anda..."
                    type="email"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#eb5722] hover:bg-[#d14614] text-white text-xs font-body-modern font-semibold uppercase tracking-wider py-2.5 rounded-xl transition-colors cursor-pointer shadow-sm"
                  >
                    Daftar Notifikasi
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Baris Hak Cipta & Kebijakan Privasi */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-mono-custom gap-3">
            <div>
              OpenTempeh Spatial Platform © 2026. Hak Cipta Dilindungi Undang-Undang.
            </div>
            <div className="flex items-center space-x-6">
              <a className="hover:text-stone-300 transition-colors" href="#">
                Kebijakan Privasi
              </a>
              <span className="text-stone-700">|</span>
              <a className="hover:text-stone-300 transition-colors" href="#">
                Syarat &amp; Ketentuan
              </a>
              <span className="text-stone-700">|</span>
              <Link className="hover:text-stone-300 transition-colors" href="/3dgs-demo">
                SplatViewer Engine
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
