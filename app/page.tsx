import Hero from "@/components/Hero";
import Hub from "@/components/Hub";
import Footer from "@/components/Footer";
import { getHeroPhotos } from "@/lib/content";

export default async function Home() {
  const heroPhotos = await getHeroPhotos();

  return (
    <>
      <main>
        <Hero photos={heroPhotos} />
        <Hub />
      </main>
      <Footer />
    </>
  );
}
