"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { KOS_DATA } from "../../search/data";
import "../detail.css";

export default function KosDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const kos =
    KOS_DATA.find((k) => k.id === resolvedParams.id) || KOS_DATA[0];

  const [activeTab, setActiveTab] = useState("detail-properti");
  const [isFavorited, setIsFavorited] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(1);
  const [copiedToast, setCopiedToast] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const navLinks = [
    { id: "detail-properti", label: "Foto Properti" },
    { id: "fasilitas-kamar", label: "Fasilitas Kamar" },
    { id: "fasilitas-umum", label: "Fasilitas Umum" },
    { id: "lokasi-area", label: "Lokasi" },
    { id: "ulasan-penghuni", label: "Review" },
    { id: "pemilik-kos", label: "Pemilik Kos" },
  ];

  // 4 recommendations matching editorial catalog
  const recommendations = [
    {
      title: "Kost BJ 30 Tipe A Cidadap",
      category: "Putra",
      location: "Cidadap, Bandung",
      specs: "K. Mandi Dalam • WiFi • AC",
      price: "Rp1.350.000",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
      link: "/kos/kost-grha-gratia-tipe-a",
    },
    {
      title: "Kost Rumah Alida Cidadap",
      category: "Putri",
      location: "Cidadap, Bandung",
      specs: "Kasur • K. Mandi Luar • Dapur",
      price: "Rp950.000",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
      link: "/kos/kost-putri-tembalang-asri",
    },
    {
      title: "Kost Fikri Mahyudin Tipe B",
      category: "Campur",
      location: "Cibeunying Kidul",
      specs: "Termasuk Listrik • Kasur • WiFi",
      price: "Rp1.150.000",
      rating: "4.7",
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80",
      link: "/kos/kost-putra-banyu-biru",
    },
    {
      title: "Kost GG House 45C Tipe A",
      category: "Campur",
      location: "Coblong, Bandung",
      specs: "K. Mandi Dalam • Parkir Motor",
      price: "Rp1.450.000",
      rating: "5.0",
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
      link: "/kos/kost-grha-gratia-tipe-a",
    },
  ];

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased">
      {/* Toast Alert */}
      {copiedToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#191c1e] text-white px-4 py-2 rounded shadow-lg text-xs font-label-md flex items-center gap-2 border border-outline">
          <span className="material-symbols-outlined text-[16px] text-primary-fixed">
            check_circle
          </span>
          <span>Tautan tersalin ke clipboard!</span>
        </div>
      )}

      {/* HEADER EXACT FROM TEMPLATE */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-28 w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin flex flex-col justify-between pt-space-xs">
          <div className="flex items-center justify-between gap-space-md py-space-xs">
            <div className="flex items-center gap-space-sm">
              <Link
                href="/search"
                aria-label="Kembali"
                className="w-9 h-9 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  arrow_back
                </span>
              </Link>
              <div className="hidden sm:flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
                <Link href="/" className="hover:text-on-surface cursor-pointer">
                  HOME
                </Link>
                <span>/</span>
                <Link
                  href="/search"
                  className="hover:text-on-surface cursor-pointer"
                >
                  KOST {kos.city.toUpperCase()}
                </Link>
                <span>/</span>
                <span className="text-primary font-bold">SPLATKOST</span>
              </div>
            </div>

            <div className="flex-1 max-w-lg mx-space-sm">
              <div className="relative flex items-center bg-surface-container-lowest rounded px-space-md py-space-xs shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <span className="material-symbols-outlined text-outline text-[18px] mr-space-xs">
                  search
                </span>
                <input
                  className="w-full bg-transparent font-label-md text-label-md text-on-surface placeholder:text-outline focus:outline-none"
                  placeholder="Cari di mamikos / SPLATKOST"
                  type="text"
                  defaultValue={kos.subdistrict}
                />
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-space-xs py-0.5 rounded hidden md:inline-block">
                  ESC
                </span>
              </div>
            </div>

            <div className="flex items-center gap-space-md">
              <button
                onClick={handleShare}
                aria-label="Bagikan"
                className="w-9 h-9 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  share
                </span>
              </button>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                aria-label="Simpan"
                className={`w-9 h-9 rounded flex items-center justify-center transition-colors cursor-pointer ${
                  isFavorited
                    ? "bg-secondary-fixed text-primary"
                    : "bg-surface-container-high hover:bg-surface-container-highest text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isFavorited ? "favorite" : "favorite_border"}
                </span>
              </button>
              <Link
                href="/dashboard"
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  person
                </span>
              </Link>
            </div>
          </div>

          <div className="relative flex items-center overflow-x-auto no-scrollbar pt-space-xs">
            <nav
              className="flex items-center gap-space-sm pb-space-xs"
              data-active-classes="bg-primary-container text-on-primary-container font-label-md font-bold rounded"
            >
              {navLinks.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <a
                    key={tab.id}
                    href={`#${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-space-md py-space-xs whitespace-nowrap transition-colors rounded ${
                      isActive
                        ? "bg-primary-container text-on-primary-container font-label-md font-bold"
                        : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {tab.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full pt-28 pb-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
          <div className="flex flex-col w-full font-body-md text-on-surface">
            {/* TOP CONTEXT BAR / ARCHIVE HEADER */}
            <section className="w-full mb-space-md">
              <div className="flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low p-space-sm rounded shadow-sm">
                <div className="flex items-center gap-space-xs font-label-sm text-label-sm">
                  <span className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {kos.has3dTour ? "3DGS Verified" : "Visual Verified"}
                  </span>
                  <span className="text-on-surface-variant font-label-md">
                    {kos.catalogId}
                  </span>
                  <span className="text-outline">/</span>
                  <span className="text-secondary font-bold">
                    {kos.city.toUpperCase()} • {kos.subdistrict.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-sm text-label-sm bg-surface-container-highest text-on-surface-variant px-space-xs py-0.5 rounded">
                    Diperbarui: 12 Menit Lalu
                  </span>
                  <span className="flex items-center text-primary text-label-sm font-label-sm">
                    <span className="material-symbols-outlined text-[14px] mr-0.5">
                      verified
                    </span>
                    Terdaftar Resmi
                  </span>
                </div>
              </div>
            </section>

            {/* MAIN PHOTO / 3D GAUSSIAN SPLATTING HERO SECTION */}
            <section className="relative w-full mb-space-lg" id="detail-properti">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-sm bg-surface-container-low p-space-sm rounded-lg shadow-[2px_3px_0px_rgba(25,28,30,0.08)]">
                {/* Primary Splat / Photo Viewport */}
                <div className="lg:col-span-8 relative h-[380px] sm:h-[460px] rounded overflow-hidden shadow-md group">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${kos.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Scrapbook Tape Overlays */}
                  <div className="absolute top-2 left-6 px-4 py-1 bg-secondary-fixed/90 text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-widest rotate-[-1deg] shadow-sm backdrop-blur-sm pointer-events-none">
                    {kos.archivalPlate}
                  </div>

                  {/* 3DGS Interactive CTA Pill */}
                  <div className="absolute top-4 right-4 flex flex-col gap-space-xs items-end">
                    {kos.has3dTour ? (
                      <Link
                        href="/3dgs-demo"
                        className="flex items-center gap-space-xs px-space-md py-space-xs bg-secondary-container hover:bg-primary-container text-on-primary-container rounded shadow-[2px_2px_0px_#191c1e] transition-all active:translate-x-0.5 active:translate-y-0.5"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          view_in_ar
                        </span>
                        <span className="font-headline-sm text-headline-sm tracking-wide">
                          BUKA TUR 3DGS (60 FPS)
                        </span>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-highest text-on-surface rounded shadow-[2px_2px_0px_#191c1e]">
                        <span className="material-symbols-outlined text-[18px]">
                          photo_camera
                        </span>
                        <span className="font-headline-sm text-headline-sm tracking-wide">
                          FOTO HIGH-RES 2D
                        </span>
                      </div>
                    )}
                    <span className="bg-surface/90 text-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded shadow-sm">
                      {kos.has3dTour
                        ? "Gaussian Radiance Field Active"
                        : "Pemindaian 3DGS Dijadwalkan"}
                    </span>
                  </div>

                  {/* Floating Navigation Gallery Badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="px-space-md py-space-xs bg-surface-container-lowest/90 backdrop-blur text-on-surface font-label-md text-label-md rounded shadow hover:bg-surface-container-low transition-colors flex items-center gap-1 cursor-pointer">
                        <span className="material-symbols-outlined text-[16px]">
                          photo_library
                        </span>
                        <span>Lihat semua foto ({photoIndex}/12)</span>
                      </button>
                      <span className="hidden sm:inline-flex px-space-sm py-space-xs bg-surface-container-lowest/80 text-on-surface-variant font-label-sm text-label-sm rounded">
                        Denah 2D Tersedia
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-surface-container-lowest/90 px-2 py-1 rounded shadow">
                      <span className="font-label-sm text-label-sm text-on-surface font-bold">
                        {photoIndex}/4
                      </span>
                      <button
                        onClick={() =>
                          setPhotoIndex((prev) => (prev > 1 ? prev - 1 : 4))
                        }
                        className="w-6 h-6 flex items-center justify-center hover:text-primary cursor-pointer"
                        aria-label="Foto Sebelumnya"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          chevron_left
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          setPhotoIndex((prev) => (prev < 4 ? prev + 1 : 1))
                        }
                        className="w-6 h-6 flex items-center justify-center hover:text-primary cursor-pointer"
                        aria-label="Foto Berikutnya"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          chevron_right
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Secondary Photo Collage Stack (Scrapbook Look) */}
                <div className="hidden lg:grid lg:col-span-4 grid-rows-2 gap-space-sm">
                  <div className="relative h-[225px] rounded overflow-hidden shadow-sm group">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${kos.bathroomImage}')`,
                      }}
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-surface-container-lowest/85 font-label-sm text-label-sm text-on-surface rounded">
                      Kamar Mandi Dalam
                    </div>
                  </div>
                  <div className="relative h-[225px] rounded overflow-hidden shadow-sm group">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${kos.communalImage}')`,
                      }}
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-surface-container-lowest/85 font-label-sm text-label-sm text-on-surface rounded">
                      Dapur &amp; Area Bersama
                    </div>
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-headline-sm text-headline-sm text-on-primary bg-primary px-3 py-1 rounded shadow">
                        +9 Foto Lainnya
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TWO-COLUMN MAIN EDITORIAL WORKSPACE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg w-full items-start">
              {/* LEFT EXPANDED CONTENT (8 COLS) */}
              <div className="lg:col-span-8 flex flex-col gap-space-lg">
                {/* PROPERTY TITLE & SPECIFICATION STAMP */}
                <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm relative">
                  <div className="absolute -top-3 right-6 bg-secondary-fixed text-on-secondary-fixed px-3 py-0.5 font-label-sm text-label-sm uppercase tracking-widest rotate-1 shadow-sm">
                    SINGGAHSINI MANAGED
                  </div>
                  <div className="flex flex-wrap items-center gap-space-xs mb-space-sm">
                    <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold uppercase rounded">
                      {kos.category}
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded">
                      {kos.subdistrict}, {kos.city}
                    </span>
                    <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm rounded flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">
                        verified
                      </span>{" "}
                      {kos.reviews} Transaksi Sukses
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg tracking-wide text-on-surface uppercase mb-space-xs">
                    {kos.name}
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant italic mb-space-md">
                    {kos.description}
                  </p>

                  {/* Availability Ribbon Alert */}
                  <div
                    className={`flex items-center justify-between p-space-sm rounded mb-space-md ${
                      kos.availabilityRibbon.isWarning
                        ? "bg-error-container text-on-error-container"
                        : "bg-surface-container-high text-on-surface"
                    }`}
                  >
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[20px]">
                        info
                      </span>
                      <span className="font-label-md text-label-md font-bold">
                        {kos.availabilityRibbon.text}
                      </span>
                    </div>
                    <a
                      className="font-label-sm text-label-sm underline hover:text-primary shrink-0"
                      href={`#${kos.availabilityRibbon.altLinkId}`}
                    >
                      {kos.availabilityRibbon.altLinkText}
                    </a>
                  </div>

                  {/* Social / Share Quick Buttons */}
                  <div className="flex items-center gap-space-sm pt-space-xs">
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className="flex items-center gap-1 text-on-surface-variant hover:text-primary font-label-sm text-label-sm bg-surface-container-low px-3 py-1.5 rounded cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isFavorited ? "favorite" : "favorite_border"}
                      </span>{" "}
                      Simpan
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1 text-on-surface-variant hover:text-primary font-label-sm text-label-sm bg-surface-container-low px-3 py-1.5 rounded cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        share
                      </span>{" "}
                      Bagikan Tautan
                    </button>
                    <a
                      href="#lokasi-area"
                      className="flex items-center gap-1 text-on-surface-variant hover:text-primary font-label-sm text-label-sm bg-surface-container-low px-3 py-1.5 rounded"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        map
                      </span>{" "}
                      Rute Cepat
                    </a>
                  </div>
                </div>

                {/* KOS DIKELOLA OLEH (HOST PROFILE) */}
                <div
                  className="bg-surface-container-low p-space-md rounded flex items-center justify-between shadow-sm"
                  id="pemilik-kos"
                >
                  <div className="flex items-center gap-space-md">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-tertiary-container flex items-center justify-center text-on-tertiary font-headline-md text-headline-md">
                      {kos.host.initial}
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary-container rounded-full ring-2 ring-surface" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          {kos.host.name}
                        </span>
                        <span className="font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed px-1.5 py-0.2 rounded uppercase">
                          {kos.host.role}
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-container inline-block" />{" "}
                        {kos.host.lastOnline}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="px-space-md py-1.5 bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded shadow-sm hover:bg-surface-container-highest transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      chat
                    </span>{" "}
                    Tanya Pengelola
                  </Link>
                </div>

                {/* KEUNGGULAN SINGGAHSINI / SPLATKOST ASSURANCE */}
                <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[24px]">
                        verified_user
                      </span>
                      <h2 className="font-headline-md text-headline-md tracking-wide text-on-surface uppercase">
                        Keunggulan Eksklusif Singgahsini
                      </h2>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline">
                      PROTOKOL #SK-2024
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                    <div className="p-space-sm bg-surface-container-low rounded">
                      <div className="w-8 h-8 rounded bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-space-xs">
                        <span className="material-symbols-outlined text-[20px]">
                          thumb_up
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-primary uppercase mb-1">
                        Dijamin Akurat
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Fasilitas tidak sesuai iklan kami garansi pengembalian dana sewa 100% tanpa potongan birokrasi.
                      </p>
                    </div>
                    <div className="p-space-sm bg-surface-container-low rounded">
                      <div className="w-8 h-8 rounded bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-space-xs">
                        <span className="material-symbols-outlined text-[20px]">
                          shield
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-secondary uppercase mb-1">
                        Asuransi Khusus
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Perlindungan penuh atas kehilangan barang pribadi &amp; kerusakan fasilitas vital di dalam kamar sewa.
                      </p>
                    </div>
                    <div className="p-space-sm bg-surface-container-low rounded">
                      <div className="w-8 h-8 rounded bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-space-xs">
                        <span className="material-symbols-outlined text-[20px]">
                          support_agent
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-tertiary uppercase mb-1">
                        Dukungan Tim Pro
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Tim Mamikos &amp; SplatKost siap membantumu dari survei lapangan, proses administrasi, hingga masa huni.
                      </p>
                    </div>
                  </div>
                  {/* Ketentuan Refund Banner */}
                  <div className="mt-space-md p-space-sm bg-surface-container rounded flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        assignment_return
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface">
                        Jaminan Pembatalan Fleksibel &amp; Kebijakan Refund Resmi
                      </span>
                    </div>
                    <Link
                      className="font-label-sm text-label-sm text-primary font-bold hover:underline"
                      href="/search"
                    >
                      Bagaimana ketentuannya? →
                    </Link>
                  </div>
                </div>

                {/* SPESIFIKASI TIPE KAMAR */}
                <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm">
                  <h2 className="font-headline-md text-headline-md tracking-wide text-on-surface uppercase mb-space-md">
                    Spesifikasi Tipe Kamar {kos.type.replace("Kamar Mandi ", "")}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md">
                    <div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded">
                      <span className="material-symbols-outlined text-primary text-[24px]">
                        aspect_ratio
                      </span>
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">
                          Dimensi
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          {kos.dimension}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded">
                      <span className="material-symbols-outlined text-primary text-[24px]">
                        bolt
                      </span>
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">
                          Listrik
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          {kos.electricity}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded">
                      <span className="material-symbols-outlined text-primary text-[24px]">
                        water_drop
                      </span>
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">
                          Air Bersih
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          {kos.water}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded">
                      <span className="material-symbols-outlined text-primary text-[24px]">
                        group
                      </span>
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">
                          Kapasitas
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface">
                          {kos.capacity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FASILITAS KAMAR & KAMAR MANDI */}
                <div
                  className="bg-surface-container-lowest p-space-lg rounded shadow-sm"
                  id="fasilitas-kamar"
                >
                  <h2 className="font-headline-md text-headline-md tracking-wide text-on-surface uppercase mb-space-sm">
                    Fasilitas Kamar
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    Perlengkapan standar unit terverifikasi melalui inspeksi digital 3DGS.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-space-sm mb-space-lg">
                    {kos.roomFacilities.map((fac, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-surface-container-low rounded"
                      >
                        <span className="material-symbols-outlined text-outline text-[18px]">
                          {fac.icon}
                        </span>
                        <span className="font-label-md text-label-md text-on-surface">
                          {fac.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-sm">
                    Fasilitas Kamar Mandi
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm">
                    {kos.bathroomFacilities.map((fac, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-surface-container-low rounded"
                      >
                        <span className="material-symbols-outlined text-outline text-[18px]">
                          {fac.icon}
                        </span>
                        <span className="font-label-md text-label-md text-on-surface">
                          {fac.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PERATURAN KHUSUS TIPE KAMAR INI */}
                <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm">
                  <h2 className="font-headline-md text-headline-md tracking-wide text-on-surface uppercase mb-space-md">
                    Peraturan Khusus Tipe Kamar Ini
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                    {kos.rules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-space-xs p-space-sm bg-surface-container-low rounded"
                      >
                        <span className="material-symbols-outlined text-secondary text-[20px]">
                          {rule.icon}
                        </span>
                        <div>
                          <span className="font-label-md text-label-md text-on-surface font-bold">
                            {rule.title}
                          </span>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            {rule.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CERITA PEMILIK TENTANG KOS INI */}
                <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm relative">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary block mb-1">
                    CATATAN OWNER
                  </span>
                  <h2 className="font-headline-md text-headline-md tracking-wide text-on-surface uppercase mb-space-sm">
                    Cerita Pemilik Tentang Kos Ini
                  </h2>
                  <div className="font-body-md text-body-md text-on-surface-variant leading-relaxed space-y-2">
                    {kos.ownerStory.map((story, idx) => (
                      <p key={idx}>&quot;{story}&quot;</p>
                    ))}
                  </div>
                  <button className="mt-space-sm font-label-md text-label-md text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer">
                    <span>Baca Selengkapnya</span>
                    <span className="material-symbols-outlined text-[16px]">
                      expand_more
                    </span>
                  </button>
                </div>

                {/* TIPE KAMAR LAINNYA DI KOS INI */}
                <div
                  className="bg-surface-container-lowest p-space-lg rounded shadow-sm"
                  id="tipe-lain"
                >
                  <div className="flex items-center justify-between mb-space-md">
                    <div>
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">
                        ALTERNATIF TERSEDIA
                      </span>
                      <h2 className="font-headline-md text-headline-md tracking-wide text-on-surface uppercase">
                        Tipe Kamar Lainnya di Kos Ini
                      </h2>
                    </div>
                    <span className="font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded font-bold">
                      Kamar Siap Huni
                    </span>
                  </div>

                  {/* Tipe A / Alt Card */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md bg-surface-container-low p-space-md rounded border-2 border-primary/20 hover:border-primary transition-all">
                    <div className="md:col-span-4 relative h-48 rounded overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${kos.altRoom.image}')`,
                        }}
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-on-primary font-label-sm text-label-sm rounded uppercase font-bold">
                        {kos.altRoom.remaining}
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-surface/90 text-on-surface font-label-sm text-label-sm rounded uppercase">
                        {kos.altRoom.floor}
                      </div>
                    </div>
                    <div className="md:col-span-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase">
                            {kos.altRoom.title}
                          </h3>
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                            {kos.altRoom.dimension}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-space-xs my-space-xs">
                          {kos.altRoom.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[12px] bg-surface-container px-2 py-0.5 rounded font-label-sm text-on-surface-variant"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                          {kos.altRoom.description}
                        </p>
                      </div>
                      <div className="mt-space-sm pt-space-xs flex flex-wrap items-end justify-between gap-space-sm">
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-1.5 py-0.2 rounded font-bold">
                              ⚡ {kos.altRoom.discountText}
                            </span>
                            <span className="font-label-sm text-label-sm line-through text-outline">
                              {kos.altRoom.originalPrice}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-headline-md text-headline-md text-primary font-bold">
                              {kos.altRoom.price}
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              / bulan pertama
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-space-xs">
                          <button className="px-space-md py-1.5 bg-surface-container-highest hover:bg-surface-container text-on-surface font-label-md text-label-md rounded transition-colors cursor-pointer">
                            Lihat Detail
                          </button>
                          <Link
                            href="/dashboard"
                            className="px-space-md py-1.5 bg-secondary-container hover:bg-primary-container text-on-primary-container font-headline-sm text-headline-sm rounded shadow-[2px_2px_0px_#191c1e] transition-transform active:translate-x-0.5 active:translate-y-0.5"
                          >
                            Ajukan Sewa {kos.altRoom.title.split(" ")[0]}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FASILITAS UMUM & PARKIR */}
                <div
                  className="bg-surface-container-lowest p-space-lg rounded shadow-sm"
                  id="fasilitas-umum"
                >
                  <h2 className="font-headline-md text-headline-md tracking-wide text-on-surface uppercase mb-space-sm">
                    Fasilitas Bersama &amp; Fasilitas Umum
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-space-sm mb-space-lg">
                    {kos.commonFacilities.map((fac, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-surface-container-low rounded"
                      >
                        <span className="material-symbols-outlined text-outline text-[18px]">
                          {fac.icon}
                        </span>
                        <span className="font-label-md text-label-md text-on-surface">
                          {fac.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-sm">
                    Fasilitas Parkir
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm">
                    {kos.parkingFacilities.map((fac, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-surface-container-low rounded"
                      >
                        <span className="material-symbols-outlined text-outline text-[18px]">
                          {fac.icon}
                        </span>
                        <span className="font-label-md text-label-md text-on-surface">
                          {fac.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PERATURAN DI KOS INI (GENERAL RULES) */}
                <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm">
                  <h2 className="font-headline-md text-headline-md tracking-wide text-on-surface uppercase mb-space-md">
                    Tata Tertib Umum Kos
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                    {kos.generalRules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-surface-container-low rounded"
                      >
                        <span className="material-symbols-outlined text-outline text-[18px]">
                          {rule.icon}
                        </span>
                        <span className="font-label-md text-label-md text-on-surface">
                          {rule.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LOKASI DAN LINGKUNGAN SEKITAR */}
                <div
                  className="bg-surface-container-lowest p-space-lg rounded shadow-sm"
                  id="lokasi-area"
                >
                  <div className="flex items-center justify-between mb-space-sm">
                    <div>
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">
                        GEOLOKASI PRESISI
                      </span>
                      <h2 className="font-headline-md text-headline-md tracking-wide text-on-surface uppercase">
                        Lokasi &amp; Lingkungan Sekitar
                      </h2>
                    </div>
                    <span className="font-label-sm text-label-sm bg-surface-container px-2 py-1 rounded text-on-surface-variant font-mono">
                      {kos.location}
                    </span>
                  </div>

                  {/* Google Maps API Canvas Placeholder */}
                  <div
                    className="w-full h-72 bg-cover bg-center rounded relative shadow-inner mb-space-md"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')`,
                    }}
                  >
                    <div className="absolute inset-0 bg-surface-container-high/40 flex flex-col items-center justify-center p-4">
                      <div className="p-space-sm bg-surface-container-lowest/95 rounded shadow-lg flex items-center gap-space-sm max-w-sm">
                        <span className="material-symbols-outlined text-primary text-[28px]">
                          location_on
                        </span>
                        <div>
                          <span className="font-headline-sm text-headline-sm text-on-surface">
                            {kos.name}
                          </span>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">
                            Kecamatan {kos.subdistrict}, {kos.city}
                          </p>
                        </div>
                      </div>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          kos.name + " " + kos.location
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-space-sm px-space-md py-space-xs bg-primary text-on-primary font-headline-sm text-headline-sm tracking-wide rounded shadow-[2px_2px_0px_#191c1e] hover:bg-primary-container"
                      >
                        Buka Google Maps
                      </a>
                    </div>
                  </div>

                  {/* TEMPAT TERDEKAT (METADATA POI LIST) */}
                  <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-sm">
                    Jarak ke Fasilitas Publik
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-sm">
                    {kos.nearbyPOIs.map((poi, idx) => (
                      <div
                        key={idx}
                        className="p-space-sm bg-surface-container-low rounded flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px]">
                            {poi.icon}
                          </span>
                          <span className="font-label-md text-label-md text-on-surface">
                            {poi.name}
                          </span>
                        </div>
                        <span
                          className={`font-label-sm text-label-sm font-bold ${
                            poi.highlight
                              ? "text-secondary"
                              : "text-on-surface-variant"
                          }`}
                        >
                          {poi.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KETENTUAN PENGAJUAN SEWA */}
                <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm">
                  <h2 className="font-headline-md text-headline-md tracking-wide text-on-surface uppercase mb-space-md">
                    Ketentuan Pengajuan Sewa
                  </h2>
                  <div className="space-y-space-sm">
                    <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        payments
                      </span>
                      <div>
                        <span className="font-label-md text-label-md text-on-surface font-bold">
                          Bisa Bayar DP (Uang Muka) Terlebih Dahulu
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Cukup bayar DP mulai dari 30% untuk mengamankan ketersediaan kamar.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        calendar_today
                      </span>
                      <div>
                        <span className="font-label-md text-label-md text-on-surface font-bold">
                          Jadwal Masuk (Check-In) Fleksibel
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Waktu mulai sewa terdekat bisa hari ini, atau dijadwalkan hingga 30 hari ke depan.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        badge
                      </span>
                      <div>
                        <span className="font-label-md text-label-md text-on-surface font-bold">
                          Verifikasi Identitas Resmi (KTP)
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Calon penyewa wajib melampirkan foto e-KTP / Paspor aktif untuk keamanan bersama.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* REVIEW / ULASAN PENGHUNI */}
                <div
                  className="bg-surface-container-lowest p-space-lg rounded shadow-sm"
                  id="ulasan-penghuni"
                >
                  <div className="flex items-center justify-between mb-space-md">
                    <h2 className="font-headline-md text-headline-md tracking-wide text-on-surface uppercase">
                      Review &amp; Testimoni Penghuni
                    </h2>
                    <span className="font-label-sm text-label-sm text-outline">
                      0 ULASAN PUBLIK
                    </span>
                  </div>
                  <div className="p-space-lg bg-surface-container-low rounded text-center flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-outline text-[42px] mb-2">
                      rate_review
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface mb-1">
                      Belum Ada Review
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                      Kos ini belum di-review oleh penyewa. Jadilah yang pertama memberikan ulasan setelah menyelesaikan masa huni!
                    </p>
                    <button className="mt-space-md px-space-md py-1.5 bg-surface-container-highest text-on-surface font-label-md text-label-md rounded cursor-pointer">
                      Tulis Pertanyaan ke Komunitas
                    </button>
                  </div>
                </div>

                {/* INFO DETAIL PEMILIK / PENGELOLA */}
                <div className="bg-surface-container-lowest p-space-lg rounded shadow-sm">
                  <h2 className="font-headline-md text-headline-md tracking-wide text-on-surface uppercase mb-space-md">
                    Profil &amp; Portofolio Pengelola
                  </h2>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md p-space-md bg-surface-container-low rounded">
                    <div className="flex items-center gap-space-md">
                      <div className="w-16 h-16 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-headline-md text-headline-md">
                        {kos.host.initial}
                      </div>
                      <div>
                        <span className="font-headline-sm text-headline-sm text-on-surface block">
                          {kos.host.name}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {kos.host.role}
                        </span>
                        <span className="font-label-sm text-label-sm text-secondary font-bold">
                          Aktif sejak September 2023 • {kos.host.transactions} Transaksi Berhasil
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <Link
                        href="/search"
                        className="px-space-md py-2 bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded shadow-sm hover:bg-surface-container-high transition-colors"
                      >
                        Lihat Kos Lainnya
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT DESKTOP EDITORIAL SIDEBAR (4 COLS) */}
              <div className="lg:col-span-4 flex flex-col gap-space-lg sticky top-32">
                {/* PRICING & BOOKING ACTION CARD (SCRAPBOOK ARCHIVAL TICKET) */}
                <div className="bg-surface-container-lowest p-space-lg rounded shadow-md relative overflow-hidden">
                  {/* Washi Tape Effect at top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-secondary-fixed/80 backdrop-blur text-center font-label-sm text-label-sm text-on-secondary-fixed rotate-[-0.5deg] shadow-sm flex items-center justify-center">
                    INDEX {kos.catalogId.replace("CAT. ID #", "")}
                  </div>

                  <div className="pt-space-xs">
                    {/* Discount badge */}
                    <div className="flex items-center gap-space-xs mb-space-xs">
                      <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold rounded">
                        ⚡ {kos.discountBadge}
                      </span>
                      <span className="font-label-sm text-label-sm line-through text-outline">
                        {kos.originalPrice}
                      </span>
                    </div>

                    {/* Main Price */}
                    <div className="flex items-baseline gap-space-xs mb-space-xs">
                      <span className="font-headline-xl text-headline-xl text-primary font-bold">
                        {kos.priceLabel}
                      </span>
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        / bulan
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block mb-space-md">
                      Tarif bulan pertama • Sudah termasuk biaya air bersih
                    </span>

                    {/* Booking Spec Summary */}
                    <div className="space-y-space-xs bg-surface-container-low p-space-sm rounded mb-space-md">
                      <div className="flex justify-between font-label-sm text-label-sm">
                        <span className="text-on-surface-variant">Tipe Unit:</span>
                        <span className="font-bold text-on-surface">
                          Kamar Tipe {kos.type.replace("Kamar Mandi ", "")}
                        </span>
                      </div>
                      <div className="flex justify-between font-label-sm text-label-sm">
                        <span className="text-on-surface-variant">Status Hunian:</span>
                        <span
                          className={`font-bold ${
                            kos.availabilityStatus.includes("Penuh")
                              ? "text-error"
                              : "text-primary"
                          }`}
                        >
                          {kos.availabilityStatus}
                        </span>
                      </div>
                      <div className="flex justify-between font-label-sm text-label-sm">
                        <span className="text-on-surface-variant">Deposit Garansi:</span>
                        <span className="font-bold text-on-surface">
                          {kos.deposit} (Refundable)
                        </span>
                      </div>
                    </div>

                    {/* Primary CTA Button (Ticket Push) */}
                    <Link
                      href="/dashboard"
                      className="w-full py-space-sm bg-secondary-container hover:bg-primary-container text-on-primary-container font-headline-sm text-headline-sm tracking-wide rounded shadow-[2px_2px_0px_#191c1e] transition-transform active:translate-x-0.5 active:translate-y-0.5 mb-space-sm block text-center"
                    >
                      {kos.availabilityStatus.includes("Penuh")
                        ? "Ikut Daftar Tunggu (Waiting List)"
                        : "Ajukan Sewa Sekarang"}
                    </Link>

                    {/* Alternative CTA: Explore Type A */}
                    <a
                      className="w-full py-space-sm bg-surface-container hover:bg-surface-container-highest text-on-surface font-headline-sm text-headline-sm tracking-wide rounded flex items-center justify-center transition-colors"
                      href="#tipe-lain"
                    >
                      Pesan Tipe Lain ({kos.altRoom.remaining})
                    </a>

                    <div className="mt-space-md pt-space-xs flex items-center justify-center gap-space-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px]">
                        lock
                      </span>
                      <span className="font-label-sm text-label-sm">
                        Transaksi Aman Terenkripsi SPLATKOST
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3DGS EXPLORER MINI PROMO BOX */}
                <div className="bg-surface-container-lowest p-space-md rounded shadow-sm relative">
                  <span className="font-label-sm text-label-sm text-secondary uppercase font-bold block mb-1">
                    INSPEKSI SPASIAL 3D
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs">
                    Gaussian Splatting 360°
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm leading-snug">
                    Jelajahi setiap sudut kamar dengan ketepatan fotorealistik sub-milimeter tanpa perlu datang ke lokasi secara fisik.
                  </p>
                  <div className="relative h-28 rounded overflow-hidden mb-space-sm">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${kos.image}')` }}
                    />
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow">
                        <span className="material-symbols-outlined text-[20px]">
                          play_arrow
                        </span>
                      </span>
                    </div>
                  </div>
                  {kos.has3dTour ? (
                    <Link
                      href="/3dgs-demo"
                      className="w-full py-1.5 bg-surface-container-low hover:bg-surface-container-high text-primary font-label-md text-label-md rounded font-bold transition-colors block text-center"
                    >
                      Buka Viewer Fullscreen
                    </Link>
                  ) : (
                    <div className="w-full py-1.5 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm rounded text-center">
                      Pemindaian 3DGS Sedang Dijadwalkan
                    </div>
                  )}
                </div>

                {/* MAMIKOS / SPLATKOST ASSURANCE BADGE */}
                <div className="bg-surface-container-low p-space-md rounded shadow-sm">
                  <div className="flex items-center gap-space-xs mb-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      verified
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface uppercase">
                      Proteksi Sewa SPLATKOST
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Setiap pembayaran dijamin disimpan di rekening bersama hingga Anda sukses melakukan check-in dan serah terima kunci.
                  </p>
                </div>
              </div>
            </div>

            {/* KAMU MUNGKIN MENYUKAINYA (EDITORIAL RECOMMENDATIONS CAROUSEL) */}
            <section className="w-full mt-space-xl pt-space-md">
              <div className="flex items-center justify-between mb-space-md">
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">
                    REKOMENDASI TERDEKAT
                  </span>
                  <h2 className="font-headline-lg text-headline-lg tracking-wide text-on-surface uppercase">
                    Kamu Mungkin Menyukainya
                  </h2>
                </div>
                <div className="flex items-center gap-space-xs">
                  <button className="w-8 h-8 rounded bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">
                      chevron_left
                    </span>
                  </button>
                  <button className="w-8 h-8 rounded bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>

              {/* Recommendation Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                {recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="bg-surface-container-lowest rounded shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-105 duration-500"
                        style={{ backgroundImage: `url('${rec.image}')` }}
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-surface/90 text-on-surface font-label-sm text-label-sm rounded uppercase font-bold">
                        {rec.category}
                      </span>
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 text-white font-label-sm text-label-sm rounded flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px] text-yellow-400">
                          star
                        </span>{" "}
                        {rec.rating}
                      </span>
                    </div>
                    <div className="p-space-sm">
                      <span className="font-label-sm text-label-sm text-on-surface-variant block">
                        {rec.location}
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase truncate">
                        {rec.title}
                      </h4>
                      <span className="font-label-sm text-label-sm text-outline block mb-space-xs">
                        {rec.specs}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                          {rec.price}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          / bln
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ASIDE STICKY BOTTOM BAR FOR MOBILE */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-sm flex items-center justify-between gap-space-md">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Mulai
              </span>
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                {kos.priceLabel}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                / bln
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Bulan pertama • Termasuk tagihan air
            </span>
          </div>
          <div className="flex items-center gap-space-sm">
            <a
              className="hidden sm:inline-flex items-center justify-center px-space-md py-space-sm rounded bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
              data-path="tipe-kamar-lain"
              href="#tipe-lain"
            >
              Lihat tipe lain
            </a>
            <Link
              className="inline-flex items-center justify-center px-space-lg py-space-sm rounded bg-secondary-container hover:bg-primary-container text-on-primary-container font-headline-sm text-headline-sm tracking-wide transition-all shadow-[2px_2px_0px_#191c1e] active:translate-x-0.5 active:translate-y-0.5"
              data-path="pengajuan-sewa"
              href="/dashboard"
            >
              Ajukan Sewa
            </Link>
          </div>
        </div>
      </aside>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-low py-space-xl pb-32">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin flex flex-col md:flex-row justify-between items-start md:items-center gap-space-lg">
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md tracking-wider text-primary">
              SPLATKOST
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">
              Archival Living Catalog &amp; Residential Index
            </span>
          </div>
          <div className="font-label-sm text-label-sm text-on-surface-variant">
            © 2024 SPLATKOST Editorial Housing. Seluruh hak cipta dilindungi undang-undang.
          </div>
        </div>
      </footer>
    </div>
  );
}
