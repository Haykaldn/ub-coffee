import type { HoursRow } from "@/types/content";

// Format tampilan (tanggal, jam, tautan) dalam gaya Indonesia. Fungsi murni, tanpa data.

/** "2026-10-12" → "12 Oktober 2026" */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}

/** "07:30" → "07.30" (format jam Indonesia) */
export function formatTime(t: string) {
  return t.replace(":", ".");
}

/** "08.00 – 18.00", atau "Libur" bila baris tanpa jam buka. */
export function formatHours(row: HoursRow) {
  if (!row.open || !row.close) return "Libur";
  return `${formatTime(row.open)} – ${formatTime(row.close)}`;
}

/** Tautan chat WhatsApp; `phone` tanpa "+" (mis. "6282…"). */
export function waLink(phone: string, message?: string) {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
