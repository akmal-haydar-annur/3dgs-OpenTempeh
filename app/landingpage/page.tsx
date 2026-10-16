"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./landing.css";

const TICKER_ITEMS = [
  "AKURASI SKALA RUANGAN 1:1",
  "BEBAS TIPUAN LENSA KAMERA",
  "CUKUP REKAM VIDEO DARI HP",
  "100% TERVERIFIKASI LAPANGAN",
  "JARAK JALAN KAKI ASLI KE KAMPUS",
];

export default function SplatKostLandingPage() {
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
        className="bg-maritime-orange text-white text-[11px] sm:text-xs font-condensed font-bold tracking-wider uppercase overflow-hidden py-2.5 border-b border-orange-700 shadow-inner select-none"
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
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-7 lg:space-x-8 text-[13px] font-body font-medium text-stone-700"
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

          {/* 3. Right: Action Buttons (Login Link + Tactile Cari Kos Button) */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-maritime-dark shrink-0 z-10">
            <Link
              href="/dashboard"
              className="text-xs font-mono-custom font-semibold tracking-wider uppercase text-stone-600 hover:text-maritime-orange transition-colors px-2 py-1"
            >
              Login
            </Link>
            <Link
              className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-condensed font-bold uppercase tracking-wider text-maritime-dark bg-white border border-stone-800 rounded shadow-[2px_2px_0px_#171412] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-maritime-dark hover:text-white transition-all duration-150"
              href="/search"
            >
              <span>Cari Kos</span>
              <svg className="w-3.5 h-3.5 text-maritime-orange group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================================
          [1. HERO SECTION]
          Headline Utama, Sub-headline, Tombol CTA 1
          (Layout Split dengan Ripped Paper Seam & Kartu Spatial Market)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[#f7f4ed]" data-purpose="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-14">
          <div className="relative rounded-lg overflow-hidden shadow-2xl border border-stone-800 bg-[#162e3b]">
            <div className="flex flex-col lg:flex-row min-h-[580px] lg:min-h-[640px]">
              
              {/* --- LEFT HERO: Real Room Interior with High-Impact CRO Headline --- */}
              <div className="relative w-full lg:w-[62%] min-h-[460px] lg:min-h-[640px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 overflow-hidden">
                {/* Background Photo */}
                <div className="absolute inset-0 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Interior kamar kos modern dengan pencahayaan alami dan rekaman kamera ponsel"
                    className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08]"
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1400&q=80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
                </div>

                {/* Left Content Overlay */}
                <div className="relative z-10 max-w-xl">
                  {/* Curved Stamp Badge */}
                  <div className="inline-flex items-center gap-2 text-white/95 text-xs font-condensed font-bold uppercase tracking-widest mb-3 drop-shadow">
                    <span className="text-maritime-orange font-bold text-sm">~</span>
                    <span>Survei Kos Spasial Generasi Baru</span>
                  </div>

                  {/* Headline Utama: Fokus pada hasil terbesar konsumen */}
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-headline tracking-tight uppercase leading-[0.88] text-white drop-shadow-md">
                    SURVEI KOS DARI RUMAH{" "}
                    <span className="inline-block align-middle ml-2 -mt-2 bg-maritime-orange text-white text-[11px] sm:text-xs font-condensed font-bold px-2.5 py-1 rounded tracking-wider shadow">
                      Standar 2026
                    </span>
                    <br />
                    DENGAN UKURAN 100% NYATA
                  </h1>

                  {/* Sub-headline: 1-2 kalimat penjelas cara kerja instan */}
                  <p className="mt-4 text-xs sm:text-sm text-stone-200 leading-relaxed font-body max-w-lg drop-shadow">
                    Jelajahi setiap sudut kamar kos secara interaktif dengan skala dimensi 1:1 dan pencahayaan asli, direkonstruksi langsung dari rekaman video kamera ponsel tanpa manipulasi lensa kamera.
                  </p>

                  {/* Tombol CTA 1: Ajakan bertindak kuat */}
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      className="inline-flex items-center gap-3 bg-white hover:bg-stone-100 text-maritime-dark px-6 py-3.5 rounded-full font-condensed font-bold uppercase tracking-wider text-xs sm:text-sm shadow-xl transition-transform hover:-translate-y-0.5"
                      href="#katalog"
                    >
                      <span>MULAI SURVEI SPASIAL SEKARANG</span>
                      <span className="w-5 h-5 rounded-full bg-maritime-orange text-white flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </Link>
                    <Link
                      className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white border border-white/30 px-5 py-3.5 rounded-full font-condensed font-bold uppercase tracking-wider text-xs backdrop-blur-sm transition-colors"
                      href="/3dgs-demo"
                    >
                      <span>Buka Viewer 3D</span>
                      <svg className="w-3.5 h-3.5 text-maritime-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Vertical Torn Paper Edge Overlay on Seam */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute left-[62%] -translate-x-1/2 top-0 bottom-0 w-9 z-30 pointer-events-none"
                style={{ filter: "drop-shadow(3px 0 4px rgba(0,0,0,0.35))" }}
              >
                <svg
                  viewBox="0 0 24 800"
                  preserveAspectRatio="none"
                  className="w-full h-full fill-[#f7f4ed]"
                >
                  <path d="M 0,0 L 14,0 Q 21,30 11,60 Q 3,90 16,120 Q 23,150 11,180 Q 4,210 15,240 Q 22,270 12,300 Q 5,330 16,360 Q 24,390 12,420 Q 4,450 15,480 Q 22,510 12,540 Q 4,570 17,600 Q 23,630 11,660 Q 5,690 15,720 Q 21,750 12,770 L 14,800 L 0,800 Z" />
                </svg>
              </div>

              {/* --- RIGHT HERO: Textured Maritime Blue Paper with Note & Pinned Market Card --- */}
              <div className="relative w-full lg:w-[38%] bg-[#1b3a4b] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden border-t lg:border-t-0 lg:border-l border-stone-700/50">
                {/* Nautical Coordinates Background Pattern */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "24px 24px, 48px 48px",
                  }}
                />

                {/* Top Note */}
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-maritime-orange mb-3 border border-white/20">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="5" cy="8" opacity="0.6" r="2.5" />
                      <circle cx="19" cy="8" opacity="0.6" r="2.5" />
                      <circle cx="8" cy="18" opacity="0.6" r="2.5" />
                      <circle cx="16" cy="18" opacity="0.6" r="2.5" />
                    </svg>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-body">
                    Seluruh kamar dipindai dari rekaman video riil dan diaudit oleh kurator lapangan independen untuk menjamin transparansi ukuran fisik sebelum Anda menandatangani sewa.
                  </p>
                  <a
                    href="#keunggulan"
                    className="inline-flex items-center gap-1 mt-2 text-xs font-condensed font-bold uppercase tracking-wider text-white underline decoration-maritime-orange underline-offset-4 hover:text-maritime-orange transition-colors"
                  >
                    <span>Pelajari Cara Kerja</span>
                    <svg className="w-3 h-3 text-maritime-orange inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                {/* Center 3D Isometric Visual Motif */}
                <div className="relative z-10 my-4 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform">
                    <svg className="w-12 h-12 text-maritime-orange drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                    </svg>
                  </div>
                </div>

                {/* Pinned Spatial Market Receipt Card */}
                <div className="relative z-10 bg-[#fffdfa] text-maritime-dark p-5 rounded shadow-2xl border-t-2 border-stone-800 rotate-[-1deg] transform hover:rotate-0 transition-transform">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 washi-tape border border-stone-300/70" />
                  <div className="text-center border-b border-stone-200 pb-2">
                    <span className="font-handwriting text-2xl text-maritime-orange block leading-none">
                      Pilihan Terverifikasi
                    </span>
                    <span className="font-headline uppercase tracking-widest text-lg text-maritime-dark -mt-1 block">
                      SPATIAL MARKET
                    </span>
                  </div>

                  <div className="py-3 text-center">
                    <div className="font-headline uppercase text-stone-900 text-lg tracking-wide">
                      Kost Grha Gratia
                    </div>
                    <div className="inline-block bg-orange-100 text-maritime-orange text-[10px] font-bold font-condensed px-2 py-0.5 mt-0.5 rounded tracking-widest uppercase">
                      Kamar Mandi Dalam • Full Furnished
                    </div>
                    <div className="text-xs font-headline tracking-wider text-maritime-dark font-bold mt-1.5">
                      Rp 1.555.000 <span className="text-[10px] font-body text-stone-500">/ bulan</span>
                    </div>
                  </div>

                  <div className="border-t border-stone-200 pt-2 text-[11px] text-stone-600 text-center font-condensed uppercase tracking-wider">
                    — TERVERIFIKASI FISIK &amp; SKALA 1:1 —
                  </div>
                </div>
              </div>
            </div>

            {/* Jagged Bottom Horizontal Torn Divider */}
            <div
              aria-hidden="true"
              className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-30 pointer-events-none"
            >
              <svg
                viewBox="0 0 1200 32"
                className="relative block w-full h-7 sm:h-9 text-[#f7f4ed]"
                preserveAspectRatio="none"
                fill="currentColor"
              >
                <path d="M0,0 L0,32 L1200,32 L1200,0 Q1170,26 1140,8 Q1110,30 1080,10 Q1050,28 1020,6 Q990,30 960,8 Q930,26 900,4 Q870,30 840,10 Q810,28 780,6 Q750,31 720,11 Q690,26 660,5 Q630,30 600,8 Q570,28 540,6 Q510,31 480,9 Q450,26 420,5 Q390,29 360,8 Q330,27 300,6 Q270,31 240,9 Q210,26 180,4 Q150,30 120,8 Q90,27 60,5 Q30,30 0,0 Z" />
              </svg>
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
        className="border-y border-maritime-border bg-[#f8f5ee] py-14 sm:py-16"
        data-purpose="pain-points"
        id="masalah"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sub-header Masalah */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-handwriting text-3xl sm:text-4xl text-maritime-orange block">
              Realita Pencarian Kos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline tracking-tight uppercase leading-tight text-maritime-dark mt-1">
              Bosan Tertipu Sudut Lensa Wide-Angle?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-body leading-relaxed max-w-xl mx-auto">
              Tiga kendala klasik yang paling sering menguras waktu, tenaga, dan biaya Anda:
            </p>
          </div>

          {/* 3 Poin Masalah Spesifik (Minimalis, Seragam, Efek Hover Halus) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Masalah 1: Distorsi Visual */}
            <div className="group bg-white editorial-border p-6 sm:p-7 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-stone-400 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="font-mono-custom text-xs font-bold text-stone-400 group-hover:text-maritime-orange transition-colors">
                    [ 01 ]
                  </span>
                  <span className="font-mono-custom text-[11px] text-stone-400 uppercase tracking-wider">
                    Distorsi Visual
                  </span>
                </div>
                <h3 className="font-headline text-2xl uppercase tracking-wide text-maritime-dark mt-4 leading-snug">
                  Kamar Luas di Foto, Aslinya Sempit &amp; Pengap
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed font-body">
                  Lensa ultra-wide ekstrem membuat kamar 2x3 meter tampak seperti kamar hotel berbintang. Saat tiba di lokasi fisik, ruang gerak bahkan tidak cukup untuk membuka koper.
                </p>
              </div>
            </div>

            {/* Masalah 2: Pemborosan Biaya & Waktu */}
            <div className="group bg-white editorial-border p-6 sm:p-7 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-stone-400 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="font-mono-custom text-xs font-bold text-stone-400 group-hover:text-maritime-orange transition-colors">
                    [ 02 ]
                  </span>
                  <span className="font-mono-custom text-[11px] text-stone-400 uppercase tracking-wider">
                    Waktu &amp; Biaya
                  </span>
                </div>
                <h3 className="font-headline text-2xl uppercase tracking-wide text-maritime-dark mt-4 leading-snug">
                  Habis Ongkos &amp; Waktu untuk Survei Zonk
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed font-body">
                  Harus meluangkan cuti kerja atau izin kuliah dan menghabiskan jutaan rupiah transportasi luar kota hanya untuk mendapati fasilitas riil tidak sesuai dengan foto iklan.
                </p>
              </div>
            </div>

            {/* Masalah 3: Ilusi Panorama 360 */}
            <div className="group bg-white editorial-border p-6 sm:p-7 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-stone-400 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="font-mono-custom text-xs font-bold text-stone-400 group-hover:text-maritime-orange transition-colors">
                    [ 03 ]
                  </span>
                  <span className="font-mono-custom text-[11px] text-stone-400 uppercase tracking-wider">
                    Ilusi Panorama
                  </span>
                </div>
                <h3 className="font-headline text-2xl uppercase tracking-wide text-maritime-dark mt-4 leading-snug">
                  Tur 360° Biasa yang Buram &amp; Melengkung
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed font-body">
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
            <span className="font-handwriting text-3xl sm:text-4xl text-maritime-orange block">
              Jawaban Kami
            </span>
            <h2 className="font-body font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-maritime-dark mt-1 leading-snug">
              Kenalkan OpenTempeh — Solusi Praktis Menemukan Kos Idaman Tanpa Drama
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-body">
              OpenTempeh hadir sebagai jawaban telak atas semua masalah di atas. Melalui rekonstruksi spasial 3D dari rekaman ponsel biasa, Anda dapat melangkah masuk ke dalam kamar, memeriksa setiap sudut perabot, serta memastikan pencahayaan nyata langsung dari layar Anda sebelum memesan.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/search"
              className="group inline-flex items-center gap-2 bg-maritime-orange hover:bg-maritime-rust text-white px-5 py-3 rounded border border-stone-900 shadow-[3px_3px_0px_#171412] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 text-xs font-condensed font-bold uppercase tracking-wider"
            >
              <span>Jelajah Semua Unit</span>
              <svg className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Product Catalog Cards (Format 3 Kolom Sesuai Referensi) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 001: Semarang */}
          <div className="group bg-maritime-warmCard editorial-border rounded-sm p-4 sm:p-5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 relative">
            <div>
              <div className="border-b border-stone-200 pb-2">
                <span className="font-handwriting text-2xl text-maritime-orange block">
                  Semarang
                </span>
              </div>
              <div className="flex justify-between items-center mt-3 gap-2">
                <h3 className="font-condensed font-bold uppercase tracking-wider text-base text-maritime-dark truncate">
                  Kost Grha Gratia Tipe A
                </h3>
                <div className="text-right shrink-0">
                  <span className="font-headline text-xl text-maritime-dark">Rp 1.555.000</span>
                  <span className="font-mono-custom text-[11px] text-stone-500 font-normal ml-1">/bln</span>
                </div>
              </div>

              <div className="my-4 h-48 sm:h-52 rounded overflow-hidden relative bg-stone-100 border border-stone-200/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Kost Grha Gratia Semarang Tipe A"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200">
              <Link
                href="/kos/kost-grha-gratia-tipe-a"
                className="w-full bg-white group-hover:bg-maritime-dark text-maritime-dark group-hover:text-white border border-stone-800 rounded-sm py-2.5 px-4 text-xs font-condensed uppercase tracking-widest font-bold shadow-[2px_2px_0px_#171412] group-hover:shadow-none group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-all flex items-center justify-center"
              >
                <span>Buka Tur 3D</span>
              </Link>
            </div>
          </div>

          {/* Card 002: Bandung */}
          <div className="group bg-maritime-warmCard editorial-border rounded-sm p-4 sm:p-5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 relative">
            <div>
              <div className="border-b border-stone-200 pb-2">
                <span className="font-handwriting text-2xl text-maritime-orange block">
                  Bandung
                </span>
              </div>
              <div className="flex justify-between items-center mt-3 gap-2">
                <h3 className="font-condensed font-bold uppercase tracking-wider text-base text-maritime-dark truncate">
                  Kost Pods Dago Sanctuary
                </h3>
                <div className="text-right shrink-0">
                  <span className="font-headline text-xl text-maritime-dark">Rp 1.950.000</span>
                  <span className="font-mono-custom text-[11px] text-stone-500 font-normal ml-1">/bln</span>
                </div>
              </div>

              <div className="my-4 h-48 sm:h-52 rounded overflow-hidden relative bg-stone-100 border border-stone-200/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Kost Pods Dago Sanctuary Modern Room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200">
              <Link
                href="/kos/kost-grha-gratia-tipe-a"
                className="w-full bg-white group-hover:bg-maritime-dark text-maritime-dark group-hover:text-white border border-stone-800 rounded-sm py-2.5 px-4 text-xs font-condensed uppercase tracking-widest font-bold shadow-[2px_2px_0px_#171412] group-hover:shadow-none group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-all flex items-center justify-center"
              >
                <span>Buka Tur 3D</span>
              </Link>
            </div>
          </div>

          {/* Card 003: Yogyakarta */}
          <div className="group bg-maritime-warmCard editorial-border rounded-sm p-4 sm:p-5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 relative">
            <div>
              <div className="border-b border-stone-200 pb-2">
                <span className="font-handwriting text-2xl text-maritime-orange block">
                  Yogyakarta
                </span>
              </div>
              <div className="flex justify-between items-center mt-3 gap-2">
                <h3 className="font-condensed font-bold uppercase tracking-wider text-base text-maritime-dark truncate">
                  Kost Loft Gejayan Sleman
                </h3>
                <div className="text-right shrink-0">
                  <span className="font-headline text-xl text-maritime-dark">Rp 1.600.000</span>
                  <span className="font-mono-custom text-[11px] text-stone-500 font-normal ml-1">/bln</span>
                </div>
              </div>

              <div className="my-4 h-48 sm:h-52 rounded overflow-hidden relative bg-stone-100 border border-stone-200/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Kost Loft Gejayan Sleman Studio room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200">
              <Link
                href="/kos/kost-grha-gratia-tipe-a"
                className="w-full bg-white group-hover:bg-maritime-dark text-maritime-dark group-hover:text-white border border-stone-800 rounded-sm py-2.5 px-4 text-xs font-condensed uppercase tracking-widest font-bold shadow-[2px_2px_0px_#171412] group-hover:shadow-none group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-all flex items-center justify-center"
              >
                <span>Buka Tur 3D</span>
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
          <span className="font-handwriting text-3xl sm:text-4xl text-maritime-orange block">
            Teknologi &amp; Layanan
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase text-maritime-dark mt-1">
            Fitur Canggih untuk Transparansi Maksimal
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-body max-w-xl mx-auto leading-relaxed">
            Standar baru pencarian kos bagi mahasiswa dan kemudahan pemasaran digital bagi pemilik properti tanpa manipulasi visual.
          </p>
        </div>

        <div className="space-y-16 sm:space-y-24">
          
          {/* ---------------------------------------------------------------------
              ROW 1: VISUALISASI 3D GAUSSIAN SPLATTING (Visual Kiri — Teks Kanan)
              --------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Visual Kiri: 3DGS Viewport Card (Pure Minimalist Canvas) */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-[#fcfbf7] editorial-border rounded-lg p-3 sm:p-4 shadow-[3px_3px_0px_#171412] hover:shadow-[5px_5px_0px_#171412] hover:-translate-y-0.5 transition-all relative overflow-hidden group">
                {/* 3D Spatial Canvas */}
                <div className="relative h-72 sm:h-80 bg-[#11161b] rounded-md overflow-hidden flex items-center justify-center border border-stone-800">
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
                  <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-sm border border-stone-700/60 text-stone-300 text-[10px] font-mono-custom px-2.5 py-1 rounded flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>3D SPATIAL VIEWPORT · 60 FPS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teks Kanan */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <span className="font-mono-custom text-xs uppercase tracking-widest text-maritime-orange font-bold">
                01  Rekonstruksi Spasial
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl text-maritime-dark tracking-tight mt-1.5 leading-snug">
                Tur 3D Fotorealistik Tanpa Manipulasi Sudut Lensa
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 font-body leading-relaxed">
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
              <span className="font-mono-custom text-xs uppercase tracking-widest text-maritime-orange font-bold">
                02  Kalibrasi Wilayah
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl text-maritime-dark tracking-tight mt-1.5 leading-snug">
                Peta Presisi Berdasarkan Waktu Tempuh Pejalan Kaki
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 font-body leading-relaxed">
                Ucapkan selamat tinggal pada klaim ambigu jarak kos ke kampus. Sistem kami memetakan rute tempuh riil pejalan kaki dari gerbang kos langsung menuju gerbang fakultas terdekat dan stasiun transportasi umum.
              </p>
              
              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-stone-700 font-body">
                  <span className="text-maritime-orange shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Radius Terkalibrasi:</strong> Menit tempuh jalan kaki yang akurat ke kampus ITB, UGM, UI, dan sekitarnya.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-stone-700 font-body">
                  <span className="text-maritime-orange shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Transparansi Akses Jalan:</strong> Menampilkan kondisi gang dan keterjangkauan kendaraan mobil atau motor secara jujur.</span>
                </div>
              </div>
            </div>

            {/* Visual Kanan: Peta Kartografi Kertas (Pure Minimalist Canvas) */}
            <div className="lg:col-span-7">
              <div className="bg-[#fcfbf7] editorial-border rounded-lg p-3 sm:p-4 shadow-[3px_3px_0px_#171412] hover:shadow-[5px_5px_0px_#171412] hover:-translate-y-0.5 transition-all relative overflow-hidden">
                {/* Cartographic Canvas */}
                <div className="relative h-72 sm:h-80 border border-stone-300 rounded-md overflow-hidden map-canvas-bg p-4 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 500 280">
                    <path d="M 30,20 Q 90,70 60,130 T 70,210 T 35,260" stroke="#ded7ca" strokeDasharray="4 4" strokeWidth="2.5" />
                    <path d="M 120,230 Q 220,180 320,160 T 430,120" stroke="#b8b0a2" strokeDasharray="6 6" strokeWidth="2" />
                    <path d="M 320,160 Q 360,85 395,45" stroke="#eb5722" strokeDasharray="5 5" strokeWidth="2" />
                  </svg>

                  {/* Campus Walking Distance Badges */}
                  <div className="absolute top-6 right-6 bg-white border border-stone-800 px-3 py-1.5 rounded shadow-[2px_2px_0px_#171412] text-xs font-condensed font-bold uppercase tracking-wider text-maritime-dark flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-maritime-orange" />
                    <span>ITB Kampus Ganesha · 3 Menit Jalan Kaki</span>
                  </div>

                  <div className="absolute bottom-6 right-8 bg-white border border-stone-800 px-3 py-1.5 rounded shadow-[2px_2px_0px_#171412] text-xs font-condensed font-bold uppercase tracking-wider text-maritime-dark flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-maritime-dark" />
                    <span>UGM Bulaksumur · 4 Menit Jalan Kaki</span>
                  </div>

                  {/* Pin Sticky Note */}
                  <div className="absolute bottom-4 left-4 max-w-[200px] bg-[#fffcf0] p-3 shadow-md border border-stone-300 rotate-[-1deg] rounded-sm">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-600 shadow -mt-2 -ml-1 mb-1 border border-red-700" />
                    <p className="font-handwriting text-sm text-stone-800 leading-tight">
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
            {/* Visual Kiri: Filter & Payment Escrow Card (Pure Minimalist Canvas) */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-[#fcfbf7] editorial-border rounded-lg p-5 sm:p-6 shadow-[3px_3px_0px_#171412] hover:shadow-[5px_5px_0px_#171412] hover:-translate-y-0.5 transition-all relative overflow-hidden space-y-4">
                {/* Simulated Filter UI Chips */}
                <div>
                  <span className="text-[11px] font-mono-custom uppercase tracking-wider text-stone-500 block mb-2 font-bold">
                    Pilihan Fasilitas Prioritas
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-stone-900 text-white text-xs font-condensed font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-sm">
                      <span>✓ Kamar Mandi Dalam</span>
                    </span>
                    <span className="px-3 py-1.5 bg-stone-900 text-white text-xs font-condensed font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-sm">
                      <span>✓ Ber-AC</span>
                    </span>
                    <span className="px-3 py-1.5 bg-stone-900 text-white text-xs font-condensed font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow-sm">
                      <span>✓ Wifi Kencang</span>
                    </span>
                    <span className="px-3 py-1.5 bg-stone-100 text-stone-600 border border-stone-300 text-xs font-condensed font-bold uppercase tracking-wider rounded">
                      Parkir Mobil
                    </span>
                  </div>
                </div>

                {/* Price Range Slider Mockup */}
                <div className="pt-2">
                  <div className="flex justify-between items-center text-xs font-condensed font-bold uppercase tracking-wider text-stone-700 mb-2">
                    <span>Rentang Bujet Bulanan</span>
                    <span className="text-maritime-orange font-mono-custom font-bold">Rp 1.000.000 — Rp 2.500.000 / bln</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full relative">
                    <div className="bg-maritime-orange h-2 rounded-full absolute left-[20%] right-[30%]" />
                    <div className="w-4 h-4 bg-white border-2 border-stone-900 rounded-full absolute left-[20%] top-1/2 -translate-y-1/2 shadow" />
                    <div className="w-4 h-4 bg-white border-2 border-stone-900 rounded-full absolute right-[30%] top-1/2 -translate-y-1/2 shadow" />
                  </div>
                </div>

                {/* Escrow Guarantee Stamp */}
                <div className="p-3.5 bg-[#fdf9ee] border border-amber-300/80 rounded-md flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-condensed font-bold uppercase tracking-wider text-amber-950">
                      Sistem Rekening Bersama (Escrow Terproteksi)
                    </div>
                    <div className="text-[11px] text-stone-600 font-body leading-tight mt-0.5">
                      Uang sewa disimpan di rekening penampung dan baru diteruskan setelah serah terima kunci fisik berhasil.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teks Kanan */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <span className="font-mono-custom text-xs uppercase tracking-widest text-maritime-orange font-bold">
                03  Filter &amp; Transaksi
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl text-maritime-dark tracking-tight mt-1.5 leading-snug">
                Pencarian Terarah dengan Rekening Bersama Terproteksi
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 font-body leading-relaxed">
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
              <span className="font-mono-custom text-xs uppercase tracking-widest text-maritime-orange font-bold">
                04  Asisten Pintar &amp; Kurasi
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl text-maritime-dark tracking-tight mt-1.5 leading-snug">
                Asisten Spasial Cerdas dan Dukungan Kurator Lapangan
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 font-body leading-relaxed">
                Konsultasikan kriteria hunian impian Anda menggunakan bahasa sehari-hari. Asisten AI kami memproses data spasial untuk mencocokkan kamar terbaik, didukung kurator lapangan yang siap membantu survei fisik.
              </p>
              
              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-stone-700 font-body">
                  <span className="text-maritime-orange shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Pencarian Bahasa Alami (Beta):</strong> Rekomendasi unit akurat cukup dengan mengetik preferensi bujet dan fasilitas Anda.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-stone-700 font-body">
                  <span className="text-maritime-orange shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span><strong>Verifikasi Langsung Tim:</strong> Tersedia layanan inspeksi fisik dan bantuan perekaman video oleh tim kurator OpenTempeh.</span>
                </div>
              </div>
            </div>

            {/* Visual Kanan: AI Chat Mockup (Pure Minimalist Canvas) */}
            <div className="lg:col-span-7">
              <div className="bg-[#fcfbf7] editorial-border rounded-lg p-5 sm:p-6 shadow-[3px_3px_0px_#171412] hover:shadow-[5px_5px_0px_#171412] hover:-translate-y-0.5 transition-all relative overflow-hidden">
                {/* Chat Header Tag */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono-custom font-bold text-stone-700 uppercase">
                      OpenTempeh Spatial AI
                    </span>
                  </div>
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono-custom">
                    Beta
                  </span>
                </div>

                {/* Chat Bubbles Mockup */}
                <div className="pt-4 space-y-3 font-body">
                  {/* User Bubble */}
                  <div className="flex justify-end">
                    <div className="bg-stone-900 text-white text-xs p-3 rounded-t-lg rounded-bl-lg max-w-[85%] leading-relaxed shadow-sm">
                      &quot;Cari kos dekat gerbang barat ITB, bujet maks 2 juta, ada jendela luar yang terang dan meja kerja luas.&quot;
                    </div>
                  </div>

                  {/* AI Response Bubble */}
                  <div className="flex justify-start">
                    <div className="bg-white text-stone-800 text-xs p-3.5 rounded-t-lg rounded-br-lg max-w-[90%] border border-stone-300 leading-relaxed shadow-sm">
                      <div className="flex items-center gap-1.5 text-maritime-orange font-mono-custom text-[10px] font-bold uppercase mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-maritime-orange inline-block" />
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16"
        data-purpose="social-proof"
        id="testimoni"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-handwriting text-3xl text-maritime-orange block">
            Pengalaman Pengguna
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline tracking-tight uppercase leading-tight text-maritime-dark mt-1">
            Apa Kata Mereka yang Sudah Mencobanya?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-body leading-relaxed">
            Ratusan mahasiswa, pekerja, dan pemilik kos telah merasakan kemudahan menemukan dan menyewakan kamar secara transparan.
          </p>
        </div>

        {/* 3 Kartu Testimoni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Testimoni 1: Fokus Hasil */}
          <div className="bg-white editorial-border p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-maritime-orange mb-3">
                <svg className="w-6 h-6 fill-current opacity-60" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-body italic">
                &ldquo;Survei kos dari luar kota jadi sangat tenang. Begitu saya sampai di Bandung dan masuk kamar aslinya, tata letak dan luasnya persis 100% seperti tur 3D di OpenTempeh. Tidak ada zonk sama sekali!&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-stone-200 mt-5">
              <div className="font-condensed font-bold uppercase text-maritime-dark text-sm tracking-wider">
                Rizky Pratama
              </div>
              <div className="text-xs text-stone-500 font-mono-custom">
                Mahasiswa Baru ITB (Asal Surabaya)
              </div>
            </div>
          </div>

          {/* Testimoni 2: Membantah Keraguan Awal */}
          <div className="bg-white border-2 border-stone-800 p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div>
              <div className="text-maritime-orange mb-3">
                <svg className="w-6 h-6 fill-current opacity-60" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-body italic">
                &ldquo;Awalnya saya kira ini cuma gimmick render 3D biasa. Ternyata pencahayaan jendela dan detail sudut kamar mandi benar-benar nyata. Menghemat jutaan rupiah ongkos tiket survei fisik bolak-balik.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-stone-200 mt-5">
              <div className="font-condensed font-bold uppercase text-maritime-dark text-sm tracking-wider">
                Amanda Clarissa
              </div>
              <div className="text-xs text-stone-500 font-mono-custom">
                Karyawan Swasta (Domisili SCBD Jakarta)
              </div>
            </div>
          </div>

          {/* Testimoni 3: Dari Pemilik Kos */}
          <div className="bg-white editorial-border p-6 rounded-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-maritime-orange mb-3">
                <svg className="w-6 h-6 fill-current opacity-60" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-body italic">
                &ldquo;Kamar kos saya terisi penuh dalam 4 hari setelah ditautkan tur spasial OpenTempeh. Calon penyewa langsung yakin bayar tanpa harus saya dampingi berkali-kali untuk survei langsung.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-stone-200 mt-5">
              <div className="font-condensed font-bold uppercase text-maritime-dark text-sm tracking-wider">
                Hendra Gunawan
              </div>
              <div className="text-xs text-stone-500 font-mono-custom">
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
        <div className="bg-stone-900 text-white rounded-xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border-2 border-stone-800">
          <div className="relative z-10 max-w-3xl">
            {/* Tag Penawaran */}
            <div className="inline-block bg-maritime-orange text-white text-xs font-condensed font-bold uppercase tracking-widest px-3 py-1 rounded mb-3">
              Penawaran Terbatas untuk Hari Ini!
            </div>

            {/* Headline Urgensi */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline uppercase tracking-tight text-stone-100 leading-tight">
              Dapatkan Voucher Potongan Sewa Rp 250.000 Khusus 50 Pendaftar Pertama
            </h2>

            {/* Kalimat Urgensi */}
            <p className="mt-4 text-xs sm:text-sm text-stone-300 leading-relaxed font-body">
              Dapatkan akses bebas biaya ke seluruh Tur Spasial 3D eksklusif dan voucher potongan sewa bulan pertama sebesar <strong className="text-white">Rp 250.000</strong> khusus untuk <strong className="text-maritime-orange">50 orang pertama</strong> yang memesan kamar melalui OpenTempeh hari ini.
            </p>

            {/* Box Garansi 100% */}
            <div className="mt-6 bg-white/10 border border-white/20 p-4 sm:p-5 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-maritime-orange text-white flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-condensed font-bold uppercase text-white tracking-wider text-xs sm:text-sm">
                    Garansi Verifikasi Fisik 100%
                  </div>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    Jika kondisi atau dimensi ruangan saat Anda tiba di lokasi tidak sesuai dengan model tur spasial 3D kami, tim kurasi kami memberikan garansi 100% bantuan relokasi unit atau pengembalian seluruh booking fee Anda tanpa potongan.
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Penawaran */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#katalog"
                className="bg-maritime-orange hover:bg-orange-600 text-white px-7 py-3.5 rounded-full font-condensed font-bold uppercase tracking-wider text-xs sm:text-sm transition-colors shadow-lg flex items-center gap-2"
              >
                <span>AMBIL DISKON &amp; MULAI CARI KOS</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/3dgs-demo"
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 px-6 py-3.5 rounded-full font-condensed font-bold uppercase tracking-wider text-xs sm:text-sm transition-colors"
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
        data-purpose="final-cta"
      >
        <div className="max-w-3xl mx-auto">
          <span className="font-handwriting text-3xl sm:text-4xl text-maritime-orange block">
            Langkah Terakhir Anda
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline uppercase tracking-tight text-maritime-dark mt-2 leading-tight">
            Jangan Tunda Lagi, Temukan Kamar Kos Idaman Anda Sekarang!
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-body max-w-xl mx-auto">
            Hentikan buang waktu dan uang untuk survei yang mengecewakan. Nikmati kemudahan eksplorasi kamar kos akurat langsung dari ponsel Anda.
          </p>

          <div className="mt-8 flex justify-center">
            {/* Tombol CTA 2 (Sama dengan CTA 1) */}
            <Link
              className="inline-flex items-center gap-3 bg-maritime-dark hover:bg-stone-900 text-white px-8 py-4 rounded-full font-condensed font-bold uppercase tracking-wider text-sm shadow-2xl transition-transform hover:-translate-y-0.5"
              href="#katalog"
            >
              <span>MULAI SURVEI SPASIAL SEKARANG</span>
              <span className="w-5 h-5 rounded-full bg-maritime-orange text-white flex items-center justify-center">
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
        className="bg-maritime-darker text-stone-300 pt-14 pb-10 border-t-4 border-stone-800"
        data-purpose="main-footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
            {/* Brand Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 text-2xl font-headline tracking-wider text-white mb-3">
                <span>OPEN</span>
                <span className="text-maritime-orange">•</span>
                <span>TEMPEH</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
                OpenTempeh Spatial Platform – Solusi marketplace kamar kos dan hunian sewa berbasis rekonstruksi rekaman kamera ponsel. Memberikan kepastian ukuran skala 1:1 sebelum survei langsung.
              </p>
              <div className="mt-4 text-xs font-mono-custom text-stone-400">
                Kontak Dukungan: halo@opentempeh.id | WhatsApp: +62 812-3456-7890
              </div>
            </div>

            {/* Navigasi Cepat */}
            <div>
              <div className="font-condensed font-bold uppercase tracking-widest text-white text-xs mb-3">
                Navigasi Halaman
              </div>
              <ul className="space-y-2 text-xs uppercase tracking-wider font-condensed text-stone-400">
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
              <div className="font-condensed font-bold uppercase tracking-widest text-white text-xs mb-3">
                Notifikasi Unit Kos Baru
              </div>
              <p className="text-xs text-stone-400 mb-3 leading-relaxed">
                Dapatkan informasi kamar kos terverifikasi dekat kampus setiap awal pekan.
              </p>
              {subscribed ? (
                <div className="bg-stone-900 border border-stone-700 text-stone-200 text-xs p-2.5 rounded font-mono-custom">
                  Email Anda telah terdaftar.
                </div>
              ) : (
                <form className="space-y-2" onSubmit={handleSubscribe}>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 text-xs px-3 py-2 rounded text-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-mono-custom"
                    placeholder="Masukkan email Anda..."
                    type="email"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-maritime-orange hover:bg-orange-600 text-white text-xs font-condensed font-bold uppercase tracking-widest py-2 rounded transition-colors cursor-pointer font-bold shadow"
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
