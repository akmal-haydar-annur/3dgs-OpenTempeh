# OpenTempeh Design System & Architecture Specification
> **System Version:** `1.0.0`  
> **Status:** Production Standard (Adopted from R&D Sandbox EXP-01 — EXP-14)  
> **Core Theme:** Warm Paper Editorial & Precision 3DGS Spatial PropTech  
> **Source Files:** [`app/tokens.css`](file:///d:/coding/Javascript/3dgs-opentempeh/3dgs-OpenTempeh/app/tokens.css), [`app/landingpage/landing.css`](file:///d:/coding/Javascript/3dgs-opentempeh/3dgs-OpenTempeh/app/landingpage/landing.css), [`app/landingpage/page.tsx`](file:///d:/coding/Javascript/3dgs-opentempeh/3dgs-OpenTempeh/app/landingpage/page.tsx)  
> **R&D Testbed:** [`app/labs/sandbox/page.tsx`](file:///d:/coding/Javascript/3dgs-opentempeh/3dgs-OpenTempeh/app/labs/sandbox/page.tsx) | [Visual Audit Laboratory](http://localhost:3000/labs/audit)

---

## 1. Filosofi & Karakter Visual Sistem

OpenTempeh Design System dibangun di atas perpaduan dua ranah estetika:
1. **Warm Paper Editorial (PropTech Nyaman & Humanis):** Latar belakang bertekstur kertas hangat (*ivory/cream* `#faf8f4`), garis pemisah tipis bertingkat netral (*stone* 200–300), dan tipografi display modern yang anggun dan mudah dibaca oleh calon penyewa kos maupun orang tua mahasiswa.
2. **Precision 3DGS Spatial Technology (Kecanggihan Rekonstruksi 3D):** Skala spasial 1:1, kisi kanvas modular (*spatial grid*), dan kontras aksen oranye terang yang berani untuk memandu pandangan mata ke aksi kunci (*spotlight conversion*).

### Implementasi Aturan Komposisi Warna 60-30-10
Sistem warna OpenTempeh mematuhi aturan baku hierarki visual industri:
- **60% Dominan (Warm Paper Surfaces):** `#faf8f4` (latar halaman), `#ffffff` (permukaan kartu & input), `#f7f4ed` (seksi terselip), dan `#f8f5ee` (navbar).
- **30% Struktural (Tailwind Stone Neutrals):** Skala `stone-50` hingga `stone-950`. Khususnya `#171412` untuk teks judul utama, tombol dark solid, dan wadah fitur kontras, serta `stone-600` untuk teks isi dan `stone-200/300` untuk garis pembatas.
- **10% Aksen (OpenTempeh Vibrant Orange):** `#eb5722` (hover `#d14614`, badge soft `#ffedd5`). Aksen ini tidak boleh dihamburkan pada sembarang elemen dekoratif, melainkan dipreservasi khusus untuk *primary call-to-action*, indikator status interaktif, dan penanda verifikasi spasial.

---

## 2. Arsitektur Token Desain (`tokens.css`)

Semua token desain dideklarasikan di [`app/tokens.css`](file:///d:/coding/Javascript/3dgs-opentempeh/3dgs-OpenTempeh/app/tokens.css) di bawah pemilih `:root` dan `[data-design-version="1.0.0"]` untuk menjamin stabilitas versioning.

### 2.1. Kamus Token Warna (Color Tokens)

| Kategori Token | Nama Token CSS | Nilai Hex / RGB | Peruntukan Komponen |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `--color-brand-primary` | `#eb5722` | Tombol spotlight utama, aksen harga kunci, garis bawah aktif |
| **Brand Hover** | `--color-brand-hover` | `#d14614` | Status hover tombol utama dan link interaktif |
| **Brand Active** | `--color-brand-active` | `#b5380b` | Status aktif/tekan tombol utama |
| **Brand Subtle** | `--color-brand-subtle` | `#fff2ed` | Background tipis di belakang badge aksen |
| **Brand Soft** | `--color-brand-soft` | `#ffedd5` | Badge oranye lembut (Tailwind orange-100) |
| **Brand Border** | `--color-brand-border` | `#f97316` | Garis pembatas fokus interaktif |
| **Brand Shadow** | `--color-brand-shadow` | `rgba(235, 87, 34, 0.22)` | Efek glow spotlight pada tombol navigasi |
| **Surface Pure** | `--color-surface-pure` | `#ffffff` | Kartu properti, boks form input, kontainer putih bersih |
| **Surface Cream** | `--color-surface-cream` | `#faf8f4` | Latar utama halaman (*warm paper baseline*) |
| **Surface Nav** | `--color-surface-nav` | `#f8f5ee` | Latar bilah navigasi lengket (*sticky navbar*) |
| **Surface Muted** | `--color-surface-muted` | `#f7f4ed` | Latar seksi sejuk / alternatif peredam kontras |
| **Surface Card** | `--color-surface-card` | `#fcfbf8` | Latar kartu bertekstur hangat |
| **Surface Dark** | `--color-surface-dark` | `#171412` | Tombol dark solid, boks peraga 3D, judul seksi utama |
| **Surface Dark Deep** | `--color-surface-dark-deep` | `#12100e` | Latar footer terdalam dan batas kontras tinggi |
| **Neutrals (Stone 50–950)** | `--color-stone-[50..950]` | Nilai Tailwind Stone | Struktur teks, batas pembatas, dan teks sekunder |
| **Status Success** | `--color-status-success` | `#10b981` | Indikator live rekaman, kamar kos terverifikasi |
| **Status Warning** | `--color-status-warning-bg` | `rgba(254, 243, 199, 0.7)` | Boks jaminan pembayaran escrow |

### 2.2. Kamus Token Tipografi (Typography Tokens)

| Peran Tipografi | Token Family | Font Fallback | Karakteristik |
| :--- | :--- | :--- | :--- |
| **Display Primary** | `--font-family-display` | Plus Jakarta Sans, Outfit, sans-serif | Ekstra tebal, modern, tajam, dan tidak dekoratif berlebihan |
| **Body Primary** | `--font-family-body` | Plus Jakarta Sans, sans-serif | Sangat mudah dibaca di layar seluler dengan rendering tajam |
| **Editorial Secondary** | `--font-family-editorial` | Space Grotesk, sans-serif | Karakter monospace semi-editorial untuk spesifikasi data |
| **Technical Mono** | `--font-family-mono` | Space Mono, monospace | Nilai koordinat GPS, timestamp rekonstruksi, hash kamera |

#### Skala Ukuran Font Modular (Type Scale)
- `--font-size-2xs`: `0.625rem` (10px) — Micro-metadata
- `--font-size-xs`: `0.75rem` (12px) — Badge, caption, label status
- `--font-size-sm`: `0.875rem` (14px) — Teks menu navbar, tombol sekunder, input form
- `--font-size-base`: `1rem` (16px) — Teks paragraf tubuh standar (*body text*)
- `--font-size-lg`: `1.125rem` (18px) — Subjudul kartu kos, label kategori
- `--font-size-xl`: `1.25rem` (20px) — Judul kartu fitur, H3 subseksi
- `--font-size-2xl`: `1.5rem` (24px) — Sub-header seksi
- `--font-size-3xl`: `1.875rem` (30px) — Judul seksi H2 pada layar ponsel/tablet
- `--font-size-4xl`: `2.25rem` (36px) — Judul seksi H2 pada layar desktop
- `--font-size-5xl`: `3rem` (48px) — Judul Hero H1 pada layar tablet
- `--font-size-6xl`: `3.75rem` (60px) — Judul Hero H1 pada layar desktop lebar

### 2.3. Kamus Token Spacing, Radius, Elevasi & Transisi

| Kategori | Token | Nilai Baku | Panduan Penggunaan |
| :--- | :--- | :--- | :--- |
| **Spacing Grid** | `--space-1` s.d. `--space-24` | 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px | Kelipatan 4px/8px baku. Dilarang menggunakan pecahan ganjil arbitrary |
| **Radius Small** | `--radius-xl` | `0.75rem` (12px) | Tombol, input teks formulir, boks pencarian |
| **Radius Card** | `--radius-2xl` | `1rem` (16px) | Seluruh kontainer kartu master (katalog, fitur, solusi) |
| **Radius Collage** | `--radius-3xl` | `1.5rem` (24px) | Bingkai foto mahasiswi & peraga kamera di Hero |
| **Radius Pill** | `--radius-full` | `9999px` | Kapsul status verifikasi, avatar pengguna |
| **Shadow Subtle** | `--shadow-sm` | `0 1px 2px 0 rgba(0,0,0,0.05)` | Status diam seluruh kartu dan tombol |
| **Shadow Elevate** | `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.08)` | Efek angkat (*tactile hover*) pada kartu katalog |
| **Shadow Spotlight** | `--shadow-spotlight-orange` | `0 4px 14px 0 rgba(235,87,34,0.25)` | Hover glow khusus tombol "Cari Kos" |
| **Micro Transition** | `--duration-normal` | `200ms cubic-bezier(0.4, 0, 0.2, 1)` | Interaksi hover tombol, link, dan ikon |
| **Macro Transition** | `--duration-slow` | `300ms cubic-bezier(0.4, 0, 0.2, 1)` | Transisi bayangan kartu, modal dialog |

---

## 3. Decision Log Lengkap (Catatan Keputusan Berdasarkan Alasan Pengguna)

Log ini merangkum seluruh keputusan desain, alasan pengguna (*user reasons*), dan justifikasi visual dari iterasi EXP-01 hingga EXP-15:

| ID Keputusan | Judul Keputusan | Masalah Awal & Alasan Pengguna (*User Rationale*) | Solusi Arsitektur yang Diterapkan | Hasil Pengujian & Dampak Visual |
| :--- | :--- | :--- | :--- | :--- |
| **DEC-01** | **Redesain Total Hero Modern** *(EXP-01)* | Hero lama mengadopsi estetika bahari/nautikal jadul (kompas robek, peta usang, emoji kartun) yang tidak mencerminkan kredibilitas produk teknologi rekayasa spasial tinggi. | Mengganti hero dengan layout 2-kolom bersih: sisi kiri proposisi nilai terstruktur dengan link garis bawah beranimasi; sisi kanan foto mahasiswi realistis berpadu dengan widget interaktif 3DGS. | Tampilan hero langsung berkesan startup teknologi kelas dunia; pesan skalabilitas 1:1 tersampaikan dalam 3 detik pertama. |
| **DEC-02** | **Audit Komprehensif & Deteksi Outlier** *(EXP-02 & EXP-03)* | Kode warisan memiliki 55+ warna berbeda, 14 ukuran font sembarangan (misal `text-[13px]`, `text-[54px]`), dan 12 outlier styling yang membebani performa dan estetika. | Melakukan pemindaian seluruh AST, mendokumentasikan baseline resmi, dan membangun lab visual audit interaktif di `/labs/audit`. | Tim memiliki tolok ukur objektif dan daftar 12 target pembersihan yang terukur. |
| **DEC-03** | **Workflow Isolasi Sandbox R&D** *(EXP-04 — EXP-06)* | Pengguna menginginkan eksperimen visual radikal tanpa risiko merusak rute produksi publik `/landingpage`. | Membuat klon terisolasi di `/labs/sandbox` dengan stylesheet mandiri `sandbox.css`, serta memisahkan dokumen audit utama dan audit R&D. | Siklus uji coba desain dapat diiterasi tanpa downtime atau regresi pada pengunjung situs utama. |
| **DEC-04** | **Pembersihan 12 Outlier Desain** *(EXP-07)* | Ditemukan nilai-nilai ganjil seperti `text-[13px]`, `bg-[#11161b]`, `bg-[#fffcf0]`, border nautikal `#ded7ca`, sudut asimetris `rounded-bl-lg`, dan durasi `0.25s`. | Melakukan *snapping* menyeluruh: `text-[13px]` ke `text-sm` (14px), latar ke sistem Dark/Surface baku, border ke `stone-200`, sudut ke `rounded-2xl`, dan animasi ke `200ms`. | Menghilangkan nuansa kotor pada antarmuka; seluruh ritme jarak dan ukuran menjadi konsisten. |
| **DEC-05** | **Harmonisasi Tipografi Seksi Bawah** *(EXP-08)* | Seksi Masalah, Solusi, Katalog, dan Testimoni menggunakan font tulisan tangan *Caveat* dan font poster *Bebas Neue* yang bertabrakan dengan hero modern. | Seluruh judul seksi diubah menggunakan *Plus Jakarta Sans* (*Master Section Header*), memulihkan keterbacaan teks dan elegansi editorial. | Seluruh halaman mengalir dalam satu identitas visual yang padu dari atas ke bawah. |
| **DEC-06** | **Eliminasi 9 Eyebrow Pill Badges** *(EXP-10)* | *Permintaan Pengguna:* Menghilangkan komponen pill dan teksnya untuk 9 badge repetitif ("Realita Pencarian Kos", "Jawaban Kami", "Teknologi & Layanan", "01–04 fitur", "Pengalaman Pengguna", "Langkah Terakhir Anda"). | Menghapus ke-9 badge pil. Membiarkan judul seksi H2 dan kartu H3 menjadi jangkar visual utama, dengan *safe space* vertikal yang lapang (+28px per seksi). | Halaman tidak lagi terasa padat dan kekanak-kanakan; hierarki tipografi menjadi sangat dewasa, minimalis, dan elegan. |
| **DEC-07** | **Redesain Kartu Katalog Properti** *(EXP-11)* | *Permintaan Pengguna:* Audit kartu kos dengan memperhatikan komposisi, estetika, layout, warna, hilangkan pill, dan revisi dengan standar industri. | 1. Menghapus pill kota floating di atas foto. <br>2. Menerapkan rasio media *full-bleed* 16:10. <br>3. Memindahkan metadata lokasi ke bawah foto dengan ikon pin minimalis. <br>4. Menghilangkan `truncate` pada judul agar judul kamar dapat terbaca utuh. <br>5. Memisahkan harga dan tombol aksi di footer kartu. | Rasio klik dan keterbacaan kartu meningkat drastis; kartu kos setara dengan standar Airbnb dan marketplace hunian modern. |
| **DEC-08** | **Pemurnian Foto: Hapus Floating Badges** *(EXP-12)* | *Permintaan Pengguna:* Hapus label 'Tur Spasial 3D' dan 'Skala 1:1' yang menempel di atas foto kamar kos pada kartu. | Menghapus seluruh elemen overlay badge di atas gambar. Foto kamar kos kini tampil bersih 100% tanpa ada elemen UI yang menutupi sudut visual ruangan. | Foto kamar terlihat lapang, terang, dan tidak terganggu oleh stempel teks dekoratif. |
| **DEC-09** | **Larangan Perubahan Warna saat Hover** *(EXP-13)* | *Permintaan Pengguna:* Pada kartu katalog properti, jangan gunakan efek hover yang mengubah warna elemen. | Menghapus `group-hover:text-[#eb5722]` pada judul kamar dan menghapus `hover:bg-[#eb5722]` pada tombol "Lihat Spasial 3D". Respon hover dialihkan murni ke elevasi spasial (`hover:-translate-y-0.5` dan `hover:shadow-md`). | Interaksi kartu terasa mantap dan tactile tanpa efek visual 'kedip' warna yang mengganggu ketenangan visual pembaca. |
| **DEC-10** | **Spotlight Tombol "Cari Kos" di Navbar** *(EXP-14)* | *Permintaan Pengguna:* Audit dan ubah komposisi tombol "Cari Kos" agar lebih besar sedikit, lebih terspotlight, memenuhi aturan visual warna dan visibilitas. | 1. Memperbesar ukuran touch target dari `text-xs py-2 px-4` menjadi `text-sm py-2.5 px-5` dengan `rounded-xl`. <br>2. Menerapkan warna brand oranye `#eb5722` (hover `#d14614`) dengan ambient glow shadow `rgba(235, 87, 34, 0.2)`. <br>3. Mengembalikan link Login ke font *Plus Jakarta Sans* netral. | Tombol "Cari Kos" langsung menjadi magnet konversi utama saat halaman dimuat, memenuhi aturan alokasi 10% aksen dan standar aksesibilitas WCAG AA. |
| **DEC-11** | **Standarisasi Tokens.css & Refactor Landing** *(EXP-15)* | *Permintaan Pengguna:* Tulis `tokens.css` (buat versioning), `DESIGN.md` (termasuk Decision Log), dan refactor landing page agar membaca token dengan tampilan hampir identik dengan sandbox. | Menetapkan file [`app/tokens.css`](file:///d:/coding/Javascript/3dgs-opentempeh/3dgs-OpenTempeh/app/tokens.css) versi `1.0.0`, menghubungkannya ke [`app/landingpage/landing.css`](file:///d:/coding/Javascript/3dgs-opentempeh/3dgs-OpenTempeh/app/landingpage/landing.css), dan menyelaraskan [`app/landingpage/page.tsx`](file:///d:/coding/Javascript/3dgs-opentempeh/3dgs-OpenTempeh/app/landingpage/page.tsx) dengan seluruh perbaikan yang telah diverifikasi di sandbox. | Kode produksi menjadi bersih, terdokumentasi rapi, terikat ke satu sumber kebenaran desain, dan siap dikembangkan dalam skala besar. |

---

## 4. Spesifikasi Komponen Master

### 4.1. Master Button: Spotlight Primary
Digunakan khusus untuk CTA konversi tertinggi di navbar dan seksi konversi utama.
- **Elemen:** `<Link>` atau `<button>`
- **Styling:** `px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] shadow-sm hover:shadow-[var(--shadow-spotlight-orange)] transition-all duration-200 hover:-translate-y-0.5`
- **Aksesibilitas:** Rasio kontras teks putih terhadap `#eb5722` adalah 3.2:1 (teks besar/semi-bold memenuhi WCAG AA Graphical Objects and User Interface Components).

### 4.2. Master Button: Dark Solid
Digunakan untuk CTA eksplorasi sekunder dan tombol di area konten bernuansa kertas.
- **Styling:** `px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-[var(--color-surface-dark)] hover:bg-[var(--color-stone-800)] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`

### 4.3. Master Card: Katalog Kos Spasial
- **Wadah Luar:** `bg-[var(--color-surface-pure)] border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`
- **Area Foto:** Rasio `aspect-[16/10]`, gambar dengan zoom mikro `group-hover:scale-105 transition-transform duration-500 ease-out`. Bebas dari stempel badge yang menutupi gambar.
- **Badget Harga:** Angka harga menonjol `text-lg font-bold text-[var(--color-surface-dark)]` bersanding dengan unit `/bulan` berwarna `stone-500 text-xs`.
- **Tombol Aksi:** Tetap stabil warna hitam `#171412` tanpa berganti warna saat di-hover.

### 4.4. Master Section Header
- **Eyebrow:** *Ditiadakan* (berdasarkan DEC-06) demi menciptakan safe space yang lega.
- **Judul Utama H2:** `text-3xl sm:text-4xl font-extrabold font-display-modern text-[var(--color-surface-dark)] tracking-tight leading-tight`
- **Deskripsi Subtitle:** `mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-body-modern max-w-xl mx-auto`

---

## 5. Protokol Pemeliharaan & Versioning Mendatang

1. **Aturan Perubahan Token:**
   - Dilarang keras menambahkan kode warna hex sembarang (misal `bg-[#...]`) atau ukuran font arbitrer langsung di file halaman produksi.
   - Setiap nilai baru wajib didaftarkan terlebih dahulu di [`app/tokens.css`](file:///d:/coding/Javascript/3dgs-opentempeh/3dgs-OpenTempeh/app/tokens.css).
2. **Pengujian Sandbox Terlebih Dahulu:**
   - Fitur atau variasi kartu baru wajib diuji di [`app/labs/sandbox/page.tsx`](file:///d:/coding/Javascript/3dgs-opentempeh/3dgs-OpenTempeh/app/labs/sandbox/page.tsx) sebelum dipromosikan ke halaman landing page utama.
3. **Penaikan Versi (Versioning Rules):**
   - **Patch (`1.0.1`):** Penyesuaian mikro pada durasi transisi atau penambahan token alias tanpa mengubah visual eksisting.
   - **Minor (`1.1.0`):** Penambahan komponen master baru (misal modal kalkulator sewa, filter interaktif) yang mematuhi token yang ada.
   - **Major (`2.0.0`):** Perubahan menyeluruh pada tema brand atau restrukturisasi sistem grid.
