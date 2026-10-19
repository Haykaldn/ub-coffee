// Tab panel di section 2. `key` sekaligus menjadi hash URL (#menu, #reservasi, …):
// mengubahnya akan mematahkan tautan yang sudah dibagikan, jadi daftarkan key lama di
// legacyTabKeys. Urutan = urutan tab.
export const hubTabs = [
  { key: "menu", title: "Menu" },
  { key: "reservasi", title: "Reservasi" },
  { key: "lokasi", title: "Lokasi" },
  { key: "berita", title: "Berita & Artikel" },
] as const;

export type HubTabKey = (typeof hubTabs)[number]["key"];

/** Key lama → key sekarang, agar tautan lama (mis. /#event) tetap membuka panel yang benar. */
const legacyTabKeys: Record<string, HubTabKey> = {
  event: "berita",
};

const isTabKey = (key: string): key is HubTabKey => hubTabs.some((t) => t.key === key);

/**
 * Panel dari hash URL, termasuk key lama. Tanpa efek samping karena dipakai sebagai snapshot
 * useSyncExternalStore; penggantian URL dilakukan replaceLegacyHash().
 */
export function tabFromHash(): HubTabKey | null {
  const hash = window.location.hash.slice(1);
  if (isTabKey(hash)) return hash;
  return Object.hasOwn(legacyTabKeys, hash) ? legacyTabKeys[hash] : null;
}

/** Ganti hash key lama dengan key sekarang tanpa menambah riwayat (tombol back). */
export function replaceLegacyHash() {
  const hash = window.location.hash.slice(1);
  if (!Object.hasOwn(legacyTabKeys, hash)) return;
  history.replaceState(
    history.state,
    "",
    `${location.pathname}${location.search}#${legacyTabKeys[hash]}`,
  );
}

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
