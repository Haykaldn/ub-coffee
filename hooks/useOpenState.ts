"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { getOpenState, type OpenState } from "@/lib/hours";
import type { HoursRow } from "@/types/content";

/**
 * Status buka/tutup dihitung di klien (WIB) dan diperbarui tiap menit.
 * Bernilai null saat render server agar tidak terjadi hydration mismatch: halaman di-render
 * statis saat build, jadi jam server tidak sama dengan jam saat pengunjung membukanya.
 * Interval satu menit cukup karena jam buka/tutup berbatas menit.
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
