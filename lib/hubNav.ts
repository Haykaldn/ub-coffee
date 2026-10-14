// history.pushState tidak memicu event apa pun, jadi navigate() mengirim event sendiri
// supaya Hub (dan panel yang mendengarkan) membaca ulang hash.
export const NAV_EVENT = "ubcoffee:navigate";

/** Tujuan gulir setelah pindah panel, disimpan di history.state. */
export type NavTarget = "booking";

export function navigate(url: string, target?: NavTarget) {
  history.pushState(target ? { target } : null, "", url);
  window.dispatchEvent(new Event(NAV_EVENT));
}

/** Ambil tujuan gulir sekali saja, lalu hapus agar tidak terulang saat back/forward. */
export function takeNavTarget(): NavTarget | null {
  const target = (history.state as { target?: NavTarget } | null)?.target ?? null;
  if (target) history.replaceState(null, "", location.href);
  return target;
}
