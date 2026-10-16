# Laporan Audit Desain Sistem — Landing Page Utama (Live Baseline)

> **Status Dokumen:** Baseline Resmi (Produksi) — Terkunci  
> **Tanggal Audit:** 16 Oktober 2026  
> **Target Analisis:** `app/landingpage/page.tsx` & `app/landingpage/landing.css`  
> **URL Live:** `http://localhost:3000/landingpage`  
> **Dokumen Pasangan (R&D Sandbox):** [laporan_audit_landingpage_rd.md](file:///d:/coding/Javascript/3dgs-opentempeh/3dgs-OpenTempeh/laporan_audit_landingpage_rd.md)  
> **Tujuan:** Dokumentasi acuan kondisi eksisting landing page utama sebelum refactoring, mencatat seluruh redundansi token, outlier, dan disonansi komponen berulang sebagai tolok ukur pengujian.

---

## 1. Nilai Unik & Frekuensi Pemakaian

### A. Nilai Warna (Color Tokens)

| Kategori Warna | Nilai / Utility Token | Padanan Heksadesimal / Nilai Riil | Frekuensi Pemakaian |
| :--- | :--- | :--- | :--- |
| **Putih & Latar Terang** | text-white / bg-white / ring-white | `#FFFFFF` | 54 kali |
| | bg-[#fcfbf7] | `#FCFBF7` | 4 kali |
| | bg-maritime-warmCard | `#FCFBF8` | 4 kali |
| | bg-maritime-cream | `#F7F4ED` | 3 kali |
| | bg-[#f8f5ee] / bg-[#f8f5ee]/95 | `#F8F5EE` | 3 kali |
| | bg-[#faf8f4] | `#FAF8F4` | 1 kali |
| | bg-[#fffcf0] | `#FFFCF0` | 1 kali |
| | bg-[#fdf9ee] | `#FDF9EE` | 1 kali |
| | bg-[#f5f1e8] (map canvas) | `#F5F1E8` | 1 kali |
| | bg-white/95 / bg-white/10 | `RGBA(255, 255, 255, 0.95 / 0.1)` | 2 kali |
| **Oranye / Brand Accent** | text-maritime-orange / bg-maritime-orange / [#eb5722] | `#EB5722` | 57 kali |
| | bg-maritime-rust / #d14614 | `#D14614` | 4 kali |
| | bg-orange-600 / bg-orange-500 / ring-orange-500 | Standar Tailwind Orange (600/500) | 5 kali |
| | border-orange-700 / orange-100/40 | Standar Tailwind Orange | 2 kali |
| | #f79a74 | `#F79A74` | 1 kali |
| **Hitam & Abu-abu Gelap** | text-maritime-dark / bg-maritime-dark / [#171412] | `#171412` | 39 kali |
| | bg-stone-900 / border-stone-900 / text-stone-900 | Standar Tailwind Stone 900 (`#1C1917`) | 18 kali |
| | border-stone-800 / bg-stone-800 | Standar Tailwind Stone 800 (`#292524`) | 15 kali |
| | text-[#141414] | `#141414` | 1 kali |
| | bg-[#11161b] | `#11161B` | 1 kali |
| | bg-maritime-darker / #100d0b | `#100D0B` | 2 kali |
| | #292524 / #2d2621 | `#292524` / `#2D2621` | 2 kali |
| | #354b5e / #1c2733 / #253545 | Palet Deep Navy Maritim | 6 kali |
| **Abu-abu Teks & Border** | text-stone-700 / border-stone-700 / bg-stone-700 | Standar Tailwind Stone 700 | 20 kali |
| | text-stone-600 / border-stone-600 | Standar Tailwind Stone 600 | 17 kali |
| | border-stone-200 / border-stone-200 (variasi opacity) | Standar Tailwind Stone 200 | 17 kali |
| | text-stone-400 / border-stone-400 | Standar Tailwind Stone 400 | 15 kali |
| | text-stone-300 / border-stone-300 / bg-stone-300 | Standar Tailwind Stone 300 | 12 kali |
| | text-stone-500 | Standar Tailwind Stone 500 | 10 kali |
| | bg-stone-100 / border-stone-100 / text-stone-100 | Standar Tailwind Stone 100 | 9 kali |
| | border-maritime-border / #ded8cb | `#DED8CB` | 5 kali |
| | #ded7ca / #ede7dd / #b8b0a2 / #d6d3d1 | Hex varian border/scrollbar | 6 kali |
| | text-stone-200 | Standar Tailwind Stone 200 | 2 kali |
| | text-stone-800 | Standar Tailwind Stone 800 | 4 kali |
| **Warna Aksen Lain** | bg-[#a7bea2] (Sage Green) | `#A7BEA2` | 1 kali |
| | bg-[#b5a8e8] (Lavender) | `#B5A8E8` | 1 kali |
| | bg-[#2563eb] (Cobalt Blue) | `#2563EB` | 1 kali |
| | bg-amber-100 / border-amber-300 / text-amber-900 / 950 / 800 | Standar Tailwind Amber | 9 kali |
| | bg-emerald-400 / bg-emerald-500 | Standar Tailwind Emerald | 2 kali |
| | bg-red-600 / border-red-700 | Standar Tailwind Red | 2 kali |
| | #1f6472 / #4fa3b0 / #5f6770 (Teal & Slate) | Varian Maritim Teal | 5 kali |

---

### B. Ukuran Huruf (Font Size)

| Nilai Token | Ukuran Piksel / Em Riil | Frekuensi Pemakaian |
| :--- | :--- | :--- |
| **text-xs** | 12px (0.75rem) | 68 kali |
| **text-sm** | 14px (0.875rem) | 27 kali |
| **text-3xl** | 30px (1.875rem) | 17 kali |
| **text-2xl** | 24px (1.5rem) | 14 kali |
| **text-[11px]** | 11px (Arbitrary) | 11 kali |
| **text-4xl** | 36px (2.25rem) | 11 kali |
| **text-[10px]** | 10px (Arbitrary) | 8 kali |
| **text-base** | 16px (1rem) | 7 kali |
| **text-5xl** | 48px (3rem) | 6 kali |
| **text-xl** | 20px (1.25rem) | 3 kali |
| **text-lg** | 18px (1.125rem) | 2 kali |
| **text-[13px]** | 13px (Arbitrary) | 1 kali |
| **text-[54px]** | 54px (Arbitrary) | 1 kali |
| **text-[60px]** | 60px (Arbitrary) | 1 kali |

---

### C. Spasi (Padding, Margin, Gap, Space-X/Y)

| Nilai Token Spacing | Ukuran Piksel Riil | Frekuensi Pemakaian |
| :--- | :--- | :--- |
| **3** | 12px (0.75rem) | 51 kali |
| **4** | 16px (1rem) | 40 kali |
| **2** | 8px (0.5rem) | 33 kali |
| **6** | 24px (1.5rem) | 29 kali |
| **8** | 32px (2rem) | 21 kali |
| **1.5** | 6px (0.375rem) | 18 kali |
| **auto** | Margin Auto Center | 16 kali |
| **2.5** | 10px (0.625rem) | 15 kali |
| **5** | 20px (1.25rem) | 15 kali |
| **1** | 4px (0.25rem) | 14 kali |
| **0.5** | 2px (0.125rem) | 13 kali |
| **16** | 64px (4rem) | 11 kali |
| **3.5** | 14px (0.875rem) | 9 kali |
| **14** | 56px (3.5rem) | 9 kali |
| **20** | 80px (5rem) | 6 kali |
| **7** | 28px (1.75rem) | 6 kali |
| **12** | 48px (3rem) | 5 kali |
| **10** | 40px (2.5rem) | 5 kali |
| **24** | 96px (6rem) | 2 kali |

---

### D. Sudut Lengkung (Border Radius)

| Nilai Token Radius | Nilai Riil | Frekuensi Pemakaian |
| :--- | :--- | :--- |
| **rounded-full** | 9999px (Lingkaran / Kapsul Penuh) | 34 kali (32 Tailwind + 2 CSS) |
| **rounded** | 4px (0.25rem) | 17 kali |
| **rounded-lg** | 8px (0.5rem) | 11 kali |
| **rounded-sm** | 2px (0.125rem) | 7 kali |
| **rounded-2xl** | 16px (1rem) | 4 kali |
| **rounded-md** | 6px (0.375rem) | 3 kali |
| **rounded-xl** | 12px (0.75rem) | 2 kali |
| **rounded-3xl** | 24px (1.5rem) | 2 kali |
| **rounded-t-lg** | 8px (Hanya Sisi Atas) | 2 kali |
| **rounded-bl-lg** | 8px (Hanya Kiri Bawah) | 1 kali |
| **rounded-br-lg** | 8px (Hanya Kanan Bawah) | 1 kali |
| **pebble-shape (CSS)** | 46% 54% 68% 32% / 38% 46% 54% 62% | 1 kali |

---

### E. Durasi Transisi (Animation & Transition Duration)

| Nilai Durasi | Nilai Milidetik | Frekuensi Pemakaian |
| :--- | :--- | :--- |
| **duration-200 / 0.2s** | 200ms | 9 kali (8 Tailwind + 1 CSS) |
| **duration-300 / 0.3s** | 300ms | 7 kali (6 Tailwind + 1 CSS) |
| **0.25s (CSS)** | 250ms | 3 kali |
| **duration-500** | 500ms | 3 kali |
| **duration-150** | 150ms | 2 kali |
| **120s (CSS)** | 120.000ms (Durasi Ticker Marquee) | 1 kali |

---

## 2. Pengelompokan Nilai yang Hampir Sama (Cluster Redundansi)

| Klaster | Nilai-Nilai Serupa yang Ditemukan di Kode | Masalah Redundansi |
| :--- | :--- | :--- |
| **Klaster Latar Terang (Off-White / Cream)** | #faf8f4, #f8f5ee, #f7f4ed, #fcfbf7, #fcfbf8, #fffcf0, #fdf9ee, #f5f1e8, #ffffff | **Ditemukan 9 variasi putih/krem berbeda** yang selisih kecerahannya hanya 1%–2%. Mata pengguna kesulitan membedakannya, namun CSS menjadi bengkak. |
| **Klaster Hitam & Abu-abu Gelap (Dark Surface)** | #141414, #171412, #100d0b, #11161b, stone-900 (#1c1917), stone-800 (#292524), #292524, #2d2621 | **Ditemukan 8 variasi warna gelap/hitam**. Ada hitam hangat, hitam kebiruan, dan abu-abu arang yang bercampur tanpa sistem token terpusat. |
| **Klaster Garis & Border Netral** | border-stone-200, border-stone-200/80, border-stone-200/90, border-stone-200/60, border-stone-300, #ded8cb, #ded7ca, #ede7dd, #d6d3d1 | **Ditemukan 9 variasi border netral** dengan tingkat kontras dan transparansi berbeda-beda untuk fungsi garis pemisah yang sama. |
| **Klaster Warna Oranye (Brand Accent)** | #eb5722, #d14614, orange-500, orange-600, orange-700, #f79a74 | Terdapat percampuran antara token heksadesimal kustom `#eb5722` dengan utility bawaan Tailwind (`orange-500`, `orange-600`, `orange-700`). |
| **Klaster Tipografi Mikro (Sub-14px)** | 10px, 11px, 12px (text-xs), 13px, 14px (text-sm) | Ada 5 anak tangga ukuran font dengan selisih hanya 1px (10px, 11px, 12px, 13px, 14px). |
| **Klaster Display Heading (> 40px)** | 48px (5xl), 54px ([54px]), 60px (6xl / [60px]) | Ada lonjakan ukuran display arbitrari 54px dan 60px yang bersinggungan dengan 48px dan 60px bawaan Tailwind. |
| **Klaster Spacing Padding Mikro** | 6px (1.5), 8px (2), 10px (2.5), 12px (3), 14px (3.5), 16px (4) | Menggunakan pecahan *half-step* Tailwind (1.5, 2.5, 3.5) berdampingan dengan skala bulat (2, 3, 4). |
| **Klaster Border Radius Sedang** | 4px (rounded), 6px (rounded-md), 8px (rounded-lg), 12px (rounded-xl), 16px (rounded-2xl) | Terlalu banyak tingkatan radius kartu (4px, 6px, 8px, 12px, 16px) sehingga kurvatur antar komponen terlihat tidak seragam. |
| **Klaster Durasi Transisi** | 150ms, 200ms, 250ms, 300ms | Selisih 50ms antara 150ms, 200ms, 250ms, dan 300ms tidak memberikan perbedaan persepsi gerak yang berarti bagi mata manusia. |

---

## 3. Usulan Skala Penyederhanaan (Snap to Nearest Token)

| Kategori Token | Nilai Eksisting yang Tersebar | Usulan Skala Bersih (Snap Target) | Rasionalisasi & Manfaat |
| :--- | :--- | :--- | :--- |
| **Warna Latar Terang** | #faf8f4, #f8f5ee, #f7f4ed, #fcfbf7, #fcfbf8, #fffcf0, #fdf9ee, #f5f1e8 | **Level 1**: `#FFFFFF` (Putih Murni untuk Card Kontras) <br>**Level 2**: `#FAF8F4` (Warm Paper Latar Utama Halaman) <br>**Level 3**: `#F4F0E6` (Muted Warm untuk Section Sekunder) | Dari 9 varian disederhanakan menjadi **3 tingkat latar**. Konsistensi visual naik drastis. |
| **Warna Hitam / Gelap** | #141414, #171412, #100d0b, #11161b, #292524, stone-900, stone-800 | **Dark Primary**: `#171412` (Teks Utama & Tombol Solid) <br>**Dark Secondary**: `#292524` / `stone-800` (Teks Penjelas) <br>**Dark Container**: `#12100E` (Surface Boks Hitam) | Menghilangkan percampuran heksadesimal acak; menyatukan ke warna arang khas OpenTempeh. |
| **Warna Border** | border-stone-200, opacity 60/80/90, border-stone-300, #ded8cb, #d6d3d1 | **Border Subtle**: `border-stone-200` (#E7E5E4) <br>**Border Strong**: `border-stone-300` (#D6D3D1) <br>**Border Dark**: `border-stone-800` (#292524) | Menghilangkan varian opacity fraksional yang sulit dirawat. Cukup 3 tingkat kontras border. |
| **Warna Brand Accent** | #eb5722, #d14614, orange-500, orange-600, orange-700, #f79a74 | **Brand Base**: `#EB5722` (Oranye Utama) <br>**Brand Hover**: `#D14614` (Oranye Gelap saat Hover) <br>**Brand Soft**: `#FFEDD5` (Orange-100 untuk Tag/Badge) | Menghapus pemanggilan warna Tailwind orange acak. Seluruh oranye terikat ke token tema. |
| **Tipografi** | [10px], [11px], xs (12px), [13px], sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px), 4xl (36px), 5xl (48px), [54px], [60px] | **Caption/Badge**: `text-xs` (12px) <br>**Body Small**: `text-sm` (14px) <br>**Body Regular**: `text-base` (16px) <br>**H3 / Title**: `text-xl` (20px) <br>**H2 Section**: `text-3xl` (30px) <br>**H1 Display**: `text-5xl` (48px) sm / `text-6xl` (60px) lg | Hapus nilai manual piksel seperti 10px, 11px, 13px, dan 54px. Snap seluruh teks ke skala baku modular Tailwind. |
| **Spacing** | 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24 | **Kelipatan 4px Standar**: <br>1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px), 8 (32px), 12 (48px), 16 (64px), 24 (96px) | Hapus pecahan ganjil seperti 1.5 (6px), 2.5 (10px), 3.5 (14px), dan 7 (28px). Mengikuti grid 4px/8px standar industri. |
| **Border Radius** | sm (2px), rounded (4px), md (6px), lg (8px), xl (12px), 2xl (16px), 3xl (24px), full (9999px) | **Small (Button/Input/Badge)**: `rounded-lg` (8px) <br>**Large (Card/Container)**: `rounded-2xl` (16px) <br>**Pill/Circle**: `rounded-full` (9999px) | Cukup **3 tingkat radius** (8px, 16px, full) untuk seluruh komponen landing page. |
| **Durasi Transisi** | 150ms, 200ms, 250ms, 300ms, 500ms | **Micro-interaction (Button/Link Hover)**: `150ms` atau `200ms` <br>**Macro-interaction (Accordion/Modal/Expansion)**: `300ms` | Hapus variasi 250ms dan 500ms yang tidak konsisten. |

---

## 4. Nilai Muncul 1–2 Kali ("Kemungkinan Kecelakaan" / Inadvertent Outliers)

| Nilai Outlier | Kategori Token | Frekuensi | Konteks Lokasi Pemakaian | Diagnosis Masalah & Rekomendasi |
| :--- | :--- | :--- | :--- | :--- |
| **text-[13px]** | Font Size | 1 kali | Navigasi tengah header (`app/landingpage/page.tsx:89`) | **Kecelakaan**. Ukuran non-standar yang disisipkan ad-hoc. Rekomendasi: snap ke `text-xs` (12px) atau `text-sm` (14px). |
| **text-[54px]** | Font Size | 1 kali | Breakpoint lg pada H1 hero section | **Kecelakaan**. Nilai manual di tengah jalan. Rekomendasi: snap ke `text-5xl` (48px). |
| **text-[60px]** | Font Size | 1 kali | Breakpoint xl pada H1 hero section | **Kecelakaan**. Nilai manual. Rekomendasi: snap ke `text-6xl` (60px) baku Tailwind. |
| **rounded-bl-lg / rounded-br-lg** | Radius | 1 kali | Sudut asimetris kartu tertentu di solusi/manfaat | **Kecelakaan / Peninggalan lama**. Membuat bentuk kartu aneh sendiri dibanding kartu lain. Rekomendasi: ubah ke `rounded-lg` simetris. |
| **bg-[#11161b]** | Warna Background | 1 kali | Kotak gelap penawaran & urgensi | **Kecelakaan**. Warna abu-abu gelap kebiruan yang tidak terikat palet. Rekomendasi: ganti ke `#171412` atau `bg-stone-900`. |
| **bg-[#fffcf0]** | Warna Background | 1 kali | Background kartu perbandingan | **Kecelakaan**. Varian krem terisolasi yang hanya dipakai di 1 div. Rekomendasi: snap ke `#FFFFFF` atau `#FAF8F4`. |
| **bg-[#fdf9ee]** | Warna Background | 1 kali | Background sub-elemen kartu perbandingan | **Kecelakaan**. Varian krem ketiga di section yang sama. Rekomendasi: snap ke `#FAF8F4`. |
| **bg-[#f5f1e8] & #ded7ca** | Warna Map Canvas | 1 kali | Rule CSS `.map-canvas-bg` di landing.css | **Peninggalan Lama**. Sisa dari konsep lama peta nautikal maritim yang sudah tidak relevan. Rekomendasi: hapus jika tidak lagi dipakai. |
| **#100d0b** | Warna CSS | 1 kali | Utility `.bg-maritime-darker` | **Peninggalan Lama**. Nilai heksadesimal hitam pekat yang redundant dengan `#171412`. Rekomendasi: satukan ke `#171412`. |
| **#5f6770 / #2d2621** | Warna CSS | 1 kali | Utility slate dan dark border di CSS | **Peninggalan Lama**. Tidak lagi digunakan di markup halaman. Rekomendasi: eliminasi dari CSS. |
| **text-[10px]** | Font Size | 8 kali | Micro-labels pada berbagai kartu kos & spesifikasi | **Bisa Ditolerir**, namun tidak konsisten dengan `text-[11px]` (11 kali) dan `text-xs` (12px). Rekomendasi: standarkan seluruh micro-label ke `text-xs` dengan `font-medium` atau `text-[10px]` murni. |
| **duration-150** | Durasi Transisi | 2 kali | Hover tombol Cari Kos di header | **Kecelakaan**. Bertabrakan dengan tombol hero yang memakai `duration-200`. Rekomendasi: satukan ke `duration-200`. |
| **0.25s (CSS)** | Durasi Transisi | 3 kali | Animasi sliding underline link di landing.css | **Inkonsistensi**. Di Tailwind menggunakan milidetik (200ms/300ms), di CSS menggunakan detik (0.25s). Rekomendasi: satukan ke 200ms atau 300ms. |

---

## 5. Inventarisasi Komponen Berulang & Variasi Inkonsisten

| Tipe Komponen | Variasi yang Ada Saat Ini di Kode | Masalah Inkonsistensi Visual & Struktural | Rekomendasi Penyeragaman |
| :--- | :--- | :--- | :--- |
| **1. Tombol Utama (Primary CTA Button)** | • **Variasi A (Header 'Cari Kos')**: `px-4 py-2 text-xs font-condensed font-bold uppercase rounded border border-stone-800 bg-white shadow-[2px_2px_0px_#171412]` (Gaya Neo-Brutalist retro). <br>• **Variasi B (Hero 'Mulai Eksplorasi')**: `px-7 py-3.5 rounded-xl bg-[#171412] text-white font-body-modern font-semibold text-base shadow-sm` (Gaya Modern Minimalist). <br>• **Variasi C (Newsletter 'Berlangganan')**: `px-6 py-3 rounded bg-maritime-orange text-white font-condensed font-bold uppercase`. <br>• **Variasi D (Katalog 'Lihat Detail')**: `w-full py-2.5 rounded font-condensed text-xs uppercase bg-white border border-stone-800`. | **Sangat Tidak Konsisten**. Ada 4 gaya tombol berbeda total di satu halaman: ada yang bernuansa neo-brutalist bayangan tajam (*hard shadow 2px*), ada yang rounded modern minimalis, dan ada yang memakai font all-caps *Oswald* sementara yang lain memakai *Plus Jakarta Sans*. | **Standarkan menjadi 1 Komponen Master Button**: <br>• *Primary*: Solid `#171412`, teks putih, padding `px-6 py-3`, radius `rounded-xl`, font `Plus Jakarta Sans`. <br>• *Secondary*: Border halus, teks `#171412`, radius `rounded-xl`. |
| **2. Kartu Konten (Card Container)** | • **Variasi A (Hero Room & Student Cards)**: `rounded-3xl p-3 bg-[#a7bea2] / bg-[#b5a8e8] shadow-sm`. <br>• **Variasi B (Hero Metric Widget)**: `rounded-2xl p-5 bg-[#171412] text-white border border-stone-800`. <br>• **Variasi C (Pain Points Cards)**: `p-6 bg-[#fcfbf7] border border-stone-300 rounded-lg shadow-sm`. <br>• **Variasi D (Solusi/Keunggulan Cards)**: `p-8 bg-white border border-stone-800 rounded-lg shadow-[4px_4px_0px_#171412]`. <br>• **Variasi E (Katalog Kos Cards)**: `rounded-lg border border-stone-800 bg-white overflow-hidden shadow-md`. <br>• **Variasi F (Testimonial Cards)**: `p-6 rounded-lg bg-white border border-stone-300 shadow-sm`. | **Terjadi tabrakan bahasa desain antarseksi**: <br>• Hero Section menggunakan *Soft Rounded 2xl/3xl* dengan bayangan lembut modern. <br>• Seksi Solusi menggunakan *Hard Edge Shadow [4px_4px_0px]* ala retro/brutalist. <br>• Seksi Testimoni dan Pain Point menggunakan *Border Stone-300* tipis biasa. | **Standarkan menjadi 2 varian Card**: <br>• *Surface Card Light*: `bg-white border border-stone-200/90 rounded-2xl shadow-sm hover:shadow-md`. <br>• *Surface Card Dark*: `bg-[#171412] text-white border border-stone-800 rounded-2xl shadow-md`. |
| **3. Badges, Tags & Pills** | • **Variasi A (Status Standar 2026)**: `bg-maritime-orange text-white text-[11px] font-condensed font-bold px-2.5 py-1 rounded`. <br>• **Variasi B (Pilihan Terverifikasi)**: `bg-orange-100 text-maritime-orange text-[10px] font-bold font-condensed px-2 py-0.5 rounded`. <br>• **Variasi C (Tag Filter Katalog)**: `px-3.5 py-1.5 rounded-full text-xs font-condensed font-bold bg-white border border-stone-800`. <br>• **Variasi D (Pebble 500+ Kos)**: `px-4 py-3.5 pebble-shape bg-[#2563eb] text-white`. | Menggunakan kombinasi radius persegi (`rounded` 4px) dan kapsul (`rounded-full`) secara campur aduk untuk fungsi pelabelan yang setara. Font di dalam badge juga bercampur antara *Oswald (condensed)* dan *Plus Jakarta Sans*. | **Standarkan menjadi 1 Varian Badge**: <br>`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-body-modern` dengan 2 variasi warna: <br>1. *Brand Accent*: `bg-orange-100 text-orange-800` <br>2. *Neutral*: `bg-stone-100 text-stone-700 border border-stone-200` |
| **4. Header Seksi (Section Headings)** | • **Variasi A (Hero Section)**: Tanpa script font, langsung menggunakan H1 `Plus Jakarta Sans` natural case yang bersih. <br>• **Variasi B (Seksi Masalah, Katalog, Testimoni)**: Menggunakan tulisan sambung miring *Caveat* oranye (`font-handwriting text-3xl sm:text-4xl text-maritime-orange`) di atas judul H2 kapital penuh *Bebas Neue* (`font-headline tracking-tight uppercase`). | **Disonansi Estetika Terbesar di Halaman**: Begitu pengguna scroll ke bawah melewati Hero baru, mereka langsung melihat font cursive *Caveat* dan font poster tebal *Bebas Neue* yang bernuansa vintage jadul, kontras tajam dengan Hero section yang bernuansa modern minimalis. | **Standarkan Pola Section Header**: <br>• *Eyebrow*: Teks kecil uppercase `text-xs font-semibold tracking-wider text-orange-600` (tanpa cursive script). <br>• *Title*: `text-3xl sm:text-4xl font-extrabold font-display-modern text-stone-900` natural case. <br>• *Subtitle*: `text-stone-600 text-base max-w-xl mx-auto`. |
| **5. Input Form & Field Interaktif** | • **Newsletter Input**: `w-full px-4 py-3 rounded border border-stone-300 bg-white text-sm focus:border-maritime-orange focus:ring-1 focus:ring-maritime-orange`. | Hanya ada 1 form input di landing page, namun radiusnya (`rounded` 4px) tidak serasi dengan tombol utama (`rounded-xl` 12px). | **Standarkan Radius**: <br>Ubah menjadi `rounded-xl` dengan padding `px-4 py-3.5` agar sejajar sempurna saat diletakkan bersebelahan dengan tombol aksi. |
