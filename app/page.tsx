import Hero from "@/components/Hero";
import Hub from "@/components/Hub";
import Footer from "@/components/Footer";
import {
  getBookableRooms,
  getBookings,
  getHeroPhotos,
  getMeetingPackages,
  getMenu,
  getNews,
  getNewsCategories,
  getReservationText,
  getRoomPrices,
  getRooms,
} from "@/lib/content";
import type { ReservationContent } from "@/types/content";

export default async function Home() {
  const [
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

  const reservation: ReservationContent = {
    rooms,
    bookableRooms,
    bookings,
    roomPrices,
    meetingPackages,
    text: reservationText,
  };

  return (
    <>
      <main>
        <Hero photos={heroPhotos} />
        <Hub menu={menu} reservation={reservation} news={news} newsCategories={newsCategories} />
      </main>
      <Footer />
    </>
  );
}
