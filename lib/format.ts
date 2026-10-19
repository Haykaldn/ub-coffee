// Format tampilan (tanggal, jam) dalam gaya Indonesia. Fungsi murni, tanpa data.

/** "2026-10-12" → "12 Oktober 2026" */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}
