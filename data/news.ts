import { photo } from "@/data/heroPhotos";

export type NewsType = "berita" | "artikel";

export type NewsItem = {
  id: string;
  type: NewsType;
  title: string;
  category: "event" | "promo" | "info" | "tips" | "cerita";
  date: string; // ISO
  excerpt: string; // ringkasan di kartu (dipotong 2 baris)
  body: string[]; // teks lengkap, satu string per paragraf
  image: string;
};

// Pilihan Berita / Artikel di panel.
export const newsTypes: { key: NewsType; title: string }[] = [
  { key: "berita", title: "Berita" },
  { key: "artikel", title: "Artikel" },
];

// Contoh data — ganti dengan berita dan artikel terbaru.
export const news: NewsItem[] = [
  {
    id: "akustik-jumat",
    type: "berita",
    title: "Live Akustik Jumat Malam",
    category: "event",
    date: "2026-10-09",
    excerpt:
      "Tutup minggu dengan musik akustik dari musisi kampus. Mulai pukul 19.00, gratis untuk semua pengunjung. Datang lebih awal untuk dapat tempat favorit.",
    body: [
      "Setiap Jumat malam, UB Coffee menghadirkan live akustik dari musisi kampus Universitas Brawijaya. Lagu-lagu santai dibawakan mulai pukul 19.00 hingga 21.30 WIB.",
      "Acara ini gratis untuk semua pengunjung tanpa minimum pemesanan. Tempat duduk terbatas dan tidak bisa dipesan sebelumnya, jadi datang lebih awal untuk mendapat tempat favorit.",
      "Musisi kampus yang ingin tampil bisa menghubungi admin UB Coffee lewat WhatsApp atau Instagram.",
    ],
    image: photo("DSC01881"),
  },
  {
    id: "promo-civitas",
    type: "berita",
    title: "Diskon 15% Civitas UB",
    category: "promo",
    date: "2026-10-01",
    excerpt: "Tunjukkan kartu identitas UB untuk potongan 15% semua minuman, Senin – Kamis.",
    body: [
      "Mahasiswa, dosen, dan tenaga kependidikan Universitas Brawijaya mendapat potongan 15% untuk semua minuman di UB Coffee.",
      "Promo berlaku Senin sampai Kamis selama jam buka. Tunjukkan kartu identitas UB (KTM atau kartu pegawai) saat memesan di kasir.",
      "Promo tidak bisa digabung dengan promo lain dan tidak berlaku untuk pemesanan paket meeting.",
    ],
    image: photo("Iced_UB_Coffee_11"),
  },
  {
    id: "kelas-seduh",
    type: "berita",
    title: "Kelas Seduh Manual",
    category: "event",
    date: "2026-10-18",
    excerpt: "Belajar dasar V60 bersama barista UB Coffee. Kuota 12 orang.",
    body: [
      "Ikuti kelas seduh manual bersama barista UB Coffee. Peserta belajar dasar menyeduh kopi dengan V60, mulai dari memilih biji, menggiling, hingga mengatur rasio kopi dan air.",
      "Kelas dibatasi 12 orang agar setiap peserta bisa praktik langsung. Peralatan dan biji kopi sudah disediakan, dan peserta boleh membawa pulang hasil seduhannya.",
      "Pendaftaran dibuka melalui WhatsApp admin UB Coffee hingga kuota terpenuhi.",
    ],
    image: photo("DSCF0523"),
  },
  {
    id: "jam-libur",
    type: "berita",
    title: "Jam Buka Libur Nasional",
    category: "info",
    date: "2026-09-25",
    excerpt: "Saat libur nasional, UB Coffee buka pukul 12.00 – 20.00.",
    body: [
      "Pada hari libur nasional, UB Coffee tetap buka dengan jam operasional khusus, yaitu pukul 12.00 – 20.00 WIB.",
      "Reservasi ruang meeting pada hari libur tetap bisa dilakukan sesuai jam buka tersebut. Pantau Instagram UB Coffee untuk informasi perubahan jam buka berikutnya.",
    ],
    image: photo("DSC01991"),
  },
  {
    id: "arabika-robusta",
    type: "artikel",
    title: "Mengenal Arabika dan Robusta",
    category: "tips",
    date: "2026-10-05",
    excerpt:
      "Dua jenis biji kopi paling populer dengan karakter rasa yang berbeda. Kenali bedanya sebelum memesan kopi favoritmu.",
    body: [
      "Arabika dan robusta adalah dua jenis biji kopi yang paling banyak dinikmati. Arabika umumnya tumbuh di dataran tinggi dan punya rasa lebih kompleks, dengan keasaman yang segar serta aroma buah atau bunga.",
      "Robusta tumbuh di dataran yang lebih rendah, rasanya lebih pahit dan tebal, dengan kandungan kafein hampir dua kali lipat arabika. Karena itu robusta sering dipakai untuk espresso dan kopi susu.",
      "Di UB Coffee, Anda bisa bertanya ke barista biji mana yang dipakai di setiap menu dan meminta rekomendasi sesuai selera.",
    ],
    image: photo("DFTA0071"),
  },
  {
    id: "seduh-v60-rumah",
    type: "artikel",
    title: "Menyeduh V60 di Rumah",
    category: "tips",
    date: "2026-09-20",
    excerpt: "Rasio kopi, suhu air, dan waktu seduh: panduan singkat dari barista UB Coffee.",
    body: [
      "Menyeduh V60 di rumah tidak sulit. Mulailah dengan rasio 1:15, misalnya 15 gram kopi untuk 225 ml air, dengan gilingan sedang seperti gula pasir.",
      "Gunakan air bersuhu 90 – 94°C. Tuang sedikit air untuk blooming selama 30 detik, lalu tuang sisanya perlahan dengan gerakan memutar hingga total waktu seduh sekitar 2,5 – 3 menit.",
      "Jika rasa terlalu pahit, coba gilingan lebih kasar; jika terlalu asam, coba gilingan lebih halus. Catat setiap percobaan agar mudah menemukan rasa favorit.",
    ],
    image: photo("DFTA0081"),
  },
  {
    id: "cerita-gazebo",
    type: "artikel",
    title: "Cerita di Balik Gazebo Corner",
    category: "cerita",
    date: "2026-09-12",
    excerpt:
      "Dari Gazebo Raden Wijaya, sudut ngopi baru untuk civitas Universitas Brawijaya di tengah kampus.",
    body: [
      "Gazebo Corner by UB Coffee hadir di Gazebo Raden Wijaya, di tengah kampus Universitas Brawijaya. Sudut ini dibuat agar civitas UB bisa menikmati kopi tanpa harus keluar kampus.",
      "Dengan suasana terbuka dan rindang, Gazebo Corner menjadi tempat favorit untuk istirahat di sela kuliah, diskusi kelompok, atau sekadar menunggu jadwal berikutnya.",
      "Gazebo Corner buka Senin sampai Sabtu pukul 08.00 – 18.00 WIB dengan menu pilihan dari UB Coffee.",
    ],
    image: photo("DFTA0029"),
  },
];

export const newsLabel: Record<NewsItem["category"], string> = {
  event: "Event",
  promo: "Promo",
  info: "Info",
  tips: "Tips Kopi",
  cerita: "Cerita",
};

/** Item satu jenis, terbaru di depan; tanggal ISO bisa dibandingkan sebagai teks. */
export function newsByType(type: NewsType) {
  return news.filter((n) => n.type === type).sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}
