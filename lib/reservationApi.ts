import type { ReservationPayload, ReservationResult } from "@/types/reservation";

/**
 * Kirim reservasi ke dashboard.
 * TODO: dashboard belum tersambung. Ganti isi fungsi ini dengan POST ke API dashboard, mis.
 *   const res = await fetch(`${DASHBOARD_URL}/api/reservations`, { method: "POST", body: JSON.stringify(payload) });
 *   if (!res.ok) throw new Error(await res.text());
 *   return res.json();
 * Sementara ini hanya meniru jeda jaringan dan membuat kode reservasi contoh.
 */
export async function submitReservation(payload: ReservationPayload): Promise<ReservationResult> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return { code: `UBC-${payload.date.replace(/-/g, "").slice(2)}-${suffix}` };
}
