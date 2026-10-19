import { menu } from "@/data/menu";
import type { MenuItem } from "@/types/content";

// TODO: ganti dengan fetch ke API dashboard (GET daftar menu).
export async function getMenu(): Promise<MenuItem[]> {
  return menu;
}
