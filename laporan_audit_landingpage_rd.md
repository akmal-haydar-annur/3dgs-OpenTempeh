# Laporan Audit & Roadmap R&D Desain — Sandbox Eksperimen

> **Status Dokumen:** Living Document (Aktif / Laboratorium R&D)  
> **Target Lingkungan:** `app/labs/sandbox/page.tsx` & `app/labs/sandbox/sandbox.css`  
> **URL Live Sandbox:** `http://localhost:3000/labs/sandbox`  
> **Halaman Acuan Audit Visual:** `http://localhost:3000/labs/audit`  
> **Dokumen Baseline Acuan:** `laporan_audit_landingpage_utama.md`  
> **Tujuan Dokumen:** Panduan kerja operasional untuk melakukan pengujian konsolidasi token desain, pembersihan outlier, dan harmonisasi komponen berulang secara terisolasi tanpa menyentuh kode produksi landing page utama.

---

## 1. Matriks Perbedaan Ruang Lingkup: Landing Page Utama vs Sandbox R&D

| Dimensi Perbandingan | Landing Page Utama (`laporan_audit_landingpage_utama.md`) | Sandbox R&D (`laporan_audit_landingpage_rd.md`) |
| :--- | :--- | :--- |
| **Peran & Status** | Baseline Resmi (Produksi) — Terkunci | Tempat Uji Coba Eksperimental — Aktif |
| **Target File Markup** | `app/landingpage/page.tsx` | `app/labs/sandbox/page.tsx` |
| **Target File Styling** | `app/landingpage/landing.css` | `app/labs/sandbox/sandbox.css` |
| **URL Akses Pengguna** | `http://localhost:3000/landingpage` | `http://localhost:3000/labs/sandbox` |
| **Sifat Data Audit** | Deskriptif: mencatat realitas token yang berantakan & redundan apa adanya | Preskriptif: mencatat target perubahan, roadmap konsolidasi, dan hasil eksperimen |
| **Toleransi Outlier** | Menyimpan seluruh outlier dan kode legacy untuk tolok ukur pengujian | Target nol outlier (zero unintended outliers) |
| **Tingkat Resiko** | Kritis (berdampak langsung pada pengunjung publik & konversi) | Nol resiko (terisolasi penuh di rute labs) |
| **Tahapan Eksekusi** | Freeze / Tidak diubah selama proses R&D berjalan | Iterasi bebas, refactoring parsial, dan uji coba visual |

---

## 2. Roadmap Token Snapping: Kondisi Baseline vs Target R&D

Tabel di bawah ini memetakan konsolidasi token dari temuan baseline produksi menuju skala terstandar yang diuji di dalam sandbox:

| Kategori Desain | Kondisi Baseline di Landing Utama | Target Solusi di Sandbox R&D | Rasionalisasi & Target Reduksi |
| :--- | :--- | :--- | :--- |
| **Latar Terang (Off-White)** | 9 nilai berbeda (#faf8f4, #f8f5ee, #f7f4ed, #fcfbf7, #fcfbf8, #fffcf0, #fdf9ee, #f5f1e8, #ffffff) | Dipadatkan menjadi 3 level baku: <br>• Level 1 Surface: #FFFFFF (Putih bersih) <br>• Level 2 Background: #FAF8F4 (Warm paper) <br>• Level 3 Section: #F4F0E6 (Muted warm) | Reduksi 66% variasi. Menghilangkan nuansa kotor antar section bersebelahan. |
| **Latar Gelap & Hitam** | 8 nilai berbeda (#141414, #171412, #100d0b, #11161b, stone-900, stone-800, #292524, #2d2621) | Dipadatkan menjadi 3 token konsisten: <br>• Dark Primary: #171412 (Teks utama & solid CTA) <br>• Dark Secondary: #292524 (Teks sekunder/card) <br>• Dark Container: #12100E (Surface gelap) | Mengeliminasi tabrakan antara hitam hangat vs abu-abu kebiruan. |
| **Garis & Border Netral** | 9 nilai berbeda (border-stone-200/60, /80, /90, stone-300, #ded8cb, #ded7ca, #ede7dd, #d6d3d1) | Dipadatkan menjadi 3 tingkat kontras: <br>• Border Subtle: border-stone-200 (#E7E5E4) <br>• Border Strong: border-stone-300 (#D6D3D1) <br>• Border Dark: border-stone-800 (#292524) | Menghilangkan pecahan opacity arbitrary yang sulit di-maintain. |
| **Warna Brand Accent** | Campuran hex kustom (#eb5722, #d14614, #f79a74) dan utility Tailwind (orange-500, orange-600, orange-700) | Standarisasi 3 peran aksen: <br>• Brand Main: #EB5722 (Oranye utama OpenTempeh) <br>• Brand Hover: #D14614 (Oranye gelap interaktif) <br>• Brand Soft: bg-orange-100 / text-orange-800 (Badge) | Seluruh elemen oranye terikat ke palet tema yang harmonis. |
| **Tipografi (Font Size)** | 14 tingkatan ukuran (10px, 11px, 12px, 13px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px, 54px, 60px) | Dipadatkan menjadi 6 skala modular: <br>• Caption/Badge: text-xs (12px) <br>• Body Small: text-sm (14px) <br>• Body Regular: text-base (16px) <br>• H3 / Subheading: text-xl (20px) <br>• H2 Section: text-3xl (30px) <br>• H1 Hero Display: text-5xl (48px) sm / text-6xl (60px) lg | Menghapus 8 ukuran arbitrary (10px, 11px, 13px, 18px, 24px, 36px, 54px) yang merusak irama visual. |
| **Jarak (Spacing)** | 19 langkah (0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24) termasuk 5 pecahan ganjil | Mengikuti skala grid 4px/8px baku: <br>• Micro: 1 (4px), 2 (8px), 3 (12px), 4 (16px) <br>• Medium: 6 (24px), 8 (32px) <br>• Macro: 12 (48px), 16 (64px), 24 (96px) | Menghapus pecahan 1.5 (6px), 2.5 (10px), 3.5 (14px), 5 (20px), dan 7 (28px). |
| **Lengkung Sudut (Radius)** | 10 variasi (sm: 2px, rounded: 4px, md: 6px, lg: 8px, xl: 12px, 2xl: 16px, 3xl: 24px, full, asimetris bl/br) | Disederhanakan menjadi 3 skala seragam: <br>• Small (Button, Input, Badge): rounded-xl (12px) <br>• Large (Card Container): rounded-2xl (16px) <br>• Circle/Pill: rounded-full (9999px) | Menghapus sudut asimetris, rounded 4px, dan rounded 6px yang tampak kaku. |
| **Durasi Animasi** | 6 nilai berbeda (150ms, 200ms, 250ms, 300ms, 500ms, 120s) dengan satuan campur ms dan detik | Disederhanakan menjadi 2 kecepatan baku: <br>• Micro-Interaction (Hover Button/Link): 200ms <br>• Macro-Interaction (Modal, Accordion): 300ms | Animasi terasa responsif, seragam, dan mudah diprediksi. |

---

## 3. Rencana Eksekusi Pembersihan Outlier di Sandbox

Daftar 12 nilai outlier yang ditemukan pada audit landing page utama dan rencana solusinya di sandbox:

| Nilai Outlier Terdeteksi | Lokasi Komponen di Halaman | Status R&D | Tindakan Solusi yang Diterapkan di Sandbox |
| :--- | :--- | :--- | :--- |
| **text-[13px]** | Navigasi menu header | **Selesai (Verified)** | Berhasil di-snap ke text-sm (14px) font-body-modern (Plus Jakarta Sans). |
| **text-[54px]** | Breakpoint lg pada H1 Hero | **Selesai (Verified)** | Berhasil di-snap ke text-5xl (48px) standar Tailwind. |
| **text-[60px]** | Breakpoint xl pada H1 Hero | **Selesai (Verified)** | Berhasil di-snap ke text-6xl (60px) standar Tailwind. |
| **rounded-bl-lg / rounded-br-lg** | Sudut bawah boks chat & kartu fitur | **Selesai (Verified)** | Dikonversi menjadi chat bubble modern: rounded-2xl rounded-br-sm (pengirim) & rounded-2xl rounded-bl-sm (asisten), kartu fitur simetris rounded-2xl. |
| **bg-[#11161b]** | Boks viewport 3D seksi fitur | **Selesai (Verified)** | Diganti dengan Dark Primary baku #171412 dan border stone-800. |
| **bg-[#fffcf0] & bg-[#fdf9ee]** | Kartu perbandingan kos & jaminan escrow | **Selesai (Verified)** | Kartu kos di-upgrade ke #FFFFFF bersih border-stone-200/90, boks jaminan di-snap ke bg-amber-50/70 border-amber-200. |
| **bg-[#f5f1e8] & #ded7ca** | Rule CSS kanvas peta nautikal | **Selesai (Verified)** | Diganti dengan Modern Spatial Grid pada latar #faf8f4 dan titik grid stone-200. |
| **#100d0b** | Utility CSS .bg-maritime-darker | **Selesai (Verified)** | Diganti dengan token Dark Primary baku #171412 di sandbox.css. |
| **#5f6770 & #2d2621** | Warna border & slate peninggalan | **Selesai (Verified)** | Dibersihkan dari sandbox.css, digantikan oleh stone-800 (#292524) dan stone-500 (#78716c). |
| **text-[10px] & text-[11px]** | Micro-label status kos & ticker | **Selesai (Verified)** | Ditingkatkan ke text-xs (12px) font-medium/font-semibold demi keterbacaan WCAG AA. |
| **duration-150** | Tombol navigasi header | **Selesai (Verified)** | Diseragamkan ke duration-200 (200ms) sesuai standar micro-interaction master button. |
| **0.25s (CSS)** | Hover underline link di sandbox.css | **Selesai (Verified)** | Diseragamkan ke 0.2s (200ms) cubic-bezier(0.4, 0, 0.2, 1). |

---

## 4. Arsitektur Komponen Master di Sandbox R&D

Rencana standardisasi komponen berulang untuk mengatasi inkonsistensi yang ada di baseline:

| Komponen Master | Standar Desain yang Diterapkan di Sandbox | Solusi Terhadap Inkonsistensi Baseline |
| :--- | :--- | :--- |
| **Master Button (Primary)** | Background #171412 solid, teks putih, font Plus Jakarta Sans, padding px-6 py-3.5, rounded-xl, shadow-sm, hover:bg-[#292524] transition duration-200. | Menghilangkan percampuran tombol neo-brutalist bayangan tajam (shadow 2px/4px) dengan tombol modern. |
| **Master Button (Secondary Link)** | Teks #171412, font-semibold, garis bawah interaktif dengan animasi sapuan warna oranye #eb5722 saat di-hover. | Memberikan alternatif aksi kedua yang bersih tanpa membuat visual halaman terlalu padat oleh boks tombol. |
| **Master Card (Surface Light)** | Background #FFFFFF, border border-stone-200/90, rounded-2xl, p-6 hingga p-8, shadow-sm hover:shadow-md transition duration-200. | Menyeragamkan kartu fitur, solusi, katalog kos, dan testimoni ke satu bahasa desain kontemporer. |
| **Master Card (Surface Dark)** | Background #171412, border border-stone-800, rounded-2xl, teks putih, aksen oranye subtle. | Digunakan khusus untuk kontainer statistik spasial dan CTA penawaran eksklusif. |
| **Master Badge & Pill** | Display inline-flex, px-3 py-1, rounded-full, text-xs, font-medium, dengan 2 varian: <br>1. Brand Pill: bg-orange-100 text-orange-800 <br>2. Neutral Pill: bg-stone-100 text-stone-700 border border-stone-200 | Menghilangkan bentuk persegi kaku rounded 4px pada status label dan menyatukannya ke bentuk kapsul modern. |
| **Master Section Header** | Pola 3 lapis seragam: <br>1. Eyebrow: text-xs uppercase font-semibold tracking-wider text-orange-600 <br>2. Title: text-3xl sm:text-4xl font-extrabold font-display-modern text-stone-900 natural case <br>3. Subtitle: text-stone-600 text-base max-w-xl mx-auto | Mengeliminasi font tulisan tangan miring *Caveat* dan font poster *Bebas Neue* yang bertabrakan dengan hero modern. |
| **Master Form Input** | Background putih, border border-stone-300 focus:border-orange-500, rounded-xl, px-4 py-3.5, text-sm, tinggi sejajar dengan tombol aksi. | Menyamakan radius input dengan tombol agar rapi saat disusun bersebelahan. |

---

## 5. Log Eksperimen & Status Eksekusi R&D

| ID Eksperimen | Deskripsi Target Pekerjaan | File yang Dimodifikasi | Status | Hasil Pengujian & Catatan |
| :--- | :--- | :--- | :--- | :--- |
| **EXP-01** | Redesain Hero Section Modern tanpa elemen robekan kertas / nautikal jadul | `app/landingpage/page.tsx` | **Selesai (Verified)** | Hero 2-kolom modern, foto mahasiswi realistis, widget spasial 3DGS, zero emoji, CTA hover underline interaktif aktif. |
| **EXP-02** | Audit komprehensif seluruh token desain landing page | `laporan_audit_landingpage_utama.md` | **Selesai (Verified)** | Berhasil mengidentifikasi 55+ warna, 14 ukuran font, 19 spacing, 10 radius, dan 12 outlier. |
| **EXP-03** | Pembuatan Halaman Audit Visual Terpadu | `app/labs/audit/page.tsx` | **Selesai (Verified)** | Halaman live interaktif di `/labs/audit` menampilkan swatch kontras teks riil, type specimen, dan penggaris spacing. |
| **EXP-04** | Kloning Landing Page ke Lingkungan Terisolasi R&D | `app/labs/sandbox/page.tsx` & `sandbox.css` | **Selesai (Verified)** | Berhasil menduplikasi landing page 100% identik ke `/labs/sandbox`. |
| **EXP-05** | Perbaikan Full-Bleed View Sandbox pada AppShell | `components/layout/AppShell.tsx` | **Selesai (Verified)** | Mendaftarkan `/labs/sandbox` ke `isPublicPage` sehingga sidebar & header dashboard hilang; tampilan 100% identik dengan produksi. |
| **EXP-06** | Pemisahan Dokumen Laporan: Utama vs R&D | `laporan_audit_landingpage_utama.md` & `laporan_audit_landingpage_rd.md` | **Selesai (Verified)** | Dokumen utama bertindak sebagai baseline resmi terkunci, dokumen R&D bertindak sebagai panduan aksi eksperimen sandbox. |
| **EXP-07** | Konsolidasi Token & Pembersihan Outlier di Sandbox | `app/labs/sandbox/sandbox.css` & `page.tsx` | **Selesai (Verified)** | Berhasil menghapus ke-12 outlier (font size arbitrary, hex background liar, timing arbitrary, scrollbar & canvas nautikal). |
| **EXP-08** | Harmonisasi Seksi Bawah (Masalah, Solusi, Katalog, Testimoni) di Sandbox | `app/labs/sandbox/page.tsx` | **Selesai (Verified)** | Mengganti font Caveat & Bebas Neue pada seluruh section headers dengan Master Section Header modern (Plus Jakarta Sans). Seluruh kartu diselaraskan ke rounded-2xl dan tombol ke rounded-xl. |
| **EXP-09** | Pengujian Visual Regression & Verifikasi Final | Sandbox vs Landing Utama | **Selesai (Verified)** | Verifikasi visual live di `http://localhost:3000/labs/sandbox`. Landing utama tetap 100% terisolasi tanpa modifikasi. |
| **EXP-10** | Eliminasi 9 Eyebrow Pill Badges & Evaluasi Spasial Minimalis | `app/labs/sandbox/page.tsx` | **Selesai (Verified)** | Menghapus 9 pill repetitif pada seksi utama & baris fitur; visual weight langsung berpusat pada H2/H3 dan safe space vertikal menjadi jauh lebih lega. |
| **EXP-11** | Redesain Kartu Katalog Properti Berstandar Industri | `app/labs/sandbox/page.tsx` | **Selesai (Verified)** | Mengeliminasi pill kota di atas kartu, menerapkan full-bleed media 16:10, pemisahan harga & judul bebas truncate, serta footer aksi seimbang. |
| **EXP-12** | Pemurnian Media Header: Eliminasi Floating Badges 3D & Skala 1:1 | `app/labs/sandbox/page.tsx` | **Selesai (Verified)** | Menghapus lencana floating 'Tur Spasial 3D' dan 'Skala 1:1'; foto kamar tampil 100% bersih, lapang, dan bebas distraksi visual. |
| **EXP-13** | Eliminasi Efek Hover Pengubah Warna pada Kartu Katalog | `app/labs/sandbox/page.tsx` | **Selesai (Verified)** | Menghapus `group-hover:text-[#eb5722]` pada judul dan `hover:bg-[#eb5722]` pada tombol; respon hover dialihkan murni ke elevasi spasial (lift & shadow) tanpa perubahan warna. |
| **EXP-14** | Optimasi Komposisi & Spotlight Tombol "Cari Kos" di Navbar | `app/labs/sandbox/page.tsx` | **Selesai (Verified)** | Menaikkan ukuran touch target ke `px-5 py-2.5 text-sm`, menerapkan warna brand spotlight `#eb5722` (aturan 10% aksen), dan menyelaraskan tipografi link Login. |
| **EXP-15** | Tokenisasi Penuh (`tokens.css`), Dokumentasi Sistem (`DESIGN.md`), dan Refaktor Landing Page | `app/tokens.css`, `DESIGN.md`, `app/landingpage/landing.css`, `app/landingpage/page.tsx` | **Selesai (Verified)** | Menghubungkan landing page utama ke `tokens.css` v1.0.0, menyelaraskan seluruh perbaikan sandbox, dan mendokumentasikan Decision Log lengkap dengan alasan pengguna. |

---

## 6. Protokol Promosi Aman ke Landing Page Utama (Safe Promotion Checklist)

Sebelum perubahan dari sandbox di-merge ke landing page utama (`app/landingpage/`), seluruh checklist ini wajib dipenuhi:

1. **Uji Fungsionalitas:** Seluruh navigasi, scroll anchor, interaksi tombol, form newsletter, dan widget 3DGS di sandbox berfungsi normal tanpa error console.
2. **Uji Responsivitas:** Tampilan diuji pada resolusi Mobile (375px), Tablet (768px), Laptop (1024px), dan Desktop (1440px+).
3. **Pemeriksaan Kontras Teks:** Seluruh teks memenuhi rasio kontras WCAG AA (minimal 4.5:1 untuk teks normal dan 3:1 untuk teks besar) sesuai data `/labs/audit`.
4. **Verifikasi Visual:** Dilakukan penangkapan layar (*screenshot*) komparasi berdampingan antara `/landingpage` dan `/labs/sandbox`.
5. **Persetujuan Pengguna:** Pengguna memberikan konfirmasi persetujuan terhadap hasil visual sandbox sebelum file `app/landingpage/page.tsx` dan `app/landingpage/landing.css` diperbarui.
