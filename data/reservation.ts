import { photo } from "@/data/paths";
import type {
  BookableRoom,
  Booking,
  MeetingPackage,
  ReservationText,
  Room,
  RoomPrice,
} from "@/types/content";

// Paragraf teks polos di panel Reservasi.
export const reservationText: ReservationText = {
  intro:
    "Dua ruang meeting untuk rapat, pelatihan, dan workshop — lengkap dengan smart TV, air cooler, WiFi, dan air mineral gratis.",
  rentNote: "Sudah termasuk smart TV, air cooler, WiFi, dan air mineral 500 ml untuk 5 orang.",
  packagesNote:
    "Sudah termasuk sewa ruangan dan air mineral. Pesan paket maksimal H-1 · snack tradisional bisa disesuaikan.",
  cta: "Cek jadwal kosong dan kirim permintaan — kami konfirmasi lewat WhatsApp.",
};

export const roomPrices: RoomPrice[] = [
  { id: "price-internal", label: "Internal UB", price: "IDR 100K" },
  { id: "price-eksternal", label: "Eksternal", price: "IDR 150K" },
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
    id: "arjuna",
    name: "Arjuna Meeting Room",
    capacity: 15,
    desc: "Ruang tertutup dengan smart TV dan meja panjang. Tenang dan fokus.",
    suitable: "Rapat kerja, pelatihan, presentasi, sidang kecil",
    facilities: roomFacilities,
    photos: [
      { id: "arjuna-dfta0048", src: photo("DFTA0048"), alt: "Ruang Arjuna dengan smart TV" },
      {
        id: "arjuna-dfta0081",
        src: photo("DFTA0081"),
        alt: "Meja coffee break dan sofa di ruang Arjuna",
      },
      { id: "arjuna-dfta0069", src: photo("DFTA0069"), alt: "Sajian coffee break untuk meeting" },
    ],
  },
  {
    id: "semeru",
    name: "Semeru Meeting Room",
    capacity: 15,
    desc: "Ruang berdinding kaca yang menghadap taman, dengan cahaya alami yang membuat suasana lebih santai.",
    suitable: "Diskusi kelompok, workshop kecil, bimbingan, interview",
    facilities: roomFacilities,
    photos: [
      { id: "semeru-dfta0045", src: photo("DFTA0045"), alt: "Ruang kaca Semeru" },
      { id: "semeru-dfta0041", src: photo("DFTA0041"), alt: "Ruang Semeru menghadap taman" },
    ],
  },
];

// Hanya ada di form reservasi, tidak ditampilkan sebagai kartu.
// Kapasitas bebas, jadi tidak ditulis.
const openSpace: BookableRoom = { id: "open-space", name: "Open Space" };

export const bookableRooms: BookableRoom[] = [...rooms, openSpace];

// Contoh jadwal terisi. Nanti diganti data dari dashboard reservasi.
export const bookings: Booking[] = [
  { id: "bk-001", roomId: "arjuna", date: "2026-10-15", start: "09:00", end: "12:00" },
  { id: "bk-002", roomId: "arjuna", date: "2026-10-16", start: "13:00", end: "16:00" },
  { id: "bk-003", roomId: "arjuna", date: "2026-10-19", start: "08:00", end: "17:00" },
  { id: "bk-004", roomId: "semeru", date: "2026-10-15", start: "10:00", end: "12:00" },
  { id: "bk-005", roomId: "semeru", date: "2026-10-17", start: "09:00", end: "11:00" },
  { id: "bk-006", roomId: "open-space", date: "2026-10-14", start: "18:00", end: "21:00" },
  { id: "bk-007", roomId: "open-space", date: "2026-10-18", start: "15:00", end: "20:00" },
];

export const meetingPackages: MeetingPackage[] = [
  {
    id: "pkg-coffee-break",
    name: "Mini Coffee Break Only",
    price: "IDR 250K",
    extra: "IDR 25K",
  },
  {
    id: "pkg-coffee-break-2-snack",
    name: "Mini Coffee Break & 2 Snack",
    price: "IDR 400K",
    extra: "IDR 40K",
  },
  {
    id: "pkg-coffee-break-3-snack",
    name: "Mini Coffee Break & 3 Snack",
    price: "IDR 450K",
    extra: "IDR 45K",
  },
];
