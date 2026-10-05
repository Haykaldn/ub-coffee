// Tipe konten yang dipakai di lebih dari satu file.

/** Foto dengan teks alternatif (path relatif dari public/). */
export type Photo = {
  src: string;
  alt: string;
};

/** Satu baris jam buka. Kosongkan open/close bila hari itu libur. */
export type HoursRow = {
  day: string;
  days: number[]; // 0 = Minggu … 6 = Sabtu
  open?: string; // "HH:MM" WIB
  close?: string;
};
