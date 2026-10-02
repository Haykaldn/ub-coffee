"use client";

import { useEffect, useState } from "react";
import { site, type HoursRow } from "@/data/site";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Hari (0 = Minggu) dan menit sejak tengah malam, menurut waktu Asia/Jakarta. */
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

/**
 * Status buka/tutup dihitung di klien (WIB) dan diperbarui tiap menit.
 * Bernilai null saat render server agar tidak terjadi hydration mismatch.
 */
export function useOpenState(hours: HoursRow[] = site.hours) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(getOpenState(new Date(), hours));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [hours]);

  return state;
}
