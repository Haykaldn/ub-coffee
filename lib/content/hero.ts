import { heroPhotos } from "@/data/heroPhotos";
import type { HeroPhoto } from "@/types/content";

// TODO: ganti dengan fetch ke API dashboard (GET foto hero).
export async function getHeroPhotos(): Promise<HeroPhoto[]> {
  return heroPhotos;
}
