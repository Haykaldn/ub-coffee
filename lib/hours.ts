import { site } from "@/data/site";
import type { HoursRow } from "@/types/content";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Hari (0 = Minggu) dan menit sejak tengah malam, menurut waktu Asia/Jakarta.
 * Sengaja memakai Intl dengan timeZone, bukan date.getHours()/getDay(): getHours mengikuti
 * zona waktu perangkat pengunjung, sehingga status buka akan salah bagi pengunjung di luar WIB.
 * hourCycle "h23" memastikan tengah malam terbaca "00", bukan "24".
 */
export function jakartaNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: WEEKDAYS.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function rowForDay(day: number, hours: HoursRow[] = site.hours): HoursRow | undefined {
  return hours.find((row) => row.days.includes(day));
}

export type OpenState = {
  isOpen: boolean;
  today: HoursRow | undefined;
};

// Jam tutup bersifat eksklusif (tepat 22.00 sudah "tutup"). Baris tanpa open/close = libur.
// Jam yang melewati tengah malam (mis. 20.00–02.00) tidak didukung; belum ada lokasi yang butuh.
export function getOpenState(date = new Date(), hours: HoursRow[] = site.hours): OpenState {
  const { day, minutes } = jakartaNow(date);
  const today = rowForDay(day, hours);
  const isOpen =
    !!today?.open &&
    !!today.close &&
    minutes >= toMinutes(today.open) &&
    minutes < toMinutes(today.close);
  return { isOpen, today };
}
