// Tipe konten yang dipakai di lebih dari satu file.

/** Foto dengan teks alternatif (path relatif dari public/). */
export type Photo = {
  src: string;
  alt: string;
};

/** Foto slideshow hero. */
export type HeroPhoto = Photo & {
  id: string;
};

/** Kategori menu. Tetap (bukan data dashboard); daftar filternya di lib/menu.ts. */
export type MenuCategory = "Kopi" | "Non-Kopi" | "Makanan";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price?: number; // kosongkan bila harga belum ada; harga tidak ditampilkan
  image: Photo;
};

/** Jenis kabar. Tetap (bukan data dashboard); labelnya di lib/news.ts. */
export type NewsType = "berita" | "artikel";

/** Kategori berita. Data, jadi admin bisa menambah kategori baru. */
export type NewsCategory = {
  id: string;
  slug: string;
  label: string;
};

export type NewsItem = {
  id: string;
  type: NewsType;
  title: string;
  category: string; // NewsCategory.slug
  date: string; // "YYYY-MM-DD"
  excerpt: string; // ringkasan di kartu (dipotong 2 baris)
  body: string[]; // teks lengkap, satu string per paragraf
  image: Photo;
};

/** Satu baris jam buka. Kosongkan open/close bila hari itu libur. */
export type HoursRow = {
  day: string;
  days: number[]; // 0 = Minggu … 6 = Sabtu
  open?: string; // "HH:MM" WIB
  close?: string;
};
