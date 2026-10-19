import Hero from "@/components/Hero";
import Hub from "@/components/Hub";
import Footer from "@/components/Footer";
import {
  getBookableRooms,
  getBookings,
  getHeroPhotos,
  getLocations,
  getMeetingPackages,
  getMenu,
  getNews,
  getNewsCategories,
  getReservationText,
  getRoomPrices,
  getRooms,
  getSiteInfo,
  mainLocation,
} from "@/lib/content";
import type { ReservationContent } from "@/types/content";

export default async function Home() {
  const [
    site,
    locations,
    heroPhotos,
    menu,
    news,
    newsCategories,
    rooms,
    bookableRooms,
    bookings,
    roomPrices,
    meetingPackages,
    reservationText,
  ] = await Promise.all([
    getSiteInfo(),
    getLocations(),
    getHeroPhotos(),
    getMenu(),
    getNews(),
    getNewsCategories(),
    getRooms(),
    getBookableRooms(),
    getBookings(),
    getRoomPrices(),
    getMeetingPackages(),
    getReservationText(),
  ]);

  // Alamat & jam buka di hero, footer, dan slot reservasi
  const main = mainLocation(site, locations);

  const reservation: ReservationContent = {
    rooms,
    bookableRooms,
    bookings,
    roomPrices,
    meetingPackages,
    text: reservationText,
    hours: main.hours,
  };

  return (
    <>
      <main>
        <Hero photos={heroPhotos} siteName={site.name} hours={main.hours} />
        <Hub
          menu={menu}
          menuPdf={site.menuPdf}
          reservation={reservation}
          locations={locations}
          news={news}
          newsCategories={newsCategories}
        />
      </main>
      <Footer site={site} address={main.address} locations={locations} />
    </>
  );
}
