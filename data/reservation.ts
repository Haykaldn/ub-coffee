import { photo } from "@/data/heroPhotos";
import type { Photo } from "@/types/content";

export type RoomPrice = {
  label: string;
  price: string;
};

export type MeetingPackage = {
  name: string;
  desc: string;
  price: string; // per 10 orang
  extra: string; // tambahan per orang
};

// Paragraf teks polos di panel Reservasi. Paragraf yang memakai <strong> tetap di komponen.
export const reservationText = {
  intro:
    "Cari ruang meeting yang nyaman, fasilitas lengkap, dan suasana inspiratif? Meeting Room UB Coffee siap mendukung kesuksesan setiap acara Anda! Dengan kapasitas hingga 15 orang, ruangan kami adalah pilihan tepat untuk pertemuan bisnis, pelatihan, hingga workshop eksklusif.",
  cta: "Hubungi kami untuk reservasi meeting room, peluang kerjasama, atau penyelenggaraan event khusus di UB Coffee.",
  packagesNote:
    "Seluruh paket sudah termasuk biaya sewa ruangan dan air mineral gratis untuk minimal 10 orang.",
  snacks:
    "Kami menyediakan berbagai pilihan snack tradisional yang lezat, mulai dari donat manis, lapis, dadar gulung, hingga pizza mini. Semua bisa disesuaikan dengan selera peserta meeting Anda untuk pengalaman yang lebih personal.",
};

export const roomPrices: RoomPrice[] = [
  { label: "Internal UB", price: "IDR 100K" },
  { label: "Eksternal", price: "IDR 150K" },
];

export const roomFacilities: string[] = [
  "Air mineral 600ml per orang",
  "LCD proyektor",
  "Set audio",
];

export const roomPhotos: Photo[] = [
  { src: photo("DFTA0048"), alt: "Meeting room UB Coffee dengan layar proyektor" },
  { src: photo("DFTA0081"), alt: "Ruang meeting dengan meja coffee break dan sofa" },
  { src: photo("DFTA0045"), alt: "Ruangan kaca semi outdoor UB Coffee" },
  { src: photo("DFTA0069"), alt: "Sajian coffee break untuk meeting" },
  { src: photo("DSC02120"), alt: "Meja panjang di area indoor" },
  { src: photo("DFTA0041"), alt: "Ruangan kaca menghadap taman" },
  { src: photo("DSC02111"), alt: "Area duduk indoor UB Coffee" },
];

export const meetingPackages: MeetingPackage[] = [
  {
    name: "Mini Coffee Break & 2 Snack",
    desc: "Cocok untuk pertemuan dengan santai dan ngemil ringan.",
    price: "IDR 400K",
    extra: "IDR 40K",
  },
  {
    name: "Mini Coffee Break & 3 Snack",
    desc: "Pilihan ekstra snack untuk memenuhi selera peserta meeting Anda.",
    price: "IDR 450K",
    extra: "IDR 45K",
  },
  {
    name: "Mini Coffee Break Only",
    desc: "Pilihan praktis bagi Anda yang hanya ingin menikmati kopi berkualitas selama meeting.",
    price: "IDR 250K",
    extra: "IDR 25K",
  },
];
