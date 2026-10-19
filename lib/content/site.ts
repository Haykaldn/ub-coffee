import { locations, site } from "@/data/site";
import type { Location, SiteInfo } from "@/types/content";

// TODO: ganti dengan fetch ke API dashboard (GET info situs & kontak).
export async function getSiteInfo(): Promise<SiteInfo> {
  return site;
}

// TODO: ganti dengan fetch ke API dashboard (GET lokasi & jam buka). Nanti dashboard cukup
// menyimpan koordinat/query tempat; URL peta dibangun otomatis seperti place() di data/site.ts.
export async function getLocations(): Promise<Location[]> {
  return locations;
}

/** Lokasi utama (alamat & jam buka di hero, footer, slot reservasi); cadangan: lokasi pertama. */
export function mainLocation(site: SiteInfo, locations: Location[]): Location {
  const found = locations.find((l) => l.id === site.mainLocationId);
  if (!found && process.env.NODE_ENV !== "production") {
    console.warn(`mainLocationId "${site.mainLocationId}" tidak ada di daftar lokasi.`);
  }
  return found ?? locations[0];
}
