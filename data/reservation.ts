import { photo } from "@/data/heroPhotos";
import type { Photo } from "@/types/content";

export type RoomPrice = {
  label: string;
  price: string;
};

/** Ruangan yang bisa dipilih di form reservasi. */
export type BookableRoom = {
  key: string;
  name: string;
  capacity?: number; // orang, kosong = bebas
};

/** Ruangan yang juga tampil sebagai kartu di panel Reservasi. */
export type Room = BookableRoom & {
  capacity: number;
  desc: string;
  suitable: string; // "Cocok untuk"
  facilities: string[];
  photos: Photo[];
};

/** Jadwal yang sudah dipesan. Jam akhir eksklusif ("12:00" = slot 11.00–12.00 terakhir). */
export type Booking = {
  room: BookableRoom["key"];
  date: string; // "YYYY-MM-DD"
  start: string; // "HH:MM" WIB
  end: string;
};

export type MeetingPackage = {
  name: string;
  price: string; // per 10 orang
  extra: string; // tambahan per orang
};

// Paragraf teks polos di panel Reservasi.
export const reservationText = {
  intro:
    "Dua ruang meeting untuk rapat, pelatihan, dan workshop — lengkap dengan smart TV, air cooler, WiFi, dan air mineral gratis.",
  rentNote: "Sudah termasuk smart TV, air cooler, WiFi, dan air mineral 500 ml untuk 5 orang.",
  packagesNote:
    "Sudah termasuk sewa ruangan dan air mineral. Pesan paket maksimal H-1 · snack tradisional bisa disesuaikan.",
  cta: "Cek jadwal kosong dan kirim permintaan — kami konfirmasi lewat WhatsApp.",
};

export const roomPrices: RoomPrice[] = [
  { label: "Internal UB", price: "IDR 100K" },
  { label: "Eksternal", price: "IDR 150K" },
];

// Fasilitas sama untuk semua meeting room.
const roomFacilities = [
  "Smart TV",
  "Air cooler",
  "Meja & kursi",
  "Colokan listrik",
  "Free WiFi",
  "Air mineral 500 ml untuk 5 orang",
];

// TODO: sesuaikan foto Arjuna & Semeru dengan ruangan aslinya.
export const rooms: Room[] = [
  {
    key: "arjuna",
    name: "Arjuna Meeting Room",
    capacity: 15,
    desc: "Ruang tertutup dengan smart TV dan meja panjang. Tenang dan fokus.",
    suitable: "Rapat kerja, pelatihan, presentasi, sidang kecil",
    facilities: roomFacilities,
    photos: [
      { src: photo("DFTA0048"), alt: "Ruang Arjuna dengan smart TV" },
      { src: photo("DFTA0081"), alt: "Meja coffee break dan sofa di ruang Arjuna" },
      { src: photo("DFTA0069"), alt: "Sajian coffee break untuk meeting" },
    ],
  },
  {
    key: "semeru",
    name: "Semeru Meeting Room",
    capacity: 15,
    desc: "Ruang berdinding kaca yang menghadap taman, dengan cahaya alami yang membuat suasana lebih santai.",
    suitable: "Diskusi kelompok, workshop kecil, bimbingan, interview",
    facilities: roomFacilities,
    photos: [
      { src: photo("DFTA0045"), alt: "Ruang kaca Semeru" },
      { src: photo("DFTA0041"), alt: "Ruang Semeru menghadap taman" },
    ],
  },
];

// Hanya ada di form reservasi, tidak ditampilkan sebagai kartu.
// Kapasitas bebas, jadi tidak ditulis.
const openSpace: BookableRoom = { key: "open-space", name: "Open Space" };

export const bookableRooms: BookableRoom[] = [...rooms, openSpace];

// Contoh jadwal terisi. Nanti diganti data dari dashboard reservasi.
export const bookings: Booking[] = [
  { room: "arjuna", date: "2026-10-15", start: "09:00", end: "12:00" },
  { room: "arjuna", date: "2026-10-16", start: "13:00", end: "16:00" },
  { room: "arjuna", date: "2026-10-19", start: "08:00", end: "17:00" },
  { room: "semeru", date: "2026-10-15", start: "10:00", end: "12:00" },
  { room: "semeru", date: "2026-10-17", start: "09:00", end: "11:00" },
  { room: "open-space", date: "2026-10-14", start: "18:00", end: "21:00" },
  { room: "open-space", date: "2026-10-18", start: "15:00", end: "20:00" },
];

export const meetingPackages: MeetingPackage[] = [
  { name: "Mini Coffee Break Only", price: "IDR 250K", extra: "IDR 25K" },
  { name: "Mini Coffee Break & 2 Snack", price: "IDR 400K", extra: "IDR 40K" },
  { name: "Mini Coffee Break & 3 Snack", price: "IDR 450K", extra: "IDR 45K" },
];
