import Hero from "@/components/Hero";
import Hub from "@/components/Hub";
import Footer from "@/components/Footer";
import { getHeroPhotos, getMenu, getNews, getNewsCategories } from "@/lib/content";

export default async function Home() {
  const [heroPhotos, menu, news, newsCategories] = await Promise.all([
    getHeroPhotos(),
    getMenu(),
    getNews(),
    getNewsCategories(),
  ]);

  return (
    <>
      <main>
        <Hero photos={heroPhotos} />
        <Hub menu={menu} news={news} newsCategories={newsCategories} />
      </main>
      <Footer />
    </>
  );
}
