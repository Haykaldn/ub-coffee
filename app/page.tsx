import Hero from "@/components/Hero";
import Hub from "@/components/Hub";
import Footer from "@/components/Footer";
import { getHeroPhotos, getMenu } from "@/lib/content";

export default async function Home() {
  const [heroPhotos, menu] = await Promise.all([getHeroPhotos(), getMenu()]);

  return (
    <>
      <main>
        <Hero photos={heroPhotos} />
        <Hub menu={menu} />
      </main>
      <Footer />
    </>
  );
}
