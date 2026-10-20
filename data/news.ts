import { photo } from "@/data/paths";
import type { NewsCategory, NewsItem } from "@/types/content";

// Kategori berita; `slug` dipakai di NewsItem.categories, `label` tampil di tag artikel dan filter.
export const newsCategories: NewsCategory[] = [
  { id: "cat-event", slug: "event", label: "Event" },
  { id: "cat-kolaborasi", slug: "kolaborasi", label: "Kolaborasi" },
  { id: "cat-tips", slug: "tips", label: "Tips Kopi" },
  { id: "cat-cerita", slug: "cerita", label: "Cerita" },
];

// Contoh data — ganti dengan berita dan artikel terbaru.
export const news: NewsItem[] = [
  // TODO: ganti tanggal, foto, dan isi berita kolaborasi dengan data aslinya.
  {
    id: "akar-jiwa-yoga",
    type: "berita",
    title: "UB Coffee x Akar Jiwa Yoga",
    categories: ["event"],
    date: "2026-10-12",
    excerpt: "Tarik napas, lepaskan penat. Sunset yoga bersama Akar Jiwa Yoga di CFD Bundaran UB.",
    body: [
      "Tarik napas, lepaskan penat. Sunset di CFD Bundaran UB terasa lebih menenangkan bersama Akar Jiwa Yoga.",
      "Di tengah hiruk pikuk menuju akhir pekan, kita belajar berhenti sejenak, hadir sepenuhnya, dan kembali terhubung dengan diri sendiri.",
      "Sampai bertemu di sesi berikutnya. Namaste.",
    ],
    image: { src: photo("akar-jiwa-yoga"), alt: "UB Coffee x Akar Jiwa Yoga" },
  },
  {
    id: "morning-run-ms-glow",
    type: "berita",
    title: "Morning Run with MS Glow",
    categories: ["event"],
    date: "2026-10-11",
    excerpt:
      "Running for Passion: fun run kolaborasi MS Glow Men dan UB Coffee yang penuh energi dan momen seru.",
    body: [
      "Running for Passion! Minggu, 11 Oktober 2026, UB Coffee berkolaborasi dengan MS Glow Men dan Free Runners Malang mengadakan fun run bersama, lari pagi yang penuh good vibes dan energi positif.",
      "Terima kasih untuk semua yang sudah ikut berlari dan membuat setiap langkah berarti. Momen seru bersama kalian jadi kenangan yang tak terlupakan.",
      "Sampai jumpa di run berikutnya! Pantau Instagram UB Coffee untuk info kegiatan selanjutnya.",
    ],
    image: { src: photo("ms-glow-fun-run"), alt: "Morning Run with MS Glow" },
  },
  {
    id: "colab-sweetisfied",
    type: "berita",
    title: "Colab UB Coffee x Sweetisfied",
    categories: ["kolaborasi"],
    date: "2026-09-28",
    excerpt:
      "Sweet treats dari Sweetisfied kini hadir di UB Coffee, siap bikin jeda belajarmu jadi lebih manis.",
    body: [
      "Kabar manis untuk civitas Brawijaya: sweet treats favorit dari Sweetisfied kini bisa kamu temukan di UB Coffee, siap bikin jeda belajarmu jadi lebih manis.",
      "Selain di UB Coffee, Sweetisfied juga hadir di Brewijaya Coffee untuk menemani sore harimu dengan camilan manis yang menenangkan.",
      "Di tengah hari-hari produktif di kampus, kamu selalu pantas mendapat jeda yang hangat. Mampir ke UB Coffee dan nikmati sweet treats Sweetisfied bersama kopi favoritmu.",
    ],
    image: { src: photo("sweetisfied"), alt: "Colab UB Coffee x Sweetisfied" },
  },
  {
    id: "kolaborasi-rich",
    type: "berita",
    title: "UB Coffee Berkolaborasi dengan RICH",
    categories: ["kolaborasi"],
    date: "2026-09-21",
    excerpt:
      "UB Coffee berkolaborasi dengan RICH menghadirkan menu baru yang wajib banget kamu cobain.",
    body: [
      "Kali ini, UB Coffee berkolaborasi dengan RICH menghadirkan menu baru yang wajib banget kamu cobain. Penasaran gimana review dan rasanya?",
      "Yuk, intip review-nya sampai akhir dan cari tahu menu mana yang bakal jadi favorit kamu!",
      "Jangan lupa cobain menu baru UB Coffee x RICH!",
    ],
    image: { src: photo("ub-coffee-x-rich"), alt: "UB Coffee Berkolaborasi dengan RICH" },
  },
  {
    id: "roti-cengly",
    type: "berita",
    title: "UB Coffee x Roti Cengly",
    categories: ["kolaborasi"],
    date: "2026-09-14",
    excerpt: "Kopi UB Coffee kini bisa dinikmati bersama roti dari Roti Cengly.",
    body: [
      "UB Coffee berkolaborasi dengan Roti Cengly, menghadirkan roti yang cocok menemani secangkir kopi UB Coffee.",
      "Kolaborasi ini bisa dinikmati langsung di UB Coffee selama periode kolaborasi berlangsung.",
      "Ikuti Instagram UB Coffee dan Roti Cengly untuk informasi lengkapnya.",
    ],
    image: { src: photo("ub-coffee-x-roti-cengly"), alt: "UB Coffee x Roti Cengly" },
  },
  {
    id: "arabika-robusta",
    type: "artikel",
    title: "Mengenal Arabika dan Robusta",
    categories: ["tips"],
    date: "2026-10-05",
    excerpt:
      "Dua jenis biji kopi paling populer dengan karakter rasa yang berbeda. Kenali bedanya sebelum memesan kopi favoritmu.",
    body: [
      "Arabika dan robusta adalah dua jenis biji kopi yang paling banyak dinikmati. Arabika umumnya tumbuh di dataran tinggi dan punya rasa lebih kompleks, dengan keasaman yang segar serta aroma buah atau bunga.",
      "Robusta tumbuh di dataran yang lebih rendah, rasanya lebih pahit dan tebal, dengan kandungan kafein hampir dua kali lipat arabika. Karena itu robusta sering dipakai untuk espresso dan kopi susu.",
      "Di UB Coffee, Anda bisa bertanya ke barista biji mana yang dipakai di setiap menu dan meminta rekomendasi sesuai selera.",
    ],
    image: { src: photo("DFTA0071"), alt: "Mengenal Arabika dan Robusta" },
  },
  {
    id: "seduh-v60-rumah",
    type: "artikel",
    title: "Menyeduh V60 di Rumah",
    categories: ["tips"],
    date: "2026-09-20",
    excerpt: "Rasio kopi, suhu air, dan waktu seduh: panduan singkat dari barista UB Coffee.",
    body: [
      "Menyeduh V60 di rumah tidak sulit. Mulailah dengan rasio 1:15, misalnya 15 gram kopi untuk 225 ml air, dengan gilingan sedang seperti gula pasir.",
      "Gunakan air bersuhu 90 – 94°C. Tuang sedikit air untuk blooming selama 30 detik, lalu tuang sisanya perlahan dengan gerakan memutar hingga total waktu seduh sekitar 2,5 – 3 menit.",
      "Jika rasa terlalu pahit, coba gilingan lebih kasar; jika terlalu asam, coba gilingan lebih halus. Catat setiap percobaan agar mudah menemukan rasa favorit.",
    ],
    image: { src: photo("DFTA0081"), alt: "Menyeduh V60 di Rumah" },
  },
  {
    id: "cerita-gazebo",
    type: "artikel",
    title: "Cerita di Balik Gazebo Corner",
    categories: ["cerita"],
    date: "2026-09-12",
    excerpt:
      "Dari Gazebo Raden Wijaya, sudut ngopi baru untuk civitas Universitas Brawijaya di tengah kampus.",
    body: [
      "Gazebo Corner by UB Coffee hadir di Gazebo Raden Wijaya, di tengah kampus Universitas Brawijaya. Sudut ini dibuat agar civitas UB bisa menikmati kopi tanpa harus keluar kampus.",
      "Dengan suasana terbuka dan rindang, Gazebo Corner menjadi tempat favorit untuk istirahat di sela kuliah, diskusi kelompok, atau sekadar menunggu jadwal berikutnya.",
      "Gazebo Corner buka Senin sampai Sabtu pukul 08.00 – 18.00 WIB dengan menu pilihan dari UB Coffee.",
    ],
    image: { src: photo("DFTA0029"), alt: "Cerita di Balik Gazebo Corner" },
  },
];
