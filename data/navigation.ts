// Tab panel di section 2. `key` sekaligus menjadi hash URL (#menu, #reservasi, …):
// mengubahnya akan mematahkan tautan yang sudah dibagikan. Urutan = urutan tab.
export const hubTabs = [
  { key: "menu", title: "Menu" },
  { key: "reservasi", title: "Reservasi" },
  { key: "lokasi", title: "Lokasi" },
  { key: "event", title: "Event & Promo" },
] as const;

export type HubTabKey = (typeof hubTabs)[number]["key"];
