import type { MenuCategory } from "@/types/content";

// Label tiap kategori menu, sesuai urutan tampil. Record memaksa semua anggota MenuCategory
// tercantum: menambah kategori di types/ tanpa menambahkannya di sini akan gagal type check.
const categoryLabels: Record<MenuCategory, string> = {
  Kopi: "Kopi",
  "Non-Kopi": "Non-Kopi",
  Makanan: "Makanan",
};

export type MenuFilterKey = "all" | MenuCategory;

// Tombol filter di panel Menu, sesuai urutan tampil. "all" = semua kategori.
export const menuFilters: { key: MenuFilterKey; label: string }[] = [
  { key: "all", label: "Semua" },
  ...(Object.keys(categoryLabels) as MenuCategory[]).map((key) => ({
    key,
    label: categoryLabels[key],
  })),
];
