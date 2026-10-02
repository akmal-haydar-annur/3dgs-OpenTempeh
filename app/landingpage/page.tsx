"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./landing.css";

export default function SplatKostLandingPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="bg-maritime-cream text-maritime-dark font-body antialiased selection:bg-maritime-orange selection:text-white paper-texture min-h-screen">
      {/* BEGIN: AnnouncementBar */}
      <aside
        aria-label="Announcements"
        className="bg-maritime-dark text-stone-200 text-xs tracking-wider uppercase font-condensed font-bold overflow-hidden border-b border-stone-800 py-2.5"
      >
        <div className="ticker-track flex items-center space-x-12">
          <div className="flex items-center space-x-12 shrink-0">
            <span className="flex items-center gap-2 text-stone-100">
              3D GAUSSIAN SPLATTING ENGINE V2.4 ONLINE
            </span>
            <span className="text-stone-600">•</span>
            <span>VIDEO-TO-3D DARI REKAMAN PONSEL BIASA</span>
            <span className="text-stone-600">•</span>
            <span>REAL-TIME 60FPS VOLUMETRIC ROOM TOURS</span>
            <span className="text-stone-600">•</span>
            <span>ZERO DISTORTION FISHEYE</span>
            <span className="text-stone-600">•</span>
            <span>100% AKURASI RUANGAN &amp; PENCAHAYAAN ALAMI</span>
            <span className="text-stone-600">•</span>
            <span>LISTING KOS TERVERIFIKASI NUSANTARA</span>
          </div>
          <div className="flex items-center space-x-12 shrink-0">
            <span className="flex items-center gap-2 text-stone-100">
              3D GAUSSIAN SPLATTING ENGINE V2.4 ONLINE
            </span>
            <span className="text-stone-600">•</span>
            <span>VIDEO-TO-3D DARI REKAMAN PONSEL BIASA</span>
            <span className="text-stone-600">•</span>
            <span>REAL-TIME 60FPS VOLUMETRIC ROOM TOURS</span>
            <span className="text-stone-600">•</span>
            <span>ZERO DISTORTION FISHEYE</span>
            <span className="text-stone-600">•</span>
            <span>100% AKURASI RUANGAN &amp; PENCAHAYAAN ALAMI</span>
            <span className="text-stone-600">•</span>
            <span>LISTING KOS TERVERIFIKASI NUSANTARA</span>
          </div>
        </div>
      </aside>
      {/* END: AnnouncementBar */}

      {/* BEGIN: MainHeader */}
      <header className="border-b border-maritime-border bg-[#f7f3eb]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Center Brand Logo */}
          <Link
            className="flex items-center space-x-2 text-2xl md:text-3xl font-headline tracking-wider text-maritime-dark hover:opacity-90 transition-opacity"
            href="/landingpage"
          >
            <span>Open</span>
            <span className="inline-flex items-center justify-center text-maritime-orange">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
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
            <span>Tempeh</span>
          </Link>

          {/* Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center space-x-8 text-sm font-condensed font-bold tracking-widest uppercase text-maritime-dark"
          >
            <a className="hover:text-maritime-orange transition-colors" href="#catalog">
              Jelajah Kos
            </a>
            <a className="hover:text-maritime-orange transition-colors" href="#journal">
              Alur Video-to-3D
            </a>
            <a className="hover:text-maritime-orange transition-colors" href="#superiority">
              Teknologi Splatting
            </a>
            <a className="hover:text-maritime-orange transition-colors" href="#pilar-bisnis">
              Layanan Mitra
            </a>
          </nav>

          {/* Right Utility Actions */}
          <div className="flex items-center space-x-6 text-maritime-dark">
            <Link
              href="/search"
              aria-label="Cari Kos Spasial"
              className="hover:text-maritime-orange transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </Link>
            <Link
              href="/dashboard"
              aria-label="Dashboard Mitra"
              className="hover:text-maritime-orange transition-colors"
              title="Dashboard Mitra Pemilik"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </Link>
            <Link
              className="inline-flex items-center gap-2 bg-maritime-dark hover:bg-stone-900 text-stone-100 px-5 py-2.5 rounded font-condensed font-bold uppercase tracking-wider text-xs shadow-md transition-colors border border-stone-700"
              href="/3dgs-demo"
            >
              <span>Demo</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>
      {/* END: MainHeader */}

      {/* BEGIN: HeroSection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12" data-purpose="hero">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-maritime-dark min-h-[580px] lg:min-h-[660px] flex flex-col justify-end border border-stone-800">
          {/* Photorealistic Room Splatting Viewport Background */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Modern student room interior reconstructed with 3D Gaussian Splatting from smartphone video"
              className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80"
            />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
          </div>

          {/* Hero Content Container */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row justify-between items-end gap-10">
            {/* Left Headlines */}
            <div className="max-w-2xl">
              {/* Volumetric Badge */}
              <div className="inline-flex items-center gap-2 bg-stone-900/80 border border-stone-700 text-stone-200 px-3.5 py-1 rounded-full text-xs font-condensed font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                <span className="text-maritime-orange">•</span>
                <span>Video-to-3D Spasial Rekonstruksi Mandiri</span>
              </div>

              {/* Main Heavy Display Title */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-headline tracking-tight uppercase leading-[0.9] text-white">
                <span className="text-maritime-orange">LIHAT KOS</span> <br />
                SEPERTI BERDIRI DI DALAMNYA. <br />
                <span className="text-stone-300 font-medium text-2xl sm:text-4xl block mt-2">
                  DARI REKAMAN VIDEO PONSEL BIASA.
                </span>
              </h1>
              <p className="mt-4 text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed font-body">
                Bukan foto panorama 360° yang terdistorsi atau pemindaian berbiaya mahal. Cukup rekam video ruangan menggunakan kamera ponsel Anda, platform Open Tempeh merekonstruksi miliaran titik cahaya fotorealistis untuk setiap sudut kamar kos secara presisi.
              </p>

              {/* Stamp Badge & Action Button Row */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {/* Platform Year Stamp */}
                <div className="bg-stone-900 border border-stone-700 h-10 text-center flex items-center text-stone-300 text-xs font-bold font-condensed uppercase px-3.5 py-1.5 rounded tracking-widest shadow">
                  PLATFORM SPASIAL 2026
                </div>

                {/* Pill CTA */}
                <Link
                  className="inline-flex items-center gap-3 bg-white hover:bg-stone-100 text-maritime-dark px-6 py-3 rounded-full font-condensed font-bold uppercase tracking-wider text-sm shadow-xl transition-transform hover:-translate-y-0.5"
                  href="/3dgs-demo"
                >
                  <span>Mulai Tur Spasial</span>
                </Link>

                <Link
                  className="inline-flex items-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700 px-5 py-3 rounded-full font-condensed font-bold uppercase tracking-wider text-sm backdrop-blur-sm transition-colors"
                  href="#journal"
                >
                  <span>Pelajari Alur 3 Langkah</span>
                </Link>
              </div>
            </div>

            {/* Right Side: Spatial Market Card (Torn Jagged Paper Style with Washi Tape) */}
            <div className="w-full max-w-sm lg:w-80 bg-[#fffdfa] text-maritime-dark p-6 rounded shadow-2xl relative torn-top border-t-4 border-stone-800">
              {/* Tape effect at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 washi-tape border border-stone-300/60" />
              <div className="text-center border-b border-stone-200 pb-3">
                <span className="font-handwriting text-3xl text-maritime-dark block leading-none">
                  Spatial
                </span>
                <span className="font-headline uppercase tracking-widest text-xl text-maritime-dark -mt-1 block">
                  Listing
                </span>
              </div>

              {/* 3DGS Cluster Stamp Graphic */}
              <div className="py-4 flex flex-col items-center justify-center">
                <div className="relative w-28 h-24 flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-maritime-orange drop-shadow"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="5" cy="8" opacity="0.6" r="3" />
                    <circle cx="19" cy="7" opacity="0.6" r="3" />
                    <circle cx="7" cy="18" opacity="0.5" r="3.2" />
                    <circle cx="17" cy="17" opacity="0.7" r="3.5" />
                  </svg>
                </div>
                <div className="mt-1 font-headline uppercase text-stone-800 text-base tracking-wider">
                  Kost Studio Kemang
                </div>
                <div className="inline-block bg-stone-100 text-stone-700 text-[10px] font-bold font-condensed px-2 py-0.5 mt-0.5 rounded tracking-widest uppercase">
                  Jakarta Selatan • Rekonstruksi Video HP
                </div>
                <div className="text-xs font-headline tracking-wider text-maritime-orange font-bold mt-1">
                  Rp 2.800.000 <span className="text-[10px] font-body text-stone-600">/ bulan</span>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-3 text-xs text-stone-600 text-center leading-relaxed">
                Rekonstruksi mandiri dari rekaman ponsel resolusi 4K. Skala 1:1 bebas distorsi lensa kamera dan siap jelajah 60 FPS.
                <Link
                  className="block font-bold text-maritime-dark mt-2 underline decoration-maritime-orange underline-offset-2 hover:text-maritime-orange"
                  href="/3dgs-demo"
                >
                  Buka Viewer Spasial ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: HeroSection */}

      {/* BEGIN: BoldMissionBanner */}
      <section
        className="border-y border-maritime-border bg-[#f8f5ee] py-10"
        data-purpose="mission-ticker"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-headline tracking-tight uppercase leading-snug text-maritime-dark max-w-5xl mx-auto">
            DITENAGAI MILIARAN GAUSSIAN PARTICLES{" "}
            <span className="inline-block text-maritime-orange">•</span> REKONSTRUKSI FOTOREALISTIS DARI VIDEO PONSEL{" "}
            <span className="inline-block text-maritime-orange">•</span> AKURASI DIMENSI 100% BEBAS JEBAKAN KAMERA WIDE-ANGLE
          </h2>
        </div>
      </section>
      {/* END: BoldMissionBanner */}

      {/* BEGIN: ProductCatalogSection */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        data-purpose="product-catalog"
        id="catalog"
      >
        {/* Section Subhead / Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-maritime-border">
          <div>
            <span className="font-handwriting text-3xl text-maritime-orange block">
              Koleksi Pilihan
            </span>
            <h3 className="font-headline text-3xl sm:text-4xl tracking-tight uppercase text-maritime-dark">
              KOLEKSI KOS UNGGULAN SIAP JELAJAH SPASIAL
            </h3>
          </div>
          <p className="text-sm text-stone-600 max-w-xs mt-2 md:mt-0 font-condensed uppercase tracking-wider">
            Unit terverifikasi dengan rekonstruksi video 3DGS mandiri. Jelajahi sudut dan dimensi asli sebelum datang survei fisik.
          </p>
        </div>

        {/* Product Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kos 001: Kost Rukita Terra Kemang */}
          <div className="bg-maritime-warmCard editorial-border rounded-sm p-4 flex flex-col justify-between hover:shadow-lg transition-shadow relative">
            <div className="flex justify-between items-baseline border-b border-stone-200 pb-2">
              <span className="font-handwriting text-2xl text-maritime-orange">
                Jakarta Selatan
              </span>
              <span className="font-mono-custom text-xs text-stone-400 font-bold">001</span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <h4 className="font-condensed font-bold uppercase tracking-wider text-base text-maritime-dark">
                Kost Rukita Terra Kemang
              </h4>
              <span className="font-headline text-lg text-maritime-dark">Rp 3.200.000</span>
            </div>

            {/* Image Container */}
            <div className="my-5 h-44 rounded overflow-hidden relative bg-stone-50/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Kost Rukita Terra Kemang Modern Room"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80"
              />
              <div className="absolute top-2 left-2 bg-stone-900/90 backdrop-blur text-stone-200 font-mono-custom text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-stone-700">
                60 FPS GAUSSIAN
              </div>
            </div>

            {/* Card Bottom Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
              <Link
                href="/3dgs-demo"
                className="flex-1 bg-white hover:bg-stone-900 hover:text-white border border-stone-300 py-2.5 text-xs font-condensed uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>MASUK RUANG 3D</span>
              </Link>
              <button
                aria-label="Simpan Kos"
                className="p-2.5 border border-stone-300 hover:text-maritime-orange transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Kos 002: Kost Pods Dago Sanctuary */}
          <div className="bg-maritime-warmCard border-2 border-stone-700 shadow-md rounded-sm p-4 flex flex-col justify-between relative">
            <div className="flex justify-between items-baseline border-b border-stone-200 pb-2">
              <span className="font-handwriting text-2xl text-maritime-orange">Bandung</span>
              <span className="font-mono-custom text-xs text-stone-700 font-bold">002</span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <h4 className="font-condensed font-bold uppercase tracking-wider text-base text-maritime-dark">
                Kost Pods Dago Sanctuary
              </h4>
              <span className="font-headline text-lg text-maritime-orange">Rp 1.950.000</span>
            </div>

            {/* Image Container */}
            <div className="my-5 h-44 rounded overflow-hidden relative bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Kost Pods Dago Sanctuary Modern Room with Natural Light"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
              />
              <div className="absolute top-2 left-2 bg-stone-900 text-stone-200 font-mono-custom text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-stone-700">
                VIDEO-TO-SPLATS
              </div>
            </div>

            {/* Card Bottom Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
              <Link
                href="/3dgs-demo"
                className="flex-1 bg-maritime-dark hover:bg-stone-800 text-white py-2.5 text-xs font-condensed uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>MASUK RUANG 3D</span>
              </Link>
              <button
                aria-label="Simpan Kos"
                className="p-2.5 border border-stone-300 text-stone-700 hover:text-maritime-orange transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" stroke="none" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Kos 003: Kost Loft Gejayan Sleman */}
          <div className="bg-maritime-warmCard editorial-border rounded-sm p-4 flex flex-col justify-between hover:shadow-lg transition-shadow relative">
            <div className="flex justify-between items-baseline border-b border-stone-200 pb-2">
              <span className="font-handwriting text-2xl text-maritime-orange">Yogyakarta</span>
              <span className="font-mono-custom text-xs text-stone-400 font-bold">003</span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <h4 className="font-condensed font-bold uppercase tracking-wider text-base text-maritime-dark">
                Kost Loft Gejayan Sleman
              </h4>
              <span className="font-headline text-lg text-maritime-dark">Rp 1.600.000</span>
            </div>

            {/* Image Container */}
            <div className="my-5 h-44 rounded overflow-hidden relative bg-stone-50/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Kost Loft Gejayan Sleman Yogyakarta Studio room"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80"
              />
              <div className="absolute top-2 left-2 bg-stone-900/90 backdrop-blur text-stone-200 font-mono-custom text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-stone-700">
                METRIC VERIFIED
              </div>
            </div>

            {/* Card Bottom Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
              <Link
                href="/3dgs-demo"
                className="flex-1 bg-white hover:bg-stone-900 hover:text-white border border-stone-300 py-2.5 text-xs font-condensed uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>MASUK RUANG 3D</span>
              </Link>
              <button
                aria-label="Simpan Kos"
                className="p-2.5 border border-stone-300 hover:text-maritime-orange transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* END: ProductCatalogSection */}

      {/* BEGIN: OceanJournalSection (Self-Serve Video-to-3DGS Pipeline & Campus Map) */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        data-purpose="ocean-journal"
        id="journal"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Dark Textured Journal with 3-Step Self-Serve Polaroids */}
          <div className="lg:col-span-6 bg-[#16120e] text-white p-8 sm:p-10 rounded-2xl relative overflow-hidden shadow-2xl border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-3xl sm:text-4xl font-headline tracking-wide uppercase">
                  ALUR REKAMAN VIDEO MANDIRI
                </h3>
                <span className="bg-stone-800 border border-stone-700 text-stone-200 text-[11px] font-condensed font-bold uppercase tracking-widest px-3 py-1 rounded">
                  3 Langkah Mudah
                </span>
              </div>
              <p className="text-stone-400 text-xs mt-2 uppercase tracking-widest font-mono-custom">
                Self-Serve Video-to-3DGS • Cukup Kamera Ponsel
              </p>
            </div>

            {/* Polaroid Collage Centerpiece illustrating the 3 Steps */}
            <div className="my-8 grid grid-cols-3 gap-3 sm:gap-4 relative">
              {/* Step 1 Polaroid */}
              <div className="bg-white p-2 pb-5 shadow-xl rotate-[-3deg] transform hover:rotate-0 transition-transform relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 washi-tape border border-stone-300/40" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Merekam kamar kos dengan kamera smartphone"
                  className="w-full h-28 sm:h-36 object-cover"
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80"
                />
                <span className="block mt-2 font-handwriting text-stone-800 text-xs text-center leading-tight">
                  1. Rekam via ponsel
                </span>
              </div>

              {/* Step 2 Polaroid */}
              <div className="bg-white p-2 pb-5 shadow-xl rotate-[2deg] transform hover:rotate-0 transition-transform mt-2 relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 washi-tape border border-stone-300/40" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Unggah file rekaman video ke platform"
                  className="w-full h-28 sm:h-36 object-cover"
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"
                />
                <span className="block mt-2 font-handwriting text-stone-800 text-xs text-center leading-tight">
                  2. Unggah ke platform
                </span>
              </div>

              {/* Step 3 Polaroid */}
              <div className="bg-white p-2 pb-5 shadow-xl rotate-[-2deg] transform hover:rotate-0 transition-transform relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 washi-tape border border-stone-300/40" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Model 3D photorealistic kamar selesai direkonstruksi"
                  className="w-full h-28 sm:h-36 object-cover"
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
                />
                <span className="block mt-2 font-handwriting text-stone-800 text-xs text-center leading-tight">
                  3. Jelajah 3D 60 FPS
                </span>
              </div>
            </div>

            {/* Bottom Tagline */}
            <div className="text-center pt-4 border-t border-stone-800">
              <h4 className="font-headline text-2xl uppercase tracking-wider text-stone-200">
                REKONSTRUKSI FOTOREALISTIS BEBAS ALAT MAHAL
              </h4>
              <span className="font-handwriting text-3xl text-maritime-orange block -mt-1">
                Kamera di Saku Anda Menjadi Pemindai Spasial
              </span>
            </div>
          </div>

          {/* Right Column: Cartographic Fishery Style Campus & Kos Map */}
          <div className="lg:col-span-6 bg-[#fcfaf6] editorial-border rounded-2xl p-8 relative flex flex-col justify-between shadow-sm overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-mono-custom uppercase tracking-widest text-stone-400">
                  Section 04 Spasial Teritorial
                </div>
                <h4 className="font-headline text-2xl sm:text-3xl uppercase text-maritime-dark tracking-tight">
                  PETA RADIUS SPASIAL KOS
                </h4>
              </div>
            </div>

            {/* Illustrated Coastline Map Style Canvas */}
            <div className="relative my-6 min-h-[320px] w-full border border-dashed border-stone-300 rounded-lg p-4 bg-[#f8f5ee]/70">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                fill="none"
                viewBox="0 0 500 320"
              >
                <path
                  d="M 40,0 Q 80,60 50,110 T 60,190 T 30,280 L 10,320"
                  fill="none"
                  stroke="#d5ccc0"
                  strokeDasharray="4 4"
                  strokeWidth="3"
                />
                <path
                  d="M 120,260 Q 220,210 320,200 T 440,160"
                  fill="none"
                  stroke="#5c646d"
                  strokeDasharray="6 6"
                  strokeWidth="2"
                />
                <path
                  d="M 320,200 Q 360,110 400,60"
                  fill="none"
                  stroke="#c94a08"
                  strokeDasharray="6 6"
                  strokeWidth="2"
                />
              </svg>

              {/* UI Depok Tag */}
              <div className="absolute top-6 right-16 bg-white border border-stone-300 px-3 py-1 rounded shadow-sm text-xs font-condensed font-bold uppercase tracking-wider text-maritime-dark flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-stone-700" />
                UI Depok Cluster (4.200 Kos 3D)
              </div>

              {/* ITB Bandung Tag */}
              <div className="absolute top-36 right-36 bg-white border border-stone-300 px-3 py-1 rounded shadow-sm text-xs font-condensed font-bold uppercase tracking-wider text-maritime-dark flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-stone-700" />
                Ganesha ITB (3.150 Kos 3D)
              </div>

              {/* UGM Yogyakarta Tag */}
              <div className="absolute bottom-10 right-14 bg-white border border-stone-300 px-3 py-1 rounded shadow-sm text-xs font-condensed font-bold uppercase tracking-wider text-maritime-dark flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-stone-700" />
                Bulaksumur UGM (2.800 Kos 3D)
              </div>

              {/* Pinned Note on Map */}
              <div className="absolute bottom-4 left-4 max-w-[210px] bg-[#fff9ea] p-3 shadow-md border border-stone-300 rotate-[-1deg] torn-top">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-stone-700 shadow -mt-2 -ml-1 mb-1" />
                <p className="font-handwriting text-sm text-stone-800 leading-tight">
                  Catatan Jarak Kaki ke Stasiun/Kampus: Setiap kos memuat rute walk-time interaktif langsung ke gerbang utama.
                </p>
              </div>
            </div>

            {/* Legend / Footer */}
            <div className="flex items-center justify-between text-xs font-mono-custom text-stone-500 pt-3 border-t border-stone-200">
              <span>LAT -6.2088° S • LON 106.8456° E</span>
              <span className="text-stone-700 font-bold font-condensed uppercase tracking-wider">
                ● Sinkronisasi Radius Spasial Otomatis
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* END: OceanJournalSection */}

      {/* BEGIN: HarvestAndDemandSection (Komparasi & Sertifikasi Akurasi) */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        data-purpose="harvest-and-demand"
        id="superiority"
      >
        {/* Top Row: Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-5">
            <h3 className="text-4xl sm:text-5xl font-headline tracking-tight uppercase leading-[0.95] text-maritime-dark">
              TEKNOLOGI 3D <br />
              BEBAS TIPU UKURAN
            </h3>
            <div className="mt-3 inline-block bg-stone-900 text-stone-200 border border-stone-700 text-xs font-condensed font-bold uppercase tracking-widest px-3 py-1 rounded">
              Standar Baru Pencarian Kos
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-stone-600 max-w-sm">
              Foto konvensional lensa ultra-wide sering membuat kamar kos berukuran 2x3m tampak seperti aula hotel. Rekonstruksi 3D Gaussian Splatting menjamin persepsi kedalaman dan skala 1:1 tanpa ilusi optik.
            </p>
            <Link
              className="bg-maritime-dark hover:bg-stone-900 text-white px-6 py-3 rounded text-xs font-condensed font-bold tracking-widest uppercase flex items-center gap-3 transition-colors shrink-0 border border-stone-700"
              href="/3dgs-demo"
            >
              <span>Ukur Kamar Sekarang</span>
            </Link>
          </div>
        </div>

        {/* Middle Row: Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Kenapa Bukan Foto 360 Biasa */}
          <div className="md:col-span-5 bg-white editorial-border p-6 rounded-lg flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div>
              <h4 className="font-headline text-xl sm:text-2xl uppercase tracking-wide text-maritime-dark">
                KENAPA BUKAN <br /> FOTO 360° BIASA?
              </h4>
            </div>
            <div className="py-4 space-y-3">
              <div className="bg-stone-50 p-3.5 rounded border border-stone-200">
                <span className="font-condensed font-bold text-xs uppercase tracking-wider text-stone-500 block mb-1">
                  Foto 360° Panorama Konvensional
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Distorsi bola (fisheye), sudut ruangan melengkung buatan, ukuran sprei dan meja tampak 2x lebih besar, cermin buram tanpa kedalaman parallax asli.
                </p>
              </div>
              <div className="bg-stone-50 p-3.5 rounded border border-stone-300">
                <span className="font-condensed font-bold text-xs uppercase tracking-wider text-maritime-dark block mb-1">
                  3D Gaussian Splatting (Video-to-3D)
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Miliaran partikel radiasi fotorealistis dari rekaman kamera ponsel biasa. Pengguna dapat berjalan bebas ke setiap sudut ruangan dengan pantulan pencahayaan asli dan akurasi skala 1:1.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-stone-200">
              <div className="flex items-center gap-2 text-stone-800 font-bold font-condensed text-xs tracking-wider uppercase">
                Teknologi: Video-to-3DGS Neural Reconstruction
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Akurasi skala 1:1 terkalibrasi langsung dengan denah fisik asli ruangan.
              </p>
            </div>
          </div>

          {/* Card 2: Sertifikasi Akurasi Spasial 100% */}
          <div className="md:col-span-7 bg-white editorial-border p-6 rounded-lg flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-baseline mb-4">
              <h4 className="font-headline text-xl sm:text-2xl uppercase tracking-wide text-maritime-dark">
                SERTIFIKASI AKURASI <br /> SPASIAL 100%
              </h4>
              <span className="font-handwriting text-3xl text-maritime-orange">Garansi Akurat</span>
            </div>
            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="overflow-hidden rounded border border-stone-200 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Detail arsitektur kamar kos dengan pencahayaan alami"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
              <div className="overflow-hidden rounded border border-stone-200 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Kamar studio kos modern rapi"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-500 pt-4 border-t border-stone-200 mt-4 font-mono-custom">
              <span>Kode Audit: #OPT-CERT-2026</span>
              <span className="text-maritime-dark font-bold font-condensed uppercase">
                Divalidasi Tim Kurasi Open Tempeh
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Row: 3 Pilar Model Bisnis & Layanan Mitra */}
        <div className="mt-8 bg-[#fcfaf6] editorial-border rounded-xl p-6 sm:p-8" id="pilar-bisnis">
          <div className="mb-8">
            <span className="bg-stone-200 text-stone-700 text-[11px] font-condensed font-bold uppercase tracking-widest px-2.5 py-1 rounded">
              Model Bisnis &amp; Layanan Mitra Pemilik Kos
            </span>
            <h4 className="font-headline text-3xl sm:text-4xl uppercase tracking-tight text-maritime-dark mt-3 leading-none">
              3 PILAR EKOSISTEM OPEN TEMPEH
            </h4>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Solusi terstruktur bagi pemilik dan pengelola kos untuk meningkatkan okupansi kamar, memvalidasi integritas data fisik, serta memaksimalkan daya tarik visual bagi pencari kos modern.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pilar 1: Promosi Algoritmik Platform */}
            <div className="bg-white border border-stone-300 p-6 rounded-lg flex flex-col justify-between shadow-sm hover:border-stone-500 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="text-xs font-mono-custom text-stone-500 font-bold uppercase tracking-widest">
                    Pilar 01
                  </span>
                  <span className="text-xs font-condensed font-bold uppercase tracking-wider text-maritime-orange bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    Visibilitas Organik
                  </span>
                </div>
                <h5 className="font-headline text-xl uppercase tracking-wide text-maritime-dark mt-4">
                  PROMOSI ALGORITMIK PLATFORM
                </h5>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Eksposur kamar berbasis relevansi pencarian cerdas, radius kampus/kantor, dan interaksi tur 3D tanpa manipulasi listing berbayar.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-stone-700 border-t border-stone-100 pt-3">
                  <li className="flex items-start gap-2">
                    <span className="text-maritime-orange font-bold">•</span>
                    <span>Distribusi ranking otomatis sesuai kedekatan lokasi &amp; waktu tempuh nyata</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-maritime-orange font-bold">•</span>
                    <span>Apresiasi visibilitas bagi unit dengan kelengkapan data &amp; tur 3D aktif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-maritime-orange font-bold">•</span>
                    <span>Konversi booking lebih tinggi tanpa biaya iklan manipulatif</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-200 text-xs font-mono-custom text-stone-500">
                Peringkat Berbasis Kualitas Data
              </div>
            </div>

            {/* Pilar 2: Jasa Survei Lapangan Terverifikasi */}
            <div className="bg-white border-2 border-stone-800 p-6 rounded-lg flex flex-col justify-between shadow-md relative">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="text-xs font-mono-custom text-stone-700 font-bold uppercase tracking-widest">
                    Pilar 02
                  </span>
                  <span className="text-xs font-condensed font-bold uppercase tracking-wider text-stone-100 bg-stone-900 px-2 py-0.5 rounded">
                    Kurasi Fisik
                  </span>
                </div>
                <h5 className="font-headline text-xl uppercase tracking-wide text-maritime-dark mt-4">
                  JASA SURVEI LAPANGAN TERVERIFIKASI
                </h5>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Layanan pengecekan fisik unit oleh tim kurator untuk memverifikasi fasilitas, dimensi, dan keamanan kos bagi pemilik yang berada di luar kota.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-stone-700 border-t border-stone-100 pt-3">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-800 font-bold">•</span>
                    <span>Pemeriksaan langsung fasilitas kamar mandi, AC, ventilasi, dan sanitasi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-800 font-bold">•</span>
                    <span>Audit dimensi riil ruangan dengan alat ukur standar arsitektur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-800 font-bold">•</span>
                    <span>Laporan inspeksi berkala untuk pemilik properti tanpa repot kunjungan fisik</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-200 text-xs font-mono-custom text-stone-500">
                Verifikasi Lapangan Independen
              </div>
            </div>

            {/* Pilar 3: Layanan Bantuan Scanning Kamera Berkualitas */}
            <div className="bg-white border border-stone-300 p-6 rounded-lg flex flex-col justify-between shadow-sm hover:border-stone-500 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="text-xs font-mono-custom text-stone-500 font-bold uppercase tracking-widest">
                    Pilar 03
                  </span>
                  <span className="text-xs font-condensed font-bold uppercase tracking-wider text-stone-800 bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                    Produksi Premium
                  </span>
                </div>
                <h5 className="font-headline text-xl uppercase tracking-wide text-maritime-dark mt-4">
                  BANTUAN SCANNING KAMERA BERKUALITAS
                </h5>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Layanan perekaman profesional bagi pemilik yang menginginkan hasil rekonstruksi 3DGS maksimal menggunakan kamera mirrorless/cinema-grade beresolusi tinggi.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-stone-700 border-t border-stone-100 pt-3">
                  <li className="flex items-start gap-2">
                    <span className="text-maritime-orange font-bold">•</span>
                    <span>Perekaman oleh tim videografer berspesifikasi sensor full-frame &amp; dynamic range tinggi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-maritime-orange font-bold">•</span>
                    <span>Pencahayaan presisi untuk detail material kayu, kain sprei, dan tekstur dinding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-maritime-orange font-bold">•</span>
                    <span>Ideal untuk unit eksklusif, paviliun mandiri, dan co-living modern</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-200 text-xs font-mono-custom text-stone-500">
                Hasil Visual Standar Sinematik
              </div>
            </div>
          </div>

          {/* Mitra Action Banner */}
          <div className="mt-8 bg-stone-900 text-white rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-stone-800">
            <div>
              <span className="text-xs font-mono-custom text-stone-400 uppercase tracking-widest">
                Kemitraan Pemilik Properti
              </span>
              <h5 className="font-headline text-2xl uppercase tracking-wider mt-1 text-stone-100">
                Daftarkan Unit Kos Anda Hari Ini
              </h5>
              <p className="text-xs text-stone-300 mt-1 max-w-xl leading-relaxed">
                Mulai dari rekaman mandiri dengan kamera ponsel Anda secara mandiri, atau hubungi tim kami untuk bantuan survei fisik dan rekaman kamera berkualitas.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/dashboard"
                className="bg-white hover:bg-stone-100 text-maritime-dark px-5 py-2.5 rounded font-condensed font-bold uppercase tracking-wider text-xs transition-colors"
              >
                Buka Dashboard Mitra
              </Link>
              <Link
                href="/3dgs-demo"
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 px-5 py-2.5 rounded font-condensed font-bold uppercase tracking-wider text-xs transition-colors"
              >
                Uji Coba Tur 3D
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* END: HarvestAndDemandSection */}

      {/* BEGIN: MainFooter */}
      <footer
        className="bg-maritime-darker text-stone-300 pt-16 pb-12 border-t-4 border-stone-800 mt-12"
        data-purpose="main-footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Grid: Brand & Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
            {/* Brand Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 text-2xl font-headline tracking-wider text-white mb-4">
                <span>OPEN</span>
                <span className="text-maritime-orange">•</span>
                <span>TEMPEH</span>
              </div>
              <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
                Platform marketplace kos dan co-living generasi baru Indonesia dengan teknologi 3D Gaussian Splatting berbasis rekaman video biasa. Jelajahi setiap sudut kamar dengan skala 1:1 sebelum datang langsung.
              </p>
              <div className="mt-6 flex items-center space-x-3 text-xs font-condensed font-bold uppercase tracking-widest text-stone-400">
                <span>Jakarta</span>
                <span>•</span>
                <span>Bandung</span>
                <span>•</span>
                <span>Yogyakarta</span>
                <span>•</span>
                <span>Surabaya</span>
                <span>•</span>
                <span>Malang</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-condensed font-bold uppercase tracking-widest text-white text-sm mb-4">
                Eksplorasi Spasial
              </h5>
              <ul className="space-y-2.5 text-xs uppercase tracking-wider font-condensed text-stone-400">
                <li>
                  <a className="hover:text-stone-200 transition-colors" href="#catalog">
                    Jelajah Kos 3D
                  </a>
                </li>
                <li>
                  <a className="hover:text-stone-200 transition-colors" href="#journal">
                    Alur Video-to-3D
                  </a>
                </li>
                <li>
                  <a className="hover:text-stone-200 transition-colors" href="#superiority">
                    Ukur Kamar Spasial
                  </a>
                </li>
                <li>
                  <Link className="hover:text-stone-200 transition-colors" href="/3dgs-demo">
                    SuperSplat Viewer Demo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mitra Pemilik Kos */}
            <div>
              <h5 className="font-condensed font-bold uppercase tracking-widest text-white text-sm mb-4">
                Layanan Mitra Kos
              </h5>
              <ul className="space-y-2.5 text-xs uppercase tracking-wider font-condensed text-stone-400">
                <li>
                  <a className="hover:text-stone-200 transition-colors" href="#pilar-bisnis">
                    Promosi Algoritmik Platform
                  </a>
                </li>
                <li>
                  <a className="hover:text-stone-200 transition-colors" href="#pilar-bisnis">
                    Jasa Survei Lapangan
                  </a>
                </li>
                <li>
                  <a className="hover:text-stone-200 transition-colors" href="#pilar-bisnis">
                    Scanning Kamera Berkualitas
                  </a>
                </li>
                <li>
                  <Link className="hover:text-stone-200 transition-colors" href="/dashboard">
                    Dashboard Mitra Pemilik
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter / Dispatch */}
            <div>
              <h5 className="font-condensed font-bold uppercase tracking-widest text-white text-sm mb-4">
                Update Kos Spasial Mingguan
              </h5>
              <p className="text-xs text-stone-400 mb-3">
                Update kamar kos siap huni yang baru selesai dipindai setiap hari Senin.
              </p>
              {subscribed ? (
                <div className="bg-stone-900 border border-stone-700 text-stone-200 text-xs p-3 rounded font-mono-custom">
                  Terima kasih. Anda telah terdaftar dalam buletin berkala Open Tempeh.
                </div>
              ) : (
                <form className="space-y-2" onSubmit={handleSubscribe}>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 text-xs px-3 py-2 rounded text-white focus:ring-1 focus:ring-stone-400 focus:border-stone-400 font-mono-custom"
                    placeholder="Masukkan email kamu..."
                    type="email"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-stone-800 hover:bg-stone-700 border border-stone-600 text-white text-xs font-condensed font-bold uppercase tracking-widest py-2 rounded transition-colors cursor-pointer"
                  >
                    Langganan Notifikasi
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-mono-custom gap-4">
            <div>© 2026 OPEN TEMPEH SPATIAL PLATFORM. ALL RIGHTS RESERVED.</div>
            <div className="flex items-center space-x-6">
              <a className="hover:text-stone-300 transition-colors" href="#">
                Kebijakan Privasi
              </a>
              <a className="hover:text-stone-300 transition-colors" href="#">
                Syarat &amp; Ketentuan
              </a>
              <Link className="hover:text-stone-300 transition-colors" href="/3dgs-demo">
                SplatViewer Engine
              </Link>
            </div>
          </div>
        </div>
      </footer>
      {/* END: MainFooter */}
    </div>
  );
}
