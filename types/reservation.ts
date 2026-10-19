// Kontrak pengiriman reservasi ke dashboard (lib/reservationApi.ts).

/** Data reservasi yang dikirim ke dashboard. */
export type ReservationPayload = {
  room: string; // id ruangan
  date: string; // "YYYY-MM-DD"
  start: string; // "HH:MM" WIB
  end: string; // eksklusif
  people: number;
  package: string | null; // nama paket; null = sewa ruangan saja
  name: string;
  phone: string;
  org: string;
  priceCategory: string; // label kategori harga
  notes: string;
};

export type ReservationResult = {
  code: string; // kode reservasi untuk pemesan
};
