// Tipe konten yang dipakai di lebih dari satu file.

/** Foto dengan teks alternatif (path relatif dari public/). */
export type Photo = {
  src: string;
  alt: string;
};

/** Foto yang bisa diedit satu per satu oleh admin. */
export type PhotoWithId = Photo & {
  id: string;
};

/** Foto slideshow hero. */
export type HeroPhoto = PhotoWithId;

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

/** Ruangan yang bisa dipilih di form reservasi. */
export type BookableRoom = {
  id: string;
  name: string;
  capacity?: number; // orang, kosong = bebas
};

/** Ruangan yang juga tampil sebagai kartu di panel Reservasi. */
export type Room = BookableRoom & {
  capacity: number;
  desc: string;
  suitable: string; // "Cocok untuk"
  facilities: string[];
  photos: PhotoWithId[];
};

/** Jadwal yang sudah dipesan. Jam akhir eksklusif ("12:00" = slot 11.00–12.00 terakhir). */
export type Booking = {
  id: string;
  roomId: BookableRoom["id"];
  date: string; // "YYYY-MM-DD"
  start: string; // "HH:MM" WIB
  end: string;
};

export type RoomPrice = {
  id: string;
  label: string;
  price: string;
};

export type MeetingPackage = {
  id: string;
  name: string;
  price: string; // per 10 orang
  extra: string; // tambahan per orang
};

/** Paragraf teks polos di panel Reservasi. */
export type ReservationText = {
  intro: string;
  rentNote: string; // catatan harga sewa ruangan
  packagesNote: string; // catatan harga paket
  cta: string;
};

/** Semua data panel Reservasi, dirangkai di app/page.tsx. */
export type ReservationContent = {
  rooms: Room[];
  bookableRooms: BookableRoom[];
  bookings: Booking[];
  roomPrices: RoomPrice[];
  meetingPackages: MeetingPackage[];
  text: ReservationText;
  hours: HoursRow[]; // jam buka yang membatasi slot (lokasi utama)
};

/** Satu baris jam buka. Kosongkan open/close bila hari itu libur. */
export type HoursRow = {
  id: string;
  day: string;
  days: number[]; // 0 = Minggu … 6 = Sabtu
  open?: string; // "HH:MM" WIB
  close?: string;
};

/** Lokasi outlet, dengan jam buka masing-masing. */
export type Location = {
  id: string;
  name: string;
  address: string;
  addressShort: string;
  landmark: string;
  mapsUrl: string;
  mapsEmbed: string;
  directionsUrl: string;
  hours: HoursRow[];
};

/** Info merek dan kontak. Alamat dan jam buka diambil dari lokasi `mainLocationId`. */
export type SiteInfo = {
  name: string;
  tagline: string;
  company: string;
  companyUrl: string;
  menuPdf: string; // PDF menu lengkap
  whatsapp: string; // nomor untuk wa.me, tanpa "+"
  whatsappDisplay: string;
  instagram: string;
  instagramUrl: string;
  mainLocationId: Location["id"]; // lokasi untuk hero, footer, dan slot reservasi
};
