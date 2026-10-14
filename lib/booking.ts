import { bookings } from "@/data/reservation";
import { site } from "@/data/site";
import { jakartaNow, rowForDay, toMinutes } from "@/lib/hours";

// Reservasi dipesan per jam, di dalam jam buka UB Coffee
export const SLOT_MINUTES = 60;

export type Slot = {
  start: string; // "HH:MM"
  status: "free" | "booked" | "past";
};

const fromMinutes = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Tanggal hari ini di WIB, "YYYY-MM-DD" (format en-CA). */
export function jakartaToday(date = new Date()) {
  return date.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });
}

export function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** "2026-10-15" → "Kamis, 15 Oktober 2026" */
export function formatBookingDate(iso: string) {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}

export function endTime(start: string, slots: number) {
  return fromMinutes(toMinutes(start) + slots * SLOT_MINUTES);
}

/** Slot per jam satu ruangan pada satu tanggal; kosong bila hari itu libur. */
export function slotsFor(room: string, date: string, now = new Date()): Slot[] {
  const row = rowForDay(jakartaNow(new Date(`${date}T12:00:00+07:00`)).day, site.hours);
  if (!row?.open || !row.close) return [];

  const taken = bookings.filter((b) => b.room === room && b.date === date);
  const isToday = date === jakartaToday(now);
  const nowMinutes = jakartaNow(now).minutes;
  const slots: Slot[] = [];

  for (let m = toMinutes(row.open); m + SLOT_MINUTES <= toMinutes(row.close); m += SLOT_MINUTES) {
    const booked = taken.some((b) => m < toMinutes(b.end) && m + SLOT_MINUTES > toMinutes(b.start));
    const past = isToday && m <= nowMinutes;
    slots.push({ start: fromMinutes(m), status: booked ? "booked" : past ? "past" : "free" });
  }
  return slots;
}
