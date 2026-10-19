import type { NewsCategory, NewsItem, NewsType } from "@/types/content";

// Pilihan Berita / Artikel di panel.
export const newsTypes: { key: NewsType; title: string }[] = [
  { key: "berita", title: "Berita" },
  { key: "artikel", title: "Artikel" },
];

/** Item satu jenis, terbaru di depan; tanggal ISO bisa dibandingkan sebagai teks. */
export function newsByType(news: NewsItem[], type: NewsType) {
  return news.filter((n) => n.type === type).sort((a, b) => b.date.localeCompare(a.date));
}

const FALLBACK_LABEL = "Lainnya";

/** Label kategori dari slug; slug yang tidak dikenal tampil "Lainnya" (bukan error). */
export function categoryLabel(categories: NewsCategory[], slug: string) {
  const category = categories.find((c) => c.slug === slug);
  if (category) return category.label;
  if (process.env.NODE_ENV !== "production") {
    console.warn(`Kategori berita "${slug}" tidak ada di newsCategories.`);
  }
  return FALLBACK_LABEL;
}
