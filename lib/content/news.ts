import { news, newsCategories } from "@/data/news";
import type { NewsCategory, NewsItem } from "@/types/content";

// TODO: ganti dengan fetch ke API dashboard (GET berita & artikel).
export async function getNews(): Promise<NewsItem[]> {
  return news;
}

// TODO: ganti dengan fetch ke API dashboard (GET kategori berita).
export async function getNewsCategories(): Promise<NewsCategory[]> {
  return newsCategories;
}
