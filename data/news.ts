import { photo } from "@/data/heroPhotos";

export type NewsItem = {
  id: string;
  title: string;
  category: "event" | "promo" | "info";
  date: string; // ISO
  excerpt: string;
  image: string;
  featured?: boolean;
};

// Contoh data — ganti dengan event dan promo terbaru.
export const news: NewsItem[] = [
  {
    id: "akustik-jumat",
    title: "Live Akustik Jumat Malam",
    category: "event",
    date: "2026-10-09",
    excerpt:
      "Tutup minggu dengan musik akustik dari musisi kampus. Mulai pukul 19.00, gratis untuk semua pengunjung. Datang lebih awal untuk dapat tempat favorit.",
    image: photo("DSC01881"),
    featured: true,
  },
  {
    id: "promo-civitas",
    title: "Diskon 15% Civitas UB",
    category: "promo",
    date: "2026-10-01",
    excerpt: "Tunjukkan kartu identitas UB untuk potongan 15% semua minuman, Senin – Kamis.",
    image: photo("Iced_UB_Coffee_11"),
  },
  {
    id: "kelas-seduh",
    title: "Kelas Seduh Manual",
    category: "event",
    date: "2026-10-18",
    excerpt: "Belajar dasar V60 bersama barista UB Coffee. Kuota 12 orang.",
    image: photo("DSCF0523"),
  },
  {
    id: "jam-libur",
    title: "Jam Buka Libur Nasional",
    category: "info",
    date: "2026-09-25",
    excerpt: "Saat libur nasional, UB Coffee buka pukul 12.00 – 20.00.",
    image: photo("DSC01991"),
  },
];

export const newsLabel: Record<NewsItem["category"], string> = {
  event: "Event",
  promo: "Promo",
  info: "Info",
};

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}
