export interface KosFacility {
  icon: string;
  name: string;
}

export interface KosRule {
  icon: string;
  title: string;
  desc: string;
}

export interface KosGeneralRule {
  icon: string;
  title: string;
}

export interface KosHost {
  name: string;
  role: string;
  lastOnline: string;
  transactions: number;
  initial: string;
  bio: string;
}

export interface KosAltRoom {
  title: string;
  dimension: string;
  remaining: string;
  floor: string;
  tags: string[];
  description: string;
  discountText: string;
  originalPrice: string;
  price: string;
  image: string;
}

export interface KosNearbyPOI {
  name: string;
  distance: string;
  icon: string;
  highlight?: boolean;
}

export interface KosItem {
  id: string;
  name: string;
  location: string;
  subdistrict: string;
  city: string;
  category: "Campur" | "Khusus Putri" | "Khusus Putra";
  catalogId: string;
  archivalPlate: string;
  type: string;
  price: number;
  priceLabel: string;
  originalPrice: string;
  discountBadge: string;
  rating: number;
  reviews: number;
  views: number;
  facilities: string[];
  has3dTour: boolean;
  image: string;
  bathroomImage: string;
  communalImage: string;
  description: string;
  availabilityStatus: string;
  availabilityRibbon: {
    isWarning: boolean;
    text: string;
    altLinkText: string;
    altLinkId: string;
  };
  dimension: string;
  electricity: string;
  water: string;
  capacity: string;
  deposit: string;
  roomFacilities: KosFacility[];
  bathroomFacilities: KosFacility[];
  commonFacilities: KosFacility[];
  parkingFacilities: KosFacility[];
  rules: KosRule[];
  generalRules: KosGeneralRule[];
  ownerStory: string[];
  host: KosHost;
  altRoom: KosAltRoom;
  nearbyPOIs: KosNearbyPOI[];
  mapCoords: { top: string; left: string };
}

export const KOS_DATA: KosItem[] = [
  {
    id: "kost-grha-gratia-tipe-a",
    name: "Kost Grha Gratia Tipe A",
    location: "Banyumanik, Semarang (Dekat Gerbang Undip)",
    subdistrict: "Banyumanik",
    city: "Kota Semarang",
    category: "Campur",
    catalogId: "CAT. ID #SMG-BNY-0824",
    archivalPlate: "ARCHIVAL PLATE #01 — INTERIOR SUITE",
    type: "Kamar Mandi Dalam",
    price: 1555000,
    priceLabel: "Rp1.555.000",
    originalPrice: "Rp1.725.000",
    discountBadge: "Diskon 170rb",
    rating: 4.8,
    reviews: 48,
    views: 520,
    has3dTour: true,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    bathroomImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    communalImage:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description:
      "Hunian berarsitektur modern dan asri dengan sirkulasi udara optimal di kawasan strategis Banyumanik, berdekatan langsung dengan kampus Undip Tembalang.",
    availabilityStatus: "Sisa 2 Kamar (Siap Huni)",
    availabilityRibbon: {
      isWarning: false,
      text: "Tersedia 2 unit kamar siap huni di Lantai 2. Segera reservasi sebelum masa ajaran baru dimulai!",
      altLinkText: "Lihat Tipe B",
      altLinkId: "tipe-lain",
    },
    dimension: "4 x 3.5 Meter",
    electricity: "Termasuk Listrik",
    water: "Termasuk PDAM",
    capacity: "Maks. 2 Orang",
    deposit: "Rp250.000",
    facilities: ["Kamar Mandi Dalam", "AC", "WiFi", "Kasur"],
    roomFacilities: [
      { icon: "bed", name: "Kasur Springbed Queen" },
      { icon: "mode_fan", name: "AC Hemat Energi 1/2 PK" },
      { icon: "desk", name: "Meja Belajar Kayu Jati" },
      { icon: "chair", name: "Kursi Kerja Ergonomis" },
      { icon: "shelves", name: "Lemari Pakaian 2 Pintu" },
      { icon: "air", name: "Ventilasi Udara Alami" },
      { icon: "window", name: "Jendela Menghadap Luar" },
      { icon: "crop_portrait", name: "Cermin Dinding Panjang" },
    ],
    bathroomFacilities: [
      { icon: "bathtub", name: "K. Mandi Dalam" },
      { icon: "wc", name: "Kloset Duduk Toto" },
      { icon: "shower", name: "Shower Semprot" },
      { icon: "water_heater", name: "Water Heater" },
    ],
    commonFacilities: [
      { icon: "wifi", name: "WiFi Indihome 100Mbps" },
      { icon: "kitchen", name: "Kulkas Bersama 2 Pintu" },
      { icon: "person", name: "Penjaga Kos 24 Jam" },
      { icon: "dry_cleaning", name: "Ruang Jemur Beratap" },
      { icon: "restaurant", name: "Ruang Makan & Santai" },
      { icon: "countertops", name: "Dapur Bersama Lengkap" },
      { icon: "videocam", name: "CCTV Keamanan 8 Titik" },
      { icon: "outdoor_grill", name: "Kompor Gas Siap Pakai" },
    ],
    parkingFacilities: [
      { icon: "two_wheeler", name: "Parkir Motor Luas (Kanopi & Pagar)" },
      { icon: "directions_car", name: "Parkir Mobil (Sisa 1 Slot)" },
      { icon: "pedal_bike", name: "Area Parkir Sepeda Aman" },
    ],
    rules: [
      {
        icon: "person_add",
        title: "Tamu Menginap Dikenakan Biaya",
        desc: "Lapor 1x24 jam ke pengelola kos untuk konfirmasi izin tinggal.",
      },
      {
        icon: "group_off",
        title: "Maks. 2 Orang Per Kamar",
        desc: "Kenyamanan dan ketenangan bersama tetap terjaga dengan tertib.",
      },
      {
        icon: "favorite_border",
        title: "Tidak Untuk Pasutri",
        desc: "Kos campur diperuntukkan bagi mahasiswa & karyawan lajang.",
      },
      {
        icon: "pets",
        title: "Dilarang Membawa Hewan",
        desc: "Demi kenyamanan dan higienitas lingkungan bersama.",
      },
      {
        icon: "electrical_services",
        title: "Tambah Biaya Alat Elektronik",
        desc: "Untuk dispenser kompresor atau pemanas elektrik daya besar.",
      },
      {
        icon: "savings",
        title: "Deposit: Rp250.000",
        desc: "Dikembalikan utuh di akhir masa sewa setelah check-out selesai.",
      },
    ],
    generalRules: [
      { icon: "access_time", title: "Pintu Gerbang Ditutup Pukul 23.00 WIB (Kunci Mandiri)" },
      { icon: "no_drinks", title: "Dilarang Keras Membawa Miras & Narkoba" },
      { icon: "volume_off", title: "Menjaga Ketenangan Selama Jam Istirahat" },
      { icon: "cleaning_services", title: "Menjaga Kebersihan Dapur & Area Bersama" },
    ],
    ownerStory: [
      "Kost Grha Gratia dirancang dengan konsep hunian modern ramah mahasiswa. Berada tepat di jalur strategis Banyumanik, hanya 4 menit berkendara menuju gerbang utama Universitas Diponegoro Tembalang dan Politeknik Negeri Semarang.",
      "Setiap kamar dirancang dengan sirkulasi silang dan jendela besar menghadap taman samping, memastikan sirkulasi angin sejuk khas perbukitan Semarang dan pencahayaan alami yang melimpah setiap pagi.",
    ],
    host: {
      name: "Sintia & Tim Gratia",
      role: "Pengelola Properti Mitra Open Tempeh",
      lastOnline: "Online 1 jam yang lalu",
      transactions: 1420,
      initial: "S",
      bio: "Aktif mengelola 3 properti residensial di Semarang sejak Agustus 2023 dengan ulasan kepuasan 98%.",
    },
    altRoom: {
      title: "Tipe B (Lantai 1 - Taman)",
      dimension: "3.5 x 3 m",
      remaining: "Sisa 1 Kamar",
      floor: "Lantai 1",
      tags: ["K. Mandi Dalam", "Kipas Angin", "Kasur Single", "Meja Kerja"],
      description:
        "Kamar lantai 1 dengan akses langsung ke teras taman belakang, udara sejuk tanpa pendingin udara.",
      discountText: "Hemat 100rb",
      originalPrice: "Rp1.450.000",
      price: "Rp1.350.000",
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80",
    },
    nearbyPOIs: [
      { name: "Gerbang Utama Undip Tembalang", distance: "850 m", icon: "school", highlight: true },
      { name: "Warteg & Pusat Kuliner Banyumanik", distance: "150 m", icon: "restaurant" },
      { name: "Minimarket Indomaret & Alfamart", distance: "250 m", icon: "store" },
      { name: "Masjid Al-Muhajirin", distance: "300 m", icon: "mosque" },
      { name: "RS Banyumanik", distance: "1.8 km", icon: "local_hospital" },
      { name: "Gerbang Tol Banyumanik", distance: "1.5 km", icon: "alt_route" },
    ],
    mapCoords: { top: "44%", left: "46%" },
  },
  {
    id: "kost-putri-tembalang-asri",
    name: "Kost Putri Tembalang Asri",
    location: "Tembalang, Semarang (5 Menit ke FSM Undip)",
    subdistrict: "Tembalang",
    city: "Kota Semarang",
    category: "Khusus Putri",
    catalogId: "CAT. ID #SMG-TBL-0924",
    archivalPlate: "ARCHIVAL PLATE #02 — RESIDENTIAL SANCTUARY",
    type: "Kamar Mandi Luar",
    price: 1200000,
    priceLabel: "Rp1.200.000",
    originalPrice: "Rp1.350.000",
    discountBadge: "Hemat 150rb",
    rating: 4.7,
    reviews: 32,
    views: 310,
    has3dTour: false,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    bathroomImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    communalImage:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description:
      "Hunian khusus mahasiswi yang aman, bersih, dan asri. Berada di jalan perumahan tenang bebas bising kendaraan, hanya 5 menit jalan kaki ke FSM Undip.",
    availabilityStatus: "Sisa 3 Kamar Tersedia",
    availabilityRibbon: {
      isWarning: false,
      text: "Tersedia 3 kamar di Lantai 1 & 2. Lingkungan khusus mahasiswi berpagar rapat dengan sistem kartu akses.",
      altLinkText: "Lihat Tipe Standar",
      altLinkId: "tipe-lain",
    },
    dimension: "3.5 x 3 Meter",
    electricity: "Termasuk Listrik Standar",
    water: "Termasuk Air Bersih Sumur Bor",
    capacity: "Maks. 1 Orang (Putri)",
    deposit: "Rp150.000",
    facilities: ["Kamar Mandi Luar", "WiFi", "Dapur Bersama"],
    roomFacilities: [
      { icon: "bed", name: "Kasur Busa Super Inoac" },
      { icon: "desk", name: "Meja Belajar Kayu Solid" },
      { icon: "chair", name: "Kursi Belajar Nyaman" },
      { icon: "shelves", name: "Lemari 2 Pintu & Kaca Rias" },
      { icon: "air", name: "Sirkulasi Udara Tropis" },
      { icon: "window", name: "Jendela Menghadap Taman Dalam" },
      { icon: "crop_portrait", name: "Cermin Rias Kamar" },
      { icon: "check_circle", name: "Sprei Ganti Rutin" },
    ],
    bathroomFacilities: [
      { icon: "bathtub", name: "K. Mandi Luar Bersih" },
      { icon: "wc", name: "Kloset Duduk Bersih" },
      { icon: "shower", name: "Shower & Kran Wudhu" },
      { icon: "cleaning_services", name: "Pembersihan Rutin Harian" },
    ],
    commonFacilities: [
      { icon: "wifi", name: "WiFi Fiber Optic 50Mbps" },
      { icon: "kitchen", name: "Dapur Bersama Lengkap & Kompor" },
      { icon: "local_drink", name: "Dispenser Air Mineral Gratis" },
      { icon: "dry_cleaning", name: "Area Cuci & Jemur Rooftop" },
      { icon: "lock", name: "Pintu Gerbang Smart Lock Kartu" },
      { icon: "videocam", name: "CCTV Area Publik 24 Jam" },
      { icon: "local_laundry_service", name: "Mesin Cuci Bersama" },
      { icon: "table_restaurant", name: "Ruang Tamu Khusus Tamu Luar" },
    ],
    parkingFacilities: [
      { icon: "two_wheeler", name: "Garasi Motor Tertutup Berpagar (16 Unit)" },
      { icon: "pedal_bike", name: "Parkir Sepeda Aman" },
    ],
    rules: [
      {
        icon: "female",
        title: "Khusus Mahasiswi & Karyawati",
        desc: "Lingkungan kondusif dan eksklusif wanita muslimah & mahasiswi.",
      },
      {
        icon: "no_accounts",
        title: "Tamu Pria Dilarang Masuk Kamar",
        desc: "Penerimaan tamu laki-laki hanya diperkenankan di ruang tamu depan.",
      },
      {
        icon: "access_time",
        title: "Jam Malam Pukul 22.00 WIB",
        desc: "Pagar terkunci otomatis, akses menggunakan kartu sensor pribadi.",
      },
      {
        icon: "smoke_free",
        title: "Dilarang Merokok",
        desc: "Kawasan bebas asap rokok di seluruh area kamar dan bersama.",
      },
      {
        icon: "child_friendly",
        title: "Tidak Boleh Bawa Anak",
        desc: "Menjaga ketenangan aktivitas belajar dan istirahat mahasiswi.",
      },
      {
        icon: "savings",
        title: "Deposit: Rp150.000",
        desc: "Jaminan kunci & fasilitas, dikembalikan penuh saat check-out.",
      },
    ],
    generalRules: [
      { icon: "access_time", title: "Pintu Masuk Otomatis Terkunci Jam 22.00 WIB" },
      { icon: "volume_off", title: "Wajib Menjaga Ketenangan Jam Belajar Mandiri" },
      { icon: "clean_hands", title: "Merapikan Perlengkapan Memasak di Dapur" },
      { icon: "shield", title: "Identitas Tamu Luar Wajib Dilaporkan ke Pengurus" },
    ],
    ownerStory: [
      "Kost Putri Tembalang Asri didirikan dengan komitmen memberikan rumah kedua yang aman, bersih, dan menenangkan bagi mahasiswi yang menempuh pendidikan di Semarang.",
      "Lokasinya berada di lingkungan perumahan warga yang ramah dan dekat dengan deretan warung makan higienis serta tempat fotokopi/print mahasiswa, hanya berjarak 5 menit jalan kaki dari gedung perkuliahan FSM dan FT Undip.",
    ],
    host: {
      name: "Ibu Hj. Ratna Dewi",
      role: "Pemilik Langsung",
      lastOnline: "Online 3 jam yang lalu",
      transactions: 540,
      initial: "R",
      bio: "Tinggal di sebelah kos, siap membantu kebutuhan penghuni kos putri dengan keramahan kekeluargaan.",
    },
    altRoom: {
      title: "Tipe Standard (Lantai 2)",
      dimension: "3 x 3 m",
      remaining: "Sisa 2 Kamar",
      floor: "Lantai 2",
      tags: ["K. Mandi Luar", "Kasur Single", "Meja Belajar", "WiFi Cepat"],
      description:
        "Kamar ekonomis di lantai 2 dengan pencahayaan jendela atap dan hembusan angin perbukitan Tembalang.",
      discountText: "Hemat 150rb",
      originalPrice: "Rp1.200.000",
      price: "Rp1.050.000",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
    },
    nearbyPOIs: [
      { name: "Fakultas Sains & Matematika Undip", distance: "400 m", icon: "school", highlight: true },
      { name: "Fakultas Teknik Undip", distance: "650 m", icon: "school" },
      { name: "Perpustakaan Pusat Undip", distance: "700 m", icon: "menu_book" },
      { name: "Warung Makan Mbak Anik & Sari Rasa", distance: "120 m", icon: "restaurant" },
      { name: "Alfamidi Tembalang Raya", distance: "350 m", icon: "store" },
      { name: "RS Nasional Diponegoro (RSND)", distance: "1.2 km", icon: "local_hospital" },
    ],
    mapCoords: { top: "33%", left: "34%" },
  },
  {
    id: "kost-putra-banyu-biru",
    name: "Kost Putra Banyu Biru",
    location: "Banyumanik, Semarang",
    subdistrict: "Banyumanik",
    city: "Kota Semarang",
    category: "Khusus Putra",
    catalogId: "CAT. ID #SMG-BNY-1024",
    archivalPlate: "ARCHIVAL PLATE #03 — COMPACT RETREAT",
    type: "Ekonomis",
    price: 850000,
    priceLabel: "Rp850.000",
    originalPrice: "Rp950.000",
    discountBadge: "Diskon 100rb",
    rating: 4.5,
    reviews: 19,
    views: 240,
    has3dTour: true,
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    bathroomImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    communalImage:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description:
      "Pilihan kos hemat, bersih, dan bersahabat bagi mahasiswa di area Banyumanik. Dilengkapi area parkir motor yang sangat luas berkanopi teduh dan lingkungan belajar bebas banjir.",
    availabilityStatus: "Sisa 1 Kamar (Siap Huni)",
    availabilityRibbon: {
      isWarning: true,
      text: "Sisa 1 kamar terakhir di harga promo Rp850.000/bulan! Cocok untuk mahasiswa perantauan.",
      altLinkText: "Lihat Tipe Paviliun",
      altLinkId: "tipe-lain",
    },
    dimension: "3 x 3 Meter",
    electricity: "Termasuk Listrik Standar",
    water: "Termasuk PDAM Bersih 24 Jam",
    capacity: "Maks. 1 Orang (Putra)",
    deposit: "Rp100.000",
    facilities: ["Kamar Mandi Luar", "Kasur", "Parkir Motor Luas"],
    roomFacilities: [
      { icon: "bed", name: "Kasur Busa Single Tebal" },
      { icon: "desk", name: "Meja Belajar Minimalis" },
      { icon: "chair", name: "Kursi Kayu Santai" },
      { icon: "shelves", name: "Lemari Pakaian Single" },
      { icon: "mode_fan", name: "Kipas Angin Dinding" },
      { icon: "air", name: "Ventilasi Udara Langsung" },
      { icon: "power", name: "Colokan Listrik Ganda" },
    ],
    bathroomFacilities: [
      { icon: "bathtub", name: "K. Mandi Luar Terawat" },
      { icon: "wc", name: "Kloset Jongkok Bersih" },
      { icon: "shower", name: "Shower & Bak Mandi" },
      { icon: "water_drop", name: "Air Bersih Mengalir Lancar" },
    ],
    commonFacilities: [
      { icon: "wifi", name: "WiFi 50Mbps Bebas Kuota" },
      { icon: "dry_cleaning", name: "Area Jemuran Terbuka Luas" },
      { icon: "countertops", name: "Dapur Bersama Sederhana (Kompor Gas)" },
      { icon: "table_restaurant", name: "Ruang Tamu Terbuka" },
      { icon: "person", name: "Penjaga Kos Standby" },
      { icon: "cleaning_services", name: "Tempat Sampah Terpilah" },
    ],
    parkingFacilities: [
      { icon: "two_wheeler", name: "Parkir Motor Sangat Luas (Muat 25 Motor)" },
      { icon: "roofing", name: "Atap Kanopi Rindang Bebas Panas/Hujan" },
      { icon: "lock", name: "Gerbang Gembok Ganda Malam Hari" },
    ],
    rules: [
      {
        icon: "male",
        title: "Khusus Mahasiswa & Karyawan Pria",
        desc: "Kos khusus putra, suasana tertib dan saling menghormati.",
      },
      {
        icon: "person_add",
        title: "Tamu Menginap Lapor Penjaga",
        desc: "Maksimal 2 malam per bulan demi kenyamanan penghuni lain.",
      },
      {
        icon: "access_time",
        title: "Jam Malam Bertanggung Jawab",
        desc: "Gerbang dikunci jam 23.30 WIB, penghuni memegang kunci duplikat gerbang.",
      },
      {
        icon: "volume_off",
        title: "Menjaga Ketenangan Malam",
        desc: "Dilarang bersuara keras atau memutar musik kencang setelah jam 22.00.",
      },
      {
        icon: "savings",
        title: "Deposit: Rp100.000",
        desc: "Deposit awal ringan, dikembalikan utuh pada saat akhir sewa.",
      },
    ],
    generalRules: [
      { icon: "access_time", title: "Kunci Gerbang Mandiri Setelah Jam 23.30 WIB" },
      { icon: "no_drinks", title: "Dilarang Miras, Judi, dan Narkoba" },
      { icon: "cleaning_services", title: "Wajib Menjaga Kebersihan Kamar Mandi Bersama" },
      { icon: "two_wheeler", title: "Kunci Stang Sepeda Motor Saat Parkir" },
    ],
    ownerStory: [
      "Kost Putra Banyu Biru dibangun dengan orientasi hunian fungsional dan ekonomis bagi rekan-rekan mahasiswa rantau dan pekerja muda yang menginginkan tempat tinggal ramah kantong di Semarang.",
      "Akses jalan sangat mudah, berjarak 300 meter dari halte BRT Trans Semarang koridor Banyumanik serta puluhan warung makan murah meriah 24 jam dan minimarket di sekitarnya.",
    ],
    host: {
      name: "Pak Joko Susilo",
      role: "Pemilik Kos Langsung",
      lastOnline: "Online 4 jam yang lalu",
      transactions: 380,
      initial: "J",
      bio: "Pemilik kos ramah, tinggal di dekat lokasi dan siap membantu perawatan fasilitas kamar kapan saja.",
    },
    altRoom: {
      title: "Tipe Paviliun (K. Mandi Dalam)",
      dimension: "4 x 3.5 m",
      remaining: "Sisa 1 Kamar",
      floor: "Lantai 1 Belakang",
      tags: ["K. Mandi Dalam", "Kloset Duduk", "Kasur Single", "Teras Pribadi"],
      description:
        "Unit paviliun terpisah dengan kamar mandi di dalam dan teras santai menghadap pepohonan.",
      discountText: "Promo Unit",
      originalPrice: "Rp1.200.000",
      price: "Rp1.100.000",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
    },
    nearbyPOIs: [
      { name: "Halte BRT Trans Semarang Banyumanik", distance: "300 m", icon: "directions_bus", highlight: true },
      { name: "Pasar Tradisional Banyumanik", distance: "500 m", icon: "storefront" },
      { name: "Warung Makan Murah Mbak Yayuk", distance: "80 m", icon: "restaurant" },
      { name: "Minimarket Indomaret & ATM BCA", distance: "200 m", icon: "store" },
      { name: "Poltekkes Kemenkes Semarang", distance: "1.4 km", icon: "school" },
      { name: "Kampus Undip Tembalang", distance: "3.2 km (10 mnt)", icon: "school" },
    ],
    mapCoords: { top: "60%", left: "55%" },
  },
];
