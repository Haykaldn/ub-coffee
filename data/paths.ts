import type { Photo } from "@/types/content";

// Path foto lokal di public/. Hanya dipakai di dalam data/; nanti dashboard mengirim URL
// foto langsung, jadi komponen tidak boleh bergantung pada helper ini.

// Foto asli UB Coffee (public/images/WEBP). Foto potret sudah dipotong jadi landscape 3:2.
export const photo = (file: string) => `/images/WEBP/${file}.webp`;

// Foto menu (public/images/menu), nama file = id menu.
export const menuPhoto = (id: string, alt: string): Photo => ({
  src: `/images/menu/${id}.webp`,
  alt,
});
